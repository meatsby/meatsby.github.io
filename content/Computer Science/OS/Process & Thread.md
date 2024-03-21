---
title: "Process & Thread"
date: 2022-10-04 19:00:00 +0900
status: In Progress
tags:
  - OS
---

## Process 란?

---

![[Process & Thread - Process.png]]

Process 란 실행중인 프로그램을 의미한다. Process 는 OS 로 부터 자원을 할당받아 `Code` `Data` `Stack` `Heap` 영역으로 메모리를 구성하며 기본적으로 Process 는 최소 1개의 Thread(Main Thread) 를 가지고 있다.

### Process 메모리 구조

- `Code` - 컴파일된 소스코드가 저장되는 영역
- `Data` - 전역 변수 또는 `static` 변수 등이 저장되는 영역
- `Heap` - 동적으로 생성되는 데이터가 저장되는 영역
- `Stack` - 호출된 함수 또는 지역 변수 등이 저장되는 영역

### Process Control Block

- Process ID - 프로세스 식별자
- Process State - 프로세스 상태 (생성, 준비, 실행, 대기, 종료)
- Program Counter - 프로세스가 다음에 실행할 명령어의 주소
- Register Information - CPU Register, General Register 등을 포함
- CPU Scheduling Information - 우선 순위, 최종 실행시간, CPU 점유시간 등을 포함

## Thread 란?

---

![[Process & Thread - Thread.png]]

Thread 란 Process 에서 실행 제어만 분리한 흐름의 단위를 의미한다. Thread 는 Process 내에서 `Stack` 만 따로 할당받고 `Code` `Data` `Heap` 영역은 공유한다,

### 특징

- Process 는 Process Control Block 내부의 Register Block 을 통해 Thread 를 구분한다.
- Process 의 Code Data Heap 영역을 공유하기 때문에 보다 효율적인 통신이 가능하다.
- 캐시 메모리를 비우지 않기 때문에 Context-Switching 비용이 저렴하다.
- 자원 공유로 인해 문제가 발생할 수 있기 때문에 동기화에 신경을 많이 써야한다.

## Context-Switching 이란?

---

Context-Switching 이란 여러 작업을 수행할 때 한 작업이 끝날 때까지 다른 작업이 기다리는 것이 아니라 여러 작업을 번갈아가면서 실행하여 동시에 처리될 수 있도록 하는 방법을 의미한다.

Context-Switching 은 Process 의 상태를 PCB 에 저장하고 새로운 Process 의 상태를 Register 에 저장하는 방식으로 동작한다. 이때 CPU 는 아무일도 하지 않기 때문에 잦은 Context-Switching 은 성능저하를 일으킬 수 있다.

Thread 간의 Context-Switching 은 캐시 메모리나 PCB 에 저장해야 하는 내용과 비워야하는 내용이 적기 때문에 상대적으로 더 빠른 Context-Switching 이 일어날 수 있다.

## References

---

- [https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html](https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html)
