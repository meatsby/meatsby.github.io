---
title: '[HTTP Basic] 4. HTTP 메서드'
author: meatsby
date: 2022-04-28 10:00:00 +0900
categories: [COURSES, HTTP Basic]
tags: [인프런, Spring Roadmap]
---

## HTTP 메서드 - GET, POST

---

### GET

- 리소스 조회에 주로 사용된다.
- 서버에 전달하고자 하는 데이터는 query string 을 통해 전달한다.

### POST

- 요청 데이터 처리에 주로 사용된다.
- message body 를 통해 서버로 요청 데이터를 전달한다.
    - 서버는 message body 를 통해 들어온 데이터를 처리한다.

<br>

## HTTP 메서드 - PUT, PATCH, DELETE

---

### PUT

- 리소스 덮어쓰기에 주로 사용된다.
- 클라이언트가 리소스의 위치를 알고 있어야 한다.
    - 리소스의 위치를 안다는 점에서 POST 와 차이가 있다.

### PATCH

- 리소스 부분 변경에 주로 사용된다.

### DELETE

- 리소스 제거에 주로 사용된다.

<br>

## HTTP 메서드의 속성

---

### 안전

- 호출해도 리소스를 변경하지 않는다.
    - e.g.) GET

### 멱등

- 한 번이던 100번이던 호출한 결과가 항상 같다.
    - e.g) GET, PUT, DELETE

### 캐시가능

- 응답 결과 리소스를 캐시해서 사용해도 되는가?
    - e.g.) 실무에서는 거의 GET 만 사용한다.