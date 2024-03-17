---
title: "AWS Certified Cloud Practitioner (CLF-C02)"
date: 2023-11-20 17:00:00 +0800
status: In Progress
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
    - 코드를 통한 운영
    - 작게 자주 발생하고 되돌릴 수 있는 변경 내용 적용
    - 수시로 운영 절차 수정
    - 실패 예측
    - 모든 운영상 실패로부터 학습
- Security
    - 강력한 자격 증명 기반 구현
    - 추적성 유지
    - 모든 계층에 보안 적용
    - 보안 모범 사례의 작동 적용
    - 전송 및 보관 중인 데이터 보호
    - 사람들이 데이터에 쉽게 액세스할 수 없도록 유지
    - 보안 이벤트에 대비
- Reliability
    - 장애 자동 복구
    - 복구 절차 테스트
    - 수평적 크기 조정을 통해 전체 워크로드 가용성 증대
    - 용량 추정 불필요
    - 자동화를 통한 변경 관리
- Performance Efficiency
    - 고급 기술의 대중화
    - 몇 분 만에 전 세계에 배포
    - 서버리스 아키텍처 사용
    - 실험 횟수 증가
    - 기계적 조화 고려
- Cost Optimization
    - 클라우드 재무 관리 구현
    - 소비 모델 도입
    - 전반적인 효율성 측정
    - 획일적인 업무 부담에 대한 비용 지출 중단
    - 지출 분석 및 귀속
- Sustainability
    - 영향 이해
    - 지속 가능성 목표 수립
    - 활용률 극대화
    - 보다 효율적인 최신 하드웨어와 소프트웨어 제품 및 서비스 예측 및 도입
    - 관리형 서비스 사용
    - 클라우드 워크로드의 다운스트림 영향 감소

### AWS Cloud Adoption Framework (AWS CAF)
- Business Perspective
    - Helps you move from separate strategies for business and IT to a business model that integrates IT strategy
- People Perspective
    - Helps Human Resources (HR) and personnel management prepare their teams for cloud adoption by updating staff skills and organizational processes to include cloud-based competencies
- Governance Perspective
    - Integrates IT Governance and Organizational Governance
    - It provides guidance on identifying and implementing best practices for IT Governance, and on supporting business processes with technology
- Platform Perspective
    - Helps you design, implement, and optimize the architecture of AWS technology based on business goals and objectives
- Security Perspective
    - Helps you structure the selection and implementation of controls
- Operations Perspective
    - Helps you to run, use, operate, and recover IT workloads to levels that meet the requirements of your business stakeholders

### Migration Strategies
- The 6 R's of migration
    - Rehosting
        - Moving applications without changes
    - Replatformin
        - Making a few cloud optimizations to realize a tangible benefit
    - Refactoring/re-architecting
        - Reimagining how an application is architected and developed by using cloud-native features
    - Repurchasing
        - Moving from a traditional license to a software-as-a-service model
    - Retaining
        - Keeping applications that are critical for the business in the source environment
    - Retiring
        - Removing applications that are no longer needed

## Domain 2: Security and Compliance (30%)
---
### AWS Shared Responsibility Model
[put image]
- Customers: Security in the cloud
    - AWS Cloud 내에서 생성하고 배치하는 모든 것의 보안 책임
    - EC2 와 같은 IaaS 서비스의 경우, Guest OS 관리 (업데이트, 보안 패치 등), 인스턴스에 설치한 모든 애플리케이션 소프트웨어, 보안 그룹의 구성 관리에 대한 책임
    - S3, DynamoDB 와 같은 추상화 서비스의 경우, AWS 는 인프라 계층, OS, 플랫폼을 운영하고 고객은 데이터 관리, 적절한 허가를 부여하는 IAM 도구 사용 등에 대한 책임
    - e.g.
        - 최소 권한의 원칙에 따라 IAM 사용자를 구성한다.
        - Amazon S3 버킷을 구성하여 퍼블릭 액세스를 허용한다.
    - When using Amazon RDS
        - Manage connections to the DB
    - Updating and patching Amazon WorkSpaces virtual Windows desktop
    - When RDS OS patch
        - Establish a regular maintenance window that tells AWS when to patch the DB instance operating system
    - When using Lambda
        - Creating versions of Lambda
- AWS: Security of the cloud
    - AWS Cloud 에서 제공되는 하드웨어, 소프트웨어, 네트워킹 및 시설 등 모든 인프라를 보호할 책임
    - AWS is responsible for `OS installations` when a company hosts its DB on EC2 instances
- AWS & Customer shared responsibility
    - Patch management
    - Cloud awareness and training

## Domain 3:  Cloud Technology and Services (34%)
---
### AWS Global Infrastructure
- AWS Region
    - When selecting a Region, consider the following 4 business factors
        - Compliance with data governance and legal requirements
        - Proximity to your customers
        - Available services within a Region
        - Pricing
- Availability Zone
    - A single data center or a group of data centers within a Region
- AWS Local Zones
    - AWS infrastructure deployment that places AWS services closer to large population, industry, and IT centers where no AWS Region exists today
    - Are connected to the parent AWS Region via Amazon's private network that provide fast, secure, and seamless access to other AWS services
- Edge Location
    - A site that Amazon CloudFront uses to store cached copies of your content closer to your customers for faster delivery
    - Also runs Route 53
- AWS Wavelength
    - Enables customers to use AWS services at the edge of the 5G network

### Ways to interact with AWS services
- AWS Management Console
- AWS CLI, AWS SDKs, AWS API
    - allows users to connect with and deploy AWS services programmatically
    - 프로그래밍 방식으로 액세스하려면 AWS 사용자에게 할당할 수 있는 액세스 키 ID와 비밀 액세스 키가 필요합니다.

## Domain 4: Billing, Pricing, and Support (12%)
---
### AWS Support Plans
- Require AWS account root user credentials to change the AWS support plan

- Basic (Free)
    - 24/7 Customer Service
    - Documentation
    - Whitepapers
    - Support forums
    - AWS Trusted Advisor
    - AWS Personal Health Dashboard
- Developer (Charged)
    - `Email access` to customer support
- Business (Charged)
    - `AWS Trusted Advisor` provides full set of best practice checks
    - Direct `phone access` to cloud support engineers
    - Infrastructure event management
- Enterprise(On-Ramp) (Charged)
    - 15(or 30) min response time for business critical workloads
    - Designated(or Access to a pool of) Techincal Account Managers (TAMs)
    - Support of third-party software integration to AWS
    - Concierge Support team provide a primary point of contact for AWS Billing and AWS Support

- AWS Infrastructure Event Management (IEM)
    - Provide guidance about how the company should scale its architecture and operational support during the event

## In-scope AWS services and features
---
### Compute
- Amazon EC2
    - 서버를 Application 수요에 따라 탄력적으로 확장 가능
    - DR 을 위한 2가지 feature: AMIs, EBS snapshots
    - Advantages
        - Integration with VPC, CloudTrail, IAM
        - Flexible, pay-as-you-go pricing model
    - Amazon EC2 Pricing
        - On-Demand: You pay for only the compute time you use
        - Reserved Instances: 1-year or 3-year term
            - Standard: Fixed EC2 type & Region
            - Convertible: Unfixed EC2 type & Region
        - EC2 Instance Savings Plans
            - Provides a discount when you make an hourly spend commitment to an instance family and Region for a 1-year or 3-year term
        - Spot Instances
            - Use unused Amazon EC2 computing capacity and offer you cost savings at up to 90% off of On-Demand prices
        - Dedicated Hosts
            - Physical servers with Amazon EC2 instance capacity that is fully dedicated to your use
    - Amazon Elastic Block Store (EBS)
        - A service that provides `block-level` storage volumes that you can use with Amazon EC2 instances
        - AZ level resource
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
    - Eliminates the need to provision and manage the container hosts
- Amazon Elastic Kubernetes Service (EKS)
    - A fully managed service that you can use to run Kubernetes on AWS
- AWS Fargate
    -  A serverless compute engine for containers that works with both Amazon ECS and Amazon EKS

### Storage
- Amazon S3
    - A service that provides object-level storage
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
    - A scalable file storage service that provides shared file storage for multiple Amazon EC2 instances
    - Allows you to handle data that changes frequently and enables multiple users to access and modify the data simultaneously
    - Multiple instances reading and writing simultaneously
    - Linux file system
    - Regional resource
    - Automatically scales
- Amazon FSx
- Amazon S3 Glacier
    - S3 와 같은 내구성, 성능 및 가용성
    - 아카이빙, 장기간 백업 및 오래된 로그 데이터 보관 용도
    - 파일을 로드할 때 비용 발생
    - 다른 S3 와 비교해서 제일 저렴
- AWS Storage Gateway
    - To extend the on-premise data storage capacity to the AWS Cloud
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
        - Continuously backs up your data to Amazon S3
- Amazon ElastiCache
    - A service that adds caching layers on top of your databases to help improve the read times of common requests
    - Supports two types of data stores: Redis and Memcached
- Amazon Neptune
    - A graph database service that work with highly connected datasets, such as recommendation engines, fraud detection, and knowledge graphs
- Amazon Quantum Ledger Database (QLDB)
    - A ledger database service that can be used to review a complete history of all the changes that have been made to your application data
- Amazon DocumentDB
    - A document database service that supports MongoDB workloads
- Amazon DynamoDB
    - A fully managed serverless NoSQL database service that replicates data automatically across three Availability Zones in a single region to ensure high availability and durability
    - Amazon DynamoDB Accelerator (DAX)
        - An in-memory cache for DynamoDB that helps improve response times from single-digit milliseconds to microseconds
- Amazon MemoryDB for Redis

### Migration & Transfer
- AWS Migration Hub
    - Migration Hub는 애플리케이션 마이그레이션을 계획하고 추적하는 데 도움이 되는 서비스입니다.
- AWS Application Migration Service
    - AWS MGN은 자동화된 리프트 앤 시프트 솔루션입니다. 이 솔루션은 물리적 서버와 해당 서버에서 실행되는 모든 데이터베이스 또는 애플리케이션을 AWS의 EC2 인스턴스로 마이그레이션할 수 있습니다.
- AWS Application Discovery Service
    - Application Discovery Service는 온프레미스 서버의 사용 및 구성에 대한 정보를 수집하여 AWS로의 마이그레이션을 계획하는 데 도움이 됩니다.
- AWS Database Migration Service (DMS)
    - Enables you to migrate relational databases, nonrelational databases, and other types of data stores
    - Other use cases
        - Development and test database migrations
        - Database consolidation
        - Continuous replication
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
    - 사용자의 AWS 계정 전용 가상 네트워크
    - S3, DynamoDB 같은 곳은 다이렉트 접근 불가, 인터넷 GW 를 통해 접근 가능
    - AWS Client VPN
        - Client VPN은 AWS 리소스와 온프레미스 네트워크의 리소스에 안전하게 액세스할 수 있는 기능을 제공하는 관리형 클라이언트 기반 VPN 서비스입니다. Client VPN을 사용하면 OpenVPN 기반 VPN 클라이언트를 통해 어느 위치에서나 리소스에 액세스할 수 있습니다. Client VPN을 사용하면 전체 데이터 센터가 아닌 개별 랩톱을 AWS에 연결할 수 있습니다.
    - AWS Site-to-Site VPN
        - Site-to-Site VPN은 온프레미스 네트워크와 AWS 클라우드 네트워크 간에 암호화된 네트워크 경로를 생성합니다. 이 연결은 인터넷을 사용하므로 일관성을 기대할 수 없습니다. 트래픽이 암호화되더라도 인터넷은 공유 리소스이므로 연결은 비공개가 아닙니다.
        - Site-to-Site VPN은 온프레미스 네트워크와 AWS 클라우드 네트워크 간에 암호화된 네트워크 경로를 생성합니다. 온프레미스 네트워크와 AWS 클라우드 네트워크 간의 이러한 연결은 인터넷을 사용합니다.
        - Virtual Private GW & Customer GW
    - Network ACLs
        - A `Stateless` virtual firewall that controls inbound and outbound traffic at the subnet level
        - Process rules in order, starting with the lowest numbered rule, when deciding whether to allow traffic
        - Default network ACL allows all inbound and outbound traffic
    - Security Groups
        - A `Stateful` virtual firewall that controls inbound and outbound traffic for an Amazon EC2 instance
        - By default, a security group denies all inbound traffic and allows all outbound traffic
    - VPC Peering
        - To establish a connection between `2 VPCs`
    - Transit Gateway
        - To connect and centrally manage network connectivity between `multiple VPCs` in several AWS Regions around the world
    - Network Firewall
    - VPC Flow Logs
        - To capture information about inbound and outbound traffic in an Amazon VPC
    - Gateway VPC endpoints provide reliable connectivity to Amazon S3 and DynamoDB without requiring an internet gateway or a NAT device for your VPC
    - Virtual Private Gateway
        - Allows protected internet traffic to enter into the VPC
        - Enables you to establish a VPN connection between your VPC and a private network
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
    - On-premise 에서 AWS 로 전용 네트워크 연결
    - Direct Connect는 표준 이더넷 광케이블을 통해 내부 네트워크를 Direct Connect 위치에 연결합니다. 케이블의 한쪽 끝을 라우터에 연결합니다. 케이블의 다른 쪽 끝은 Direct Connect 라우터에 연결합니다. AWS Direct Connect는 귀 회사가 케이블의 유일한 사용자이므로 일관되고 비공개로 유지됩니다.
    - Direct Connect는 네트워크 연결을 통해 내부 네트워크를 Direct Connect 위치에 연결합니다. 연결의 한쪽 끝이 온프레미스 라우터에 연결됩니다. 다른 쪽 끝은 Direct Connect 라우터에 연결됩니다. 이 연결을 통해 네트워크 경로의 ISP를 우회할 수 있습니다. 하지만 이 시나리오에서 회사는 기존 인터넷 연결을 사용해야 합니다.
    - To create a private connection between an on-premises workload and an AWS Cloud workload
- AWS Global Accelerator
    - 사용자의 네트워크 트래픽 성능을 최대 60% 향상시키는 네트워킹 서비스
    - AWS 글로벌 네트워크 인프라를 사용
    - To improve the overall availability and performance of its applications that are hosted on AWS
    - To route requests for key resources through Amazon's global network
    - Request is initially routed to the closest edge location and then travels through Amazon's network

### Developer Tools
- AWS CodeStar
- AWS CodeCommit
    - 소스 코드 버전 제어 서비스입니다. CodeCommit은 사용자가 개발자의 소스 코드를 AWS에 저장하고 관리할 수 있도록 도와줍니다.
- AWS CodeBuild
    - 사용자가 소스 코드를 자동으로 컴파일하고, 단위 테스트를 실행하고, 배포 준비가 된 소프트웨어 패키지를 생성할 수 있도록 도와주는 서비스
- AWS CodeDeploy
- AWS CodePipeline
    - 개별 서비스 간의 코드 이동을 관리하는 서비스
- AWS Cloud9
- AWS CloudShell
    - AWS CLI 커맨드로 리소스에 액세스할 수 있음
- AWS X-Ray
    - To `trace` user requests as they move through the application's components
- AWS CodeArtifact
    - 배포 준비가 된 소프트웨어를 저장하고 공유하는 관리형 아티팩트 리포지토리 서비스
- AWS AppConfig

### Customer Enablement
- AWS IQ
- AWS Managed Services (AMS)
- AWS Activate for Startups
- AWS Support

### Blockchain
- Amazon Managed Blockchain
    - A service that you can use to create and manage blockchain networks with open-source frameworks

### Management & Governance
- AWS Organizations
    - A central location to manage multiple AWS accounts
    - Consolidated Billing
        - To receive a single bill for all AWS accounts in the organization
    - Organizational Units (OUs)
        - Hierarchical groupings of accounts to meet security, compliance, or budgetary needs
    - Service Control Policies (SCPs)
        - To place restrictions on the AWS services, resources, and individual API actions that users and roles in each `account` can access
        - Can be applied to individual member accounts and OUs
    - 각 부서별 계정이 여러개라면 Tag 를 활용해 통합된 결제 가능
- Amazon CloudWatch
    - A web service that enables you to `monitor and manage various metrics` and configure alarm actions based on data from those metrics
    - CloudWatch Alarms
        - Can create alarms(opens in a new tab) that automatically perform actions if the value of your metric has gone above or below a predefined threshold
    - CloudWatch Dashboard
        - Enables you to access all the metrics for your resources from a single location
- AWS Auto Scaling
    - 수요에 따른 EC2 자동 확장 및 축소를 통한 고가용성 확보
- AWS CloudFormation
    - Formation 정보
    - 서비스 구성을 모델링 가능하게 해주고 맘에 들면 코드로 배포 가능
    - 사용자가 리소스 프로비저닝 프로세스를 자동화하여 IaC 를 배포할 수 있는 서비스
    - To deploy a service to the AWS Cloud by using infrastructure-as-code (IaC) principles
- AWS Config
    - 감사용 / AWS 리소스 변경 사항 확인용
    - AWS 리소스의 설정을 정기적으로 감사 및 평가, 비준수 계정 식별, 리소스 변경 시 알림
    - AWS Config는 AWS 리소스에 대한 변경 사항을 지속적으로 모니터링하고 기록하지만 무제한 액세스를 허용하는 보안 그룹은 식별하지 않습니다.
    - AWS Config를 사용하여 AWS 리소스 구성을 측정, 감사 및 평가할 수 있습니다. AWS Config는 AWS 계정 루트 사용자와 관련된 콘솔 로그인 이벤트에 대해 알림을 보낼 수 없습니다.
- AWS Service Catalog
    - To limit its employees' AWS access to a portfolio of predefined AWS resources
- AWS Systems Manager
    - Session Manager
        - Allows you to start interactive sessions with your instances directly from the AWS Management Console or through the AWS CLI
        - It provides secure and auditable access to instances without the need to open inbound SSH ports and managing SSH keys
- AWS Trusted Advisor
    - A web service that `inspects your AWS environment and provides real-time recommendations` in accordance with AWS best practices in 5 categories
        - Cost Optimization
        - Performance
        - Security
        - Fault Tolerance
        - Service Limits
- AWS Control Tower
- AWS License Manager
- AWS Well-Architected Tool
- AWS Health Dashboard
- AWS Launch Wizard
- AWS Compute Optimizer
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
    - 표준 SQL 을 사용하여 S3 에서 직접 데이터를 쉽게 분석할 수 있는 대화형 쿼리 서비스
- Amazon Redshift
    - A petabyte-scale data warehousing service
- Amazon OpenSearch Service
- Amazon Kinesis
    - 실시간으로 비디오 및 데이터 스트림을 수집, 처리 및 분석
- Amazon QuickSight
    - 비지니스 인텔리전스 솔루션 구축 중 보고 목적으로 대시 보드 사용 시 필요한 서비스
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
    - 임시 권한
    - To implement identity management for a fleet of mobile apps that are running in the AWS Cloud
- AWS Secrets Manager
    - Secrets Manager는 애플리케이션, 서비스, IT 리소스에 액세스하는 데 필요한 보안을 지키도록 도와줍니다.
- Amazon GuardDuty
    - A service that provides intelligent `threat detection` for your AWS infrastructure and resources
- Amazon Inspector
    - A service that checks applications for security vulnerabilities and deviations from security best practices
    - Helps to improve the security and compliance of applications by running `automated security assessments`
- Amazon Macie
    - PII 와 같은 민감한 데이터를 식별하고 경고해주는 서비스
    - Macie는 AWS에 배포된 애플리케이션의 보안 및 규정 준수를 개선하는 데 도움이 되는 자동 보안 평가 서비스입니다.
    - Uses machine learning to help `discover, monitor, and protect sensitive data` that is stored in Amazon S3 buckets
- AWS IAM Identity Center
- AWS Certificate Manager
- AWS Key Management Service (KMS)
    - Enables you to perform encryption operations through the use of cryptographic keys for both `encryption at rest` and `encryption in transit`
- AWS CloudHSM
- AWS Directory Service
- AWS WAF & Shield
    - Filter traffic in edge locations
    - AWS WAF
        - A web application firewall that lets you monitor network requests that come into your web applications
        - Works together with Amazon CloudFront and an Application Load Balancer
        - SQL Injection, XSS protection
    - AWS Shield
        - DDoS protection
- AWS Firewall Manager
- AWS Artifact
    - A service that provides on-demand access to AWS security and `compliance` reports and select online agreements
    - Provides AWS ISO certifications
- Amazon Detective
- AWS Security Hub
- AWS Audit Manager
- AWS Identity and Access Management (IAM)
    - Enables you to manage access to AWS services and resources securely
    - AWS account root user
        - The first sign-in identity that is available when an AWS account is created
    - IAM Users
        - An identity that you create in AWS
        - By default, it has no permissions associated with it
    - IAM Policies
        - A document that allows or denies permissions to AWS services and resources
        - Follow the security principle of `least privilege` when granting permissions
    - IAM Groups
        - A collection of IAM users
    - IAM Roles
        - An identity that you can assume to gain temporary access to permissions
        - Ideal for situations in which access to services or resources needs to be granted temporarily, instead of long-term
    - IAM Access Analyzer
        - Identifies whether an Amazon S3 bucket or an IAM role has been shared with an external entity
        - Checks access policies and offers actionable recommendations to help users set secure and functional policies

### Cloud Financial Management
- AWS Marketplace Subscriptions
    - A digital catalog that includes thousands of software listings from independent software vendors such as AWS WAF - Fortinet OWASP Top 10
- AWS Billing Conductor
- AWS Billing and Cost Management
    - Cost Explorer
        - A tool that lets you visualize, understand, and manage your AWS costs and usage over time
        - Reserved Instances 공유를 위해 AWS 계정을 관리하는 곳
    - Cost Allocation Tags
        - To determine which business unit is using specific AWS resources
    - Budgets
        - To plan your service usage, service costs, and instance reservations
        - Alerts when your usage exceeds (or is forecasted to exceed) the budgeted amount
    - Cost and Usage Report

### Front-end Web & Mobile
- AWS Amplify
- AWS AppSync
- AWS Device Farm

### Application Integration
- AWS Step Functions
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
    - Amazon Connect는 옴니채널 클라우드 고객 센터로, 저렴한 비용으로 우수한 고객 서비스를 제공할 수 있도록 지원합니다. Amazon Connect는 고객과 에이전트에게 음성 및 채팅 전반에서 원활한 경험을 제공합니다. Amazon Connect는 온프레미스 네트워크를 AWS에 연결하는 서비스가 아닙니다.
    - Amazon Connect는 옴니채널 클라우드 고객 센터입니다. Amazon Connect를 사용하면 저렴한 비용으로 고객 서비스를 제공하는 데 도움이 됩니다. Amazon Connect는 옴니채널 설계를 사용하여 고객과 에이전트에게 음성 및 채팅 전반에서 원활한 경험을 제공합니다. Amazon Connect는 네트워크 연결을 제공하지 않습니다.
- Amazon Simple Email Service (SES)

### End User Computing
- Amazon WorkSpaces
    - Virtual Windows desktop
- Amazon AppStream 2.0
- Amazon WorkSpaces Web

### Internet of Things
- AWS IoT Greengrass
- AWS IoT Core
