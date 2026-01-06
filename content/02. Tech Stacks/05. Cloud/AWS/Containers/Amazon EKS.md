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

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
