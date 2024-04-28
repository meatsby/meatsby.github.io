---
title: AWS Certified Solutions Architect Associate (SAA-C03)
date: 2024-04-26 22:34:49 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Overview
---
### AWS Regions
- Region 이란 Cluster of Data Centers
	- `us-east1`, `eu-west-3`, `ap-east-1`, ...
- 대부분의 AWS Services 는 특정 Region 에 국한됨
- Region 을 선택할 때 고려할 사항
	- Compliance: Data 가 특정 지역을 벗어나면 안 될 경우
	- Proximity: 가까운 Region 일수록 Latency 가 낮음
	- Available Services: 모든 Region 이 모든 Service 를 지원하지 않음
	- Pricing: Region 마다 요금이 다를 수 있음

### AWS Availability Zones
- 각 Region 은 보통 3개에서 많게는 6개의 AZs 를 가지고 있음
	- `ap-east-1a`, `ap-east-1b`, `ap-east-1c`
- 각 AZ 는 여분의 전원, 네트워킹, 통신 기능을 갖춘 1개 이상의 데이터 센터로 이루어져 있음
	- 정확한 숫자는 AWS 가 공개하지 않음
- 재난에 대비해 서로 분리되어 있는 것
- 각 AZ 들은 High bandwidth 와 Ultra-low latency networking 으로 연결되어 Region 을 형성

### AWS Points of Presence (Edge Locations)
- AWS 는 400개 이상의 Points of Presence (400+ Edge Locations & 10+ Regional Caches) 을 40여 국가의 90개 이상의 도시에 가지고 있음
- 이를 통해 low latency 로 end user 에게 컨텐츠를 전달할 수 있음

### AWS Services
- Global Services
	- IAM
	- R53 (DNS)
	- CloudFront (CDN)
	- WAF
- Regional Services
	- EC2 (IaaS)
	- EB (PaaS)
	- Lambda (FaaS)
	- Rekognition (SaaS)

## Domain 1: Design Secure Architectures (30%)
---
### 1.1: Design secure access to AWS resources

### 1.2: Design secure workloads and applications

### 1.3: Determine appropriate data security controls

## Domain 2: Design Resilient Architectures (26%)
---
### 2.1: Design scalable and loosely coupled architectures

### 2.2: Design highly available and/or fault-tolerant architectures

## Domain 3: Design High-Performing Architectures (24%)
---
### 3.1: Determine high-performing and/or scalable storage solutions

### 3.2: Design high-performing and elastic compute solutions

### 3.3: Determine high-performing database solutions

### 3.4: Determine high-performing and/or scalable network architectures

### 3.5: Determine high-performing data ingestion and transformation solutions

## Domain 4: Design Cost-Optimized Architectures (20%)
---
### 4.1: Design cost-optimized storage solutions

### 4.2: Design cost-optimized compute solutions

### 4.3: Design cost-optimized database solutions

### 4.4: Design cost-optimized network architectures

## References
---
- 
