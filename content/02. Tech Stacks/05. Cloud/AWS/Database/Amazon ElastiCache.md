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

## ElastiCache Redis OSS 7 Upgrade
---
ElastiCache 같은 Managed Service 는 EoL 이전에 버전 업그레이드를 하지 않으면 Premium 지원을 위한 추가 요금이 발생한다. 때문에 26년 1월에 표준 지원을 종료하는 Redis OSS v5 나 27년 1월에 표준 지원을 종료하는 Redis OSS v6 버전의 엔진을 사용하는 경우 미리 Redis OSS v7 으로 업그레이드해주는 것이 좋다.

[공식문서](https://docs.aws.amazon.com/ko_kr/AmazonElastiCache/latest/dg/VersionManagement-upgrade-considerations.html)에 따르면 기본적으로 ElastiCache Redis 업그레이드는 데이터 보존과 다운타임이 발생하지 않도록 설계되어있다. 하지만 혹시 모를 데이터 유실을 방지하기 위해 업그레이드가 진행되기 전에 백업 Snapshot 을 떠놓는 것이 Best Practice 다.

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
