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
