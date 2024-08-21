---
title: Web Server & WAS
date: 2022-08-02 19:30:00 +0900
status: In Progress
tags:
  - Web
---

## Static Pages & Dynamic Pages

---

### Static Pages

- 파일 경로 이름을 통해 경로와 일치하는 File Contents 를 반환
- 항상 동일한 페이지를 반환
- e.g. `image` `html` `css` `js` 등 컴퓨터에 저장된 파일들

### Dynamic Pages

- 인자에 따라 동적인 Contents 반환
- 웹 서버에 의해 실행되는 프로그램을 통해 만들어진 결과물
    - `Servlet` WAS 에서 돌아가는 Java Program
    - `Servlet` 의 `doGet()` 을 구현하여 동적인 Contents 반환

## Web Server

---

### Web Server란?

- 클라이언트로부터 HTTP 요청을 받아 정적인 Contents 를 제공하는 컴퓨터 프로그램
- 요청에 따라 두 가지 기능 중 적절한 기능을 수행
    - 정적 Contents 요청 시, WAS 를 호출하지 않고 바로 정적 자원을 제공
    - 동적 Contents 요청 시, WAS 에 클라이언트 요청을 전달 후 응답 제공
- e.g. `Apache` `NginX` 등

## WAS(Web Application Server)

---

### WAS 란?

- DB 조회나 비즈니스 로직 처리를 요구하는 동적 Contents 제공을 위한 Application Server
- Web Container 혹은 Servlet Container 라고도 불림
    - Web Container 는 JSP, Servlet 을 실행시킬 수 있는 소프트웨어
    - 즉, WAS는 JSP, Servlet 구동 환경을 제공
- WAS = Web Server + Web Container
- DB 조회나 비즈니스 로직 수행을 위한 프로그램 실행 환경과 DB 접속 기능 제공
- e.g. `Tomcat` `JBoss` `Jeus` `Web Sphere` 등

## Web Server 와 WAS 분리하는 이유

---

### Web Server 가 필요한 이유

- `html` 에 포함된 `css` `js` `img` 등은 브라우저가 해당 파일을 필요로 할 때 요청함
    - 즉, 하나의 페이지를 로딩할 때 여러번 요청을 보냄
- Web Server 를 통해 WAS 까지 요청을 보내지않고 앞단에서 빠르게 정적 Contents 반환
    - 정적 파일 반환만 처리하도록 분리하여 WAS 의 부담을 줄일 수 있음

### WAS 가 필요한 이유

- 사용자 요청에 맞는 동적 Contents 를 제공하기 위해
    - Web Server 만 사용할 경우 사용자 요청에 맞는 Contents 를 미리 만들어놓고 서비스해야 함
- 사용자 요청에 맞춰 DB 조회 및 비즈니스 로직을 수행한 결과를 반환해 자원을 효율적으로 사용할 수 있음

### WAS 가 Web Server 의 기능을 수행하지 않는 이유

1. 기능 분리를 통한 서버 부하 방지
    - WAS 는 DB 조회나 다양한 로직을 처리하느라 바쁘기 때문에 단순한 정적 Contents 는 Web Server 에서 제공하는 것이 효율적임
    - 만약 WAS 가 정적 Contents 제공까지 수행한다면 동적 Contents 처리에 의해 부하가 증가하고 이는 처리 시간 지연으로 이어짐
2. 물리적 분리를 통한 보안 강화
    - Web Server 를 통한 SSL 암복호화 처리
3. 여러 대의 WAS 배치 가능
    - Web Server 를 통한 Load Balancing
    - 무중단 배포 및 장애 극복에 쉽게 대응
4. 여러 어플리케이션 서비스 가능
    - 하나의 서버에 PHP Application 과 Java Application 을 함께 사용할 수 있음
- 즉, 효율적인 자원 사용 및 분산 처리, 장애 극복, 배포 및 유지보수의 편의성을 위해 분리

## Web Service Architecture

---

![[Web Service Architecture.png]]

1. Client 는 Web Server 에게 HTTP 요청을 보냄
2. Web Server 는 HTTP 요청을 WAS 에 보냄
3. WAS 는 관련된 Servlet 을 메모리에 올림
4. WAS 는 해당 Servlet 에 대한 Thread 를 Thread Pool 에서 가져옴
5. `HttpServletRequest` `HttpServletResponse` 객체 생성 후 Servlet 에 전달
6. `doGet()` `doPost()` 메서드가 처리한 요청을 `HttpServletResponse` 객체에 담음
7. WAS 는 `HttpServletResponse` 객체를 HTTP 응답 형태로 변환 후 Web Server 에 전달
8. WAS 는 사용한 Thread 를 Thread Pool 에 반납하고 사용된 요청 응답 객체들은 제거됨

## References

---

- [https://www.youtube.com/watch?v=NyhbNtOq0Bc](https://www.youtube.com/watch?v=NyhbNtOq0Bc)
- [https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html](https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html)
- [https://gyoogle.dev/blog/web-knowledge/Web Server와 WAS의 차이.html](https://gyoogle.dev/blog/web-knowledge/Web%20Server%EC%99%80%20WAS%EC%9D%98%20%EC%B0%A8%EC%9D%B4.html)
