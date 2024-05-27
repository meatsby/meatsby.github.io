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

## References
---
- 
