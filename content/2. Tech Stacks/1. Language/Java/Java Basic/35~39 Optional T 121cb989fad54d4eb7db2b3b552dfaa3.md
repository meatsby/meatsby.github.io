# 35~39. Optional<T>

## Optional<T>

---

- T 타입 객체의 래퍼클래스 (간접적으로 null 다루기)
    - null을 직접 다루는 것은 위험
    - null 체크 시 if문 필수. 코드가 지저분

```java
public final class Optional<T> {
		private final T value; // T 타입의 참조변수 (모든 종류의 객체 저장 가능)
				...
}
```

## Optional<T> 객체 생성하기

---

```java
String str = "abc";
Optional<String> optVal = Optional.of(str);
Optional<String> optVal = Optional.of("abc");
Optional<String> optVal = Optional.of(null);         // NullPointerException 발생
Optional<String> optVal = Optional.ofNullable(null); // OK.
```

- null 대신 빈 Optional<T> 객체를 사용하자

```java
Optional<String> optVal = null;                     // 널로 초기화. 바람직 X
Optional<String> optVal = Optional.<String>empty(); // 빈 객체로 초기화
```

## Optional<T> 객체 값 가져오기

---

- Optional 객체의 값 가져오기 - get(), orElse(), orElseGet(), orElseThrow()

```java
Optional<String> optVal = Optional.of("abc");
String str1 = optVal.get();                  // optVal에 저장된 값을 반환. null이면 예외
String str2 = optVal.orElse("");             // optVal에 저장된 값이 null이면 "" 반환
String str3 = optVal.orElseGet(String::new); // 람다식 사용가능
String str4 = optVal.orElseThrow(NullPointerException::new); // null이면 예외 발생
```

- isPresent() - Optional 객채의 값이 null이면 false, 아니면 true 반환

## OptionalInt, OptionalLong, OptionalDouble

---

- 기본형 값을 감싸는 래퍼클래스
- 빈 Optional 객체와의 비교

```java
OptionalInt opt  = OptionalInt.of(0);
OptionalInt opt2 = OptionalInt.empty();

System.out.println(opt.isPresent());  // true
System.out.println(opt2.isPresent()); // false
System.out.println(opt.equals(opt2)); // false
```