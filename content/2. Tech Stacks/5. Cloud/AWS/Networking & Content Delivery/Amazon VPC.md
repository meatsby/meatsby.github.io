---
title: "Amazon VPC"
date: 2024-04-15 23:18:55 +0800
status: In Progress
draft: false
tags:
  - AWS
  - VPC
---
## VPC 란
---
- VPC (Virtual Private Cloud) = User-defined logically isolated virtual network
- Multiple VPCs in an AWS region (max 5 per region)
- Max CIDR per VPC is 5, for each CIDR:
	- Min size = /28 (16 IP addresses)
	- Max size = /16 (65536 IP addresses)
- Since VPC is private, only the Private IPv4 ranges are allowed:
	- 10.0.0.0/8
	- 172.16.0.0/12
	- 192.168.0.0/16
- VPC CIDR should not overlap with other networks
- Requires internet gateway to access services such as S3, and DynamoDB from VPC

### Traffic Mirroring
- Allows to capture and inspect network traffic in VPC
- Route the traffic to security appliances
- Capture the traffic
	- From ENIs
	- To an ENI or a NLB
- Capture all packets or capture the packets that are in interest
- Source and Target can be in the same VPC or different VPCs

## Subnet
---
- AWS reserves 5 IP addresses (first 4 & last 1) in each subnet
- These 5 addresses are not available for use and can't be assigned to an EC2 instance
	- e.g. For 10.0.0.0/24:
		- 10.0.0.0 - Network Address
		- 10.0.0.1 - Reserved by AWS for the VPC router
		- 10.0.0.2 - Reserved by AWS for mapping to Amazon-provided DNS
		- 10.0.0.3 - Reserved by AWS for future use
		- 10.0.0.255 - Network Broadcast Address

## Internet Gateway
---
- Allows resources in a VPC to connect to the Internet
- It scales horizontally and is highly available and redundant
- One VPC can only be attached to one IGW and vice versa
- IGW on its own does not allow Internet access
- Route tables must be edited

### Egress-only Internet Gateway
- NATGW for IPv6
- Must update the Route Tables

## Bastion Hosts
---
- Bastion Hosts can be used to SSH into private EC2 instances
- Bastion is in the Public Subnet which is then connected to all other private subnets
- Bastion Host SG must allow inbound from the internet on port 22 from restricted CIDR
- SG of EC2 Instances must allow the SG of the Bastion Host or the Private IP of the Bastion

## NAT Instance (Outdated)
---
- NAT = Network Address Translation
- Allows EC2 instances in Private Subnets to connect to the Internet
- Must be launched in a Public Subnet
- Must disable EC2 setting: Source/destination Check
- Must have EIP attached to it
- Route Tables must be configured to route traffic from private subnets to the NAT Instance

## NAT Gateway
---
- AWS-managed NAT, higher bandwidth, HA, not administration
- Pay per hour for usage and bandwidth
- NATGW is created in a specific AZ, uses an EIP
- Can't be used by EC2 instance in the same subnet (only from other subnets)
- Requires an IGW (Private Subnet -> NATGW -> IGW)
- 5Gbps of bandwidth with automatic scaling up to 45Gbps
- No SGs to manage/required

## NACL & Security Groups
---
### Network Access Control List
- A `Stateless` virtual firewall that controls inbound and outbound traffic for the `subnet`
- Process rules in order, starting with the lowest numbered rule, when deciding whether to allow traffic
- `Default` NACL `allows all inbound and outbound` traffic

### Security Groups
- A `Stateful` virtual firewall that controls inbound and outbound traffic for an `EC2`
- By `default`, it `denies all inbound` traffic and `allows all outbound` traffic

## VPC Peering
---
- Privately connect 2 VPCs using the AWS network
- Make them behave as if they were in the same network
- Must not have overlapping CIDRs
- VPC Peering connection is NOT transitive (must be established for each VPC that needs to communicate with one another)
- Must update route tables in each VPC's subnets to ensure EC2 instances can communicate with each other

## VPC Endpoints
---
- Gateway VPC endpoints provide reliable connectivity to `Amazon S3` and `DynamoDB` without requiring an internet gateway or a NAT device for your VPC

### Interface Endpoints (powered by PrivateLink)
- Provisions an ENI (Private IP address) as an entry point (must attach a SG)
- Supports most AWS services
- $ per hour + $ per GB of data processed
- Preferred when required from on-premises (S2S VPN or Direct Connect), different VPC or different Region

### Gateway Endpoints
- Provisions a gateway and must be used as a target in a route table (does not use SG)
- Supports both S3 and DDB
- Free

## VPC Flow Logs
---
- Capture information about IP traffic going into interfaces:
	- VPC Flow Logs
	- Subnet Flow Logs
	- ENI Flow Logs
- Helps to monitor & troubleshoot connectivity issues
- Flow logs data can go to S3, CloudWatch Logs, and Kinesis Data Firehose
- Also captures network information from AWS-managed interfaces: ELB, RDS, ElastiCache, Redshift, WorkSpaces, NATGW, Transit GW, ...

## AWS Site-to-Site VPN
---
- Creates an `encrypted network path` between the on-premises network and the AWS Cloud network
- This `connection uses the internet`, so you cannot expect consistency
- Even though the traffic is encrypted, the connection is `not private` because the internet is a shared resource

### Virtual Private Gateway (VGW)
- VPN concentrator on the AWS side of the VPN connection
- VGW is created and attached to the VPC
- Possibility to customize the ASN (Autonomous System Number)
- Enable `Route Propagation` for the VPG in the Route Table that is associated with subnets

### Customer Gateway (CGW)
- Software app or physical device on the customer side of the VPN connection
- Use Public Internet-routable IP address for CGW device
	- If it's behind a NAT device, use the Public IP address of the NAT device

## Direct Connect
---
- Provides a dedicated Private connection from a remote network to VPC
- A dedicated connection must be set between DX and AWS Direct Connect Locations
- Need to set a VPG on VPC
- Access public resources and private on the same connection

### Direct Connect Gateway
- To set Direct Connect to one or more VPCs in many different Regions (same account)

## Transit Gateway
---
- To connect and centrally manage network connectivity between `multiple VPCs` in several AWS Regions around the world
- Regional resource (can work cross-region)
- Share cross-account using Resource Access Manager (RAM)
- Can peer TGW across regions
- Route Tables: Limit which VPC can talk with other VPC
- Works with Direct Connect GW, VPN connections
- Supports IP Multicast (not supported by any other AWS service)

## Network Firewall
---
- Protect entire VPC from L3 to L7
	- e.g. To prevent employees from using their Amazon Workspaces virtual desktops to visit specific websites that are known to be malicious

## AWS Client VPN
---
- A managed client-based VPN service
- To securely access AWS resources and the resources in on-premises network
- Can access resources from any location through an OpenVPN-based VPN client
- To connect individual laptops to AWS, not an entire data center
- Client VPN은 AWS 리소스와 온프레미스 네트워크의 리소스에 안전하게 액세스할 수 있는 기능을 제공하는 관리형 클라이언트 기반 VPN 서비스입니다. Client VPN을 사용하면 OpenVPN 기반 VPN 클라이언트를 통해 어느 위치에서나 리소스에 액세스할 수 있습니다. Client VPN을 사용하면 전체 데이터 센터가 아닌 개별 랩톱을 AWS에 연결할 수 있습니다.

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
