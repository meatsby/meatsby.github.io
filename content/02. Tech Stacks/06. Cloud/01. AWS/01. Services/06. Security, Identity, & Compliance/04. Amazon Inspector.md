---
title: "Amazon Inspector"
date: 2024-06-02 21:30:29 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon Inspector
---
- Automated Security Assessments
	- Continuous scanning of the infrastructure, only when needed
	- Package vulnerabilities (EC2, ECR & Lambda) - database of CVE
	- Network reachability (EC2)
	- A risk score is associated with all vulnerabilities for prioritization
- For EC2 instances
	- Leveraging the AWS System Manager agent
	- Analyze against unintended network accessibility
	- Analyze the running OS against known vulnerabilities
- For Container Images push to ECR
	- Assessment of Container Images as they are pushed
- For Lambda Functions
	- Identifies software vulnerabilities in function code and package dependencies
	- Assessment of functions as they are deployed
- Reporting & integration with AWS Security Hub
- Send findings to Amazon Event Bridge

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
