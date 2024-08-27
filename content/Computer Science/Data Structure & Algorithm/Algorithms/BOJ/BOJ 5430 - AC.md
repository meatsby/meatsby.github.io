---
title: "BOJ 5430 - AC"
date: 2021-09-05 22:00:00 +0900
status: Done
draft: false
tags:
  - Algorithms
  - BOJ
---
## 풀이
---
주어진 명령에 따라 문자열을 처리하는 구현문제이다.

파이썬에서 기본으로 제공하는 reverse 나 pop 을 통해 쉽게 풀 수 있는 문제였지만, 시간초과로 인해 다른 방법 찾아야했다.



방법은 생각보다 간단하다. 명령어 순서에 따라서 문자열의 좌측 혹은 우측이 얼마나 제거될 것인지 미리 파악을 한 후 인덱싱을 통해 풀면된다.

## 소스코드
---
```python
import sys

input = sys.stdin.readline

T = int(input())

for _ in range(T):
    p = input().rstrip()
    p.replace('RR', '')
    n = int(input())
    x = input().rstrip()[1:-1].split(',')
    l, r, b = 0, 0, True

    for c in p:
        if c == 'R':
            b = not b
        elif c == 'D':
            if b:
                l += 1
            else:
                r += 1
    
    if l+r > n:
        print('error')
    else:
        x = x[l:n-r]
        if b:
            x = ','.join(x)
        else:
            x = ','.join(x[::-1])
        print(f'[{x}]')
```

## References
---
- [BOJ 5430 - AC](https://www.acmicpc.net/problem/5430)
