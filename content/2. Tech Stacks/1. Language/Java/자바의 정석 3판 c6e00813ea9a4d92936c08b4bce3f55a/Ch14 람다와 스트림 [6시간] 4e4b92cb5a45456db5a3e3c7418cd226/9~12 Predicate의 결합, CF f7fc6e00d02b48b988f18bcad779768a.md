# 9~12. Predicate의 결합, CF

## Predicate의 결합

---

- `and()` `or()` `negate()` 로 두 Predicate를 하나로 결합

```java
Predicate<Integer> p = i -> i < 100;
Predicate<Integer> q = i -> i < 200;
Predicate<Integer> r = i -> i%2 == 0;

Predicate<Integer> notP = p.negate();        // i >= 100
Predicate<Integer> all  = notP.and(q.or(r)); // 100 <= i && i < 200 || i%2 == 0
Predicate<Integer> all2 = notP.and(q.or(r)); // 100 <= i && (i < 200 || i%2 == 0)

System.out.println(all.test(2));  // true
System.out.println(all2.test(2)); // false
```

- 등가비교를 위한 Predicate의 작성에는 isEqual()를 사용(static 메서드)

```java
Predicate<String> p2 = Predicate.isEqual(str1);
boolean result = p2.test(str2); // str1과 str2가 같은지 비교한 결과를 반환
```

## 컬렉션 프레임웍과 함수형 인터페이스

---

- 함수형 인터페이스를 사용하는 컬렉션 프레임웍의 메서드

```java
list.forEach(i -> System.out.print(i + ", "));
list.removeIf(x -> x%2 == 0 || x%3 == 0);
list.replaceAll(i -> i*10);

// map의 모든 요소를 {k,v} 형식으로 출력
map.forEach((k,v) -> System.out.print("{" + k + "," + v + "},"));
```