---
title: '[Java] 불변에 관하여'
author: meatsby
date: 2022-03-07 10:00:00 +0900
categories: [TIL, Java]
tags: [WoowaCourse, 학습로그, 불변]
---

## 불변 객체란?

---

불변 객체란, **객체 생성 이후 내부의 상태가 변하지 않는 객체**를 의미한다.

불변 객체는 read-only 메서드만을 제공하며, 객체의 내부 상태를 제공하는 메서드를 제공하지 않거나, 제공할 경우 방어적 복사(defensive-copy)를 통해 제공한다.

<br>

## 방어적 복사란?

---

생성자의 인자로 받은 객체의 복사본을 만들어 내부 필드를 초기화하거나, getter 메서드에서 내부의 객체를 반환할 때, 객체의 복사본을 만들어 반환하는 것을 의미한다.

방어적 복사를 사용한 경우, 외부에서 객체를 변경해도 내부의 객체는 변경되지 않는다.

```java
public class LottoNumber {

    private final int number;

    private LottoNumber(int number) {
        this.number = number;
    }

    public int setNumber() {
        this.number = number;
    }
}
```

```java
public class LottoTicket {

    private final List<LottoNumber> lottoNumbers;

    private LottoTicket(List<LottoNumber> lottoNumbers) {
        this.lottoNumbers = lottoNumbers;
    }
}
```

위와 같이 로또번호 객체와 로또티켓 객체가 있다고 가정해보자.

```java
public class Test {

    List<LottoNumber> original = new ArraysList<>();
    original.add(new LottoNumber(1));
    original.add(new LottoNumber(2));

    LottoTicket lottoTicket = new LottoTicket(original);

    original.add(new LottoNumber(3));
}
```

위 코드를 실행했을 때 `lottoTicket` 내부의 `lottoNumbers` 는 과연 몇개의 숫자를 담고 있을까?

1, 2 두 개의 숫자를 담고 있다고 생각하는게 대부분이지만 실제로는 그렇지 않다.

객체를 생성한 이후에 기존 `original` 에 객체를 추가하면 `lottoNumbers` 에도 객체가 추가된다.

`lottoTicket` 내부 필드인 `lottoNumbers` 에 `original` 객체의 주소가 그대로 전해졌기 때문이다.

### 방어적 복사 활용

```java
public class LottoTicket {

    private final List<LottoNumber> lottoNumbers;

    private LottoTicket(List<LottoNumber> lottoNumbers) {
        this.lottoNumbers = new ArrayList<>(lottoNumbers);
    }
}
```

그렇다면 이번엔 방어적 복사를 사용해 이를 해결해 보자.

기존 `LottoTicket` 코드에서 `new` 연산자를 사용해 만든 복사본으로 내부를 초기화하면 위 `Test` 가 실행되어도 `lottoNumbers` 에는 두 개의 숫자만 들어있을 수 있다.

`new` 연산자를 통해 `original` 과의 주소 공유를 끊어냈기 때문이다.

### 방어적 복사는 deep-copy 인가?

방어적 복사를 활용해 복사본으로 내부 필드를 초기화했어도, 해당 필드 내부의 객체는 같은 주소값을 공유하기 때문에 원본의 내부 요소가 변경된다면 복사본의 내부 요소도 변경된다.

```java
public class LottoNumber {

    private final int number;

    private LottoNumber(int number) {
        this.number = number;
    }

    public int setNumber() {
        this.number = number;
    }
}
```

```java
public class Test {

    LottoNumber one = new LottoNumber(1)
    LottoNumber two = new LottoNumber(2)

    List<LottoNumber> original = new ArraysList<>();
    original.add(one);
    original.add(two);

    LottoTicket lottoTicket = new LottoTicket(original);

    two.setNumber(3);
}
```

가령 위와 같은 코드로 변경되었다 가정해보자.

`Test` 를 실행한다면 `lottoTicket` 내부의 `lottoNumbers` 는 방어적 복사를 활용했음에도 불구하고 외부에서 원본의 요소를 변경한다면 `lottoNumbers` 의 요소 역시 변하게된다.

`original` 과 `lottoNumbers` 는 다른 주소값을 가지고있지만 내부 요소는 `two` 의 주소값을 모두 가지고있기 때문이다.

### 그렇다면 deep-copy 는 어떻게 생성하는가?

객체를 복사할 수 있도록 해주는 인터페이스를 구현하는 방법이 있다.

```java
public class LottoNumber implements Cloneable {

    private final int number;

    private LottoNumber(int number) {
        this.number = number;
    }

    @Override
    public LottoNumber clone() {
        LottoNumber lottoNumber = null;
        try {
            lottoNumber = (LottoNumber) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
        return lottoNumber;
    }
}
```

```java
public class Test {

    List<LottoNumber> original = new ArraysList<>();
    original.add(new LottoNumber(1));
    original.add(new LottoNumber(2));

    List<LottoNumber> deepCopy = new ArrayList<>();

    for (LottoNumber lottoNumber : original) {
        deepCopy.add(lottoNumber.clone);
    }

    original.add(new LottoNumber(3));
}
```

`Cloneable` 인터페이스를 구현한 객체를 내부 요소로 갖고 있다면 위와 같은 코드를 통해 복사하고자 하는 객체의 내부 요소들 모두를 복사본으로써 가져갈 수 있게된다.

`original` 리스트는 1, 2, 3 의 숫자를 갖게 되고 `deepCopy` 리스트는 1, 2 의 숫자를 갖게 되는데 `deepCopy` 의 1, 2 는 `original` 의 1, 2 와는 다른 주소를 갖고 있는 객체가 되는 것이다.

<br>

## unmodifiable 과 immutable

---

방어적 복사 외에도 `getter` 를 통해 `LottoTicket` 과 같은 일급 컬렉션의 요소를 반환하고자 할 때 `unmodifiableList()` 와 같은 `Unmodifiable Collections` 를 주로 활용하여 반환한다.

하지만 `Unmodifiable Collections` 읽기만 가능한 컬렉션으로 반환하기에 `set()` 이나 `add()` 와 같은 변경을 가하는 메서드를 호출하면 `UnsupportedOperationException` 을 발생시킬 뿐 `immutable` 하지는 않다.

```java
public class Test {

    List<LottoNumber> original = new ArraysList<>();
    original.add(new LottoNumber(1));
    original.add(new LottoNumber(2));

    List<LottoNumber> unmodifiable = Collections.unmodifiableList(original);

    original.add(new LottoNumber(3));
}
```

가령 위와 같은 코드를 실행할 경우 `unmodifiable` 의 원본인 `original` 에 변경이 생겼기 때문에 `unmodifiable` 역시 숫자 3 이 추가된다.

### 그렇다면 어떤게 immutable 한 것일까?

기존의 컬렉션을 immutable 하게 만들기 위해선 기존 컬렉션의 데이터를 새로운 컬렉션으로 복사한 후 수정을 제한하는게 일반적이다.

```java
public class Test {

    List<LottoNumber> original = new ArraysList<>();
    original.add(new LottoNumber(1));
    original.add(new LottoNumber(2));

    List<LottoNumber> immutable =
            Collections.unmodifiableList(new ArrayList<>(original));

    original.add(new LottoNumber(3));
}
```

따라서 위 코드와 같이 원본을 `new` 연산자로 복사하여 `unmodifiableList()` 로 수정에 제한을 준 것을 `immutable` 하다고 볼 수 있다.

<br>

## 불변 객체와 final 을 사용해야 하는 이유

---

### 1. Thread-Safe 하여 병렬 프로그래밍에 유용하고 동기화를 고려하지 않아도 된다.

멀티 쓰레드 환경에서 동기화 문제가 발생하는 이유는 공유 자원을 동시에 write 하기 때문이다.

만약 공유 자원이 불변이라면 항상 동일한 값을 반환할 것이기 때문에 더 이상 동기화를 고려하지 않아도 된다.

이는 안정성을 보장할 뿐만 아니라 동기화를 하지 않음으로써 성능상의 이점도 가져다준다.

### 2. 실패 원자적인(Failure Atomic) 메서드를 만들 수 있다.

가변 객체를 통해 어떠한 작업 수행 도중 예외가 발생하면 해당 객체가 불안정한 상태에 빠질 수 있다.

불안정한 상태를 갖는 객체는 또 다른 에러를 유발할 수 있다.

하지만 불변 객체라면 어떠한 예외가 발생하여도 메서드 호출 전의 상태를 유지할 수 있을 것이다.

예외가 발생하여도 오류가 발생하지 않은 것 처럼 다음 로직을 처리할 수 있다.

### 3. Cache 나 Map 의 Set 등의 요소로 활용하기에 더욱 적합하다.

만약 캐시나 Map 또는 Set 등으로 사용되는 객체가 변경되었다면 이를 갱신하는 등의 작업을 추가로 해주어야 할 것이다.

하지만 객체가 불변이라면 한 번 데이터가 저장된 이후에 다른 부가 작업들을 고려하지 않아도 될 것이고, 이는 캐시나 다른 자료 구조를 사용하는데 용이하게 작용할 것이다.

### 4. Side Effect 를 피해 오류가능성을 최소화할 수 있다.

Side Effect 란 변수의 값이 변경되거나, 필드 값이 설정되는 등의 변화가 발생하는 효과를 의미한다.

만약 객체가 `setter` 를 가지고있고, 여러 메서드에서 객체의 값을 변경한다면 객체를 예측하기 어려워진다.

변경된 객체의 상태를 확인하기 위해선 메서드들을 살펴보아야할 것이며 이는 유지보수성을 떨어트린다.

따라서 이러한 Side Effect 가 없는 순수 함수들을 만드는 것이 상당히 중요하다.

불변 객체는 기본적으로 값 수정이 불가능하기 때문에 변경 가능성이 적고 객체의 생성과 사용이 상당히 제한된다.

때문에 메서드들은 자연스럽게 순수 함수들로 구성될 것이고, 다른 메서드가 호출되어도 객체의 상태가 유지되기 때문에 안전하게 객체를 다시 사용할 수 있다.

### 5. 다른 사람이 작성한 함수를 예측가능하며 안전하게 사용할 수 있다.

불변성이 보장된 함수라면 함수 내부를 보지 않아 시간을 절감할 수 있고 값이 변하지 않는다는 확신을 가지고 다른 사람의 메서드를 사용할 수 있다.

### 6. 가비지 컬렉션의 성능을 높일 수 있다.

`final` 키워드를 통해 생성된 불변 객체는 해당 객체를 가지는 또 다른 컨테이너 객체가 이를 참조한다.

즉, 컨테이너는 컨테이너가 참조하는 객체들보다 늦게 생성되었다는 것이다.

이러한 점을 통해 GC 가 수행될 때 컨테이너 객체 하위의 불변 객체들은 skip 할 수 있도록 도와준다.

컨테이너 객체가 살아있다는 것은 하위의 불변 객체들 역시 처음에 할당된 상태로 참조되고 있다는 것을 의미하기 때문이다.

결국 불변 객체를 활용하면 GC 가 스캔해야 하는 객체의 수가 줄어 스캔해야 하는 메모리 영역과 빈도수 역시 줄어든다는 의미와 동시에 GC 가 수행되어도 지연 시간을 줄일 수 있다.

때문에 필드 값을 수정할 수 있는 MutableHolder 보다는 ImmutableHolder 를 사용하는 것이 좋다.

또한, GC 는 새롭게 생성된 객체는 대부분 금방 죽는다는 Weak Generational Hypothesis 에 맞춰 설계되었기 때문에 가변객체가 필요한 경우라면 MutableHolder 를 사용하는 것 보다 새로운 Immutable 객체를 생성하는 것이 더 효과적이다.

<br>

## Java 에서 불변 객체를 생성하는 법

---

### final 키워드

Java 에서 변수들은 기본적으로 가변적인데, 불변성 확보를 위해 `final` 키워드를 제공하고 있다.

하지만 `final` 키워드가 내부의 객체 상태를 변경하지 못하도록 하는 것은 아니다.

예를 들어 `List` 의 경우 `final` 로 선언 되었어도 `add()` 와 같이 상태가 변할 수 있다.

때문에 Java 에서는 참조에 의해 값이 변경될 수 있는 점들을 유의하여 개발해야 한다.

### 불변 클래스 예시

Java 에서 불변 객체를 생성하기 위해서는 다음 규칙에 따라 클래스를 생성해야 한다.

1. 클래스를 final 로 선언
2. 모든 클래스 변수를 private 과 final 로 선언
3. 객체를 생성하기 위한 생성자 또는 정적 팩토리 메서드 추가
4. 참조에 의해 변경 가능성이 있는 경우 방어적 복사를 이용하여 전달

```java
public final class ImmutableClass {

    private final int age;
    private final String name;
    private final List<String> list;

    private ImmutableClass(int age, String name) {
        this.age = age;
        this.name = name;
        this.list = new ArrayList<>();
    }

    public static ImmutableClass of(int age, String name) {
        return new ImmutableClass(age, name);
    }
    ...
    public List<String> getList() {
        return new ArrayList<>(list);
    }
}
```

<br>

## Getter 지양하기

---

위 내용들을 바탕으로 왜 자꾸 `getter` 를 지양하라고 하는지 이해가 된 것 같다.

`getter` 는 값을 뱉어내는 역할만을 수행하지만 외부에서 `getter` 를 통해 얻은 값을 통해 내부를 변경시킬 수 있는 위험성이 있기 때문에 `getter` 를 지양해야 한다는 것이다.

### Getter 대신 사용할 수 있는 방법

`getter` 를 통해 얻은 값으로 하려고 했던 행동을 그 값을 가진 객체가 하도록 행동의 주체를 바꾼다.

예를 들어 `LottoNumber` 의  값이 5 인지 확인하고 싶다면 `LottoNumber.getValue() == 5` 보다는 `LottoNumber.isSameAs(5)` 를 사용하는 것이다.

<br>

## 결론

---

그렇다면 방어적 복사와 `Unmodifiable Collections` 그리고 deep-copy 는 언제 사용하는 것이 좋은가?

### 생성자의 인자로 객체가 넘어왔을 경우

외부에서 객체를 넘겨준다면 해당 객체가 외부에서 변경될 가능성이 있기 때문에 방어적 복사를 통해 주소 공유를 끊어주는 것이 좋기 때문에 방어적 복사를 사용하는 것이 적절하다.

### getter 를 통해 객체를 반환할 경우

방어적 복사나 `Unmodifiable Collections` 모두 무관하지만 반환할 값이 일급 컬렉션이라면 복사본을 반환하더라도 복사본 내부의 객체는 주소값을 공유하고 있기 때문에 주의해야한다.

또한 `Unmodifiable Collections` 를 사용할 경우 추후 추가 개선 시점에선 해당 객체의 반환값이 `unmodifiable` 인지 확인할 수 없기 때문에 예외 발생의 잠재적 위험에 노출되는 것 보다 방어적 복사를 사용하는 것이 더 효과적일 것이다.

### getter 로 반환된 일급컬렉션 내부의 요소가 변경될 가능성이 있을 경우

미리 내부 객체를 불변으로 설계한다면 외부에서 변경할 수 있는 가능성이 없지만 위와 같은 상황이 고려될 경우에는 deep-copy 를 활용해서 일급 컬렉션 내부의 객체를 보호하는 방법도 있다.

결론적으로 객체를 불변으로 만들고자 한다면 내부 요소들 역시 불변으로 설계해주는 것이 효과적이다.

<br>

## References

---

- [https://tecoble.techcourse.co.kr/post/2021-04-26-defensive-copy-vs-unmodifiable/](https://tecoble.techcourse.co.kr/post/2021-04-26-defensive-copy-vs-unmodifiable/)
- [https://mangkyu.tistory.com/131](https://mangkyu.tistory.com/131)
- [https://soft.plusblog.co.kr/71](https://soft.plusblog.co.kr/71)
- [https://ahjm-note.tistory.com/6](https://ahjm-note.tistory.com/6)
- [https://velog.io/@sezeom/Getter-Setter-지양하기](https://velog.io/@sezeom/Getter-Setter-%EC%A7%80%EC%96%91%ED%95%98%EA%B8%B0)