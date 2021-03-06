---
title: '[Design Pattern] 함수형 인터페이스와 전략 패턴'
author: meatsby
date: 2022-02-21 10:00:02 +0900
categories: [TIL, Design Pattern]
tags: [WoowaCourse, 학습로그, Design Pattern, 함수형 인터페이스, 전략 패턴]
---

## 함수형 인터페이스란?

---

함수형 인터페이스란, **단 하나의 추상 메서드를 포함**하고 있는 인터페이스를 의미한다.

때문에 Single Abstract Method (SAM) 이라고 불리기도 한다.

추가적으로 static 메서드나 default 메서드가 포함되어 있어도 단 하나의 추상 메서드만 가지고 있다면 함수형 인터페이스라고 할 수 있다.

<br>

## 함수형 인터페이스와 람다표현식

---

```java
FunctionalInterface functionalInterface = new FunctionalInterface() {
    @Override
    public void doSomething() {
        System.out.println("Do something");
    }
};
```

자바8 이전에는 익명 내부클래스를 활용해 함수형 인터페이스를 사용했다.

```java
FunctionalInterface functionalInterface = () -> System.out.println("Do something");
```

자바8 이후 람다식을 활용해 위와 같이 보다 간결하게 작성할 수 있다.

<br>

## @FunctionalInterface 애너테이션

---

`@FunctionalInterface` 애너테이션을 통해 해당 인터페이스가 함수형 인터페이스가 아닌 경우 컴파일 에러를 통해 함수형 인터페이스인지 확인할 수 있다.

<br>

## 전략 패턴이란?

---

전략 패턴 또는 정책 패턴은 프로그램 실행 중 알고리즘을 선택할 수 있게 하는 행위의 소프트웨어 디자인 패턴이다.

간단히 말해서 **특정 컨텍스트에서 알고리즘을 별도로 분리하여 설계하는 방법**을 의미한다.

<br>

## 전략 패턴의 적용

---

### 전략 패턴 적용 전

랜덤한 숫자를 반환하는 `RandomGenerator` 를 통해 4 이상의 숫자가 나온다면 이동하는 `Car` 클래스를 만든다고 가정해보자.

```java
public class Car {
    ...
    public void move() {
        if (RandomGenerator.generateRandomNumber() >= THRESHOLD) {
            position++;
        }
    }
    ...
}
```

위와 같은 형식으로 코드를 작성한다면 `Car` 객체는 본인의 이름, 위치, 이동 전략 까지 모두 알고 있어야 한다.

뿐만 아니라 `Car` 객체의 `move()` 메서드를 테스트하기도 상당히 어렵다는 부분을 알 수 있다.

### 전략 패턴 적용 후

이번엔 전략 패턴을 적용하여 `Car` 객체의 `이동 전략`을 작성해보자.

```java
@FunctionalInterface
public interface MovingStrategy {
    boolean isMovable();
}
```

```java
public class RandomMovingStrategy implements MovingStrategy {
    private static final Random random = new Random();
    private static final int RANGE = 10;
    private static final int THRESHOLD = 4;

    @Override
    public boolean isMovable() {
        return random.nextInt(RANGE) >= THRESHOLD;
    }
}
```

```java
public class GameController {
    ...
    private void runRounds(int rounds, Cars cars) {
        OutputView.printResultMessage();
        for (int i = 0; i < rounds; i++) {
            cars.moveAll(new RandomMovingStrategy());
            OutputView.printRoundResult(cars.getCars());
        }
    }
    ...
}
```

```java
public class Cars {
    ...
    public void moveAll(MovingStrategy movingStrategy) {
        for (Car car : cars) {
            moveEach(movingStrategy, car);
        }
    }

    private void moveEach(MovingStrategy movingStrategy, Car car) {
        if (movingStrategy.isMovable()) {
            car.move();
        }
    }
    ...
}
```

```java
public class Car {
    ...
    public void move() {
        position++;
    }
    ...
}
```

위와 같이 함수형 인터페이스를 통해 `이동 전략`을 구현한다면 아래와 같은 이점들을 가질 수 있다.

- 새로운 `이동 전략`에 대한 유연한 대처가 가능해진다.
- `Car` 객체가 `이동 조건`에 대한 책임을 갖지 않아도 된다.
- `Car` 의 이동 여부를 테스트하기 편해진다.

예를 들어 랜덤하게 생성된 숫자를 기반으로 한 이동이 아니라 “MOVE” 라는 문자열을 입력받고 이동해야 한다는 요구 사항이 추가된다면 기존 설계의 경우 상당히 많은 부분을 고쳐야 한다.

```java
public class StringMovingStrategy implements MovingStrategy {
    private static final Scanner scanner = new Scanner(System.in);
    private static final String MOVE = "MOVE";

    @Override
    public boolean isMovable() {
        return scanner.nextLine().equals(MOVE);
    }
}
```

하지만 전략 패턴을 채용함으로써 `StringMovingStrategy` 와 같은 새로운 전략 패턴을 추가하여 컨텍스트인 `Car` 객체 내부의 코드는 수정하지 않고 클라이언트인 `GameController` 에서 주입하는 전략 패턴을 변경하여 보다 유연하게 변경에 대해 대처할 수 있다.

```java
@Test
void move() {
    Car car = new Car("test");
    car.move();
    assertThat(car.getPosition()).isEqualTo(1);
}
```

테스트 코드도 마찬가지로 `Car` 객체 내부에 변경이 없으니 테스트 코드 역시 변경하지 않아도 컨텍스트인 `Car` 객체를 정상적으로 테스트할 수 있고 보다 간단한 테스트를 작성할 수 있다.

여기서 짚고 넘어가야 하는 부분은 기존 방식으로 `Car` 객체를 설계 했다면 새로운 요구 사항이 주어졌을 때 `Car` 객체의 내부의 수정이 불가피했겠지만 전략 패턴을 채택함으로써 컨텍스트인 `Car` 객체의 내부를 수정할 필요 없이 전략 패턴을 구현한 새로운 클래스를 추가함으로써 변경된 요구 사항에 유연하게 대처할 수 있다는 점에 있다.

### 전략 패턴 적용 시점

`if-else` 문을 사용하고 조건이 추가될 수 있는 로직이라면 전략 패턴을 활용해 컨텍스트의 변경을 방지할 수 있다.

또한, 비슷한 계열의 알고리즘을 상호 교체해야 하는 경우에도 전략 패턴을 활용해 때에 따라 같은 계열의 다른 알고리즘을 적용할 수 있다.

<br>

## References

---

- [https://velog.io/@jaden_94/함수형-인터페이스-Functional-Interface](https://velog.io/@jaden_94/%ED%95%A8%EC%88%98%ED%98%95-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-Functional-Interface)
- [https://velog.io/@kyle/디자인-패턴-전략패턴이란](https://velog.io/@kyle/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EC%A0%84%EB%9E%B5%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%9E%80)
- [https://steady-coding.tistory.com/381](https://steady-coding.tistory.com/381)