---
title: '[Java] 객체의 생명주기'
author: meatsby
date: 2021-11-04 10:00:01 +0900
categories: [TIL, Java]
tags: [Java]
---

## 1. Created (생성)

---

- 객체를 위한 메모리 공간을 Heap 에 할당
- Super class 의 생성자 호출을 하면서 initializer 및 instance variable 의 initialize 를 수행
- 객체의 생성자를 수행

<br>

## 2. In use or reachable (사용중)

---

- 객체가 생성되어 다른 객체에 의해 참조되어 있는 상태
- Strongly referenced 상태 라고 부름

<br>

## 3. Invisible (사용 중이며 접근불가)

---

- Strongly referenced 상태이지만 직접 접근할 수 없는 상태
- GC의 대상이 되지 않음
- e.g.
    
    ```java
    public void run(){
        Object foo = new Object();
        foo.doSomething();
    
        while( true ){
            // do something.
        }
    }
    ```
    
- foo 의 역할이 종료되었음에도 run() 이 리턴 될 때 까지 Strong reference 를 가짐
- 즉, strong reference 상태를 가졌지만 foo를 다시 접근할 수 없기 때문에 메모리를 계속 유지하게 되는 invisible 상태가 됨

<br>

## 4. Unreachable (사용되지 않음)

---

- Strong reference 가 존재하지 않을 경우 GC 대상 큐에 들어감

<br>

## 5. Collected (GC 대상이 되는 상태)

---

- 메모리 해제단계의 도임부
- GC가 객체의 finilze() 가 정의되어 있는지 판단
    - 있다면 finilzer 라는 큐에 넣음
    - 없다면 finalized 상태로 전환

<br>

## 6. Finalized (Finalize를 거친 상태)

---

- Finalizer 를 통해 finalize 가 실행된 후의 상태

<br>

## 7. Deallocated (메모리 해제된 상태)

---

- 메모리 반환이 끝난 상태로 GC의 동작이 마무리 된 상태