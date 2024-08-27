---
title: "Garbage Collection"
date: 2022-09-29 16:10:00 +0900
status: In Progress
draft: false
tags:
  - Java
---
## Garbage Collection
---
Garbage Collection 이란 Java 메모리 관리 방법 중 하나로 더 이상 참조되지 않는 객체들을 제거하는 작업을 의미하며 JVM 의 Heap Area 에서 주로 동작한다.

### Garbage Collection 의 대상

![[GC Target.png]]

객체들은 실질적으로 Heap Area 에 생성되고 Method Area 나 Stack Area 등 Root Area 에서 Heap Area 에 생성된 객체의 주소만 참조한다.

GC 의 대상은 이런 객체들 중 참조되지 않는 객체들이다. 여기서 참조되지 않는 객체들은 `unreachable` 이라고 하며 참조되고 있는 객체들은 `reachable` 이라고 표현한다.

`unreachable` 객체들은 메서드가 종료되면서 Stack Area 에서 Frame 이 pop 되거나 참조 대상이 바뀌면서 생기는데 GC 는 이런 객체들을 제거하는 역할을 한다.

### JVM Heap Area

![[JVM Heap Area.png]]

JVM 의 Heap Area 는 GC 가 효율적으로 동작할 수 있도록 `Eden` `Survivor0` `Survivor1` `Old` `Permanent` 5가지로 나뉜다. JDK1.8 부터 `Permanent` 영역이 Native Method Stack Area 를 위한 `MetaSpace` 영역으로 변경되었다. `Survivor` 영역의 경우 GC 가 일어날 때 두 영역 간에 복사가 일어난다는 점이 중요하고 숫자는 중요한 요소가 아니다.

### Stop-The-World

GC 를 수행할 때 GC 를 수행하는 스레드를 제외한 모든 스레드는 정지하는데 이를 `Stop-The-World` 라고 한다.

빈번한 GC 는 더 많은 `Stop-The-World` 를 발생시키고 이는 애플리케이션 성능 저하로 이어지기 때문에 `Stop-The-World` 시간을 줄여 스레드가 정지되는 시간을 줄이는 것이 중요하다.

## Garbage Collection 동작 과정
---
GC 는 Minor GC 와 Major GC 로 구분할 수 있다. Minor GC 는 `young` 영역에서 Major GC 는 `old` 영역에서 일어난다.

### Minor GC

Minor GC 는 `young` 영역에서 일어나며 `Eden` 영역이 가득 차면서 시작된다.

1. 최초에 객체가 생성되면 `age-bit` 이 0으로 할당되고 `Eden` 영역에 저장된다.
2. `Eden` 영역이 가득차면 참조가 남아있는 객체를 `mark` 한다.
3. `Eden` 영역에서 `mark` 된 객체를 `Survivor0` 영역으로 복사한다.
4. `Eden` 영역을 비우고 살아남은 객체들의 `age-bit` 이 증가한다.
5. `Eden` 영역이 다시 가득차면 참조가 남아있는 객체를 다시 `mark` 한다.
6. `Eden` 영역과 `Survivor0` 영역에서 `mark` 된 객체를 `Survivor1` 영역으로 복사한다.
7. `Eden` 영역과 `Survivor0` 영역을 비우고 살아남은 객체들의 `age-bit` 이 증가한다.
8. `Eden` 영역이 다시 가득차면 참조가 남아있는 객체를 다시 `mark` 한다.
9. `Eden` 영역과 `Survivor1` 영역에서 `mark` 된 객체를 `Survivor0` 영역으로 복사한다.
10. `Eden` 영역과 `Survivor1` 영역을 비우고 살아남은 객체들의 `age-bit` 이 증가한다.
11. 위 과정을 반복하다가 특정 `age-bit` 에 도달한 객체들을 `old` 영역으로 `promotion` 한다.

### Major GC

Major GC 는 `old` 영역에서 일어나며 Minor GC 와 반대로 참조되지 않는 객체를 `mark` 한다.

`old` 영역이 가득차게 되면 `mark` 된 객체를 제거하는 Full GC(Major GC) 가 일어나는데 이는 Minor GC 보다 훨씬 많은 시간을 소모한다. 즉, `Stop-The-World` 시간이 길다.

이를 해결하기 위해 Full GC 에선 `Mark-Sweep-Compact` Algorithm 을 기반한 여러 GC 방식들이 선택 및 적용된다.

## Garbage Collection Algorithm
---
### Weak Generational Hypothesis

Weak Generational Hypothesis 는 대부분의 객체는 빠르게 `unreachable` 상태로 전환된다는 가설이다. 이는 GC 를 성공적으로 수행하는 Algorithm 을 설계하기 위해서 사용되는 대표적인 가설이다.

### Mark-Sweep-Compact Algorithm

![[Mark-Sweep-Compact Algorithm.png]]

GC 가 수행될 때 `reachable` 객체들은 `mark` 된다. `unreachable` 한 객체들은 `mark` 되지않았기 때문에 이런 객체들을 추적하고 삭제하는 것을 `sweep` 이라고 한다.

`mark` 되지 않은 객체들을 제거하면 메모리 공간에 구멍이 생기는 단편화가 발생하는데 이를 `Fragmentation` 이라고 부른다.

정렬되지 않은 `Fragmentation` 된 메모리 공간은 절대적인 공간은 충분해도 연속되는 메모리 공간이 부족해 메모리 할당이 어려울 수 있다. 때문에 메모리를 정리해주는데 이 방식을 `Compaction` 이라고 한다.

## Garbage Collection 적용
---
```bash
java -XX:+UseG1GC -XX:+DisableExplicitGC SampleProgram
```

Java 애플리케이션 실행 시 위처럼 GC 를 선택해서 사용할 수 있다. 가장 간단한 `SerialGC` 가 대표적이고 조금 더 진보된 `G1GC` `ZGC` 등이 있다.

## References
---
- [https://tecoble.techcourse.co.kr/post/2021-08-30-jvm-gc/](https://tecoble.techcourse.co.kr/post/2021-08-30-jvm-gc/)
- [https://jeong-pro.tistory.com/148](https://jeong-pro.tistory.com/148)
- [https://coding-factory.tistory.com/829](https://coding-factory.tistory.com/829)
