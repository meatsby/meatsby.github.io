---
title: Amazon API Gateway
date: 2024-05-16 21:53:28 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon API Gateway
---
- AWS Lambda + API Gateway: No infrastructure to manage
- Support WebSocket
- Handle API versioning
- Handle different envs
- Handle security
- Create API keys, handle request throttling
- Swagger/OpenAPI import to quickly define APIs
- Transform and validate requests and responses
- Generate SDK and API specifications
- Cache API responses

### Endpoint Types
- Edge-Optimized (default): For global clients
	- Requests are routed through the CloudFront Edge locations
	- API Gateway still lives in only one region
- Regional
	- For clients within the same region
	- Could manually combine with CloudFront
- Private
	- Can only be accessed from VPC using an interface VPC endpoint (ENI)
	- Use a resource policy to define access

### Security
- User Authentication through
	- IAM Roles
	- Cognito
	- Custom Authorizer
- Custom Domain Name HTTPS security through integration with AWS Certificate Manager
	- Certificate must be in us-east-1 when using Edge-Optimized endpoint
	- Certificate must be in API Gateway region when using Regional endpoint
	- Must setup CNAME or A-alias record in R53

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
