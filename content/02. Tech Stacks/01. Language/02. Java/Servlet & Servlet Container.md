---
title: Servlet & Servlet Container
date: 2022-09-27 20:00:00 +0900
status: Done
draft: false
tags:
  - Java
---
## Servlet
---
`Servlet` 은 웹 서버 내에서 웹 페이지를 동적으로 생성하는 Java 기반의 웹 애플리케이션 프로그램이다.

`Servlet` 은 웹 클라이언트로부터 요청을 받고 특정 로직을 수행한 뒤 응답을 보낸다.

Java 에서 `Servlet` 은 인터페이스로 제공되는데, 프로토콜에 독립적인 `GenericServlet` 이나 HTTP 요청을 처리할 수 있는 `HttpServlet` 을 사용할 수 있다.

## Servlet 의 생명주기
---
### init(ServletConfig config)

`init()` 메서드는 `Servlet` 이 서비스에 배치되고 있음을 `Servlet` 에게 알리기 위해 톰캣과 같은 `ServletContainer` 에 의해 호출된다.

`ServletContainer` 는 `Servlet` 을 인스턴스화한 후 `init()` 메서드를 최초에 한 번 호출한다. `Servlet` 이 요청을 수신하기 위해선 `init()` 메서드가 성공적으로 완료되어야 한다.

### service(ServletRequest req, ServletResponse res)

`Servlet` 이 요청을 처리할 수 있도록 `ServletContainer` 에 의해 호출된다.

`service()` 메서드는 `init()` 메서드가 정상적으로 완료되었을 경우에만 호출된다.

`Servlet` 은 일반적으로 여러 요청을 동시에 처리할 수 있는 멀티 스레드 `ServletContainer` 에서 처리된다. 때문에, `Servlet` 을 구현할 때 파일, 네트워크 커넥션, 서블릿의 클래스 및 인스턴스 변수과 같은 공유 리소스에 대한 접근을 동기화해주어야 한다.

### destroy()

`destroy()` 메서드는 `Servlet` 이 서비스에서 제거되고 있음을 `Servlet` 에게 알리기 위해 `ServletContainer` 에 의해 호출된다. 이 메서드는 `Servlet` 내의 모든 스레드가 종료되거나 `timeout` 기간이 지난 후에만 호출된다. `ServletContainer` 가 이 메서드를 호출한 후에는 해당 `Servlet` 의 `service()` 메서드를 호출하지 않는다.

이 메서드는 `Servlet` 이 보유한 메모리, 스레드 등의 리소스를 정리할 기회를 제공하고 모든 영속 상태를 메모리에 있는 `Servlet` 의 현재 상태와 동기화 되도록 한다.

## Servlet Container
---
`ServletContainer` 는 클라이언트의 요청을 받고 응답할 수 있도록 소켓으로 통신하고 요청에 맞는 `Servlet` 을 찾아 요청을 처리하는 등 전반적인 `Servlet` 의 관리를 담당한다.

대표적인 `ServletContainer` 로 `Tomcat` 이 있다.

## Servlet Container 의 역할
---
### 웹 서버와 통신 지원

`ServletContainer` 는 `Servlet` 과 웹 서버가 통신할 수 있도록 도와준다. 이러한 통신 과정을 생략할 수 있도록 해주기 때문에 개발자는 `Servlet` 의 `service()` 메서드에서 비즈니스 로직을 구현하는데 집중할 수 있다.

### Servlet 의 생명주기 관리

`ServletContainer` 는 `Servlet` 을 인스터스화하고 `init()` 를 호출해 `Servlet` 을 초기화한다.

요청이 들어오면 `service()` 메서드를 통해 요청을 처리하고 `Servlet` 의 역할이 종료되면 `destroy()` 를 호출하여 GC 대상이 되도록 한다.

### 멀티스레드 지원 및 관리

`ServletContainer` 는 요청이 들어올 때 마다 요청을 처리할 Java 스레드를 새로 생성한다. 다중 스레드 생성 및 운영을 통해 동시 요청을 처리할 수 있다.
