---
title: Spring Basic
date: 2022-06-20 21:48:21 +0800
status: Done
draft: false
tags:
  - Spring
---
## 스프링 웹 개발 기초
---
### 웹을 개발하는 3가지 방법
- 정적 컨텐츠
- MVC와 템플릿 엔진
- API

### 정적 컨텐츠
![[Pasted image 20250127215414.png]]
`resources/static` 경로에 정적 html 컨텐츠를 저장한다. `resources/static/hello-static.html`

이후 `http://localhost:8080/hello-static.html` 접속 시 저장한 컨텐츠에 접근할 수 있다.

### MVC와 템플릿 엔진
![[Pasted image 20250127215441.png]]
```java
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam("name") String name, Model model) {
    model.addAttribute("name", name);
    return "hello-template";
}
```

`Controller` 에 `Mapping` 된 경로를 통해 해당 요청을 수행한다.

`model` 에 요청 시 전달 받은 인자 `RequestParam` 을 추가하여 `hello-template` 에 적용할 수 있다.

### API
![[Pasted image 20250127215538.png]]
- `@ResponseBody` 사용 시 `viewResolver` 대신, `HttpMessageConverter` 가 동작한다.

### @ResponseBody 문자 반환
```java
@GetMapping("hello-string")
@ResponseBody
public String helloString(@RequestParam("name") String name) {
    return "hello " + name;
}
```
- `@ResponseBody` 를 사용하여 HTTP Body 에 문자 내용을 직접 반환한다.
    - `StringHttpMessageConverter` 가 기본으로 동작한다.

### @ResponseBody 객체 반환
```java
@GetMapping("hello-api")
@ResponseBody
public Hello helloApi(@RequestParam("name") String name) {
    Hello hello = new Hello();
    hello.setName(name);
    return hello;
}
```
- `@ResponseBody` 를 사용하여 객체를 반환 시, 객체가 JSON 으로 변환된다.
    - `MappingJackson2HttpMessageConverter` 가 기본으로 동작한다.

## Spring Bean 과 의존관계
---
### Component Scan 과 자동 의존관계 설정
```java
@Controller
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {

         this.memberService = memberService;
    }
}
```
- 생성자를 통해 의존관계를 외부에서 넣어준다. 이를 의존성 주입 (Dependency Injection) 이라고 한다.
- 생성자가 1개인 경우 `@Autowired` 를 생략할 수 있다.
- 스프링은 스프링 컨테이너에 스프링 빈을 등록할 때, 기본으로 싱글톤으로 등록한다. 따라서 같은 스프링 빈이면 모두 같은 인스턴스다.

### Component Scan 원리
- `@Component` 애너테이션이 있으면 스프링 빈이 자동 등록된다.
- `@Controller` `@Service` `@Repository` 내부에 `@Component` 를 포함하기에 빈으로 자동 등록된다.

### 자바 코드로 직접 스프링 빈 등록
```java
@Configuration
public class SpringConfig {

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
      return new MemoryMemberRepository();
    }
}
```
- DI 는 필드 주입, setter 주입, 생성자 주입 총 3가지가 존재한다. 의존관계가 실행중에 동적으로 변하는 경우는 거의 없기에 생성자 주입을 권장한다.

## Web MVC 개발
---
### 회원 웹 기능 - 홈 화면 추가
```java
package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

     @GetMapping("/")
     public String home() {
         return "home";
     }
}
```
`/` 경로로 요청이 들어올 경우, 위 GetMapping 을 통해 요청을 컨트롤러가 받아드려 로직을 수행한다.
컨트롤러는 정적 파일보다 우선순위가 높기 때문에, 요청이 들어왔을 때 컨트롤러를 먼저 조회하여 해당 요청을 받을 수 있는 컨트롤러가 존재하는지 확인한다.
때문에, 기존에 static 안에 있는 `index.html` 이 반환되지 않고, templates 에서 `home.html` 을 렌더링하여 응답한다.

### 회원 웹 기능 - 등록
```java
@Controller
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping(value = "/members/new")
    public String createForm() {
        return "members/createMemberForm";
    }

    @PostMapping(value = "/members/new")
    public String create(MemberForm form) {
        Member member = new Member();
        member.setName(form.getName());

        memberService.join(member);

        return "redirect:/";
    }
}
```
회원 등록하는 컨트롤러를 위와 같이 구현한다.
`/members/new` 경로로 요청이 들어올 경우, 위 컨트롤러가 요청을 받게 되고, templates 안에 있는 members 디렉토리의 `createMemberForm.html` 을 렌더링하여 응답한다.

```java
package hello.hellospring.controller;

public class MemberForm {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
회원 등록 페이지가 띄워진 상태에서 POST 요청을 보내게 된다면, PostMapping 을 통해 요청을 받게된다.
Form 으로 전달된 데이터를 객체로 매핑하여 컨트롤러가 받게되고, 이를 도메인 객체로 변경하여 service 레이어에게 전달한다.
모든 회원 등록 로직이 수행된 이후 `redirect:/` 를 통해 홈 화면으로 redirect 한다.

### 회원 웹 기능 - 조회
```java
@GetMapping(value = "/members")
public String list(Model model) {

    List<Member> members = memberService.findMembers();
    model.addAttribute("members", members);
    return "members/memberList";
}
```
`/members` 경로로 요청이 들어왔을 경우에 회원 목록을 조회하는 기능을 위와 같이 구현할 수 있다.
`memberService.findMembers();` 를 통해 멤버 리스트를 받아온 후 model 의 attribute 에 add 해준다.
이후 templates 안에 있는 members 디렉토리의 `memberList.html` 을 렌더링하여 응답한다.

## Spring DB 접근 기술
---
- JDBC 는 SQL 로 서버랑 DB 연결하는 기술이다.
- JdbcTemplate 을 통해 SQL 를 편리하게 날릴 수 있다.
- JPA 기술이 등록, 수정, 삭제 쿼리를 만들어서 날려준다.

### 순수 JDBC
- `build.gradle` 에서 jdbc, h2 DB 관련 라이브러리를 추가한다.
    ```java
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    runtimeOnly 'com.h2database:h2'
    ```
    
- `application.properties` 에서 스프링 부트 DB 연결 설정을 추가한다.
    ```java
    spring.datasource.url=jdbc:h2:tcp://localhost/~/test
    spring.datasource.driver-class-name=org.h2.Driver
    spring.datasource.username=sa
    ```
    

### Jdbc Repository 구현 후 스프링 설정 변경
```java
@Configuration
public class SpringConfig {

    private final DataSource dataSource;

    public SpringConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        // return new MemoryMemberRepository();
        return new JdbcMemberRepository(dataSource);
    }
}
```
- 기존에 사용하던 `MemoryMemberRepository` 를 `JdbcMemberRepository` 로 변경한다.
- `DataSource` 는 DB Connection 을 획득할 때 사용하는 객체다.
- 스프링 부트는 DB Connection 정보를 바탕으로 `DataSource` 를 생성하고 스프링 빈으로 만들어 DI 를 받을 수 있다.
- `MemberService` 는 인터페이스인 `MemberRepository` 를 의존하고 있기 때문에 `MemberRepository` 의 구현체를 모두 참조할 수 있다.
- 변경된 `@Configuration` 을 바탕으로 스프링 컨테이너 내부에서 DI 를 `memberRepository` 로 변경할 수 있다.
- OCP(Open-Closed Principle, 개방-폐쇄 원칙)
    - 확장에는 열려있고, 수정, 변경에는 닫혀있다.
    - 객체지향 프로그래밍의 다형성을 통해 OCP 원칙을 지켜낼 수 있다.
- 스프링의 DI 를 사용하여 기존 코드를 전혀 손대지 않고, **설정만으로 구현 클래스를 변경**할 수 있다.

### 스프링 통합 테스트
- 테스트 클래스 단위에 `@SpringBootTest` 를 추가하여 스프링 컨테이너와 테스트를 함께 실행한다.
- 테스트 클래스 단위에 `@Transactional` 을 추가하면, 테스트 시작 전에 Transaction 을 시작하고, 테스트 완료 후에 항상 롤백한다.

### 스프링 JdbcTemplate
- 순수 JDBC 에서 중복되는 코드들을 제거하여 간단하게 DB 에 접근할 수 있는 코드를 작성하는데 도움을 주는 template 이다.

```java
public JdbcTemplateMemberRepository(DataSource dataSource) {
    jdbcTemplate = new JdbcTemplate(dataSource);
}
```
- 스프링 컨테이너의 DI 를 통해 `JdbcTemplate` 에 `DataSource` 를 주입하여 사용한다.

```java
SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
jdbcInsert.withTableName("member").usingGeneratedKeyColumns("id");

Map<String, Object> parameters = new HashMap<>();
parameters.put("name", member.getName());

Number key = jdbcInsert.executeAndReturnKey(new MapSqlParameterSource(parameters));
member.setId(key.longValue());
```
- `SimpleJdbcInsert` 를 통해 `INSERT` 쿼리문과 함께 자동생성되는 id 값을 반환 받을 수 있다.

### JPA
JPA 를 통해 기본적인 SQL 을 JPA 가 만들어 실행하고, SQL 중심 설계에서 객체 중심 설계로 개발을 진행할 수 있다. 즉, JPA 를 통해 개발 생산성을 크게 높일 수 있다.
JPA 는 인터페이스이며 구현체로 Hibernate 를 많이 사용한다.
JPA 는 ORM 기술로서 Object Relational Mapping 의 약자이다.
즉, 객체와 RDB 를 매핑해주는 기술이다.

### `build.gradle` 에 dependencies 추가
```java
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.springframework.boot:spring-boot-starter-web'

    // implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'

    runtimeOnly 'com.h2database:h2'

    testImplementation('org.springframework.boot:spring-boot-starter-test') {
        exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
    }
}
```
`spring-boot-starter-data-jpa` 내부에 jdbc 관련 라이브러리를 포함하기 때문에 jdbc 는 제거해도 된다.

### `application.properties` 에 설정 추가
```java
spring.datasource.url=jdbc:h2:tcp://localhost/~/test
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=none
```
- `show-sql` 설정을 통해 JPA 가 생성하는 SQL 을 출력한다.
- `ddl-auto` JPA 는 테이블을 자동으로 생성하는 기능을 제공하는데, `none` 을 설정해주면 해당 기능을 사용하지 않게된다.
    - `create` 설정 시 엔티티 정보를 바탕으로 테이블도 직접 생성해준다.

### JPA 엔티티 매핑
```java
package hello.hellospring.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
`@Entity` 를 통해 객체가 엔티티라는 것을 명시한다.
`@Id` 를 통해 해당 필드가 DB 의 Id 값이라고 명시해준다.
`@GeneratedValue(strategy = GenerationType.IDENTITY)` 를 통해 AUTO_INCREMENT 되는 값이라는 것을 명시해준다.

### JPA 회원 Repository
```java
package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaMemberRepository implements MemberRepository {

    private final EntityManager em;

    public JpaMemberRepository(EntityManager em) {
         this.em = em;
    }

    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    public Optional<Member> findById(Long id) {
        Member member = em.find(Member.class, id);
        return Optional.ofNullable(member);
    }

    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }

    public Optional<Member> findByName(String name) {
        List<Member> result = em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();

        return result.stream().findAny();
    }
}
```
Spring DI 를 통해 EntityManager 를 주입해준다. 주입된 em 을 통해 모든 기능을 구현할 수 있다.
JPA 는 조회 로직이 Id 값으로 찾는 기능만 제공하기 때문에, `findByName(String name)` 와 같은 로직을 수행하기 위해선 JPQL 이라는 객체 지향 쿼리를 통해 JPA 를 사용할 수 있다.
Spring Data 를 사용하면 JPQL 도 사용하지 않을 수 있다.

### Service 계층에 Transaction 추가
```java
import org.springframework.transaction.annotation.Transactional

@Transactional
public class MemberService {}
```
모든 데이터 변경이 Transaction 안에서 실행되어야 하기 때문에 `@Transactional` 애너테이션이 필요하다.

### JPA 를 사용하도록 스프링 설정 변경
```java
package hello.hellospring;

import hello.hellospring.repository.*;
import hello.hellospring.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.persistence.EntityManager;
import javax.sql.DataSource;

@Configuration
public class SpringConfig {

    private final DataSource dataSource;
    private final EntityManager em;

    public SpringConfig(DataSource dataSource, EntityManager em) {
        this.dataSource = dataSource;
        this.em = em;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        // return new MemoryMemberRepository();
        // return new JdbcMemberRepository(dataSource);
        // return new JdbcTemplateMemberRepository(dataSource);
        return new JpaMemberRepository(em);
    }
}
```
EntityManager 를 DI 받기 위해서 SpringConfig 클래스에서 추가적인 설정을 해주어야 한다.

### Spring Data JPA
Spring Boot 와 JPA 만 사용해도 개발 생산성이 많이 증가하며, 개발해야 할 코드도 확연히 줄어든다.
Spring Data JPA 를 사용하면, Repository 구현 클래스 없이 인터페이스 만으로 개발을 완료할 수 있다.
Spring Data JPA 는 JPA 를 편리하게 해주는 도구일 뿐이기 때문에 JPA 를 먼저 학습해야한다.

### 스프링 데이터 JPA 회원 Repository
```java
package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaMemberRepository extends JpaRepository<Member, Long>, MemberRepository {

    @Override
    Optional<Member> findByName(String name);
}
```
`JpaRepository` 와 사용할 Repository 인 `MemberRepository` 를 상속받은 새로운 인터페이스를 구현한 후 기존에 JPQL 로 구현한 메서드를 Override 해주면 끝이다.
Spring Data 가 해당 인터페이스를 찾아 메서드를 알아서 만들어 준다.

### 스프링 데이터 JPA 회원 Repository 를 사용하도록 설정 변경
```java
package hello.hellospring;

import hello.hellospring.repository.MemberRepository;
import hello.hellospring.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final MemberRepository memberRepository;

    public SpringConfig(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }
}
```
해당 설정을 통해 Spring 이 알아서 `SpringDataJpaMemberRepository` 를 찾아 DI 해준다.
주의할 점은, `SpringDataJpaMemberRepository` 외에 다른 구현체에 `@Repository` 애너테이션이 추가되어 있으면, Bean 이 2가지가 등록되어 있기 때문에 컴파일 에러가 발생한다.

### 스프링 데이터 JPA 제공 기능
스프링 데이터 JPA 는 인터페이스를 통해 기본적인 CRUD 를 제공한다. 또한, `findByName()` `findByEmail()` 처럼 메서드 이름 만으로도 JPQL 을 자동으로 생성하여 조회 기능을 제공한다.
추가적으로, `PagingAndSortingRepository` 를 통해 페이징 기능도 자동으로 제공한다.
실무에서는 JPA 와 스프링 데이터 JPA 를 기본으로 사용하고, 복잡한 동적 쿼리는 Querydsl 이라는 라이브러리를 사용한다. Querydsl 을 사용하면 자바 코드로 쿼리도 안전하게 작성할 수 있고, 동적 쿼리도 편리하게 작성할 수 있다. 이 조합으로 해결하기 어려운 쿼리는 JPA 가 제공하는 네이티브 쿼리를 사용하거나, JdbcTemplate 을 사용할 수 있다.

## References
---
- 
