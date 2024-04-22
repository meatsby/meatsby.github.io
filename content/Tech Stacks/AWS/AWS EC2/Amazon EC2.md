---
title: Amazon EC2
date: 2024-04-15 23:05:56 +0800
status: In Progress
draft: false
tags:
  - AWS
  - EC2
---
## EC2 란
---
- Runs on top of physical host machines managed by AWS using virtualization technology
- A hypervisor running on the host machine is responsible for:
	- Sharing the underlying physical resources between the virtual machines
	- Coordinating this multitenancy
	- Isolating the virtual machines from each other as they share resources from the host
- 서버를 Application 수요에 따라 탄력적으로 확장 가능
- DR features: AMIs, EBS snapshots
- Advantages
	- Integration with VPC, CloudTrail, IAM
	- Flexible, pay-as-you-go pricing model
- Amazon EC2 Pricing
	- On-Demand: You pay for only the compute time you use
	- Reserved Instances: `1-year or 3-year term`
		- Standard: Fixed EC2 type & Region
		- Convertible: Unfixed EC2 type & Region
	- EC2 Instance Savings Plans
		- Provides a discount when you make an `hourly spend commitment` to an instance family and Region for a `1-year or 3-year term`
	- Spot Instances
		- Use unused EC2 computing capacity and offer you cost savings at up to 90% off of On-Demand prices
	- Dedicated Hosts
		- `Physical servers` with EC2 instance capacity that is fully dedicated to your use
- Amazon Elastic Block Store (EBS)
	- 영구적인 스토리지를 위한 용도
	- 하드처럼 EC2 에 붙여서 사용 가능
	- Amazon EBS는 사용하기 쉬운 고성능 블록 스토리지 서비스입니다. 모든 규모의 처리량(throughput) 및 트랜잭션 집약적 워크로드 모두에 대해 Amazon EC2와 함께 Amazon EBS를 사용할 수 있습니다. Amazon EC2 인스턴스에서 데이터베이스를 실행하고 Amazon EBS를 해당 데이터베이스의 스토리지로 사용할 수 있습니다. 하지만 Amazon EBS 자체는 관계형 데이터베이스가 아닙니다.
	- A service that provides `block-level` storage volumes that you can use with Amazon EC2 instances
	- `AZ level resource`
	- Need to be in the same AZ to attach EC2
	- Volumes do not automatically scale
- Elastic Load Balancer
	- Service that automatically distributes incoming application traffic across multiple resources
	- Application Load Balancer (L7: HTTP/HTTPS Routing)
	- Network Load Balancer (L4: TCP Routing)
- Advantages
	- Integration with VPC, CloudTrail, IAM
	- Flexible, pay-as-you-go pricing model

### IAM Instance Profile
- EC2 Instance 에 IAM Role 을 할당할 때 사용하는 설정

## EC2 User Data
---
- EC2 인스턴스가 생성되면서 최초에 실행되는 script
- 생성 시 Advanced Details 에서 작성 가능
	- 제일 윗 줄에 `#!/bin/bash` 필수
- `cat /var/log/cloud-init-output.log` 로 script 실행 로그 확인 가능

## EC2 Memory Swap
---
- EC2 t3.micro 와 같은 free-tier 인스턴스를 사용한다면 OOM Kill process 가 자주 발생한다.
- HDD or SSD 공간을 가상 메모리로 사용하는 Swap Partition 을 활용하자.
- Swap Partition 크기 계산은 [해당 문서](https://repost.aws/ko/knowledge-center/ec2-memory-partition-hard-drive)를 참고

```
# 메모리 확인
$ free -m

# dd 명령을 통해 root file system 에 swap file 을 생성
# bs(블록 크기) * count(블록 수) = swap file 의 크기
# bs(블록 크기)는 인스턴스에서 사용 가능한 메모리보다 작아야 함
$ sudo dd if=/dev/zero of=/swapfile bs=128M count=32

# swap file 의 rw 권한 업데이트
$ sudo chmod 600 /swapfile

# linux swap 영역 설정
$ sudo mkswap /swapfile

# swap 공간에 swap file 을 추가해 즉시 사용할 수 있도록 함
$ sudo swapon /swapfile

# 절차 성공 확인
$ sudo swapon -s

# swap file 을 활성화할 수 있게 설정
$ sudo vi /etc/fstab

# 파일 끝에 아래 줄을 추가하고 저장
/swapfile swap swap defaults 0 0

# 메모리 재확인 시 swap memory 가 allocate 된 것을 확인 가능
$ free -m
```

## References
---
- [AWS re:Post - 스왑 파일을 사용하여 Amazon EC2 인스턴스에서 스왑 스페이스로 작동하도록 메모리를 할당하려면 어떻게 해야 하나요?](https://repost.aws/ko/knowledge-center/ec2-memory-swap-file)
