---
title: Ansible Troubleshooting
date: 2025-07-16 19:09:15 +0800
status: In Progress
draft: false
tags:
  - IaC
  - Ansible
---
## GitHub Release Asset 다운로드 403 이슈
---
```yml
- name: Get Assets from GHR
  uri:
	url: "https://api.github.com/repos/{owner}/{repo}/releases/tags/{tag}"
	headers:
	  authorization: "Bearer {{ github_token }}"
	return_content: true
  register: response

- name: Download Asset from GHR
  get_url:
    url: "https://api.github.com/repos/{owner}/{repo}/releases/assets/{asset_id}"
	# 위 라인은 사실 url: "{{ response.json.assets[0].url }}"
    headers:
      authorization: "Bearer {{ github_token }}"
      accept: "application/octet-stream"
    dest: "/tmp/{{ asset_filename }}"
    mode: "0644"
```
EC2 Linux Base Image 베이킹을 위해 위와 같이 공통 바이너리를 설치하는 과정을 Ansible Playbook 으로 진행하고 있었다.

```
amazon-ebs.ths: fatal: [default]: FAILED! => {"changed": false, "dest": "/tmp/{asset_filename}", "elapsed": 0, "msg": "Request failed", "response": "HTTP Error 403: Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.", "status_code": 403, "url": "https://api.github.com/repos/{owner}/{repo}/releases/assets/{asset_id}"}
```
어느날 갑작스럽게 위와 같은 403 에러가 발생하여 해당 에러를 트러블슈팅하는 과정을 기록하려한다.

GitHub 에서 Release Asset 을 다운로드하려면 우선 [Get a release by tag name](https://docs.github.com/en/rest/releases/releases#get-a-release-by-tag-name) API 를 통해 Asset 을 다운로드할 수 있는 API 경로를 JSON response 에서 assets property 에 명시된 url 을 통해 받아와야한다.

API 경로는 [Get a release asset](https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#get-a-release-asset) 형식으로 주어지는데, 바이너리를 직접적으로 다운로드받기 위해선 `Accept: application/octet-stream` 헤더를 추가해주어야한다. 이때 GitHub 는 200 을 반환하며 직접 stream 을 시도할 수도 있고, 302 을 반환해 stream 받을 수 있는 storage 경로로 redirect 해줄 수도 있다.

302 Redirect Response 의 Location 헤더에 포함된 경로는 보통 pre-signed URL 로 GitHub 가 제공하는 다양한 storage backend 로 부터 바이너리를 다운받을 수 있다.

처음엔 Ansible 의 `get_url` 모듈이 302 Redirect 를 처리하지 못하는 줄 알았다. pre-signed URL 은 기본적으로 추가적인 인증이 필요하지 않기 때문에 Authorization Header 와 충돌로 인한 이슈로 생각했다.

```sh
curl -L \
	-H "Authorization: Bearer {{ github_token }}" \
	https://api.github.com/repos/{owner}/{repo}/releases/tags/{tag}

curl -v -L \
	-H "Authorization: Bearer {{ github_token }}" \
	-H "Accept: application/octet-stream" \
	-o {{ asset_filename }} \
	https://api.github.com/repos/{owner}/{repo}/releases/assets/{asset_id}
```
통신과정을 더 자세히 들여다보기 위해 위와 같이 curl command 를 통해 API 를 호출한 결과, 302 Redirect 를 문제없이 처리하고 바이너리 역시 성공적으로 다운로드 받을 수 있었다.

때문에 더더욱 Ansible 의 `get_url` 모듈을 의심하게 되었고, 직접 소스코드를 찾아보기로했다. `get_url` 모듈은 내부적으로 `urls` 모듈에서 제공하는 [fetch_url](https://github.com/ansible/ansible/blob/82529e534dd3edd84aba03d86b337f88c58b9982/lib/ansible/modules/get_url.py#L403) 을 사용하고 있었고, 이미 내부엔 Redirect 를 handle 하는 [HTTPRedirectHandler](https://github.com/ansible/ansible/blob/82529e534dd3edd84aba03d86b337f88c58b9982/lib/ansible/module_utils/urls.py#L393) 가 포함되어있었다.

이를 통해 Ansible 의 `get_url` 모듈의 문제는 아니라는 것을 알게되었고, 403 에러를 reproduce 하기 위해 Ansible Playbook 을 재실행해본 결과 이번엔 문제없이 바이너리가 다운로드 되었다.

```yml
- name: Get Assets from GHR
  uri:
	url: "https://api.github.com/repos/{owner}/{repo}/releases/tags/{tag}"
	headers:
	  authorization: "Bearer {{ github_token }}"
	return_content: true
  register: response

- name: Get Asset metadata response
  uri:
    url: "https://api.github.com/repos/{owner}/{repo}/releases/assets/{asset_id}"
    # 위 라인은 사실 url: "{{ response.json.assets[0].url }}"
    headers:
      authorization: "Bearer {{ github_token }}"
      accept: "application/octet-stream"
    status_code: [200, 302]
    return_content: true
    follow_redirects: no
  register: asset_response

- name: Save binary stream to file (200 OK)
  copy:
    content: "{{ asset_response.content }}"
    dest: "/tmp/{{ asset_filename }}"
    mode: '0644'
  when: asset_response.status == 200

- name: Download binary from pre-signed URL (302 Redirect)
  get_url:
    url: "{{ asset_response.location }}"
    dest: "/tmp/{{ asset_filename }}"
    mode: '0644'
  when: asset_response.status == 302
```

- release-assets.githubusercontent.com
- objects.githubusercontent.com

## 302/403/200 응답이 달라지는 이유
---
- 302:
	- GitHub가 실제 파일을 CDN으로 리다이렉트
- 200:
	- 바로 파일을 내려주거나, browser_download_url 사용 시
- 403:
	- 리다이렉트된 CDN(S3 등)이 Authorization 헤더가 붙은 요청을 거부할 때

## 실전 팁
---
- 리다이렉트 대상 도메인에 따라 인증 정책이 다르니 항상 2단계로 처리하는 것이 안전
- uri 모듈의 follow_redirects: none으로 302와 location을 직접 확인 가능
- get_url만으로는 중간 리다이렉트 여부를 알 수 없음

## 결론
---
- `uri` 모듈은 `status_code: 302`와 함께 사용하면 redirect 응답을 수신하고, `Location` 헤더를 추출할 수 있음
- 실제 바이너리 다운로드는 redirect된 URL을 별도로 `get_url`로 호출해야 정상 동작함
- GitHub Release Asset 다운로드 자동화 시, 인증 헤더와 리다이렉트 정책을 반드시 고려해야 한다.
- 2단계(리다이렉트 URL 추출 → 인증 없이 다운로드) 방식이 가장 안전하다.

## References
---
- [GitHub REST API Docs – Download a release asset](https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#get-a-release-asset)
- [Ansible Source Code – get_url module](https://github.com/ansible/ansible/blob/devel/lib/ansible/modules/get_url.py)
