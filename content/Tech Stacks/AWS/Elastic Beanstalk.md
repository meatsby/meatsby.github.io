---
title: "Elastic Beanstalk"
date: 2023-12-08 13:00:00 +0800
status: In Progress
tags:
  - AWS
  - Elastic Beanstalk
---

## 개념
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
- Application
    - 인스턴스의 논리적인 집합
    - 윈도우 폴더 개념과 유사
- Environment
    - EC2, LB, ASG, SG 의 집합체

## 특징
- Lightsail, Elastic Beanstalk, EC2, On-premise 순으로 컴퓨팅 설정 복잡도가 높음
