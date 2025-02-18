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
- JVM
	- Java Byte Code -> OS machine code 해석, GC 자동 메모리 관리
	- JVM 클래스 로딩 과정
		- Lazy Loading mechanism, 클래스를 필요할 때 메모리에 올려 사용
			- 인스턴스 생성, 클래스 정적 메서드 호출, 정적 변수 사용 시 초기화됨
		- static final = JVM Method Area Constant Pool
		- final = 인스턴스 변수는 Heap, 지역 변수는 Stack
- GC
	- CMS: 레거시
	- G1: 범용 애플리케이션
	- ZGC: 매우 큰 힙을 요구하는 애플리케이션
- Java8, 11, 17 차이
	- Java8 에 Stream API, Lambda 식, GC PermGen -> Metaspace
	- Java11 에 G1GC 기본
	- Java17 에 record class 추가, Spring3.0 부터 17 이상 지원
- Java 컴파일 과정
	- .java -> build -> java complier(javac) -> .class -> Class Loader 로 JVM 메모리에 로드 -> Java Interpreter/JIT -> runtime -> OS
- Immutable 객체
	- 인스턴스화 이후 변하지 않는 것을 보장하는 객체
	- 인스턴스 변수로 참조 객체를 가질 경우 deep-copy 를 위한 defensive-copy 요
	- Thread-Safe?
	- 중복 객체가 줄기 때문에 GC 성능 향상
- Abstract vs Interface
	- abstract method 가 하나 이상일 경우 Abstract, 전체가 abstract method 일 경우 Interface
	- 둘 다 인스턴스 생성 불가능하기 때문에 구현체를 만들어 사용해야 함
	- 추상클래스는 다중 상속 불가, 인터페이스는 다중 상속 가능
- Hashmap
	- Hash 값을 키로 저장함 키를 찾을 때 상수시간에 찾을 수 있음
- Why is there still a memory leak in Java?
- Vector, LinkedList, ArrayList 차이
- equals vs hashcode 차이
- SOLID 에 대해 설명해라
	- SRP
	- OCP
	- LSP
	- ISP
	- DIP
- Java Singleton 구현
	- getter 가 자기 자신을 반환
	- 대표적인 예 = Spring Bean
- ⭐️ Java Multithread
	- Executor
	- CompletableFuture
- Functional Interface
- Checked and unchecked exceptions?
- ⭐️ Java Transaction

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
2. Java Version difference
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
	- 내부 객체까지 복사본으로 만듬, 이를 위해 defensive-copy 구현
---
1. SOLID Principles?
2. ⭐️ How to implement Singleton with Java
3. ⭐️ Java synchronized
4. EAGER LOADING vs LAZY LOADING
5. Java serialization and deserialization
6. hashcode 가 항상 1을 반환하는 객체 5개를 HashMap 저장하면 크기는?
7. Java8 에서 String 안에 같은 char 갯수
	- Stream 물어보는 듯, `str.chars().filter(c -> c == char).count()`
8. Child class 가 unchecked exception 을 던지고 Parent class 는 안 던지면 compile error?
	- method overriding 하고 둘 다 wrapper 를 parameter 로 받는다면 둘 다 nullable 이기에 compile error
9. Aggregation vs Composition
	- Part-Whole Relationship
	- Aggregation = Loose Coupling, independent lifecycle
	- Composition = Strong Coupling, dependent lifecycle
10. environment 별 application.yml
11. Performance testing?
12. ⭐️ How to ensure Security?
	- Bearer token
	- ⭐️ Spring Security
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
