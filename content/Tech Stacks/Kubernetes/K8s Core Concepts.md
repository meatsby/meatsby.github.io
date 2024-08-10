---
title: K8s Core Concepts
date: 2024-08-05 21:58:02 +0800
status: In Progress
draft: false
tags:
  - K8s
---
## Container Orchestration
---
Container Orchestration 이란 복잡한 컨테이너 환경을 효과적으로 관리하기 위한 도구로 K8s 가 주로 쓰인다.
- Cluster = Master Node 가 중앙제어, 다수의 Worker Node 가 클러스터를 이루어 서로 통신하며 작동
- State = Desired State 선언 시 관리자의 개입 없이 자동으로 상태를 유지
- Scheduling = Container 를 배치할 적합한 Worker Node 를 찾아 배포
- Rollout Rollback = 배포 버전관리
- Service Discovery = 서비스 등록 및 조회
- Volume = NFS, EBS 등 다양한 스토리지 마운팅

## Cluster Architecture
---
### K8s Architecture
- Worker Nodes = Host Application as Containers
	- Container Runtime
	- Kubelet
	- Kube-proxy
- Master Node = Manage, Plan, Schedule, Monitor Worker Nodes
	- Kube-apiserver
	- Controller-Manager
		- Node-Controller
		- Replication Controller
	- ETCD Cluster = HA Key-Value Store
	- Kube-scheduler = Identifies the right node to place a container

### Docker vs containerd
- Back in time, K8s only supported Docker as its container runtime
- CRI(Container Runtime Interface) was introduced as demand for various container runtime increases
- CRI allowed any vendor to work as a container runtime as long as they follow OCI(Open Container Initiative) standards
	- OCI consists of `imagespec` and `runtimespec`
- Docker consists of `containerd` and many other components such as CLI, API, etc.
- `containerd` is compatible with CRI however other components need `dockershim` to be compatible with K8s
	- But now K8s no longer supports Docker engine through `dockershim`
- We can use below 2 CLIs instead of docker to work with K8s
	- `nerdctl` = for general purpose from ContainerD community
	- `crictl` = for debugging from K8s community (works with all CRI compatible container runtimes)

### ETCD
- ETCD is a distributed reliable key-value store that is Simple, Secure & Fast
- K8s 의 모든 상태와 데이터를 저장
- Key-Value 형태로 데이터를 저장
- 분산 시스템으로 구성하여 고가용성 확보
- TTL, watch 등 부가 기능 제공

### Kube-API Server
- 상태를 바꾸거나 조회
- etcd 와 유일하게 통신하는 모듈
- REST API 형태로 제공
- 요청에 대한 권한 체크
- 수평적 확장 가능

1. Authenticate User
2. Validate Request
3. Retrieve data
4. Update ETCD
5. Scheduler
6. Kubelet

### Controller Managers
- 다양한 Controller 가 존재
	- Replication Controller, Node Controller, Endpoint Controller, ...
	- 끊임 없이 상태를 체크하고 원하는 상태를 유지
	- 복잡성을 낮추기 위해 하나의 프로세스로 실행

### Kube Scheduler
- 새로 생성된 Pod 를 감지하고 실행할 Node 를 선택
- Node 의 현재 상태와 Pod 의 요구사항을 체크
	- Node 에 Label 부여
		- e.g. a-zone, b-zone, gpu-enabled, ...

### Kubelet
- 각 Node 에서 실행
- Pod 을 실행/중지하고 상태 체크
- CRI

### Kube Proxy
- 네트워크 프록시와 부하 분산 역할
- 성능상의 이유로 별도의 프록시 프로그램 대신 iptables 또는 IPVS 를 사용하여 설정만 관리

## K8s Objects
---
### Pod
- 가장 작은 배포 단위
- 전체 클러스터에서 고유한 IP 할당
- 1~N 개의 Container 를 포함
- host 폴더 공유, localhost 네트워크 공유

### ReplicaSet
- 여러개의 Pod 을 관리
- Pod 을 생성 또는 제거하여 원하는 수를 유지

### Deployment
- 내부적으로 ReplicaSet 을 이용하여 배포 버전을 관리

### Service - ClusterIP
- 클러스터 내부에서 사용하는 프록시
- Pod 은 동적이지만 서비스는 고유 IP 를 가짐
- 클러스터 내부에서 서비스 연결은 DNS 를 이용

### Service - NodePort
- Node(host) 에 노출되어 외부에서 접근 가능한 서비스
- 모든 Node 에 동일한 포트로 생성

### Service - LoadBalancer
- 하나의 IP 주소를 외부에 노출

### Ingress
- 도메인 또는 경로별 라우팅
	- Nginx, HAProxy, ALB, ...

## API Primitives
---


## Services & Other Network Primitives
---


## References
---
- [Udemy - Certified Kubernetes Administrator (CKA) with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/)
