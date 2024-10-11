---
title: JVM
date: 2021-11-17 16:40:00 +0900
status: In Progress
draft: false
tags:
  - Java
  - JVM
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

### 1. Class Loader
- 클래스 파일들을 엮어서 JVM이 OS로부터 할당받은 메모리영역(Runtime Data Area)에 적재

### 2. Execution Engine
- Class Loader 에 의해 적재된 클래스(바이트 코드)들을 기계어로 번역해 명령어 단위로 실행
    - Interpreter 방식
        - 명령어 하나 하나 실행하는 방식
    - JIT(Just-In-TIme) Compiler 방식
        - 적절한 시간에 전체 바이트 코드를 기계어로 번역해 실행하여 성능을 높이는 방식

### 3. Garbage Collector
- GC는 Heap 메모리 영역에 생성된 객체들 중 참조되지 않은 객체들을 탐색 후 제거

### 4. Runtime Data Area
- JVM의 메모리 영역으로 자바 파일이 실행될 때 사용하는 데이터를 적재하는 영역
- 메서드, 힙, 스택 모두 GC 의 대상
- 메서드, 힙 영역은 모든 스레드가 공유
- 스택, PC 레지스터, Native 메서드 스택은 각 스레드마다 생성 공유 X

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
- JVM 이 시작될 때 생성되는 영역
- 바이트 코드가 저장됨
    - 클래스 정보, 변수 정보, static 변수

### Heap Area
`new` 연산으로 동적으로 생성된 인스턴스와 배열이 생성되는 영역이다. Method Area 에 로드된 클래스만 생성 가능하며 Garbage Collector 가 참조되지 않는 메모리를 확인하고 제거하는 영역이다.
- new 연산으로 동적으로 생성된 instance 변수(객체)가 저장됨
    - e.g. 클래스의 객체, 배열 등
- 효율적인 GC 를 위해 5가지 영역으로 나뉨
- GC의 프로세스
    - Minor GC: new 영역
        1. Eden 영역에 최초의 객체 생성
        2. Eden 영역이 가득 차면 첫 번째 GC 발생
        3. Survivor1 에 Eden의 메모리를 복사 후 Survivor1 을 제외한 다른 영역의 객체를 모두 제거
        4. Eden 과 Survivor1 모두 가득 찼다면 두 영역에 생성된 객체 중에 참조되고 있는 객체가 있는지 검사
        5. 참조되고 있는 객체를 Survivor2 에 복사 후 Survivor2 를 제외한 다른 영역의 객체를 모두 제거
        6. 위 과정 중 일정 횟수 이상 참조되고 있는 객체들은 Survivor2 에서 Old 영역으로 이동
        7. 위 과정을 반복하며 Survivor2 가 가득 차기 전에 계속해서 Old 로 비움
    - Major GC (Full GC): old 영역
        1. Old 영역에 있는 모든 객체를 검사하며 참조되고 있는지 확인
        2. 참조되지 않은 객체를 모아 한 번에 제거
        - Minor GC 보다 오래 걸리고 실행 중 GC를 제외한 모든 스레드가 중지됨
            - Full GC 가 일어나면, Old 영역에 있는 참조가 없는 객체들을 모두 제거
            - Heap 영역에 빈 메모리 공간이 생기기 때문에 메모리를 재구성함
            - 메모리를 정리하는 도중 다른 스레드가 메모리를 사용하면 안되기 대문에 모든 스레드 정지

```java
// 힙엔 Person("홍길동", 20) 이 저장됨
// 즉, 인스턴스가 저장됨
Person p = new Person("홍길동", 20);
```

### Stack Area
메서드 호출 시 마다 각각의 메서드만을 위한 지역변수, 매개변수 등이 생성되는 영역이다. 실제 인스턴스는 Heap Area 에 할당되고 참조만 Stack 에 저장된다.
- 지역변수, 메서드의 매개변수, 임시적으로 사용되는 변수, 메서드의 정보 등이 저장되는 영역

```java
// 스택엔 p 가 저장됨
// 즉, 힙에 저장된 인스턴스를 가리키는 참조변수가 저장됨
Person p = new Person("홍길동", 20);
```

### Program Counter Register
스레드가 시작될 때 생성되며 현재 수행중인 부분의 주소와 명령을 저장하는 영역이다.
- 스레드가 시잘될 때 생성
- 현재 스레드가 실행되는 부분의 주소와 명령을 저장하는 영역
- 스레드를 돌아가면서 수행할 수 있음

### Native Method Stack
Java 가 아닌 다른 언어로 작성된 네이티브 코드를 실행할 때 사용되는 영역이다. 즉, JNI(Java Native Interface) 를 통해 호출한 C/C++ 등의 코드를 수행하기 위한 스택을 의미한다.
- 자바가 아닌 다른 언어로 작성된 코드를 위한 공간
- 즉, JNI(Java Native Interface)를 통해 호출한 C/C++등의 코드를 수행하기 위한 공간

## JNI
---
Java 애플리케이션에서 C/C++ 등으로 작성된 함수를 사용할 수 있는 방법을 제공해준다. `native` 키워드를 통해 메서드를 호출한다. 대표적으로 `Thread` 의 `currentThread()` 메서드가 있다.

## Native Method Library
---
C/C++ 로 작성된 라이브러리다. 해당 라이브러리를 사용하기 위해 JNI 가 필요하다.

## References
---
- [https://jeong-pro.tistory.com/148](https://jeong-pro.tistory.com/148)
- [https://kingpodo.tistory.com/54](https://kingpodo.tistory.com/54)
- [https://www.youtube.com/watch?v=AWXPnMDZ9I0](https://www.youtube.com/watch?v=AWXPnMDZ9I0)
- [https://jeong-pro.tistory.com/148](https://jeong-pro.tistory.com/148)
- [https://steady-coding.tistory.com/305](https://steady-coding.tistory.com/305)
- [https://coding-factory.tistory.com/828](https://coding-factory.tistory.com/828)
- [https://coding-factory.tistory.com/827](https://coding-factory.tistory.com/827)
- [https://joomn11.tistory.com/17](https://joomn11.tistory.com/17)
