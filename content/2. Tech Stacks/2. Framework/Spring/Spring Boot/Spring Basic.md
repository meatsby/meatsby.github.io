---
title: Spring Basic
date: 2022-06-20 21:48:21 +0800
status: Done
draft: false
tags:
  - Spring
---
## 1. 스프링 웹 개발 기초
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

## References
---
- 
