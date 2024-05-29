---
title: Amazon CloudWatch
date: 2024-05-29 20:20:39 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon CloudWatch
---
### CloudWatch Metrics
- Provides metrics for every service in AWS
- Metric is a variable to monitor (CPUUtilization, NetworkIn, ...)
- Metric belongs to a namespace
- Dimension is an attribute of a metric (instance id, env, etc, ...)
- Up to 30 dimensions per metric
- Metrics have timestamps
- Can create CloudWatch dashboards of metrics
- Can create CloudWatch Custom Metrics (for the RAM for example)

### CloudWatch Metric Streams
- Continually stream CloudWatch metrics to a destination with near-real-time delivery and low-latency
	- Amazon Kinesis Data Firehose (and then its destinations)
	- 3rd party service providers: DataDog, Dynatrace, New Relic, Splunk, ...

## CloudWatch Logs
---
- Log groups: Arbitrary name, usually representing an app
- Log stream: Instances within app/log files/containers
- Can define log expiration policies (never, 1 day ~ 10 years)
- CloudWatch Logs can send logs to:
	- S3
	- Kinesis Data Streams
	- Kinesis Data Firehose
	- Lambda
	- OpenSearch
- Logs are encrypted by default
- Can set KMS-based encryption

### CloudWatch Logs - Sources
- SDK, CloudWatch Logs Agent, CloudWatch Unified Agent
- Elastic Beanstalk: Collection of logs from the app
- ECS: Collection from containers
- Lambda: Collection from function logs
- VPC Flow Logs: VPC-specific logs
- API Gateway
- CloudTrail based on filter
- R53: Log DNS queries

### CloudWatch Logs Insights
- Search and analyze log data stored in CloudWatch Logs
- Provides a purpose-built query language
	- Automatically discover fields from AWS services and JSON logs events
	- Fetch desired event fields, filter based on conditions, calculate aggregate statistics, sort events, limit number of events, ...
	- Can save queries and add them to CloudWatch Dashboards
- Can query multiple Log Groups in different AWS accounts
- It's a query engine, not a real-time engine

### CloudWatch Logs Subscriptions
- Get real-time log events from CloudWatch Logs for processing and analysis
- Send to Kinesis Data Streams, Kinesis Data Firehose, or Lambda
- Subscription Filter - filter which logs are events delivered to the destination
- Cross-Account Subscription - send log events to resources in a different AWS account (KDS, KDF)

### CloudWatch Logs for EC2
- By default, no logs from the EC2 machine will go to CloudWatch
- Need to run a CloudWatch Agent on EC2 to push the log files
- Make sure IAM permissions are correct
- CloudWatch Agent can be set on-premises too

### CloudWatch Logs Agent & Unified Agent
- For virtual servers
- CloudWatch Logs Agent
	- Old version of the agent
	- Can only send to CloudWatch Logs
- CloudWatch Unified Agent
	- Collect additional system-level metrics such as RAM, processes, etc, ...
	- Collect logs to send to CloudWatch Logs
	- Centralized configuration using SSM Parameter Store

### CloudWatch Unified Agent - Metrics
- CPU
- Disk metrics
- RAM
- Netstat
- Processes
- Swap Space

## CloudWatch Alarms
---
- Alarms are used to trigger notifications for any metric
- Various options (sampling, %, max, min, etc, ...)
- Alarm States:
	- OK
	- INSUFFICIENT_DATA
	- ALARM
- Period:
	- Length of time in seconds to evaluate the metric
	- High-resolution custom metrics

### CloudWatch Alarm Targets
- Stop, Terminate, Reboot, or Recover an EC2 instance
- Trigger Auto Scaling Action
- Send notification to SNS

### CloudWatch Alarms - Composite Alarms
- CloudWatch Alarms are on a single metric
- Composite Alarms monitor the states of multiple other alarms
- AND and OR conditions
- Helpful to reduce "alarm noise" by creating complex composite alarms

## CloudWatch Insights & Operational Visibility
---
- CloudWatch Container Insights
	- ECS, EKS, k8s on EC2, Fargate, needs agent for k8s
	- Metrics and logs
- CloudWatch Lambda Insights
	- Detailed metrics to troubleshoot serverless apps
- CloudWatch Contributors Insights
	- Find "Top-N" Contributors through CloudWatch Logs
- CloudWatch Application Insights
	- Automatic dashboard to troubleshoot app and related AWS services

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
