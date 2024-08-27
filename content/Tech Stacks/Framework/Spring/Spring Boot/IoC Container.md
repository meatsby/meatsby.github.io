---
title: "IoC Container"
date: 2022-09-29 20:00:00 +0900
status: In Progress
draft: false
tags:
  - Spring Boot
---

## IoC

---

Inversion of Control, IoC 는 제어의 역전으로 프로그램의 흐름을 직접 제어하는 것이 아닌 외부에서 관리하는 것이다. 즉, 코드의 최종 호출은 개발자가 제어하는 것이 아닌 프레임워크 내부에서 결정된 대로 이루어지는 것을 의미한다.

객체의 의존성을 역전시키면 객체 간의 결합도를 줄이고 유연한 코드를 작성할 수 있어 가독성 및 유지 보수가 편해진다는 장점이 있다.

스프링은 모든 객체를 스프링이 실행될 때 만들어놓고 필요한 곳에 주입시켜 특정 객체를 의존하는 객체에서 의존 객체를 사용할 수 있도록 한다.

## IoC 종류

---

### DL

저장소에 저장되어 있는 Bean 에 접근하기 위해 컨테이너가 제공하는 API 를 통해 Bean 을 Lookup 하는 것이다.

DL 은 컨테이너 종속이 증가하기 때문에 주로 DI 를 사용한다.

### DI

빈 설정 정보를 바탕으로 각 클래스간의 의존관계를 컨테이너가 자동으로 연결해준다.

## IoC Container

---

인스턴스 생성부터 소멸까지 인스턴스의 생명주기를 관리해주기 때문에 개발자는 비즈니스 로직에만 집중할 수 있다.

- 객체의 생성을 책임지고 의존성을 관리
- POJO 의 생성, 초기화, 서비스, 소멸에 대한 권란을 가짐
- 개발자들이 직접 POJO 를 생성할 수 있지만 컨테이너에게 맡김

### IoC Container 의 역할

ApplicationContext 는 IoC Container 이며 Bean 을 인스턴스화하고 구성하고 조립하는 역할을 한다.

애플리케이션 실행 시점에 Bean 오브젝트를 인스턴스화하고 DI 한 뒤 최초로 애플리케이션을 가동할 Bean 하나를 제공한다.

### IoC Container 의 종류

ApplicationContext 는 BeanFactory 의 서브 인터페이스

BeanFactory

- 컨테이너에서 Bean 을 생성하고 DI 하는 기능을 제공
- Bean 등록, 생성, 조회, 반환을 관리
- 팩토리 디자인 패턴을 구현한 것으로 빈을 생성하고 분배하는 책임을 가짐
- Bean 을 조회할 수 있는 getBean() 메서드가 정의되어 있음

ApplicationContext

- BeanFactory 의 기능에 더해 스프링의 각종 부가 기능을 추가로 제공
- 국제화가 지원되는 텍스트 메시지를 관리
- 이미지같은 파일 자원을 로드할 수 있는 포괄적인 방법 제공
- 리스너로 등록된 빈에게 이벤트 발생을 알려줌

## References

---

- [https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#spring-core](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#spring-core)
- [https://dev-coco.tistory.com/80?category=1009530](https://dev-coco.tistory.com/80?category=1009530)
