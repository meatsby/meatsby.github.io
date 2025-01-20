---
title: "Process & Thread"
date: 2022-10-04 19:00:00 +0900
status: In Progress
draft: false
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
Thread 란 Process 에서 실행 제어만 분리한 흐름의 단위를 의미한다. Thread 는 Process 내에서 `Stack` 만 따로 할당받고 `Code` `Data` `Heap` 영역은 공유한다.

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

## Multi Process
---
- 멀티 프로세싱이란
	- 하나의 응용프로그램을 여러 개의 프로세스로 구성하고 각 프로세스가 하나의 작업을 처리하도록 하는 것
- 장점
	- 여러 개의 자식 프로세스 중 하나에 문제가 발생하면 그 자식 프로세스만 죽음
- 단점
	- Context Switching 과정에서 캐쉬 메모리 초기화 등 무거운 작업이 진행되고 많은 시간이 소모되는 등의 오버헤드 발생
	- 프로세스들은 각각 독립적인 메모리를 할당받았기 때문에 Context Switching 이 발생하면 캐쉬에 있는 모든 데이터를 리셋하고 다시 캐쉬 정보를 불러와야함
	- 프로세스 사이의 어렵고 복잡한 통신 기법(IPC)
		- 독립된 메모리 할당 때문에 한 프로그램에 속하는 프로세스들 사이에 변수 공유 불가

## Multi Thread
---
- 멀티 스레딩이란
	- 하나의 응용프로그램을 여러 개의 스레드로 구성하고 각 스레드로 하여금 하나의 작업을 처리하도록 하는 것
	- 윈도우, 리눅스 등 많은 OS들이 멀티 프로세싱을 지원하고 있지만 멀티 스레딩을 기본으로 하고 있음
	- 웹 서버는 대표적인 멀티 스레드 응용 프로그램
- 장점
	- 시스템 자원 소모 감소 (자원의 효율성 증대)
		- 프로세스를 생성하여 자원을 할당하는 시스템 콜이 줄어들어 자원을 효율적으로 관리할 수 있다.
	- 시스템 처리량 증가 (처리 비용 감소)
		- 스레드 간 데이터 통신이 간단해지고 시스템 자원 소모가 줄어듬
		- 스레드 사이의 작업량이 작아 Context Switching이 빠름
	- 간단한 통신 방법으로 인한 프로그램 응답 시간 단축
		- 스레드는 프로세스 내의 Stack 영역을 제외한 모든 메모리를 공유하기 때문에 통신의 부담이 적음
- 단점
	- 주의 깊은 설계 필요
	- 까다로운 디버깅
	- 단일 프로세스 시스템의 경우 효과를 기대하기 어려움
	- 프로세스 밖에서 스레드 각각을 제어할 수 없음
	- 멀티 스레드의 경우 자원 공유 문제 발생
	- 하나의 스레드에 문제가 생기면 전체 프로세스에 영향을 끼침

## Multi Process 대신 Multi Thread 사용하는 이유
---
![[Untitled 13.png]]
- 프로그램 여러 개를 키는 것보다 하나의 프로그램 안에서 여러 작업을 해결하는 것
- 여러 프로세스로 할 수 있는 작업을 여러 스레드로 나눠서 하는 이유
	- 자원의 효율성 증대
		- 프로세스를 실행하여 자원을 할당하는 시스템 콜이 줄어들어 자원을 효율적으로 관리
		- 프로세스 간 Context Switching 시 오버헤드가 크기 때문
	- 처리 비용 감소 및 응답 시간 단축
		- 스레드는 Stack 영역을 제외한 모든 메모리를 공유하기 때문에 Inter-Process Communication 보다 통신 비용이 적음
		- 스레드 간 Context Switching 시 Stack 영역만 처리하기 때문에 스레드 간의 전환 속도가 빠름

## References
---
- [https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html](https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html)
