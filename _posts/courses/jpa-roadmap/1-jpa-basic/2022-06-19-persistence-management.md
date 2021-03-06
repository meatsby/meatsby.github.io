---
title: '[JPA Basic] 3. 영속성 관리 - 내부 동작 방식'
author: meatsby
date: 2022-06-19 10:00:00 +0900
categories: [COURSES, JPA Basic]
tags: [인프런, JPA Roadmap]
---

## 영속성 컨텍스트

---

### JPA 에서 가장 중요한 2가지

JPA 를 사용하면서 가장 중요한 것은 "객체와 RDB 어떻게 매핑할 것인가" 이다.

즉, 객체와 DB 를 어떻게 설계할 것인지에 대한 정적인 관점을 이해하기 위해 Object Relational Mapping 에 대해 이해하는 것이 중요하다.

그리고, 실제 JPA 가 내부적으로 어떻게 동작하는지 이해하기 위해 영속성 컨텍스트에 대해 이해해야 한다.

### 엔티티 매니저 팩토리와 엔티티 매니저

![Screen Shot 2022-06-18 at 2.07.53 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_2.07.53_PM.png)

### 영속성 컨텍스트가 뭐야?

영속성 컨텍스트란 엔티티를 영구 저장하는 환경이라고 생각할 수 있으며, JPA 를 이해하는데 가장 중요한 용어이다.

`EntityManager.persist(entity);` 호출은 단순히 DB 에 저장하는 것이 아닌, 엔티티를 영속성 컨텍스트라는 곳에 저장하겠다는 의미를 가지고 있다.

### 엔티티 매니저? 영속성 컨텍스트?

영속성 컨텍스트는 논리적인 개념으로 눈에 보이지 않는다.

JPA 를 사용하는 것은 엔티티 매니저를 통해서 영속성 컨텍스트에 접근하는 것이라고 생각할 수 있다.

### 엔티티의 생명주기

![Screen Shot 2022-06-18 at 5.03.21 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_5.03.21_PM.png)

엔티티의 생명주기는 총 4가지로 분류될 수 있다.

- 비영속(new/transient) 상태는 영속성 컨텍스트와 전혀 관계가 없는 새로운 상태를 의미
- 영속(managed) 상태는 영속성 컨텍스트에 의해 관리되는 상태를 의미
- 준영속(detached) 상태는 영속성 컨텍스트에 저장되었다가 분리된 상태를 의미
- 삭제(removed) 상태는 삭제된 상태를 의미

### 비영속

![Screen Shot 2022-06-18 at 5.05.14 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_5.05.14_PM.png)

```java
// 객체를 생성한 상태(비영속)
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");
```

### 영속

![Screen Shot 2022-06-18 at 5.06.38 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_5.06.38_PM.png)

```java
// 객체를 생성한 상태(비영속)
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");

EntityManager em = emf.createEntityManager();
em.getTransaction().begin();

// 객체를 저장한 상태(영속)
em.persist(member);
```

### 준영속, 삭제

```java
// 회원 엔티티를 영속성 컨텍스트에서 분리, 준영속 상태
em.detach(member);
```

```java
// 객체를 삭제한 상태(삭제)
em.remove(member);
```

### 영속성 컨텍스트의 이점

- 1차 캐시
- 동일성(Identity) 보장
- 트랜잭션을 지원하는 쓰기 지연(Transactional Write-Behind)
- 변경 감지(Dirty Checking)
- 지연 로딩(Lazy Loading)

### 엔티티 조회, 1차 캐시

![Screen Shot 2022-06-18 at 5.09.57 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_5.09.57_PM.png)

```java
// 엔티티를 생성한 상태(비영속)
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");

// 엔티티를 영속, 1차 캐시에 저장딤
em.persist(member);

// 1차 캐시에서 조회
Member findMember = em.find(Member.class, "member1");

// DB 에서 조회
Member findMember2 = em.find(Member.class, "member2");
```

비지니스가 끝나버리면 영속성 컨텍스트를 지워버리기 때문에, 1차 캐시도 다 날라가서 사실 성능상 큰 도움이 되지는 않는다.

즉, 한 트랜잭션 안에서만 이점이 있다.

### 영속 엔티티의 동일성 보장

```java
Member a = em.find(Member.class, "member1");
Member b = em.find(Member.class, "member1");

System.out.println(a == b); // 동일성 비교 true
```

### 엔티티 등록 시 트랜잭션을 지원하는 쓰기 지연

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
// 엔티티 매니저는 데이터 변경시 트랜잭션을 시작해야 한다.
transaction.begin(); // [트랜잭션] 시작

em.persist(memberA);
em.persist(memberB);
// 여기까지 INSERT SQL을 데이터베이스에 보내지 않는다.

// 커밋하는 순간 데이터베이스에 INSERT SQL을 보낸다.
transaction.commit(); // [트랜잭션] 커밋
```

![Screen Shot 2022-06-18 at 5.13.38 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_5.13.38_PM.png)

`memberA` 가 1차 캐시에 들어가고 INSERT SQL 만들어서 쓰기 지연 SQL 저장소에 넣어둔다.

![Screen Shot 2022-06-18 at 5.14.03 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_5.14.03_PM.png)

`memberB` 가 1차 캐시에 들어가고 INSERT SQL 만들어서 쓰기 지연 SQL 저장소에 넣어둔다.

![Screen Shot 2022-06-18 at 5.14.26 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_5.14.26_PM.png)

커밋되는 시점에 `flush` 후 `commit` 을 진행한다.

이는 JDBC Batch 와 같은 역할을 하고 있다.

Hibernate 에는 size 만큼 모아서 한방에 DB 에 커밋하는 옵션이 존재하기도 한다.

### 엔티티 수정 변경 감지

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
transaction.begin(); // [트랜잭션] 시작

// 영속 엔티티 조회
Member memberA = em.find(Member.class, "memberA");

// 영속 엔티티 데이터 수정
memberA.setUsername("hi");
memberA.setAge(10);

// em.update(member) 이런 코드가 있어야 하지 않을까?

transaction.commit(); // [트랜잭션] 커밋
```

영속성 컨텍스트가 엔티티를 관리하고 있기 때문에 변경을 감지할 수 있다.

변경사항이 있으면 커밋 순간에 UPDATE 쿼리를 만들어서 날린다.

### 어떻게 변경사항을 감지하는 걸까?

![Screen Shot 2022-06-18 at 2.33.13 PM.png](/assets/img/2022-06-19-persistence-management/Screen_Shot_2022-06-18_at_2.33.13_PM.png)

1차 캐시에는 스냅샷이라는 공간이 있다. 값이 1차 캐시에 들어온 최초 시점에 스냅샷을 찍어놓는다.

트랜잭션이 커밋되는 시점에 JPA 가 엔티티와 스냅샷을 비교하여 변경 사항이 존재할 경우 UPDATE SQL 생성 후 커밋을 진행한다.

### 엔티티 삭제

```java
// 삭제 대상 엔티티 조회
Member memberA = em.find(Member.class, “memberA");

em.remove(memberA); // 엔티티 삭제
```

<br>

## 플러시

---

플러시란 영속성 컨텍스트의 변경내용을 DB 에 반영한다는 의미이다.

하지만, 트랜잭션이 일어나기 전에는 DB 에 실제로 반영되지 않는다.

즉, 플러시는 DB 와 동기화를 하는 과정이라고 생각할 수 있으며, 커밋 시점에 실제로 DB 에 반영된다.

### 플러시 발생

플러시는 DB 트랜잭션이 커밋될 때 자동적으로 발생한다.

이는 영속성 컨텍스트의 기능 중 하나인 변경 감지를 통해 수정된 엔티티의 정보를 쓰기 지연 SQL 저장소에 저장해둔다.

이후, 플래시가 발생하면 쓰기 지연 SQL 저장소의 쿼리를 DB 에 전송

### 영속성 컨텍스트를 플러시하는 방법

영속성 컨텍스트를 플러시하는 방법은 총 3가지가 존재한다.

- `em.flush()` 를 통한 직접 호출 (거의 사용하지 않음)
- 트랜잭션 커밋을 통한 자동 호출
- JPQL 쿼리 실행을 통한 자동 호출

플러시를 하면 1차 캐시가 지워지는 것은 아니고, 쓰기 지연 SQL 저장소에 있는 쿼리가 DB 에 동기화된다는 의미로 생각할 수 있다.

### JPQL 쿼리 실행 시 플러시가 자동으로 호출되는 이유

```java
em.persist(memberA);
em.persist(memberB);
em.persist(memberC);

// 중간에 JPQL 실행
query = em.createQuery("select m from Member m", Member.class);
List<Member> members= query.getResultList();
```

영속성 컨텍스트에 있는 데이터를 JPQL 쿼리로 조회하려고 하면 DB 에 없기 때문에 문제가 될 수 있다.

그래서 JPQL 쿼리 실행 시 자동으로 플러시 되도록 설정되어 있다.

### 플러시 모드 옵션

```java
em.setFlushMode(FlushModeType.AUTO);
// 커밋이나 쿼리를 실행할 때 플러시 (기본값)

em.setFlushMode(FlushModeType.COMMIT);
// 커밋할 때만 플러시, 크게 도움이 되지 않음, 그냥 오토를 쓰는 것이 좋음
```

플러시는 영속성 컨텍스트의 변경내용을 DB 에 동기화하는 것일 뿐, 영속성 컨텍스트를 비우지 않는다.

트랜잭션이라는 작업 단위가 중요하기 때문에, 커밋 직전에만 플러시를 통해 동기화 해주면 된다.

<br>

## 준영속 상태

---

준영속 상태란, 영속 상태의 엔티티가 영속성 컨텍스트에서 분리(detached)되는 것을 의미한다.

준영속 상태가 된 엔티티는 영속성 컨텍스트가 제공하는 Dirty-Checking 과 같은 기능을 사용하지 못한다.

`em.persist()` 나 `em.find()` 를 사용하면 엔티티가 영속 상태로 영속성 컨텍스트에 등록된다.

### 준영속 상태로 만드는 방법

- `em.detach(entity);` 를 통해 특정 엔티티만 준영속 상태로 전환
- `em.clear();` 를 통해 영속성 컨텍스트를 완전히 초기화
- `em.close();` 를 통해 영속성 컨텍스트를 종료