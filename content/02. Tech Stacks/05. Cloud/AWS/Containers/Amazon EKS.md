---
title: Amazon EKS
date: 2024-05-16 21:37:44 +0800
status: In Progress
draft: false
tags:
  - AWS
  - EKS
  - K8s
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

### EKS 1.33 과 AL2/AL2023
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

### Upgrade from AL2 to AL2023
AL2 와 AL2023 의 주요 차이점으론 Bootstrap 메커니즘의 변경이 있다. 기존 AL2 에선 `/etc/eks/bootstrap.sh` 스크립트를 EC2 User Data 로 넘겨 kubelet 등 Worker Node 로 작동하기 위한 바이너리들을 실행했는데 AL2023 부턴 Go로 작성된 새로운 도구인 `nodeadm` 바이너리를 통해 Bootstrap 을 진행한다. 때문에 기존에 User Data 로 넘기던 스크립트를 `nodeadm` 형식에 맞춰야한다.

```bash
#!/bin/bash
/etc/eks/bootstrap.sh my-cluster \
  --b64-cluster-ca <base64-ca> \
  --apiserver-endpoint <endpoint> \
  --kubelet-extra-args '--node-labels=foo=bar'
```
기존 AL2 User Data 는 `bootstrap.sh` 에 옵션을 추가하여 설정하고 EKS DescribeCluster API 로 필요한 메타데이터를 자동으로 조회했던 반면,

```yaml
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="BOUNDARY"

--BOUNDARY
Content-Type: application/node.eks.aws

---
apiVersion: node.eks.aws/v1alpha1
kind: NodeConfig
spec:
  cluster:
    name: my-cluster
    apiServerEndpoint: https://EXAMPLE.gr7.us-west-2.eks.amazonaws.com
    certificateAuthority: <base64-ca>
    cidr: 10.100.0.0/16
  kubelet:
    config:
      clusterDNS:
        - 172.20.0.10
    flags:
      - --node-labels=foo=bar

--BOUNDARY--
```
AL2023 User Data (MIME multi-part) 에선 YAML 형태로 설정을 정의하고 대규모 스케일업 시 추가적인 API 호출로 인한 스로틀링 발생을 방지하기 위해 EKS DescribeCluster API 를 호출하는 대신 직접 `apiServerEndpoint`, `certificateAuthority`, `cidr` 등을 필수로 명시하게끔 변경되었다. 특히 `cidr` 의 경우 기존에 `bootstrap.sh` 에선 요구하지 않았지만 `nodeadm` 부터 DNS 설정을 위해 service CIDR 를 직접 주입해주어야한다.

AL2023 AMI 는 systemd 를 통해 nodeadm 을 자동으로 2단계로 실행한다.
- `nodeadm-config.service`: User Data 실행 **전**에 실행, containerd/kubelet 기본 설정
- `nodeadm-run.service`: User Data 실행 **후**에 실행, 최종 설정 완료

```bash
cat > /etc/eks/nodeadm.d/additional-config.yaml << EOF
apiVersion: node.eks.aws/v1alpha1
kind: NodeConfig
spec:
  kubelet:
    config:
      cgroupDriver: cgroupfs
      ...
EOF
```
추가적인 동적 설정은 `/etc/eks/nodeadm.d/` 디렉토리에 YAML/JSON drop-in 파일로 작성할 수 있다.

네트워킹 스택 변경
- AL2: iptables (legacy)
- AL2023: nftables (default), iptables-nft wrapper 제공
- kube-proxy ipvs 모드 사용 시 주의 필요

cgroup 버전 변경
- AL2: cgroup v1
- AL2023: cgroup v2 (unified control group hierarchy)
- cgroupv1 코드는 존재하지만 권장/지원되지 않음, 향후 완전 제거 예정

IMDS (Instance Metadata Service) 요구사항
특정 워크로드가 IMDS 접근이 필요한 경우:
```hcl
# Launch Template에서 hop limit 설정
resource "aws_launch_template" "eks_nodes" {
  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"  # IMDSv2 강제
    http_put_response_hop_limit = 2           # 컨테이너 접근 허용
  }
}
```
- AL2023은 IMDSv2를 기본으로 요구
- 보안 강화: 세션 기반 인증, 1초~6시간 토큰 유효 기간
- Managed Node Group의 기본 hop limit:
  - Launch Template 없이 생성: hop limit = 1 (컨테이너는 노드 credential 접근 불가)
  - Custom AMI + Launch Template: hop limit = 2 (컨테이너 접근 가능)
- 컨테이너 credential 접근 필요 시: Launch Template에서 `HttpPutResponseHopLimit=2` 설정
- 또는 EKS Pod Identity 사용 권장 (IMDSv2 대신 IAM 역할 직접 할당)

#### Instance Reachability Check Failed 원인 분석

**증상:**
- NodeCreationFailure: 새 노드가 node group에 join 실패
- Instance status checks: "Instance reachability check failed"

**가능한 원인:**

**3. IAM Instance Profile 미설정**
AL2023 nodeadm은 부팅 시 즉시 AWS API를 호출하므로 IAM 권한 필수:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceTypes",
        "eks:DescribeCluster",
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage"
      ],
      "Resource": "*"
    }
  ]
}
```

#### 디버깅 방법

**1. System Log 확인 (Serial Console)**
```bash
# EC2 콘솔에서 Instance > Actions > Monitor and troubleshoot > Get system log
# 또는 CLI로:
aws ec2 get-console-output --instance-id i-xxx --output text
```

찾아야 할 패턴:
```
[FAILED] Failed to start nodeadm.service
cloud-init[xxx]: Failed to run module scripts-user
kubelet.service: Failed with result 'exit-code'
```

**2. Session Manager로 접속 (가능한 경우)**
```bash
# SSM Agent가 동작 중이면:
aws ssm start-session --target i-xxx

# 내부에서:
sudo journalctl -u nodeadm -n 100
sudo journalctl -u kubelet -n 100
sudo cat /var/log/cloud-init-output.log
```

**3. User Data 검증**
```bash
# 현재 인스턴스의 User Data 확인
aws ec2 describe-instance-attribute \
  --instance-id i-xxx \
  --attribute userData \
  --query 'UserData.Value' \
  --output text | base64 -d
```

**4. nodeadm 설정 파일 확인**
```bash
# 인스턴스 내부에서
sudo cat /etc/nodeadm/config.yaml
# nodeadm이 파싱한 최종 설정 확인
```

#### 빠른 테스트 방법

**1. 단일 EC2 인스턴스로 먼저 테스트**
```bash
# Launch Template으로 직접 인스턴스 생성
aws ec2 run-instances \
  --launch-template LaunchTemplateId=lt-xxx,Version=1 \
  --subnet-id subnet-xxx

# 5분 후 상태 확인
aws ec2 describe-instance-status --instance-id i-xxx

# System log 확인
aws ec2 get-console-output --instance-id i-xxx
```

**2. kubelet 로그 우선 확인**
```bash
# Session Manager로 접속 후
sudo journalctl -u kubelet -f

# 에러 패턴:
# - "failed to run Kubelet: misconfiguration"
# - "Unable to register node with API server"
# - "failed to get CA cert"
```

**3. nodeadm 수동 실행 테스트**
```bash
# 인스턴스 내부에서
sudo nodeadm init --config-source file:///etc/nodeadm/config.yaml

# 실패 시 상세 로그:
sudo nodeadm init --config-source file:///etc/nodeadm/config.yaml --log-level debug
```

#### 일반적인 실수 TOP 5

1. **AL2 User Data를 그대로 복사** → nodeadm YAML로 변경 필요
2. **User Data에서 nodeadm init 명시적 실행** → drop-in 설정 파일 사용 필요
3. **cluster.cidr 누락** → VPC CIDR 명시 필요
4. **VPC CNI 버전 부족** → 1.16.2 이상 업그레이드 필요
5. **IMDSv2 hop limit 미설정** → Launch Template에서 hop limit 조정 필요

#### 업그레이드 전 체크리스트

**Phase 0: 사전 준비**
- [ ] 클러스터 메타데이터 수집 (User Data에 필요)
```bash
# API Server Endpoint
aws eks describe-cluster --name my-cluster --query 'cluster.endpoint' --output text

# Certificate Authority
aws eks describe-cluster --name my-cluster --query 'cluster.certificateAuthority.data' --output text

# VPC CIDR
aws eks describe-cluster --name my-cluster --query 'cluster.resourcesVpcConfig.vpcId' --output text
aws ec2 describe-vpcs --vpc-ids <vpc-id> --query 'Vpcs[0].CidrBlock' --output text
```

#### 즉시 확인할 사항

현재 상황에서 다음을 확인하세요:

```bash
# 1. 실패한 인스턴스의 System Log
aws ec2 get-console-output \
  --instance-id <failed-instance-id> \
  --region <your-region> \
  --output text > instance-log.txt

# 2. User Data 내용 확인
aws ec2 describe-instance-attribute \
  --instance-id <failed-instance-id> \
  --attribute userData \
  --query 'UserData.Value' \
  --output text | base64 -d

# 3. 사용 중인 AMI가 AL2023인지 확인
aws ec2 describe-instances \
  --instance-ids <failed-instance-id> \
  --query 'Reservations[0].Instances[0].ImageId'

# 4. VPC CNI 버전 확인
kubectl describe daemonset aws-node -n kube-system | grep Image

# 5. IMDSv2 hop limit 확인
aws ec2 describe-instances \
  --instance-ids <failed-instance-id> \
  --query 'Reservations[0].Instances[0].MetadataOptions'
```

#### 네트워크 인터페이스 실패 문제 (Critical)

**증상:**
```
Failed to start - Setup network interface ens5
Failed to start - EKS Nodeadm Boot Hook
Failed to start - EKS Nodeadm Config
cloud-init: Network is unreachable (169.254.169.254)
```

이것은 ENI가 제대로 attach/configure 되지 않아서 발생하는 가장 심각한 문제입니다.

**원인 2: Launch Template에 네트워크 인터페이스 명시적 설정**

네트워크 인터페이스를 Launch Template에 명시하면 EKS가 ENI를 자동으로 관리하지 못함:

```hcl
# ❌ 잘못된 설정 - network_interfaces 블록 사용
resource "aws_launch_template" "eks_nodes" {
  # ...
  
  network_interfaces {
    associate_public_ip_address = false
    security_groups            = [aws_security_group.eks_nodes.id]
    delete_on_termination      = true
  }
}
```

해결:
```hcl
# ✅ 올바른 설정 - network_interfaces 제거
resource "aws_launch_template" "eks_nodes" {
  # ...
  
  # network_interfaces 블록 제거!
  # 대신 vpc_security_group_ids 사용
  vpc_security_group_ids = [aws_security_group.eks_nodes.id]
}
```

**원인 3: Subnet 설정 오류**

```bash
# Subnet이 실제로 존재하고 사용 가능한지 확인
aws ec2 describe-subnets \
  --subnet-ids <subnet-id> \
  --query 'Subnets[0].[SubnetId,State,AvailableIpAddressCount,VpcId]'

# 출력:
# ["subnet-xxx", "available", 250, "vpc-xxx"]  ← ✅ 정상
# ["subnet-xxx", "pending", 0, "vpc-xxx"]      ← ❌ 사용 불가
```

**원인 5: IMDSv1 사용 시도 (AL2023은 IMDSv2 필수)**

```bash
# Launch Template의 IMDS 설정 확인
aws ec2 describe-launch-template-versions \
  --launch-template-id <lt-id> \
  --versions $Latest \
  --query 'LaunchTemplateVersions[0].LaunchTemplateData.MetadataOptions'

# 출력:
{
  "HttpTokens": "optional",           # ❌ IMDSv1 허용 (AL2023에서 문제)
  "HttpPutResponseHopLimit": 1
}
```

해결:
```hcl
resource "aws_launch_template" "eks_nodes" {
  # ...
  
  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"  # ✅ IMDSv2 강제
    http_put_response_hop_limit = 2
  }
}
```

**원인 6: Security Group이 IMDS 접근 차단**

극히 드물지만, Security Group에서 169.254.169.254:80 접근을 차단하는 경우:

```bash
# Security Group 아웃바운드 규칙 확인
aws ec2 describe-security-groups \
  --group-ids <sg-id> \
  --query 'SecurityGroups[0].IpPermissionsEgress'

# 최소한 다음이 필요:
# - 0.0.0.0/0:443 (HTTPS)
# - 169.254.169.254/32:80 (IMDS - 보통 기본 허용)
```

**디버깅 체크리스트 (네트워크 실패 시)**

2. **Launch Template에 network_interfaces 블록이 없는지 확인**
```bash
aws ec2 describe-launch-template-versions \
  --launch-template-id <lt-id> \
  --versions $Latest \
  --query 'LaunchTemplateVersions[0].LaunchTemplateData.NetworkInterfaces'

# 출력: null 또는 빈 배열이어야 함!
```

4. **Subnet에 사용 가능한 IP가 있는지 확인**
```bash
aws ec2 describe-subnets \
  --subnet-ids <subnet-id> \
  --query 'Subnets[0].AvailableIpAddressCount'

# 0보다 커야 함!
```

5. **간단한 테스트 인스턴스 생성 (User Data 없이)**
```bash
# User Data 완전 제거하고 AL2023 AMI로 인스턴스 시작
aws ec2 run-instances \
  --image-id <al2023-ami-id> \
  --instance-type t3.small \
  --subnet-id <subnet-id> \
  --security-group-ids <sg-id> \
  --iam-instance-profile Name=<profile-name>

# 5분 후 SSH 가능한지 확인
# 가능하면 User Data 문제, 불가능하면 네트워크 인프라 문제
```

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
