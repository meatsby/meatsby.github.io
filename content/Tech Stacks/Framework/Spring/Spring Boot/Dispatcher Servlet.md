---
title: Dispatcher Servlet
date: 2022-09-27 16:30:00 +0900
status: In Progress
tags:
  - Spring Boot
---

## Dispatcher Servlet

---

`DispatcherServlet` 이란 Presentation Layer 전면에서 모든 HTTP 요청을 중앙집중식으로 처리하는 Front Controller 패턴을 적용한 `Servlet` 이다.

`ServletContainer` 가 받은 클라이언트 요청의 공통적인 작업은 `DispatcherServlet` 이 처리하고 그 외 작업은 적절한 Controller 에게 위임한다.

즉, Controller 로 향하는 모든 웹 요청의 진입점으로써 요청을 처리하고 결과를 클라이언트에게 응답한다.

### Front Controller 패턴

![[Front Controller Pattern.png]]

Front Controller 패턴은 모든 요청을 처리하는 하나의 대표 Controller 를 배치하는 패턴을 의미한다.

Front Controller 는 모든 요청의 진입점이 되어 요청을 일괄적으로 처리할 수 있다. Spring 에서는 `DispatcherServlet` 이 Front Controller 역할을 한다.

## Dispatcher Servlet 동작 과정

---

![[Dispatcher Servlet Mechanism.png]]

1. `ServletContainer` 가 받은 요청이 `HttpServletRequest` 로 가공되어`DispatcherServlet` 에게 전달된다. 이때 `MultipartResolver` `LocaleResolver` `ThemeResolver` 인터페이스의 구현체가 요청을 분석한다.
2. 요청을 `HandlerMapping` 에게 위임하여 요청을 처리할 Handler(Controller) 를 탐색한다.
3. `HandlerAdapter` 에서 Handler 를 처리할 수 있는 `HandlerAdapter` 를 탐색한다.
4. `HandlerAdapter` 에 정의된 Handler 메서드를 호출하여 비즈니스 로직을 수행한다.
5. Handler 가 `viewName` 혹은 `ModelAndView` 를 반환한다.
6. `ViewResolver` 에게 `viewName` 혹은 `ModelAndView` 를 전달하여 해당하는 `View` 반환한다.
7. `DispatcherServlet` 은 `View` 에게 `Model` 을 제공하여 클라이언트에게 응답할 화면을 생성한다.
8. `DispatcherServlet` 은 `View` 의 결과를 `HttpServletResponse` 객체를 통해 클라이언트에게 응답한다.

### 코드 상에서 살펴보기

```java
// DispatcherServlet.java
@Override
protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {

    // ...
    try {
        doDispatch(request, response);
    }
    // ...
}
```

`ServletContainer` 가 `HttpServletRequest` 와 `HttpServletResponse` 를 생성하여 `DispatcherServlet` 에게 전달할 때 `doService()` 메서드가 호출된다.

이는 Handler 를 찾고 요청을 위임하는 등의 역할을 하는 `doDispatch()` 메서드로 연결된다.

```java
// DispatcherServlet.java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {

    // ...
    try {
        try {
                mappedHandler = getHandler(processedRequest);
        }
    }
    // ...
}

@Nullable
protected HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {
    if (this.handlerMappings != null) {
        for (HandlerMapping mapping : this.handlerMappings) {
            HandlerExecutionChain handler = mapping.getHandler(request);
            if (handler != null) {
                return handler;
            }
        }
    }
    return null;
}
```

먼저 요청을 처리할 수 있는 Handler 를 찾기 위해 `getHandler()` 메서드를 호출한다.

```java
// DispatcherServlet.java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {

    // ...
    try {
        try {  
            HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());
        }
    }
    // ...
}

protected HandlerAdapter getHandlerAdapter(Object handler) throws ServletException {
    if (this.handlerAdapters != null) {
        for (HandlerAdapter adapter : this.handlerAdapters) {
            if (adapter.supports(handler)) {
                return adapter;
            }
        }
    }
    // ...
}
```

찾은 Handler 를 실행하기 위한 `HandlerAdapter` 를 찾기 위한 `getHandlerAdapter()` 메서드가 호출된다.

```java
// DispatcherServlet.java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {

    // ...
    try {
        try {  
            if (!mappedHandler.applyPreHandle(processedRequest, response)) {
                return;
            }
        }
    }
    // ...
}

boolean applyPreHandle(HttpServletRequest request, HttpServletResponse response) throws Exception {
    for (int i = 0; i < this.interceptorList.size(); i++) {
        HandlerInterceptor interceptor = this.interceptorList.get(i);
        if (!interceptor.preHandle(request, response, this.handler)) {
            triggerAfterCompletion(request, response, null);
            return false;
        }
        this.interceptorIndex = i;
    }
    return true;
}
```

Handler 를 실행하기 전 `applyPrehandle()` 메서드를 통해 `Interceptor` 의 `preHandle()` 메서드를 실행한다. 이때 `HandlerInterceptor` 를 구현한 빈이 호출된다. 주로 인증을 위해 많이 사용한다.

```java
// DispatcherServlet.java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {

    // ...
    try {
        try {
            mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
    }
    // ...
}

// HandlerAdapter.java
public interface HandlerAdapter {
    @Nullable
    ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception;
}
```

`Interceptor` 를 통과한 후 Handler 의 메서드를 실행하기 위해 `HandlerAdapter` 의 `handle()` 메서드가 호출된다.

```java
// DispatcherServlet.java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {

    // ...
    try {
        try {  
            mappedHandler.applyPostHandle(processedRequest, response, mv);
        }
    }
    // ...
}

void applyPostHandle(HttpServletRequest request, HttpServletResponse response, @Nullable ModelAndView mv) throws Exception {
    for (int i = this.interceptorList.size() - 1; i >= 0; i--) {
        HandlerInterceptor interceptor = this.interceptorList.get(i);
        interceptor.postHandle(request, response, this.handler, mv);
    }
}
```

Handler 가 실행된 이후 `Interceptor` 의 `postHandle()` 이 실행된다. 이때 Handler 가 반환한 `ModelAndView` 에 대한 후처리를 `applyPostHandle()` 메서드가 수행하는데, `@Controller` 의 경우 `ModelAndView` 를 반환하고 `@RestController` 의 경우 `null` 을 반환하여 `View` 가 렌더링되는 과정을 생략하게 된다.

```java
// DispatcherServlet.java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {

    // ...
    try {
        processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
    }
    // ...
}

private void processDispatchResult(
    HttpServletRequest request,
    HttpServletResponse response,
    @Nullable HandlerExecutionChain mappedHandler,
    @Nullable ModelAndView mv,
    @Nullable Exception exception) throws Exception {

    // ...
    if (mv != null && !mv.wasCleared()) {
        render(mv, request, response);
        if (errorView) {
            WebUtils.clearErrorRequestAttributes(request);
        }
    }
    // ...
}

protected void render(
    ModelAndView mv,
    HttpServletRequest request,
    HttpServletResponse response) throws Exception {

    // ...
    View view;
    String viewName = mv.getViewName();
    if (viewName != null) {
        view = resolveViewName(viewName, mv.getModelInternal(), locale, request);
        // ...
    }
    // ...
    try {
        if (mv.getStatus() != null) {
            response.setStatus(mv.getStatus().value());
        }
        view.render(mv.getModelInternal(), request, response);
    }
    // ...
}

@Nullable
protected View resolveViewName(String viewName, @Nullable Map<String, Object> model,
        Locale locale, HttpServletRequest request) throws Exception {
    if (this.viewResolvers != null) {
        for (ViewResolver viewResolver : this.viewResolvers) {
            View view = viewResolver.resolveViewName(viewName, locale);
            if (view != null) {
                return view;
            }
        }
    }
    return null;
}

// View.java
public interface View {
    void render(
        @Nullable Map<String, ?> model,
        HttpServletRequest request,
        HttpServletResponse response) throws Exception;
}
```

처리된 `ModelAndView` 는 `processDispatchResult()` 라는 메서드를 통해 렌더링된다.

해당 메서드 내부에서 `render()` 메서드를 호출하는데 이때 `viewName` 을 `View` 객체로 변환하는 `resolveViewName()` 메서드가 호출된다.

이후 반환받은 `View` 객체의 `render()` 메서드 호출을 통해 `View` 에 `Model` 을 렌더링하는 과정을 거치게된다.

```java
// DispatcherServlet.java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
    if (mappedHandler != null) {
        mappedHandler.triggerAfterCompletion(request, response, null);
    }
}

void triggerAfterCompletion(HttpServletRequest request, HttpServletResponse response, @Nullable Exception ex) {
    for (int i = this.interceptorIndex; i >= 0; i--) {
        HandlerInterceptor interceptor = this.interceptorList.get(i);
        try {
            interceptor.afterCompletion(request, response, this.handler, ex);
        }
        // ...
    }
}
```

마지막으로 `Interceptor` 의 `triggerAfterCompletion()` 메서드를 실행하면 요청에 대한 처리가 전부 마무리된다.

## 정리

---

![[Holistic Dispatcher Servlet.png]]

`DispatcherServlet` 을 간단히 알아보고 실제 내부 동작 과정을 살펴봤다. 전체적인 흐름을 정리하면 위 그림과 같다.

## References

---

- [https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-servlet-context-hierarchy](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-servlet-context-hierarchy)
- [https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-servlet](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-servlet)
- [https://tecoble.techcourse.co.kr/post/2021-06-25-dispatcherservlet-part-1/](https://tecoble.techcourse.co.kr/post/2021-06-25-dispatcherservlet-part-1/)
- [https://tecoble.techcourse.co.kr/post/2021-07-15-dispatcherservlet-part-2/](https://tecoble.techcourse.co.kr/post/2021-07-15-dispatcherservlet-part-2/)
