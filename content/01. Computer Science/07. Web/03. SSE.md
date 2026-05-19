---
title: "SSE"
date: 2022-08-10 12:40:00 +0900
status: In Progress
draft: false
tags:
  - Web
---
## HTTP
---
### HTTP 1.0

- Open TCP connection
- Send GET Request
- Receive Response
- Close TCP connection

TCP 3-way handshake expensive

### HTTP 1.1

- Open TCP connection
- Send GET Request
- Receive Response
- Close TCP connection if I want to

## WebSockets
---
- Open connection
- GET 1.1 UPGRADE
- 101 - Switching Protocols
- No longer HTTP
- Bidirectional no order

## Server Sent Events
---
- Open connection
- Send GET text/event-stream
- Respond : Content-Type = text/event-stream / Transfer-Encoding chunked
- keep sending more chunks
- Server or Client can close connection

## SSE Example
---
### SSE use cases

- Live Feed
- Showing client progress
- Logging

### Coding

```python
res.setHeader("Content-Type", "text/event-stream")
res.write("data: " + "hello!\n\n")
```

## SSE Pros and Cons
---
### Pros

- Lightweight
    - packets are small because there are no headers unlike the websocket
- HTTP & HTTP/2 compatible
- Firewall friendly (standard)

### Cons

- Proxying is tricky
- L7 L/B challenging (timeouts)
    - client cannot keep connection alive
- Stateful, difficult to horizontally scale

### Do I have to use SSE?

- WebSockets
    - sse is limited only purely server sent events
    - overhead to HTTP there are its own protocol headers
- Long polling

## 실시간 기술
---
### Polling

- 특정 주기로 요청을 보낸다.
- 서버에 변화가 없어도 계속해서 요청을 보내기 때문에 불필요한 통신이 많이 이루어진다.
- 기존 우리 서버는 0.5초 간격으로 서버에게 요청을 보내고 있었다.

### Long Polling

- 서버에서 접속을 열어두고 이벤트 발생 시 응답을 보낸다.
- 이벤트가 발생하면 즉시 응답이 이루어져 실시간 성능이 뛰어나다.
- 클라이언트가 많은 경우 이벤트 발생 시 동시에 Response 를 보내고 Request 를 받기 때문에 순간적으로 큐에 많은 양의 명령이 쌓여 서버에 무리가 간다.

### Web Socket

- 서버와 클라이언트가 TCP connection 을 유지하여 실시간으로 데이터를 주고받는 양방향 통신이다.

### Server Sent Event

- 서버와 클라이언트가 TCP connection 을 유지하여 서버 → 클라이언트 방향으로만 통신하는 단방향 통신이다.
- Web Socket 은 금지 기술이었고 SSE 로도 충분히 원하는 결과를 얻어낼 수 있을 것이라 판단하여 SSE 를 사용했다.

## Spring SseEmitter
---
Polling

### NginX 설정

```
server {
    ...

    location / {
        ...

        # SSE through NginX
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;

        ...
    }

    ...
}
```

현재 프로젝트 구조에선 NginX 를 통해 백엔드 서버와 통신하고 있다.

SSE 를 NginX 를 통해 클라이언트에게 보내주기 위해선 `location` 내부에 위와 같은 설정이 추가되어야 한다.

## References
---
- [Server-Sent Events Crash Course](https://www.youtube.com/watch?v=4HlNv1qpZFY)
- [[Spring + SSE] Server-Sent Events를 이용한 실시간 알림](https://velog.io/@max9106/Spring-SSE-Server-Sent-Events%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%95%8C%EB%A6%BC)
- [Spring Event와 SSE 로 리액티브하게 접근하기 (EventListener, Server-Sent Events, 비동기 컨트롤러, RxJava로 동일하게 재구현)](https://xzio.tistory.com/1000)
- [Spring Boot, SSE(Server-Sent Events)로 단방향 스트리밍 통신 구현하기](https://jsonobject.tistory.com/558)
- [SSE Spec](https://html.spec.whatwg.org/multipage/server-sent-events.html#dom-eventsource-readystate)
- [SseEmitter Reconnect](https://stackoverflow.com/questions/55287474/should-spring-sseemitter-complete-trigger-an-eventsource-reconnect-how-to-cl)
- [Server-Sent Events with Spring](https://golb.hplar.ch/2017/03/Server-Sent-Events-with-Spring.html)
- [Spring Boot Async Controller with SseEmitter](https://howtodoinjava.com/spring-boot2/rest/spring-async-controller-sseemitter/)
- [SseEmitterTests](https://github.com/spring-projects/spring-framework/blob/d3d91d4d224bc3bedbc17c33820a816afe935aeb/spring-webmvc/src/test/java/org/springframework/web/servlet/mvc/method/annotation/SseEmitterTests.java#L121)
- [Distributed SSE with Spring SseEmitter and Redis Pub/Sub](https://www.geekyhacker.com/2019/08/07/distributed-sse-with-spring-sseemitter-and-redis-pub-sub/)
- [Server-Sent Events (SSE) in Spring 5 with Web MVC and Web Flux](https://github.com/aliakh/demo-spring-sse)
