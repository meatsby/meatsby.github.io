---
title: "AWS Systems Manager"
date: 2024-06-04 19:50:35 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## SSM Parameter Store
---
- Secure storage for configuration and secrets
- Optional Seamless Encryption using KMS
- Serverless, scalable, durable, easy SDK
- Version tracking of configurations/secrets
- Security through IAM
- Notifications with Amazon EventBridge
- Integration with CloudFormation

### Parameter Policies (for advanced parameters)
- Allow to assign a TTL to a parameter (expiration date) to force updating or deleting sensitive data such as passwords
- Can assign multiple policies

## SSM Session Manager
---
- Allows to start an SSH on EC2 and on-premises servers
- No SSH access, bastion hosts, or SSH keys needed
- No port 22 needed (better security)
- Supports Linux, macOS, and Windows
- Send session log data to S3 or CloudWatch Logs

## Run Command
---
- Execute a document(script) or just run a command
- Run command across multiple instances
- No need for SSH
- Command Output can be shown in the AWS Console, sent to S3 bucket or CloudWatch Logs
- Send notifications to SNs about command status
- Integrated with IAM & CloudTrail
- Can be invoked using EventBrdige

## Patch Manager
---
- Automates the process of patching managed instances
- OS updates, application updates, security updates
- Supports EC2 instances and on-premises servers
- Supports Linux, macOS, and Windows
- Patch on-demand or on a schedule using Maintenance Windows
- Scan instances and generate patch compliance report (missing patches)

## Maintenance Windows
---
- Defines a schedule for when to perform actions on instances
- Maintenance Window contains:
	- Schedule
	- Duration
	- Set of registered instances
	- Set of registered tasks

## Automation
---
- Simplifies common maintenance and deployment tasks of EC2 instances and other AWS resources
- Automation Runbook - SSM Documents to define actions preformed on EC2 instances or AWS resources

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
