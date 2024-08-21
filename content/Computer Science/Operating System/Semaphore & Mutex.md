---
title: Semaphore & Mutex
date: 2022-10-08 23:45:00 +0900
status: In Progress
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

## References

---

- [https://gyoogle.dev/blog/computer-science/operating-system/Semaphore & Mutex.html](https://gyoogle.dev/blog/computer-science/operating-system/Semaphore%20&%20Mutex.html)
