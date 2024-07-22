---
title: AWS DataSync
date: 2024-05-14 14:14:51 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS DataSync
---
- Move large amounts of data to and from
	- On-premises / other cloud to AWS (NFS, SMB, HDFS, S3, API, ...) - needs agent
	- AWS to AWS (different storage services) - no agent needed
- Can synchronize to:
	- S3 (any storage classes including Glacier)
	- EFS
	- FSx
- Replication tasks can be scheduled hourly, daily, weekly
- File permissions and metadata are preserved (NFS POSIX, SMB, ...)
- One agent task can use 10 Gbps, can setup a bandwidth limit

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
