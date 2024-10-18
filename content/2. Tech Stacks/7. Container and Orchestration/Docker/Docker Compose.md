---
title: "Docker Compose"
date: 2024-04-24 20:12:56 +0800
status: In Progress
draft: false
tags:
  - Docker
---
## Docker Compose 란
---
```
docker run mmumshad/simple-webapp
docker run mongodb
docker run redis:alpine
docker run ansible
```
- 위와 같은 다수의 서비스를 실행하는 복잡한 Application 을 설정할 때엔 Docker Compose 를 사용하는 게 좋음
- Docker Compose 는 기본으로 설치되지 않기 때문에 [공식 홈페이지](https://docs.docker.com/compose/install/)에서 따로 설치해야 함

```
# docker-compose.yml

services:
	web:
		image: "mmumshad/simple-webapp"
	database:
		image: "mongodb"
	messaging:
		image: "redis:alpine"
	orchestration:
		image: "ansible"
```
- 위처럼 `docker-compose.yml` 을 생성한 뒤
- `docker-compose up` 커맨드를 실행하면 Application 스택 전체를 불러올 수 있음
- 구성 파일을 통해 관리하기 때문에 유지보수가 수월하지만 하나의 Docker Host 에 실행되는 Container 에만 사용 가능

### Sample - Voting Application
![[Sample Voting App.png]]
- 위 아키텍처는 Docker 가 개발한 Docker 를 시연할 때 일반적으로 사용하는종합적인 애플리케이션 예시

```
docker run -d --name=redis redis
docker run -d --name=db postgres
docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
docker run -d --name=result -p 5001:80 --link db:db result-app
docker run -d --name=worker --link db:db --link redis:redis worker
```
- `--link {컨테이너 이름}:{앱이 찾는 호스트의 이름(코드에 있는 이름)}`
	- Docker Swarm 과 네트워킹과 같은 고급 개념이 등장해 어차피 Deprecated 될 기능

```
# docker-compose.yml

redis:
	image: redis
db:
	image: postgres:9.4
vote:
	image: voting-app
	ports:
		- 5000:80
	links:
		- redis
result:
	image: result-app
	ports:
		- 5001:80
	links:
		- db
worker:
	image: worker
	links:
		- redis
		- db
```

## Docker compose - build
---
```
# docker-compose.yml

redis:
	image: redis
db:
	image: postgres:9.4
vote:
	build: ./vote
	ports:
		- 5000:80
	links:
		- redis
result:
	build: ./result
	ports:
		- 5001:80
	links:
		- db
worker:
	build: ./worker
	links:
		- redis
		- db
```
- Docker Compose 가 Docker Image 를 pull 해오는 대신 `docker build` 명령어를 실행할 수 있도록 `image` 대신 `build` 를 입력한 뒤 해당 Application 코드와 `Dockerfile` 이 존재하는 디렉터리를 입력

## Docker compose - versions
---
### Version 1
- 위 예시들은 모두 Version 1 기준으로 작성되었으며 이는 여러 제한 사항을 가지고 있음
	- 여러 네트워크에 컨테이너를 배포할 때 기본 설정인 브릿지 네트워크 외엔 설정할 방법이 없음
	- 의존성이나 시작 순서를 지정할 방법이 없음

### Version 2
```
# docker-compose.yml

version: 2
services:
	redis:
		image: redis
	db:
		image: postgres:9.4
	vote:
		image: voting-app
		ports:
			- 5000:80
		depends_on:
			- redis
```
- Version 2 는 위 제한 사항들이 모두 해결됨
	- Docker Compose 에게 Version 2 라는 것을 알려주기 위해 `version` 을 꼭 지정해야 함
	- 기존 Version 1 에서 작성했던 구성 요소를 `services` 하위에 작성하면 됨
	- Version 1 에선 기본 브릿지 네트워크에 실행하는 모든 컨테이너를 연결하고 `link` 를 사용해 컨테이너 간 연결을 활성화한 반면 Version 2 에선 Docker Compose 가 자동으로 새로운 Application 전용 브릿지 네트워크를 생성하고 해당 네트워크에 모든 컨테이너를 연결함 따라서 `link` 가 필요없음
	- `depends_on` 기능을 통해 의존성이나 시작 순서를 지정할 수 있음

### Version 3
```
# docker-compose.yml

version: 3
services:
	redis:
		image: redis
	db:
		image: postgres:9.4
	vote:
		image: voting-app
		ports:
			- 5000:80
```
- Version 3 부턴 Docker Swarm 을 지원
- 몇 가지 옵션이 제거되고 추가됨

## Docker compose - network
---
```
# docker-compose.yml

version: 2
services:
	redis:
		image: redis
		networks:
			- back-end
	db:
		image: postgres:9.4
		networks:
			- back-end
	vote:
		image: voting-app
		ports:
			- 5000:80
		networks:
			- front-end
			- back-end
	result:
		image: result-app
		ports:
			- 5001:80
		networks:
			- front-end
			- back-end
	worker:
		image: worker
		networks:
			- back-end

networks:
	front-end:
	back-end:
```
- 기존엔 모든 컨테이너를 기본 브리지 네트워크에 배포하는 아키텍처였지만 front-end 와 back-end 로 네트워크를 나눌 경우 위와 같이 설정할 수 있음

## References
---
- [Udemy - Docker for the Absolute Beginner](https://www.udemy.com/course/learn-docker/)
