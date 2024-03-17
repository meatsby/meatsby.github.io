---
title: "Spring Bean"
date: 2022-10-07 14:30:00 +0900
status: In Progress
tags:
  - Spring Boot
---

## Spring Bean

---

Spring Bean 이란 IoC Container 내부에 들어있는 객체로 필요할 때 꺼내서 사용할 수 있다.

`@Bean` 이나 `xml` 설정을 통해 일반 객체를 Bean 으로 등록할 수 있다.

## Spring Bean 생성 과정

---

### Spring Bean 의 생명주기

1. 객체 생성
2. 의존 설정
3. 초기화
4. 사용
5. 소멸

Bean 은 IoC Container 에 의해 생명주기를 관리하며 초기화 방법은 `@PostConstruct` 를 Bean 소멸에서는 `@PreDestroy` 를 사용한다.

생성한 Bean 을 등록할 때는 `@ComponentScan` 을 이용하거나 `@Configuration` 의 `@Bean` 을 사용하여 Bean 설정 파일에 직접 Bean 을 등록할 수 있다.

## Bean 등록 방법

---

### @Component

Bean 으로 등록하고자 하는 클래스 선언부 상단에 `@Component` 애너테이션을 추가하여 Bean 으로 등록할 수 있다.

자주 사용되는 `@Controller` `@Service` `@Repository` 애너테이션은 모두 `@Component` 애너테이션이 포함되어 있다.

스프링은 `@ComponentScan` 을 통해 `@Component` 애너테이션이 선언된 모든 클래스를 자동으로 스캔한 뒤 Singleton Bean 으로 등록한다.

### @Bean

설정 클래스로 사용할 클래스를 생성하고 선언부 상단에 `@Configuration` 애너테이션을 추가하여 Bean 설정을 위한 클래스임을 명시한다.

Bean 으로 등록할 클래스를 반환하는 메서드를 만들고 해당 메서드 상단에 `@Bean` 애너테이션을 추가하여 Singleton Bean 을 등록할 수 있다.

이 때 생성되는 Bean 의 이름은 기본적으로 메서드명으로 지정되며, `@Bean(name = "name")` 을 통해 직접 이름을 지정해줄 수 도 있다.

## Bean Scope

---

Bean Scope 는 Bean 이 존재할 수 있는 범위를 뜻하며 `Singleton` `Prototype` `Request` `Session` `Application` 등이 존재한다.

### Singleton

Singleton 은 기본 Scope 로 IoC 컨테이너의 시작과 종료까지 유지되는 가장 넓은 범위의 Scope 다.

### Prototype

Prototype 은 Bean 의 생성과 의존관계 주입까지만 관여하고 더는 관리하지 않는 매우 짧은 범위의 Scope 다.

### Request

Request 는 웹 요청이 들어오고 나갈때 까지 유지하는 Scope 다.

### Session

Session 은 웹 세션 생성부터 종료까지 유지하는 Scope 다.

### Application

Application 은 WebServletContext 와 같은 범위로 유지하는 Scope 다.

## References

---

- [https://dev-coco.tistory.com/69?category=1009530](https://dev-coco.tistory.com/69?category=1009530)
