---
title: "[Java] Array 와 List 의 차이"
date: 2021-11-11 10:00:00 +0900
tags:
  - Java
---
## Array
---
- 선언과 동시에 크기가 고정되며, 기능이 없음
- 배열은 인덱스에 따라서 값을 유지하기 때문에 null 값이 남게 됨 (메모리 낭비)
- 데이터의 갯수가 정해져 있고 자주 사용할 경우 Array 가 더 효율적

## List
---
- 순서가 있는 데이터의 모임 (Sequence 라고도 부름)
- 가변길이의 특성을 갖고 있으며 다양한 기능을 내장하고 있음
- Array List 와 Linked List 두가지가 존재함

![Untitled](/assets/img/2021-11-11-array-and-list/arraylist-linkedlist.png)

## 예시
---
```java
// 배열 - 추가, 삭제가 어렵다. 직접 구현해야한다.
int[] numbers = {10,20,30,40,50};

// 리스트 (ArrayList)
ArrayList numbers = new ArrayList();

numbers.add(10); // 추가
numbers.remove(0); // 삭제

// 리스트 (LinkedList)
LinkedList numbers = new LinkedList();

numbers.add(10); // 추가
numbers.remove(0); // 삭제
```
