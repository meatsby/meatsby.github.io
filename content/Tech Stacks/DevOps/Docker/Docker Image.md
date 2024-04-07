---
title: Docker Image
date: 2024-04-06 23:31:52 +0900
status: To Do
draft: true
tags:
  - Docker
---
## What am I containerizing?
---
- 애플리케이션에서 사용하려는 컴포넌트 또는 서비스를 Docker Hub 에서 찾을 수 없기 때문에 혹은 개발중인 애플리케이션을 Dockerize 해서 배포가 쉽도록 만들기 위해 Docker Image 를 사용함

## How to create my own image?
---
- Flask 를 이용한 단순한 웹 애플리케이션에 쓸 이미지를 만든다고 가정했을 때 수동으로 설정해야 한다면 아래와 같은 작업을 수행해야 함
	- Ubuntu 같은 운영체제
	- apt 명령어로 소스 리포지토리를 업데이트
	- 의존성을 설치
	- pip 명령어로 Python 의존성을 설치
	- 애플리케이션 소스 코드를 복사해 넣은 뒤 flask 명령어로 웹 서버를 가동
- `Dockerfile` 이라는 파일 안에 아래 명령어를 적음
```
FROM Ubuntu

RUN apt-get update && apt-get -y install python

RUN pip install flask flask-mysql

COPY . /opt/source-code

ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
```
- 이어서 `docker build` 명령어로 이미지를 구축하고 이미지의 태그 이름과 함께 `Dockerfile` 을 입력값으로 지정, 이러면 로컬에 이미지가 생성됨
	- `docker build . -f Dockerfile -t mmumshad/my-custom-app`
- 퍼블릭 Docker Hub Registry 에서 이용할 수 있도록 하려면 `docker push` 명령어를 실행, 이러면 계정 이름이 이미지 이름이 됨
	- `docker push mmumshad/my-custom-app`

## References
---
- [Udemy - Docker for the Absolute Beginner](https://www.udemy.com/course/learn-docker/)
