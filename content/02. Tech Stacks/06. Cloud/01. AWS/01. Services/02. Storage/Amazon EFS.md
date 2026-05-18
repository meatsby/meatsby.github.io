---
title: Amazon EFS
date: 2024-05-14 13:44:37 +0800
status: In Progress
draft: false
tags:
  - AWS
  - EFS
---
## Amazon Elastic File System (EFS)
---
![[EFS.png]]
- 관리형 Network File System, NFS 로 한 지역에서 수백 개의 인스턴스에 연결 가능
- Regional Resource 로 모든 AZ 가 사용할 수 있다
- Multi-AZ 에 위치한 EC2 들과 연결 가능하고 여러 인스턴스들이 동시에 읽고 쓸 수 있다
- Linux 기반 AWS 및 On-premise 서버와 함께 사용 가능한 간단하고 확장성 있는 공유 파일 스토리지 솔루션
- POSIX file system 을 기반으로 하기에 Linux-based AMIs 와 호환된다
- 자동으로 Scaling 한다
- 자주 변경되는 데이터를 처리할 수 있고, 여러 사용자가 동시에 데이터에 접근하고 수정할 수 있도록 지원한다
- 5GB 까지 프리티어로 이용할 수 있다

### EFS Mount Target
EFS 는 네트워크 스토리지이기 때문에 EC2 인스턴스가 EFS 에 접근하기 위해선 Endpoint 가 필요하다. EFS 는 ENI 를 기반으로 Mount Target 이라는 Endpoint 를 제공한다. EC2 인스턴스는 이 Mount Target 을 통해 NFS 프로토콜로 EFS 와 연결한다. 때문에 Mount Target 에 적용될 SG 의 Inbound Rule 은 NFS 프로토콜을 위한 2049번 포트를 허용해야한다. Mount Target 은 VPC 내부에서 작동하고 VPC 서브넷에 연결되며 각 AZ 당 1개의 Mount Target 이 필요하다. Mount Target 마다 고유한 DNS 네임을 제공하고 EC2 인스턴스들은 동일한 AZ 에 위치한 Mount Target 을 통해 EFS 에 접근할 수 있다. Mount Target 이 위치한 AZ 와 다른 AZ 에서 Mount Target 에 접근하더라도 동일한 VPC 에 위치하면 통신이 가능하지만 서로 다른 AZ 간의 통신에는 데이터센터 간 통신이 추가적으로 발생하기 때문에 지연, 비용 등 통신 비효율이 발생할 수 있다.

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
