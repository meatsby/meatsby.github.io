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
		- static final = Method Area Constant Pool
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
		- 무의미한 래퍼 클래스 남용
		- 캐싱 남용
		- 리소스 반환 실패
	- Weak Generational Hypothesis = 대부분의 객체는 일찍 죽는다는 가설
- Java8, 11, 17 차이
	- Java8 에 Stream API, Functional Interface + Lambda 식, GC PermGen -> Metaspace, Optional API, Interface default and static method
	- Java11 에 G1GC 기본
	- Java17 에 record class 추가, Spring3.0 부터 17 이상 지원
- Java 컴파일 과정
	- .java -> build -> java complier(javac) -> .class -> Class Loader 로 JVM 메모리에 로드 -> Java Interpreter/JIT -> runtime -> OS
- Java Serialization & Deserialization
	- Serialization = JVM 내 객체를 byte 로 변환
	- Deserialization = byte 를 JVM 데이터로 변환
- Java 는 Call by Value vs Call by Reference 인가?
	- Java 는 Call by Value 만 존재함
	- 객체 전달이 Call by Reference 로 보일 수 있지만 객체 참조값이 복사되어 전달되기에 Call by Value 임
- Java Exception
	- Object -> Throwable -> Exception & Error
	- Checked vs Unchecked Exceptions
		- Checked
			- 컴파일러가 예외 처리 강제
			- Exception 을 상속하지만 RuntimeException 를 제외한 예외
			- IOException, SQLException 등 외부 문제
		- Unchecked
			- RuntimeException 및 그 하위 클래스
			- NPE 등 프로그래밍 오류
- Java String 과 Immutability
	- String Literal 은 JDK8 이상부터 Heap 에 위치하는 String Pool 에 저장되며 new 연산자로 생성된 String 은 Heap 에 위치함
	- String Pool 은 Runtime Constant Pool(Method Area) 의 일부지만 Heap 에 저장됨
	- String 은 불변객체여서 Thread-safe 함
- String, String Builder, String Buffer 차이
	- String Builder, Buffer 모두 String 과 다르게 mutable 하며 heap 에 저장됨
	- String Buffer 만 내부적으로 synchronized 처리가 되어 있어 Thread-safe
	- 비동기 처리가 아님녀 성능은 Builder 가 더 좋음
- Immutable 이란
	- 인스턴스 변수로 참조 객체를 가질 경우 deep-copy 를 위한 defensive-copy 요구
	- Thread-Safe
	- 중복 객체가 줄기 때문에 GC 성능 향상
	- 생성 방법
		- final class
		- private final field
		- deep copy constructor & getter
		- no setter
- Java Collection API
	- List, Set, Map 등 인터페이스로 여러 데이터를 관리
	- 불변을 보장하기 위해 UnmodifiableCollection 을 사용할 수 있지만 deep-copy 가 유용
	- List = Vector, ArrayList, LinkedList
		- ArrayList 는 내부적으로 자바 배열을 사용, 랜덤 접근 가능 검색 우위
		- LinkedList 는 Node 를 연결하기에 삽입, 삭제에 우위
		- Vector 는 랜덤 접근이 가능하기에 검색에 우위
		- Vector 는 동기화하기에 multi-thread 에 안전
	- Set = HashSet > LinkedHastSet > TreeSet 순으로 성능이 좋으며, 모두 null 한 번만 저장 가능
		- HashSet
			- 순서 보장 x
			- 내부적으로 HashMap 사용
		- LinkedHashSet
			- 입력한 순서 보장
			- 내부적으로 LinkedHashMap 사용
		- TreeSet
			- 오름차순 정렬
			- 내부적으로 TreeMap 사용
	- Map = HashMap, HashTable, ConcurrentHashMap
		- HashMap
			- Hash 값을 키로 저장함 키를 찾을 때 상수시간에 찾을 수 있음
		- LinkedHashMap
			- 순서 유지를 위한 Double Linked List, FIFO
		- TreeMap
			- Key 값에 따라 정렬됨
			- 내부적으로 synchronized, Thread-safe
			- RedBlack Tree 로 저장되며, Comparator 로 정렬 커스텀
	- Set, Map 중복 검사
		- hashcode 가 다르면 다른 객체, 같으면 equals 까지 비교
- hashcode vs equals
	- Written in native method, creates hashcode based on the Object address
- HashMap
	- Hash 란 데이터를 고정된 크기의 값으로 변환하는 과정, 이 값을 해시값이라고 함
	- Key 가 Bucket 을 가리키고 Bucket 이 value node 를 가리킴
	- 해시 값의 크기보다 다양한 입력값이 들어오면 원본이 달라도 같은 해시를 반환할 수 있음 이를 해시 충돌이라고 함
	- 자바는 해시 충돌시 linkedlist 체이닝으로 값을 관리하고 너무 많은 충돌이 일어나면 JDK8 이상부터 Treeify (Red-Black Binary Search Tree)
- ConcurrentHashMap
	- 원래 멀티스레딩 용으로 Hashtable 이 있었지만 이건 너무 오래되고 성능도 안 좋음
	- 버킷 단위로 락을 거는 segmented locking 을 사용하여 다중 스레드가 접근 가능
- Java Stream API
	- 병렬 연산 가능
	- Lazy Evaluation: 최종 연산 전까지 중간 연산 지연
	- 원본을 읽기만 할 뿐 변경하지 않음
	- Collection API 와의 차이 = 연산 및 병렬 처리를 목적으로 할 때
- Comparable vs Comparator
	- Comparable 은 compareTo(T obj)
	- Comparator 는 compare(Object o1, Object o2)
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
- Design Pattern?
	- State Pattern
	- Strategy Pattern
- Abstract vs Interface
	- abstract method 가 하나 이상일 경우 Abstract, 전체가 abstract method 일 경우 Interface
	- 둘 다 인스턴스 생성 불가능하기 때문에 구현체를 만들어 사용해야 함
	- 추상클래스는 다중 상속 불가, 인터페이스는 다중 상속 가능
- Functional Interface
	- Implement 할 1개의 메서드만 포함하는 인터페이스
	- 람다 표현식 타입으로 활용할 수 있음
- Lambda 식의 장점
	- Reducing boilerplate
	- Functional Programming
		- e.g. integration with Stream API
- Java Singleton 구현
	- private 생성자, private static 변수에 단일 인스턴스 저장, public static 으로 해당 인스턴스 제공
	- 대표적인 예 = Spring Bean
- Java Reflection
	- 구체적인 클래스 타입을 몰라도 메서드, 타입, 변수등에 접근할 수 있도록 하는 API
	- 동적으로 클래스를 조작할 수 있음
	- 대표적인 예로 Transaction AOP, Reflection 을 통해 다이나믹 프록시를 생성
- Java Optional API
	- null 을 처리하기 위한 Java8 에 추가된 기능
	- DB 조회 시 Optional 로 잘못된 쿼리도 처리 가능
- Java Generic
	- type 을 하나로 지정하지 않고 범용적으로 사용하기 위해 사용
	- Invariance 란 type safety 를 위해 inheritance 와 무관하게 다른 타입으로 취급
	- wildcard 를 사용하여 처리 가능
- ⭐️ Java Multithread
	- ExecutorService 를 통해 ThreadPool 을 생성하고 스레드를 가져와서 사용
	- JDK8 이후 지원되는 CompletableFuture
	- Kotlin 에선 코루틴을 사용
	- Java21 부터 Virtual Thread 가 등장
- Java Synchronized
	- 한 개의 Thread 만 접근할 수 있게 제한하는 기능
	- static synchronized 는 클래스 레벨에 락을 걸기 때문에 public synchronized 를 사용하려는 Thread2 는 Thread1 을 기다려야 함
- volatile keyword
	- variable that will be modified by different thread
	- stored in main memory instead of CPU cache
- Thread Safe 란?
- 비동기 ThreadLocal?
- Thread start() run() 차이
- static synchronized method 는 Method 에 synchronized method 는 Heap 에 저장된다?
- Aggregation vs Composition
	- Part-Whole Relationship
	- Aggregation = Loose Coupling, independent lifecycle
	- Composition = Strong Coupling, dependent lifecycle

## Spring
---
- @SpringBootApplication annotation?
- Java Bean 과 Spring Bean 의 차이
- Spring Bean Scope
- ⭐️ Spring Transaction
- readOnly 작동원리
- 리플랙션 쓰면 싱글턴 깨지는데 어떻게 해결?
- AOP 프록시가 적용이 안되는 경우? 내부 호출 시 적용이 왜 안됨?
- Spring MVC 구조 및 흐름
- Filter vs Interceptor? 뭐가 먼저 실행됨?
- Servlet?
- Spring Scheduler?
- Spring Security?
- DAO layer vs repository layer?
- Spring 에서 데드락이 발생할 수 있는 상황은?
- 낙관적 락과 비관적 락의 차이는?
- DI 란 무엇이고 장점이 뭔가?
- ComponentScan 이란 무엇이고 어떻게 작동하나
- Controller, Service, Repository 차이
	- Stereotype Annotation 으로 차이가 없음
	- Service 에서 DB 로직을 수행하면 어떻게 되나
		- 상관없음
- Spring 에서 Exception Handling 어떻게 하나
- Gradle vs maven
- environment 별 application.yml
- Which bean will know what to inject when Autowired
	- AppContext will inject based on type
	- If there are 2 implementations for Autowired interface, it will inject based on the name
-  `@Primary` Annotation?
	- 인터페이스를 구현한 Bean 이 2개 이상일 때 우선 순위를 가지는 Bean
	- `@Qualifier` 로 명시적으로 지정, 사용할 경우 `@Primary` 보다 높은 우선순위
- 트랜젝션 시 데드락 발생 및 해결법
	- 두개의 메서드가 교차로 db 락을 걸 경우 발생
	- LockTimeOut 이나 Optimistic Lock 사용
- `@RequestMapping` 작동 방식
- `@AutoConfig` 란?
	- `@EnableAutoConfiguration(exclud={className})` 으로 불필요한 AutoConfig 해제 가능

## JPA Hibernate
---
- JPA 란 무엇이고 어떻게 사용하나
	- JPA Persistence API 로 RDBMS 와 OOP 를 이어주는 ORM
	- 다양한 구현체가 있고 Hibernate 가 대표적
- N+1 문제란 무엇이고 어떻게 해결하는가
	- 일대다 또는 다대일 연관관계 엔티티 조회 메서드 실행 시 발생
	- FetchType=EAGER 일 땐 연관관계에 있는 객체를 모두 조회해서 발생하고
	- FetchType=LAZY 여도 나중에 사용할 때 똑같이 모두 조회해서 발생
	- 하위 엔티티를 한 번에 가져오지 않기 때문
	- 해결법
		- FetchJoin 으로 Inner Join 하여 한 번에 다 가져오기
		- EntityGraph 도 있지만 OuterJoin 이고 권장하지 않음
	- Pagination 이 안된다는 단점이 있음
- 엔티티 생명주기
	- 준영속, 영속
- JDK Dynamic Proxy vs CGLIB Proxy
- 트랜잭션 전파 속성
	- REQUIRED, REQUIRED_NEW
- ManyToOne vs OneToMay 단방향 매핑 시 문제
- PSA(Portable Service Abstraction)
	- PlatformTransactionManager -> JDBCTxManager, HibernateTxManager 등
- 연관관계 주인

## DB, SQL
---
- DDL, DML, DCL
	- DDL = ALTER, CREATE, DROP
	- DML = SELECT, INSERT, UPDATE, DELETE
	- DCL = COMMIT, ROLLBACK, GRANT, REVOKE
- SQL query
	- FROM, ON, JOIN > WHERE, GROUP BY, HAVING > SELECT > DISTINCT > ORDERBY > LIMIT
- GROUP BY = 특정 Column 기준으로 연산한 결과를 그룹짓는 역할
	- COUNT, SUM, AVG, MAX, MIN 등으로 연산 후 DISTINCT 로 중복 데이터 제거 가능
- DELETE, TRUNCATE, DROP
	- DELETE = 데이터만 골라 지울 수 있고 Rollback 가능
	- TRUNCATE = 전체 데이터를 한 번에 삭제, Rollback 불가능
	- DROP = 테이블 자체를 완전 삭제, Rollback 불가능
- Inner Join vs Outer Join
	- Inner Join = 테이블 2개가 교차되는 교집합
	- Outer Join = 필요한 데이터를 다른 테이블이 가지고 있는 경우 데이터가 있는 테이블 전부
		- LEFT OUTER JOIN
		- RIGHT OUTER JOIN
		- FULL OUTER JOIN
- Indexing
	- Full Table Scan 대신 Index 를 검색하여 데이터를 찾는 방식
	- Index 는 정렬된 상태를 유지하기 때문에 검색은 빠르나, 추가/수정/삭제는 느림
	- 즉, 저장 성능을 희생하고 검색 성능을 높이는 것
	- B-Tree 리프노드를 LinkedList 로 연결한 B+Tree 자료구조
- Normalization
	- Column 이 Atomic Value 를 갖도록 테이블을 분해
	- 구조 확장 시 정규화된 DB 는 구조를 변경하지 않거나 일부만 변경
	- JOIN 연산이 많아지는 단점이 있음
	- 읽기 성능이 중요한 경우 Denormalize 할 수 있음
- Transaction
	- 여러 쿼리의 집합, ACID, Commit 또는 Rollback
- DB 락
	- Shared Lock = Read Lock, 읽기만 하기 때문에 동시 접근 가능
	- Exclusive Lock = Write Lock, 락이 반환될 때 까지 하나의 Transaction 만 접근 가능
- Optimizer
	- SQL 을 가장 빠르게 수행할 처리 경로를 생성하는 핵심 엔진
	- 여러 실행 계획을 세우고, 최고의 효율을 작는 실행 계획을 판별 후 쿼리 수행
- Clustering vs Replication
	- Clustering = 수평 확장, 동기 방식
		- 동기화 보장으로, 높은 가용성, 로드밸런싱 등 이점
	- Replication = 권한에 따른 수직 확장, 비동기 방식
		- 읽기 작업을 대신해 성능 향상, 비동기 방식이라 지연 시간이 거의 없음
		- 동기화가 보장되지 않음, Master 가 다운되면 복구가 까다로움
- Index B-Tree vs Hash Table
- Transaction 격리 수준
- MySQL vs Postgres
- 인덱스 거는 기준, 복합 인덱스?
- DB 테이블 컬럼 추가 시 읽기 성능이 저하되는데 해결법?
	- Vertical Partitioning?
- DB 성능을 올리기 위해 할 수 있는 방법은?
	- Indexing
	- Archiving
	- Replication?
- Optimistic Lock 과 Pessimistic Lock 의 차이는?

## ETC
---
- CircleCI 는 어떻게 빌드하나?
- Terraform Version 을 어떻게 관리했나?
	- TFC 에 설치된 TF version 을 가져오고 TF Releases 와 비교하여 최신 버전을 TFC 에 설치하게끔
- Lambda 의 작동원리
	- Cold start vs warm start
	- 람다를 실행하는 컨테이너를 새로 띄워야 하는 상황이면 Cold
	- 컨테이너에서 재실행만 하면되면 warm
	- VPC 밖에 생성하면 인터넷 가능
	- VPC 안에 생성하면 로컬 네트워크, NAT 까지 붙이면 인터넷 가능
- DynamoDB 에서 Transaction
	- TransactWriteItems, TransactGetItems 로 수행
	- PK 기준 locking 으로 다른 Transaction 을 제한
- LoadBalancer 종류
	- ELB
	- NLB
	- ALB
- GQL 이란?
- Kotlin + SpringBoot 프로젝트에 대해 더 설명해라

- TCP UDP 차이
- HTTP1.1, 2.0 차이
- HTTP/S, 대칭키 비대칭키
- HTTP 는 stateful? stateless?
- RestAPI 란?
	- URI 로 자원을 지정하고, HTTP Method 로 행위를 명시하는 법
- HEATOS? REST vs RESTful?
- CORS 란?
- OAuth2.0

- 데드락? 탐지는 어떻게?
- 뮤텍스 세마포어

- 무중단 배포
- 쿠키 vs 세션 vs JWT
- MFA 란
- LRU Cache 란?

- 자신의 장단점
- 극복하기 위해 무엇을 했는가
- 팀원 간 갈등 어떻게 해결?
- 10년 후 개발자 목표

## 20
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

## 60
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

## 40
---
1. How to implement Singleton with Java
2. How to test Singleton
	- Use ` == ` operator in JUnit to check same instance
3. Collection for uniqueness and insertion order
	- LinkedHashSet
4. equals 는 구현하고 hashcode 를 구현하지 않았을 경우 HashMap 에 저장하면 어떻게되나?
	- 제대로 동작하지 않는다, HashMap, HashSet, HashTable 등은 hashcode && equals 가 모두 동일해야 같은 객체로 판단하기 때문에 HashMap 에 저장할 경우 다른 버킷에 저장됨
	- 때문에 map.size 는 1 이 되고, 같은 키로 간주하여 마지막에 put 한 value 를 반환함
5. Object 클래스의 default hashcode 는 어떻게 구현되어 있나?
	- Written in native method, creates hashcode based on the Object address
6. What is immutable object and how to implement it?
7. public static synchronized vs public synchronized
	- static synchronized 는 클래스 레벨에 락을 걸기 때문에 public synchronized 를 사용하려는 Thread2 는 Thread1 을 기다려야 함
8. static synchronized method 는 Method area synchronized method 는 Heap 에 저장된다?
9. Thread Pool & Executor?
10. Dependency Injection 이란?
	- Providing dependency of the Bean
	- e.g. Controller contains Service that AppContext will inject, this is for loose coupling
11. Which bean will know what to inject when Autowired
	- AppContext will inject based on type
	- If there are 2 implementations for Autowired interface, it will inject based on the name
12. `@Primary` Annotation?
	- 인터페이스를 구현한 Bean 이 2개 이상일 때 우선 순위를 가지는 Bean
	- `@Qualifier` 로 명시적으로 지정, 사용할 경우 `@Primary` 보다 높은 우선순위
13. How does Java manage memory?
14. What is the top most parent class for Exception?
	- Object -> Throwable -> Exception & Error
15. Deadlock 이란? Spring 에서 Deadlock 이 발생할 수 있는 상황은?
16. Optimistic Lock 과 Pessimistic Lock 의 차이는?
