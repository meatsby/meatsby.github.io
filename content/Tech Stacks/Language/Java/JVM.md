---
title: JVM
date: 2021-11-17 16:40:00 +0900
status: In Progress
tags:
  - Java
---

## JVM

---

Java Virtual Machine, JVM 이란 Java 프로그램의 실행환경을 제공해주는 소프트웨어다.

Java 소스 코드를 컴파일한 바이트 코드를 모든 운영체제에서 사용할 수 있는데, 이는 JVM 은 Java 와 운영체제 사이의 중개자 역할을 수행하여 Java 가 운영체제에 종속적이지 않도록 도와주기 때문이다.

또한, GC 를 통해 자동으로 메모리 관리를 수행하며 다른 하드웨어와 다르게 레지스터 기반이 아닌 스택 기반으로 동작한다.

## JVM 의 구조

---

![[JVM Structure.png]]

JVM 은 `ClassLoader` `ExecutionEngine` `RuntimeDataArea` `JNI` `NativeMethodLibrary` 로 구성되어 있다.

## Class Loader

---

`ClassLoader` 는 런타임 시에 클래스를 동적으로 로드한다. Java 소스 코드를 컴파일한 바이트 코드를 JVM 이 운영체제로부터 할당받은 메모리 영역인 `RuntimeDataArea` 로 적재하는 역할을 수행한다.

## Execution Engine

---

`ExecutionEngine` 은 `ClassLoader` 에 의해 `RuntimeDataArea` 의 Method Area 에 적재된 바이트 코드를 네이티브 코드로 변경하여 명령어 단위로 실행하는 역할을 수행한다. 

### Interpreter

바이트 코드를 한 줄마다 컴파일하여 네이티브 코드로 변환하는 작업을 수행한다. 중복되는 바이트 코드에 대해서도 매번 컴파일하는 비효율이 발생하기 때문에 중복되는 바이트 코드를 발견할 경우 JIT Compiler 를 사용한다.

### JIT Compiler

Interpreter 의 효율을 높이기 위한 Compiler 로 Interpreter 가 반복되는 코드를 발견하면 JIT Complier 가 반복되는 코드를 네이티브 코드로 변경한 뒤 해당 코드를 캐싱한다. 이후 Interpreter 가 반복되는 코드를 또 발견하게 되면 컴파일된 네이티브 코드를 바로 사용한다.

### Garbage Collector

`RuntimeDataArea` 의 Heap Area 에 사용되지 않는 객체들을 제거하는 작업을 수행한다. GC 가 수행되는 동안 GC 를 수행하는 스레드를 제외한 모든 스레드가 정지된다.

## Runtime Data Area

---

![[Runtime Data Area.png]]

### Method Area

클래스 정보, 변수 정보, 메서드 정보, `static` 변수 Constant Pool 등이 생성되는 영역이다.

### Heap Area

`new` 연산으로 동적으로 생성된 인스턴스와 배열이 생성되는 영역이다. Method Area 에 로드된 클래스만 생성 가능하며 Garbage Collector 가 참조되지 않는 메모리를 확인하고 제거하는 영역이다.

### Stack Area

메서드 호출 시 마다 각각의 메서드만을 위한 지역변수, 매개변수 등이 생성되는 영역이다. 실제 인스턴스는 Heap Area 에 할당되고 참조만 Stack 에 저장된다.

### Program Counter Register

스레드가 시작될 때 생성되며 현재 수행중인 부분의 주소와 명령을 저장하는 영역이다.

### Native Method Stack

Java 가 아닌 다른 언어로 작성된 네이티브 코드를 실행할 때 사용되는 영역이다. 즉, JNI(Java Native Interface) 를 통해 호출한 C/C++ 등의 코드를 수행하기 위한 스택을 의미한다.

## JNI

---

Java 애플리케이션에서 C/C++ 등으로 작성된 함수를 사용할 수 있는 방법을 제공해준다. `native` 키워드를 통해 메서드를 호출한다. 대표적으로 `Thread` 의 `currentThread()` 메서드가 있다.

## Native Method Library

---

C/C++ 로 작성된 라이브러리다. 해당 라이브러리를 사용하기 위해 JNI 가 필요하다.

## References

---

- [https://jeong-pro.tistory.com/148](https://jeong-pro.tistory.com/148)
- [https://steady-coding.tistory.com/305](https://steady-coding.tistory.com/305)
- [https://coding-factory.tistory.com/828](https://coding-factory.tistory.com/828)
- [https://coding-factory.tistory.com/827](https://coding-factory.tistory.com/827)
- [https://joomn11.tistory.com/17](https://joomn11.tistory.com/17)
