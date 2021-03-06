---
title: '[HTTP Basic] 6. HTTP 상태코드'
author: meatsby
date: 2022-05-06 10:00:00 +0900
categories: [COURSES, HTTP Basic]
tags: [인프런, Spring Roadmap]
---

## 상태 코드

---

클라이언트가 보낸 요청의 처리 상태를 응답에서 알려주는 기능

<br>

## 1xx (Informational)

---

요청이 수신되어 처리중

- 거의 사용하지 않으므로 생략

<br>

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
    - e.g.) 요청 접수 후 1시간 뒤에 배치 프로세스가 요청을 처리함
- 사실 잘 사용하지 않음

### 204 No Content

서버가 요청을 성공적으로 수행했지만, 응답 페이로드 본문에 보낼 데이터가 없음

- save 버튼의 결과로 아무 내용이 없어도 된다.
- save 버튼을 눌러도 같은 화면을 유지해야 한다.
- 결과 내용이 없어도 204 메시지만으로 성공을 인식할 수 있다.
    - e.g.) 웹 문서 편집기에서 save 버튼

<br>

## 3xx (Redirection)

---

요청을 완료하기 위해 유저 에이전트의 추가 조치 필요

### 리다이렉션 이해

- 웹 브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 이동 (리다이렉트)

### 리다이렉션 종류

- 영구 리다이렉션 - 301, 308
    - 리소스의 URI 가 영구적으로 이동
    - 원래 URL 을 사용하지 않음, 검색 엔진 등에서도 변경 인지
        - e.g.) /members → /users
        - e.g.) /event → /new-event
- 일시 리다이렉션 - 302, 303, 307
    - 리소스의 URI 가 일시적으로 변경
    - 따라서 검색 엔진 등에서 URL 을 변경하면 안됨
        - e.g.) 주문 완료 후 주문 내역 화면으로 이동
    - PRG: POST/Redirect/Get
- 특수 리다이렉션 - 300, 304
    - 결과 대신 캐시를 사용
    - e.g.) 요청으로 캐시 사용 가능 여부 전달 → 캐시 사용 가능 시 캐시 사용하도록 응답

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

<br>

## 4xx (Client Error)

---

클라이언트 오류, 잘못된 문법등으로 서버가 요청을 수행할 수 없음

### 400 Bad Request

클라이언트가 잘못된 요청을 해서 서버가 요청을 처리할 수 없음

- 요청 구문, 메시지 등등 오류
- 클라이언트는 요청 내용을 검토하고 다시 보내야 함
    - e.g.) 요청 파라미터가 잘못되거나, API 스펙이 맞지 않을 때

### 401 Unauthorized

클라이언트가 해당 리소스에 대한 인증이 필요함

- 인증되지 않음
- 401 오류 발생 시 응답에 WWW-Authenticate 헤더와 함께 인증 방법을 설명

### 403 Forbidden

서버가 요청을 이해했지만 승인을 거부함

- 주로 인증 자격 증명은 있지만, 접근 권한이 불충분한 경우
    - e.g.) 어드민 등급이 아닌 사용자가 로그인을 했지만, 어드민 등급의 리소스에 접근하는 경우

### 404 Not Found

요청 리소스를 찾을 수 없음

- 요청 리소스가 서버에 없음
- 또는 클라이언트가 권한이 부족한 리소스에 접근할 때 해당 리소스를 숨기고 싶을 때

<br>

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