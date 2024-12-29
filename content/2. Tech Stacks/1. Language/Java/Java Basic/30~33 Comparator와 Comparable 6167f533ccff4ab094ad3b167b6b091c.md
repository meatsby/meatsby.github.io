# 30~33. Comparator와 Comparable

## Comparator와 Comparable

---

- 객체 정렬에 필요한 메서드(정렬기준 제공)를 정의한 인터페이스
    - `Comparable` 기본 정렬기준을 구현하는데 사용
    - `Comparator` 기본 정렬기준 외에 다른 기준으로 정렬하고자할 때 사용

```java
public interface Comparable { // o1, o2 두 객체를 비교
		int compareTo(Object o); // 주어진 객체(o)를 자신과 비교
}

public interface Comparator {
		int compare(Object o1, Object o2); // o1, o2 두 객체를 비교
		boolean equals(Object obj);        // equals를 오버라이딩하라는 뜻
}
```

- `compare()`와 `compareTo()`는 두 객체의 비교결과를 반환하도록 작성

```java
public final class Integer extends Number implements Comparable {
		...
		public int compareTo(Integer anotherInteger) {
				int v1 = this.value;
				int v2 = anotherInteger.value;
				// 같으면 0, 우측이 크면 -1, 좌측이 크면 1 반환
				return (v1 < v2 ? -1 : (v1==v2? 0 : 1));
		}
}
```

## Integer와 Comparable

---

```java
public final class Integer extends Number implements Comparable {
		...
		public int compareTo(Object o) {
				return compareTo((Integer)o);
		}
		public int compareTo(Integer anotherInteger) {
				int thisValue = this.value;
				int anotherValue = anotherInteger.value;
				// 같으면 0, 비교대상이 크면 -1, 자신이 크면 1 반환
				return (thisValue < anotherValue ? -1 : (thisValue ==anotherValue ? 0 : 1));
		}
}
```