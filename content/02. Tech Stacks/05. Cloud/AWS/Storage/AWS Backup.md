---
title: "AWS Backup"
date: 2024-06-04 20:13:50 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Backup
---
- Fully managed service that centrally manage and automate backups across AWS services
- No need to create custom scripts and manual processes
- Supported services:
	- EC2/EBS
	- S3
	- RDS/Aurora/DDB
	- DocumentDB/Neptune
	- EFS/FSx
	- Storage Gateway
- Supports cross-region backups & cross-account backups
- Supports PITR for supported services
- On-Demand and Scheduled backups
- Tag-based backup policies
- Create backup policies known as Backup Plans

### AWS Backup Vault Lock
- Enforce a WORM(Write Once Read Many) state for all the backups that you store in AWS Backup Vault
- An additional layer of defense to protect your backups against:
	- Inadvertent or malicious delete operations
	- Updates that shorten or alter retention periods
- Even the root user cannot delete backups when enabled

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
