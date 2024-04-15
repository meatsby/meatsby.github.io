---
title: Amazon S3
date: 2024-04-15 23:05:21 +0800
status: In Progress
draft: false
tags:
  - AWS
  - S3
---
## S3 란
---
- A `Regional resource` service that provides `object-level storage`
- Tag the objects in the S3 bucket to restrict access to the objects
- Amazon S3 Storage Classes
	- S3 Standard
		- 일반적인 저장 목적
		- 접근이 빈번한 스토리지
	- S3 Standard IA
		- 데이터를 오래 보유하기 위한 목적
		- 접근 빈도 낮음
		- 3개 이상의 AZ 에 저장됨
		- S3 Standard 보다 저렴
	- S3 One Zone IA
		- S3 Standard IA 와 같지만 오직 1개의 AZ 에 저장됨
		- S3 Standard IA 보다 20% 저렴
- Amazon S3 Pricing
	- Storage - Charged based on objects’ sizes, storage classes, and how long you have stored each object during the month
	- Requests and Data Retrievals - Charged based on requests made to Amazon S3 objects and buckets
	- Data Transfer - You pay for data that you transfer into and out of Amazon S3
	- Management and Replication - You pay for the storage management features that you have enabled on your account’s Amazon S3 buckets

## References
---
- 
