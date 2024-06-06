---
title: AWS Database Migration Service
date: 2024-06-04 19:50:35 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Database Migration Service
---
- Quickly and securely migrate DB to AWS, resilient, self-healing
- The source DB remains available during the migration
- Supports:
	- Homogeneous migrations
		- e.g. Oracle to Oracle
	- Heterogeneous migrations
		- e.g. MSSQL to Aurora
- Continuous Data Replication using the CDC
- Must create an EC2 instance to perform the replication tasks

### AWS Schema Conversion Tool (SCT)
- Convert DB's Schema from one engine to another
	- e.g. OLTP (SQL Server or Oracle) to MySQL, PostgreSQL, Aurora
	- e.g. OLAP (Teradata or Oracle) to Redshift
- Do not need to use SCT if migrating the same DB engine
	- e.g. On-Premise PostgreSQL to RDS PostgreSQL

### RDS & Aurora MySQL Migrations
- RDS MySQL to Aurora MySQL
	- Option 1: DB Snapshot from RDS MySQL restored as MySQL Aurora
	- Option 2: Create Aurora Read Replica from RDS MySQL and promote (time and cost $)
- External MySQL to Aurora MySQL
	- Option 1: Use Percona XtraBackup to create a backup in S3 and create Aurora from it
	- Option 2: Create Aurora MySQL and use `mysqldump` to migrate (slower than S3)
- Use DMS if both DBs are up and running

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
