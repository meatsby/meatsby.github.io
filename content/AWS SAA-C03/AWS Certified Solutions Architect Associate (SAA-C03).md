---
title: AWS Certified Solutions Architect Associate (SAA-C03)
date: 2024-04-26 22:34:49 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Overview
---
### AWS Regions
- Region 이란 Cluster of Data Centers
	- `us-east1`, `eu-west-3`, `ap-east-1`, ...
- 대부분의 AWS Services 는 특정 Region 에 국한됨
- Region 을 선택할 때 고려할 사항
	- Compliance: Data 가 특정 지역을 벗어나면 안 될 경우
	- Proximity: 가까운 Region 일수록 Latency 가 낮음
	- Available Services: 모든 Region 이 모든 Service 를 지원하지 않음
	- Pricing: Region 마다 요금이 다를 수 있음

### AWS Availability Zones
- 각 Region 은 보통 3개에서 많게는 6개의 AZs 를 가지고 있음
	- `ap-east-1a`, `ap-east-1b`, `ap-east-1c`
- 각 AZ 는 여분의 전원, 네트워킹, 통신 기능을 갖춘 1개 이상의 데이터 센터로 이루어져 있음
	- 정확한 숫자는 AWS 가 공개하지 않음
- 재난에 대비해 서로 분리되어 있는 것
- 각 AZ 들은 High bandwidth 와 Ultra-low latency networking 으로 연결되어 Region 을 형성

### AWS Points of Presence (Edge Locations)
- AWS 는 400개 이상의 Points of Presence (400+ Edge Locations & 10+ Regional Caches) 을 40여 국가의 90개 이상의 도시에 가지고 있음
- 이를 통해 low latency 로 end user 에게 컨텐츠를 전달할 수 있음

### AWS Services
- Global Services
	- IAM
	- R53 (DNS)
	- CloudFront (CDN)
	- WAF
- Regional Services
	- EC2 (IaaS)
	- EB (PaaS)
	- Lambda (FaaS)
	- Rekognition (SaaS)

## Choosing the right DB
---
### Database Types
- RDBMS: RDS, Aurora - great for joins
- NoSQL DB: No joins, no SQL - DynamoDB(~JSON), ElastiCache(key/value pairs), Neptune(graphs), DocumentDB(for MongoDB), Keyspaces(for Apache Cassandra)
- Object Store: S3(for big objects), Glacier(for backups/archives)
- Data Warehouse: Redshift(OLAP), Athena, EMR
- Search: OpenSearch(JSON) - free text, unstructured searches
- Graphs: Neptune - displays relationships between data
- Ledger: Quantum Ledger DB
- Time Series: Timestream

### RDS
- Managed PostgreSQL / MySQL / Oracle / SQL Server / MariaDB / Custom
- Provisioned RDS instance size and EBS volume type & size
- Auto-scaling capability for storage
- Support for Read Replicas and Multi-AZ
- Security through IAM, SGs, KMS, and SSL in transit
- Automated Backup with Point in time restore feature (up to 35 days)
- Manual DB snapshot for longer-term recovery
- Support for IAM Authentication, integration with Secrets Manager
- RDS Custom for access to and customize the underlying instance (Oracle & SQL Server)
- Use case: Store RDBMS/OLTP, perform SQL queries, transactions

### Aurora
- Compatible API for PostgreSQL / MySQL, separation of storage and compute
- Storage: data is stored in 6 replicas across 3 AZs
- Compute: Cluster of DB instances across multiple AZs, auto-scaling of Read Replicas
- Cluster: Custom endpoints for writer and reader DB instances
- Same security/monitoring/maintenance features as RDS
- Aurora Serverless: for unpredictable/intermittent workloads, no capacity planning
- Aurora Global: up to 16 DB Read Instances in each region, < 1 second storage replication
- Aurora Machine Learning: perform ML using SageMaker & Comprehend on Aurora
- Aurora DB Cloning: new cluster from existing one, faster than restoring a snapshot
- Use case: same as RDS, but with less maintenance/more flexibility/performance/features

### ElastiCache
- Managed Redis / Memcached
- In-memory data store, sub-millisecond latnency
- Must provision an EC2 instance type
- Support for clustering(Redis) and Multi-AZ, Read Replicas(sharding)
- Security through IAM, SGs, KSM, Redis Auth
- Backup / Snapshot / Point in time restore feature
- Managed and Scheduled maintenance
- Requires some application code changes to be leveraged
- Use case: Key/Value store, frequent reads, less writes, cache results for DB queries, store session data for websites, cannot use SQL

### DynamoDB
- AWS proprietary technology, managed serverless NoSQL DB, millisecond latency
- Capacity modes: provisioned capacity with optional auto-scaling or on-demand capacity
- Can replace ElastiCache as a Key/Value store
- HA, Multi-AZ by default, Read and Writes are decoupled, transaction capability
- DAX cluster for read cache, microsecond read latency
- Security, authentication, and authorization are done through IAM
- Event Processing: DDB Streams to integrate with Lambda, Kinesis Data Streams
- Global Table feature: active-active setup
- Automated backups up to 35 days with PITR, or on-demand backups
- Export to S3 without using RCU within the PITR window, import from S3 without using WCU
- Great to rapidly evolve schemas
- Use case: Serverless applications development (small documents 100s KB), distributed serverless cache

### S3
- A key/value store for objects
- Great for bigger objects, not so great for many small objects
- Serverless, scales infinitely, max object size is 5TB, versioning capability
- Tiers: Standard, IA, Intelligent, Glacier + lifecycle policy
- Features: Versioning, Encryption, Replication, MFA-Delete, Access Logs, ...
- Security: IAM, Bucket Policies, ACL, Access Points, Object Lambda, CORS, Object/Vault Lock
- Encryption: SSE-S3, SSE-KMS, SSE-C, client-side, TLS in transit, default encryption
- Batch operations on objects using S3 Batch, listing files using S3 Inventory
- Performance: Multi-part upload, S3 Transfer Acceleration, S3 Select
- Automation: S3 Event Notifications (SNS, SQS, Lambda, EventBridge)
- Use Cases: Static files, key-value store for big files, website hosting

### DocumentDB
- AWS implementation for MongoDB(NoSQL DB)
- Used to store, query, and index JSON data
- Similar "deployment concept" to Aurora
- Fully managed, HA with replication across 3 AZ
- Document DB storage automatically grows in increments of 10GB
- Automatically scales to workloads with millions of requests per second

### Neptune
- Fully managed graph DB
	- e.g. Social network
		- Users have friends
		- Posts have comments
		- Comments have likes from users
		- Users share and like posts
- HA across 3 AZ, with up to 15 read replicas
- Build and run applications working with highly connected datasets - optimized for these complex and hard queries
- Can store up to billions of relations and query the graph with millisecond latency
- Great for knowledge graphs (Wikipedia), fraud detection, recommendation engines, social networks

### Keyspaces(for Apache Cassandra)
- Apache Cassandra is an open-source NoSQL distributed DB
- A managed Apache Cassandra-compatible DB service
- Serverless, scalable, HA
- Automatically scale tables up/down based on the app traffic
- Tables are replicated 3 times across multi-AZ
- Using the Cassandra Query Language (CQL)
- Single-digit millisecond latency at any scale, 1000s of requests per second
- Capacity: On-demand mode or provisioned mode with auto-scaling
- Encryption, backup, PITR up to 35 days
- Use case: Store IoT device info, time-series data, ...

### QLDB
- A ledger is a book recording financial transactions
- Fully managed, serverless, HA, replication across 3 AZs
- Used to review the history of all the changes made to your application data over time
- Immutable system: no entry can be removed or modified, cryptographically verifiable
- 2-3x better performance than common ledger blockchain frameworks, manipulate data using SQL
- Difference with Amazon Managed Blockchain: no decentralization component, in accordance with financial regulation rules

### Timestream
- Fully managed, fast, scalable time series DB
- Automatically scales up/down to adjust capacity
- Store and analyze trillions of events per day
- 1000s times faster & 1/10 the cost of RDBMS
- Scheduled queries, multi-measure records, SQL compatibility
- Data storage tiering: recent data kept in memory and historical data kept in a cost-optimized storage
- Built-in time series analytics functions
- Encryption in transit and at rest
- Use cases: IoT apps, operational apps, real-time analytics, ...

## Disaster Recovery Strategies
---
- Backup and Restore
- Pilot Light
	- A small version of the app is always running in the cloud
	- Useful for the critical core (pilot light)
	- Very similar to Backup and Restore
- Warm Standby
	- Full system is up and running, but at minimum size
	- Upon disaster, we can scale to production load
- Hot Site / Multi-Site Approach
	- Very low RTO (minutes or seconds) - very expensive
	- Full Production Scale is running AWS and On-Premise

## Domain 1: Design Secure Architectures (30%)
---
### 1.1: Design secure access to AWS resources

### 1.2: Design secure workloads and applications

### 1.3: Determine appropriate data security controls

## Domain 2: Design Resilient Architectures (26%)
---
### 2.1: Design scalable and loosely coupled architectures

### 2.2: Design highly available and/or fault-tolerant architectures

## Domain 3: Design High-Performing Architectures (24%)
---
### 3.1: Determine high-performing and/or scalable storage solutions

### 3.2: Design high-performing and elastic compute solutions

### 3.3: Determine high-performing database solutions

### 3.4: Determine high-performing and/or scalable network architectures

### 3.5: Determine high-performing data ingestion and transformation solutions

## Domain 4: Design Cost-Optimized Architectures (20%)
---
### 4.1: Design cost-optimized storage solutions

### 4.2: Design cost-optimized compute solutions

### 4.3: Design cost-optimized database solutions

### 4.4: Design cost-optimized network architectures

## References
---
- 
