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

Ansible의 `get_url` 모듈을 사용하여 GitHub Release의 asset binary를 다운로드하려 할 때, 다음과 같은 이슈가 발생:
- GitHub REST API의 `/repos/{owner}/{repo}/releases/assets/{asset_id}` 엔드포인트로 요청 시, 302 Redirect가 발생함
- `get_url` 모듈이 해당 302를 자동으로 따라가지 않고, 403 Forbidden 에러를 반환함
- 이는 presigned S3 URL로 redirect된 후 인증 없이 접근해야 하는 구조 때문으로 보임

### 실패한 예시 (직접 URL 접근)
```yml
- name: Download binary (direct API call)
  get_url:
    url: "https://api.github.com/repos/{owner}/{repo}/releases/assets/{asset_id}"
    headers:
      Authorization: "Bearer {{ github_token }}"
      Accept: "application/octet-stream"
    dest: "/tmp/{{ asset_filename }}"
    mode: '0644'
```
- 결과: `403 Forbidden`
- 원인: GitHub가 해당 API 엔드포인트에 대해 302로 presigned URL로 redirect → 인증 헤더가 유지되지 않아 403 발생

### 성공한 예시 (302 location 추출 후 별도 요청)
```yml
- name: Get asset metadata
  uri:
    url: "https://api.github.com/repos/{owner}/{repo}/releases/assets/{{ asset_id }}"
    headers:
      Authorization: "Bearer {{ github_token }}"
      Accept: "application/octet-stream"
    return_content: no
    status_code: 302
  register: asset_response

- name: Download binary from presigned S3 URL
  get_url:
    url: "{{ asset_response.location }}"
    dest: "/tmp/{{ asset_filename }}"
    mode: '0644'
  when: asset_response.status == 302
```
- 결과: 성공적으로 presigned URL로부터 다운로드
- 특징: presigned URL은 S3 URL로, 인증 헤더 필요 없음

# GitHub Release Asset 다운로드와 Ansible 리다이렉트/인증 정리

## 1. 개요

- GitHub Release Asset을 Ansible로 자동 다운로드할 때,

인증, 리다이렉트, CDN 정책에 따라 200, 302, 403 등 다양한 HTTP 응답이 발생할 수 있다.

- 특히, get_url 모듈과 uri 모듈의 동작 차이,

그리고 리다이렉트 대상 도메인에 따라 인증 헤더 처리 방식이 달라진다.

---

## 2. 주요 개념
---
### 2.1 GitHub Release Asset API

API 엔드포인트
```
https://api.github.com/repos/{owner}/{repo}/releases/assets/{asset_id}
```
- 인증 필요(Authorization 헤더)
- 302 리다이렉트 발생 (실제 파일 URL로 이동)

공개 다운로드 URL
```
https://github.com/{owner}/{repo}/releases/download/{tag}/{filename}
```
- 인증 불필요
- 바로 파일 다운로드


### 2.2 리다이렉트 대상 도메인
- release-assets.githubusercontent.com
- objects.githubusercontent.com

## 3. Ansible로 다운로드하는 방법
---
### 3.1 단순 get_url 사용 (비추천)
```yml
- name: Download Asset (문제 발생 가능)
  get_url:
    url: "{{ response.json.assets[0].url }}"
    headers:
      authorization: "Bearer {{ token }}"
      accept: application/octet-stream
    dest: /tmp/file.bin
```
- 문제점: 리다이렉트된 URL에 Authorization 헤더가 붙어서 403 Forbidden이 발생할 수 있음

### 3.2 안전한 2단계 다운로드 (권장)
```yml
- name: 1단계 - 리다이렉트 URL 얻기
  uri:
    url: "{{ response.json.assets[0].url }}"
    headers:
      authorization: "Bearer {{ token }}"
      accept: application/octet-stream
    method: GET
    follow_redirects: none
    return_content: no
  register: asset_redirect

- name: 2단계 - 실제 파일 다운로드 (Authorization 없이)
  get_url:
    url: "{{ asset_redirect.location }}"
    dest: /tmp/file.bin
    mode: "0644"
```
- 장점: 리다이렉트된 URL에는 Authorization 헤더가 붙지 않아 403 오류 없이 다운로드 가능

## 4. 302/403/200 응답이 달라지는 이유
---
- 302:
	- GitHub가 실제 파일을 CDN으로 리다이렉트
- 200:
	- 바로 파일을 내려주거나, browser_download_url 사용 시
- 403:
	- 리다이렉트된 CDN(S3 등)이 Authorization 헤더가 붙은 요청을 거부할 때

## 5. 실전 팁
---
- 리다이렉트 대상 도메인에 따라 인증 정책이 다르니 항상 2단계로 처리하는 것이 안전
- uri 모듈의 follow_redirects: none으로 302와 location을 직접 확인 가능
- get_url만으로는 중간 리다이렉트 여부를 알 수 없음

## 6. 참고 curl 예시
---
```sh
curl -v -L -H "Authorization: Bearer <token>" \
     -H "Accept: application/octet-stream" \
     -o downloaded.txt \
     "https://api.github.com/repos/{owner}/{repo}/releases/assets/{asset_id}"
```

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
