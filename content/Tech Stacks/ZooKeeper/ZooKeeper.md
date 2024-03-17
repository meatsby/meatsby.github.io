---
title: "ZooKeeper"
date: 2023-11-21 15:30:00 +0800
status: In Progress
tags:
  - ZooKeeper
---

- Zookeeper 는 단순히 디렉토리 형태의 데이터 저장소
- Coordinaton Service System
    - Info sharing between systems
    - Status checking
    - Synchronizing with locks
- Request Processor: Processes Write Request
- Zab(Zookeeper Atomic Broadcast Protocol): RP 에서 처리한 요청을 트랜잭션으로 생성하여 모든 서버에 전파
    - Leader-Propose -> Follower-Accept -> Leader Commit
- In-memory DB: znode 의 정보가 저장됨
- znode: Zookeeper 가 상태를 저장하는 곳
    - Persistent Node: 영구 저장
    - Ephermeral Node: Client 종료 시 제거됨
    - Sequence Node: 생성 순서 포함
- Quorum: Leader 가 new transaction 을 수행하기 위해선 자신을 포함한 과반수 서버의 합의가 필요
    - Ensemble 을 구성하는 서버가 3개라면, Quorum 은 2개의 서버로 구성됨
