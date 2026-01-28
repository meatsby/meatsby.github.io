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

### EKS optimized AMI 지원 현황
Amazon 에선 EKS-optimized AMI 를 어떻게 구성했는지 [amazon-eks-ami](https://github.com/awslabs/amazon-eks-ami) 레포에 공개한다. 해당 레포를 기반으로 AMI 를 커스터마이징해서 사용할 수 있다. 현재 Amazon Linux 2 (AL2) 를 기반으로 EKS Worker Node 를 구성하고 있다. Amazon 에선 EKS 1.33 버전부터 EKS-optimized AL2 AMI 를 2025년 11월 26일부로 중단했다. 하지만 you can build a custom AMI with an Amazon Linux 2 base instance until the Amazon Linux 2 EOS date (June 30, 2026). 2026년 6월 30일 전까지 Amazon Linux 2023 (AL2023) 또는 Bottlerocket 기반으로 AMI 를 재구성해야한다.

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

### AL2 기반으로 1.33 Worker Node 구성 시 필요한 작업
Amazon이 AL2 + 1.33 AMI를 제공하지 않으므로 직접 커스텀 AMI 제작 필요

1. containerd 2.x 빌드 및 설치
    - AL2 패키지 저장소에는 containerd 1.7만 존재
    - upstream containerd GitHub에서 소스 다운로드
    - Go 컴파일러 설치 및 빌드 환경 구성
    - 바이너리 컴파일 후 /usr/bin/containerd 설치
    - systemd unit 파일 작성 및 등록

2. runc 최신 버전 설치
    - containerd 2.x는 runc 1.1.x 이상 요구
    - AL2 기본 제공 버전은 구버전
    - upstream에서 빌드하거나 바이너리 다운로드

3. CNI plugins 업데이트
    - containerd 2.x와 호환되는 CNI plugins 버전 필요
    - /opt/cni/bin/ 경로에 최신 바이너리 배치

4. kubelet 설정 조정
    - containerd 2.x의 CRI socket 경로 확인
    - kubelet 실행 인자에 --container-runtime-endpoint 명시
    - /etc/kubernetes/kubelet/kubelet-config.json 업데이트

5. 보안 패치 관리 프로세스 구축
    - containerd 보안 업데이트 모니터링 (CVE 추적)
    - 패치 발생 시 수동 빌드 및 배포
    - 기존 Node Group 교체 전략 수립

6. 테스트 및 검증
    - Amazon이 검증하지 않은 조합이므로 자체 테스트 필요
    - Pod 생성/삭제, volume mount, network policy 등 시나리오 검증
    - 부하 테스트로 성능/안정성 확인

7. 지속적인 모니터링 및 대응
    - cgroup v2 관련 기능 제한 사항 파악
    - kernel 5.10에서 지원하지 않는 기능 문서화
    - 프로덕션에서 발생하는 edge case 대응

엔지니어링 비용:
- 초기 AMI 구성: 1-2주
- 테스트 및 검증: 1주
- 지속적인 유지보수: 월 2-4시간 (패치 모니터링, 업데이트)
- 기술 부채: 향후 1.34 업그레이드 시 추가 작업 필요

### AL2023 기반으로 1.33 Worker Node 구성
1. amazon-eks-ami 레포 활용
    - AWS 공식 빌드 스크립트 사용
    - Packer 템플릿으로 AMI 자동 생성
    - 또는 AWS 제공 pre-built AMI 직접 사용

2. 포함된 구성요소 (모두 검증된 버전)
    - kubelet, kubectl
    - containerd 2.x, runc
    - aws-iam-authenticator
    - VPC CNI plugin
    - EKS 특화 설정 (eni-max-pods, DNS 등)

3. 보안 패치 자동화
    - AL2023 패키지 저장소에서 containerd 업데이트 제공
    - yum/dnf update로 간단히 패치 적용
    - Amazon이 검증한 조합만 배포됨

4. 마이그레이션 고려사항
    - systemd unit 파일 경로/문법 일부 변경
    - yum에서 dnf로 패키지 매니저 변경
    - 일부 패키지 이름 변경 가능
    - 대부분 호환성 유지, 주요 변경점만 확인 필요

엔지니어링 비용:
- AMI 구성: 1-2일 (amazon-eks-ami 레포 기반)
- 워크로드 검증: 2-3일
- 유지보수: 거의 없음 (AWS 관리)

### AL2023을 선택해야 하는 이유
Amazon의 신호:
- AL2 + 1.33 조합 AMI를 제공하지 않음
- vendor가 제공하지 않는 조합은 명백한 이유가 있음
- managed service의 핵심은 vendor의 검증된 조합을 사용하는 것

기술적 최적화:
- containerd 2.x + kernel 6.1로 K8s 1.33 기능 완전 활용
- cgroup v2, seccomp, ebpf 등 최신 기능 지원
- 성능 및 보안 최적화

운영 효율성:
- 보안 패치 자동화
- Amazon의 지속적인 검증 및 업데이트
- 향후 1.34, 1.35 업그레이드 경로 보장
- 장애 발생 시 AWS 지원 가능

시간 관점:
- AL2는 2025년 6월 EOL
- 지금 AL2로 가면 6개월 후 다시 마이그레이션
- 이중 작업보다 한 번에 AL2023으로 전환이 효율적

리스크 관점:
- 검증되지 않은 조합 사용 시 프로덕션 장애 위험
- 기술 부채 누적
- 트러블슈팅 시 참고할 레퍼런스 부족

### amazon-eks-ami 레포
- AWS 공식 EKS Optimized AMI 빌드 스크립트 저장소
- Packer를 사용한 AMI 생성 자동화
- Amazon이 테스트하고 보증하는 조합만 제공
- AL2 + 1.33 조합이 레포에 없음 = 프로덕션 사용 비권장
- 커스텀 AMI 제작 시에도 이 레포를 base로 사용하는 것이 일반적
- 각 Kubernetes 버전별로 최적화된 설정 및 패치 포함

### 결론
이론적 가능성:
- AL2 + containerd 1.7 + K8s 1.33 조합은 작동은 함
- Kubernetes 1.33이 containerd 1.7을 즉시 deprecate 한 것은 아님
- 충분한 시간과 노력을 들이면 커스텀 AMI 제작 가능

프로덕션 판단:
- 작동함과 지원됨과 써도 됨은 다른 문제
- EKS 1.33 업그레이드 = AL2023 전환 동시 진행이 유일한 합리적 선택
- 지금 AL2로 가면 6개월 후 다시 마이그레이션
- 기술 부채는 초기에 차단하는 것이 효율적

의사결정 기준:
- Amazon 공식 AMI 제공 여부: AL2023만 Yes
- 장기 지원 가능 여부: AL2023만 Yes
- 엔지니어링 부담: AL2023이 최소
- 비즈니스 리스크: AL2023이 최저

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
