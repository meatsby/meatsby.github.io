# 3~6. Collection, List, Set, Map

## Collection 인터페이스의 메서드

---

```java
// 추가
boolean add(Object o)
boolean addAll(Collection c)

// 삭제
void clear()
boolean remove(Object o)
boolean removeAll(Collection c)
boolean retainAll(Collection c)

// 검색
boolean contains(Object o)
boolean containsAll(Collection c)
```

## List 인터페이스 - 순서 O, 중복 O

---

```java
// Collection 인터페이스 메서드 포함

// 추가
void add(int index, Object element)
boolean addAll(int index, Collection c)

// 삭제
Object remove(int index)

// 검색
int indexOf(Object o)
int lastIndexOf(Object o)

// 읽기
Object get(int index)

// 쓰기
Object set(int index, Object element)

// 정렬
void sort(Comparator c)
```

## Set 인터페이스 - 순서 X, 중복 X

---

- Collection 인터페이스 메서드와 동일

## Map 인터페이스 - 순서 X, 중복 (키 X, 값 O)

---

```java
// 추가
Object put(Object key, Object value)
void putAll(Map t)

// 삭제
Object remove(Object key)

// 검색
boolean containsKey(Object key)
boolean containsValue(Object value)
Object get(Object key)

// 읽기
Set entrySet()
Set keySet()
Collection values()
```