---
title: "\bAmazon Athena"
date: 2024-05-24 23:24:28 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon Athena
---
- Serverless query service to analyze data stored in S3
- Uses standard SQL language to query the files (built on Presto)
- Supports CSV, JSON, ORC, Avro, and Parquet
- Pricing: $5.00 per TB of data scan
- Commonly used with Amazon Quicksight for reporting/dashboards
- Use case: Business intelligence, analytics, reporting, query VPC flow logs, ELB logs, CloudTrails, etc, ...

## Performance Improvement
- Use columnar data for cost-saving (less scan)
	- Apache Parquet or ORC is recommended
	- Huge performance improvement
	- Use Glue to convert data, Parquet or ORC
- Compress data for smaller retrievals (bzip2, gzip, lz4, snappy, zlip, zstd, ...)
- Partition datasets in S3 for easy querying on virtual columns
	- e.g. `s3://my-bucket/pathToTable/year=1991/month=1/day=1/`
- Use larger files (> 128MB) to minimize overhead

### Federated Query
- Allows to run SQL queries across data stored in relation, non-relational, object, and custom data sources
- Uses Data Source Connectors that run on Lambda to run Federated Queries
	- e.g. CloudWatch Logs, DynamoDB, RDS, ...
- Store the results back in S3

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
