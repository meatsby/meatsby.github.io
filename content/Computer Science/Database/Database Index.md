---
title: "Database Index"
date: 2022-10-01 21:00:00 +0900
status: In Progress
draft: false
tags:
  - Database
---
## Index 란?
---
데이터베이스에서 검색 성능을 향상시키기 위해 Index 를 사용한다.

하지만 검색 성능을 실질적으로 향상시키기 위해선 해당 쿼리가 Index 를 사용하는지, Cardinality Selectivity 같은 요소들을 고려된 Index 를 사용해야 한다.

### 장점

빠른 검색

### 단점

추가 수정 삭제 등의 연산 시 Index 를 형성하기 위한 추가적인 연산이 수행되어 비용이 높음

### 결론

인덱스 생성할 땐 트레이드 오프 관계에 놓여있는 요소들을 종합적으로 고려해서 생성해야 한다.
