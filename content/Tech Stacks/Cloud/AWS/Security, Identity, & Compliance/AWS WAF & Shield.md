---
title: AWS WAF & Shield
date: 2024-06-02 21:30:29 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS WAF & Shield
---
### AWS WAF
- Protects web app from common web exploits
	- Layer 7 (HTTP)
- Deploy on
	- ALB
	- API Gateway
	- CloudFront
	- AppSync GraphQL API
	- Cognito User Pool
- Define Web ACL Rules:
	- IP set: up to 10000 IP addresses
		- use multiple rules for more IPs
	- HTTP headers, body, or URI strings to protect from SQL injection & XSS
	- Size constraints, geo-match
	- Rate-based rules (to count occurrences of events) for DDoS protection
- Web ACLs are Regional except for CloudFront
- A rule group is a reusable set of rules that you can add to a Web ACL

### AWS Shield
- Protects from DDoS attack
- AWS Shield Standard
	- Free service that is activated for every AWS customer
	- Provides protection from attacks such as SYN/UDP floods, reflection attacks and other L3/L4 attacks
- AWS Shield Advanced
	- Optional DDoS mitigation service ($3000 per month per organization)
	- Protect against more sophisticated attacks on ELB, CloudFront, Global Accelerator, R53

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
