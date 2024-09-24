---
title: "Amazon ElastiCache"
date: 2024-05-05 22:20:18 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon ElastiCache
---
- Managed Redis or Memcached
- Caches are in-memory DB with high performance & low latency
- Helps reduce load off of DBs for read-intensive workloads
- Helps application to be stateless

### Use Case - DB Cache
- Application queries to ElastiCache
- If not available, get from RDS and store in ElastiCache
- Cache must have an invalidation strategy to ensure only the most current data is used

### Use Case - User Session Store
- The user logs into any of the application
- The application writes the session data into ElastiCache
- The user hits another instance of the application
- The instance retrieves the session data to keep user's login

### Redis vs Memcached
- Redis
	- Multi-AZ with Auto-Failover
	- Read Replicas to scale reads and have HA
	- Data durability using AOF persistence
	- Backup and restore features
	- Supports Sets and Sorted Sets
- Memcached
	- Multi-node for partitioning of data (sharding)
	- No HA
	- Non persistent
	- No backup and restore
	- Multi-threaded architecture

### Patterns for ElastiCache
- Lazy Loading
	- All the read data is cached, data can become stale in the cache
- Write Through
	- Adds or update data in the cache when written to DB (no stale data)
- Session Store
	- Store temporary session data in the cache (using TTL features)

## Cache Security
---
- ElastiCache supports IAM Authentication for Redis
- IAM policies on ElastiCache are only used for AWS API-level security
- Redis Auth
	- Can set a password/token when creating Redis cluster
	- Extra level of security for cache (on top of SGs)
	- Supports SSL in-flight encryption
- Memcached
	- Supports SASL-based authentication

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
