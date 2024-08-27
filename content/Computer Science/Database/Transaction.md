---
title: "Transaction"
date: 2022-09-26 12:50:00 +0900
status: In Progress
draft: false
tags:
  - Database
---

## 트랜잭션이란?

---

트랜잭션이란 데이터의 정합성을 보장하기 위해 고안된 방법으로, 다른 트랜잭션과 독립적이고 일관되고 신뢰할 수 있는 방식으로 처리되어야 한다.

### 트랜잭션의 목적

- 오류로부터 복구를 허용하고 데이터베이스를 일관성 있게 유지하는 안정적인 작업 단위를 제공
- 동시에 접근하는 여러 프로그램 간에 격리를 제공

## ACID

---

트랜잭션의 목적을 달성하기 위해 트랜잭션이 가져야 하는 속성

### Atomicity, 원자성

- 트랜잭션에 포함된 모든 작업이 모두 성공하거나 실패해야 한다.

### Consistency, 일관성

- 트랜잭션을 실행한 전후에는 데이터의 일관성이 손상되지 않아야 한다.

### Isolation, 격리성

- 동시에 실행하는 여러 개의 트랜잭션이 서로 영향을 주지 않아야 한다.

### Durability, 영속성

- 커밋이 완료된 트랜잭션은 손상되지 않는 성질을 말한다.

## References

---

- [https://vladmihalcea.com/a-beginners-guide-to-acid-and-database-transactions/](https://vladmihalcea.com/a-beginners-guide-to-acid-and-database-transactions/)
