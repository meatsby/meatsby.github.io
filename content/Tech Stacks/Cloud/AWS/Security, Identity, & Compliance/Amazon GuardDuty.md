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

### Managing member accounts
- Organization's delegated admin account 로 member account 들의 GD 를 통합으로 관리 가능
	- Admin 이 관리하는 Member Account 는 스스로 Detector 를 Disable 하거나 Protection Plans 를 Disable 할 수 없음
- Member Account 당 1 개의 Detector 가 배정되며 해당 Detector 의 Protection Plans 제어 가능
	- 즉, 각 Member Account 마다 Detector ID 가 다름
- Protection Plans
	- S3 Protection
	- EKS Protection
	- Runtime Monitoring
	- Malware Protection for EC2
	- RDS Protection
	- Lambda Protection
- [Amazon GuardDuty ECS Runtime Monitoring Overview | Amazon Web Services](https://www.youtube.com/watch?v=1jh7nEwp8MA&t=310s)

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
