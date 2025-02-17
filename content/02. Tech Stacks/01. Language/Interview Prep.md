---
title: Interview Prep
date: 2025-02-17 20:03:44 +0800
status: To Do
draft: false
tags:
  - example-tag
---
## Java
---
- GC
	- CMS: 레거시
	- G1: 범용 애플리케이션
	- ZGC: 매우 큰 힙을 요구하는 애플리케이션
- Hashmap
	- Hash 값을 키로 저장함 키를 찾을 때 상수시간에 찾을 수 있음
- Why is there still a memory leak in Java?
- Java8, 11, 17 차이
	- Java8 에 Stream API, Lambda 식, GC PermGen -> Metaspace
	- Java11 에 G1GC 기본
	- Java17 에 record class 추가, Spring3.0 부터 17 이상 지원
- Vector, LinkedList, ArrayList 차이
- equals vs hashcode 차이
- SOLID 에 대해 설명해라
- Java Singleton 구현
- Java Multithread
	- Executor
	- CompletableFuture
- Functional Interface
- Checked and unchecked exceptions?
- Aggregation vs Composition
	- Part-Whole Relationship
	- Aggregation = Loose Coupling, independent lifecycle
	- Composition = Strong Coupling, dependent lifecycle

- @SpringBootApplication annotation?
- Spring Bean Scope

- LRU Cache 란?

- Python shallow-copy vs deep-copy

- SQL query, joining, indexing

- Session vs Cookie
- MFA 란

---
1. What is content negotiation in REST Microservice
	- Annotation with consumes
		- e.g. xml or json
2. Java Version different
3. Advantage of DI?
4. What DB have you used?
	- NoSQL vs RDBMS?
5. Java Bean vs Spring Bean
6. Microservice gateway
	- 인증 서버? token?
7. Component, Controller, Service, Repository annotations?
	- Stereotype annotation
8. What will happen when performing DB accessing logic in Service annotation
9. Benefit of using DAO layer
	- Repository Layer 와 동일?
10. DB performance
	- Indexing
	- Archiving
	- Replication?
11. Spring Exception handling
	- ControllerAdvice
12. JPA Hibernate
	- Custom method for JPA by implementing JPARepository
13. Gradle vs maven
14. Agile methodology?
	- Sprint, Scrum
15. Git rebase?
16. Advantages of Lambda expression
17. Spring Scheduler?
18. Hashcode vs equals
19. WeakHashMap?
	- HashMap 의 종류
20. ConcurrentHashMap 작동원리
21. Convert List to Set what will happen internally
	- hashcode & equals 로 중복 확인
22. What is Deepcopy?
---

## ETC
---
- CircleCI 는 어떻게 빌드하나?
- Terraform Version 을 어떻게 관리했나?
- Lambda 의 작동원리
- DynamoDB 에서 Transaction
	- TransactWriteItems, TransactGetItems 로 수행
	- PK 기준 locking 으로 다른 Transaction 을 제한
- GQL 이란?
- Kotlin + SpringBoot 프로젝트에 대해 더 설명해라
