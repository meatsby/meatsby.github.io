---
title: '[Java] 클래스, 오브젝트, 인스턴스'
author: meatsby
date: 2021-11-09 10:00:00 +0900
categories: [TIL, Java]
tags: [Java]
---

## **Class**

---

- 개념
    - 객체를 생성하기 위한 **설계도** 혹은 틀
    - 연관되어 있는 변수와 메서드의 집합

<br>

## **Object**

---

- 개념
    - 클래스의 인스턴스화 : 클래스로부터 객체를 만드는 과정
    - 클래스의 타입으로 **선언되었을 경우** 객체
    - 클래스에 선언된 그대로 소프트웨어 상에 **설계도로 구현한 대상**
- 특징
    - "클래스의 인스턴스" 라고도 불림
    - OOP관점에서 클래스의 타입으로 선언되었을 때 **객체**라고 부름

<br>

## **Instance**

---

- 개념
    - 클래스의 인스턴스 : 클래스로부터 만들어진 객체
    - 객체가 **메모리에 할당되어 실제 사용될 때** 인스턴스
    - 설계도를 바탕으로 소프트웨어 상에 구현된 실체
        - 즉, 객체를 소프트웨어 상에 실체화
        - 실체화된 인스턴스는 메모리에 할당됨
- 특징
    - OOP관점에서 객체가 메모리에 할당되어 실제 사용될 때 **인스턴스**라고 부름
    - 인스턴스는 어떤 원본(추상적인 개념)으로부터 **생성된 복제본**을 의미
    - 추성적인 개념과 구체적인 객체 사이의 관계에 초점을 맞출 경우에 사용
        - 객체는 클래스의 인스턴스
        - 실행 프로세스는 프로그램의 인스턴스

<br>

## **예시**

---

```java
/* 클래스 */
public class Animal {
  ...
}
/* 객체와 인스턴스 */
public class Main {
  public static void main(String[] args) {
    Animal cat, dog; // 클래스의 타입으로 '객체' 선언

    // 인스턴스화
    cat = new Animal(); // cat은 Animal 클래스의 '인스턴스'(객체를 메모리에 할당)
    dog = new Animal(); // dog은 Animal 클래스의 '인스턴스'(객체를 메모리에 할당)

		Animal rat = new Animal();
		// 참조변수 rat 은 Animal 인스턴스를 가리키고 있다.
		// 인스턴스는 오직 참조변수를 통해서만 다룰 수 있다.
  }
}
```

<br>

## **References**

---

- [https://whatisthenext.tistory.com/36](https://whatisthenext.tistory.com/36)
- [https://gmlwjd9405.github.io/2018/09/17/class-object-instance.html](https://gmlwjd9405.github.io/2018/09/17/class-object-instance.html)