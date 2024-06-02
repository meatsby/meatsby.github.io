---
title: AWS KMS
date: 2024-06-02 21:30:29 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS KMS
---
- AWS manages encryption keys
- Fully integrated with IAM for authorization
- Able to audit KMS key usage using CloudTrail
- Seamlessly integrated into most AWS services
- Never store secrets in plaintext
	- KMS Key Encryption is also available through API calls
	- Encryption secrets can be stored in the code/environment variables

### KMS Key Types
- Symmetric (AES-256 keys)
	- A single encryption key is used to Encrypt and Decrypt
	- AWS services that are integrated with KMS use Symmetric CMKs
	- You never get access to the KMS key unencrypted (must call KMS API to use)
- Asymmetric (RSA & ECC key pairs)
	- Public (Encryption) and Private (Decrypt) pair
	- Used for Encrypt/Decrypt or Sign/Verify operations
	- The public key is downloadable, but cannot access the Private key unencrypted
### Types of KMS Keys
- AWS Owned Keys (free): SSE-S3, SSE-SQS, SSE-DDB (default key)
- AWS Managed Key (free)
- Customer-managed keys created in KMS: $1/month
- Customer-managed keys imported: S1/month
- + pay for the API call to KMS ($0.03/10000 calls)

### Automatic Key rotation
- AWS-managed KMS key: automatic every 1 year
- Customer-managed KMS key: (must be enabled) automatic every 1 year
- Imported KMS key: only manual rotation possible using alias

## KMS Key Policies
---
- Control access to KMS keys, similar to S3 bucket policies
- Difference: you cannot control access without them
- Default KMS Key Policy
	- Created if not specified a specific KMS Key Policy
	- Complete access to the key to the root user = entire AWS account
- Custom KMS Key Policy
	- Define users, and roles that can access the KMS key
	- Define who can administer the key
	- Useful for cross-account access of your KMS key

## Copying Snapshots across accounts
---
1. Create a snapshot, encrypted with your own KMS key
2. Attach a KMS Key Policy to authorize cross-account access
3. Share the encrypted snapshot
4. Create a copy of the Snapshot, and encrypt it with a CMK in your account
5. Create a volume from the snapshot

## KMS Multi-Region Keys
---
- Identical KMS keys in different AWS Regions that can be used interchangeably
- Multi-Region keys have the same key ID, material, automatic rotation, ...
- Encrypt in one Region and decrypt in other Regions
- No need to re-encrypt or make cross-region API calls
- KMS Multi-Region is NOT global (Primary + Replicas)
- Each Multi-Region key is managed independently

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
