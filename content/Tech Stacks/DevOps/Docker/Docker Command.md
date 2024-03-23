---
title: Docker Command
date: 2024-03-23 22:32:02 +0800
status: In Progress
draft: true
tags:
  - Docker
---
## run - Start a Container
---
- `docker run` 명령어는 이미지로부터 컨테이너를 실행할 때 사용함
- `docker run nginx` 명령어 실행 시 Docker 호스트에 Nginx 애플리케이션 인스턴스가 있다면 해당 인스턴스를 실행함
- 호스트에 이미지가 없다면 Docker Hub 로 이동해 이미지를 Pull 해옴
- 이 작업은 한 번만 처리되기 때문에 명령어를 여러 번 실행해도 같은 이미지를 재사용함
- `docker run ubuntu` 명령어 실행 시 ubuntu 이미지의 인스턴스를 실행하고 즉시 종료함. 실행중인 컨테이너를 확인해도 실행 중인 컨테이너가 없음. 해당 컨테이너는 이미 종료된 상태. 왜? Docker 는 가상 머신과 다르게 컨테이너의 목적은 운영 체제 호그팅이 아니라 특정 작업이나 프로세스를 처리하는 것. 가령 Web Server 나 Application Server 또는 Database Instance 를 호스팅하거나 연산이나 분석 작업을 수행하는 것이 있음. 작업이 끝나면 컨테이너는 종료됨. 컨테이너는 내부 프로세스가 실행되는 동안만 존재. 컨테이너 내부의 Web Service 가 멈추거나 충돌이 발생하면 컨테이너가 종료됨. ubuntu 이미지로 컨테이너를 실행하면 즉시 종료되는 이유. ubuntu 는 다른 Application 의 베이스 이미지로 사용되는 운영 체제의 이미지일 뿐이기 때문. 컨테이너 자체에서 기본적으로 실행되는 프로세스나 애플리케이션이 없음.

## ps - List Containers
---
- `docker ps` 명령어는 실행되는 모든 컨테이너와 해당 컨테이너의 기본 정보를 나열함
- 컨테이너 ID 나 컨테이너 실행을 위해 사용되는 이미지의 이름, 현재 상태나 컨테이너 이름 등이 있음
- 각 컨테이너는 Docker 에 의해 자동으로 생성된 임의의 ID나 이름을 갖음
- `docker ps -a` 모든 컨테이너 확인. 이미 종료한 컨테이너까지 모두 출력

## stop - Stop a Container
---
- `docker stop nginx` 명령어는 실행 중인 컨테이너를 멈춤

## rm - Remove a Container
---
- `docker rm nginx` 명령어를 통해 종료한 컨테이너를 영구적으로 삭제

## images - List Images
---
- `docker images` 명령어로 사용할 수 있는 이미지의 목록과 이미지의 크기를 확인

## rmi - Remove Images
---
- `docker rmi nginx` 명령어로 사용하지 않을 이미지를 삭제할 수 있음
- 이미지를 삭제하려면 해당 이미지가 종속된 모든 컨테이너를 중단 또는 삭제해야 함

## pull - Download an Image
---
- `docker pull ubuntu` 명령어를 통해 컨테이너 실행 없이 이미지만 pull 할 수 있음

## Append a command
---
- ubuntu 의 경우와 같이 실행되는 서비스가 없는 이미지라면 `docker run` 명령어를 이용해 Docker 가 프로세스를 실행하도록 명령할 수 있음
- `docker run ubuntu sleep 5` 명령어 실행 시 컨테이너가 실행된 후 5초 간 sleep 이 실행된 뒤 컨테이너는 종료됨

## exec - Execute a Command
---


## References
---
- [Udemy - Docker for the Absolute Beginner](https://www.udemy.com/course/learn-docker/)
