---
title: "AWS Control Tower"
date: 2024-05-30 22:16:53 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Control Tower
---
- Easy way to set up and govern a secure and compliant multi-account AWS environment based on best practices
- Uses AWS Org to create accounts
- Benefits:
	- Automate the setup of the environment in a few clicks
	- Automate ongoing policy management using guardrails
	- Detect policy violations and remediate them
	- Monitor compliance through an interactive dashboard

### Guardrails
- Provides ongoing governance for the Control Tower environment
- Preventive Guardrail - using SCPs
	- e.g. Restrict Regions across all accounts
- Detective Guardrail - using AWS Config
	- e.g. Identify untagged resources

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
