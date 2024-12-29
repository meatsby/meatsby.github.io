# 21~24. StringBuilder, Math 클래스

## StringBuilder

---

- StringBuffer는 동기화 되어 있음. 멀티 쓰레드에 안전 (thread-safe)
- 멀시 쓰레드 프로그램이 아닌 경우, 동기화는 불필요한 성능 저하
    - 이럴 땐 StringBuffer 대신 StringBuilder 를 사용

## Math 클래스

---

- 수학 관련 static 메서드의 집합

```java
public class RoundTest {
	public static void main(String[] args) {
		for (double d = 1.5; d <= 10.5; d++) {
			double d1 = Math.round(d);
			double d2 = Math.rint(d);

			System.out.printf("%4.1f %4.1f %4.1f%n", d, d1, d2);
		}
	}
}

 1.5  2.0  2.0
 2.5  3.0  2.0
 3.5  4.0  4.0
 4.5  5.0  4.0
 5.5  6.0  6.0
 6.5  7.0  6.0
 7.5  8.0  8.0
 8.5  9.0  8.0
 9.5 10.0 10.0
10.5 11.0 10.0
```