---
title: "AWS Organizations"
date: 2024-05-30 22:16:53 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Organizations
---
- Global Service
- Allows to manage multiple AWS accounts
- The main account is the management account
- Other accounts are member accounts
- Member accounts can only be part of one organization
- Consolidated Billing across all accounts - single payment method
- Pricing benefits from aggregated usage (volume discount for EC2, S3, ...)
- Shared reserved instances and Savings Plans discounts across accounts
- API is available to automate AWS account creation

### Organization Unit
- Root Organization Unit
	- Management Account
	- OU (PROD)
		- Member Accounts
	- OU (DEV)
		- Member Accounts

### Security: Service Control Policies (SCP)
- IAM policies applied to OU or Accounts to restrict Users and Roles
- They do not apply to the management account (full admin power)
- Must have an explicit allow (doesn't allow anything by default)

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
