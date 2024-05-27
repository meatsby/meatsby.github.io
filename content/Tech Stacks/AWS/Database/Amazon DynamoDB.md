---
title: Amazon DynamoDB
date: 2024-04-21 22:58:53 +0800
status: In Progress
draft: false
tags:
  - AWS
  - DynamoDB
  - NoSQL
---
## Amazon DynamoDB
---
- Fully managed, highly available with replication across multiple AZs
- NoSQL DB - not RDB - with transaction support
- Scales to massive workloads, distributed DB
- Millions of requests per sec, trillions of row, 100s of TB of storage
- Fast and consistent in performance (single-digit millisecond)
- Integrated with IAM for security, authorization and administration
- Low cost and auto-scaling capabilities
- No maintenance or patching, always available
- Standard & Infrequent Access (IA) Table Class

### Basic Concept
- Made of Tables
- Each table has a Primary Key (must be decided at creation time)
- Each table can have infinite number of items (rows)
- Each item has attributes (can be added over time - can be null)
- Maximum size of an item is 400KB
- Data types supported are
    - Scalar Types - String, Number, Binary, Boolean, Null
    - Document Types - List, Map
    - Set Types - String Set, Number Set, Binary Set
- Therefore, in DynamoDB you can rapidly evolve schemas

### Read/Write Capacity Modes
- control how to manage table's capacity (read/write throughput)
- Provisioned Mode (default)
    - You specify the number of reads/writes per second
    - You need to plan capacity beforehand
    - Pay for provisioned Read Capacity Units (RCU) & Write Capacity Units (WCU)
    - Possibility to add auto-scaling mode for RCU & WCU
- On-Demand Mode
    - Read/Writes automatically scale up/down with your workloads
    - No capacity planning needed
    - Pay for what you use, more expensive (`$$$`)
    - Great for unpredictable workloads, steep sudden spikes

### DynamoDB Accelerator (DAX)
- Fully-managed, highly available, seamless in-memory cache for DynamoDB
- Help solve read congestion by caching
- Microseconds latency for cached data
- Doesn't require application logic modification (compatible with existing DynamoDB APIs)

### Stream Processing
- Order stream of item-level modifications (create/update/delete) in a table
- DynamoDB Streams
	- 24hrs retention
	- Limited # of consumers
	- Process using Lambda triggers, or DDB Stream Kinesis adapter
- Kinesis Data Streams (newer)
	- 1year retention
	- High # of consumers
	- Process using Lambda, Kinesis Data Analytics, Data Firehose, AWS Glue Streaming ETL

### Global Tables
- Make DDB table accessible with low latency in multiple-regions
- Active-Active replication
- Apps can READ and WRITE to the table in any region
- Must enable DDB Streams as a pre-requisite

### Time To Live (TTL)
- Automatically delete items after an expiry timestamp

### Backups for DR
- Continuous backups using point-in-time recovery (PITR)
	- Optionally enabled for the last 35 days
	- Point-in-time recovery to any time within the backup window
	- The recovery process creates a new table
- On-demand backups
	- Full backups for long-term retention, until explicitly deleted
	- Doesn't affect performance or latency
	- Can be configured and managed in AWS Backup (enables cross-region copy)
	- The recovery process creates a new table

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
