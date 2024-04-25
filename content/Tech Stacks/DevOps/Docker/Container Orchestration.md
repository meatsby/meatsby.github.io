---
title: Container Orchestration
date: 2024-04-25 18:48:52 +0800
status: In Progress
draft: false
tags:
  - Container_Orchestration
---
## Container Orchestration
---
- 컨테이너의 성능과 상태를 모니터링하고 호스팅하는 데 도움을 주는 도구와 스크립트로 구성
	- 컨테이너가 죽어서 다시 살려야 할 경우
	- 호스트가 죽어서 다른 호스트로 살려야 할 경우
- Container Orchestration 솔루션은 Container 를 호스팅할 수 있는 여러 개의 Host 로 구성됨
	- 컨테이너나 호스트가 죽어도 다른 호스트의 컨테이너로 엑세스할 수 있음
- Container Orchestration 솔루션을 사용하면 수많은 인스턴스를 명령어 하나로 간단히 배포 가능
- Container Orchestration 솔루션은 오토 스케일링, 로드 밸런싱, 네트워킹, 스토리지 공유, 클러스트 내부 구성 관리 및 보안 등 많은 기능을 지원함

## Kubernetes
---
### Node
- Kubernetes 가 설치된 물리 또는 가상 머신
- Worker Node: Container 가 실행되는 곳
- Master Node: Kubernetes Control Plane 이 설치된 Node
	- Cluster 내부의 Node 를 모니터링하고 Worker Node 의 Container Orchestration 을 관리

### Cluster
- 그룹화된 Node 의 집합

### Components
- API Server
	- k8s 의 프론트엔드 역할
	- 사용자, 관리 장치, CLI 모두 이 API Server 와 통신하여 k8s 와 상호작용
- etcd Server
	- k8s 가 Cluster 를 관리할 때 사용하는 모든 데이터가 etcd 분산 키값 저장소에 저장됨
- kubelet Service
	- Cluster 의 각 Node 에서 실행되는 Agent
	- Container 가 Node 에서 예상대로 실행되고 있는지 확인
- Container Runtime
	- Docker 과 같은 Container 실행에 필요한 기본 소프트웨어
- Controller
	- k8s 의 두뇌
	- Node, Container, Endpoint 가 닫힐 때 감지하고 반응
- Scheduler
	- 작업이나 Container 를 여러 Node 에 배포
	- 새로 생성된 Container 를 찾아 Node 에 할당

### kubectl
```
kubectl run --replicas=1000 my-web-server
kubectl scale --replicas=2000 my-web-server
kubectl rolling-update my-web-server --image=web-server:2
kubectl rolling-update my-web-server --rollback
```
- k8s 를 제어하는 k8s CLI

## References
---
- [Udemy - Docker for the Absolute Beginner](https://www.udemy.com/course/learn-docker/)
