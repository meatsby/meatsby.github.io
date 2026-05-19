---
title: "AWS Lambda"
date: 2024-04-20 21:49:48 +0800
status: In Progress
draft: false
tags:
  - AWS
  - Lambda
---
## AWS Lambda
---
- Virtual functions - no servers to manage
- Limited by time - short executions
- Run on-demand
- Scaling is automated
- Lambda Container Image
    - The container image must implement the Lambda Runtime API
    - ECS/Fargate is preferred for running arbitrary Docker images

### Lambda Limits per region
- Execution
    - Memory allocation: 128MB to 10GB (1MB increments)
    - Maximum execution time: 900 seconds (15 minutes)
    - Environment variables (4KB)
    - Disk capacity in the "Function Container" (in /tmp): 512MB to 10GB
    - Concurrency executions: 1000 (can be increased)
- Deployment
    - Lambda function deployment size (compressed .zip): 50MB
    - Size of uncompressed deployment (code + dependencies): 250MB
    - Can use the /tmp directory to load other files at startup
    - Size of environment variables: 4KB

### Lambda SnapStart
- Improves Lambda function performance up to 10x at no extra cost for Java 11 and above
- When enabled, function is invoked from a pre-initialized state (no function initialization from scratch)
- When you publish a new version
    - Lambda initialize function
    - Takes a snapshot of memory and disk state of the initialized function
    - Snapshot is cached for low-latency access

### CloudFront Function vs Lambda@Edge
- CloudFront Function
    - Lightweight functions written in JS
    - For high-scale, latency-sensitive CDN customizations
    - Sub-ms startup times, millions of requests/second
    - Used to change Viewer requests and responses
    - Native feature of CloudFront (manage code entirely within CloudFront)
- Lambda@Edge
    - Lambda functions written in NodeJS, Python
    - Scales to 1000s of requests/sec
    - Used to change CloudFront requests and responses
        - Viewer Request
        - Origin Request
        - Origin Response
        - Viewer Response
    - Author functions in one AWS Region, then CloudFront replicates to its locations

### Lambda in VPC
- Lambda function is launched outside VPC by default, meaning it cannot access resources in VPC such as RDS, ElastiCache, ELB, ...
- Define the VPC ID, Subnets, and SGs to launch Lambda in VPC
    - Lambda will create an ENI in Subnets
- Use Lambda with RDS Proxy to:
    - Avoid opening too many connections to RDS
- Lambda must be deployed in VPC because RDS Proxy is never publicly accessible

### Invoking Lambda from RDS & Aurora
- Allows to process data events from within a DB
- Supported for RDS Postgres & Aurora MySQL
- Must allow outbound traffic to Lambda from within DB instance (Public, NAT GW, VPC Endpoints)
- DB instance must have the required permissions to invoke the Lambda function (Lambda Resource-based Policy & IAM Policy)

### RDS Event Notifications
- Notifications that tells information about the DB instance itself
- You don't have any information about the data itself
- Subscribe to the following event categories:
    - DB instance
    - DB snapshot
    - DB Parameter Group
    - DB Security Group
    - RDS Proxy
    - Custom Engine Version
- Near real-time events (up to 5 minutes)
- Send notifications to SNS or subscribe to events using EventBridge

### Lambda Pre-installed Python packages
- Lambda 엔 `boto3` 와 같은 유용한 패키지들을 미리 제공되어 Docker Image 를 빌드할 때 패키지를 다운로드하는 번거로움을 줄일 수 있음
- [해당 Gist](https://gist.github.com/gene1wood/4a052f39490fae00e0c3) 를 통해 어떤 패키지들이 pre-installed 되어있는지 확인 가능

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
