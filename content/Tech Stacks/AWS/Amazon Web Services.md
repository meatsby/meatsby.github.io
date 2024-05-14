## Compute
- ⭐️ [[Amazon EC2]]
- Amazon Lightsail
    - AWS 에서 가상 프라이빗 서버를 시작하고 관리할 때 사용 가능한 가장 간편한 방법
- ⭐️ [[AWS Lambda]]
- AWS Batch
    - 코어가 많이 필요한 배치 컴퓨팅 작업을 효율적으로 실행 가능
- [[AWS Elastic Beanstalk]]
- AWS Serverless Application Repository
- AWS Outposts
- EC2 Image Builder
- AWS App Runner
- AWS SimSpace Weaver

## Containers
- Amazon Elastic Container Registry (ECR)
    - Docker Container Image 를 저장, 관리 및 배포할 수 있는 Registry
    - AWS IAM 과 통합하여 각 Repository 를 리소스 수준에서 제어 가능
    - 선수금이나 약정 없이 저장한 데이터와 인터넷으로 전송한 데이터에 대한 요금만 지불
- Amazon Elastic Container Service (ECS)
    - Docker Container 를 지원하는 Container 관리 서비스
    - 클러스터 관리 인프라 설치, 운영 및 확장
    - Eliminates the need to provision and manage the container hosts
- Amazon Elastic Kubernetes Service (EKS)
- Red Hat OpenShift Service on AWS

## Storage
- ⭐️ [[Amazon S3]]
- ⭐️ Amazon Elastic File System (EFS)
    - 네트워크 파일 시스템, 한 지역에서 수백 개의 인스턴스에 연결 가능
    - Linux 기반 AWS 및 On-premise 서버와 함께 사용 가능한 간단하고 확장성 있는 공유 파일 스토리지 솔루션
- [[Amazon FSx]]
- [[AWS Storage Gateway]]
- AWS Backup
- AWS Elastic Disaster Recovery

## Database
- ⭐️ [[Amazon RDS]]
- [[Amazon ElastiCache]]
- ⭐️ Amazon Neptune
    - Cloud 용으로 구축된 빠르고 안정적인 그래프 DB
- Amazon QLDB
- Amazon DocumentDB
    - NoSQL DB Service
- Amazon Keyspaces
- Amazon Timestream
- ⭐️ [[Amazon DynamoDB]]
- Amazon MemoryDB for Redis

## Migration & Transfer
- AWS Migration Hub
    - Migration Hub는 애플리케이션 마이그레이션을 계획하고 추적하는 데 도움이 되는 서비스입니다.
- AWS Application Migration Service
    - AWS MGN은 자동화된 리프트 앤 시프트 솔루션입니다. 이 솔루션은 물리적 서버와 해당 서버에서 실행되는 모든 데이터베이스 또는 애플리케이션을 AWS의 EC2 인스턴스로 마이그레이션할 수 있습니다.
- AWS Application Discovery Service
    - Application Discovery Service는 온프레미스 서버의 사용 및 구성에 대한 정보를 수집하여 AWS로의 마이그레이션을 계획하는 데 도움이 됩니다.
- AWS Database Migration Service
    - AWS DMS를 사용하면 온프레미스 데이터베이스에서 AWS의 데이터베이스로 데이터를 마이그레이션할 수 있습니다.
- [[AWS Transfer Family]]
- [[AWS Snow Family]]
- [[AWS DataSync]]
- AWS Mainframe Modernization

## Networking & Content Delivery
- ⭐️ Amazon VPC
    - 사용자의 AWS 계정 전용 가상 네트워크
    - S3, DynamoDB 같은 곳은 다이렉트 접근 불가, 인터넷 GW 를 통해 접근 가능
    - AWS Client VPN
        - Client VPN은 AWS 리소스와 온프레미스 네트워크의 리소스에 안전하게 액세스할 수 있는 기능을 제공하는 관리형 클라이언트 기반 VPN 서비스입니다. Client VPN을 사용하면 OpenVPN 기반 VPN 클라이언트를 통해 어느 위치에서나 리소스에 액세스할 수 있습니다. Client VPN을 사용하면 전체 데이터 센터가 아닌 개별 랩톱을 AWS에 연결할 수 있습니다.
    - AWS Site-to-Site VPN
        - Site-to-Site VPN은 온프레미스 네트워크와 AWS 클라우드 네트워크 간에 암호화된 네트워크 경로를 생성합니다. 이 연결은 인터넷을 사용하므로 일관성을 기대할 수 없습니다. 트래픽이 암호화되더라도 인터넷은 공유 리소스이므로 연결은 비공개가 아닙니다.
        - Site-to-Site VPN은 온프레미스 네트워크와 AWS 클라우드 네트워크 간에 암호화된 네트워크 경로를 생성합니다. 온프레미스 네트워크와 AWS 클라우드 네트워크 간의 이러한 연결은 인터넷을 사용합니다.
        - Virtual Private GW & Customer GW
    - Network ACLs
        - `Stateless`
        - Process rules in order, starting with the lowest numbered rule, when deciding whether to allow traffic
    - ⭐️ Security Groups
        - EC2 인스턴스에 대한 가상 방화벽 역할
        - ACL 과 함께 VPC 내의 보안을 강화하기 위한 기능
        - ACL 과 다르게 `Stateful` 방화벽으로 동작
        - Acts as a firewall for EC2 instance
    - VPC Peering
        - To establish a connection between 2 VPCs
    - Transit Gateway
        - To connect and centrally manage network connectivity between multiple VPCs in several AWS Regions around the world
- ⭐️ [[Amazon CloudFront]]
- ⭐️ [[Amazon Route 53]]
- Amazon API Gateway
- ⭐️ AWS Direct Connect
    - On-premise 에서 AWS 로 전용 네트워크 연결
    - Direct Connect는 표준 이더넷 광케이블을 통해 내부 네트워크를 Direct Connect 위치에 연결합니다. 케이블의 한쪽 끝을 라우터에 연결합니다. 케이블의 다른 쪽 끝은 Direct Connect 라우터에 연결합니다. AWS Direct Connect는 귀 회사가 케이블의 유일한 사용자이므로 일관되고 비공개로 유지됩니다.
    - Direct Connect는 네트워크 연결을 통해 내부 네트워크를 Direct Connect 위치에 연결합니다. 연결의 한쪽 끝이 온프레미스 라우터에 연결됩니다. 다른 쪽 끝은 Direct Connect 라우터에 연결됩니다. 이 연결을 통해 네트워크 경로의 ISP를 우회할 수 있습니다. 하지만 이 시나리오에서 회사는 기존 인터넷 연결을 사용해야 합니다.
    - To create a private connection between an on-premises workload and an AWS Cloud workload
- AWS App Mesh
- ⭐️ [[AWS Global Accelerator]]
- AWS Cloud Map
- Amazon Route 53 Application Recovery Controller
- AWS Private 5G

## Developer Tools
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
    - AWS Console 에서 Credentials 없이 로그인된 User 를 바탕으로 CLI 를 실행할 수 있는 터미널
- AWS X-Ray
- AWS FIS
- AWS CodeArtifact
    - 배포 준비가 된 소프트웨어를 저장하고 공유하는 관리형 아티팩트 리포지토리 서비스
- Amazon CodeCatalyst
- AWS AppConfig
- Amazon CodeWhisperer
- AWS Application Composer

## Customer Enablement
- AWS IQ
- Managed Services
- Activate for Startups
- Support
- AWS re:Post Private

## Robotics
- AWS RoboMaker

## Blockchain
- Amazon Managed Blockchain

## Satellite
- Ground Station

## Quantum Technologies
- Amazon Braket

## Management & Governance
- ⭐️ AWS Organizations
    - 각 부서별 계정이 여러개라면 Tag 를 활용해 통합된 결제 가능
    - 고객이 여러 AWS 계정을 통합하고 중앙에서 관리하려면 필요한 서비스
    - Organizations는 여러 계정을 포함하여 AWS 환경에 대한 중앙 집중식 거버넌스와 결제를 제공합니다.
    - Service Control Policies (SCPs)
        - To limit the access to AWS services for member accounts
    - Organizational Units (OUs)
- ⭐️ Amazon CloudWatch
    - AWS Management Console 로그인 이벤트에 대한 경고를 모니터링하고 수신
    - CloudWatch는 AWS 리소스에 대한 지표를 수집하고 추적하는 모니터링 서비스이고, 무제한 액세스를 허용하는 보안 그룹은 식별하지 않습니다.
    - CloudWatch는 실시간으로 AWS에서 실행되는 애플리케이션 및 AWS 리소스를 모니터링합니다. CloudWatch와 AWS CloudTrail을 사용하여 AWS 계정 루트 사용자와 관련된 콘솔 로그인 이벤트를 모니터링하고 이에 대한 알림을 받을 수 있습니다.
    - To monitor Amazon EC2 instances for CPU and network utilization
- ⭐️ AWS Auto Scaling
    - 수요에 따른 EC2 자동 확장 및 축소를 통한 고가용성 확보
- ⭐️ AWS CloudFormation
    - Formation 정보
    - 서비스 구성을 모델링 가능하게 해주고 맘에 들면 코드로 배포 가능
    - 사용자가 리소스 프로비저닝 프로세스를 자동화하여 IaC 를 배포할 수 있는 서비스
    - To deploy a service to the AWS Cloud by using infrastructure-as-code (IaC) principles
- ⭐️ AWS Config
    - 감사용 / AWS 리소스 변경 사항 확인용
    - AWS 리소스의 설정을 정기적으로 감사 및 평가, 비준수 계정 식별, 리소스 변경 시 알림
    - AWS Config는 AWS 리소스에 대한 변경 사항을 지속적으로 모니터링하고 기록하지만 무제한 액세스를 허용하는 보안 그룹은 식별하지 않습니다.
    - AWS Config를 사용하여 AWS 리소스 구성을 측정, 감사 및 평가할 수 있습니다. AWS Config는 AWS 계정 루트 사용자와 관련된 콘솔 로그인 이벤트에 대해 알림을 보낼 수 없습니다.
- AWS OpsWorks
- AWS Service Catalog
    - To limit its employees' AWS access to a portfolio of predefined AWS resources
- AWS Systems Manager
- ⭐️ AWS Trusted Advisor
    - AWS 계정을 분석하고 비용 최적화, 성능, 보안, 내결함성 등 권장 사항을 제공
    - Trusted Advisor는 리소스에 대한 무제한 액세스를 허용하는 규칙에 대해 보안 그룹을 확인합니다. 무제한 액세스로 인해 해킹, 서비스 거부 공격 또는 데이터 손실과 같은 악의적인 활동의 기회가 증가합니다.
    - AWS 모범 사례에 따라 리소스를 프로비저닝하는 데 도움이 되도록 실시간 지침에 Trusted Advisor를 사용할 수 있습니다. Trusted Advisor는 AWS 계정 루트 사용자와 관련된 콘솔 로그인 이벤트에 대해 알림을 보낼 수 없습니다.
- AWS Control Tower
- AWS License Manager
- AWS Well-Architected Tool
- AWS Health Dashboard
- AWS Chatbot
- AWS Launch Wizard
- AWS Compute Optimizer
- AWS Resource Groups & Tag Editor
- Amazon Grafana
- Amazon Prometheus
- AWS Resilience Hub
- AWS Incident Manager
- AWS Service Quotas
    - use to centrally request and track service limit increases
- AWS Proton
- ⭐️ AWS CloudTrail
    - 계정 활동 기록 서비스
    - CloudTrail은 API 호출에 대한 감사 레코드를 제공하고, 무제한 액세스를 허용하는 보안 그룹은 식별하지 않습니다.
    - To see if the security group was changed
- AWS Resource Explorer
- AWS User Notifications
- AWS Telco Network Builder

## Media Services
- Kinesis Video Streams
- MediaConvert
- MediaLive
- MediaPackage
- MediaStore
- MediaTailor
- Elemental Appliances & Software
- Elastic Transcoder
- Nimble Studio
- MediaConnect
- Amazon Interactive Video Service

## Machine Learning
- Amazon SageMaker
- Amazon Augmented AI
- Amazon CodeGuru
- Amazon DevOps Guru
- ⭐️ Amazon Comprehend
    - NLP 에 ML 을 사용하고 싶지만 ML 경험이 없는 사용자를 돕기 위한 서비스
- Amazon Forecast
- Amazon Fraud Detector
- Amazon Kendra
- Amazon Personalize
- Amazon Polly
    - Text -> 음성 변환 서비스
    - Amazon Polly는 텍스트를 음성으로 변환하는 기계 학습 서비스입니다. 이 서비스는 텍스트를 소리내어 읽을 수 있는 기능을 제공합니다.
- ⭐️ Amazon Rekognition
    - 이미지, 비디오 분석 서비스
    - 사진에 나타나는 객체를 자동으로 감지
- Amazon Textract
    - Amazon Textract는 스캔한 문서에서 텍스트를 추출할 수 있는 기계 학습 서비스입니다.
- Amazon Transcribe
    - Amazon Transcribe는 기계 학습을 사용하여 오디오 데이터를 텍스트로 변환하는 서비스입니다.
- Amazon Translate
    - Amazon Translate는 기계 학습 언어 번역 서비스입니다.
- AWS DeepComposer
- AWS DeepLens
- AWS DeepRacer
- AWS Panorama
- Amazon Monitron
- AWS HealthLake
- Amazon Lookout for Vision
- Amazon Lookout for Equipment
- Amazon Lookout for Metrics
- Amazon Lex
    - 대화형 챗봇 서비스
- Amazon Comprehend Medical
- AWS HealthOmics
- Amazon Bedrock
- AWS HealthImaging
- Amazon Q

## Analytics
- ⭐️ Amazon Athena
    - 표준 SQL 을 사용하여 S3 에서 직접 데이터를 쉽게 분석할 수 있는 대화형 쿼리 서비스
- ⭐️ Amazon Redshift
    - Cloud 에서 완벽하게 관리되는 페타바이트급 데이터 웨어하우스 서비스
- Amazon CloudSearch
- ⭐️ Amazon OpenSearch Service
- ⭐️ Amazon Kinesis
    - 실시간으로 비디오 및 데이터 스트림을 수집, 처리 및 분석
- ⭐️ Amazon QuickSight
    - 비지니스 인텔리전스 솔루션 구축 중 보고 목적으로 대시 보드 사용 시 필요한 서비스
    - Supports the creation of `visual` reports from AWS Cost and Usage Report data
- Amazon Data Pipeline
- ⭐️ AWS Data Exchange
- AWS Lake Formation
- ⭐️ Amazon Managed Streaming for Apache Kafka (MSK)
- AWS Glue DataBrew
- Amazon FinSpace
- ⭐️ AWS Glue
- Amazon Kinesis Data Firehose
- ⭐️ Amazon Elastic MapReduce (EMR)
    - 방대한 양의 데이터를 처리하기 위한 클라우드 빅 데이터 플랫폼
    - Elastic MapReduce: 분산 처리 후 합치는 과정을 MapReduce 라고 함
    - EC2 에서 대량의 데이터를 쉽고 빠르게 비용 효율적으로 처리할 수 있는 AWS 관리형 Hadoop 프레임워크
- AWS Clean Rooms
- Amazon DataZone
- AWS Entity Resolution
- Amazon Managed Apache Flink

## Security, Identity, & Compliance
- AWS Resource Access Manager
- Amazon Cognito
- AWS Secrets Manager
    - Secrets Manager는 애플리케이션, 서비스, IT 리소스에 액세스하는 데 필요한 보안을 지키도록 도와줍니다.
- Amazon GuardDuty
    - GuardDuty는 악성 활동 및 무단 행위를 지속적으로 모니터링하여 AWS 계정 및 워크로드를 보호하는 위협 탐지 서비스로입니다.
    -Threat detection service
- Amazon Inspector
    - AWS 에 배포된 Application 의 자동화된 보안평가 서비스
    - Amazon Inspector는 Amazon EC2 인스턴스에 배포된 애플리케이션의 보안 및 규정 준수를 개선하는 데 도움이 되는 자동화된 보안 평가 서비스입니다.
- ⭐️ Amazon Macie
    - PII 와 같은 민감한 데이터를 식별하고 경고해주는 서비스
    - Macie는 AWS에 배포된 애플리케이션의 보안 및 규정 준수를 개선하는 데 도움이 되는 자동 보안 평가 서비스입니다.
    - Uses machine learning to help discover, monitor, and protect sensitive data that is stored in Amazon S3 buckets
- AWS IAM Identity Center
- AWS Certificate Manager
- ⭐️ AWS Key Management Service (KMS)
    - 데이터 암호화에 사용되는 고객 마스터 키 CMK 를 쉽게 생성 및 제어할 수 있는 서비스
- AWS CloudHSM
- AWS Directory Service
- ⭐️ AWS WAF & Shield
    - ⭐️ AWS WAF
        - SQL Injection, XSS
    - ⭐️ AWS Shield
        - DDoS 방어
- AWS Firewall Manager
- ⭐️ AWS Artifact
    - 규정 준수와 관련된 정보를 제공하는 신뢰할 수 있는 중앙 리소스
    - provides AWS ISO certifications
- Amazon Detective
- AWS Signer
- AWS Private Certificate Authority
- AWS Security Hub
- AWS Audit Manager
- Amazon Security Lake
- Amazon Verified Permissions
- ⭐️ AWS Identity and Access Management (IAM)
    - AWS 서비스 및 리소스에 대한 액세스를 안전하게 관리
    - AWS 사용자 및 그룹을 생성/관리, 권한에 따라 AWS 리소스 액세스 설정 가능
    - IAM을 사용하면 AWS 서비스 및 리소스에 대한 액세스를 안전하게 관리할 수 있습니다. IAM은 AWS 계정 루트 사용자와 관련된 콘솔 로그인 이벤트에 대해 알림을 보낼 수 없습니다.
    - IAM Access Analyzer
        - Identifies whether an Amazon S3 bucket or an IAM role has been shared with an external entity
        - Checks access policies and offers actionable recommendations to help users set secure and functional policies
- AWS Payment Cryptography

## Cloud Financial Management
- ⭐️ AWS Marketplace Subscriptions
    - 리소스에 사용할 소프트웨어를 구입하는 곳
    - AWS WAF - Fortinet OWASP Top 10 등 구매 가능
- AWS Application Cost Profiler
- AWS Billing Conductor
- AWS Billing and Cost Management
    - Cost Explorer
        - Reserved Instances 공유를 위해 AWS 계정을 관리하는 곳
        - To review monthly costs of using EC2 and RDS for the past year
    - Cost Allocation Tags
        - To determine which business unit is using specific AWS resources
    - ⭐️ Budgets
        - 설정된 예산 한계치 도달 시 알림

## Front-end Web & Mobile
- AWS Amplify
- AWS AppSync
- Device Farm
- Amazon Location Service

## Application Integration
- Step Functions
- Amazon AppFlow
- Amazon EventBridge
- Amazon MQ
- Simple Notification Service
- Simple Queue Service
- SWF
- Managed Apache Airflow
- AWS B2B Data Interchange

## Business Applications
- Amazon Connect
    - Amazon Connect는 옴니채널 클라우드 고객 센터로, 저렴한 비용으로 우수한 고객 서비스를 제공할 수 있도록 지원합니다. Amazon Connect는 고객과 에이전트에게 음성 및 채팅 전반에서 원활한 경험을 제공합니다. Amazon Connect는 온프레미스 네트워크를 AWS에 연결하는 서비스가 아닙니다.
    - Amazon Connect는 옴니채널 클라우드 고객 센터입니다. Amazon Connect를 사용하면 저렴한 비용으로 고객 서비스를 제공하는 데 도움이 됩니다. Amazon Connect는 옴니채널 설계를 사용하여 고객과 에이전트에게 음성 및 채팅 전반에서 원활한 경험을 제공합니다. Amazon Connect는 네트워크 연결을 제공하지 않습니다.
- Amazon Honeycode
- Amazon Chime
- Amazon Simple Email Service
- Amazon WorkDocs
- Amazon WorkMail
- AWS Supply Chain
- AWS AppFabric
- AWS Wickr
- Amazon Chime SDK
- Amazon One Enterprise
- Amazon Pinpoint

## End User Computing
- WorkSpaces
- [[Amazon AppStream 2.0]]
- WorkSpaces Web
- WorkSpaces Thin Client

## Internet of Things
- IoT 1-Click
- IoT Analytics
- IoT Device Defender
- IoT Device Management
- IoT Greengrass
- IoT SiteWise
- IoT Core
- IoT Events
- AWS IoT FleetWise
- IoT RoboRunner
- IoT TwinMaker

## Game Development
- Amazon GameLift
