---
title: Docker Overview
date: 2024-03-17 21:16:50 +0800
status: In Progress
draft: true
tags:
  - Docker
---
 
## Objectives
---
- What are Containers?
- What is Docker?
- Why do you need it?
- What can it do?

- Run Docker Containers
- Create Docket Image
- Networks in Docker
- Docker Compose

- Docker Concepts in Depth

- Docker for Windows/Mac

- Docker Swarm
- Docker vs Kubernetes

## Docker Overview
---
### Why do you need Docker?
- Compatibility/Dependency
    - 여러 기술 스택을 사용할 때 (e.g. Node.js, MongoDB, Redis, Ansible)
    - 운영 체제와의 호환성 문제
    - 라이브러리와 의존성 문제
        - 어떤 서비스는 A 버전, 다른 서비스는 B 버전의 라이브러리와 의존성이 필요함
    - 변경 사항이 생길 때 마다 컴포넌트와 인프라 간의 호환성을 확인해야 함..
        - 이런 호환성 매트릭스 문제를 The Matrix from Hell 이라고도 부름
- Long setup time
    - 새로운 개발자 합류 시 새로운 개발 환경 구성이 쉽지 않음
- Different Dev/Test/Prod environments

### What can it do?
- 이런 호환성 문제를 해결해줄 수 있고, 컴포넌트를 수정하거나 변경하면서도 다른 컴포넌트에 영향을 주지 않으면서 운영 체제를 수정할 수 있는 것이 바로 Docker
- Docker 가 있으면 컴포넌트를 실행할 때 각자의 의존성과 라이브러리를 갖춘 분리된 컨테이너를 활용해 같은 가상 머신과 운영 체제에서 환경과 컨테이너를 분리할 수 있었음

### What are Containers?
- 컨테이너란 완전히 분리된 환경으로 각자의 프로세스, 서비스 그리고 네트워크 인터페이스, [[마운트]]를 가상 머신처럼 가지고 있지만 운영 체제 커널은 동일함
- 컨테이너는 전에도 있던 개념 (e.g. LXC, LXD, LXCFS 등)
    - Docker 는 그 중 [[LXC]] 컨테이너를 사용함
- 컨테이너 환경은 저수준이라 설정이 어렵지만 Docker 에서 제공하는 강력한 기능성의 고수준툴이 있으면 쉽게 작업할 수 있음

### Operating System
- Ubuntu, Fedora, SUSE, CentOS 와 같은 운영 체제는 운영 체제 커널과 소프트웨어로 구성됨
- 운영 체제 커널은 기반 하드웨어와 상호 작용하는 역할을 함
- Linux 인 운영 체제 커널은 그대로지만 소프트웨어 때문에 운영 체제의 차이가 발생
- 이 소프트웨어에는 다양한 UI와 드라이버, 컴파일러, 파일 관리자, 개발자 툴 등이 있음
- 즉, 모든 운영 체제에는 동일한 Linux 커널이 있지만, 일부 커스텀 소프트웨어 때문에 서로 다른 운영 체제가 되는 것

### Sharing the kernel?
- Docker 가 설치된 Ubuntu 운영 체제가 있으면
    - Docker 는 같은 커널에 기초하기만 하면 어떤 운영 체제라도 실행할 수 있음
    - 이 경우 Linux 커널이 되고 기반 운영 체제가 Ubuntu 라면
    - Docker 는 Debian, Fedora, SUSE, CentOS 등의 OS에 기반한 컨테이너를 실행할 수 있음
- Docker 는 모든 운영 체제와 호환되는 Docker 호스트의 기반 커널을 활용하는 것
- Windows 같은 경우 이와 같은 커널을 공유하지 않음
    - 즉, Linux 가 설치된 Docker 호스트에서는 Windows 기반 컨테이너를 실행할 수 없음
    - 따라서 Windows 서버에 Docker 를 설치해야 함
    - Windows 에 Docker 를 설치하고 Linux 기반 컨테이너를 실행할 수 있지 않음?
        - Windows 에서 Linux 컨테이너를 실행하는 것이 아니라 내부적으로 Linux 가상 머신에서 Linux 컨테이너를 실행하는 것
        - 즉, Windows 위에 Linux 가상 머신에서 Linux 컨테이너를 실행하는 것
- 다른 커널을 실행할 수 없으면 뭐가 좋냐?
    - 하이퍼바이저와 달리 Docker 는 같은 하드웨어 상에서 다른 운영 체제를 가상화하는 것이 아니라
    - 애플리케이션을 패키지화하고 컨테이너화해서 원하는 만큼 실행할 수 있도록 배포하는 것이기 때문

### Conatianers vs Virtual Machines
- 가상 머신의 경우 각 가상 머신에 각자의 운영 체제와 의존성, 그리고 애플리케이션이 설치됨
- 이러한 상층 구조는 기반 리소스를 많이 사용하는데 이는 여러 개의 가상 운영 체제와 커널이 실행되기 때문
- 또한 가상 머신은 무거워서 용량을 많이 차지하고 주로 그 단위가 GB에 달하는데 Docker 컨테이너는 가볍고 MB 단위의 용량만을 차지하므로 몇 초 만에 Docker 컨테이너를 부트할 수 있는데 가상 머신은 운영 체제 전체를 부트해야하기 때문에 보다 오래 걸림
- 또 한가지 중요한 점은 Docker 가 완전히 분리되지 못한다는 점. 이는 컨테이너 간 공유하는 커널과 같은 리소스가 많기 때문
- 반대로 가상 머신은 기반 운영 체제나 커널에 의존하지 않아 완전히 분리되어 서로 다른 운영 체제의 다른 애플리케이션을 실행할 수 있음
- 즉, 같은 하이퍼바이저에서 Linux 또는 Windows 기반 앱을 실행할 수 있음
- 컨테이너 또는 가상 머신만을 사용해야 한다는 뜻이 아닙니다 컨테이너와 가상 머신은 함께 사용해야 합니다
- 수천 개의 Docker 호스트에서 수천 가지의 앱을 실행하고자 할 때는 대개 가상 Docker 호스트에 기반해 컨테이너들이 구성하여 두 가지 기법을 모두 활용할 수 있습니다
- 즉, 가상화의 이점을 살려 필요할 때마다 Docker 호스트를 프로비저닝할 수 있고 한편으로는 Docker의 이점을 살려 필요에 따라 애플리케이션을 프로비저닝하고 확장할 수 있게 됩니다
- 하지만 이 경우에는 그 정도로 많은 가상 머신이 필요하지 않습니다
- 여기는 각 애플리케이션당 가상 머신을 프로비저닝한 경우이고 대신 수천 개의 컨테이너에 가상 머신을 수백 개 프로비저닝할 수도 있겠죠

### How is it done?
- 많은 기관에서 자기 제품을 컨테이너화해서 Docker Hub 또는 Docker Store 라는 퍼블릭 Docker 보관소에 공개함
- 이곳에서 운영 체제, 데이터베이스, 서비스, 툴 등의 이미지를 찾을 수 있고 호스트에 Docker 를 설치한 뒤 docker run 명령어에 이미지 이름만 붙이면 애플리케이션을 쉽게 실행할 수 있음

### Container vs Image
- 이미지는 VM 템플릿과 같은 패키지 또는 템플릿으로 컨테이너를 만드는 데 사용되며
- 컨테이너는 서로 분리된 이미지 인스턴스가 실행되는 곳으로 각자의 환경과 프로세스들을 지니고 있음
- 이미 도커화된 제품의 이미지가 많고 만약 찾는 이미지가 없다면 이미지를 만들어 공유할 수 있음

### Docker in DevOps
- Docker 이전엔 개발팀이 애플리케이션을 개발하고 운영팀에게 지시사항을 전달하여 호스트 설정과 필요 설치 사항 그리고 의존성 구성등을 알려줬음
- Docker 이후엔 개발팀과 운영팀이 함께 이런 지침들을 Docker 파일로 관리할 수 있음
- Docker 파일을 사용하면 애플리케이션 이미지를 생성할 수 있어 Docker 가 설치된 호스트라면 어디서든 실행할 수 있고 어떤 환경에서도 똑같이 작동함
- 운영팀은 이미지로 애플리케이션을 배포만 하면 되는 것

## Docker on Mac
---
### Docker Toolbox
- Mac 에서 Docker 를 쓰려면 원래 이게 필요했음
- Mac 의 VirtualBox 로 만들어진 Linux VM 의 Docker
- Mac OS 에서 Linux Container 를 실행시킬 뿐
- Docker Toolbox 에는 Oracle VirtualBox, Docker Engine, Docker Machine, Docker Compose, Kitematic 이 포함됨
- Docker Toolbox 실행 파일을 다운로드 및 설치하면 VirtualBox 가 설치되고 내부에서 Docker 를 실행하는 Boot to Docker 라는 경량화된 VM 을 배포함

### Docker Desktop for Mac
- Oracle VirtualBox 대신 HyperKit 가상화 기술을 사용함

---
---
---

# Docker Overview

## Docker Platform

- Docker Container = 느슨하게 격리된 환경
- 격리 및 보안을 통해 특정 호스트에서 동시에 많은 컨테이너 실행 가능
- 컨테이너는 가볍고 App 을 실행하는데 필요한 모든 것을 포함하기에 호스트에 설치된 것에 의존할 필요가 없음

## Docker Architecture
- Docker 는 Client-Server Architecture 를 사용
- Docker Client 는 Docker Container 를 구축, 실행 및 배포하는 무거운 작업을 수행하는 Docker Daemon 과 통신함
- Docker Client 와 Daemon 은 동일한 시스템에서 실행될 수 있음
- Docker Client 를 Remote Docker Daemon 에 연결할 수 있음
- Docker Client 와 Daemon 은 UNIX Socket 또는 Network Interface 를 통해 REST API 로 통신함
- 또 다른 Docker Client 는 Docker Compose 로, 이를 통해 컨테이너 세트로 구성된 App 을 작업할 수 있음

### Docker Client
- Docker Client (`docker`) 는 많은 Docker 사용자가 Docker 와 상호작용하는 기본 방법
- `docker run` 명령어를 사용하면 Client 는 이러한 명령을 Daemon 에게 보내고, `dockerd` 가 이를 수행함
- Docker 명령은 Docker API 를 사용함
- Docker Client 는 둘 이상의 Daemon 과 통신할 수 있음

### Docker Desktop
- Docker Desktop 은 Mac, Windows, Linux 환경에서 컨테이너화된 애플리케이션과 마이크로서비스를 구축하고 공유할 수 있는 애플리케이션
- Docker Desktop 에는 Docker Daemon (`dockerd`), Docker Client (`docker`), Docker Compose, Docker Content Trust, Kubernetes 및 자격 증명 도우미가 포함되어 있음

### Docker Registry
- Docker Registry 는 Docker Image 들을 저장하는 곳
- Docker Hub 는 Public Docker Registry 이며 Docker 는 기본적으로 Docker Hub 에서 Image 를 찾음
- 개인용 Docker Registry 를 운영할 수도 있음
- `docker pull` 또는 `docker run` 명령어를 사용할 경우, Docker 는 필요한 Image 를 설정된 Registry 에서 가져옴
- `docker push` 명령어를 사용할 경우, Docker 가 설정된 Registry 에 Image 를 Push 함

### Docker Objects
- Docker 를 사용할 때, Docker Image, Container, Network, Volume, Plugin 등 여러 Object 를 생성하고 사용하게 됨

#### Docker Images
- Image 는 Docker Container 를 생성하기 위한 instructions 가 포함된 read-only template
- 종종 Image 는 추가적인 customization 이 포함된 또 다른 Image 를 기반으로 함
    - e.g. ubuntu Image 를 기반으로 하는 Apache Web Server 와 Application 이 포함된 Image 를 만들 수 있습니다
- 자신만의 Image 를 만들 수도 있고, 다른 사람이 만들고 레지스트리에 게시한 Image 만 사용할 수도 있습니다
- 자신만의 Image 를 빌드하려면 Image 를 생성하고 실행하는 데 필요한 step 이 포함된 Dockerfile 을 생성해야 합니다
- Dockerfile 의 각 instruction 은 Image 에 레이어를 생성합니다
- Dockerfile 을 변경하고 Image 를 다시 빌드하면 변경된 레이어만 다시 빌드됩니다
- 이는 다른 가상화 기술과 비교할 때 Image 를 매우 가볍고 작고 빠르게 만드는 이유 중 하나입니다

#### Containers
- Container 는 실행 가능한 Image 인스턴스
- Docker API 또는 CLI 를 통해 Container 를 생성, 시작, 중지, 이동, 삭제할 수 있습니다
- Container 를 하나 이상의 네트워크에 연결하거나, Container 에 Storage 를 연결하거나,Conainer 의 현재 상태를 기반으로 새 Image 를 생성할 수도 있습니다
- 기본적으로 Container 는 다른 Container 및 해당 호스트 시스템과 비교적 잘 격리되어 있음
- Container 의 Network, Storage 또는 기타 기본 하위 시스템이 다른 Container 또는 호스트 시스템으로부터 얼마나 격리되는지 제어할 수 있음
- Container 는 Image 와 해당 Container 를 생성하거나 시작할 때 제공하는 구성 옵션으로 정의됨
- Container 가 제거되면 영구 저장소에 저장되지 않은 state 의 모든 변경 사항이 사라짐

## What is a container?

- Container 는 코드를 위한 격리된 환경
- 이는 Container 가 OS 나 파일에 대해 전혀 알지 못한다는 것을 의미함
- Docker Desktop 이 제공하는 환경에서 실행됨
- Container 에는 OS 부터 코드를 실행하는 데 필요한 모든 것이 포함되어 있음
- Docker Desktop 을 사용하여 Container 를 관리하고 탐색할 수 있음
- Container 는 해당 호스트 시스템에서 실행되는 다른 모든 프로세스와 격리된 호스트 시스템에서 실행되는 샌드박스 프로세스입니다
- 이러한 격리는 오랫동안 Linux에 있었던 기능인 kernel namespaces and cgroups 를 활용합니다
- Docker는 이러한 기능을 접근하기 쉽고 사용하기 쉽게 만듭니다
- 요약하자면, 컨테이너는:
    - 실행 가능한 Image 인스턴스입니다. Docker API 또는 CLI 를 사용하여 Container 를 생성, 시작, 중지, 이동 또는 삭제할 수 있습니다.
    - 로컬 머신, 가상 머신에서 실행하거나 클라우드에 배포할 수 있습니다.
    - 이식 가능하며 모든 OS에서 실행될 수 있습니다.
    - 다른 컨테이너와 격리되어 자체 소프트웨어, 바이너리, 설정 등을 실행합니다.
- `chroot` 에 익숙하다면 컨테이너를 `chroot` 의 확장 버전으로 생각하세요.
- 파일 시스템은 Image 에서 나옵니다. 그러나 컨테이너는 `chroot` 를 사용할 때 사용할 수 없는 추가 격리를 더합니다.

## What is an image?
- 실행 중인 컨테이너는 격리된 파일 시스템을 사용함
- 이 격리된 파일 시스템은 Image 에 의해 제공되며 Image 에는 애플리케이션을 실행하는 데 필요한 모든 것(모든 종속성, 구성, 스크립트, 바이너리 등)이 포함되어야 함
- 또한 Image 에는 환경 변수, 실행할 기본 명령, 기타 메타데이터 등 컨테이너에 대한 다른 구성도 포함되어 있습니다.

## Questions
- Docker 는 VM 과 달리 Hypervisor based 가 아니라 OS 위에 Docker Engine 을 실행하여 컨테이너 단위로 환경을 구동함
- 컨테이너 = 한 컴퓨터에서 다른 환경을 제공하기 위한 기술
    - 1개의 Mac 에서 Spring Boot, MySQL, DataDog Agent 등을 컨테이너 단위로 실행할 수 있음
- 즉, Docker 를 사용하는 이유는 한 컴퓨터에서 여러 환경을 구축하기 위해? 물론 이외에도 컨테이너화한다는 장점이 있긴함

## References
---
- [Udemy - Docker for the Absolute Beginner](https://www.udemy.com/course/learn-docker/)
