---
title: AWS SAA-C03 Notes
date: 2024-07-10 21:48:33 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS SAA-C03 Notes
---
- S3 Transfer Acceleration = Edge Location 으로 transfer 해서 transfer speed 올리는 법
- PrincipalOrgID = AWS Organization member accounts 만 접근 가능하게 for resource policies
- GW VPC Endpoint vs Interface VPC Endpoint
- Secrets Manager vs Parameter Store
	- Secrets Manager = Auto Rotation
- CloudFront vs Global Accelerator (both support Shield for DDoS)
	- CloudFront = CDN for fast static content delivery, dynamic content (API acceleration)
		- Origin = S3, ALB, EC2, HTTP backend
	- Global Accelerator = Best routing by using Edge Locations
		- TCP/UDP, MQTT(IoT), VoIP, HTTP with static IP address
- Network Firewall = provides filtering for both inbound and outbound network traffic
- GLB = L3 (IP Packets)
- EBS Fast Snapshot Restore (FSR) = no latency on first use
- SSO + MSAD = two-way forest trust AWS Directory Service for MSAD
- AWS Config rules = to check resources that are not properly tagged
- AWS Shield Advanced = ELB, CF, GA, R53

- Direct Connect vs VPN vs VPC endpoint & PrivateLink
- DR RPO/RTO order
- DDB PITR vs AWS Backup
	- PITR = recover table to any point in time in a rolling 35 day window
	- Backup = for long-term archiving and retention
- Glue Job Bookmarks = prevent re-processing old data
- S3 Legal Hold?
- Control Tower vs SCPs
- CloudFront field-level encryption profile?
- Storage Gateway
	- S3 File GW = extend storage space by leveraging Amazon S3
	- FSx File GW
	- Volume GW
		- stored volumes
		- cached volumes
	- Tape GW
- S3 signed cookies vs signed URLs
- Compute Savings Plan vs EC2 Instance Savings Plan
	- EC2 Instance Savings Plan = EC2 only & instance family committed
- io vs gp

- Lambda reserved concurrency vs provisioned concurrency
	- reserved concurrency
	- provisioned concurrency

## References
---
- 
