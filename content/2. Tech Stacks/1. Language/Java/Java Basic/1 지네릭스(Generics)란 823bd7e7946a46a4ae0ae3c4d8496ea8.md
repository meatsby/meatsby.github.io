# 1. 지네릭스(Generics)란?

## 지네릭스(Generics)란?

---

- 컴파일 시 타입을 체크해 주는 기능(compile-time type check) - JDK1.5
- 객체의 타입 안정성을 높이고 형변환의 번거로움을 줄여줌

```java
ArrayList<Tv> tvList = new ArrayList<Tv>();

tvList.add(new Tv());    // OK.
tvList.add(new Audio()); // 컴파일 에러.

// Tv t = (Tv)tvList.get(0);
Tv t = tvList.get(0); // 형변환 불필요
```

- `RuntimException`인 `ClassCastException`을 `Compiletime`에서 처리하기 위해
- e.g. `String str = null;`보다 `String str = “”;`로 초기화하여 `NullPointerException` 회피