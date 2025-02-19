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
- JVM 메모리 영역
	- Method = 전역변수, static 변수, 시작부터 종료까지, 클래스로더가 로딩할 때
	- Stack = 지역변수, 매개변수, 메서드 호출 시 메모리 할당, 종료 시 해제
	- Heap = new 객체, GC 대상
- GC
	- CMS: Concurrent Mark Sweep, 레거시
	- G1: 범용 애플리케이션, Java9 부터 기본
	- ZGC: 매우 큰 힙을 사용하고, 짧은 일시정지가 필요한 실시간 애플리케이션
	- Why is there still a memory leak in Java?
		- Because some unused objects are being referred and will not be targeted for GC
- Java8, 11, 17 차이
	- Java8 에 Stream API, Lambda 식, GC PermGen -> Metaspace, Optional API
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
- OOP 4 Principle
	- Abstraction
	- Encapsulation
	- Inheritance
	- Polymorphism
- SOLID 에 대해 설명해라
	- SRP, Single Responsibility Principle
		- 하나의 클래스는 하나의 기능
	- OCP, Open/Closed Principle
		- Open for extension, closed for modification
		- Implement interface for new functionality
	- LSP, Liskov Substitution Principle
		- Subtype can be replaced with Original type, guarantees functionality
	- ISP, Interface Segregation Principle
		- 특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다
	- DIP, Dependency Inversion Principle
		- Interface 를 의존하고 구현체는 DI, IoC 컨테이너가 주입하도록
- Java Singleton 구현
	- private 생성자, private static 변수에 단일 인스턴스 저장, public static 으로 해당 인스턴스 제공
	- 대표적인 예 = Spring Bean
- ⭐️ Java Multithread
	- Executor
	- CompletableFuture
- Java Synchronized
	- 한 개의 Thread 만 접근할 수 있게 제한하는 기능
- volatile keyword
	- variable that will be modified by different thread
	- stored in main memory instead of CPU cache
- Java Reflection
	- 구체적인 클래스 타입을 몰라도 메서드, 타입, 변수등에 접근할 수 있도록 하는 API
	- 동적으로 클래스를 조작할 수 있음
	- 대표적인 예로 Transaction AOP, Reflection 을 통해 다이나믹 프록시를 생성
- Java Optional API
	- null 을 처리하기 위한 Java8 에 추가된 기능
	- DB 조회 시 Optional 로 잘못된 쿼리도 처리 가능
- Java Collection Framework
	- List, Set, Map 등 인터페이스로 여러 데이터를 관리
	- List = Vector, ArrayList, LinkedList
	- Set = HashSet, LinkedHastSet
	- Map = HashMap, HashTable, ConcurrentHashMap
- Set, Map 중복 검사
	- hashcode 가 다르면 다른 객체, 같으면 equals 까지 비교
- Vector, LinkedList, ArrayList 차이
	- List 는 Node 를 연결하기에 삽입, 삭제에 우위
	- Vector 는 랜덤 접근이 가능하기에 검색에 우위
	- Vector 는 동기화하기에 multi-thread 에 안전
- Java Generic
	- type 을 하나로 지정하지 않고 범용적으로 사용하기 위해 사용
	- Invariance 란 type safety 를 위해 inheritance 와 무관하게 다른 타입으로 취급
	- wildcard 를 사용하여 처리 가능
- Java Serialization & Deserialization
	- Serialization = JVM 내 객체를 byte 로 변환
	- Deserialization = byte 를 JVM 데이터로 변환
- Functional Interface
	- containing only 1 method to be implemented
	- can be used for lambda expression type
- Checked and unchecked exceptions?
- Java Stream 이란
	- 병렬 연산 가능
	- 최종 연산 전까지 중간 연산 지연
	- 원본을 읽기만 할 뿐 변경하지 않음

- LRU Cache 란?
- Hashmap
	- Hash 값을 키로 저장함 키를 찾을 때 상수시간에 찾을 수 있음

- Python shallow-copy vs deep-copy

- Session vs Cookie
- MFA 란

## Spring
---
- @SpringBootApplication annotation?
- Spring Bean Scope
- ⭐️ Spring Transaction


## JPA Hibernate
---

## DB, SQL
---
- SQL query, joining, indexing



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
