---
title: "AWS Transfer Family"
date: 2023-12-15 13:30:00 +0800
status: In Progress
tags:
  - AWS
  - SFTP
---
## AWS Transfer Family
---
- A fully managed service for file transfers into and out of S3 or EFS using FTP protocol
- Supported Protocols
	- AWS Transfer for FTP (File Transfer Protocol)
	- AWS Transfer for FTPS (File Transfer Protocol over SSL)
	- AWS Transfer for SFTP (SSH File Transfer Protocol)
- Managed infrastructure, scalable, reliable, HA (multi-AZ)
- Pay per provisioned endpoint per hour + data transfer in GB
- Storage and manage users' credentials within the service
- Integrate with existing authentication systems (MS Active Directory, LDAP, Okta, Cognito, ...)
- Usage: sharing files, public datasets, CRM, ERP, ...

### SFTP Server
- SFTP server is configured with `Interface type VPC Endpoint` to control the access using `Security Groups`
- Route 53 navigates traffic from the internet to the VPC endpoint through an internet gateway
- `Network Access Control List` for each ENI with EIP in each subnet will control the traffic before it reaches the SFTP server

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
