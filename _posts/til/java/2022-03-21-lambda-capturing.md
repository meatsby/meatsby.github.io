---
title: '[Java] 람다 캡처링'
author: meatsby
date: 2022-03-21 10:00:01 +0900
categories: [TIL, Java]
tags: [WoowaCourse, 학습로그, 람다 캡처링]
---

## 람다 캡처링이란?

---

람다의 바디에서는 파라미터 외에 바디 외부에 위치한 변수를 참조할 수 있다.

람다 시그니처의 파라미터로 넘겨진 변수가 아닌 **외부에서 정의된 변수**를 **자유 변수**라고 부르는데, 이렇게 람다 바디에서 **자유 변수를 참조하는 행위**를 **람다 캡처링**이라고 부른다.

<br>

## 람다 캡처링의 제약 조건

---

지역 변수를 람다 캡처링 할 때는 아래와 같은 제약조건이 존재한다.

- 지역 변수는 `final` 로 선언되어 있어야 한다.
- `final` 로 선언되지 않은 지역 변수는 `final` 처럼 동작해야 한다.

즉, 값의 재할당이 일어나면 안 된다는 것이다.

### 왜 이런 제약 조건이 있는걸까?

위에 명시된 제약 조건은 지역 변수만 해당되고 인스턴스 변수나 스태틱 변수는 적용되지 않는다.

그렇다면 왜 지역 변수만 이런 제약 조건이 존재하는 걸까?

이는 JVM 의 메모리 구조 때문인데, JVM 내부에서 지역 변수는 스택 영역에 생성된다.

스택 영역은 쓰레드마다 별도로 생성되는데, 이는 지역 변수가 쓰레드 간 공유가 불가능하다는 것을 의미한다.

인스턴스 변수는 힙 영역에 생성되고 스태틱 변수는 스태틱 영역에 생성된다.

두 영역 모두 쓰레드 간 공유가 가능한 영역이기 때문에 해당 위치에 생성된 변수를 자유롭게 사용할 수 있다.

### 쓰레드 공유가 안되는구나, 그래서?

람다는 별도의 쓰레드에서 실행이 가능하다는 특성이 있다.

때문에 원래 지역 변수가 위치한 쓰레드가 사라져 해당 지역 변수가 존재하지 않는데도 불구하고 람다가 실행 중인 쓰레드는 살아 있을 가능성이 생긴다.

이때 살아있는 쓰레드의 람다가 사라진 쓰레드의 지역 변수를 참조한다면 어떻게 될까?

오류가 발생할 법하지만 발생하지 않는다.

### 왜 오류가 안 나지? 이미 사라진 지역 변수를 참조했다며?

이유는 람다에서 지역 변수에 직접적으로 접근하는 것이 아니라 해당 변수를 자신의 스택에 복사하기 때문이다.

그렇기 때문에 별도의 쓰레드의 스택에 있는 지역 변수와 동일한 값을 참조할 수 있는 것이며, 원본 쓰레드가 사라져도 람다 본인의 쓰레드에서 자신의 할 일을 수행할 수 있는 것이다.

이렇게 여러 쓰레드에서 변수를 복사해서 사용하여 변수의 값이 중구난방으로 변경된다면 해당 복사본을 믿고 사용할 수 있을까?

이러한 이유 때문에 지역 변수는 `final` 이거나 `final` 과 같이 동작해야 한다는 제약 조건이 생긴 것이다.

<br>

## 미션에서 마주친 람다 캡처링

---

```java
// Cards.java
public int getBestPossible() {
    int sum = cards.stream()
            .map(Card::getNumber)
            .mapToInt(Number::getScore)
            .sum();

    cards.stream()
            .forEach(card -> {
                if (card.isAce() && sum + 10 <= 21) {
                    sum += 10;
                }
            });

    return sum
}
```

이 코드는 블랙잭 미션에서 시도해보았던 코드이다.

`Ace` 를 1 또는 11로 계산하기 위해 위와 같은 형식의 코드를 사용하게 되었다.

- `sum` = 자유 변수
- `forEach()` 내부에서 `sum` 을 참조하는 행위 = 람다 캡처링

이 때 `forEach()` 내부에서 사용하는 `sum` 변수에서 `varialbe used in lambda expression should be final or effectively final` 이라는 컴파일 에러 문구가 나타난다.

이유는 위에서 설명한 람다 캡처링 때문인데 해당 코드를 보며 다시 이해해보자.

```java
int sum = cards.stream()
        .map(Card::getNumber)
        .mapToInt(Number::getScore)
        .sum();
```

카드패의 가장 작은 합을 `sum` 변수에 할당한다.

```java
cards.stream()
        .forEach(card -> {
            if (card.isAce() && sum + 10 <= 21) {
                sum += 10;
            }
        });
```

이번엔 가능한 큰 합을 만들기 위해 위와 같은 연산을 실행한다.

이때 `cards.stream()` 은 새로운 스택에서 기존 스택에 존재하던 `sum` 변수를 자신의 스택에 복사한다.

이 경우 `cards.stream()` 의 스택에선 `sum` 을 변경해도 기존 스택에 존재하는 `sum` 을 변경할 수 없게 된다.

### 그럼 어떻게 해결하지?

기존에 `Cards` 클래스 내부에서 계산하던 점수가 방대해지자 리뷰어인 범블비는 점수를 관장하는 `Score` 객체를 만들면 좋을 것 같다는 리뷰를 받았다.

```java
public class Score {

    private int score;

    private Score(int score) {
        this.score = score;
    }

    public static Score calculate(List<Card> cards) {
        Score score = new Score(calculateWorst(cards));
        cards.forEach(score::calculateBest);
        return score;
    }

    private static int calculateWorst(List<Card> cards) {
        return cards.stream()
                .map(Card::getNumber)
                .mapToInt(Number::getScore)
                .sum();
    }

    private void calculateBest(Card card) {
        if (card.isAce() && score + 10 <= 21) {
            score += 10;
        }
    }

    public boolean isBusted() {
        return score > BUST_THRESHOLD;
    }

    public boolean isBlackJack(List<Card> cards) {
        return cards.size() == 2 && score == 21;
    }

    public int getScore() {
        return score;
    }
}
```

처음에는 `Score` 객체 내부에서 점수를 계산하는 로직이 존재해야 해야한다는 것으로 이해했다.

람다 캡처링 문제를 해결하기 위해 기존에 사용되던 `sum` 을 `Score` 객체의 상태값이자 인스턴스 객체인 `score` 로 만들었다.

점수값인 `score` 는 블랙잭 게임 참가자 마다 다른 값을 가져야했기 때문에 인스턴수 변수를 사용해야했고 인스턴스 변수를 중간에 변경하고자 하니 정적 팩토리 메서드 `calculate()` 내부에서 객체를 생성하고 내부 값을 다시 계산하여 반환하는 기묘한 모습을 가진 객체가 만들어졌다.

이러한 구조의 객체는 VO 여야 했던 `Score` 내부에선 상태값인 `score` 가 생성 과정에서 한 번 변경 되기에 불변이라는 보장을 받을 수 없다는 문제점을 갖고 있다.

또한, 일급 컬렉션인 `Cards` 내부의 상태를 전달하여 `Score` 내부에서 점수를 계산하는 구조는 `Cards` 가 일급 컬렉션의 역할을 제대로 수행하지 못하는 것을 알 수 있다.

기존에 설계대로 만들고자 했던 VO 와 일급 컬렉션이 모두 제 역할을 하지 못한다는 것에 현재 코드가 상당히 부적절하다는 것을 알 수 있다.

해당 코드를 들고 다시 한 번 리뷰를 받은 후 현재 코드는 아래와 같이 바뀌었다.

```java
// Score.java
public class Score {

    private final int score;

    private Score(int score) {
        this.score = score;
    }

    public static Score soft(IntStream scores) {
        int best = scores.sum();
        if (best + ACE_ADDITIONAL_NUMBER > BUST_THRESHOLD) {
            return hard(scores);
        }
        return new Score(best + ACE_ADDITIONAL_NUMBER);
    }

    public static Score hard(IntStream scores) {
        return new Score(scores.sum());
    }

    public boolean isBusted() {
        return score > BUST_THRESHOLD;
    }

    public boolean isMaxScore() {
        return score == BUST_THRESHOLD;
    }

    public boolean isDealerReceivable() {
        return score < DEALER_RECEIVABLE_SCORE;
    }

    public boolean isBiggerThan(Score score) {
        return this.score > score.getScore();
    }
}
```

범블비와 해당 부분에 대한 소통 끝에 `Score` 에 대한 역할과 책임을 다시 한 번 생각해 볼 수 있었다.

`Score` 는 말 그대로 점수를 관장하고 있는 객체이다.

특히 블랙잭 게임에서는 `Ace` 를 기준으로 두 가지 점수가 나올 수 있기 때문에 이를 `soft()` 와 `hard()` 라는 정적 팩토리 메서드를 만들어 `Score` 를 기준에 맞게 반환하도록 변경했다.

또한, 현재 점수가 버스트거나 블랙잭인 경우 역시 `Score` 내부에서 관리할 수 있도록 메서드를 이동하였다.

이외에도 `Score` 가 갖고 있을 법한 로직들을 전부 `Score` 객체 내부에서 관리할 수 있도록 하였다.

```java
// Cards.java
public int getBestPossible() {
    if (hasAce()) {
        return Score.soft(extractedScores());
    }
    return Score.hard(extractedScores());
}
```

`Score` 객체를 변경한 이후 기존에 적용하려던 계산 로직은 위와 같이 변경되었다.

기존 로직은 모든 카드 점수의 최저합을 구한 뒤 `Ace` 를 포함하고 최저합에 10을 더해도 21을 초과하지 않는다면 10을 더해주는 로직이었다.

현재 로직은 `Cards` 는 `Ace` 를 포함하고 있는지 여부를 판단하여 `Ace` 를 1 과 11로 생각할 수 있는 `soft()` 를 호출하도록 하고 포함하고 있지 않다면 `hard()` 를 호출하여 `Score` 값을 반환받게끔 변경하였다.

호출된 `soft()` 는 전달 받은 점수를 통해 10을 더해도 21을 초과하지 않는다면 10을 더한 값으로 `Score` 객체를 생성하여 반환하게 된다.

기존에 한 번에 하려고 했던 로직을 두 객체에 나눠서 진행하도록 만든 것이다.

<br>

## 결론

---

람다 캡처링은 지역 변수를 자유 변수로써 람다 내부에 참조하는 것을 람다 캡처링이라 한다.

참조된 자유 변수가 지역 변수일 경우 `final` 혹은 `effectively final` 이어야 한다.

### 지역 변수를 람다 캡처링 할 경우 생각해 볼 수 있는 것

- 꼭 람다식으로 처리해야 하는가?
- 객체를 분리하여 처리할 수 없는가?

### 람다식으로 지역 변수의 값을 변경해야 한다면?

```java
int sum = 12;
MyFunctionalInterface mi = num -> num += 10;
sum = mi.method(sum);
```

지역 변수를 람다식의 매개 변수로 넘겨주고 람다식 바디에서 수정하고 반환받아 사용할 수 있다.

<br>

## References

---

- [https://perfectacle.github.io/2019/06/30/java-8-lambda-capturing/](https://perfectacle.github.io/2019/06/30/java-8-lambda-capturing/)
- [https://velog.io/@kmdngmn/Java-람다-캡처링-Lambda-Capturing-Java-8](https://velog.io/@kmdngmn/Java-%EB%9E%8C%EB%8B%A4-%EC%BA%A1%EC%B2%98%EB%A7%81-Lambda-Capturing-Java-8)
- [https://cobbybb.tistory.com/19](https://cobbybb.tistory.com/19)
- [https://steady-coding.tistory.com/306](https://steady-coding.tistory.com/306)