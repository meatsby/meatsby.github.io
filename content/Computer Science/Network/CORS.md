---
title: CORS
date: 2022-10-04 13:20:00 +0900
status: In Progress
tags:
  - Network
---

## CORS

---

Cross-Origin Resource Sharing, CORS 란 서로 다른 Origin 간에 자원을 공유하는 것을 의미한다.

CORS 를 이해하기 위해선 먼저 Origin 과 SOP 라는 개념을 알아야 한다.

### Origin

![[CORS - Origin.png]]

Origin 은 직역하면 `출처` 로 URL 의 `Protocol` `Host` `Port` 로 정의된다. 즉, Origin 이 같다는 것은 URL 의 `Protocol` `Host` `Port` 가 모두 동일하다는 것을 의미한다.

처음 브라우저를 키고 `https://www.naver.com` 을 접속하면 `index.html` 메인 페이지를 받을텐데 해당 페이지에서 전송하는 모든 요청의 Origin 은 `https://www.naver.com` 이 되는 것이다.

![[CORS - Request.png]]

![[CORS - Request Origin.png]]

위 요청은 네이버 금융 페이지에서 확인할 수 있는 요청이다. Origin 이 다른 Origin 으로 요청을 보낼 때 `Origin` 헤더가 포함되어 있는 것을 확인할 수 있다.

### SOP

Same-Origin Policy, SOP 는 직역하면 `동일 출처 정책` 으로 다른 Origin 으로 요청을 보내는 것을 금지하는 브라우저의 기본 보안 정책이다. 즉, 동일한 Origin 으로만 요청을 보낼 수 있게끔 강제하는 것이다.

과거 웹은 프론트엔드와 백엔드를 별도로 구분하지 않는 대신 서버가 직접 요청을 처리한 결과를 HTML 문서로 만들어 클라이언트에게 제공했다. 이는 모든 처리가 같은 Origin 에서 일어난다는 것을 의미한다.

즉, 과거 브라우저에선 다른 Origin 으로 요청을 보낼 필요가 없었기 때문에 다른 Origin 으로 요청을 보내는 것을 악의적인 행위로 간주하여 SOP 라는 정책을 통해 브라우저에서 막았던 것이다.

![[CORS - SOP.png]]

시대가 흐르고 웹 기술이 발전함에 따라 다른 출처로 요청을 하는 수요가 증가했다. 하지만 SOP 라는 브라우저 정책 때문에 일반적인 방법으론 불가능했기에 CORS 라는 개념이 등장한 것이다.

즉, CORS 는 기존 SOP 에 의해 제한되었던, 다른 Origin 으로 요청을 보내기 위해 지켜야 하는 정책인 것이다.

### SOP 의 필요성

브라우저는 왜 SOP 같은 정책을 만들어서 통신하기 위해 CORS 같은 부가적인 작업을 수행해야 할까? SOP 가 만약 없었다면 어떤 일이 발생하기에 이런 정책이 필요할까?

선량한 사용자가 구글에 네이버에 로그인이 된 상태로 `www.hacker.com` 라는 피싱 사이트에 접근했다고 생각해보자. 피싱 사이트엔 네이버의 개인 정보를 요청하는 스크립트가 작성되어 있다.

피싱 사이트에 접속하는 순간 스크립트가 실행되어 본인의 브라우저가 가지고 있던 네이버 인증 정보를 사용해 개인 정보가 노출되는 일이 발생한다. 서버 입장에선 정상적인 인증정보를 통해 요청을 보냈기 때문에 해당 요청이 악의적인 요청이라는 것을 판별할 수 없을 것이다. 이것이 바로 CSRF 공격이다.

SOP 정책은 이런 문제를 근본적으로 해결한다. `www.hacker.com` 이라는 Origin 에서 네이버에게 요청을 보냈으니 브라우저 입장에선 서로 다른 Origin 에서 요청을 하는 것으로 간주하게 되어 해당 요청 자체를 막아버리는 것이다.

## CORS 접근 제어 시나리오

---

### Simple Request

![[CORS - Simple Request.png]]

CORS 를 만족하기 위해선 Preflight 요청을 통해 CORS 허용 여부를 먼저 확인해야 하는데, 아래 조건을 모두 충족하는 요청의 경우 Preflight 요청이 불필요한 안전한 요청이라고 판단하여 한 번만 요청하는 Simple Request 를 보낸다.

- `GET` `POST` `HEAD` 메서드만 허용
- `Accept` `Accept-Language` `Content-Language` `Content-Type` 헤더만 허용
- `Content-Type` 은 `application/x-www-form-urlencoded` `multipart/form-data` `text/plain` 만 허용

```
GET /data HTTP/1.1
Origin: https://foo.example
```

브라우저가 다른 출처로의 요청을 보낼 때 자동으로 `Origin` 헤더를 추가하여 보낸다.

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
```

서버는 `Allow-Control-Allow-Origin` 헤더에 허용된 Origin 의 목록을 담아서 응답한다. 와일드카드를 사용해 모든 출처를 허용할 수도 있다.

브라우저는 요청의 `Origin` 헤더에 담긴 출처 정보가 응답의 `Access-Control-Allow-Origin` 헤더에 담겨있으면 해당 요청을 안전하다고 간주하고 응답을 가져온다.

만약 그렇지 않다면 브라우저가 해당 응답을 임의로 파기하고 자바스크립트로 응답의 내용을 전달하지 않는다.

### Preflight Request

![[CORS - Preflight Request.png]]

실제 요청을 보내기 전에 `OPTIONS` 메서드로 사전 요청을 보내서 CORS 허용 여부를 먼저 확인하는 방식이다.

```
OPTIONS /data HTTP/1.1
Origin: https://foo.example
Access-Control-Request-Method: POST
Access-Control-Reqeust-Headers: Content-Type, Custom-Header
```

Preflight 요청은 Simple Request 와 마찬가지로 요청에 `Origin` 헤더를 추가하고 실제 요청의 메서드를 `Access-Control-Request-Method` 헤더에 담고 실제 요청의 추가 헤더 목록을 `Access-Control-Request-Headers` 헤더에 담아서 보낸다.

실제 요청 이전에 이런 메서드와 헤더로 요청을 보낼건데 서버 CORS 정책에서 허용하는지 브라우저가 서버에게 미리 물어보는 절차이다.

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Custom-Header
Access-Control-Max-Age: 86400
```

응답 역시 Simple Request 와 마찬가지로 `Access-Control-Allow-Origin` 헤더가 담기고 서버측에서 허용하는 메서드 목록이 담긴 `Access-Control-Allow-Methods` 헤더와 허용하는 헤더 목록이 담긴 `Access-Control-Allow-Headers` 헤더 그리고 Preflight 의 캐시 기간인 `Access-Control-Max-Age` 를 보내준다.

### Credentialed Request

![[CORS - Credential Request.png]]

쿠키 또는 토큰과 같이 사용자 식별 정보가 담긴 요청에 대해서는 조금 더 엄격하게 처리한다.

```
GET /data HTTP/1.1
Origin: https://foo.example
Cookie: sessionId=123
```

클라이언트는 요청을 보낼 때 인증정보를 포함하기 위해 Credentials 옵션을 별도로 설정해야한다. 이러한 설정을 해주지 않으면 쿠키 등의 인증 정보는 절대 자동으로 요청에 포함되지 않는다.

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://foo.example
Allow-Control-Allow-Credentials: true
```

서버는 이러한 요청에 대해서 일반적인 CORS 요청과 다르게 `Access-Control-Allow-Origin` 헤더에 명확한 Origin 을 명시해주어야 하며 `Allow-Control-Allow-Credentials` 헤더는 `true` 로 설정되어야 한다.

그렇지 않을 경우 브라우저에 의해 응답이 거부된다.

## 정리

---

CORS 는 서버가 아닌 브라우저 구현 스펙에 포함된 정책이다. 때문에 서버는 CORS 위반 여부와 관계없이 요청이 들어오면 일단 처리하고 응답한다. 그 응답을 받아서 브라우저가 응답 헤더를 확인하고 응답의 파기 여부를 결정하게 된다.

`GET` `HEAD` 와 같은 단순 조회 요청은 상관 없어도 `POST` `PUT` `DELETE` 와 같은 메서드는 서버에 부작용을 야기할 수 있다. 이는 응답이 유효하지 않아 파기한 브라우저의 의사와 상관없이 발생한다.

Preflight 는 실제 요청이 CORS 를 위반하지 않는지 미리 확인하여 서버의 부작용을 방지하기 위해 전송한다.

하지만 `POST` 같은 경우 조건만 만족한다면 Preflight 대신 Simple Request 로 전송될 수 있기 때문에 백엔드에서 이에 대한 처리가 필요하다.

## References

---

- [https://hudi.blog/sop-and-cors/](https://hudi.blog/sop-and-cors/)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#접근_제어_시나리오_예제](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#%EC%A0%91%EA%B7%BC_%EC%A0%9C%EC%96%B4_%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4_%EC%98%88%EC%A0%9C)
- [https://it-eldorado.tistory.com/163](https://it-eldorado.tistory.com/163)
