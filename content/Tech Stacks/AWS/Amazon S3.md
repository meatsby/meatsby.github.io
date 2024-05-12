---
title: Amazon S3
date: 2024-04-15 23:05:21 +0800
status: In Progress
draft: false
tags:
  - AWS
  - S3
---
## S3
---
- A `Regional resource` service that provides `object-level storage`
- Buckets must have a `globally unique name` (across all regions & all accounts)
- Tag the objects in the S3 bucket to restrict access to the objects

### Objects
- Objects(files) have a `key` which is the full path
	- e.g. `s3://my-bucket/my_folder/another_folder/my_file.txt`
	- There's no concept of "directories" within buckets
- Object values are the content of the body
	- Max Object Size = 5TB
- Metadata (list of text key/value pairs - system or user metadata)
- Tags (Unicode key/value pair - up to 10) - useful for security/lifecycle
- Version ID (if versioning is enabled)

### Security
- User-Based
	- IAM Policies - which API calls should be allowed for a specific IAM User
- Resource-Based
	- Bucket Policies - bucket-wide rules from the S3 console (allows cross-account)
	- Object Access Control List - finer grain (can be disabled)
	- Bucket Access Control List - less common (can be disabled)
- Note: an IAM principal can access an S3 object if
	- The user IAM permissions ALLOW it OR the resource policy ALLOWS it
	- AND there's no explicit DENY
- Encryption: encrypt objects in S3 using encryption keys

### S3 Bucket Policies
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1715525559851",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::examplebucket/*"
    }
  ]
}
```
- JSON based policies
	- Resources: buckets and objects
	- Effect: Allow / Deny
	- Actions: Set of API to Allow or Deny
	- Principal: The account or user to apply the policy to
- Use S3 bucket for policy to:
	- Grant public access to the bucket
	- Force objects to be encrypted at upload
	- Grant access to another account (cross-account)

### Static Website Hosting
- S3 can host static websites and have them accessible on the internet
- If you get a 403 Forbidden, make sure the bucket policy allows public reads

### Versioning
- It is enabled at the bucket level
- The same key overwrite will change the version: 1, 2, 3, ...
- It is best practice to version buckets
	- Protect against unintended deletes (ability to restore a version)
	- Easy roll back to the previous version
- Notes:
	- Any file that is not versioned before enabling versioning will have version "null"
	- Suspending versioning does not delete the previous versions

### Replication (CRR & SRR)
- Must enable versioning in source and destination buckets
- Cross-Region Replication (CRR)
- Same-Region Replication (SRR)
- Buckets can be in different AWS accounts
- Copying is asynchronous
- Must give proper IAM permissions to S3
- Use Cases:
	- CRR - Compliance, lower latency access, replication across accounts
	- SRR - Log aggregation, live replication between production and test accounts
- After you enable Replication, only new objects are replicated
- Optionally, you can replicate existing objects using S3 Batch Replication
	- Replicates existing objects and objects that failed replication
- For DELETE operations
	- Can replicate delete markers from source to target (optional)
	- Deletions with a version ID are not replicated to avoid malicious deletes
- There is no "chaining" of replication
	- If bucket 1 has replication into bucket 2, which has replication into bucket 3, then objects created in bucket 1 are not replicated to bucket 3

### S3 Storage Classes
- S3 Standard - General Purpose
	- Used for frequently accessed data
	- Low latency and high throughput
	- Sustain 2 concurrent facility failures
	- Use cases: Big Data analytics, mobile & gaming applications, content distribution, ...
- S3 Infrequent Access Storage Classes
	- For data that is less frequently accessed, but requires rapid access when needed
	- Lower cost than S3 Standard
	- S3 Standard IA
		- 3개 이상의 AZ 에 저장됨
		- Use cases: DR, backups
	- S3 One Zone IA
		- S3 Standard IA 와 같지만 오직 1개의 AZ 에 저장됨
		- S3 Standard IA 보다 20% 저렴
		- Use cases: Storing secondary backup of on-premise data, or data you can recreate
- S3 Glacier Storage Classes
	- Low-cost object storage meant for archiving/backup
	- Pricing: Price for storage + object retrieval cost
	- S3 Glacier Instant Retrieval
	- S3 Glacier Flexible Retrieval
	- S3 Glacier Deep Archive
- S3 Intelligent Tiering
	- Small monthly monitoring and auto-tiering fee
	- Moves objects automatically between Access Tiers based on usage
	- There are no retrieval charges in S3 Intelligent-Tiering
	- Frequently Access Tier (automatic): default tier
	- Infrequently Access Tier (automatic): objects not accessed for 30 days
	- Archive Instant Access Tier (automatic): objects not accessed for 90 days
	- Archive Access Tier (optional): configurable from 90 days to 700+ days
	- Deep Archive Access Tier (optional): configurable from 180 days to 700+ days

### S3 Pricing
- Storage - Charged based on objects’ sizes, storage classes, and how long you have stored each object during the month
- Requests and Data Retrievals - Charged based on requests made to Amazon S3 objects and buckets
- Data Transfer - You pay for data that you transfer into and out of Amazon S3
- Management and Replication - You pay for the storage management features that you have enabled on your account’s Amazon S3 buckets

## S3 to S3 Data Transfer
---
- Using AWS CLI
- Using S3 Batch Replication
- Using DataSync

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
