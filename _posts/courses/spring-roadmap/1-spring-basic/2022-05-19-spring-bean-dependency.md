---
title: '[Spring Basic] 3. 스프링 빈과 의존관계'
author: meatsby
date: 2022-05-19 10:00:00 +0900
categories: [COURSES, Spring Basic]
tags: [인프런, Spring Roadmap]
---

## Component Scan 과 자동 의존관계 설정

---

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

<br>

## 자바 코드로 직접 스프링 빈 등록

---

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