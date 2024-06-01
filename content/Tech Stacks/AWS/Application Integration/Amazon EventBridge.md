---
title: Amazon EventBridge
date: 2024-05-29 20:20:39 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon EventBridge
---
- Schedule: Cron jobs (scheduled scripts)
- Event Pattern: Event rules to react to a service doing something
- Trigger Lambda functions, send SQS/SNS messages, ...

### Event Bus
- Event buses can be accessed by other AWS accounts using Resource-based Policies
	- Default Event Bus
	- Partner Event Bus
	- Custom Event Bus
- You can archive events (all/filter) sent to an event bus (indefinitely or set period)

### Schema Registry
- EventBridge can analyze the events in the bus and infer the schema
- The Schema Registry allows you to generate code for the app, that will know in advance how data is structured in the event bus
- Schema can be versioned

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
