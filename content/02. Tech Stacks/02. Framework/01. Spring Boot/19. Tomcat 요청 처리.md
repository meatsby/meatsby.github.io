---
title: Tomcat 요청 처리
date: 2022-11-14 12:30:00 +0900
status: To Do
draft: false
tags:
  - Spring
  - Tomcat
---
Spring Boot 를 사용하다보면 내장 톰캣을 Servlet Container 로 사용하여 웹 요청을 처리할 수 있다고 합니다. Tomcat 은 또한 다중 요청을 처리하는데, 이는 Thread Pool 을 통해 구현되어 있습니다.

Tomcat 은 Java 로 만들어져 있기 때문에 Java Thread Pool 을 사용합니다.

때문에 Tomcat 을 이해하기 위해선 Java Thread Pool 에 대한 이해가 필수적입니다.

org.apache.tomcat.embed:tomcat-embed-core:9.0.64

- apache
    - catalina
        - core
            - StandardServer.java
        - startup
            - Tomcat.java
    - coyote
        - http11
            - Http11NioProtocol.java
    - juli
    - naming
    - tomcat

Tomcat 이 사용하는 StandardServer 를 보면 ScheduledThreadPoolExecutor 를 사용하고 있음

## 선수 지식
1. Tomcat 은 왜 ScheduledThreadPoolExecutor 를 사용하는가?
2. NIO Connector 에 대한 이해 필요
3. 스트림 vs 채널에 대한 이해 필요

- Spring Boot 는 Tomcat 을 내장 Servlet Container 로 사용
- Tomcat 은 Thread Pool 을 통해 다중 요청을 처리
- 요청이 들어오면 Thread Pool 에서 Thread 를 할당

- 스프링과 스프링부트의 차이점 = 내장 Servlet Container 지원 여부

### 스프링부트와 내장 톰캣

```yaml
# application.yml (적어놓은 값은 default)
server:
  tomcat:
    threads:
      max: 200                # 생성할 수 있는 thread의 총 개수
      min-spare: 10           # 항상 활성화 되어있는(idle) thread의 개수
    max-connections: 8192     # 수립가능한 connection의 총 개수
    accept-count: 100         # 작업큐의 사이즈
    connection-timeout: 20000 # timeout 판단 기준 시간, 20초
  port: 8080.                 # 서버를 띄울 포트번호
```

- 위 설정을 통해 Tomcat 의 ThreadPoolExecutor 와 Connector 를 설정할 수 있음

1. Core Size 만큼 스레드 생성
2. 요청이 들어올 때 마다 Queue 에 담아둠
3. Core Size 중 idle 상태의 스레드가 있다면 Queue 에서 작업을 꺼내 스레드에 할당
    1. 만약 idle 상태의 스레드가 없다면 Queue 에서 대기
    2. Queue 가 가득 차면 새로 스레드를 생성
    3. maxThreadSize 에 도달하면 connection-refused 반환
4. 작업이 완료되면 스레드는 다시 idle 상태
    1. Queue 가 비어있고 Core Size 이상의 스레드가 생성되어 있다면 초과된 스레드를 destroy

스레드가 너무 많으면 CPU 의 자원을 두고 경합하게되어 처리속도 저하 및 CPU 자원 활용 비효율 발생

따라서, 적절한 스레드 수로 설정하는 것이 필요함

스레드풀 전략과 적정 스레드 개수로 검색

### 스레드풀

자바에선 ThreadPoolExecutor 를 통해 스레드풀을 사용

accept-count = 작업 대기열

스프링부트는 Integer.MAX 21억 을 줘서 무한 대기열 전략을 기본값으로 사용

```yaml
server:
  tomcat:
    threads:
      max: 2
      min-spare: 2
    accept-count: 1
  port: 5000
```

이 상태에서 5개의 요청을 보내면?

5개 모두 처리됨

BIO 에선 3개만 처리된다고 하고

NIO 여서 5개가 다 처리된다고 하는데

사실은 max-connections 가 있어서 되는거자나

그럼 max-connections 는 NIO 때문에 가능한가?
