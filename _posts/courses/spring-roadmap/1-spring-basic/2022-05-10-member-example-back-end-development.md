---
title: '[Spring Basic] 2. 회원 관리 예제 - 백엔드 개발'
author: meatsby
date: 2022-05-10 10:00:00 +0900
categories: [COURSES, Spring Basic]
tags: [인프런, Spring Roadmap]
---

## 일반적인 웹 애플리케이션 계층 구조

---

![Screen Shot 2022-05-09 at 8.36.05 PM.png](/assets/img/2022-05-10-member-example-back-end-development/Screen_Shot_2022-05-09_at_8.36.05_PM.png)

- 컨트롤러 - 웹 MVC 의 컨트롤러 역할
- 서비스 - 핵심 비즈니스 로직 구현
- 리포지토리 - DB에 접근, 도메인 객체를 DB에 저장하고 관리
- 도메인 - 비즈니스 도메인 객체
    - e.g.) 회원, 주문, 쿠폰 등등