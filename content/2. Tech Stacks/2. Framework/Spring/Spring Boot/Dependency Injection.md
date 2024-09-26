---
title: "Dependency Injection"
date: 2022-10-06 18:40:00 +0900
status: In Progress
draft: false
tags:
  - Spring Boot
---
## Dependency Injection
---
Dependency Injection, DI 는 의존관계 주입으로 Spring 프레임워크에서 제공하는 IoC 의 형태이다. 클래스 사이의 의존관계를 빈 설정 정보를 바탕으로 컨테이너가 자동으로 연결해준다.

DI 를 통해 의존성을 주입하면 모듈 간의 결합도가 낮아지고 유연성이 높아지는 장점을 활용할 수 있다.

스프링에선 스프링 컨테이너 `ApplicationContext` 를 통해 설정 정보를 생성 및 등록하고 객체를 생성자 혹은 `setter` 를 통해 주입한다.

## DI 종류
---
### 생성자 주입

```java
@Service
public class Service {

    private final Repository repository;

    public Service(Repository repository) {
        this.repository = repository;
    }
}
```

생성자를 통해 의존성을 주입하는 방식이다. 의존 관계를 모두 주입해야 객체 생성이 가능하기 때문에 NPE 를 방지할 수 있다. 의존 관계가 많아질 경우 생성자가 길어져 SRP 원칙을 상기시켜주기도 한다.

추가적인 설정이 필요하지 않고 뜻하지 않게 의존성과 설정값을 빠뜨리는 일이 없으며, 테스트하기에도 용이하기에 가장 권장되는 주입 방식이다.

### Setter 주입

```java
@Service
public class Service {

    private Repository repository;

    public void setRepository(Repository repository) {
        this.repository = repository;
    }
}
```

`setter` 를 통해 의존성을 주입한다. 선택적으로 의존성을 주입할 수 있기 때문에 모든 의존성을 주입 받지 않고도 객체 생성이 가능하다. 때문에 NPE 가 발생할 가능성이 높다.

### 필드 주입

```java
@Service
public class Service {

    @Autowired
    private Repository repository;
}
```

`@Autowired` 애너테이션을 통해 의존성 주입한다. 의존성 주입이 쉽기 때문에 SRP 원칙을 위배할 가능성이 높다. 사용하기 편리한 만큼 단점도 많은 방식이다.

DI 프레임워크 없이는 작동하기 힘들며, 외부에서 변경이 불가능하기 때문에 테스트하기 힘들다.

주로 애플리케이션과 관계없는 테스트코드나 `@Configuration` 과 같은 스프링 설정 목적으로 사용한다.

## References
---
- [https://dev-coco.tistory.com/70?category=1009530](https://dev-coco.tistory.com/70?category=1009530)
