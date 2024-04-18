---
title: "Elastic Beanstalk"
date: 2023-12-08 13:00:00 +0800
status: In Progress
tags:
  - AWS
  - Elastic Beanstalk
---
## 개념
---
- Application Code 만으로 간단하게 서버 배포 가능
- Elastic Beanstalk은 용량 관리, 로드 밸런싱, 자동 크기 조정 및 모니터링을 통해 자동으로 배포된 인프라에 공통 프로그래밍 언어로 개발된 웹 애플리케이션 및 서비스를 배포하고 크기 조정하는 서비스입니다. Elastic Beanstalk을 사용하면 애플리케이션을 보다 쉽게 프로비저닝하고 지원할 수 있습니다. Elastic Beanstalk은 웹 사이트 지연 시간을 줄이지는 않습니다.
- Docker Container 기반의 애플리케이션 배포 서비스
- 알아서 EC2 유형을 변경, Auto Scaling, ELB 부하 분산, 애플리케이션 배포까지 자동
- 한 마디로 프로비저닝의 결정체
    - EC2 및 OS 설치
    - WAS 구성
    - ASG 구성
    - ELB 구성
    - 업데이트 및 버전 관리
    - 모니터링 관리 설정

## 구성
---
- Application
    - 인스턴스의 논리적인 집합
    - 윈도우 폴더 개념과 유사
- Environment
    - EC2, LB, ASG, SG 의 집합체

## 특징
---
- Lightsail, Elastic Beanstalk, EC2, On-premise 순으로 컴퓨팅 설정 복잡도가 높음
