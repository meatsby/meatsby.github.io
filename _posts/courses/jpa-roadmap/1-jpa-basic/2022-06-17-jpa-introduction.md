---
title: '[JPA Basic] 1. JPA 소개'
author: meatsby
date: 2022-06-17 10:00:00 +0900
categories: [COURSES, JPA Basic]
tags: [인프런, JPA Roadmap]
---

## SQL 중심적인 개발의 문제점

---

### JPA 와 모던 자바 데이터 저장 기술

현대 애플리케이션은 객체 지향 언어를 주로 사용하고, 데이터베이스는 관계형 DB 를 사용한다. 즉, 지금 시대는 객체를 관계형 DB 에 저장해서 사용하고 있다.

### SQL 중심적인 개발의 문제점

무한 반복되는 지루한 CRUD 코드를 작성해야 하며, 객체 속성이 추가될 때 마다 아래와 같이 SQL 쿼리문이 자주 변경된다.

```java
public class Member {
    private String memberId;
    private String name;
    private String tel;
}
```

```sql
INSERT INTO MEMBER(MEMBER_ID, NAME, TEL) VALUES
SELECT MEMBER_ID, NAME, TEL FROM MEMBER M
UPDATE MEMBER SET ... TEL = ?
```

애초에 객체 지향과 관계형 데이터베이스의 사상은 완전히 다르다.

관계형 데이터베이스는 데이터를 정규화해서 보관하는 것이 목표인 반면, 객체 지향 프로그래밍은 속성과 기능을 잘 묶어서 캡슐화하여 사용하는 것이 목표다.

### 그럼 왜 굳이 SQL?

객체를 영구 보관하는 다양한 저장소가 존재하지만, 그 중에 가장 현실적인 대안이 관계형 데이터베이스였을 뿐이다.

즉, SQL 에 의존적인 개발을 피하기 어렵다.

### 객체와 관계형 DB 의 차이

```
1. 상속
2. 연관관계
3. 데이터 타입
4. 데이터 식별 방법
```

객체와 관계형 DB 에는 위와 같은 차이점들이 있는데, 간단히 상속과 연관관계를 살펴보자.

객체 지향 프로그래밍에는 상속 관계가 존재하지만, 관계형 DB 에는 없다고 볼 수 있다.

연관관계 또한, 객체 지향 프로그래밍에서는 getter 를 통해 연관된 객체를 가져오지만, 관계형 DB 에서는 PK, FK 등으로 연관된 데이터를 가져온다.

### 상속

![Screen Shot 2022-06-17 at 9.26.24 PM.png](/assets/img/2022-06-17-jpa-introduction/Screen_Shot_2022-06-17_at_9.26.24_PM.png)

객체의 상속 관계 설계를 위와 같이 만들어냈다고 가정해보자.

위와 같이 설계된 객체를 DB 에 저장하기 위해선 어떻게 해야할까?

객체의 상속 관계와 그나마 유사한 슈퍼타입, 서브타입 모델로 DB 에 저장한다.

테이블을 설계하고 객체를 저장하고 조회하는 과정을 살펴보자.

### Album 객체를 저장하려면?

```
1. 객체 분해
2. INSERT INTO ITEM …
3. INSERT INTO ALBUM …
```

여기까지는 괜찮은 것 같다.

### Album 객체를 조회하려면?

```
1. 각각의 테이블에 따른 JOIN SQL 작성…
2. 각각의 객체 생성…
```

상상만 해도 복잡하다.

그래서 DB 에 저장할 객체에는 상속 관계를 사용하지 않는다.

### DB 가 아니라 자바 컬렉션에 저장한다면?

```java
list.add(album);
Album album = list.get(albumId);

// 부모 타입으로 조회 후 다형성 활용도 가능
Item item = list.get(albumId);
```

문득 자바 컬렉션을 사용한다면 훨씬 간편할 것 같다는 생각이 살살 든다.

### 연관관계

이번엔 OOP 와 RDB 의 연관관계에 어떤 차이점이 있는지 살펴보자.

![Screen Shot 2022-06-17 at 10.14.43 PM.png](/assets/img/2022-06-17-jpa-introduction/Screen_Shot_2022-06-17_at_10.14.43_PM.png)

```java
member.getTeam();
```

객체는 참조를 사용한다. 객체는 단방향 참조기 때문에 `Team` 으로 `Member` 를 찾을 수 없다.

![Screen Shot 2022-06-17 at 10.14.57 PM.png](/assets/img/2022-06-17-jpa-introduction/Screen_Shot_2022-06-17_at_10.14.57_PM.png)

```sql
JOIN ON M.TEAM_ID = T.TEAM_ID
```

테이블은 외래 키를 사용한다. 때문에 `Team` 으로 `Member` 를 찾을 수 있다.

즉, 테이블은 양방향으로 찾을 수 있다.

### 객체를 테이블에 맞추어 모델링

앞서 예시로 들었던 객체를 DB 에 저장하려고 할 때, 테이블 설계에 맞춰 객체를 모델링하여 아래와 같이 객체를 저장할 수 있을 것이다.

```java
class Member {
    String id;
    Long teamId;
    String username;
}
```

```java
class Team {
    Long id;
    String name;
}
```

```sql
INSERT INTO MEMBER(MEMBER_ID, TEAM_ID, USERNAME) VALUES ...
```

하지만, `Member` 내부에 `teamId` 가 있는 것이 뭔가 객체 지향적이지 않은 것 같다.

객체 지향적으로 모델링을 변경해보자.

### 객체 지향적인 모델링

```java
class Member {
    String id;
    Team team;
    String username;

    Team getTeam() {
        return team;
    }
}
```

```java
class Team {
    Long id;
    String name;
}
```

```sql
// member.getTeam().getId() 로 TEAM_ID 를 가져옴

INSERT INTO MEMBER(MEMBER_ID, TEAM_ID, USERNAME) VALUES ...
```

모델링을 객체지향적으로 변경하자, SQL 문에서 TEAM_ID 를 요구할 때, `member.getTeam().getId()` 와 같은 코드가 필요해진다.

여기까진 괜찮은 것 같다.

### 객체 모델링 조회

하지만 조회를 할 경우에 문제가 발생한다.

```sql
SELECT M.*, T.*
  FROM MEMBER M
  JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID
```

```java
public Member find(String memberId) {
    //SQL 실행 ...

    Member member = new Member();
    //데이터베이스에서 조회한 회원 관련 정보를 모두 입력

    Team team = new Team();
    //데이터베이스에서 조회한 팀 관련 정보를 모두 입력

    //회원과 팀 관계 설정
    member.setTeam(team); //**
    return member;
}
```

JOIN 구문이 포함된 SQL 쿼리를 통해 모든 데이터를 가져와서 각각 객체를 생성하여 관계를 설정해주어야한다.

자바 컬렉션 API 가 그리워지는 순간이다.

### 객체 모델링, 자바 컬렉션에 관리

```java
list.add(member);

Member member = list.get(memberId);
Team team = member.getTeam();
```

위 처럼 자바 컬렉션 API 를 사용한다면 정말 쉬울텐데…

### 객체 그래프 탐색

![Screen Shot 2022-06-17 at 9.48.05 PM.png](/assets/img/2022-06-17-jpa-introduction/Screen_Shot_2022-06-17_at_9.48.05_PM.png)

객체는 자유롭게 객체 그래프를 탐색할 수 있어야 한다.

하지만 처음 실행하는 SQL 에 따라 탐색 범위가 결정된다.

예를 들어 아래와 같은 SQL 을 통해 객체를 가져온다고 가정해보자.

```sql
SELECT M.*, T.*
  FROM MEMBER M
  JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID
```

객체 생성 시점에 `team` 필드만 채워 넣었기 때문에 `member.getOrder()` 호출 시 `null` 값이 반환된다.

### 엔티티 신뢰 문제

위와 같은 상황은 엔티티에 대한 신뢰 문제를 발생할 수 있다.

예를 들어 아래와 같은 코드가 있다고 가정해보자.

```java
class MemberService {
    ...
    public void process() {
        Member member = memberDAO.find(memberId);
        member.getTeam(); //???
        member.getOrder().getDelivery(); // ???
    }
}
```

다른 팀원 누군가가 개발한 `memberDAO.find()` 를 통해 `member` 를 조회할 경우, memberDAO 내부에서 어떤 쿼리가 실행되었고, 어떤 데이터를 조립하였는지 확인하지 않는다면, 반환된 엔티티를 신뢰할 수 없다.

### 모든 객체를 미리 로딩할 수는 없을까?

```java
//Member만 조회
memberDAO.getMember();

//Member와 Team 조회
memberDAO.getMemberWithTeam();

//Member,Order,Delivery 조회
memberDAO.getMemberWithOrderWithDelivery();
```

상황에 따라 동일한 회원 조회 메서드를 여러벌 생성할 수 밖에 없다.

### 계층형 아키텍처에서 진정한 의미의 계층 분할이 어렵다.

Layered Architecture 에서는 그 다음 계층에서 신뢰하고 사용해야 한다.

물리적으로는 계층이 `service` 와 `dao` 로 나뉘어져 있지만, 논리적으론 어느정도 연결되어 있다. 즉, dependency 가 좋지 않다.

### DB 조회와 자바 컬렉션 조회 비교하기

```java
String memberId = "100";
Member member1 = memberDAO.getMember(memberId);
Member member2 = memberDAO.getMember(memberId);

member1 == member2; //다르다.

class MemberDAO {

    public Member getMember(String memberId) {
        String sql = "SELECT * FROM MEMBER WHERE MEMBER_ID = ?";
        ...
        //JDBC API, SQL 실행
        return new Member(...);
    }
}
```

```java
String memberId = "100";
Member member1 = list.get(memberId);
Member member2 = list.get(memberId);

member1 == member2; //같다.
```

### 객체답게 모델링 할수록 매핑 작업만 늘어난다…

SQL 에 맞춰서 객체를 데이터 전송용으로만 설계를 할 수 밖에 없다.

객체 지향적으로 설계를 할 순 있어도, ROI 가 안 나온다.

### 객체를 자바 컬렉션에 저장 하듯이 DB 에 저장할 순 없을까?

그래서 등장한 것이 바로 JPA(Java Persistence API) 이다.

<br>

## JPA 소개

---

### JPA 란?

Java Persistence API 의 약자이며, Java 진영의 ORM 기술 표준이다.

### ORM 이 뭐야?

Object-Relational Mapping 의 약자로, 객체는 객체대로 설계하고, 관계형 DB 는 관계형 DB 대로 설계하여 객체와 관계형 DB 중간에서 서로를 매핑해주는 프레임워크이다.

대중적인 언어에는 대부분 ORM 기술이 존재한다.

### JPA 는 애플리케이션과 JDBC 사이에서 동작

![Screen Shot 2022-06-17 at 10.48.27 PM.png](/assets/img/2022-06-17-jpa-introduction/Screen_Shot_2022-06-17_at_10.48.27_PM.png)

개발자가 아닌 JPA 가 JDBC 를 호출하여 SQL 을 생성하고 DB 와 소통하는 방식으로 동작한다.

### JPA 동작 - 저장

![Screen Shot 2022-06-17 at 10.50.17 PM.png](/assets/img/2022-06-17-jpa-introduction/Screen_Shot_2022-06-17_at_10.50.17_PM.png)

### JPA 동작 - 조회

![Screen Shot 2022-06-17 at 10.52.12 PM.png](/assets/img/2022-06-17-jpa-introduction/Screen_Shot_2022-06-17_at_10.52.12_PM.png)

### JAP 는 표준 명세

JPA 는 인터페이스의 모음이다. JPA 2.1 표준 명세를 구현한 여러 구현체가 존재하는데, 그중 제일 유명한 3가지 구현체가 하이버네이트, EclipseLink, DataNucleus 이다. 이 중 하이버네이트가 가장 많이 쓰인다.

### JPA 를 왜 사용해야 할까?

- SQL 중심적인 개발에서 객체 중심으로 개발
- 생산성
- 유지보수
- 패러다임의 불일치 해결
- 성능
- 데이터 접근 추상화와 벤더 독립성
- 표준

위와 같이 여러 장점이 있는데 이 중 중요한 요소들을 간단히 살펴보자.

### 생산성 - JPA 와 CRUD

- 저장 - `jpa.persist(member)`
- 조회 - `Member member = jpa.find(memberId)`
- 수정 - `member.setName(”변경할 이름")`
- 삭제 - `jpa.remove(member)`

위처럼 SQL 구문 없이 자바 컬렉션을 사용하는 것처럼 사용할 수 있다.

### 유지보수 - JPA 필드만 추가하면 됨, SQL 은 JPA 가 처리

기존에 객체 속성이 추가될 때 쿼리문을 모두 수정해주어야하지만, JPA 를 사용한다면, 객체 속성과 DB 컬럼만 추가하여 해결할 수 있다.

즉, 쿼리를 수정할 필요가 없어진다.

### JPA 와 상속 - 저장

JPA 사용 시 데이터를 저장하는 과정에서 개발자가 할 일이 아래와 같아지고,

```java
jpa.persist(album);
```

나머지 SQL 쿼리 생성과 같은 일들은 JPA 가 알아서 처리한다.

```sql
INSERT INTO ITEM ...
INSERT INTO ALBUM ...
```

### JPA 와 상속 - 조회

조회도 마찬가지로 개발자가 할 일이 아래와 같아지고,

```java
Album album = jpa.find(Album.class, albumId);
```

나머진 JPA 가 알아서 처리한다.

```sql
SELECT I.*, A.*
 FROM ITEM I
 JOIN ALBUM A ON I.ITEM_ID = A.ITEM_ID
```

### JPA 와 연관관계, 객체 그래프 탐색

아래와 같은 코드로 연관관계 저장 시,

```java
member.setTeam(team);
jpa.persist(member);
```

이후 조회하였을 때 객체 그래프 탐색이 정상적으로 동작한다.

```java
Member member = jpa.find(Member.class, memberId);
Team team = member.getTeam();
```

### 신뢰할 수 있는 엔티티, 계층

```java
class MemberService {
    ...
    public void process() {
        Member member = memberDAO.find(memberId);
        member.getTeam(); //자유로운 객체 그래프 탐색
        member.getOrder().getDelivery();
    }
}
```

위처럼 SQL 쿼리를 직접 작성하여 조회할 때 보다 자유롭게 객체 그래프를 탐색할 수 있기에, 신회할 수 있는 엔티티를 사용할 수 있다.

### JPA 와 비교하기

뿐만 아니라, 동일한 트랜잭션에서 조회한 엔티티는 같음을 보장한다.

```java
String memberId = "100";
Member member1 = jpa.find(Member.class, memberId);
Member member2 = jpa.find(Member.class, memberId);

member1 == member2; //같다
```

### JPA의 성능 최적화 - 1차 캐시와 동일성(identity) 보장

같은 트랜잭션 안에서는 같은 엔티티를 반환하여 약간의 조회 성능을 향상하고, DB Isolation Level 이 Read Commit 이어도 애플리케이션에서는 Repeatable Read 를 보장한다.

```java
String memberId = "100";
Member member1 = jpa.find(Member.class, memberId); // SQL
Member member2 = jpa.find(Member.class, memberId); // 캐시

member1 == member2; //같다
```

위처럼 캐시를 통해 SQL 을 1번만 실행해도 된다.

### JPA의 성능 최적화 - 트랜잭션을 지원하는 INSERT 지연

```java
transaction.begin(); // [트랜잭션] 시작

em.persist(memberA);
em.persist(memberB);
em.persist(memberC);
//여기까지 INSERT SQL을 데이터베이스에 보내지 않는다.

//커밋하는 순간 데이터베이스에 INSERT SQL을 모아서 보낸다.
transaction.commit(); // [트랜잭션] 커밋
```

위처럼 트랜잭션을 커밋할 때까지 INSERT SQL 을 모아서 JDBC BATCH SQL 기능을 사용해 한번에 SQL 을 전송한다.

### JPA의 성능 최적화 - 트랜잭션을 지원하는 UPDATE 지연

```java
transaction.begin(); // [트랜잭션] 시작

changeMember(memberA);
deleteMember(memberB);
비즈니스_로직_수행(); //비즈니스 로직 수행 동안 DB 로우 락이 걸리지 않는다.

//커밋하는 순간 데이터베이스에 UPDATE, DELETE SQL을 보낸다.
transaction.commit(); // [트랜잭션] 커밋
```

위처럼 UPDATE, DELETE로 인한 로우(ROW)락 시간을 최소화하고, 트랜잭션 커밋 시 UPDATE, DELETE SQL 실행하고, 바로 커밋한다.

### JPA의 성능 최적화 - 지연 로딩과 즉시 로딩

```java
Member member = memberDAO.find(memberId);
// SELECT * FROM MEMBER 실행

Team team = member.getTeam();

String teamName = team.getName();
// SELECT * FROM TEAM 실행
```

지연 로딩은 객체가 실제 사용될 때 로딩되어 사용할 수 있도록 최적화 된다.

```java
Member member = memberDAO.find(memberId);
// SELECT M.*, T.* FROM MEMBER JOIN TEAM … 실행

Team team = member.getTeam();
String teamName = team.getName();
```

즉시 로딩은 JOIN SQL 로 한번에 연관된 객체까지 미리 조회하여 사용할 수 있도록 최적화 된다.

### ORM 은 객체와 RDB 두 기둥 위에 있는 기술

ORM 을 잘 사용하기 위해선 OOP 와 RDB 에 대한 지식 모두 중요하다.

OOP 언어는 RDB 에 비해 변할 가능성이 높기 때문에 RDB 에 대한 공부를 꾸준히 하자!