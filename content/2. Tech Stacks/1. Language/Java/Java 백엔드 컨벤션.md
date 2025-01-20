---
title: Java 백엔드 컨벤션
date: 2023-02-03 13:30:00 +0800
status: In Progress
draft: false
tags:
  - Java
---
## 패키지
---
### 패키지 구조

- 세부 구조는 ~~도메인 형~~ vs **레이어 형 으로 결정**

### 계층 표현

- 표현 계층 - presentation
- 응용 계층 - application
- 도메인 계층 - domain
- 인프라 계층 - infrastructure

## 코드
---
### 클래스 구성 순서

- 상수
- 필드
- 생성자(기본 생성자, 주 생성자, 빌더 패턴 사용)
- static method(dto 외 지양)
- public method
- public override method
- private method
- object override

### 어노테이션 순서

- 객체가 의도한 대로 동작하기 위해 필요한 중요 어노테이션 순서로 작성한다.

### 코드 컨벤션

- 매개변수에만 `final` 키워드를 붙인다.

### 클래스 예시 코드

```java
@Entity
@Table
@Getter
public class Convention extends Parent {

    private static final int constant = 0;

    private final int field;

    @Builder
    public Convention(final int field) {
        validation(field);
        this.field = field;
    }

    public static void Z() {
    }

    public void A() {
        a();
        c();
    }

    public void B() {
        c();
        b();
    }

    private void validation(final int field) {
    }

    private void a() {
    }

    private void c() {
    }

    private void b() {
    }

    @Override
    protected void override() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Convention that = (Convention) o;
        return field == that.field;
    }

    @Override
    public int hashCode() {
        return Objects.hash(field);
    }

    @Override
    public String toString() {
        return "Convention{" +
                "field=" + field +
                '}';
    }
}
```

## 테스트
---
### 테스트 컨벤션

- `@DisplayName` 대신 메서드 명을 한글로 작성한다.
- `data.sql` 대신 `TestFixture` 를 구성한다.

### 테스트 범위

Acceptance

- acceptance : 실제 port 띄움, cucumber 도입 전 까지는 성공 시나리오만 테스트

Controller

- documentation : 슬라이싱(@WebMvcTest), 성공 테스트
- presentation : 슬라이싱(@WebMvcTest), 핸들러 매개변수에 대한 실패 케이스 검증

Service

- application : 통합 테스트(@SpringbootTest)

Domain

- domain : 단위 테스트, 의미있는 기능만 테스트

Repository

- repository : 슬라이싱 테스트(@DataJpaTest), 직접 인터페이스에 작성한 메서드에 대해서만 테스트

### 테스트 예시 코드

```java
public class Test {

    @Test
    void 한글로_작성() {
    }
}
```
