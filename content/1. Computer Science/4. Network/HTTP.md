---
title: HTTP
date: 2022-04-25 16:18:21 +0900
status: In Progress
draft: false
tags:
  - Network
  - HTTP
---
## HTTP 개요
---
- 거의 모든 형태의 데이터를 전송할 수 있다.
- TCP 기반의 HTTP/1.1 이 주로 쓰인다.

### 비 연결성 (Connectionless)
- HTTP 는 기본적으로 연결을 유지하지 않는 모델이다.
    - 요청 → 응답 → 바로 연결 끊음
    - 서버 자원을 매우 효율적으로 사용할 수 있다.

### 한계와 극복
- TCP/IP 연결을 매번 새로 맺어야 하기 때문에 3 way handshake 시간이 추가적으로 발생한다.
- 지금은 HTTP Persistent Connections 로 문제를 해결한다.

### HTTP 와 HTTPS 의 차이
- HTTPS 는 HTTP 에 보안 계층을 추가한 것이다.
- HTTPS 는 제 3자 인증, 공개키 암호화, 비밀키 암호화를 사용한다.

### SSL handshake
- 클라이언트는 TCP 3 way handshake 를 수행한 후 Client Hello 를 전송한다.
- 서버는 인증서를 보낸다.
- 클라이언트는 받은 인증서를 신뢰하기 위해서 등록된 인증기관인지 확인한다.
- 이 인증서는 인증기관의 개인키로 암호화 되어있고 공개키로 검증할 수 있다.
- 클라이언트는 사이트의 정보와 서버의 공개키를 얻을 수 있다.
- 서버의 공개키로 통신에 사용할 비밀키를 암호화해서 서버에 보낸다.
- 서버는 이를 개인키로 확인하고 이후 통신은 공유된 비밀키로 암호회되어 통신한다.

### HTTP/1.0, HTTP/1.1, HTTP/2.0
- HTTP/1.0
	- keep-alive
- HTTP/1.1
	- persistent connection
	- pipeline
- HTTP/2.0

## HTTP 메시지
---
### HTTP 메시지 구조
```
start-line
header
empty-line (CRLF)
message-body
```

### HTTP 메시지 예시
```
# HTTP Request 예시
GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com

# HTTP Response 예시
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 3423

<html>
  <body>...</body>
</html>
```
- start-line
	- request-line (요청 메시지)
	    - `method` `request-target` `HTTP-version` 순으로 구성
	    - e.g. `GET` `/search?q=hello&hl=ko` `HTTP/1.1`
	- status-line (응답 메시지)
	    - `HTTP-version` `status-code` `reason-phrase` 순으로 구성
	    - e.g. `HTTP/1.1` `200` `OK`
- header
	- 요청 메시지
	    - e.g. Host: www.google.com
	- 응답 메시지
	    - e.g. Content-Type: text/html;charset=UTF-8
- message-body
	- 실제 전송할 데이터

## HTTP 메서드
---
### GET
- 리소스 조회에 주로 사용된다.
- 일반적으로 Request Body 를 입력하지 않으며 레거시 시스템의 경우 요청을 받아들이지 않을 수 있다.
- 서버에 전달하고자 하는 데이터는 query string 을 통해 전달한다.
- 캐싱을 수행하기 때문에 캐싱되지 않는 요청은 GET 요청이 맞지 않을 수 있다.

### POST
- 요청 데이터 처리에 주로 사용된다.
- 과거 HTTP 통신은 POST 요청으로 데이터 수정, 삭제도 모두 수행했다.
- POST 요청은 상태를 변화시키기 때문에 멱등성이 보장되지 않는다.
- 보통 Request Body 에 요청 데이터를 담아 전송하고 서버는 해당 데이터를 처리한다.

### PUT
- 리소스 덮어쓰기(수정 or 존재하지 않으면 생성)에 주로 사용된다.
- 클라이언트가 리소스의 위치를 알고 있어야 한다.
    - 리소스의 위치를 안다는 점에서 POST 와 차이가 있다.

### PATCH
- 서버에 존재하는 데이터의 일부를 변경할 때 주로 사용된다.

### DELETE
- 리소스 제거에 주로 사용된다.

## HTTP 메서드의 속성
---
### 안전
- 호출해도 리소스를 변경하지 않는다.
    - e.g. GET

### 멱등
- 한 번이던 100번이던 호출한 결과가 항상 같다.
    - e.g GET, PUT, DELETE

### 캐시가능
- 응답 결과 리소스를 캐시해서 사용해도 되는가?
    - e.g. 실무에서는 거의 GET 만 사용한다.

## HTTP Request 로 클라이언트에서 서버로 데이터 전송
---
### 데이터 전달 방식은 크게 2가지
1. GET - query parameter 를 통한 데이터 전송
2. POST, PUT, PATCH - message body 를 통한 데이터 전송

### 4가지 데이터 전송 상황
- GET - 정적 데이터 조회
    - 리소스 경로로 단순하게 조회 가능
- GET - 동적 데이터 조회
    - query parameter 사용하여 데이터 전달
- HTML Form 데이터 전송
    - Content-Type: application/x-www-form-urlencoded
    - GET - start-line 에 포함하여 조회

![[Screen_Shot_2022-04-27_at_9.45.40_PM.png]]        
- POST - message body 에 포함하여 저장

![[Screen_Shot_2022-04-27_at_9.44.59_PM.png]]        
- HTTP API 데이터 전송
    - HTML Form 전송 대신 JS 를 통한 통신에 사용
    - Content-Type: application/json
    - GET - query parameter 로 데이터 전달
    - POST, PUT, PATCH - message body 를 통해 데이터 전송

## HTTP API 설계
---
### HTTP API - 컬렉션
- POST 기반 등록
- 서버가 리소스 URI 결정한다.

### HTTP API - 스토어
- PUT 기반 등록
- 클라이언트가 리소스 URI 결정한다.
- 실무에서 거의 사용하지 않는다.

### HTML Form 사용
- GET, POST 만 지원

## URI 설계 개념
---
### 문서 (document)
- 단일 개념 (파일 하나, DB row)
    - e.g. `/members/100` `/files/star.jpg`

### 컬렉션 (collection)
- 서버가 리소스의 URI 를 생성 및 관리
    - e.g. `/members`

### 스토어 (store)
- 클라이언트가 리소스의 URI 를 생성 및 관리
    - e.g. `/files`

### 컨트롤러 (controller), 컨트롤 URI
- 위 세가지로 처리하기 어려운 프로세스 실행, 동사를 직접 사용
    - e.g. `/members/{id}/delete`

## HTTP 상태 코드
---
클라이언트가 보낸 요청의 처리 상태를 응답에서 알려주는 기능

### 1xx (Informational)
- 요청이 수신되어 처리중
	- 거의 사용하지 않으므로 생략

### 2xx (Successful)
- 클라이언트의 요청을 정상적으로 처리
- 200 OK
	- 요청 성공
- 201 Created
	- 요청 성공해서 새로운 리소스가 생성됨
	- 생성된 리소스의 응답은 Location 헤더 필드로 식별할 수 있다.
- 202 Accepted
	- 요청이 접수 되었으나 처리가 완료되지 않았음
	- 배치 처리 같은 곳에서 사용
	    - e.g. 요청 접수 후 1시간 뒤에 배치 프로세스가 요청을 처리함
	- 사실 잘 사용하지 않음
- 204 No Content
	- 서버가 요청을 성공적으로 수행했지만, 응답 페이로드 본문에 보낼 데이터가 없음
		- save 버튼의 결과로 아무 내용이 없어도 된다.
		- save 버튼을 눌러도 같은 화면을 유지해야 한다.
		- 결과 내용이 없어도 204 메시지만으로 성공을 인식할 수 있다.
		    - e.g. 웹 문서 편집기에서 save 버튼

### 3xx (Redirection)
- 요청을 완료하기 위해 유저 에이전트의 추가 조치 필요
- 웹 브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 이동 (리다이렉트)
- 영구 리다이렉션 - 301, 308
    - 리소스의 URI 가 영구적으로 이동
    - 원래 URL 을 사용하지 않음, 검색 엔진 등에서도 변경 인지
        - e.g. /members → /users
        - e.g. /event → /new-event
- 일시 리다이렉션 - 302, 303, 307
    - 리소스의 URI 가 일시적으로 변경
    - 따라서 검색 엔진 등에서 URL 을 변경하면 안됨
        - e.g. 주문 완료 후 주문 내역 화면으로 이동
    - PRG: POST/Redirect/Get
- 특수 리다이렉션 - 300, 304
    - 결과 대신 캐시를 사용
    - e.g. 요청으로 캐시 사용 가능 여부 전달 → 캐시 사용 가능 시 캐시 사용하도록 응답
- 301 Moved Permanently (영구 리다이렉션)
	- 리다이렉트 시 요청 메서드가 GET 으로 변하고, 본문이 제거될 수 있음
- 308 Permanent Redirect (영구 리다이렉션)
	- 리다이렉트 시 요청 메서드와 본문을 유지
- 302 Found (일시 리다이렉션)
	- 리다이렉트 시 요청 메서드가 GET 으로 변하고, 본문이 제거될 수 있음
- 303 See Other (일시 리다이렉션)
	- 리다이렉트 시 요청 메서드가 GET 으로 변경
- 307 Temporary Redirect (일시 리다이렉션)
	- 리다이렉트 시 요청 메서드와 본문을 유지
- PRG: POST/Redirect/GET
	- 문제: POST 로 주문 후 웹 브라우저를 새로고침하면?
	    - 새로고침은 다시 요청이기 때문에 중복 주문이 될 수 있음
	- 해결: POST 로 주문 후 주문 결과 화면을 GET 메서드로 리다이렉트
	    - 새로고침 해도 GET 으로 결과 화면만 조회
- 304 Not Modified (특수 리다이렉션)
	- 캐시를 목적으로 사용
		- 클라이언트에게 리소스가 수정되지 않았음을 알려준다.
		- 따라서 클라이언트는 로컬에 저장된 캐시를 재사용한다. (캐시로 리다이렉트)
		- 304 응답은 로컬 캐시를 사용해야 하므로 응답에 메시지 바디를 포함하면 안된다.

### 4xx (Client Error)
- 클라이언트 오류, 잘못된 문법등으로 서버가 요청을 수행할 수 없음
- 400 Bad Request
	- 클라이언트가 잘못된 요청을 해서 서버가 요청을 처리할 수 없음
	- 요청 구문, 메시지 등등 오류
	- 클라이언트는 요청 내용을 검토하고 다시 보내야 함
	    - e.g. 요청 파라미터가 잘못되거나, API 스펙이 맞지 않을 때
- 401 Unauthorized
	- 클라이언트가 해당 리소스에 대한 인증이 필요함
	- 인증되지 않음
	- 401 오류 발생 시 응답에 WWW-Authenticate 헤더와 함께 인증 방법을 설명
- 403 Forbidden
	- 서버가 요청을 이해했지만 승인을 거부함
	- 주로 인증 자격 증명은 있지만, 접근 권한이 불충분한 경우
	    - e.g. 어드민 등급이 아닌 사용자가 로그인을 했지만, 어드민 등급의 리소스에 접근하는 경우
- 404 Not Found
	- 요청 리소스를 찾을 수 없음
	- 요청 리소스가 서버에 없음
	- 또는 클라이언트가 권한이 부족한 리소스에 접근할 때 해당 리소스를 숨기고 싶을 때

### 5xx (Server Error)
- 서버 오류, 서버가 정상 요청을 처리하지 못함
- 서버에 문제가 있기 때문에 재시도 하면 성공할 수도 있음
- 500 Internal Server Error
	- 서버 문제로 오류 발생, 애매하면 500 오류
- 503 Service Unavailable
	- 서비스 이용 불가
	- 서버가 일시적인 과부화 또는 예정된 작업으로 잠시 요청을 처리할 수 없음
	- Retry-After 헤더 필드로 얼마뒤에 복구되는지 보낼 수도 있음
