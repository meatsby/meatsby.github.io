---
title: '[Spring Basic] 4. 회원 관리 예제 - 웹 MVC 개발'
author: meatsby
date: 2022-05-23 10:00:00 +0900
categories: [COURSES, Spring Basic]
tags: [인프런, Spring Roadmap]
---

## 회원 웹 기능 - 홈 화면 추가

---

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

<br>

## 회원 웹 기능 - 등록

---

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

<br>

## 회원 웹 기능 - 조회

---

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