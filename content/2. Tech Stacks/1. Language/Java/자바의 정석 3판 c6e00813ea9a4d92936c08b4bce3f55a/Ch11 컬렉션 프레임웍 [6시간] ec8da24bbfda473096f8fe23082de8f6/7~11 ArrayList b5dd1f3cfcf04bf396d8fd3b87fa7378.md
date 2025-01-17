# 7~11. ArrayList

## ArrayList

---

- 기존의 Vector 를 개선한 것으로 구현 원리와 기능적으로 동일
    - Vector 는 자체적으로 동기화 처리가 되어 있음
- List 인터페이스를 구현하므로, 저장 순서가 유지되고 중복을 허용
- 데이터의 저장 공간으로 배열을 사용 (배열 기반)

## ArrayList 의 메서드

---

```java
// 생성자
ArrayList()
ArrayList(Collection c)
ArrayList(int initialCapacity)

// 추가
boolean add(Object o)
void add(int index, Object element)
boolean addAll(Collection c)
boolean addAll(int index, Collection c)

// 삭제
boolean remove(Object o)
Object remove(int index)
boolean removeAll(Collection c)
void clear()

// 검색
int indexOf(Object o)
int lastIndexOf(Object o)
boolean contains(Object o)
Object get(int index)
Object set(int index, Object element)
```

## ArrayList 에 저장된 객체의 삭제 과정

---

- 마지막 객체부터 삭제해야 성능 향상 + 전체 삭제 가능

```java
for (int i = list.size() - 1; i >= 0; i--) {
		list.remove(i);
}
```