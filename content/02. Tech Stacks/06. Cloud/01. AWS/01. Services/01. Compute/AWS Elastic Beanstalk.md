---
title: "AWS Elastic Beanstalk"
date: 2023-12-08 13:00:00 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Elastic Beanstalk
---
- Most web apps have the same architecture (ALB + ASG)
- EB is a managed service
	- Automatically handles capacity provisioning, load balancing, scaling, application health monitoring, instance configuration, ...
	- Just the application code is the responsibility of the developer
- EB is free but needs to pay for the underlying instances
- AWS CloudFormation provisions components
- Lightsail, Elastic Beanstalk, EC2, On-premise 순으로 컴퓨팅 설정 복잡도가 높음

### Components
- Application
	- Collection of EB components (environments, versions, configurations, ...)
- Application Version
	- An iteration of your application code
- Environment
	- Collection of AWS resources running an application version (only one application version at a time)
	- Can create multiple environments (dev, test, prod, ...)
	- Tiers
		- Web Server Environment
		- Worker Environment

### Web Server Tier vs Worker Tier
![[Web Server Tier vs Worker Tier.png]]

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
