---
title: "Amazon Cognito"
date: 2024-05-16 21:54:47 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon Cognito
---
- Give users an identity to interact with web or mobile application
- Cognito User Pools
	- Sign-in functionality for app users
	- Integrate with API Gateway & ALB
- Cognito Identity Pools (Federated Identity)
	- Provide AWS credentials to users so they can access AWS resources directly
	- Integrate with Cognito User Pools as an identity provider
- Cognito vs IAM
	- "hundreds of users", "mobile users", "authenticate with SAML"

### Cognito User Pools (CUP) - User Features
- Create a serverless DB of user for web & mobile apps
- Simple login: Username / password combination
- Password reset
- Email & Phone Number Verification
- MFA
- Federated Identities: Users from FB, Google, SAML, ...

### Cognito Identity Pools (Federated Identity)
- Get identities for users so they obtain temporary AWS credentials
- User sources can be Cognito User Pools, 3rd party logins, etc, ...
- Users can then access AWS services directly or through API Gateway
- IAM policies applied to the credentials are defined in Cognito
- They can be customized based on the user_id for fine-grained control
- Default IAM roles for authenticated and guest users

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
