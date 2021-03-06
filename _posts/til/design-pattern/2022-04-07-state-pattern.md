---
title: '[Design Pattern] 상태 패턴'
author: meatsby
date: 2022-04-07 10:00:00 +0900
categories: [TIL, Design Pattern]
tags: [WoowaCourse, 학습로그, Design Pattern, 상태 패턴]
---

## 상태 패턴이란?

---

상태 패턴이란, 일련의 규칙에 따라 객체의 상태를 변화시켜 객체가 할 수 있는 행위를 바꾸는 것을 의미한다.

즉, 동일한 메서드를 객체의 상태에 따라 다르게 동작할 수 있도록 하는 것이다.

객체의 상태를 별도의 타입으로 분리하고 상태 별 하위 타입을 구현하여 사용한다.

추상화 된 동일한 메서드에 상태마다 다른 특정 기능을 수행한 후 다음 상태를 반환하는 것이 핵심이다.

<br>

## 상태 패턴 적용

---

### 인터페이스

```java
public interface BoardState {

    boolean isEnd();

    boolean isBlackTurn();

    Winner findWinner();

    BoardState move(Position start, Position target);

    Rank getRank(int rankLine);

    BoardState terminate();

    double calculateBlackScore();

    double calculateWhiteScore();
}
```

체스 미션을 진행하면서 체스 게임의 상태를 상태 패턴을 적용하여 구현해보고자 했다.

객체의 상태에 따라 달라지는 행위를 추상화 된 형태로 인터페이스를 만든다.

- 체스 게임이 끝났는지 확인하는 기능
- 현재 차례가 흑팀인지 확인하는 기능
- 승리자를 찾는 기능
- 기물을 움직이는 기능
- 체스판의 가로줄을 가져오는 기능
- 체스 게임을 강제 종료하는 기능
- 흑팀의 점수를 계산하는 기능
- 백팀의 점수를 계산하는 기능

위 기능들은 체스 게임이 진행 중이거나 종료 되었을 때, 흑팀의 차례이거나 백팀의 차례일 때 다르게 행동할 수 있다.

### 추상 클래스

구현하고자 하는 상태 중 중복되는 행위가 있다면 인터페이스를 구현한 추상 클래스를 만들어 사용한다.

추상 클래스로 인터페이스를 구현할 경우 인터페이스에 위치한 모든 메서드를 오버라이딩할 필요 없이 중복되는 메서드만을 구현할 수 있다.

```java
public abstract class GameStarted implements BoardState {

    protected final Map<Integer, Rank> ranks;

    public GameStarted(Map<Integer, Rank> ranks) {
        this.ranks = ranks;
    }

    public Rank getRank(int rankLine) {
        return ranks.get(rankLine);
    }
}
```

체스 게임의 모든 상태에선 체스판을 의미하는 `ranks` 를 모두 포함하고 있기 때문에 인터페이스 바로 아래에 `GameStarted` 라는 추상 클래스를 구현하여 모든 하위 타입 상태에서 `ranks` 를 사용할 수 있도록 구현했다.

```java
public abstract class Playing extends GameStarted {

    public Playing(Map<Integer, Rank> ranks) {
        super(ranks);
    }

    BoardState movePiece(Position start, Position target) {
        // ...
    }

    Piece getPiece(Position position) {
        // ...
    }

    @Override
    public boolean isEnd() {
        return false;
    }

    @Override
    public Winner findWinner() {
        throw new IllegalStateException();
    }

    @Override
    public BoardState terminate() {
        return new Terminate(ranks);
    }

    @Override
    public double calculateBlackScore() {
        throw new IllegalStateException();
    }

    @Override
    public double calculateWhiteScore() {
        throw new IllegalStateException();
    }
}
```

`GameStarted` 를 상속받는 또 다른 추상 클래스인 `Playing` 이다.

조상인 `GameStarted` 클래스에서 체스판의 가로줄을 가져오는 기능을 구현했기 때문에 `Playing` 에서는 해당 기는을 제외한 기능들을 구현하면 된다.

`Playing` 은 체스 게임이 진행되고 있는 상태를 의미한다. 때문에 종료 되었을 때 실행되어야 하는 일부 행위들은 모두 예외를 던지도록 처리한다.

`Playing` 의 하위 상태로는 `WhiteTurn` 과 `BlackTurn` 이 존재한다.

해당 상태마다 다르게 구현될 수 있는 메서드들은 구현하지 않는다.

### 상태 클래스

체스 게임 내에서 사용되는 상태는 인터페이스를 구현하거나 추상클래스를 상속받아 해당 상태만 가질 수 있는 행위를 재정의하여 사용할 수 있다.

```java
public final class WhiteTurn extends Playing {

    public WhiteTurn(Map<Integer, Rank> ranks) {
        super(ranks);
    }

    @Override
    public boolean isBlackTurn() {
        return false;
    }

    @Override
    public BoardState move(Position start, Position target) {
        // ...
    }

    @Override
    public End judgeWinner() {
        return new WhiteWin(ranks);
    }

    @Override
    public Playing judgeTurn() {
        return new BlackTurn(ranks);
    }

    @Override
    public String findTurn() {
        return "백";
    }
}
```

```java
public final class BlackTurn extends Playing {

    public BlackTurn(Map<Integer, Rank> ranks) {
        super(ranks);
    }

    @Override
    public boolean isBlackTurn() {
        return true;
    }

    @Override
    public BoardState move(Position start, Position target) {
        // ...
    }

    @Override
    public End judgeWinner() {
        return new BlackWin(ranks);
    }

    @Override
    public Playing judgeTurn() {
        return new WhiteTurn(ranks);
    }

    @Override
    public String findTurn() {
        return "흑";
    }
}
```

체스 게임 진행 중 백팀과 흑팀의 차례를 나타내기 위한 `WhiteTurn` 과 `BlackTurn` 이다.

상태에 따라 다르게 동작하는 메서드들을 해당 클래스 내부에서 구현해준다.

이를 통해 Context 측에서는 `BoardState` 만을 참조하여 현재 체스 게임의 상태를 알 필요 없이 필요한 기능들을 호출해주기만 하면 된다.

<br>

## 상태 패턴의 장단점

---

### 장점

- Context 내부에 존재하는 분기문들을 제거할 수 있다.
- 추가적으로 요구되는 상태도 상태 객체를 새롭게 구현하여 적용할 수 있다.
- 클래스 개수는 증가하지만 코드의 복잡도는 증가하지 않기 때문에 유지보수에 용이하다.

### 단점

- Context 상태 변화의 주체일 경우, 상태의 개수가 많아지거나 상태 변경 규칙이 자주 변경된다면 Context 내부의 코드가 복잡해질 수 있고, 불필요한 메서드가 상태 객체 내부에 생길 수 있다.
- 상태 객체가 상태 변화의 주체일 경우, 상태 변경 규칙이 여러 클래스에 분산되어 있기 때문에 상태 객체가 많아질수록 상태 변경 규칙을 파악하기 어려워질 수 있고, 각 상태 간 의존도가 생길 수 있다.

<br>

## 전략 패턴과의 차이점

---

### 공통점

인터페이스를 사용하여 구현 클래스를 캡슐화한다. 즉, 다형성과 추상 메서드를 활용하여 Context 에서는 어떤 하위 클래스를 할당받는지 알지 못하는 상태로 단순히 추상 메서드를 실행한다.

Context 내부는 영향을 받지 않고 유연하게 변화에 대처할 수 있다.

### 차이점

전략 패턴의 경우, 외부로부터 전략이 주입되어야 한다. 상황에 맞춰 행동을 주입하여 실행할 수 있다.

다양한 알고리즘을 상황에 따라 사용해야 하는 경우 고려해볼 수 있다.

상태 패턴의 경우, 내부에서 스스로 Context 의 상태를 변경할 수 있다.

다양한 상태 변화를 다뤄야할 경우. 즉, 분기문이 많아 복잡할 경우 고려해볼 수 있다.

<br>

## References

---

- [https://victorydntmd.tistory.com/294](https://victorydntmd.tistory.com/294)
- [https://tecoble.techcourse.co.kr/post/2021-04-26-state-pattern/](https://tecoble.techcourse.co.kr/post/2021-04-26-state-pattern/)
- [https://steady-coding.tistory.com/387](https://steady-coding.tistory.com/387)
- [https://defacto-standard.tistory.com/47](https://defacto-standard.tistory.com/47)