---
title: "[Java] == 연산자와 equals()의 차이"
date: 2021-11-02 10:00:04 +0900
tags:
  - Java
---
## == 연산자
---
- 항등 연산자(Operator) 이다.
    - 반의어로 != 가 존재한다.
- 참조 비교(Reference Comparison) 혹은 주소 비교(Address Comparison)
    - 두 객체가 같은 메모리 공간을 가리키는지 확인한다.
- 모든 기본 유형(Primitive Types)에 적용할 수 있다.
    - byte, short, char, int, float, double boolean
    - 참조 유형(Reference Types)의 경우 주소값을 비교한다.
    - 사실 Primitive 역시 Constant Pool 에 있는 특정 상수를 참조하기 때문에 주소값을 비교한다고 볼 수 있다.
- 객체에도 적용이 가능하지만 같은 내용을 가진 서로 다른 객체의 경우 false 를 반환한다.
    - 같은 내용을 갖고 있더라도 주소값이 다르기 때문
- Boolean Type 으로 반환한다.

## equals()
---
- 객체 비교 메서드(Method) 이다.
- 내용 비교(Content Comparison)
    - 두 객체의 값이 같은지 확인한다.
    - 문자열의 데이터/내용을 기반으로 비교한다.
- 기본 유형(Primitive Types)에 적용할 수 없다.
- Boolean Type 으로 반환한다.

## 예시
---
```java
public class Test {
    public static void main(String[] args) {

        Thread t1 = new Thread();
        Thread t2 = new Thread(); // 새로운 객체 생성. 즉, t1과 다른 객체.
        Thread t3 = t1; // 같은 대상을 가리킨다.

        String s1 = new String("WORLD");
        String s2 = new String("WORLD");

        System.out.println(t1 == t3); // true
        System.out.println(t1 == t2); // false(서로 다른 객체이므로 별도의 주소를 갖는다.)
        System.out.println(t1.equals(t2)); // false
        System.out.println(s1.equals(s2)); // true(동일한 내용을 갖는다.)
    }
}
```

## References
---
- [https://brunch.co.kr/@mystoryg/132](https://brunch.co.kr/@mystoryg/132)
