---
title: "Semaphore & Mutex"
date: 2022-10-08 23:45:00 +0900
status: In Progress
draft: false
tags:
  - OS
---
## Semaphore 란?
---
공유자원에 여러 프로세스가 동시에 접근하면서 문제가 발생할 수 있다. 이때 공유자원의 데이터는 한 번에 하나의 프로세스만 접근할 수 있도록 제한을 줘야한다.

Semaphore 는 멀티 프로그래밍 환경에서 공유자원에 대한 접근을 제한하는 방법이다.

### 임계 구역

여러 프로세스가 데이터를 공유하며 작업을 수행할 때, 각 프로세스에서 공유자원을 접근하는 프로그램 코드 부분을 의미한다.

한 프로세스가 임계 구역을 수행할 때, 다른 프로세스가 접근하지 못하도록 해야 한다.

### Semaphore P, V 연산

- P(S) - 임계 구역에 들어가기 전에 수행
- V(S) - 임계 구역에서 나올 때 수행

## Mutex 란?
---
Mutual Exclusion, Mutex 는 임계 구역을 가진 스레드들의 실행시간이 서로 겹치지 않고 단독으로 실행되게 하는 기술을 의미한다.

해당 접근을 조율하기 위해 `lock` 과 `unlock` 을 사용한다.

- `lock` - 현재 임계 구역에 들어갈 권한을 얻어온다.
- `unlock` - 현재 임계 구역을 모두 사용했음을 알린다.

Semaphore 와 다르게 `lock` 을 획득한 프로세스만 `lock` 을 반환할 수 있다.

## Mutex 알고리즘
---
### Dekker 알고리즘

`flag` 와 `turn` 변수를 통해 임계 구역에 들어갈 스레드를 결정하는 방식이다.

### Peterson 알고리즘

Dekker 와 유사하지만, 상대 스레드에게 진입 기회를 양보하는 것에 차이가 존재한다.

### Bakery 알고리즘

여러 스레드에 대한 처리가 가능한 알고리즘이다. 가장 작은 수의 번호표를 가지고 있는 프로세스가 임계 구역에 진입한다.

## Semaphores
---
- A tool that can be used to enforce mutual exclusion
    - Is a protected variable with methods for restricting access to `critical resources`
    - A binary semaphore takes values 0 and 1
    - A counting semaphore takes 0 ~ infinity

### Producer-Consumer Problem
- It is a classical example of a multi-process synchronization problem
- Also known as the Bounded-Buffer Problem
- Occurs when a critical section is `not mutually exclusive`
- It can be solved by enforcing mutual exclusion

### Problem using semaphore - Deadlock
- Permanent blocking of a set of processes that either compete for the system resources
- Deadlock only occurs in a system where all 4 conditions are met
- Conditions
    - Mutual Exclusion: Only one process can use a resource at a time
    - Hold and Wait: Processes already holding resources may request new resources
    - No Preemption: No resource can be forcibly removed from a process holding it
    - Circular Wait: Two or more processes form a circular chain where each process waits for a resource that the next process in the chain holds
- Dining Philosopher Problem is a famous example of deadlock
    - It explains the solution by introducing binary semaphore as a waiter

### Monitor
- Improved version of multi-process synchronization
- Provided through OOP languages
- Enforces one process at a time to ensure mutual exclusion

### Problem using semaphore - Starvation
- The process is perpetually denied necessary resources
- Solution
    - Use a scheduling algorithm with a priority queue that also uses the aging technique

## References
---
- [https://gyoogle.dev/blog/computer-science/operating-system/Semaphore & Mutex.html](https://gyoogle.dev/blog/computer-science/operating-system/Semaphore%20&%20Mutex.html)
