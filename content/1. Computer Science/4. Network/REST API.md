---
title: "REST API"
date: 2022-10-04 13:00:00 +0900
status: In Progress
draft: false
tags:
  - Network
---
## REST 란?
---
- HTTP URI 를 통해 자원을 표시하고 HTTP Method 를 통해 자원에 대한 처리를 표현한다.
- 사람이 읽을 수 있는 API 라는 것이 특징이다.
- HTTP 를 사용하기 때문에 HTTP 의 특성을 그대로 반영한다.
- 별도의 인프라 구축이 필요하지 않다.

### 단점
- 명확한 표준이 존재하지 않는다.
- RESTful 을 완벽히 만족하는 API 를 설계하긴 매우 까다롭다.
- REST API 는 멱등성을 보장하기 힘들기 때문에 분산환경에 적합하지 않다.

### HATEOAS 개념
- 동적인 API 를 제공할 수 있다.
- 즉, 클라이언트가 API 의 변화에 일일이 대응하지 않아도 된다.
