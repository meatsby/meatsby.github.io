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