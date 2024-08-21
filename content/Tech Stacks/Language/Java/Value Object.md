---
title: Value Object
date: 2022-03-07 13:30:00 +0900
status: In Progress
tags:
  - Java
---

## DTO 와 VO 란?

---

Data Transfer Object 와 Value Object 는 각 계층 간 데이터 교환을 위한 자바 객체를 의미한다.

데이터를 각 레이어 간에 전달하는 목적을 가지고 있으며, 객체의 속성과 getter, setter 만 가지고 있다.

두 가지 모두 비슷한 의미를 가졌지만 차이점이 있다.

## VO 란?

---

VO 란 도메인에서 한 개 또는 그 이상의 속성들을 묶어서 **특정 값을 나타내는 객체**를 의미한다.

이로 인해 객체를 값처럼 사용할 수 있고, 생성자를 통해 설정된 상태 값은 절대 변하지 않는다.

한 예로 로또 번호를 생각해보자.

로또 번호는 충분히 `int` 타입으로 사용해도 되지 않을까?

사용할 순 있지만 부적절 하다고 볼 수 있다.

도메인 객체를 나타내기 위해 원시 값을 사용하는 나쁜 관습은 `primitive obsession` 이라 불릴 정도다.

로또 번호는 1 에서 45 의 숫자로 범위가 정해져 있으며 서로에 대한 연산이 가능하지 않기 때문에 `LottoNumber` 라는 VO 를 통해 관리하는 것이 효과적이다.

## VO 의 특성

---

### 1. Immutable(불변성) - setter 가 없는 불변 객체여야 한다.

속성 값 자체가 식별 값인 VO 는 값이 바뀌면 다른 값이 되어 추적이 불가하고, 복사될 때는 의도치 않은 객체들이 함께 변경되는 문제를 유발한다.

따라서 VO 는 반드시 변경할 수 없는 불변 객체로 만들어야 한다.

```java
public class LottoNumber {

    private int value;

    public LottoNumber(int value) {
        this.value = value;
    }
}

public static void main(String[] args) {

    LottoNumber lottoNumber1 = new LottoNumber(1);

    LottoNumber lottoNumber2 = new LottoNumber(1);

    lottoNumber2 = new LottoNumber(2);
}
```

따라서 객체 생성 이후 속성 값이 변경될 여지가 있는 setter 를 사용하는 것 보다 생성과 동시에 속성 값을 할당하는 생성자를 활용하는 것이 VO 의 정체성을 지키면서 의도치 않은 변경을 막을 수 있고 유지보수에도 효과적이다.

이로써 VO 는 GC 에 의해 폐기 될 때까지 동일함을 보장한다.

### 1.1 Hassle-free Sharing(번거로움 없는 공유)

VO 는 코드의 다른 부분에 의해 수정되지 않기 때문에 참조로 공유할 수 있다.

이는 side effect 를 피하기 위해 사용되는 코드의 복잡성과 부하를 극적으로 감소시킨다.

### 1.2 Improved Semantics(향상된 의미)

초기 클래스에는 생성자와 `private` 속성만 존재해야한다.

이를 통해 무의미한 인터페이스를 피하고 VO 에 대한 의미있는 이름과 동작을 정의할 수 있다.

### 2. Value Equality(값 동등성) - equals 와 hashCode 메서드를 재정의해야 한다.

타입도 같고, 내부 속성값도 같은 두 객체가 있다면 실제로도 같은 객체로 취급하는 것이 이상적이다.

```java
public class LottoNumber {

    private int value;

    public LottoNumber(int value) {
        this.value = value;
    }
}

@Test
void equals() {
    LottoNumber lottoNumber1 = new LottoNumber(5);
    LottoNumber lottoNumber2 = new LottoNumber(5);

    // lottoNumber1 != lottoNumber2
    assertThat(lottoNumber1 == lottoNumber2).isFalse(); // 동일성 비교
}
```

하지만 값이 같은 두 객체를 생성하고 동일성 비교를 해보면 서로 다른 객체로 구별된다.

두 객체가 참조하고 있는 메모리 주소값이 서로 다르기 때문이다.

따라서 객체가 포함하고 있는 속성값들을 기준으로 객체를 비교하는 동등성 비교를 통해 객체를 비교해야 한다.

하지만 어떤 속성값들을 기준으로 동등성 비교를 할 것인지는 직접 `equals()` 메서드를 재정의하여 정해야 한다.

```java
// equals & hashcode 재정의
...
    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final LottoNumber lottoNumber = (LottoNumber) o;
        return value == lottoNumber.value;
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
...
```

`hashCode()` 를 재정의하지 않으면 메모리 주솟값을 사용해서 해시값을 만든다.

`hashCode()` 를 재정의 해줌으로써 객체의 특정 값을 기준으로 같은 해시코드를 얻을 수 있고, 이는 해시값을 사용하는 컬렉션 등에서 객체를 비교하는 용도로 사용되기 때문에 `equals()` 메서드 재정의 시 `hashCode()` 도 함께 재정의 해주는 것이 효과적이다.

단, 무의미한 `equals()` 와 `hashCode()` 는 사용하지 않아야 한다.

### 3. Self Validation(자가 유효성 검사) - 생성자에서 validate

VO 는 context 에서 유효한 값만 허용한다. 이는 유효하지 않는 값으로 객체를 만들 수 없음을 의미하기도 한다.

생성자 내부에서 유효성 검사를 수행함으로써 모든 유효성 검사를 생성 시간에 이루어지게끔 할 수 있다.

이러한 강제 유효성 검사는 의미있고 명시적인 방법으로 도메인 제약 조건을 표현하는데도 유용하다.

```java
public class LottoNumbers {

    private final List<LottoNumber> lottoNumbers;

    private LottoNumbers(List<LottoNumber> lottoNumbers) {
	      // validateLottoNumbers(lottoNumbers); 1번 쓰레드에서 검증
        // 2번 쓰레드의 외부 메서드에서 lottoNumbers 를 변경
        // this.lottoNumbers = new ArrayList<>(lottoNumbers); 변경된 값이 할당
        this.lottoNumbers = new ArrayList<>(lottoNumbers);
        validateLottoNumbers();
    }

    public static LottoNumbers of(List<Integer> rawLottoNumbers) {
        ...
        return new LottoNumber(lottoNumbers);
    }

    private void validateLottoNumber() {
        ...
    }
}
```

값 주입 후 `validate` 를 진행하는 것을 방어적 복사 기법이라 하는데, 이는 Multi-Thread 환경에 안전하다.

Multi-Thread 환경에서는 `validate` 를 마친 `lottoNumber` 를 다른 쓰레드에서 변경하게되면 변경된 상태로 객체에 할당되기 때문에 `validate` 를 후순위로 미루는 것이다.

## VO 는 원시값 포장과 같은가?

---

결론부터 말하자면 다르다. 원시값 포장과 동시에 VO 로 만들 순 있지만, 원시값 포장이 VO 는 아니다.

### 원시값 포장

원시 유형의 값을 이용해 의미를 나타내지 않고, 의미있는 객체로 포장한다는 개념

### VO

- Immutability(불변성) - 수정자(setter)가 없다.
- Value Equality(값 동등성) - 내부 동등성 검사.
- Self Validation(자기 유효성 검사) - 생성자에서 validate.

## DTO 란?

---

DTO 는 계층 간 데이터 교환을 위해 사용되는 객체로, 로직을 가지지 않고 getter 와 setter 만 갖고 있는 순수한 데이터 객체다.

예를 들어 유저가 입력한 데이터를 DB 에 넣는 과정을 보자.

유저가 자신의 브라우저에서 데이터를 입력하여 form 에 있는 데이터를 DTO 에 넣어서 전송한다.

해당 DTO 를 받은 서버가 DAO 를 이용하여 DB 로 데이터를 집어넣는다.

## References

---

- [https://m.blog.naver.com/jysaa5/221751719334](https://m.blog.naver.com/jysaa5/221751719334)
- [https://tecoble.techcourse.co.kr/post/2020-06-11-value-object/](https://tecoble.techcourse.co.kr/post/2020-06-11-value-object/)
- [https://livenow14.tistory.com/37](https://livenow14.tistory.com/37)
- [https://livenow14.tistory.com/18](https://livenow14.tistory.com/18)
- [http://melonicedlatte.com/2021/07/24/231500.html](http://melonicedlatte.com/2021/07/24/231500.html)
