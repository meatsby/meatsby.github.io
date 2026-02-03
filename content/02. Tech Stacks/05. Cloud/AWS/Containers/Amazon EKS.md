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

## EKS 1.32 to 1.33 Upgrade
---
### EKS 1.33 Breaking changes
K8s 버전 업그레이드 시 항상 API deprecation 이 있는지 확인해야 한다. [kubepug](https://github.com/kubepug/kubepug) 를 활용하면 cluster 에 deprecated 될 API 가 있는지 쉽게 확인할 수 있다.

### EKS 1.33 과 AL/AL2023
EKS 1.33 부터 AL2 기반 EKS Optimized AMI 는 v20251209 를 마지막으로 deprecated 되고 AL2023 기반 AMI 만 제공된다. AL2 기반에서 Kubernetes 1.33 이 이론적으로 안 돌아가는 건 아니지만 containerd 2.x, runc 1.3+, cgroup v2 안정성, seccomp / eBPF 등 직접 다 책임지고 맞춰야한다.

### EKS Optimized AMI
```
amazon-eks-ami/
├── templates/                              # Packer 템플릿 및 프로비저닝 스크립트
│   ├── al2/                                # Amazon Linux 2 AMI 빌드
│   │   ├── template.json                   # AL2용 Packer 메인 템플릿
│   │   ├── variables-default.json          # AL2 기본 변수 설정
│   │   ├── provisioners/                   # AL2 프로비저닝 스크립트
│   │   └── runtime/                        # 런타임 구성 파일 (systemd, scripts 등)
│   ├── al2023/                             # Amazon Linux 2023 AMI 빌드
│   │   ├── template.json                   # AL2023용 Packer 메인 템플릿
│   │   ├── variables-default.json          # AL2023 기본 변수
│   │   ├── variables-1.28.json             # K8s 1.28 전용 변수
│   │   ├── variables-1.29.json             # K8s 1.29 전용 변수
│   │   ├── variables-1.30.json             # K8s 1.30 전용 변수
│   │   ├── variables-1.31.json             # K8s 1.31 전용 변수
│   │   ├── variables-1.32.json             # K8s 1.32 전용 변수
│   │   ├── provisioners/                   # AL2023 프로비저닝 스크립트
│   │   └── runtime/                        # AL2023 런타임 파일
│   ├── shared/                             # 공통 프로비저닝 스크립트
│   │   ├── provisioners/
│   │   └── runtime/                        # 공통 런타임 파일
├── nodeadm/                                # EKS 노드 관리 도구 (Go 프로젝트)
│   ├── go.mod                              # Go 모듈 정의
│   ├── Makefile                            # nodeadm 빌드 스크립트
│   ├── cmd/                                # 실행 파일 소스
│   ├── api/                                # Kubernetes API 정의
│   ├── internal/                           # 내부 패키지
│   ├── test/e2e/                           # E2E 테스트
│   ├── crds/                               # CRD YAML 파일
│   └── vendor/                             # 벤더 의존성
├── log-collector-script/                   # EKS 로그 수집 도구
│   ├── linux/                              # Linux용 로그 수집
│   └── windows/                            # Windows용 로그 수집
├── hack/                                   # 개발 도구 및 스크립트
│   ├── latest-binaries.sh                  # 최신 바이너리 버전 조회
│   ├── generate-nvidia-open-supported-devices.sh
│   ├── generate-template-variable-doc.py   # 변수 문서 자동 생성
│   ├── lint-docs.sh                        # 문서 린트
│   ├── lint-space-errors.sh                # 공백 오류 체크
│   ├── shellcheck                          # Shell 스크립트 린터
│   ├── shfmt                               # Shell 포맷터
│   ├── nodeadm-check-generate.sh           # nodeadm 코드 생성 검증
│   └── nodeadm-check-vendor.sh             # nodeadm 벤더 검증
└── Makefile                                # 메인 빌드 스크립트
```
[amazon-eks-ami](https://github.com/awslabs/amazon-eks-ami) 는 AL2, AL2023, Bottlerocket 각 OS AMI 를 기반으로 EKS Optimized AMI 를 Packer 로 정의한 IaC 레포다. 해당 레포에서 머신이 EKS Worker Node 로 작동하기 위해 필요한 `kubelet`, `kube-proxy`, `containerd`, CNI bootstrap, `/etc/eks/bootstrap.sh`, systemd unit, OS 별 iptables/nftables 설정 등을 추가하는 자동화 스크립트를 확인할 수 있다.

현재 사내에선 AL2 기반의 EKS Worker Node 를 구성하여 사용하고있다. AWS 에선 AL2 기반 EKS Optimized AMI 지원을 2025년 11월 26일부로 중단해서 EKS 1.33 버전부턴 AL2 기반의 AMI 가 공식적으로 존재하지 않는다. 하지만 [공식문서](https://docs.aws.amazon.com/eks/latest/userguide/eks-ami-deprecation-faqs.html)에 따르면 AL2 를 기반으로 구성한 Custom Worker Node AMI 의 경우 AL2 의 EOS 인 2026년 6월 30일까지 사용할 수 있다고 한다. 웬만하면 기존에 구성해왔던 방식인 AL2 기반으로 EKS 1.33 Custom Worker Node AMI 를 구성하려고 했으나 containerd 1.7.x 에 존재하는 보안 이슈 때문에 공식적으로 containerd 2.1.5 를 기반으로 작성된 AL2023 AMI 로 Worker Node AMI 를 재구성하기로했다. 어쨌든 Bottlerocket 으로 넘어갈 예정이긴 하다만...

### 1.32에서 1.33으로 업그레이드 시 고려사항
- Kubernetes 1.33은 containerd 2.x를 강력히 권장
- 이전 버전(containerd 1.7)도 호환은 되지만 새로운 기능 활용에 제한
- cgroup v2, CRI v1 API 완전 구현 등은 containerd 2.x 기반
- 스택 의존성 구조:
```
Kubernetes 1.33
  ↓
kubelet (CRI client)
  ↓
containerd 2.x (CRI server)
  ↓
Linux Kernel 6.1 (cgroup v2, seccomp)
```
- AL2는 kernel 5.10 + containerd 1.7 조합
- AL2023은 kernel 6.1 + containerd 2.x 조합
- K8s 1.33의 보안/격리 기능은 cgroup v2 활용이 전제

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
