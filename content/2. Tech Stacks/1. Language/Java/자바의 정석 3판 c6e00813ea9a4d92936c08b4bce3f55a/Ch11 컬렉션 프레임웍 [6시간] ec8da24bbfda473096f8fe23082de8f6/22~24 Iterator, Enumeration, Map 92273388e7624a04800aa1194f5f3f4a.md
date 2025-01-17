# 22~24. Iterator, Enumeration, Map

## Iterator, ListIterator, Enumeration

---

### 개요

- 컬렉션에 저장된 데이터를 접근하는데 사용되는 인터페이스
- Enumeration 은 Iterator 의 구버전 (잘안씀)
- ListIterator 는 Iterator 의 접근성을 향상 (단방향 → 양방향) (잘안씀)

```java
// 읽어 올 요소가 남아있는지 확인
boolean hasNext()

// 다음 요소를 읽어 옴
Object next()
```

### 개념

- 컬렉션에 저장된 요소들을 읽어오는 방법을 표준화한 것
    - List, Set, Map 모두 읽어오는 방법이 다르기 때문에 위와 같은 인터페이스를 사용

### 사용법

- 컬렉션에 iterator()를 호출해서 iterator를 구현한 객체를 얻어서 사용

```java
List list = new ArrayList();
Iterator it = list.iterator();

while (it.hasNext()) {             // 읽어 올 요소가 있는지 확인
		System.out.println(it.next()); // 다음 요소를 읽어옴
}
```

## Map과 Iterator

---

- Map에는 iterator()가 없다.
    - Map은 Collection의 자손이 아님
    - keySet(), entrySet(), values()를 호출해야 함

```java
Map map = new HashMap();

Iterator it = map.entrySet().iterator();
```