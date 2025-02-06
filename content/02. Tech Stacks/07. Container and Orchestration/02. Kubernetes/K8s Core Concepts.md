---
title: "K8s Core Concepts"
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

### Creating ReplicaSet with YAML
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
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
  selector:
    matchLabels:
      type: front-end
```
- `template`
	- A template of the pod definition.
- `replicas`
	- Number of replicas of the template.
- `selector`
	- It helps identify pods that fall under it so that it can monitor the selected pods and maintain the number of replicas in the cluster.

Then run the below commands to create and see the objects created.
```
kubectl create -f replicaset-definition.yaml
kubectl get replicaset
kubectl get pods
```

To scale the number of replicas by file:
```
kubectl replace -f replicaset-definition.yaml
```

To scale the number of replicas by command:
```
kubectl scale --replicas=6 -f replicaset-definition.yaml
```
or
```
kubectl scale --replicas=6 replicaset myapp-replicaset
```
- Note these two commands will not change the definition file.

## Deployment
---
- 내부적으로 ReplicaSet 을 이용하여 배포 버전을 관리
- The Deployment provides the capability of upgrading underlying instances seamlessly using rolling updates, undo changes, pauses, and resume changes as required.

### Creating Deployment with YAML
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-replicaset
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
  selector:
    matchLabels:
      type: front-end
```
- All contents of the Deployment are exactly similar to the ReplicaSet definition file.

Run the below commands to create and find the objects created:
```
kubectl create -f deployment-definition.yaml
kubectl get deployments
kubectl get replicaset
kubectl get pods
```
or
```
kubectl get all
```

### Service - NodePort
```yml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  ports:
   - targetPort: 80
   - port: 80
   - nodePort: 30008
  selector:
    app: myapp
    type: front-end
```
- Node(host) 에 노출되어 외부에서 접근 가능한 서비스
- 모든 Node 에 동일한 포트로 생성
- targetPort 는 target pod 의 port 를 지정, 지정하지 않을 경우 port 와 같은 값을 가짐
- port 는 Service Object 의 port 를 지정 (required)
- nodePort 는 30,000 ~ 32,767 까지의 범위 안에 속해야 하며 지정하지 않을 경우 자동으로 할당됨
- selector 를 통해 target pod 를 지정
- 하나의 Node 에 같은 종류의 Pod 가 여러개 있을 경우 Service 가 알아서 selector 에 해당하는 Pod 를 찾고 부하를 분산하여 각각 Pod 에 Random 하게 보내줌.
- 여러 Node 에 Pod 가 배포되어 있을 경우에도 Service 는 모든 Node 에 걸쳐 적용되어 아무 Node 에 요청을 보내도 알아서 아무 Node 에 배포된 Pod 에 트래픽을 보냄.

### Service - ClusterIP
```yml
apiVersion: v1
kind: Service
metadata:
  name: back-end
spec:
  type: ClusterIP
  ports:
   - targetPort: 80
   - port: 80
  selector:
    app: myapp
    type: back-end
```
- 클러스터 내부에서 사용하는 프록시
- Pod 은 동적이지만 서비스는 고유 IP 를 가짐
- 클러스터 내부에서 서비스 연결은 DNS 를 이용
- 가령 3-tier-architecture 에서 backend app 에 요청을 보내고 싶을 때 backend 를 담당하는 여러 Pod 가 cluster 전체에 퍼져있으니 ClusterIP 를 통해 원하는 layer 를 지정

### Service - LoadBalancer
```yml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: LoadBalancer
  ports:
   - targetPort: 80
   - port: 80
   - nodePort: 30008
```
- 하나의 IP 주소를 외부에 노출하여 지정된 Pod 에 요청이 도달할 수 있도록 도와줌
- NodePort 대신 AWS, Azure, GCP 등에서 제공하는 Native Load Balancer 로 부하를 분산하여 보내는 역할을 수행함

### Namespaces
K8s Cluster 를 구축하게되면 기본적으로 Default, kube-system, kube-public Namespace 들이 자동으로 생성된다. 사용자가 생성한 Pod, Deployment, Service 등 K8s Object 들은 기본적으로 Default Namespace 에 속하게 된다.

```
kubectl get pods --namespace=kube-system
```
kube-system Namespace 의 경우, coredns, etcd-master, kube-apiserver-master, kube-controller-manager-master 등 K8s 의 기본적인 Component 들을 확인할 수 있다.

```
kubectl create -f pod-definition.yml --namespace=dev
```
K8s Object 를 특정 Namespace 에 배포하고 싶을 경우엔 옵션으로 namespace 를 지정해주거나,

```yml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  namespace: dev
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```
위 처럼 metadata 필드에 namespace 를 추가해주면된다.

```yml
apiVersion: v1
kind: Namespace
metadata:
  name: dev
```
Namespace 를 생성할 땐 위처럼 Namespace yaml 을 생성한 뒤,

```
kubectl create -f namespace-dev.yml
```
위 명령어로 생성하거나,

```
kubectl create namespace dev
```
yaml 파일 없이 명령어로 생성할 수 있다.

```
kubectl config set-context $(kubectl config current-context) --namespace=dev
```
위 명령어를 통해 cli 작업 위치를 특정 Namespace 로 이동시킬 수도 있다.

```yml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: dev
spec:
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: 5Gi
    limits.cpu: "10"
    limits.memory: 10Gi
```
특정 Namespace 에 하드웨어 리소스를 할당할 때엔 ResourceQuota yaml 을 생성한 뒤,

```
kubectl create -f compute-quota.yml
```
생성하여 자원을 할당해줄 수 있다.

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
