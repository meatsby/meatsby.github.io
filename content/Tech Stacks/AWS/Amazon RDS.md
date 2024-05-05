---
title: Amazon RDS
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

## References
---
- 
