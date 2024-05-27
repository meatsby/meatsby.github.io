---
title: Amazon OpenSearch Service
date: 2024-05-27 19:09:59 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon OpenSearch Service
---
- DynamoDB only queries by primary key or indexes, while OpenSearch can search any field, even partially matches
- Common to use it as a complement to another DB
- 2 mods: managed cluster or serverless cluster
- Does NOT natively support SQL (can be enabled via a plugin)
- Ingestion from Kinesis Data Firehose, AWS IoT, and CloudWatch Logs
- Security through Cognito & IAM, KMS, TLS
- Comes with OpenSearch Dashboards

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
