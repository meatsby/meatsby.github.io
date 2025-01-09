---
title: HTTP Basic
date: 2022-04-25 16:18:21 +0900
status: Done
draft: false
tags:
  - Network
  - HTTP
---
# 2. URI 와 웹 브라우저 요청 흐름

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
### 1. HTTP 요청 메시지 전송
1. 웹 브라우저가 HTTP 메시지 생성
![[Screen_Shot_2022-04-28_at_12.00.28_PM.png]]    
2. SOCKET 라이브러리를 통해 전달
    1. TCP/IP 연결
    2. 데이터 전달
3. HTTP 메시지 포함한 TCP/IP Packet 생성
![[Screen_Shot_2022-04-28_at_12.00.52_PM.png]]    
### 2. HTTP 응답 메시지 도착
![[Screen_Shot_2022-04-28_at_12.01.08_PM.png]]

# 3. HTTP 기본

## HTTP 개요
---
- 거의 모든 형태의 데이터를 전송할 수 있다.
- TCP 기반의 HTTP/1.1 이 주로 쓰인다.

## 클라이언트 서버 구조
---
1. 클라이언트가 서버에 요청을 보내고 응답을 기다린다.
2. 서버가 요청에 대한 결과를 만들어 응답한다.

## Stateful, Stateless
---
### 무상태 프로토콜 (Stateless)
- 서버가 클라이언트의 상태를 보존하지 않는다.
    - 장점: 서버 확장성이 높다.
    - 단점: 클라이언트가 추가 데이터를 전송해야 한다.
### Stateful, Stateless 차이
- Stateful - 중간에 서버가 바뀌면 안된다.
- Stateless - 중간에 서버가 바뀌어도 되며, 갑자기 요청이 증가해도 서버를 대거 투입할 수 있다.
### Stateless 실무 한계
- 로그인한 사용자의 경우 로그인 했다는 상태를 서버에서 유지해야 한다.
    - 일반적으로 브라우저 쿠키와 서버 세션등을 사용해서 상태 유지
- 상태 유지는 최소한만 사용

## 비 연결성 (Connectionless)
---
- HTTP 는 기본적으로 연결을 유지하지 않는 모델이다.
    - 요청 → 응답 → 바로 연결 끊음
    - 서버 자원을 매우 효율적으로 사용할 수 있다.
### 한계와 극복
- TCP/IP 연결을 매번 새로 맺어야 하기 때문에 3 way handshake 시간이 추가적으로 발생한다.
- 지금은 HTTP Persistent Connections 로 문제를 해결한다.

## HTTP 메시지
---
![[Screen_Shot_2022-04-27_at_9.20.38_PM.png]]
![[Screen_Shot_2022-04-27_at_9.22.31_PM.png]]
![[Screen_Shot_2022-04-27_at_9.23.12_PM.png]]
### start-line
- request-line (요청 메시지)
    - `method` `request-target` `HTTP-version` 순으로 구성
    - e.g. `GET` `/search?q=hello&hl=ko` `HTTP/1.1`
- status-line (응답 메시지)
    - `HTTP-version` `status-code` `reason-phrase` 순으로 구성
    - e.g. `HTTP/1.1` `200` `OK`
### header
- 요청 메시지
    - e.g. Host: www.google.com
- 응답 메시지
    - e.g. Content-Type: text/html;charset=UTF-8
### message body
- 실제 전송할 데이터

# 4. HTTP 메서드

## HTTP 메서드 - GET, POST
---
### GET
- 리소스 조회에 주로 사용된다.
- 서버에 전달하고자 하는 데이터는 query string 을 통해 전달한다.
### POST
- 요청 데이터 처리에 주로 사용된다.
- message body 를 통해 서버로 요청 데이터를 전달한다.
    - 서버는 message body 를 통해 들어온 데이터를 처리한다.

## HTTP 메서드 - PUT, PATCH, DELETE
---
### PUT
- 리소스 덮어쓰기에 주로 사용된다.
- 클라이언트가 리소스의 위치를 알고 있어야 한다.
    - 리소스의 위치를 안다는 점에서 POST 와 차이가 있다.
### PATCH
- 리소스 부분 변경에 주로 사용된다.
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

# 5. HTTP 메서드 활용

## 클라이언트에서 서버로 데이터 전송
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

# 6. HTTP 상태코드

## 상태 코드
---
클라이언트가 보낸 요청의 처리 상태를 응답에서 알려주는 기능

## 1xx (Informational)
---
요청이 수신되어 처리중
- 거의 사용하지 않으므로 생략

## 2xx (Successful)
---
클라이언트의 요청을 정상적으로 처리
### 200 OK
요청 성공
### 201 Created
요청 성공해서 새로운 리소스가 생성됨
- 생성된 리소스의 응답은 Location 헤더 필드로 식별할 수 있다.
### 202 Accepted
요청이 접수 되었으나 처리가 완료되지 않았음
- 배치 처리 같은 곳에서 사용
    - e.g. 요청 접수 후 1시간 뒤에 배치 프로세스가 요청을 처리함
- 사실 잘 사용하지 않음
### 204 No Content
서버가 요청을 성공적으로 수행했지만, 응답 페이로드 본문에 보낼 데이터가 없음
- save 버튼의 결과로 아무 내용이 없어도 된다.
- save 버튼을 눌러도 같은 화면을 유지해야 한다.
- 결과 내용이 없어도 204 메시지만으로 성공을 인식할 수 있다.
    - e.g. 웹 문서 편집기에서 save 버튼

## 3xx (Redirection)
---
요청을 완료하기 위해 유저 에이전트의 추가 조치 필요
### 리다이렉션 이해
- 웹 브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 이동 (리다이렉트)
### 리다이렉션 종류
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
### 301 Moved Permanently (영구 리다이렉션)
리다이렉트 시 요청 메서드가 GET 으로 변하고, 본문이 제거될 수 있음
### 308 Permanent Redirect (영구 리다이렉션)
리다이렉트 시 요청 메서드와 본문을 유지
### 302 Found (일시 리다이렉션)
리다이렉트 시 요청 메서드가 GET 으로 변하고, 본문이 제거될 수 있음
### 303 See Other (일시 리다이렉션)
리다이렉트 시 요청 메서드가 GET 으로 변경
### 307 Temporary Redirect (일시 리다이렉션)
리다이렉트 시 요청 메서드와 본문을 유지
### PRG: POST/Redirect/GET
문제
- POST 로 주문 후 웹 브라우저를 새로고침하면?
    - 새로고침은 다시 요청이기 때문에 중복 주문이 될 수 있음
해결
- POST 로 주문 후 주문 결과 화면을 GET 메서드로 리다이렉트
    - 새로고침 해도 GET 으로 결과 화면만 조회
### 304 Not Modified (특수 리다이렉션)
캐시를 목적으로 사용
- 클라이언트에게 리소스가 수정되지 않았음을 알려준다.
- 따라서 클라이언트는 로컬에 저장된 캐시를 재사용한다. (캐시로 리다이렉트)
- 304 응답은 로컬 캐시를 사용해야 하므로 응답에 메시지 바디를 포함하면 안된다.

## 4xx (Client Error)
---
클라이언트 오류, 잘못된 문법등으로 서버가 요청을 수행할 수 없음
### 400 Bad Request
클라이언트가 잘못된 요청을 해서 서버가 요청을 처리할 수 없음
- 요청 구문, 메시지 등등 오류
- 클라이언트는 요청 내용을 검토하고 다시 보내야 함
    - e.g. 요청 파라미터가 잘못되거나, API 스펙이 맞지 않을 때
### 401 Unauthorized
클라이언트가 해당 리소스에 대한 인증이 필요함
- 인증되지 않음
- 401 오류 발생 시 응답에 WWW-Authenticate 헤더와 함께 인증 방법을 설명
### 403 Forbidden
서버가 요청을 이해했지만 승인을 거부함
- 주로 인증 자격 증명은 있지만, 접근 권한이 불충분한 경우
    - e.g. 어드민 등급이 아닌 사용자가 로그인을 했지만, 어드민 등급의 리소스에 접근하는 경우
### 404 Not Found
요청 리소스를 찾을 수 없음
- 요청 리소스가 서버에 없음
- 또는 클라이언트가 권한이 부족한 리소스에 접근할 때 해당 리소스를 숨기고 싶을 때

## 5xx (Server Error)
---
서버 오류, 서버가 정상 요청을 처리하지 못함
- 서버에 문제가 있기 때문에 재시도 하면 성공할 수도 있음
### 500 Internal Server Error
서버 문제로 오류 발생, 애매하면 500 오류
### 503 Service Unavailable
서비스 이용 불가
- 서버가 일시적인 과부화 또는 예정된 작업으로 잠시 요청을 처리할 수 없음
- Retry-After 헤더 필드로 얼마뒤에 복구되는지 보낼 수도 있음

# 7. HTTP 헤더 1 - 일반 헤더

## HTTP 헤더 개요
---
![[Screen_Shot_2022-05-06_at_10.00.28_PM.png]]
`field-name: field-value` 형식으로 이루어져 있다.
### HTTP 헤더의 용도
- HTTP 전송에 필요한 모든 부가정보를 포함한다.
    - e.g. 메시지 바디의 내용, 메시지 바디의 크기, 압축, 인증, 등등...
- 표준 헤더가 너무 많으며, 필요 시 임의의 헤더를 추가할 수 있다.
### HTTP 헤더의 분류
![[Untitled.png]]
- General 헤더 - 메시지 전체에 적용되는 정보
    - e.g. Connection: close
- Reqeust 헤더 - 요청 정보
    - e.g. User-Agent: Mozilla/5.0 (Macintosh; ..)
- Response 헤더 - 응답 정보
    - e.g. Server: Apache
- Representation 헤더 - 표현 데이터 정보
    - e.g. Content-Type: text/html, Content-Length: 3423
### HTTP BODY
- 메시지 본문을 통해 표현 데이터를 전달한다.
- 메시지 본문 = 페이로드
- 표현 = 요청이나 응답에서 전달할 실제 데이터
- 표현 헤더 = 표현 데이터 해석 정보 제공
    - 데이터 유형, 길이, 압축 정보 등등...
![[Screen_Shot_2022-05-06_at_10.12.44_PM.png]]

## 표현
---
### Content-Type
표현 데이터의 형식
- 미디어 타입, 문자 인코딩
- e.g. Content-Type: application/json
### Content-Encoding
표현 데이터의 압축 방식
- 표현 데이터를 압축하기 위해 사용
- 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가
- 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
- e.g. Content-Encoding: gzip
### Content-Language
표현 데이터의 자연 언어
- 표현 데이터의 자연 언어를 표현
- e.g. Content-Language: en-US
### Content-Length
표현 데이터의 길이
- 바이트 단위
- Transfer-Encoding(전송 코딩)을 사용하면 Content-Length 를 사용하면 안됨

## 콘텐츠 협상
---
### Content Negotiation 이란?
Content Negotiation 이란 클라이언트가 선호하는 표현을 요청하는 것을 의미한다.
- Accept: 클라이언트가 선호하는 미디어 타입 전달
- Accept-Charset: 클라이언트가 선호하는 문자 인코딩
- Accept-Encoding: 클라이언트가 선호하는 압축 인코딩
- Accept-Language: 클라이언트가 선호하는 자연 언어
협상 헤더는 요청 시 사용되며 위와 같은 형태로 포함된다.
### 협상과 우선순위
선호하는 표현의 우선순위를 정의하여 요청하는 것을 의미한다.
- 0~1 사이의 Quality Values(q) 값을 사용하여 큰 값을 우선한다. (q 값이 없다면 1이 생략된 것을 의미)
    > GET /event
    Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
    > 
    위와 같은 요청이 주어졌을 때 우선순위는 아래와 같다.
    1. ko-KR(;q=1)
    2. ko;q=0.9
    3. en-US;q=0.8
    4. en;q=0.7

구체적인 것을 우선한다.
```
GET /event
Accept: text/*,text/plain,text/plain;format=flowed,*/*
```
위와 같은 요청이 주어졌을 때 우선순위는 아래와 같다.
1. text/plain;format=flowed
2. text/plain
3. text/*
4. */*

구체적인 것을 기준으로 미디어 타입을 맞춘다.
```
GET /event
Accept: text/*;q=0.3,text/html;q=0.7,text/html;level=1,text/html;level=2;q=0.4,*/*;q=0.5
```
위와 같은 요청이 주어졌을 때 q값은 아래와 같다.
- text/html;level=1;q=1
- text/html;q=0.7
- text/plain;q=0.3
- image/jpeg;q=0.5
- text/html;level=2;q=0.4
- text/html;level=3;q=0.7

## 전송 방식
---
### 단순 전송 Content-Length
메시지 바디에 대한 Content-Length 를 지정하여 전송한다.
> HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 3423
<html>
<body>...</body>
</html>
> 
### 압축 전송 Content-Encoding
Content-Encoding 을 명시하여 메시지 바디를 압축하여 전송한다.
> HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Encoding: gzip
Content-Length: 521
lkj123kljoiasudlkjaweioluywlnfdo912u34ljko98udjkl
> 
### 분할 전송 Transfer-Encoding
메시지 바디를 분할하여 전송한다.
분할 전송 시 Chunk 마다 길이가 주어지기 때문에 Content-Length 를 명시하지 않아도 된다.
> HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked
5
Hello
5
World
0
\r\n
> 
### 범위 전송 Range, Content-Range
데이터를 받는 도중 전송이 끊길 경우 범위 전송을 통해 남은 데이터를 이어 받을 수 있다.
> HTTP/1.1 200 OK
Content-Type: text/plain
Content-Range: bytes 1001-2000 / 2000
qweqwe1l2iu3019u2oehj1987askjh3q98y
> 

## 일반 정보
---
### From
유저 에이전트의 이메일 정보
- 일반적으로 잘 사용되지 않는다.
- 검색 엔진 같은 곳에서 주로 사용한다.
- 요청에서 사용한다.
### Referer
이전 웹 페이지의 주소
- 현재 요청된 페이지의 이전 웹 페이지 주소이다.
- A → B 로 이동하는 경우 B 를 요청할 때 Referer: A 를 포함해서 요청한다.
- Referer 를 사용해서 유입 경로를 분석할 수 있다.
- 요청에서 사용한다.
### User-Agent
유저 에이전트 애플리케이션 정보
> user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/
537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36
> 
- 클라이언트의 애플리케이션 정보 (웹 브라우저 정보, 등등)
- 어떤 종류의 브라우저에서 장애가 발생하는지 파악할 수 있다.
- 요청에서 사용한다.
### Server
요청을 처리하는 ORIGIN 서버의 소프트웨어 정보
> Server: Apache/2.2.22 (Debian)
> 
- 응답에서 사용한다.
### Date
메시지가 발생한 날짜와 시간
> Date: Tue, 15 Nov 1994 08:12:31 GMT
> 
- 응답에서 사용한다.

## 특별한 정보
---
### Host
요청한 호스트 정보 (도메인)
- 요청에서 사용하며 필수이다.
- 하나의 서버가 여러 도메인을 처리해야 할 때. 즉, 하나의 IP 주소에 여러 도메인이 적용되어 있을 때 사용된다.
### Location
페이지 리다이렉션
- 웹 브라우저는 3xx 응답 결과에 Location 헤더가 있으면, Location 위치로 자동 이동한다.
- 201 Created 에서의 Location 값은 요청에 의해 생성된 리소스 URI 를 의미한다.
### Allow
허용 가능한 HTTP 메서드
- 405 Method Not Allowed 에서 응답에 포함해야 한다.
### Retry-After
유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간
- 503 Service Unavaiable: 서비스가 언제까지 불능인지 알려줄 수 있다.

## 인증
---
### Authorization
클라이언트 인증 정보를 서버에 전달
> Authorization: Basic xxxxx
> 
### WWW-Authenticate
리소스 접근 시 필요한 인증 방법 정의
> WWW-Authenticate: Newauth realm="apps", type=1,title="Login to \"apps\"", Basic realm="simple"
> 
- 401 Unauthorized 응답과 함께 사용한다.

## 쿠키
---
웹브라우저 내부에 쿠키 저장소가 존재한다.
- Set-Cookie: 서버에서 클라이언트로 쿠키를 전달한다.
- Cookie: 클라이언트가 서버에서 받은 쿠키를 저장하고, HTTP 요청 시 서버로 전달한다.
> set-cookie: sessionId=abcde1234; expires=Sat, 26-Dec-2020 00:00:00 GMT; path=/; domain=.google.com; Secure
> 
- 쿠키는 사용자 로그인 세션 관리 및 광고 정보 트래킹에 사용된다.
- 쿠키 정보는 항상 서버에서 전송된다.
    - 네트워크 트래픽을 추가로 유발한다.
    - 최소한의 정보만 사용한다. (세션 id, 인증 토큰)
- 보안에 민감한 데이터는 저장하면 안된다. (주민번호, 신용카드 번호 등등)
### 쿠키 - 생명주기
> Set-Cookie: expires=Sat, 26-Dec-2020 04:39:21 GMT
> 
- 만료일이 되면 쿠키를 삭제한다.
> Set-Cookie: max-age=3600 (3600초)
> 
- 0 이나 음수를 지정하면 쿠키를 삭제한다.
세션 쿠키 - 만료 날짜를 생략하면 브라우저 종료 시 까지만 유지한다.
영속 쿠키 - 만료 날짜를 입력하면 해당 날짜까지 유지한다.
### 쿠키 - 도메인
> domain=example.org
> 
- 명시할 경우 - 명시한 문서 기준 도메인 + 서브 도메인을 포함하여 쿠키를 생성한다.
    - e.g. example.org, dev.example.org 모두 쿠키 접근이 가능
- 생략할 경우 - 현재 문서 기준 도메인만 적용한다.
    - e.g. example.org 에서만 쿠키 접근이 가능
### 쿠키 - 경로
> path=/home
> 
이 경로를 포함한 하위 경로 페이지만 쿠키 접근이 가능하다. 일반적으로 `path=/` 루트로 지정한다.
- e.g. /home, /home/level1, ... 모두 쿠키 접근 가능
- e.g. /hello 는 불가능
### 쿠키 - 보안
> Secure
> 
- 쿠키는 http, https 를 구분하지 않고 전송하기 때문에 Secure 를 적용하면 https 인 경우에만 전송한다.
> HttpOnly
> 
- JS 에서 접근이 불가하다.
- HTTP 전송에만 사용한다.
> SameSite
> 
- 요청 도메인과 쿠키에 설정된 도메인이 같은 경우에만 쿠키를 전송한다.

# 8. HTTP 헤더 2 - 캐시와 조건부 요청

## 캐시 기본 동작
---
### 캐시가 없을 때
데이터가 변경되지 않아도 계속 네트워크를 통해서 데이터를 다운받아야 한다.
### 캐시 적용
캐시를 통해 캐시 가능 시간 동안 네트워크를 사용하지 않아도 된다.
### 캐시 시간 초과
캐시 유효 시간이 초과되면, 서버를 통해 데이터를 다시 조회하고, 캐시를 갱신한다.

## 검증 헤더와 조건부 요청 1
---
### 검증 헤더
캐시 데이터와 서버 데이터가 같은지 검증하는 데이터
> Last-Modified: 2020년 11월 10일 10:00:00
> 
### 조건부 요청
검증 헤더로 조건에 따른 분기
> if-modified-since: 2020년 11월 10일 10:00:00
> 
### 캐시 시간 초과
캐시가 만료된 후에도 서버에서 데이터를 변경하지 않았을 경우, 클라이언트와 서버의 데이터가 같다는 사실을 확인할 수 있다면 저장해두었던 캐시를 재사용 할 수 있다.
1. 캐시 유효 시간이 초과해도, 서버의 데이터가 갱신되지 않으면 304 Not Modified 와 바디 없이 헤더의 메타 정보만 응답한다.
2. 클라이언트는 서버가 보낸 응답 헤더 정보를 통해 캐시의 메타 정보를 갱신하고 캐시에 저장되어 있는 데이터를 재활용한다.
3. 결과적으로 네트워크 다운로드가 발생하지만 용량이 적은 헤더 정보만 다운로드 받을 수 있다.

## 검증 헤더와 조건부 요청 2
---
### Last-Modified 와 If-Modified-Since 의 단점
- 날짜 기반의 로직을 사용하고 1초 미만 단위로 캐시 조정이 불가능하다.
- A → B → A 와 같은 데이터 변경이 일어났을 경우, 결론적인 데이터는 같지만, 수정일이 다르기 때문에 다시 다운로드 받아야 한다.
- 서버에서 별도의 캐시 로직을 관리하고 싶을 경우
    - e.g. 스페이스나 주석처럼 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우
### ETag 와 If-None-Match
> ETag: "aaaaaaaaaa"
> 
- 캐시용 데이터에 임의의 고유 버전 이름을 달아둔다.
- 데이터가 변경되면 이 이름을 바꾸어서 변경한다. (Hash 를 다시 생성)

## 캐시와 조건부 요청 헤더
---
### Cache-Control: 캐시 제어
캐시 지시어 (directives)
- Cache-Control: max-age
    - 캐시 유효 시간, 초 단위
- Cache-Control: no-cache
    - 데이터는 캐시해도 되지만, 항상 origin 서버에 검증하고 사용
- Cache-Control: no-store
    - 데이터에 민감한 정보가 있으므로 저장하면 안됨 (메모리에서 사용하고 최대한 빨리 삭제)

## 프록시 캐시
---
### 프록시 캐시 서버란?
프록시는 클라이언트와 서버 사이 대리 통신을 수행하는 것을 의미한다.
프록시 캐시 서버란 원 서버에서 다운로드 받을 캐시를 미리 받아놓는 일종의 중계 캐시 서버를 의미한다.
기타 캐시 지시어
- Cache-Control: public
    - 응답이 public 캐시에 저장되어도 됨
- Cache-Control: private
    - 응답이 해당 사용자만을 위한 것이므로 private 캐시에 저장해야 함
- Cache-Control: s-maxage
    - 프록시 캐시에만 적용되는 max-age
- Age: 60 (HTTP 헤더)
    - origin 서버에서 응답 후 프록시 캐시 내에 머문 시간 (초)

## 캐시 무효화
---
브라우저가 캐시하면 안되는 정보들에 대하여 확실하게 캐시를 무효화하고 싶을 때 사용해야 하는 지시어들이다.
- Cache-Control: no-cache
    - 데이터는 캐시해도 되지만, 항상 원 서버에 검증하고 사용
- Cache-Control: no-store
    - 데이터에 민감한 정보가 있으므로 저장하면 안됨 (메모리에서 사용하고 최대한 빨리 삭제)
- Cache-Control: must-revalidate
    - 캐시 만료 후 최초 조회 시 원 서버에 검증해야 함
    - 원 서버 접근 실패 시 반드시 오류가 발생해야 함 - 504 Gateway Timeout
    - must-revalidate 는 캐시 유효 시간이라면 캐시를 사용함
- Pragma: no-cache
    - HTTP 1.0 하위 호환
### no-cache vs must-revalidate
프록시 캐시와 원 서버가 순간 단절되어 원 서버 접근이 불가한 경우
- no-cache 는 프록시 서버의 데이터라도 조회하여 응답하는 경우가 있음
- must-revalidate 는 항상 504 에러를 응답해야 함
