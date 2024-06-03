---
title: Amazon VPC
date: 2024-04-15 23:18:55 +0800
status: In Progress
draft: false
tags:
  - AWS
  - VPC
---
## VPC 란
---
- User-defined logically isolated virtual network
- Requires internet gateway to access services such as S3, DynamoDB from VPC
- VPC Flow Logs
	- To capture information about inbound and outbound traffic in an Amazon VPC
- VPC Endpoints
	- Gateway VPC endpoints provide reliable connectivity to `Amazon S3` and `DynamoDB` without requiring an internet gateway or a NAT device for your VPC
- VPC Peering
	- To establish a connection between `2 VPCs`
- Network ACLs
	- A `Stateless` virtual firewall that controls inbound and outbound traffic for the `subnet`
	- Process rules in order, starting with the lowest numbered rule, when deciding whether to allow traffic
	- `Default` network ACL `allows all inbound and outbound` traffic
- Security Groups
	- A `Stateful` virtual firewall that controls inbound and outbound traffic for an `EC2`
	- By `default`, it `denies all inbound` traffic and `allows all outbound` traffic
- Network Firewall
	- To prevent employees from using their Amazon Workspaces virtual desktops to visit specific websites that are known to be malicious
- Virtual Private Gateway
	- Allows protected internet traffic to enter into the VPC
	- Enables you to establish a VPN connection between your VPC and a private network
- AWS Site-to-Site VPN
	- Creates an `encrypted network path` between on-premises network and AWS Cloud network
	- This `connection uses the internet`, so you cannot expect consistency
	- Even though the traffic is encrypted, the connection is `not private` because the internet is a shared resource
	- Composed of `Virtual Private Gateway` and `Customer Gateway`
- AWS Client VPN
	- A managed client-based VPN service
	- To securely access AWS resources and the resources in on-premises network
	- Can access resources from any location through an OpenVPN-based VPN client
	- To connect individual laptops to AWS, not an entire data center
- Transit Gateway
	- To connect and centrally manage network connectivity between `multiple VPCs` in several AWS Regions around the world

- 사용자의 AWS 계정 전용 가상 네트워크
- S3, DynamoDB 같은 곳은 다이렉트 접근 불가, 인터넷 GW 를 통해 접근 가능
- AWS Client VPN
	- Client VPN은 AWS 리소스와 온프레미스 네트워크의 리소스에 안전하게 액세스할 수 있는 기능을 제공하는 관리형 클라이언트 기반 VPN 서비스입니다. Client VPN을 사용하면 OpenVPN 기반 VPN 클라이언트를 통해 어느 위치에서나 리소스에 액세스할 수 있습니다. Client VPN을 사용하면 전체 데이터 센터가 아닌 개별 랩톱을 AWS에 연결할 수 있습니다.
- AWS Site-to-Site VPN
	- Site-to-Site VPN은 온프레미스 네트워크와 AWS 클라우드 네트워크 간에 암호화된 네트워크 경로를 생성합니다. 이 연결은 인터넷을 사용하므로 일관성을 기대할 수 없습니다. 트래픽이 암호화되더라도 인터넷은 공유 리소스이므로 연결은 비공개가 아닙니다.
	- Site-to-Site VPN은 온프레미스 네트워크와 AWS 클라우드 네트워크 간에 암호화된 네트워크 경로를 생성합니다. 온프레미스 네트워크와 AWS 클라우드 네트워크 간의 이러한 연결은 인터넷을 사용합니다.
	- Virtual Private GW & Customer GW
- Network ACLs
	- `Stateless`
	- Process rules in order, starting with the lowest numbered rule, when deciding whether to allow traffic
- ⭐️ Security Groups
	- EC2 인스턴스에 대한 가상 방화벽 역할
	- ACL 과 함께 VPC 내의 보안을 강화하기 위한 기능
	- ACL 과 다르게 `Stateful` 방화벽으로 동작
	- Acts as a firewall for EC2 instance
- VPC Peering
	- To establish a connection between 2 VPCs
- Transit Gateway
	- To connect and centrally manage network connectivity between multiple VPCs in several AWS Regions around the world

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
