---
title: DDL & DML & DCL
date: 2022-12-26 16:00:00 +0900
status: In Progress
tags:
  - Database
---

## DDL, Data Definition Language 데이터 정의어

---

| 종류 | 역할 |
| --- | --- |
| CREATE | 데이터베이스, 테이블 등을 생성 |
| ALTER | 테이블을 수정 |
| DROP | 데이터베이스, 테이블을 삭제 |
| TRUNCATE | 테이블을 초기화 |
- 데이터베이스를 정의하는 언어로 데이터를 생성, 수정, 삭제하는 등 데이터의 전체 골격을 결정
- SCHEMA, DOMAIN, TABLE, VIEW, INDEX 를 정의하거나 변경 또는 삭제할 때 사용
- 데이터베이스 관리자나 데이터베이스 설계자가 사용

## DML, Data Manipulation Language 데이터 조작어

---

| 종류 | 역할 |
| --- | --- |
| SELECT | 데이터 조회 |
| INSERT | 데이터 삽입 |
| UPDATE | 데이터 수정 |
| DELETE | 데이터 삭제 |
- 정의된 데이터베이스에 입력된 레코드를 조회, 수정, 삭제
- 데이터베이스 사용자가 응용 프로그램이나 질의어를 통해 저장된 데이터를 실질적으로 처리
- 데이터베이스 사용자와 데이터베이스 관리 시스템 간의 인터페이스 제공

## DCL, Data Control Language 데이터 제어어

---

| 종류 | 역할 |
| --- | --- |
| GRANT | 특정 DB 사용자에게 특정 작업에 대한 권한 부여 |
| REVOKE | 특정 DB 사용자에게 특장 작업에 대한 권한 박탈 |
| COMMIT | 트랜잭션의 작업을 영속화 |
| ROLLBACK | 트랜잭션의 작업을 취소 및 복구 |
- 데이터베이스에 접근하거나 객체에 권한을 주는 등 데이터를 제어
- 데이터의 보안, 무결성, 회복, 병행 수행 제어 등을 정의
