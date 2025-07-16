---
title: Ansible Troubleshooting
date: 2025-07-16 19:09:15 +0800
status: In Progress
draft: false
tags:
  - IaC
  - Ansible
---
## Ansible `get_url` 모듈과 302 Redirect 처리 이슈
---
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

## 결론
---
- Ansible `get_url` 모듈은 기본적으로 HTTP redirect(302)를 자동으로 따라가지 않음
- `uri` 모듈은 `status_code: 302`와 함께 사용하면 redirect 응답을 수신하고, `Location` 헤더를 추출할 수 있음
- 실제 바이너리 다운로드는 redirect된 URL을 별도로 `get_url`로 호출해야 정상 동작함

## References
---
- [GitHub REST API Docs – Download a release asset](https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#get-a-release-asset)
- [Ansible Source Code – get_url module](https://github.com/ansible/ansible/blob/devel/lib/ansible/modules/get_url.py)
