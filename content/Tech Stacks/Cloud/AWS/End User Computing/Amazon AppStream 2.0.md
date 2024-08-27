---
title: "Amazon AppStream 2"
date: 2024-05-03 23:41:37 +0800
status: To Do
draft: false
tags:
  - AWS
---
## Amazon AppStream 2.0
---
 - Fully managed application & desktop streaming service
 - Confy application streaming through browser
 - Application and data are stored in AWS
 - Auto-scalable
 - Instances that streams app & desktop is disposable

## AWS AppStream 2.0 Architecture
---
 - Video & User Input is streamed via HTTPS
 - AppStream instance running the app and the end-user are encrypted via SSL
 - Network Access managable via Security Group

## AWS AppStream 2.0 Concepts
---
 - Image
    - AppStream 2.0 Streaming Instance 의 시작 상태를 미리 구성해놓은 파일
    - EC2 AMI 와 비슷
 - Image Builder
    - Image 를 만들기 위한 인스턴스로, AppStream 2.0 에서 실행할 App Catalog 를 생성하고, Image 를 생성함
    - Desktop 모드가 아닌 기본 AppStream 2.0 을 통해 크롬 브라우저만 사용하게 하려면 Image Builder 를 통해 Chrome 을 설치하고 구동하는 과정을 등록하고, 그 등록된 상태를 Image 로 만들어서 Streaming Instance 로 사용
 - Fleet
    - Fleet 은 지정한 Image 를 실행하는 Fleet Instance(Streaming Instance)로 구성됨
    - Fleet 에 대해 원하는 수의 Streaming Instance 를 설정하고 필요에 따라 Fleet 을 자동으로 조정하도록 Policy 구성 가능
    - User 1명당 1개의 Instance 가 필요
    - 즉, Fleet 은 Scaling 가능한 Streaming Instance 를 묶은 집합
       - EC2 의 Auto Scaling Group 과 흡사
 - Stacks
    - Stack 은 연결된 Fleet, 사용자 엑세스 정책 및 Storage 구성으로 구성됨
    - Stack 을 설정하여 사용자에게 Application 을 Streaming 함
    - 즉, Stack 을 통해 Fleet 과 사용자를 연결해주고 Fleet 제어를 위한 설정을 적용

## Fleet 의 유형
---
 - On-Demand vs Always On
    - On Demand 는 사용자가 접속할 때 Streaming Instance 를 켜고 유기적으로 종료
    - Always On 은 24시간 Streaming Instance 가 On 인 상태
 - Always On 이라도 Scaling Policy 가 중요함
    - 사용자가 붙을 수 있는 개수는 어쨌든 Fleet 의 Instance 개수
    - 사용 가능한 Instance 개수에 따라 그 안에서 사용자들의 세션이 생성되고 만료됨
    - Always On 이면 사용자가 붙어있지 않아도 Streaming Instance 가 계속 켜져있는 것이고, Always On 이라해도, Scaling 정책에 의해 새로 생성되는 Instance 에 접속하면 대기 시간을 기다려야 함

## Fleet Auto Scaling
---
- Provisioning
   - 20 instances per minute for single fleet
   - 15 min, 25 min when feelts are joing to an Active Directory domain

### Scaling Policy Metric
- Capacity Utilization
   - The percentage of instances in a fleet that are being used
      - e.g. If Capacity Utilization < 25%, remove 25% capacity
- Available Capacity
   - The number of instances in a fleet that are available for users
      - e.g. If Available Capacity < 5, add 5 instances
- Insufficient Capacity Error
   - The number of session requests rejected due to lack of capacity
      - e.g. If Insufficient Capacity Error > 0, add 1 instance

### Scaling Policies
- Step scaling
   - Recommended to scale with the percentage of capacity
- Target tracking
   - Is effective for high-churn situations
      - Large number of users start, or end sessions in a short period of time
- Schedule-based scaling
   - Recommended to scale up when working hours

## References
---
- 
