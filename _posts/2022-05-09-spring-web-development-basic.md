---
title: '[Spring] 스프링 웹 개발 기초'
author: meatsby
date: 2022-05-08 10:00:00 +0900
categories: [Spring]
tags: [인프런, 김영한 강의]
---

웹을 개발하는 3가지 방법

- 정적 컨텐츠
- MVC와 템플릿 엔진
- API

<br>

## 정적 컨텐츠

---

![Screen Shot 2022-05-09 at 7.16.02 PM.png](/assets/img/2022-05-09-spring-web-development-basic/Screen_Shot_2022-05-09_at_7.16.02_PM.png)

`resources/static` 경로에 정적 html 컨텐츠를 저장한다. `resources/static/hello-static.html`

이후 `http://localhost:8080/hello-static.html` 접속 시 저장한 컨텐츠에 접근할 수 있다.

<br>

## MVC와 템플릿 엔진

---

![Screen Shot 2022-05-09 at 7.17.26 PM.png](/assets/img/2022-05-09-spring-web-development-basic/Screen_Shot_2022-05-09_at_7.17.26_PM.png)

```java
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam("name") String name, Model model) {
    model.addAttribute("name", name);
    return "hello-template";
}
```

`Controller` 에 `Mapping` 된 경로를 통해 해당 요청을 수행한다.

`model` 에 요청 시 전달 받은 인자 `RequestParam` 을 추가하여 `hello-template` 에 적용할 수 있다.

<br>

## API

---

![Screen Shot 2022-05-09 at 7.22.57 PM.png](/assets/img/2022-05-09-spring-web-development-basic/Screen_Shot_2022-05-09_at_7.22.57_PM.png)

- `@ResponseBody` 사용 시 `viewResolver` 대신, `HttpMessageConverter` 가 동작한다.

<br>

## @ResponseBody 문자 반환

```java
@GetMapping("hello-string")
@ResponseBody
public String helloString(@RequestParam("name") String name) {
    return "hello " + name;
}
```

- `@ResponseBody` 를 사용하여 HTTP Body 에 문자 내용을 직접 반환한다.
    - `StringHttpMessageConverter` 가 기본으로 동작한다.

<br>

## @ResponseBody 객체 반환

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