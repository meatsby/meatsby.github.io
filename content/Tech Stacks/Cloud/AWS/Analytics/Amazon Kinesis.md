---
title: Amazon Kinesis
date: 2024-05-14 16:33:23 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon Kinesis
---
- Makes it easy to collect, process, and analyze streaming data in real time
	- Ingest real-time data such as Application logs, Metrics, Website clickstreams, ...
- Kinesis Data Streams: Capture, process, and store data streams
- Kinesis Data Firehose: Load data streams into AWS data stores
- Kinesis Data Analytics: Analyze data streams with SQL or Apache Flink
- Kinesis Video Streams: Capture, process, and store video streams

## Kinesis Data Streams
---
- Retention between 1 ~ 365 days
- Ability to reprocess data
- Once data is inserted in Kinesis, it can't be deleted (immutability)
- Data that share the same partition goes to the same shard (ordering)
- Producers: AWS SDK, KPL, Kinesis Agent
- Consumers: AWS SDK, KCL, Lambda, Data Firehose, Data Analytics

### Capacity Modes
- Provisioned Mode:
	- You choose the number of shards provisioned, scale manually, or use API
	- Each shard gets 1MB/s in (or 1000 records per second)
	- Each shard gets 2MB/s out (classic or enhanced fan-out consumer)
	- You pay per shard provisioned per hour
- On-Demand Mode:
	- No need to provision or manage the capacity
	- Default capacity provisioned (4MB/s in or 4000 records per second)
	- Scales automatically based on observed throughput peaks during the last 30 days
	- Pay per stream per hour & data in/out per GB

### Security
- Control access/authorization using IAM policies
- Encryption in flight using HTTPS endpoints
- Encryption at rest using KMS
- You can implement encryption/decryption of data on the client side
- VPC Endpoints available for Kinesis to access within VPC
- Monitor API calls using CloudTrail

## Kinesis Data Firehose
---
- Fully Managed Service, no administration, automatic scaling, serverless
	- AWS: Redshift/S3/OpenSearch
	- 3rd party: Splunk/DataDog/...
	- Custom: Send to any HTTP endpoint
- Pay for data going through Firehose
- Near Real Time
	- 60 secs latency minimum for non-full batches
	- Or a minimum 1MB of data at a time
- Supports many data formats, conversions, transformations, compression
- Supports custom data transformations using AWS Lambda
- Can send failed or all data to a backup S3 bucket

## Kinesis Data Analytics
---
### Kinesis Data Analytics for SQL Application
- Real-time analytics on Kinesis Data Streams & Firehose using SQL
- Add reference data from S3 to enrich streaming data
- Fully managed, no servers to provision
- Automatic scaling
- Pay for actual consumption rate
- Output:
	- Kinesis Data Streams: Create streams out of the real-time analytics queries
	- Kinesis Data Firehose: Send analytics query results to destinations
- Use cases:
	- Time-series analytics
	- Real-time dashboards
	- Real-time metrics

### Kinesis Data Analytics for Apache Flink
- Use Flink (Java, Scala, or SQL) to process and analyze streaming data
- Run any Apache Flink application on a managed cluster on AWS
	- Provisioning compute resources, parallel computation, automatic scaling
	- Application backups (implemented as checkpoints and snapshots)
	- Use any Apache Flink programming features
	- Flink does not read from Firehose (use Kinesis Analytics for SQL instead)

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
