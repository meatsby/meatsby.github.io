---
title: "Amazon SNS"
date: 2024-05-14 16:33:23 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon SNS
---
- Event Producer only sends a message to one SNS topic
- As many Event Receivers as we want to listen to the SNS topic notifications
- Each subscriber to the topic will get all the messages (note: new feature to filter messages)
- Up to 12,500,000 subscriptions per topic
- 100,000 topics limit

### Security
- Encryption
	- In-flight encryption using HTTPS API
	- At-rest encryption using KMS keys
	- Client-side encryption if the client wants to perform encryption/decryption itself
- Access Controls
	- IAM policies to regulate access to the SNS API
- SNS Access Policies (similar to S3 bucket policies)
	- Useful for cross-account access to SNS topics

### SNS + SQS Fan Out
- Push once in SNS, receive in all SQS queues that are subscribers
- Fully decoupled, no data loss
- SQS allows for data persistence, delayed processing, and retries of work
- Ability to add more SQS subscribers over time
- Make sure your SQS queue access policy allows for SNS to write
- Cross-Region Delivery: works with SQS queues in other regions

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
