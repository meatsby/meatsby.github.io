---
title: TIL temp
date: 2025-12-19 23:05:34 +0800
status: In Progress
draft: false
tags:
---
## SLI, SLO, SLA
---


## Linux Zombie Process
---
- cron 으로 죽이기?
- cron 은 꺼지니까 systemd daemon 으로 실행?

## Linux - mv * 하면 생기는 일
---
```sh
mv *
```
- 하면 해당 디렉터리에 있는 모든 파일 및 디렉터리가 맨 마지막 디렉터리 안으로 들어감
- 다 파일이면? lima 에서 실험해보자

## AWS 로 DMZ 구성
---
gql.api.example.com -> R53 -> CloudFront -> R53(Public Hosted Zone 을 타고 감) -> ALB(Ingress) -> EKS Node Group -> EKS Pod

## References
---
- 
