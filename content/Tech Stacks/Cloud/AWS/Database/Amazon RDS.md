---
title: "Amazon RDS"
date: 2024-05-03 23:42:51 +0800
status: To Do
draft: false
tags:
  - AWS
  - Database
---
## Amazon RDS
---
- RDS (Relational Database Service) is a managed DB service using SQL as a query language
	- Postgres
	- MySQL
	- MariaDB
	- Oracle
	- Microsoft SQL Server
	- Aurora (AWS Proprietary DB)
- Why use RDS?
	- Automated provisioning, OS patching
	- Continuous backups and restore to a specific timestamp
	- Monitoring dashboards
	- Read replicas for improved read performance
	- Multi-AZ setup for DR
	- Maintenance windows for upgrades
	- Scaling capability (vertical & horizontal)
	- Storage backed by EBS (gp2 or io1)
	- But cannot SSH into the instance

### RDS Storage Auto Scaling
- Helps increase storage on RDS DB instance dynamically
- When RDS detects running out of free DB storage, it scales automatically
- Set `Maximum Storage Threshold` (maximum limit for DB storage)
- Automatically modify storage if:
	- Free storage is less than 10% of allocated storage
	- Low storage lasts at least 5 minutes
	- 6 hours have passed since the last modification
- Useful for applications with unpredictable workloads
- Supports all RDS DB engines

### RDS Read Replicas for read scalability
- Up to 15 Read Replicas within AZs, Cross-AZs, or Cross-Region
	- Data transfer within the same Region does not cost
	- Data transfer in Cross-Region does cost
- Replication is ASYNC, so reads are consistent
- Replicas can be promoted to the main DB
- Applications must update the connection string to leverage read replicas

### RDS Multi-AZ (Disaster Recovery)
- SYNC replication to RDS DB instance standby (no read or write)
- One DNS name - automatic app failover to standby

### RDS From Single-AZ to Multi-AZ
- A snapshot of the master RDS DB instance is taken
- A new DB is restored from the snapshot in a new AZ
- Synchronization is established between the 2 databases

### RDS Custom
- Managed Oracle and Microsoft SQL Server Database with OS and DB customization
- Access to the underlying DB and OS
	- Configure settings
	- Install patches
	- Enable native features
	- Access the underlying EC2 instance using SSH or SSM Session Manager
- De-activate Automation Mode to perform customization, it is better to take a DB snapshot before

### RDS Backups
- Automated backups
	- Daily full backup of the DB
	- Transaction logs are backed up by RDS every 5 minutes
	- 1 to 35 days of retention, set 0 to disable
- Manual DB Snapshots
	- Manually triggered by the user
	- Retention of backup for as long as you want

### RDS Restoring
- Restore the RDS backup or a snapshot to create a new DB
- Restoring MySQL RDS database from S3
	- Create a backup of on-premise DB
	- Store it on S3
	- Restore the backup file onto a new MySQL RDS instance

## Amazon Aurora
---
- A proprietary DB engine from AWS
- Postgres & MySQL are both supported as Aurora DB
	- This means the driver will work as if Aurora were a Postgres or MySQL
- AWS cloud optimized
	- 5x performance of MySQL on RDS
	- 3x performance of Postgres on RDS
- Aurora storage automatically grows from 10GB up to 128TB
- Aurora can have 15 replicas while MySQL has 5
	- The replication process is also faster
- Aurora costs 20% more than RDS but is more efficient

### Aurora High Availability and Read Scaling
- 6 copies of data across 3 AZs
	- 4 copies out of 6 needed for writes
	- 3 copies out of 6 needed for reads
	- Self-healing with peer-to-peer replication
	- Storage is striped across 100s of volumes
- 1 Master Aurora instance takes write + up to 15 Read Replicas serve reads
	- Writer Endpoint for Master instance
	- Reader Endpoint for Read Replicas which auto-scales
- Support Cross-Region Replication

### Custom Endpoints
- Define a subset of Aurora instances as a Custom Endpoint
	- e.g. Run analytical queries on specific replicas
- The Reader Endpoint is generally not used after defining Custom Endpoints

### Aurora Serverless
- Automated DB instantiation and auto-scaling based on actual usage
	- Good for infrequent, intermittent, or unpredictable workloads

### Global Aurora
- Aurora Cross Region Read Replicas
	- Simple to put in place and useful for DR
- Aurora Global Database (Recommended)
	- 1 Primary Region (R/W)
	- Up to 5 Secondary Regions (R) and up to 16 Read Replicas per Region
	- Promoting another Region (for DR) has an RTO of less than 1 minute
	- Typical Cross-Region Replication takes less than 1 second

### Aurora Machine Learning
- Enables ML-based predictions to an application via SQL
- Supported for:
	- Amazon SageMaker (use with any ML model)
	- Amazon Comprehend (for sentiment analysis)

### Aurora Backups
- Automated backups
	- 1 to 35 days of retention
	- Point-in-time recovery in the timeframe
- Manual DB Snapshots
	- Manually triggered by the user
	- Retention of backup for as long as you want

### Aurora Restoring
- Restore the Aurora backup or a snapshot to create a new DB
- Restoring MySQL Aurora cluster from S3
	- Create a backup of on-premise DB using Percona XtraBackup
	- Store it on S3
	- Restore the backup file onto a new MySQL Aurora cluster

### Aurora Database Cloning
- Create a new Aurora DB cluster from an existing one
- Faster than snapshot & restore
- Uses copy-on-write protocol
	- Initially, the new DB cluster uses the same data volume as the original DB cluster
	- When updates are made to the new DB cluster data, then additional storage is allocated and data is copied to be separated
- Useful to create a "Staging" DB from a "Production" DB without impacting

## RDS & Aurora Security
---
- At-rest encryption
	- DB master & replica encryption using AWS KMS - must be defined at launch time
	- If the master is not encrypted, the replica cannot be encrypted
	- DB snapshot & restore as encrypted to encrypt
- In-flight encryption: TLS ready by default, use AWS TLS root certificates client-side
- IAM Authentication: IAM roles to connect to DB instead of username/PW
- Security Group: Control network access to RDS/Aurora DB
- No SSH available except RDS custom
- Audit logs can be enabled and sent to CloudWatch Logs for longer retention

## RDS Proxy
---
- Fully managed DB proxy for RDS which allows apps to pool and share DB connections established with the DB
- Improving DB efficiency by:
	- Reducing the stress on DB resources
	- Minimize open connections
- Reduced RDS & Aurora failover time by up to 66%
- Supports RDS and Aurora
- Enforce IAM authentication for DB and securely store credentials in AWS Secrets Manager
- RDS Proxy is never publicly accessible (must be accessed from VPC)

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
