---
title: "[백준] 11576번 Base Conversion (Python)"
date: 2021-09-24 22:00:00 +0900
tags:
  - Algorithms
  - BOJ
---

## 풀이

---

주어진 a진법을 통해 b진법에 맞춰서 같은 숫자를 출력하는 문제이다.

10진법과 2진법 변환원리만 알면 간단히 문제를 해결할 수 있다.



먼저 주어진 a진법 숫자를 우리에게 익숙한 10진법 숫자로 바꿔준다.

바꾼 10진법 숫자를 통해 만들고자하는 b진법 숫자의 가짓수인 b를 계속 나눠주면서 나머지를 리스트에 저장한다.

이때 바꿔둔 10진법 숫자가 b보다 작아지는 경우에 반복문을 탈출하고 남은 숫자를 리스트에 저장한 뒤 거꾸로 출력해주면된다.

## 소스코드

---

```python
import sys
input = sys.stdin.readline

a, b = map(int, input().split())
m = int(input())
num = list(reversed(list(map(int, input().split()))))

temp = 0

for i in range(m):
    temp += num[i] * (a**i)

ans = []

while True:
    ans.append(temp%b)
    temp = temp//b
    if temp < b:
        ans.append(temp)
        break

print(*ans[::-1])
```

## References

---

- [BOJ 11576 - Base Conversion](https://www.acmicpc.net/problem/11576)
