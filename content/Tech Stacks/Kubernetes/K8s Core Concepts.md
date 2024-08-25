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

## K8s Architecture
---
![[K8s Architecture.png]]
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

## Docker vs containerd
---
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

## ETCD
---
- ETCD is a distributed reliable key-value store that is Simple, Secure & Fast
- K8s 의 모든 상태와 데이터를 저장
- Key-Value 형태로 데이터를 저장
- 분산 시스템으로 구성하여 고가용성 확보
- TTL, watch 등 부가 기능 제공

## Kube-API Server
---
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

## Kube Controller Manager
---
- 다양한 Controller 가 존재
	- A `controller` is a `process` that continuously monitors the state of the components within the system and works towards bringing the whole system to the desired functioning state
	- Replication Controller, Node Controller, Endpoint Controller, ...
	- 끊임 없이 상태를 체크하고 원하는 상태를 유지
	- 복잡성을 낮추기 위해 하나의 프로세스로 실행

### Installing Kube Controller Manager
```
wget https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/linux/amd64/kube-controller-manager
```

## Kube Scheduler
---
- Kube Scheduler decides which pod goes on which node. In other words, it schedules pods on nodes.
- It doesn't actually place the pod on the node, Kubelet is responsible for that instead.
- Node 의 현재 상태와 Pod 의 요구사항을 체크
	- Node 에 Label 부여
		- e.g. a-zone, b-zone, gpu-enabled, ...

### How does it work?
- It filters nodes based on the remaining resources of the nodes.
- Then it ranks the nodes based on the remaining resources that the nodes will have after placing the pod.

### Installing Kube Scheduler
```
wget https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/linux/amd64/kube-scheduler
```

## Kubelet
---
- Kubelet is the sole point of contact for the K8s cluster.
- It will create the pods on the nodes based on the instructions from the Kube Scheduler through the Kube API Server.
- It monitors nodes and pods and continuously communicates with the Kube API Server.

### Installing Kubelet
```
wget https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/linux/amd64/kubelet
```

## Kube Proxy
---
- Kube Proxy is a process that runs on each node.
- Every pod in the K8s cluster can reach every other pod through a pod networking solution.
- 네트워크 프록시와 부하 분산 역할
- 성능상의 이유로 별도의 프록시 프로그램 대신 iptables 또는 IPVS 를 사용하여 설정만 관리

## K8s Objects
---
## Pod
---
- 가장 작은 배포 단위
- 전체 클러스터에서 고유한 IP 할당
- 1~N 개의 Container 를 포함
	- Pods usually have a one-to-one relationship with containers running the app.
	- A single pod can have multiple containers, not the same kind of container but helper containers instead.
- host 폴더 공유, localhost 네트워크 공유
	- This means the app container and the helper container can communicate through localhost.

### How to deploy pods
```
kubectl run nginx --image nginx
kubectl get pods
```
- The first line of command will pull the image from wherever K8s is configured to pull the image from such as public Docker Hub or private registries.

### YAML in K8s
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```
- K8s uses YAML files as inputs for creating objects and all objects contain 4 top-level fields.
	- `apiVersion`
		- The version of K8s API that is used for creating the object.
		- e.g. v1, apps/v1, etc
	- `kind`
		- The type of the object to be created.
		- e.g. Pod, Service, ReplicaSet, Deployment, etc
	- `metadata`
		- A dictionary for metadata describing the object.
		- e.g. name, labels, etc
	- `spec`
		- A specification of the object to be created.
		- For the above example, `containers` section is a list that can be listed with `-` character.

A pod can be created with the command below:
```
kubectl run nginx --image=nginx
```
or using a YAML file:
```
kubectl create -f pod-definition.yaml
kubectl get pods
kubectl describe pod myapp-pod
```

## ReplicaSet
---
- Replication Controller & ReplicaSet is similar but different. The Replication Controller is the older technology that ReplicaSet replaces.
- The ReplicaSet helps to run and maintain the desired number of pods in the K8s cluster by creating and deleting pods based on the configuration. This allows the K8s cluster to achieve high availability.
- It also provides load-balancing & scaling capability by deploying additional pods in existing or additional nodes. This means the ReplicaSet spans across multiple nodes in the cluster.

### Creating Replication Controller with YAML
```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: myapp-rc
  labels:
    app: myapp
    type: front-end
spec:
  template:
    metadata:
      name: myapp-pod
      labels:
        app: myapp
        type: front-end
    spec:
      containers:
      - name: nginx-container
        image: nginx
  replicas: 3
```
- `template`
	- A template of the pod definition.
- `replicas`
	- Number of replicas of the template.

Then run the below commands to create and see the objects created.
```
kubectl create -f rc-definition.yaml
kubectl get replicationcontroller
kubectl get pods
```

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
