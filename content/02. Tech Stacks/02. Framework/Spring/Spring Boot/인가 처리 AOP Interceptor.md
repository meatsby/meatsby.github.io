---
title: "인가 처리 AOP Interceptor"
date: 2022-07-20 18:10:00 +0900
status: To Do
draft: false
tags:
  - Spring Boot
---
## AOP 로 적용
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface HostOnly {
}
```

```java
@Aspect
@Component
public class HostVerifier {

    private final AuthenticationContext authenticationContext;

    public HostVerifier(final AuthenticationContext authenticationContext) {
        this.authenticationContext = authenticationContext;
    }

    @Before("@annotation(com.woowacourse.gongcheck.application.HostOnly)")
    public void checkHost() {
        final Authority authority = authenticationContext.getAuthority();
        if (!authority.equals(Authority.HOST)) {
            throw new UnauthorizedException("호스트만 입장 가능합니다.");
        }
    }
}
```

### 문제점

- @Valid 가 먼저 터짐
    - 왜? AOP proxy 가 호출되기 전에 ArgumentResolver (JacksonMapper) 가 먼저 동작
- 인가가 먼저 터져야 함

## Interceptor 로 적용
[참고](https://stackoverflow.com/questions/28975025/advise-controller-method-before-valid-annotation-is-handled/29397494#29397494)

```java
@Override
public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler)
        throws Exception {
    if (CorsUtils.isPreFlightRequest(request)) {
        return true;
    }

    String token = AuthorizationTokenExtractor.extractToken(request)
            .orElseThrow(() -> new UnauthorizedException("헤더에 토큰 값이 정상적으로 존재하지 않습니다."));

    String subject = jwtTokenProvider.extractSubject(token);
    authenticationContext.setPrincipal(subject);

    Authority authority = jwtTokenProvider.extractAuthority(token);
    if (HandlerMethod.class.isAssignableFrom(handler.getClass())) {
        authorize((HandlerMethod) handler, authority);
    }

    return HandlerInterceptor.super.preHandle(request, response, handler);
}

private void authorize(HandlerMethod handlerMethod, Authority authority) {
    if (handlerMethod.getMethodAnnotation(HostOnly.class) != null) {
        if (!authority.isHost()) {
            throw new UnauthorizedException("호스트만 입장 가능합니다.");
        }
    }
}
```

### Documentation Mocking 처리

```java
when(jwtTokenProvider.extractAuthority(anyString())).thenReturn(Authority.HOST);
```
