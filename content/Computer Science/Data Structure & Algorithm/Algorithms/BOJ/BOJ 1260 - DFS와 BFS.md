---
title: "[백준] 1260번 DFS와 BFS (Python)"
date: 2021-10-12 22:00:00 +0900
tags:
  - Algorithms
  - BOJ
---

## 풀이

---

그래프탐색을 이해하기 위한 기본문제이다.

정점과 간선이 주어졌을 때 이를 DFS 와 BFS 를 통해 수행할 경우 방문된 순서대로 출력하는 문제다.

입력으로 각 정점 간의 간선 정보를 받기 때문에 인접 리스트를 통해 문제를 구현할 수 도 있었지만, 인접 행렬을 통해 문제를 풀었다.

정점 a 와 b 가 간선이기 때문에 인접행렬에선 `graph[a][b] = graph[b][a] = 1`.

즉, 서로 연결되어 있다는 정보를 저장할 수 있다.

저장된 그래프를 통해 DFS 와 BFS 를 수행하기 전, 방문처리를 위해 각 탐색기법을 위한 visited 리스트를 선언해준다.

이후 BFS 에서는 큐를 활용해 1 을 시작으로 1 과 인접한 수를 인접행렬의 좌표를 통해 구해낸다.

이 때 방문하지 않았던 정점이라면 큐에 해당하는 정점을 삽입하고 방문처리를 해주면된다.

DFS 에서는 재귀를 활용해 방분하지 않았던 정점이라면 DFS 를 재귀적으로 실행시켜주는 방식으로 구현된다.

## 소스코드

---

```python
# DFS와 BFS
from collections import deque
import sys
input = sys.stdin.readline

def bfs(v):
    q = deque()
    q.append(v)
    b_visited[v] = 1
    while q:
        v = q.popleft()
        print(v, end=" ")
        for i in range(1, n+1):
            if b_visited[i] == 0 and graph[v][i] == 1:
                q.append(i)
                b_visited[i] = 1

def dfs(v):
    d_visited[v] = 1
    print(v, end=" ")
    for i in range(1, n+1):
        if d_visited[i] == 0 and graph[v][i] == 1:
            dfs(i)

n, m, v = map(int, input().split())

graph = [[0] * (n+1) for _ in range(n+1)]
d_visited = [0] * (n+1)
b_visited = [0] * (n+1)

for _ in range(m):
    a, b = map(int, input().split())
    graph[a][b] = graph[b][a] = 1

dfs(v)
print()
bfs(v)
```

## References

---

- [BOJ 1260 - DFS와 BFS](https://www.acmicpc.net/problem/1260)
