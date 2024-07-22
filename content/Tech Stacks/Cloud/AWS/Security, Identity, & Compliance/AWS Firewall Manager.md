---
title: AWS Firewall Manager
date: 2024-06-02 21:30:29 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Firewall Manager
---
- Manage rules in all accounts of an AWS Organization
- Security policy: a common set of security rules
	- WAF rules (ALB, API Gateways, CloudFront)
	- AWS Shield Advanced (ALB, CLB, NLB, EIP, CloudFront)
	- Security Groups for EC2, ALB, and ENI resources in VPC
	- AWS Network Firewall (VPC level)
	- R53 Resolver DNS Firewall
	- Policies are created at the regional level
- Rules are applied to new resources as they are created (good for compliance) across all and future accounts in the Organization

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
