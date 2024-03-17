---
title: "Filter & Interceptor"
date: 2022-10-07 14:30:00 +0900
status: In Progress
tags:
  - Spring Boot
---

## Filter

---

`Filter` 는 `javax.servlet` 패키지에 포함되는 클래스로, `DispatcherServlet` 에 요청이 전달되기 전 / 후에 `url` 패턴에 맞는 모든 요청에 대해 부가 작업을 처리할 수 있는 기능을 제공한다.

즉, `ApplicationContext` 가 아닌 톰캣과 같은 Servlet Container 에 의해 관리되기에 스프링의 범위 밖에서 처리된다.

## Filter 의 생명주기

---

```java
package javax.servlet;

public interface Filter {

    public default void init(FilterConfig filterConfig) throws ServletException {}

    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException;

    public default void destroy() {}
}
```

### init()

필터 객체를 초기화하고 서비스에 추가하기 위한 메서드다. 서블릿 컨테이너가 최초로 `init()` 메서드를 호출하여 필터 객체를 초기화하면 이후 요청들은 `doFilter()` 를 통해 처리된다.

### doFilter()

`url-pattern` 에 맞는 모든 HTTP 요청이 `DispatcherServlet` 으로 전달되기 전에 Servlet Container 에 의해 실행되는 메서드다.

`FilterChain` 을 통해 다음 대상으로 요청을 전달하여 전 / 후 처리를 진행할 수 있다.

### destroy()

필터 객체를 제거하고 사용하는 자원을 반환하기 위한 메서드다. Servlet Container 가 최초로 `destroy()` 메서드를 호출하여 필터 객체를 종료하면 이후에는 `doFilter()` 에 의해 처리되지 않는다.

## Interceptor

---

`Intercepter` 는 Spring MVC 패키지에 포함되는 클래스로, `Handler` 를 실행하기 전 / 후 그리고 `View` 를 렌더링한 후 부가 작업을 처리할 수 있는 기능을 제공한다. 즉, `ApplicationContext` 내에서 동작한다.

`DispatcherServlet` 이 `HandlerMapping` 을 통해 `Handler` 를 찾으면 `HandlerExecutionChain` 을 반환한다. 이때 1개 이상의 `Interceptor` 가 등록되어 있다면 순차적으로 `Interceptor` 를 거쳐 `Handler` 가 실행된다.

## Interceptor 메서드 종류

---

```java
public interface HandlerInterceptor {

	default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		return true;
	}

	default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable ModelAndView modelAndView) throws Exception {
	}

	default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable Exception ex) throws Exception {
	}
```

### preHandle()

`Handler` 가 호출되기 전에 실행되며 `Handler` 이전에 처리해야 하는 전처리 작업이나 요청 정보를 가공 또는 추가하는 경우에 사용된다.

### postHandle()

`Handler` 가 호출된 후에 실행되며 `Handler` 이후 처리해야 하는 후처리 작업이 있을 때 사용할 수 있다.

최근에는 `@RestController` 가 주로 사용되어 자주 사용되지 않는다.

### afterCompletion()

모든 `View` 에서 최종 결과를 생성하는 일을 포함해 모든 작업이 완료된 후에 실행되며 요청 처리 중에 사용한 리소스를 반환할 때 사용할 수 잇다.

## Filter 와 Interceptor 의 차이

---

- `Filter` 는 체이닝을 통해 `Request` 와 `Response` 를 조작할 수 있지만, `Interceptor` 는 조작할 수 없다.
- `Filter` 는 `DispatcherServlet` 외부에 존재하기 때문에 `ErrorController` 로 처리해줘야 하는 반면, `Interceptor` 는 `@ControllerAdvice` 를 통해 예외를 처리할 수 있다.

### Filter 사용 예시

- 보안 및 인증/인가 관련 작업
- 모든 요청에 대한 로깅 또는 검사
- 이미지/데이터 압축 및 문자열 인코딩
- Spring 과 분리되어야 하는 기능

### Interceptor 사용 예시

- 세부적인 보안 및 인증/인가 공통 작업
- API 호출에 대한 로깅 또는 검사
- Controller 로 넘겨주는 데이터 가공

## References

---

- [https://dev-coco.tistory.com/69?category=1009530](https://dev-coco.tistory.com/69?category=1009530)
