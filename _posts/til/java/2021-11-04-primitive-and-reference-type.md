---
title: '[Java] 기본타입과 참조타입'
author: meatsby
date: 2021-11-04 10:00:00 +0900
categories: [TIL, Java]
tags: [Java]
---

![Untitled](/assets/img/2021-11-04-primitive-and-reference-type/datatype.png)

<br>

## 기본 타입 (Primitive Type)

---

- 종류
    - 정수형
    - 실수형
    - 논리형
- 각 타입마다 메모리 사용 크기가 정해져 있기 때문에 범위를 초과할 경우 오버플로우 현상이 발생할 수 있음
- 스택 영역에 생성

<br>

## 참조 타입 (Referene Type)

---

- 개념
    - 객체의 번지를 참조하는 타입
- 종류
    - Class
    - Array
    - Enum
    - Interface
- 기본 타입을 제외한 나머지
    - 클래스의 인스턴스
    - 배열
    - String
        - String 은 Immutable 객체, 기본 타입이 아님
- null 값을 대입할 수 있다면 참조 타입
- 힙 영역에 생성