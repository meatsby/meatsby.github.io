---
title: Docker Overview
date: 2024-03-17 21:16:50 +0800
status: In Progress
draft: false
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
![[The Matrix from Hell.png]]
- Compatibility/Dependency
    - 여러 기술 스택을 사용할 때 (e.g. Node.js, MongoDB, Redis, Ansible)
    - 운영 체제와의 호환성 문제 + 라이브러리와 의존성 문제
        - 어떤 서비스는 A 버전, 다른 서비스는 B 버전의 라이브러리와 의존성이 필요함
    - 변경 사항이 생길 때 마다 컴포넌트와 인프라 간의 호환성을 확인해야 함..
        - 이런 호환성 매트릭스 문제를 The Matrix from Hell 이라고도 부름
- Long setup time
    - 새로운 개발자 합류 시 새로운 개발 환경 구성이 쉽지 않음
- Different Dev/Test/Prod environments

### What can it do?
![[Docker Container.png]]
- 이런 호환성 문제를 해결해줄 수 있고, 컴포넌트를 수정하거나 변경하면서도 다른 컴포넌트에 영향을 주지 않으면서 운영 체제를 수정할 수 있는 것이 바로 Docker
- Docker 가 있으면 컴포넌트를 실행할 때 각자의 의존성과 라이브러리를 갖춘 분리된 컨테이너를 활용해 같은 가상 머신과 운영 체제에서 환경과 컨테이너를 분리할 수 있었음

### What are Containers?
![[Container.png]]
- 컨테이너란 완전히 분리된 환경으로 각자의 프로세스, 서비스 그리고 네트워크 인터페이스, 마운트를 가상 머신처럼 가지고 있지만 운영 체제 커널은 동일함
- 컨테이너는 전에도 있던 개념 (e.g. LXC, LXD, LXCFS 등)
    - Docker 는 그 중 LXC 컨테이너를 사용함
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
![[Containers & VMs.png]]
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

## References
---
- [Udemy - Docker for the Absolute Beginner](https://www.udemy.com/course/learn-docker/)
