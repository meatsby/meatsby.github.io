---
title: GET 과 POST
date: 2022-04-01 17:20:00 +0900
status: In Progress
tags:
  - Network
---

## GET 이란?

---

`GET` 은 클라이언트에서 서버로 어떠한 리소스로 부터 정보를 요청하기 위해 사용 되는 `HTTP` 메서드다.

`GET` 을 통한 요청은 `URL` 주소 끝에 파라미터가 포함되어 전송 되며, 이 부분을 쿼리 스트링 이라고 부른다.

```java
e.g. localhost:4567/hello?name=meatsby&age=26
```

서버에서는 `name` 과 `age` 라는 파라미터 명으로 `meatsby` 와 `26` 을 전달 받는다.

### 특징

- `GET` 요청은 캐시가 가능하다.
- `GET` 요청은 브라우저 히스토리에 남는다.
- `GET` 요청은 북마크 될 수 있다.
- `GET` 요청은 길이 제한이 있다.
- `GET` 요청은 중요한 정보를 다루면 안 된다.
- `GET` 요청은 데이터를 요청할 때 만 사용 된다.

## POST 란?

---

`POST` 는 클라이언트에서 서버로 리소스를 생성하거나 업데이트하기 위해 데이터를 보낼 때 사용 되는 `HTTP` 메서드다.

`POST` 는 전송할 데이터를 `HTTP` 메시지의 `body` 부분에 담아서 서버로 전송한다.

`GET` 에서 `URL` 의 파라미터로 보냈던 `?name=meatsby&age=26` 가 `body` 에 담겨 보내진다고 생각하면 된다.

`POST` 는 길이 제한이 따로 없어서 용량이 큰 데이터를 보내거나 `GET` 처럼 외부적으로 드러나지 않아 보안이 필요한 부분에 주로 사용 된다.

`POST` 를 통한 데이터 전송은 보통 `HTML form` 을 통해 서버로 전송 된다.

### 특징

- `POST` 요청은 캐시 되지 않는다.
- `POST` 요청은 브라우저 히스토리에 남지 않는다.
- `POST` 요청은 북마크 되지 않는다.
- `POST` 요청은 길이 제한이 없다.

## GET 과 POST 의 차이점

---

### 사용 목적

- `GET` 은 서버의 리소스에서 데이터를 요청할 때
- `POST` 는 서버의 리소스를 새로 생성하거나 업데이트할 때
- `DB` 로 따지면 `GET` 은 `SELECT` 에 가깝고 `POST` 는 `CREATE` 에 가깝다.

### body 유무

- `GET` 은 `URL` 파라미터에 요청하는 데이터를 담아 보낸다.
- `POST` 는 `body` 에 데이터를 담아 보낸다.

### 멱등성(idempotent)

멱등이란 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 의미한다.

- `GET` 은 다량의 요청에도 응답이 항상 같을 것이기 때문에 멱등이다.
- `POST` 는 리소스를 새로 생성 혹은 업데이트하기 때문에 멱등이 아니다.

## 결론

---

MVC 패턴에 적용하여 간단히 생각해 보면

- `GET` 은 리소스를 조회하기 때문에 `OutputView` 에 어울릴 것 같다.
- `POST` 는 리소스를 생성 혹은 수정하기 때문에 `InputView` 에 어울릴 것 같다.

## References

---

- [https://noahlogs.tistory.com/35](https://noahlogs.tistory.com/35)
- [https://velog.io/@songyouhyun/Get과-Post의-차이를-아시나요](https://velog.io/@songyouhyun/Get%EA%B3%BC-Post%EC%9D%98-%EC%B0%A8%EC%9D%B4%EB%A5%BC-%EC%95%84%EC%8B%9C%EB%82%98%EC%9A%94)
