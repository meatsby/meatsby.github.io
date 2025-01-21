---
title: "Docker Image"
date: 2024-04-06 23:31:52 +0900
status: In Progress
draft: false
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

## Dockerfile
---
```
FROM Ubuntu

RUN apt-get update && apt-get -y install python

RUN pip install flask flask-mysql

COPY . /opt/source-code

ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
```
- `Dockerfile` 은 Docker 가 인식하도록 특정 형식으로 작성된 텍스트 파일
- `INSTRUCTION` 과 `ARGUMENT` 형식으로 이루어짐
	- `FROM Ubuntu`
		- 컨테이너의 기본 운영체제를 정의
		- 모든 Docker Image 는 운영체제 혹은 사전에 운영체제에 기반해 생성한 이미지과 같은 또 다른 이미지에 기반을 둠
	- `RUN apt-get update && apt-get -y install python`
		- `RUN` 명령어는 Docker 가 기본 이미지에 특정 명령어를 실행하도록 함
	- `COPY . /opt/source-code`
		- `COPY` 는 로컬 시스템의 파일을 복사해 Docker Image 에 넣음
		- `. /opt/source-code`현재 폴더에 있는 애플리케이션 소스코드를 `/opt/source-code` 에 붙여넣는다는 의미
	- `ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run`
		- `ENTRYPOINT` 명령어는 이미지가 컨테이너로 실행될 때 작동할 명령어를 지정

### Layered Architecture
![[Layered Architecture.png]]
- Docker 는 계층형 아키텍처로 이미지를 구축
- 명령어 각 줄이 이전 계층의 변경 사항으로 Docker Image 에 새로운 계층을 생성함
	- 계층마다 이전 계층의 변경 사항만을 저장하기 때문에 크기에서도 이를 확인할 수 있음
	- `docker history mmumshad/simple-webapp` 을 실행하면 확인 가능

### Docker build output
![[Docker build output.png]]
- `docker build .` 실행 시 여러 단계와 작업별 결과를 볼 수 있음
- 모든 계층은 캐시에 저장되기 때문에 실패하더라도 해당 단계에서 `docker build` 를 재실행 가능
- 또한 빌드 프로세스에 새로운 단계를 추가해도 처음부터 다시 빌드할 필요가 없음
- 특히 애플리케이션 소스코드 업데이트는 빈번하기 때문에 빠른 재빌드가 가능

## Demo
---
```
docker run -it ubuntu bash
apt-get update
apt-get install -y python
apt-get install python-pip
pip install flask
# Copy code to /opt/app.py
FLASK_APP=/opt/app.py flask run --host=0.0.0.0
```
- Dockerfile 없이 수동으로 실행 할 경우

```
FROM ubuntu

RUN apt-get update
RUN apt-get install -y python
RUN apt-get install python-pip

COPY app.py /opt/app.py

ENTRYPOINT FLASK_APP=/opt/app.py flask run --host=0.0.0.0
```
- 위와 같은 Dockerfile 을 만들고 `docker build . -t my-simple-webapp` 명령어로 이미지 생성
- 이미지 생성 후 `docker images` 명령어 사용 시 `my-simple-webapp` 이미지가 생성되어있음
- `docker run my-simple-webapp` 실행 시 처음 수동 실행과 같은 결과

## Environment Variables
---
- `docker run -e APP_COLOR=blue simple-webapp-color`
	- `-e` 옵션을 통해 컨테이너 내에 환경변수 설정 가능
- `docker inspect blissful_hopper`
	- `docker inspect` 를 통해 이미 실행 중인 컨테이너의 환경변수를 찾을 수 있음
	- `"Config"` 섹션에서 해당 컨테이너가 가진 환경변수 확인 가능

## CMD vs ENTRYPOINT
---
- `CMD` 는 해당 이미지가 기본으로 사용할 명령어
	- ubuntu 이미지의 경우 `CMD ["bash"]`
```
FROM Ubuntu

CMD sleep 5
```
- 위 `Dockerfile` 로 `docker build . -t ubuntu-sleeper`
	- `docker run ubuntu-sleeper sleep 10` 실행 시 CMD 가 `sleep 10` 으로 덮어씌워짐
```
FROM Ubuntu

ENTRYPOINT ["sleep"]
```
- `ENTRYPOINT` 사용 시 `docker run ubuntu-sleeper 10` 로 인자를 전달할 수 있음

즉, CMD 의 경우 명령줄 매개변수가 완전히 대체되는 반면, ENTRYPOINT 의 경우 명령줄 매개변수가 추가됨

```
FROM Ubuntu

ENTRYPOINT ["sleep"]

CMD ["5"]
```
- `Dockerfile` 을 위와 같이 설정할 경우 (JSON 포맷으로 설정해야 됨)
	- `docker run ubuntu-sleeper` 실행 시 `sleep 5` 가 실행됨
	- `docker run ubuntu-sleeper 10` 실행 시 `sleep 10` 가 실행됨
	- `docker run --entrypoint sleep2.0 ubuntu-sleeper 10` 실행 시 `sleep2.0 10` 가 실행됨

## References
---
- [Udemy - Docker for the Absolute Beginner](https://www.udemy.com/course/learn-docker/)
