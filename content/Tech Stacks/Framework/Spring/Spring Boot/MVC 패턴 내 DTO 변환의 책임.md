---
title: MVC 패턴 내 DTO 변환의 책임
date: 2022-05-21 18:10:00 +0900
status: In Progress
tags:
  - Spring Boot
---

## 경로 조회 미션 중에

---

![[Mission Review for DTO.png]]

경로 조회 미션 도중 리뷰어께서 위와 같은 리뷰를 남겨주셨다.

`Service` 레이어에서 도메인을 DTO 로 변환하여 `Controller` 에게 넘겨주는 부분을 집어주신건데, 리뷰어 말씀대로 서로 다른 `Controller` 가 같은 `Service` 로직을 요구하지만 반환해야하는 DTO 가 다르다면 반환값이 다른 여러개의 `Service` 로직이 생길 수 있다.

### DTO 란?

DTO 는 Data Transfer Object 로써 계층간 데이터 교환을 위해 사용하는 객체다.

### MVC 패턴이란?

MVC 패턴은 애플리케이션 구성 요소를 `Model` `View` `Controller` 로 역할을 분리하여 개발하는 디자인 패턴이다.

`Model` 은 비즈니스 로직 처리, `View` 는 UI 처리, `Controller` 는 이 둘을 연결해주는 역할을 한다.

MVC 패턴은 `Model` 과 `View` 를 분리함으로써 서로의 의존성을 낮추고 독립적인 개발을 가능하게 한다.

`Controller` 는 `View` 와 `Model` 의 데이터를 주고 받을 때 DTO 를 사용한다.

도메인 객체를 `View` 에 직접 전달할 수 있지만, 그대로 전달할 경우 아래와 같은 문제점이 발생할 수 있다.

- 불필요한 도메인 정보를 전달함으로써 민감한 정보를 노출할 수 있다.
- `View` 에서 `Model` 의 메서드를 호출하거나 상태를 변화시킬 수 있다.
- `Model` 과 `View` 가 강하게 결합되어 `View` 가 변경될 경우 `Model` 에도 영향을 끼치기 쉽다.

MVC 패턴에서 DTO 를 사용한다면 도메인 `Model` 을 캡슐화하고 `View` 에서 사용하는 데이터만 선택적으로 전달할 수 있다.

### DTO 와 도메인간의 변환 위치는 어디가 적절할까?

그렇다면 우리가 흔히 사용하는 `Controller` `Service` `Repository` 중에 어느 곳에서 변환하는 것이 가장 적절할까?

`Repository` 레이어는 `Entity` 의 영속성을 관장하는 역할이기 때문에, `Controller` 레이어에서 사용할 도메인을 DTO 로 변환하는 작업을 `Repository` 에서 하는 것을 지양하는 것이 좋다고한다.

그렇다면 `Service` 레이어가 도메인을 반환하는 것과 DTO 를 반환하는 것으로 범위를 좁혀볼 수 있다.

`Service` 레이어가 도메인을 반환하는 경우 생길 수 있는 문제점은 아래와 같다.

- `View` 에 반환할 필요가 없는 도메인의 정보가 `Controller` 레이어까지 진입한다.
- `Controller` 가 여러 도메인을 조합하여 DTO 를 생성해야할 경우 `Service` 의 책임을 `Controller` 가 수행하게 된다.
- 여러 도메인을 조회할 경우 하나의 `Controller` 에 여러 `Service` 가 의존하게 된다.

`Service` 가 DTO 를 반환한다면 이런 문제점들을 쉽게 해결할 수 있다.

이제 `Service` 레이어가 도메인을 사용하는 것과 DTO 를 사용하는 것도 생각해볼 수 있다.

`Service` 레이어가 도메인을 사용하는 경우, 즉 `Controller` 레이어에서 DTO 를 도메인으로 변환하는 경우 아래와 같은 문제점들이 생길 수 있다.

- 복잡한 애플리케이션의 경우 `Repository` 를 통해 부수적인 정보들을 조합하여 도메인을 구성해야하는 경우도 있기 때문에 `View` 에서 전달받은 DTO 만으로 도메인을 구성하는 것은 어렵다.
- 이를 해결하기 위해 여러 `Service` 를 사용하게 되면 하나의 `Controller` 에 여러 `Service` 가 의존하는 상황이 발생한다.

이런 문제점들을 보면 DTO 를 `Service` 레이어까지 전달하여 `Service` 내부에서 도메인을 구성하는 것이 더 적절한 방법이라고 생각해볼 수 있다.

## 결론

---

결론적으로 생각해보면 `Service` 가 DTO 를 소비하고 DTO 를 반환하는 것이 가장 적절하다고 생각해볼 수 있다.

하지만, 글 초반에 소개한 리뷰를 생각해보면 마냥 이게 정답이라고 볼 순 없을 것 같다.

프로젝트의 종합적인 상황을 고려해서 상황에 맞는 적절한 방식으로 DTO 를 사용하는 것이 가장 적절하다고 정리하는 것이 좋을 것 같다.

## References

---

- [https://tecoble.techcourse.co.kr/post/2021-04-25-dto-layer-scope/](https://tecoble.techcourse.co.kr/post/2021-04-25-dto-layer-scope/)
