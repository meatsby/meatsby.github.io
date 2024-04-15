---
title: Amazon IAM
date: 2024-03-26 23:16:53 +0800
status: In Progress
draft: false
tags:
  - AWS
  - IAM
---
## IAM (Identity and Access Management) 란
---
- IAM 은 사용자 접근 권한 관리 서비스
- IAM 을 통해 사내 AWS 유저별로 AWS 서비스 및 서비스에 생성된 자원 등에 대한 세분화된 권한 지정 가능
- 최고 관리자가 Root Account 를 관리하고 그 외 유저들은 제한된 권한을 갖는 Account 를 사용하게 됨
- IAM 은 AWS 서비스에 대한 엑세스 권한 설정 뿐만 아니라, 언제 어디서 누가 무엇을 어떻게 할 수 있는지 상세 설정 가능
- 즉, IAM 은 AWS User 및 User Group 을 생성 및 관리하며 AWS Resource 에 대한 엑세스 허용 및 거부 설정

### IAM 의 기능
- IAM User 생성, 관리, 계정의 보안
- AWS 계정에 대한 공유 엑세스
- 세분화된 권한
- MFA 인증
- 글로벌 서비스: AWS 계정은 전세계에서 유니크함

## IAM 의 구성 요소
---
### AWS account root user
- The first sign-in identity that is available when an AWS account is created

### IAM Users
- 실제 AWS 기능과 자원을 이용하는 사용자 또는 애플리케이션
- 사용자 또는 애플리케이션이 AWS 서비스 엑세스를 관리
- An identity that you create in AWS
- By default, it has no permissions associated with it

### IAM User Groups
- A collection of IAM users
- 하나의 그룹에 여러명의 IAM Users 를 지정해 공통으로 권한을 주어야하는 상황에 유용
- 하나의 IAM User 는 최대 10개의 IAM User Group 에 속할 수 있음

### IAM Policies
- A document that allows or denies permissions to AWS services and resources
- Follow the security principle of `least privilege` when granting permissions
- IAM Users, IAM User Groups, IAM Roles 이 무엇을 할 수 있는지에 대한 permission 설정 모음 데이터 문서
- 하나 이상의 AWS Resource 에 대한 어떤 작업을 수행할 수 있는지 허용 규칙을 JSON 형식으로 작성
- 만들어진 IAM Policy 를 IAM Users, IAM User Groups, IAM Roles 에 연결

#### IAM Policies 종류
- Identity-based policies: IAM Users, IAM User Groups, IAM Roles 에 적용하는 Policy
    - AWS Managed Policy: AWS 에서 기본으로 제공하는 Policy, 여러 계정에서 동일한 Policy 사용 가능
    - AWS Customer Managed Policy: 사용자가 생성한 Custom Policy, 해당 Policy 가 생성된 계정만 사용 가능
    - AWS Inline Policy: 명시적으로 할당하는 1대1 Policy, 보통 Managed 를 사용하길 권장, 명시적으로 특정 사용자에게 특정 권한을 부여하고 싶을 경우에 사용하면 유용
- Resource-based policies: AWS Resource 에 적용하는 Policy, 대표적으로 S3 Bucket Policy 가 있음
- Permissions boundaries
- Organizations SCPs
- Access control lists - ACLs
- Session policies

### IAM Roles
- An identity that you can assume to gain `temporary access` to permissions
- Ideal for situations in which access to services or resources needs to be granted `temporarily`, instead of long-term
- To grant users in one AWS account access to resources in another AWS account
- IAM Users 의 권한을 쉽게 관리하기 위해 IAM User Groups 를 사용하는데, 권한이 다양해지면 관리가 복잡해짐
- 이를 해결하기 위해 IAM Roles 를 사용
- IAM Roles 를 통해 일시적인 권한을 위임, 만약 IAM User Groups 를 할당한다면 위임 후 회수 작업이 번거로워짐
- IAM Roles 를 통해 임시 세션토큰 발급
- IAM Roles 란 AWS Resources 가 무엇을 할 수 있는지 정의하는 자격증명서
- IAM User Groups 에 권한을 바로 부여하는 대신, IAM Roles 를 만들고 IAM Users 또는 IAM User Groups 에 할당하는 방식

### IAM 구성 요약
- IAM Policies 는 IAM Users, IAM User Groups, IAM Roles 에 부여 가능

## IAM 권한 검증 절차
---
### IAM User 가 S3 를 사용하고 싶은 경우
1. IAM User 에게 S3 사용 Policy 가 부여되었는가?
2. IAM User 가 속한 IAM User Group 에 S3 사용 Policy 가 부여되었는가?
3. IAM User 에게 위임된 Role 에 S3 사용 Policy 가 부여되었는가?
4. OK 또는 Fail

### Lambda 가 S3 를 이용하고 싶은 경우
1. Lambda 에 S3 사용 Role 이 부여되었는가?
2. OK 또는 Fail

- IAM Access Analyzer
    - `Identifies` whether an Amazon S3 bucket or an IAM role has been `shared` with an `external entity` such as `another AWS account`
    - Checks access policies and offers actionable recommendations to help users set secure and functional policies
- IAM Credential Report
    - To `audit` its password and access key rotation details for `compliance` purposes
- AWS Security Token Service (STS)
    - To request `temporary`, `limited-privilege` credentials for users
