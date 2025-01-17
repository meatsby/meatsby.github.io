# 7~8. java.util.function 패키지

## java.util.function 패키지

---

- 자주 사용되는 다양한 함수형 인터페이스 제공

| 함수형 인터페이스 | 메서드 | 설명 |
| --- | --- | --- |
| java.lang.Runnable | void run() | 매개변수 없고 반환값도 없음 |
| Supplier<T> | T get() | 매개변수 없고 반환값은 있음 |
| Consumer<T> | void accept(T t) | 매개변수만 있고 반환값 없음 |
| Function<T, R> | R apply(T t) | 하나의 매개변수를 받아서 결과 반환 |
| Predicate<T> | boolean test(T t) | 하나의 매개변수를 받아서 boolean을 반환 |

```java
Supplier<Integer> f = () -> (int)(Math.random() * 100) + 1;
Consumer<Integer> f = i -> System.out.print(i + ", ");
Predicate<Integer> f  = i -> i%2==0;
Function<Integer, Integer> f = i -> i/10*10;
```

### 매개변수가 2개인 함수형 인터페이스

| 함수형 인터페이스 | 메서드 | 설명 |
| --- | --- | --- |
| BiConsumer<T, U> | void accept(T t, U u) | 두 개의 매개변수만 있고 반환값 없음 |
| BiPredicate<T, U> | boolean test(T t, U u) | 두 개의 매개변수를 받아서 boolean을 반환 |
| BiFunction<T, U, R> | R apply(T t, U u) | 두 개의 매개변수를 받아서 하나의 결과 반환 |

```java
// 매개변수가 3개 이상인 함수형 인터페이스가 필요하면 직접 작성하여 사용
@FunctionalInterface
interface TriFunction<T, U, V, R> {
		R apply(T t, U u, V v);
}
```

### 매개변수 타입과 반환 타입이 일치하는 함수형 인터페이스

| 함수형 인터페이스 | 메서드 | 설명 |
| --- | --- | --- |
| UnaryOperator<T> | T apply(T t) | Function의 자손. 매개변수와 결과의 타입이 같음 |
| BinaryOperator<T> | T apply(T t, T t) | BiFunction의 자손. 매개변수와 결과의 타입이 같음 |