---
title: "AWS Glue"
date: 2024-05-27 22:15:27 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Glue
---
- Managed extract, transform, and load (ETL) service
- Useful to prepare and transform data for analytics
- Fully serverless service

### Things to know at a high level
- Glue Job Bookmarks: prevent re-processing old data
- Glue Elastic Views:
	- Combine and replicate data across multiple data stores using SQL
	- No custom code, Glue monitors for changes in the source data, serverless
	- Leverages a "virtual table" (materialized view)
- Glue DataBrew: clean and normalize data using pre-built transformation
- Glue Studio: new GUI to create, run, and monitor ETL jobs in Glue
- Glue Streaming ETL (built on Apache Spark Structured Streaming): compatible with Kinesis Data Streaming, Kafka, MSK (managed Kafka)

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
