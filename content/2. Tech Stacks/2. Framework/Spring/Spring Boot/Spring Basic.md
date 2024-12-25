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

## References
---
- 
