---
title: DELETE & TRUNCATE & DROP
date: 2022-12-26 16:10:00 +0900
status: In Progress
tags:
  - Database
---

![[DELETE & TRUNCATE & DROP.png]]

## DELETE

---

```sql
DELETE FROM dbtable;
DELETE FROM dbtable WHERE {조건};
ROLLBACK;
COMMIT;
```

- WHERE 문을 사용하여 테이블에 있는 데이터를 하나하나 선택하여 제거하는 방식
- WHERE 문을 사용하지않고 테이블의 모든 데이터를 삭제하더라도, 내부적으로는 한줄 한줄 일일히 제거하는 과정을 거침
- 처리속도가 늦고 퍼포먼스에 좋지않은 영향을 줄 수 있음
- 원하는 데이터만 골라서 삭제할 때는 DELETE 사용
- 전체 데이터 삭제할 때는 TRUNCATE 사용
- 데이터를 삭제하더라도 데이터가 담겨있던 Storage 는 Release 되지 않는다
- DELETE 된 데이터는 COMMIT 되기 전에 ROLLBACK 할 수 있음

## TRUNCATE

---

```sql
TRUNCATE TABLE dbtable;
```

- 전체 데이터를 한 번에 삭제하는 방식
- 최초 생성되었을 당시의 Storage 만 남기고 데이터가 담겨있던 Storage 는 Release 됨
- TRUNCATE TABLE == CREATE TABLE 한 직후의 상태
- 자동 COMMIT 되는 명령어이기 때문에 지운 데이터를 되돌릴 수 없음

## DROP

---

```sql
DROP TABLE dbtable;
```

- 테이블 자체를 처음부터 없었던 테이블처럼 완전히 날려버리는 방식
- 테이블 자체가 모두 삭제되며 해당 테이블에 생성되어 있던 모든 인덱스도 사라짐
- 자동 COMMIT 되는 명령어이기 때문에 지운 데이터를 되돌릴 수 없음
- 오라클10g 부터는 테이블이 삭제되는 것이 아니라 휴지통 개념처럼 잠시 삭제 → 테이블 이름이 BIN$… 으로 변경됨

|               | DELETE        | TRUNCATE    | DROP               |
| ------------- | ------------- | ----------- | ------------------ |
| 명령어 종류   | DML           | DDL         | DDL                |
| 처리 속도     | 느림          | 빠름        | 빠름               |
| COMMIT        | 직접          | 자동        | 자동               |
| ROLLBACK 여부 | 가능          | 불가        | 불가               |
| 삭제 방식     | 데이터만 삭제 | CREATE 상태 | 테이블 완전히 제거 |
