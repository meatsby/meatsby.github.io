---
title: Amazon GuardDuty
date: 2024-06-02 21:30:29 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon GuardDuty
---
- Intelligent Threat discovery to protect AWS Account
- Uses ML algorithms, anomaly detection, 3rd party data
- Input data includes:
	- CloudTrail Event Logs - unusual API calls, unauthorized deployments
		- CloudTrail Management Events - create VPC subnet, create trail, ...
		- CloudTrail S3 Data Events - get, list, delete object, ...
	- VPC Flow Logs -unusual internal traffic, unusual IP addresses
	- DNS Logs - compromised EC2 instances sending encoded data within DNS queries
	- Optional Features - EKS Audit Logs, RDS & Aurora, EBS Lambda, S3 Data Events, ...
- Can set EventBridge rules to be notified in case of findings
- EventBridge rules can target AWS Lambda or SNS
- Can protect against CryptoCurrency attacks

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
