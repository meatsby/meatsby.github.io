---
title: Amazon EKS
date: 2024-05-16 21:37:44 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon EKS
---
- EKS = Elastic Kubernetes Service
- AWS에서 관리형 Kubernetes 클러스터를 시작하는 방법
- K8s는 컨테이너화된(일반적으로 Docker) 애플리케이션의 자동 배포, 확장 및 관리를 위한 오픈소스 시스템
- ECS의 대안으로 비슷한 목표를 가지지만 다른 API를 사용
- EKS는 워커 노드를 배포하려는 경우 EC2를 지원하고 서버리스 컨테이너를 배포하려는 경우 Fargate를 지원
- 사용 사례: 회사가 이미 온프레미스 또는 다른 클라우드에서 K8s를 사용 중이고, K8s를 사용하여 AWS로 마이그레이션하려는 경우
- K8s는 클라우드 독립적 (Azure, GCP 등 모든 클라우드에서 사용 가능)
- EKS 는 오픈소스 k8s 를 수정하지 않고 구동한다.
- EKS 는 4개의 k8s 마이너 버전을 지원한다.

### Node Types
- Managed Node Groups
    - 노드(EC2 인스턴스)를 자동으로 생성하고 관리
    - 노드는 EKS가 관리하는 ASG의 일부
    - On-Demand 또는 Spot 인스턴스 지원
- Self-Managed Nodes
    - 사용자가 직접 생성한 노드를 EKS 클러스터에 등록하고 ASG로 관리
    - 사전 구축된 AMI 사용 가능 - Amazon EKS Optimized AMI
    - On-Demand 또는 Spot 인스턴스 지원
- AWS Fargate
    - 유지 관리 불필요, 노드 관리 불필요

### Data Volumes
- EKS 클러스터에 Storage Class manifest를 지정해야 함
- Container Storage Interface (CSI) 호환 드라이버 활용
- 지원 스토리지:
    - EBS
    - EFS (Fargate와 호환)
    - FSx for Lustre
    - FSx for NetApp ONTAP

### EKS Cluster Endpoint
EKS 는 Node Group 을 통해 Worker Node 를 관리한다. 각 Worker Node 는 On-Demand 와 Spot Instance 로 각 AZ 에 고루 배치된다. 각 Worker Node 의 ENI 는 R53 의 Private Hosted Zone 을 통해 Control Plane 의 API Server 와 통신한다. 운영자는 `46E8024.eks.amazonaws.com` 과 같은 형태의 Control Plane 의 Public IP 를 통해 kubectl 로 상호작용할 수 있다.

### EKS Data Plane Options
Worker Node 를 구성하는 EKS Data Plane 은 크게 3가지로 구분된다.
1. Self-Managed Node Group
	- Custom AMI 를 이용하고 ASG 를 사용자가 직접 관리한다. OS 에 대한 기본 구성, 패치에 대한 책임은 사용자의 책임 영역에 해당한다.
2. Managed Node Group
	- 최신의 EKS Optimized AMI 를 사용하며 새로운 AMI 에 대한 배포 및 구버전 AMI 제거 등 모두 자동화하여 AWS 가 처리한다.
3. AWS Fargate

### Container 네트워킹
![[Pasted image 20260121221205.png]]

### Pod 네트워킹
![[Pasted image 20260121214441.png]]
- Pause Container 의 Network Namespace 를 공유
- Pause Container 의 IP 주소를 받아서 공유
- Pod 내 Container 는 localhost 통신
- 동일 Node 에 위치한 타 Pod 와 통신할 경우 Bridge, 다른 Node 에 위치한 타 Pod 와 통신할 경우 CNI

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
