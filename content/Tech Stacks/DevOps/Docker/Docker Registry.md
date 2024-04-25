---
title: Docker Registry
date: 2024-04-24 23:44:03 +0800
status: In Progress
draft: false
tags:
  - Docker
---
## Docker Registry 란
---
- Docker Registry 란 모든 Docker Image 가 저장되는 Central Repository
- `image: {Registry}/{Repository}/{Image}` 명명 규칙을 따름
	- `{Repository}` 를 명시하지 않으면 `{Image}` 이름과 동일하다고 판단
	- `{Repository}` 는 주로 Docker Hub 의 Account Name 또는 Organization Name
	- Image 를 pull 해올 위치를 지정하지 않을 경우 기본 Registry 인 Docker Hub 에 있다고 판단
	- 즉, `image: nginx` 일 경우 실제론 `image: docker.io/nginx/nginx`

### Private Registry
- 내부적으로 개발한 Application 을 Private 으로 사용하고 싶은 경우 Private Registry 를 사용
- AWS, Azure, GCP 와 같은 Cloud Provider 는 기본적으로 Private Registry 를 제공
- 이런 Private Registry 들은 Credential 을 이용해야만 접근할 수 있도록 만들어야 함
- 그 후 `docker login private-registry.io` 와 같은 명령어로 로그인해서 사용 가능

## References
---
- [Udemy - Docker for the Absolute Beginner](https://www.udemy.com/course/learn-docker/)
