---
title: "AWS Transfer Family"
date: 2023-12-15 13:30:00 +0800
status: In Progress
tags:
  - AWS
  - SFTP
---

### What is SFTP
- SFTP, SSH File Transfer Protocol
- SSH based FTP, encrypted data is transfered, preventing information loss from interception
- Uses 2 channel: one for control purpose, another for data transfer

### AWS Transfer Family - SFTP Server
- AWS Transfer Family is a secure transfer service that allows to transfer files into and out of AWS storage services
- AWS Transfer Family offers fully managed support for the transfer of files over SFTP directly into and out of Amazon S3 or EFS
- AWS Transfer Family provides access to a file transfer protocol-enabled server in AWS without running any server infrastructure
- Associate hostname with the server endpoint, provision right level of access for users, then users' transfer requests are serviced directly out of the server endpoint
- SFTP server is configured with `Interface type VPC Endpoint` to control the access using `Security Groups`
- Route 53 navigates traffic from the internet to the VPC endpoint through internet gateway
- `Network Access Control List` for each ENI with EIP in each subnets will control the traffic before it reaches to the SFTP server

### Route 53
- DNS Service hosted by AWS, returns corresponding EIP

### Internet Gateway
- Allows VPC to communicate with the internet

### Route Table
- Contains local, IGW, and TGW routes

### NACL
- NACL is an Access List for Subnet, while SG is for instances
- Access Control before entering subnet within the AZ
- Subnet can only connect to 1 NACL, while NACL can be connected to several subnets
- NACL has deny rules while SG only has allow rules
- Rules are numbered and the rule with smallest number is applied first
- Ingress & Outgress rule is applied seperately because it's `stateless`

### Security Group
- Inbound & Outbound traffic control virtual firewall
- SG is applied to ENI, services with ENI within the VPC is applicable by the SG
- Security Group is `stateful`, meaning outbound rule doesn't affect the traffic. Traffics that are from ingress are considered legitimate
- Allows PZEN ip ingress

### S3 Server Side Encryption Configuration
- sse_algorithm = aws:kms
- kms_master_key_id = kms_alias_arn
- 데이터를 받는 App or Service 에 의해 데이터를 암호화하는 것
    - S3 플랫폼 내에서 진행됨
    - 디스크에 저장될 때 데이터 객체를 암호화
    - 적절한 권한 증빙을 통해 데이터 인출 시 복호화
- Types of Server Side Encryption
    1. SSE-S3: Encryption by AWS-managed key
    2. SSE-KMS: Encryption by AWS KMS
    3. SSE-C: Encryption by user-defined key

### SSE-KMS
- User-level management of keys
    - Some users can access the key, while others cannot, tracing is also possible
- Requires "x-amz-server-side-encryption":"aws:kms" header
- How it's encrypted
    1. Object is send through HTTPS + Header
    2. Pre-defined KMS Customer Master Key (CMK) encrypts the object
    3. Encrypted object is saved into the S3 Bucket

### VPC Endpoint
- A service that allows resources within the VPC to access
- VPC 내 Resource 들이 VPC 외부의 서비스에 (S3, DynamoDB) 접근할 때 Internet GW, NAT GW 등의 외부 Internet Transfer Service 를 타지 않고 내부 네트워크를 통해 접근할 수 있도록 해주는 서비스
- 2 Types of VPC Endpoint
    - Interface Endpoint: Uses ENI and EIP (SQS, SNS, Kinesis, and more)
        - Located in subnet
        - SFTP Server is using `Interface Endpoint`
    - Gateway Endpoint: Uses Route Table (S3, DDB, not much more)
        - Located in vpc

### S3 Bucket
- S3 Bucket is located inside the Region