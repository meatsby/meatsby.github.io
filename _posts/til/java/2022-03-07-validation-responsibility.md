---
title: '[Java] 검증의 책임'
author: meatsby
date: 2022-03-07 10:00:01 +0900
categories: [TIL, Java]
tags: [WoowaCourse, 학습로그, 검증]
---

## MVC 패턴 내 검증의 책임

---

미션을 진행하면서 MVC 패턴을 자주 경험하게되는데 이때 객체 생성 과정에서 겪게되는 검증의 책임에 대한 고찰을 정리하고자 한다.

결론부터 말하자면 객체의 입장에 따라 검증이 필요하다면 객체 내부에서 검증하는 것이 적절하다.

```java
public class LottoTicket {

    private static final int LOTTO_SIZE = 6;

    private final List<LottoNumber> lottoNumbers;

    private LottoTicket(List<LottoNumber> lottoNumbers) {
        validateSize(lottoNumbers);
        validateNoDuplicates(lottoNumbers);
        this.lottoNumbers = lottoNumbers;
    }
}
```

`LottoTicket` 이라는 클래스는 `LottoNumber` 의 일급 컬렉션이다.

`LottoTicket` 의 책임은 6개의 중복되지 않는 `LottoNumber` 들을 포장하는 것이다.

해당 객체가 책임에 맞는 역할을 수행하기 위해선 검증 로직이 필요하다.

앞서 말한 두 가지 검증을 수행하기 위해 검증 메서드를 추출하고 해당 메서드를 생성자에 위치시켜 검증한다.

### 생성자가 검증을 할 수 있는가?

객체는 외부에서 new 연산자가 실행된 시점에 생성된다.

때문에 인스턴스 메서드인 검증 메서드를 수행하는데 문제가 없다.

객체의 생성 과정을 표시하면 아래와 같다.

`new 연산자 → 객체 메모리 할당 → 생성자 호출 → 내부 상태 초기화`

### 검증 메서드가 많아진다면?

```java
public class LottoTicket {

    private static final int LOTTO_SIZE = 6;

    private final List<LottoNumber> lottoNumbers;

    private LottoTicket(List<LottoNumber> lottoNumbers) {
        validateSize(lottoNumbers);
        validateNoDuplicates(lottoNumbers);
        validateA();
        validateB();
        validateC();
        validateD();
        this.lottoNumbers = lottoNumbers;
    }
}
```

만약 생성자 내부에 검증 메서드가 많아지게 된다면 해당 객체가 너무 많은 책임을 지고 있는 것이 아닌가 고민해봐야한다.

해당 객체가 책임지지 않아도 되는 검증이라면 해당 검증을 필요로하는 요소를 클래스로 분리하여 책임을 이전시키는 것이 좋다.

<br>

## 여러 도메인이 같은 가공을 필요로 할 때의 책임은?

---

예를 들어 사용자 입력으로 숫자를 받을 때 `IllegalArgumentException` 을 발생시키고 싶다면 아래와 같은 코드를 작성하게 될 것이다.

```java
private static int parseNumber(String value) {
    try {
        return Integer.parseInt(value);
    } catch (NumberFormatException e) {
        throw new IllegalArgumentException("입력은 숫자여야 합니다.");
    }
}
```

해당 가공을 사용하는 클래스가 하나라면 해당 클래스 내부에서 수행해도 무관하겠지만 여러 클래스가 해당 메서드를 필요로 한다면 어떨까?

모든 클래스에 똑같은 메서드를 쓰는 것이 맞는 것일까?

MVC 패턴을 사용 중이라면 사용자 입력을 넘겨주기 위해 `View` 와 `Controller` 를 사용하고 있을 것이다.

그렇다면 View 나 `Controller` 중에서 해당 메서드를 갖고 있으면 좋지 않을까?

### `View` 나 `Controller` 가 데이터를 가공해도 되나?

결론부터 말하자면 `Domain` 이 필요로 하는 데이터를 가공하는 곳은 `View` 나 `Controller` 둘 다 무관하다.

`View` 의 책임이 사용자 입력을 적절한 타입으로 반환하는 것이라고 판단된다면 `View` 에서 데이터를 가공해도 되고 `Controller` 의 책임이 `View` 에게 받은 `Raw Data` 를 적절하게 가공하는 것이라고 판단되면 `Controller` 에서 데이터를 가공해도 무관하다.

결국엔 코드를 작성하는 입장에서 적절한 이유로 책임을 부여한다면 무관하다는 것이다.

개인적으로 `Controller` 의 역할은 `View` 와 `Domain` 을 연결해주는 것이라고 생각하기 때문에 데이터 가공이 필요하다면 `View` 에서 적절한 타입으로 변환하여 `Controller` 에게 넘겨주는 것이 적절하다고 생각한다.

또한 `View` 가 변경될 경우 `Controller` 내부에서 수행하던 변환 작업 역시 변경될 가능성이 있기 때문에 View 에게 해당 책임을 지게하는 것이 적합하다고 생각한다.

<br>

## 결론

---

검증의 책임은 객체에게 있고 객체가 너무 많은 검증을 수행하는 것 같다면 클래스 분리를 고려해봐라.

데이터 가공은 `View` 에서 수행하고 `Controller` 를 통해 `Domain` 에게 넘겨라.

<br>

## References

---

- [https://velog.io/@wannte/객체-생성시-유효성-검사에-관하여](https://velog.io/@wannte/%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1%EC%8B%9C-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC)