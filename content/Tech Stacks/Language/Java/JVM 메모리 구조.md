---
title: "[Java] JVM 메모리 구조"
date: 2021-11-02 10:00:03 +0900
tags:
  - Java
  - JVM
---
## Java Virtual Machine
---
- 자바 바이트 코드를 실행할 수 있는 주체
- CPU나 OS(플렛폼)의 종류와 무관하게 실행 가능
- 즉, OS 위에서 동작하는 프로세스로 자바 코드를 컴파일해서 얻은 바이트 코드를 해당 OS가 이해할 수 있는 기계어로 바꿔 실행시켜주는 역할

![Untitled](/assets/img/2021-11-02-jvm-memery-structure/jvm-structure.png)

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

![Untitled](/assets/img/2021-11-02-jvm-memery-structure/runtime-data-area.png)

## Runtime Data Area
---
### 1. Method Area
- JVM 이 시작될 때 생성되는 영역
- 바이트 코드가 저장됨
    - 클래스 정보, 변수 정보, static 변수

### 2. HeapArea
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

### 3. StackArea
- 지역변수, 메서드의 매개변수, 임시적으로 사용되는 변수, 메서드의 정보 등이 저장되는 영역

```java
// 스택엔 p 가 저장됨
// 즉, 힙에 저장된 인스턴스를 가리키는 참조변수가 저장됨
Person p = new Person("홍길동", 20);
```

### 4. PC Register (Program Counter Register)
- 스레드가 시잘될 때 생성
- 현재 스레드가 실행되는 부분의 주소와 명령을 저장하는 영역
- 스레드를 돌아가면서 수행할 수 있음

### 5. Native Method Stack
- 자바가 아닌 다른 언어로 작성된 코드를 위한 공간
- 즉, JNI(Java Native Interface)를 통해 호출한 C/C++등의 코드를 수행하기 위한 공간

## References
---
- [https://jeong-pro.tistory.com/148](https://jeong-pro.tistory.com/148)
- [https://kingpodo.tistory.com/54](https://kingpodo.tistory.com/54)
- [https://www.youtube.com/watch?v=AWXPnMDZ9I0](https://www.youtube.com/watch?v=AWXPnMDZ9I0)
