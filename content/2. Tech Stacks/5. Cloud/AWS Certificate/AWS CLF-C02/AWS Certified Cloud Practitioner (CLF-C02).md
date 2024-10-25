---
title: "AWS Certified Cloud Practitioner (CLF-C02)"
date: 2023-11-20 17:00:00 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Domain 1: Cloud Concepts (24%)
---
### What is Cloud Computing?
Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing

### 6 Benefits of Cloud Computing
1. Trade upfront expense for variable expense
2. Stop spending money to run and maintain data centers
3. Stop guessing capacity
4. Benefit from massive economies of scale
5. Increase speed and agility
6. Go global in minutes

### AWS Well-Architected Framework
- Operational Excellence
    - Perform operations as code
    - Make frequent, small, reversible changes
    - Refine operations procedures frequently
    - Anticipate failure
    - Learn from all operational failures
    - Use managed services
    - Implement observability for actionable insights
- Security
    - Implement a strong identity foundation
    - Maintain traceability
    - Apply security at all layers
    - Automate security best practices
    - Protect data in transit and at rest
    - Keep people away from data
    - Prepare for security events
- Reliability
    - Automatically recover from failure
    - Test recovery procedures
    - Scale horizontally to increase aggregate workload availability
    - Stop guessing capacity
    - Manage change through automation
- Performance Efficiency
    - Democratize advanced technologies
    - Go global in minutes
    - Use serverless architectures
    - Experiment more often
    - Consider mechanical sympathy
- Cost Optimization
    - Implement cloud financial management
    - Adopt a consumption model
    - Measure overall efficiency
    - Stop spending money on undifferentiated heavy-lifting
    - Analyze and attribute expenditure
- Sustainability
    - Understand your impact
    - Establish sustainability goals
    - Maximize utilization
    - Anticipate and adopt new, more efficient hardware and software offerings
    - Use managed services
    - Reduce the downstream impact of your cloud workloads

### AWS Cloud Adoption Framework (AWS CAF)
- Cloud Transformation Journey
    - Envision Phase
        - Focuses on demonstrating how cloud will help `accelerate` your `business outcomes`
    - Align Phase
        - Focuses on `identifying capability gaps` across the 6 AWS CAF perspectives, identifying cross-organizational dependencies, and surfacing stakeholder concerns and challenges
    - Launch Phase
        - Focuses on `delivering pilot initiatives in production` and on `demonstrating incremental business value`
    - Scale Phase
        - Focuses on `expanding production pilots and business value` to desired scale and ensuring that the business benefits associated with your cloud investments are realized and sustained
- Foundational Capabilities
    - Business Capabilities
        - Business Perspective
            - Strategy Management
            - Portfolio Management
            - Innovation Management
            - Product Management
            - Strategic Partnership
            - `Data Monetization`
            - Business Insights
            - Data Science
        - People Perspective
            - Culture Evolution
            - Transformational Leadership
            - `Cloud Fluency`
            - Workforce Transformation
            - Change Acceleration
            - Organization Design
            - Organizational Alignment
        - Governance Perspective
            - Program & Project Management
            - `Benefits Management`
            - Risk Management
            - Cloud Financial Management
            - Application Portfolio Management
            - Data Governance
            - Data Curation
    - Technical Capabilities
        - Platform Perspective
            - Platform Architecture
            - `Data Architecture`
            - Platform Engineering
            - Data Engineering
            - Provisioning and Orchestration
            - Modern App Development
            - CI/CD
        - Security Perspective
            - Security Governance
            - Security Assurance
            - Identity & Access Management
            - Threat Detection
            - Vulnerability Management
            - `Infrastructure Protection`
            - Data Protection
            - Application Security
            - `Incident Response`
        - Operations Perspective
            - Observability
            - Event Management
            - Incident and Problem Management
            - Change & Release Management
            - Performance and Capacity Management
            - Configuration Management
            - Patch Management
            - Availability and Continuity Management
            - Application Management

### Migration Strategies
- The 6 R's of migration
    - Rehosting
        - Moving applications without changes
    - Replatforming
        - Making a few `cloud optimizations` to realize a tangible benefit
    - Refactoring/re-architecting
        - Reimagining how an application is architected and developed by using cloud-native features
    - Repurchasing
        - Moving from a `traditional license` to a `software-as-a-service model`
    - Retaining
        - Keeping applications that are critical for the business in the source environment
    - Retiring
        - Removing applications that are no longer needed

## Domain 2: Security and Compliance (30%)
---
### AWS Shared Responsibility Model
![[AWS Shared Responsibility Model.jpg]]
- Customers: Security `in` the cloud
    - IaaS such as EC2
        - Guest OS management (Update, security patch)
        - Application software installed on the EC2
        - Security group configuration
        - Updating and patching Amazon WorkSpaces virtual Windows desktop
    - S3, DynamoDB
        - Customer Data
        - IAM
    - Amazon RDS
        - Manage connections to the DB
        - Establish a regular maintenance window that tells AWS when to patch the DB instance operating system
    - AWS Lambda
        - Creating versions of Lambda
- AWS: Security `of` the cloud
    - Responsible for `OS installations` when a company hosts its DB on EC2 instances
- AWS & Customer shared responsibility
    - Patch Management
    - Configuration Management
    - Awareness & Training

## Domain 3:  Cloud Technology and Services (34%)
---
### Ways to interact with AWS services
- AWS Management Console
- AWS CLI, AWS SDKs, AWS API
    - Allows users to connect with and deploy AWS services programmatically
    - Programmatic access requires an `access key ID` and a `secret access key` that can be assigned to an AWS user

### AWS Global Infrastructure
- AWS Region
    - When selecting a Region, consider the following 4 business factors
        - `Compliance` with data governance and legal requirements
        - `Proximity` to your customers
        - `Available services` within a Region
        - `Pricing`
- Availability Zone
    - A single data center or a group of data centers within a Region
- AWS Local Zones
    - AWS infrastructure deployment that places AWS services `closer to large population`, industry, and IT centers where no AWS Region exists today
    - Are `connected to the parent AWS Region` via Amazon's private network that provide fast, secure, and seamless access to other AWS services
- Edge Location
    - A site that Amazon `CloudFront` uses to store cached copies of your content closer to your customers for faster delivery
    - Also runs `Route 53` & `AWS Global Accelerator`
- AWS Wavelength
    - Enables customers to use AWS services at the edge of the `5G network`

### Disaster Recovery Strategies
![[AWS Disaster Recovery Strategies.png]]
- Backup & Restore
    - active/passive
    - RPO/RTO: Hours
    - Cost `$`
- Pilot Light: A small version of the app is always running in the cloud which is useful for critical core.
    - active/passive
    - RPO/RTO: 10s of minutes
    - Cost `$$`
- Warm Standby: The full system is up and running, but at minimum size. Upon disaster, we can scale to production load.
    - active/passive
    - RPO/RTO: Minutes
    - Cost `$$$`
- Multi-site: Full Production Scale is running AWS and On-Premise.
    - active/active
    - RPO/RTO: Real-time
    - Cost `$$$$`

## Domain 4: Billing, Pricing, and Support (12%)
---
### AWS Support Plans
- Require AWS account root user credentials to change the AWS support plan
- Basic (Free)
    - 24/7 Customer Service
    - AWS Trusted Advisor limited access
    - AWS Health
- Developer (Charged)
    - General architectural guidance
    - Support automation workflows
    - Access to `technical support` during `business hours`
    - `Email access` to customer support
- Business (Charged)
    - `AWS Trusted Advisor` provides full set of `best practice checks`
    - Direct `phone access` to cloud support engineers
    - Provides `programmatic case management` through the `AWS Support API`
    - `Limited support` for `third-party software`
    - `AWS Health API`
    - `AWS Shield Response Team (SRT)` support
    - `AWS Infrastructure Event Management (IEM)` with `additional fee`
        - Guide how the company should scale its architecture and operational support during the event
- Enterprise(On-Ramp) (Charged)
    - `Concierge Support` team for primary point of contact for AWS Billing and AWS Support
    - Proactive support services by Designated(or A pool of) `Techincal Account Managers (TAMs)`
        - Consultative review and architecture guidance(one per year)
        - `Infrastructure Event Management (IEM)` support(one per year)
        - A Cost Optimization workshop(one per year) and tools
        - `15(or 30) minutes` or less response time for business-critical issues

### AWS Knowledge Center
- To review answers to `frequently asked questions` about security in the AWS Cloud

### AWS Abuse
- When discovered `unauthorized requests` originated `from AWS resource`

### AWS Professional Services
- A `global team of experts` to complete the migration faster and more reliably in accordance with AWS internal best practices

## In-scope AWS services and features
---
### Compute
- Amazon EC2
    - Runs on top of physical host machines managed by AWS using virtualization technology
    - A hypervisor running on the host machine is responsible for:
        - Sharing the underlying physical resources between the virtual machines
        - Coordinating this multitenancy
        - Isolating the virtual machines from each other as they share resources from the host
    - DR features: AMIs, EBS snapshots
    - Advantages
        - Integration with VPC, CloudTrail, IAM
        - Flexible, pay-as-you-go pricing model
    - Amazon EC2 Pricing
        - On-Demand: You pay for only the compute time you use
        - Reserved Instances: `1-year or 3-year term`
            - Standard: Fixed EC2 type & Region
            - Convertible: Unfixed EC2 type & Region
        - EC2 Instance Savings Plans
            - Provides a discount when you make an `hourly spend commitment` to an instance family and Region for a `1-year or 3-year term`
        - Spot Instances
            - Use unused EC2 computing capacity and offer you cost savings at up to 90% off of On-Demand prices
        - Dedicated Hosts
            - `Physical servers` with EC2 instance capacity that is fully dedicated to your use
    - Amazon Elastic Block Store (EBS)
        - A service that provides `block-level` storage volumes that you can use with Amazon EC2 instances
        - `AZ level resource`
        - Need to be in the same AZ to attach EC2
        - Volumes do not automatically scale
    - Elastic Load Balancer
        - Service that automatically distributes incoming application traffic across multiple resources
        - Application Load Balancer (L7: HTTP/HTTPS Routing)
        - Network Load Balancer (L4: TCP Routing)
- Amazon Lightsail
    - AWS 에서 가상 프라이빗 서버를 시작하고 관리할 때 사용 가능한 가장 간편한 방법
- AWS Lambda
    - A `serverless` service that lets you run code without needing to provision or manage servers
    - Cannot run more than `15 minutes`
    - AWS Lambda Pricing
        - Charged based on the `number of requests` for your functions and the `time that it takes` for them to run
- AWS Batch
    - 코어가 많이 필요한 배치 컴퓨팅 작업을 효율적으로 실행 가능
- AWS Elastic Beanstalk (EB)
    - Application Code 만으로 간단하게 서버 배포 가능
    - Elastic Beanstalk은 용량 관리, 로드 밸런싱, 자동 크기 조정 및 모니터링을 통해 자동으로 배포된 인프라에 공통 프로그래밍 언어로 개발된 웹 애플리케이션 및 서비스를 배포하고 크기 조정하는 서비스입니다. Elastic Beanstalk을 사용하면 애플리케이션을 보다 쉽게 프로비저닝하고 지원할 수 있습니다. Elastic Beanstalk은 웹 사이트 지연 시간을 줄이지는 않습니다.
- AWS Outposts
    - Supports a hybrid architecture that gives users the ability to extend AWS infrastructure, AWS services, APIs, and tools to data centers, co- location environments, or on-premises facilities
    - Allows the company to `run AWS services locally` on Outposts with the same APIs, tools, and hardware as in the AWS Cloud

### Containers
- Amazon Elastic Container Registry (ECR)
    - Docker Container Image 를 저장, 관리 및 배포할 수 있는 Registry
    - AWS IAM 과 통합하여 각 Repository 를 리소스 수준에서 제어 가능
    - 선수금이나 약정 없이 저장한 데이터와 인터넷으로 전송한 데이터에 대한 요금만 지불
- Amazon Elastic Container Service (ECS)
    - A highly scalable, high-performance container management system that enables you to run and scale containerized applications on AWS
- Amazon Elastic Kubernetes Service (EKS)
    - A fully managed service that you can use to run Kubernetes on AWS
- AWS Fargate
    - A `serverless` compute engine for containers that works with both Amazon ECS and Amazon EKS
    - `Eliminates` the need to `provision and manage the container hosts`

### Storage
- Amazon S3
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
- Amazon Elastic File System (EFS)
    - A `scalable file storage service` that provides shared file storage for `multiple Amazon EC2 instances`
    - Allows you to handle data that changes frequently and enables multiple users to access and modify the data simultaneously
    - Multiple instances reading and writing simultaneously
    - Linux file system
    - `Regional resource`
    - Automatically scales
- Amazon FSx
    - A fully managed Windows file server
    - A fully managed, highly reliable, and scalable file storage that is accessible over the `Server Message Block (SMB) protocol`
- Amazon S3 Glacier
    - S3 와 같은 내구성, 성능 및 가용성
    - 아카이빙, 장기간 백업 및 오래된 로그 데이터 보관 용도
    - 파일을 로드할 때 비용 발생
    - 다른 S3 와 비교해서 제일 저렴
- AWS Storage Gateway
    - A `hybrid cloud storage service` that provides on-premises users access to virtually unlimited cloud storage
    - To extend the on-premise data storage capacity to the AWS Cloud
    - Helps on-premises applications connect to AWS Cloud-based storage and caches the data locally for low-latency access
    - Amazon S3 File Gateway
        - Can store and retrieve objects in Amazon S3 using industry-standard file protocols such as `Network File System (NFS)` and Server Message Block (SMB)
    - Amazon FSx File Gateway
        - Provides low latency and efficient access to in-cloud FSx for Windows File Server file shares from your on-premises facility
    - Tape Gateway
    - Volume Gateway
- AWS Backup
- AWS Elastic Disaster Recovery

### Database
- Amazon RDS
    - A service that enables you to run relational databases in the AWS Cloud
    - Available on 6 database engines, which optimize for memory, performance, or input/output (I/O)
        - Amazon Aurora
        - PostgreSQL
        - MySQL
        - MariaDB
        - Oracle Database
        - Microsoft SQL Server
    - Amazon Aurora
        - An enterprise-class relational database service
        - Compatible with MySQL and PostgreSQL
        - Replicates six copies of your data across three Availability Zones
        - `Continuously backs up` your data to Amazon S3
- Amazon ElastiCache (?)
    - An `in-memory data store service` that adds `caching layers on top of your databases` to help improve the read times of common requests
    - Supports `two types of data stores`: `Redis` and `Memcached`
- Amazon Neptune
    - A graph database service that work with highly connected datasets, such as recommendation engines, fraud detection, and knowledge graphs
- Amazon Quantum Ledger Database (QLDB) (?)
    - A ledger database service that can be used to review a complete history of all the changes that have been made to your application data
- Amazon DocumentDB (?)
    - A document database service that supports MongoDB workloads
- Amazon DynamoDB
    - A fully managed serverless NoSQL database service that `replicates` data automatically across `three Availability Zones in a single region` to ensure high availability and durability with a `single-digit millisecond` performance
    - `Server-side encryption at rest is enabled` on all DynamoDB table data and cannot be disabled
    - Amazon DynamoDB Accelerator (DAX)
        - An in-memory cache for DynamoDB that helps improve response times from single-digit milliseconds to microseconds
- Amazon MemoryDB for Redis

### Migration & Transfer
- AWS Migration Hub
    - 애플리케이션 마이그레이션을 계획하고 추적하는 데 도움이 되는 서비스
- AWS Application Migration Service
    - AWS MGN은 자동화된 리프트 앤 시프트 솔루션입니다. 이 솔루션은 물리적 서버와 해당 서버에서 실행되는 모든 데이터베이스 또는 애플리케이션을 AWS의 EC2 인스턴스로 마이그레이션할 수 있습니다.
- AWS Application Discovery Service
    - Application Discovery Service는 온프레미스 서버의 사용 및 구성에 대한 정보를 수집하여 AWS로의 마이그레이션을 계획하는 데 도움이 됩니다.
    - Gathering `information about its on-premises infrastructure` and requires information such as the hostname, IP address, and MAC address
- AWS Database Migration Service (DMS)
    - Enables you to migrate relational databases, nonrelational databases, and other types of data stores
    - Other use cases
        - Development and test database migrations
        - Database consolidation
        - Continuous replication
    - AWS Schema Conversion Tool (AWS SCT)
- AWS Transfer Family
- AWS Snow Family
    - A collection of physical devices that help to physically transport up to exabytes of data into and out of AWS
    - AWS Snowcone
        - A small, rugged, and secure edge computing and data transfer device
        - It features `2 CPUs`, `4 GB of memory`, and up to `14 TB of usable storage`
    - AWS Snowball
        - Snowball Edge Storage Optimized
            - Storage: `80 TB of hard disk drive (HDD)` capacity for block volumes and Amazon S3 compatible object storage, and `1 TB of SATA solid state drive (SSD)` for block volumes 
            - Compute: `40 vCPUs`, and `80 GiB of memory` to support Amazon EC2 sbe1 instances (equivalent to C5)
        - Snowball Edge Compute Optimized
            - Storage: `80-TB usable HDD` capacity for Amazon S3 compatible object storage or Amazon EBS compatible block volumes and `28 TB of usable NVMe SSD` capacity for Amazon EBS compatible block volumes
            - Compute: `104 vCPUs`, `416 GiB of memory`, and an optional NVIDIA Tesla V100 GPU
    - AWS Snowmobile
        - An exabyte-scale data transfer service used to move large amounts of data to AWS
        - Can transfer up to `100 petabytes` of data per Snowmobile, a 45-foot long ruggedized shipping container, pulled by a semi trailer truck

### Networking & Content Delivery
- Amazon VPC
    - User-defined logically isolated virtual network
    - Requires internet gateway to access services such as S3, DynamoDB from VPC
    - VPC Flow Logs
        - To capture information about inbound and outbound traffic in an Amazon VPC
    - VPC Endpoints
        - Gateway VPC endpoints provide reliable connectivity to `Amazon S3` and `DynamoDB` without requiring an internet gateway or a NAT device for your VPC
    - VPC Peering
        - To establish a connection between `2 VPCs`
    - Network ACLs
        - A `Stateless` virtual firewall that controls inbound and outbound traffic for the `subnet`
        - Process rules in order, starting with the lowest numbered rule, when deciding whether to allow traffic
        - `Default` network ACL `allows all inbound and outbound` traffic
    - Security Groups
        - A `Stateful` virtual firewall that controls inbound and outbound traffic for an `EC2`
        - By `default`, it `denies all inbound` traffic and `allows all outbound` traffic
    - Network Firewall
        - To prevent employees from using their Amazon Workspaces virtual desktops to visit specific websites that are known to be malicious
    - Virtual Private Gateway
        - Allows protected internet traffic to enter into the VPC
        - Enables you to establish a VPN connection between your VPC and a private network
    - AWS Site-to-Site VPN
        - Creates an `encrypted network path` between on-premises network and AWS Cloud network
        - This `connection uses the internet`, so you cannot expect consistency
        - Even though the traffic is encrypted, the connection is `not private` because the internet is a shared resource
        - Composed of `Virtual Private Gateway` and `Customer Gateway`
    - AWS Client VPN
        - A managed client-based VPN service
        - To securely access AWS resources and the resources in on-premises network
        - Can access resources from any location through an OpenVPN-based VPN client
        - To connect individual laptops to AWS, not an entire data center
    - Transit Gateway
        - To connect and centrally manage network connectivity between `multiple VPCs` in several AWS Regions around the world
- Amazon CloudFront
    - 전 세계 엣지 로케이션에 컨텐츠를 캐싱하여 성능이 향상된 CDN 서비스
    - DDoS 방어 무료 제공 (AWS Shield Standard)
    - CloudFront는 정적 및 동적 웹 콘텐츠를 사용자에게 빠르게 배포하는 웹 서비스
    - CloudFront는 엣지 로케이션이라고 하는 데이터 센터의 전 세계 네트워크를 통해 콘텐츠를 제공
    - CloudFront를 통해 제공하는 콘텐츠를 사용자가 요청하면 해당 요청은 지연 시간이 가장 짧은 엣지 로케이션으로 라우팅됨
    - 콘텐츠는 엣지 로케이션에서 캐시되어 반복적으로 액세스되는 콘텐츠는 소스 S3 버킷 대신 엣지 로케이션에서 제공됨
- Amazon Route 53
    - DNS responses come directly from the edge locations
    - Route 53은 가용성과 확장성이 뛰어난 DNS 웹 서비스
    - Route 53의 3가지 주요 기능
        - 도메인 이름 등록
        - 인터넷 트래픽을 도메인의 리소스로 라우팅
        - 해당 리소스의 상태를 확인
- Amazon API Gateway
    - To publish and manage web services that provide REST APIs
- AWS Direct Connect
    - Links internal network to a Direct Connect location through a standard `Ethernet fiber-optic cable` to create a `private connection` between an `on-premises` and an `AWS Cloud` workload
    - One end of the cable connects to your router and the other end of the cable connects to a Direct Connect router
    - `Consistent` and `private` because your company is the `only user of the cable`
- AWS Global Accelerator
    - To `improve` the overall `availability and performance` of its applications that are hosted on AWS
    - To route requests for key resources through Amazon's global network
    - Request is initially routed to the closest `edge location` and then travels through Amazon's network

### Developer Tools
- AWS CodeStar
	- A cloud‑based development service that provides the tools you need to quickly develop, build, and deploy applications on AWS
    - To set up an `entire development and continuous delivery toolchain` for coding, building, testing, and deploying code
- AWS CodeCommit
    - A secure, highly scalable, fully managed `source control service` that hosts private Git repositories
- AWS CodeBuild
    - 사용자가 소스 코드를 자동으로 `컴파일`하고, `단위 테스트`를 실행하고, 배포 준비가 된 `소프트웨어 패키지`를 생성할 수 있도록 도와주는 서비스
- AWS CodeDeploy
	- A service that `automates code deployments` to any instance, including Amazon EC2 instances and instances running on-premises
- AWS CodePipeline
    - A `continuous delivery service` you can use to model, visualize, and automate the steps required to release your software
- AWS Cloud9
    - A cloud-based integrated development environment (IDE)
- AWS CloudShell
    - AWS CLI 커맨드로 리소스에 액세스할 수 있음
- AWS X-Ray
    - To `trace user requests` as they move through the application's components
    - To view end-to-end performance metrics and troubleshoot distributed applications
- AWS CodeArtifact
    - 배포 준비가 된 소프트웨어를 저장하고 공유하는 관리형 아티팩트 리포지토리 서비스
- AWS AppConfig
	- Speeds up `software release` frequency, improves application resiliency, and helps you address emergent issues more quickly

### Customer Enablement
- AWS IQ
	- Connects you to AWS Certified experts for hands-on help for your AWS projects
- AWS Managed Services (AMS)
    - Helps you adopt AWS at scale and operate more efficiently and securely
- AWS Activate for Startups
	- Provides startups with the resources they need to build, launch, and scale on AWS
- AWS Support

### Management & Governance
- AWS Organizations
    - A central location to manage multiple AWS accounts
    - Consolidated Billing
        - To receive a single bill for all AWS accounts in the organization
    - Organizational Units (OUs)
        - Hierarchical groupings of accounts to meet security, compliance, or budgetary needs
    - Service Control Policies (SCPs)
        - To place `restrictions` on the AWS services, resources, and individual API actions that users and roles `in each account` can access
        - Can be applied to `individual member accounts` and `OUs`
- Amazon CloudWatch
    - A web service that enables you to `monitor and manage various metrics` and configure alarm actions based on data from those metrics
    - CloudWatch Dashboard
        - Enables you to access all the metrics for your resources from a single location
    - CloudWatch Alarms
        - Can create alarms(opens in a new tab) that automatically perform actions if the value of your metric has gone above or below a predefined threshold
    - CloudWatch Logs Insights
        - To perform queries and interactively search and analyze log data
- AWS Auto Scaling
    - Monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost
- AWS CloudFormation
    - To deploy a service to the AWS Cloud by using infrastructure-as-code (IaC) principles
- AWS Config
    - A fully managed service that provides you with resource inventory, `configuration history`, and `configuration change notifications` to use security and governance
    - To assess, audit, and evaluate the configurations of your AWS resources
    - An example of AWS Well-Architected Framework `Security` pillar
- AWS Service Catalog
    - To limit its employees' AWS access to a portfolio of predefined AWS resources
    - To `manage` deployed IT services and govern its `infrastructure as code (IaC) templates`
- AWS Systems Manager
    - Session Manager
        - Allows you to start interactive sessions with your instances directly from the AWS Management Console or through the AWS CLI
        - It provides secure and auditable `access` to instances `without` the need to open inbound `SSH ports` and managing `SSH keys`
- AWS Trusted Advisor
    - A web service that `inspects your AWS environment` and provides `real-time recommendations` in accordance with AWS best practices in 5 categories
        - Cost Optimization
        - Performance
        - Security
        - Fault Tolerance
        - Service Limits
- AWS Control Tower
- AWS License Manager
- AWS Well-Architected Tool
- AWS Health Dashboard
    - `Alerts` when an `AWS event` may impact a company's AWS resources
    - To learn about AWS service availability and operations
- AWS Launch Wizard
- AWS Compute Optimizer
    - Can identify `rightsizing` opportunities for Amazon EC2 instances
- AWS Resource Groups & Tag Editor
- AWS CloudTrail
    - Records AWS API calls and events for `audit` and compliance purposes
        - To see if the security group was changed
        - To identify the last time that a specific user accessed the AWS Management Console
    - CloudTrail Insights
        - Allows CloudTrail to automatically detect unusual API activities in your AWS account

### Machine Learning
- Amazon SageMaker
    - To quickly build, train, and deploy machine learning models at scale
- Amazon Comprehend
    - Discover patterns in text through NLP
- Amazon Kendra
	- An `intelligent search service` that uses natural language processing and advanced machine learning algorithms to return specific answers to search questions from your data
- Amazon Polly
    - 텍스트를 음성으로 변환하는 기계 학습 서비스
- Amazon Rekognition
    - 이미지, 비디오 분석 서비스
    - 사진에 나타나는 객체를 자동으로 감지
- Amazon Textract
    - Extracting text and data from documents
- Amazon Transcribe
    - Convert speech to text
- Amazon Translate
    - 기계 학습 언어 번역 서비스
- Amazon Lex
    - Interactive chat bot (Alexa)

### Analytics
- Amazon Athena
    - To `query` the data in an Amazon `S3 bucket` by using `standard SQL`
- Amazon Redshift
    - A `petabyte-scale data warehousing service` to perform complex analytical queries
- Amazon OpenSearch Service
- Amazon Kinesis
    - Data Analytics
        - To analyze streaming user data and respond to customer queries in real time
- Amazon QuickSight
    - Supports the creation of `visual` reports from AWS Cost and Usage Report data
- AWS Data Exchange
- Amazon Managed Streaming for Apache Kafka (MSK)
- AWS Glue
    - 분석을 위한 데이터를 쉽게 준비하도록 해주는 서비스
- Amazon Elastic MapReduce (EMR)
    - EC2 에서 대량의 데이터를 쉽고 빠르게 비용 효율적으로 처리할 수 있는 AWS 관리형 Hadoop 프레임워크
    - Elastic MapReduce: 분산 처리 후 합치는 과정을 MapReduce 라고 함

### Security, Identity, & Compliance
- AWS Resource Access Manager (RAM)
- Amazon Cognito
    - An identity platform for web and mobile apps
    - A user directory, an authentication server, and an authorization service for `OAuth 2.0` access tokens and AWS credentials
    - To implement `identity management` for a fleet of mobile apps that are running in the AWS Cloud
- AWS Secrets Manager
    - To establish a schedule for `rotating` database `user credentials` with the LEAST amount of operational overhead
    - To design a `centralized storage system` to `manage` the configuration data and `passwords` for its critical business applications
- Amazon GuardDuty
    - A service that provides intelligent `threat detection` for your AWS infrastructure and resources
- Amazon Inspector
    - A service that checks applications for `security vulnerabilities` and deviations from security best practices
    - Helps to improve the security and compliance of applications by running automated `security assessments`
- Amazon Macie
    - Uses `machine learning` to help discover, monitor, and protect `sensitive data` such as `PII` that is stored in Amazon S3 buckets
- AWS IAM Identity Center (AWS Single Sign-On)
    - A central user portal that users can log in to `third-party business applications` that support `Security Assertion Markup Language (SAML) 2.0`
- AWS Certificate Manager (ACM)
    - To secure web application by using SSL/TLS to encrypt traffic
- AWS Key Management Service (KMS)
    - Enables you to perform encryption operations through the use of cryptographic keys for both `encryption at rest` and `encryption in transit`
- AWS CloudHSM
- AWS Directory Service
- AWS WAF & Shield
    - Filter traffic in edge locations
    - AWS WAF
        - A web application firewall that lets you monitor network requests that come into your web applications
        - Works with `CloudFront`, `API Gateway`, `Application Load Balancer`
        - SQL Injection, XSS protection
    - AWS Shield
        - DDoS protection
- AWS Firewall Manager
- AWS Artifact
    - A service that provides `on-demand` access to AWS `security and compliance reports` and select online agreements
    - Provides AWS ISO certifications
- Amazon Detective
    - Uses `machine learning` to identify `suspicious activities` in its AWS account
- AWS Security Hub
    - A `cloud security posture management (CSPM) service` that aggregates alerts from various AWS services and partner products in a standardized format
- AWS Audit Manager
	- `Automates evidence collection` so you can more easily assess whether your policies, procedures, and activities are operating effectively
- AWS Identity and Access Management (IAM)
    - Enables you to manage access to AWS services and resources securely
    - AWS account root user
        - The first sign-in identity that is available when an AWS account is created
    - IAM User Groups
        - A collection of IAM users
    - IAM Users
        - An identity that you create in AWS
        - By default, it has no permissions associated with it
    - IAM Roles
        - An identity that you can assume to gain `temporary access` to permissions
        - Ideal for situations in which access to services or resources needs to be granted temporarily, instead of long-term
        - To grant users in one AWS account access to resources in another AWS account
    - IAM Policies
        - A document that allows or denies permissions to AWS services and resources
        - Follow the security principle of `least privilege` when granting permissions
    - IAM Access Analyzer
        - `Identifies` whether an Amazon S3 bucket or an IAM role has been `shared` with an `external entity` such as `another AWS account`
        - Checks access policies and offers actionable recommendations to help users set secure and functional policies
    - IAM Credential Report
        - To `audit` its password and access key rotation details for `compliance` purposes
    - AWS Security Token Service (STS)
        - To request `temporary`, `limited-privilege` credentials for users

### Cloud Financial Management
- AWS Marketplace Subscriptions
    - A digital catalog that includes thousands of software listings from independent software vendors such as AWS WAF - Fortinet OWASP Top 10
- AWS Billing Conductor
	- A `customizable billing service`, allowing you to customize your billing data to match your desired showback or chargeback business logic
- AWS Billing and Cost Management
    - Cost Explorer
        - A tool that lets you visualize, understand, and manage your AWS costs and usage over time
        - To forecast future costs and usage of AWS resources based on past consumption
        - Reserved Instances 공유를 위해 AWS 계정을 관리하는 곳
    - Cost Allocation Tags
        - To determine which business unit is using specific AWS resources
    - Budgets
        - To plan your service usage, service costs, and instance reservations
        - `Alerts` when your usage exceeds (or is forecasted to exceed) the budgeted amount
    - Cost and Usage Report

### Front-end Web & Mobile
- AWS Amplify
	- A `set of purpose-built tools and features` that enables frontend web and mobile developers to `quickly and easily build` full-stack applications on AWS
- AWS AppSync
	- Enables developers to connect their applications and services to data and events with secure, server-less, and high-performing GraphQL and Pub/Sub APIs
- AWS Device Farm
	- An `application testing service` that lets you improve the quality of your web and mobile apps by testing them across an extensive range of `desktop browsers and real mobile devices`

### Application Integration
- AWS Step Functions
    - A low-code, `visual workflow service` that developers can use to build `distributed applications`, automate processes, `orchestrate microservices`, and create data and machine learning (ML) pipelines
- Amazon EventBridge
- Amazon Simple Notification Service (SNS)
    - A publish/subscribe service
    - To send both text and email messages from distributed applications
- Amazon Simple Queue Service (SQS)
    - A message queuing service
    - To decouple applications
    - Helps developers use loose coupling and reliable messaging between microservices

### Business Applications
- Amazon Connect
    - An omnichannel `cloud contact center` that helps you provide superior customer service at a lower cost
    - Amazon Connect provides a seamless experience across voice and chat for your customers and agents
- Amazon Simple Email Service (SES)

### End User Computing
- Amazon WorkSpaces
    - Virtual Windows desktop for `entire working environment`
- Amazon AppStream 2.0
    - To use the AWS Cloud to provide secure access to `individual desktop applications` that are running in a fully managed environment
- Amazon WorkSpaces Web
	- An on-demand, fully managed, Linux-based service designed to facilitate secure `browser access` to internal websites and software-as-a-service (SaaS) applications

### Internet of Things
- AWS IoT Greengrass
	- Enables local processing, messaging, data management, ML inference, and offers prebuilt components to accelerate application development
	- Provides a secure way to seamlessly `connect` your `edge devices` to any `AWS service` as well as to third-party services
- AWS IoT Core
	- A managed cloud service that lets connected devices `easily and securely interact` with cloud applications and other devices
