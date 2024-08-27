---
title: "Persistence Context"
date: 2022-10-07 14:40:00 +0900
status: In Progress
draft: false
tags:
  - Spring Data JPA
---
## Persistence Context
---
Persistence Context, 영속성 컨텍스트는 엔티티를 영구 저장하는 환경을 의미한다.

## Persistence Context 의 장점
---
### 1차 캐시

1차 캐시에서 조회가 가능하며 1차 캐시에 없다면 DB 에서 조회하여 1차 캐시에 올려 놓는다.

### 동일성 보장

동일성 비교를 보장한다.

### 쓰기 지연

트랜잭션을 지원하는 쓰기 지연이 가능하며 트랜잭션 커밋하기 전까지 쿼리를 바로 보내지 않고 모아서 보낼 수 있다.

### 변경 감지

1차 캐시에 들어온 데이터의 스냅샷을 찍어두어 커밋 시점의 엔티티와 스냅샷을 비교하여 UPDATE 쿼리를 생성한다.

### 지연 로딩

엔티티에서 해당 엔티티를 불러올 때 쿼리를 날려 해당 데이터를 가져온다.
