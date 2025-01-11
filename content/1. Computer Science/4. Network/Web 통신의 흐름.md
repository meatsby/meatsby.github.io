---
title: Web 통신의 흐름
date: 2022-10-01 21:23:49 +0900
status: In Progress
draft: false
tags:
  - Network
---
## URI (Uniform Resource Identifier)
---
![[Screen_Shot_2022-04-28_at_11.56.07_AM.png]]
URI - 리소스 식별자, 자원의 위치를 식별하는 방법이다.
- URL (Locator) - 리소스가 있는 위치를 지정한다.
- URN (Name) - 리소스에 이름을 부여한다.

### URL 구조
```
`scheme`://[userinfo@]`host`[:port][`/path`][`?query`][#fragment]
```
- `scheme` - 프로로콜
- `host` - 호스트명, 도메인명
- `/path` - 리소스 경로
- `?query` - query parameter

## 웹 브라우저 요청 흐름
---
1. 브라우저가 URL 에 적힌 값을 파싱해서 HTTP Request Message 를 생성
	- SOCKET 라이브러리를 통해 전달
		- TCP/IP 연결
		- 데이터 전달
	- HTTP 메시지 포함한 TCP/IP Packet 생성
2. OS 에 전송 요청
3. DNS Lookup 수행
    - PC → 공유기 → DNS
    - DNS Lookup 은 루트 도메인 서버에서 부터 서브도메인 서버순으로 찾음
4. 브라우저 → hosts 파일 → DNS Cache 순으로 도메인에 매칭되는 IP 찾음
5. TCP 연결
6. 이 요청은 프로토콜 스택이라는 OS 에 내장된 네트워크 제어용 소프트웨어에 의해 패킷에 담김
7. 패킷에 제어 정보를 덧붙여 LAN 어댑터에 전송하고 LAN 어댑터는 이를 전기 신호로 변환 후 송출
8. 패킷은 스위칭 허브 등을 경유하여 인터넷 접속용 라우터에 ISP 로 전달되어 인터넷으로 이동
9. 엑세스 회선에 의해 통신사용 라우터로 운반되어 인터넷 핵심부로 전달 됨
10. 고속 라우터들 사이로 목적지까지 패킷이 흘러들어감
11. 핵심부를 통과한 패킷은 목적지의 LAN 에 도착
12. 방화벽이 패킷을 검사
13. 캐시 서버로 보내 웹 서버에 갈 필요가 있는지 검사
14. 웹 서버에 도착한 패킷은 프로토콜 스택이 패킷을 추출하여 메시지를 복원
15. 웹 서버 애플리케이션으로 넘김
16. 애플리케이션은 요청에 대한 응답 데이터를 작성하여 클라이언트로 회송
17. HTTP 응답 메시지 도착

### 클라이언트 측에서 공유기를 사용하게 된다면?

## GSLB
---

## CDN
---
- akamai
- KT
