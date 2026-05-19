---
title: "AWS Certificate Manager"
date: 2024-06-02 21:30:29 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Certificate Manager
---
- Easily provision, manage and deploy TLS Certificates
- Provide in-flight encryption for websites (HTTPS)
- Supports both public and private TLS certificates
- Free of charge for public TLS certificates
- Automatic TLS certificate renewal
- Integrations with (load TLS certificates on)
	- Elastic Load Balancers (CLB, ALB, NLB)
	- CloudFront Distributions
	- APIs on API Gateway
- Cannot use ACM with EC2 (can't be extracted)

### Importing Public Certificates
- Option to generate the certificate outside of ACM and then import it
- No automatic renewal
- ACM sends daily expiration events starting 45 days prior to expiration
- AWS Config has a managed rule to check for expiring certificates

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
