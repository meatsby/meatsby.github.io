---
title: AWS Directory Service
date: 2024-05-30 22:16:53 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Directory Service
---
### Microsoft Active Directory
- Found on any Windows Server with AD Domain services
- Database of objects:
	- User Accounts
	- Computers
	- Printers
	- File Shares
	- Security Groups
- Centralized security management, create account, assign permissions
- Objects are organized in trees
- A group of trees is a forest

### AWS Directory Services
- AWS Managed Microsoft AD
	- Create own AD in AWS, manage users locally, supports MFA
	- Establish "trust" connections with on-premise AD
- AD Connector
	- Directory Gateway (proxy) to redirect to on-premise AD, supports MFA
	- Users are managed on the on-premise AD
- Simple AD
	- AD-compatible managed directory on AWS
	- Cannot be joined with on-premise AD

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
