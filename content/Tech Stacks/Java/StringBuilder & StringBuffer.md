---
title: "StringBuilder & StringBuffer"
date: 2022-09-29 20:00:00 +0900
status: In Progress
tags:
  - Java
---

## String 타입

---

```java
String str = "hello";
str = str + " world";
```

Java 에서 `String` 타입은 불변 객체다. 즉, 위 코드에서 `"hello"` 가 `"hello world"` 가 되는 것이 아닌 `"hello"` 와 `"hello world"` 객체가 따로 생성되는 것이다.

`str` 변수가 `"hello"` 에서 `"hello world"` 를 참조하게 되면 `"hello"` 객체는 참조되지 않는 상태가 되어 GC 의 대상이 된다.

```java
String str = "";
for (int i = 0; i < 10000; i++) {
    str += i;
}
```

만약 위와 같은 코드가 실행된다면 참조되지 않는 `String` 객체 10000개가 Heap 메모리 공간을 차지하여 애플리케이션 성능에 치명적일 수 있다.

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100; i++) {
    sb.append(i);
}
String str = sb.toString();
```

이를 해결하기 위해 가변성을 가지는 `StringBuilder` 와 `StringBuffer` 를 사용할 수 있다.

위 코드 처럼 `.append()` `.delete()` 등의 API 를 사용하여 동일 객체 내에서 문자열을 변경하는 것이 가능하다. 때문에 변경이 빈번한 로직을 사용해야 할 경우 `StringBuilder` 와 `StringBuffer` 를 사용하는 것이 효과적이다.

## StringBuilder 와 StringBuffer 의 차이

---

```java
public final class StringBuilder
    extends AbstractStringBuilder
    implements java.io.Serializable, Comparable<StringBuilder>, CharSequence
{
```

```java
public final class StringBuffer
    extends AbstractStringBuilder
    implements java.io.Serializable, Comparable<StringBuffer>, CharSequence
{
```

`StringBuilder` 와 `StringBuffer` 를 살펴보면 동일한 추상 클래스와 인터페이스를 상속받고 있다. 즉, 동일한 API 를 가지고 있다는 것이다. 그렇다면 이 둘의 차이점은 무엇일까?

```java
// StringBuilder
@Override
@HotSpotIntrinsicCandidate
public StringBuilder append(String str) {
    super.append(str);
    return this;
}
```

```java
// StringBuffer
@Override
public synchronized StringBuffer append(Object obj) {
    toStringCache = null;
    super.append(String.valueOf(obj));
    return this;
}
```

`.append()` 메서드를 살펴보면 이 둘의 차이를 알 수 있다. `StringBuilder` 와 달리 StringBuffer 는 `synchronized` 키워드를 사용하는 것을 확인할 수 있다.

즉, `StringBuilder` 는 `Thread-Safe` 하지 않은 반면 `StringBuffer` 는 `Thread-Safe` 하기 때문에 멀티 스레드 환경에서의 안정성을 가지고 있다.

하지만, `StringBuilder` 는 동기화를 고려하지 않기 때문에 단일 스레드 환경에선 `StringBuffer` 보다 성능이 뛰어나다는 것을 알 수 있다.

## 결론

---

![[StringBuilder vs StringBuffer.png]]

위 그림은 `String` `StringBuilder` `StringBuffer` 의 특징에 대해서 정리된 표이다. 문자열을 사용해야하는 상황에 맞춰 알맞게 사용하면 될 것 같다.

## References

---

- [https://ifuwanna.tistory.com/221](https://ifuwanna.tistory.com/221)
