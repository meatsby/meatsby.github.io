---
title: Abstract Class & Interface
date: 2022-09-29 18:50:00 +0900
status: In Progress
tags:
  - Java
---

## Abstract Class

---

```java
public abstract class AbstractClass {

    private final String name;

    public AbstractClass(final String name) {
        this.name = name;
    }

    abstract void method();

    public String getName() {
        return name;
    }
}
```

Abstract Class, 추상 클래스란 하나 이상의 `abstract` 메서드를 선언한 클래스로써 이를 상속하는 자손 클래스에서 완성하도록 유도하는 클래스다.

일반 클래스에 `abstract` 메서드를 추가했기 때문에 인스턴스화가 불가하고 미완성 설계도라고도 불린다.

### 특징

- 단일 상속만 가능하다.
- 추상 클래스를 상속하는 집합간에는 연관 관계가 있다.

## Interface

---

```java
interface Interface {

    /* public static final */ String name = "name";

    /* public abstract */ void method();

    /* public */ static void staticMethod() {
        System.out.println("do something");
    }

    /* public */ default void defaultMethod() {
        System.out.println("do something");
    }
}
```

Interface 란 상수와 `abstract` 메서드의 집합으로 Abstract Class 와 동일하게 이를 구현하는 클래스에서 `abstract` 메서드를 완성하도록 강제하지만 Abstract Class 보다 추상화 정도가 높다.

추상 클래스가 미완성 설계도라면 인터페이스는 기본 설계도라고 할 수 있다.

### 특징

- 다중 상속이 가능하다.
- 인터페이스를 구현하는 집합간에는 관계가 없을 수 있다.
- JDK1.8 `static` 메서드와 `default` 메서드를 사용할 수 있게 되었다.
- `default` 메서드의 목적은 구현체에 공통적으로 사용될 메서드를 인터페이스에 선언하기 위함이다.
