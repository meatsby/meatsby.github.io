---
title: Amazon MQ
date: 2024-05-15 21:25:25 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon MQ
---
- SQS and SNS are "cloud-native" services: proprietary protocols from AWS
- Traditional applications running from on-premises may use open protocols such as MQTT, AMQP, STOMP, Openwire, WSS, ...
- When migrating to the cloud, instead of re-engineering the application to use SQS and SNS, we can use Amazon MQ
- Amazon MQ is a managed message broker service for RabbitMQ and ActiveMQ
	- Doesn't scale as much as SQS/SNS
	- Runs on servers and can run in Multi-AZ with failover
	- Has both queue feature (~SQS) and topic feature (~SNS)

### High Availability
- Active and Standby patterns in different AZs
- Failover with EFS for storage

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
