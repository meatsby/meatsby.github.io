---
title: Java
date: 2022-01-05 20:20:45 +0900
status: Done
draft: false
tags:
  - Java
---
## 1~2. 컬렉션 프레임웍, 핵심 인터페이스
---
## 컬렉션 프레임웍 (Collection Framework)
- 컬렉션 (Collection)
    - 여러 객체(데이터)를 모아 놓은 것
- 프레임웍 (Framework
    - 표준화, 정형화된 체계적인 프로그래밍 방식
- 컬렉션 프레임웍 (Collection Framework)
    - 컬렉션(다수의 객체)을 다루기 위한 표준화된 프로그래밍 방식
    - 컬렉션을 쉽고 편리하게 다룰 수 있는 다양한 클래스를 제공
- 컬렉션 클래스 (Collection Class)
    - 다수의 데이터를 저장할 수 있는 클래스 (e.g. Vector, ArrayList, HashSet)
## 컬렉션 프레임웍의 핵심 인터페이스
- `List` : 순서가 있는 데이터의 집합. 데이터의 중복을 허용
    - `ArrayList` `LinkedList` `Stack` `Vector` 등
- `Set` : 순서를 유지하지 않는 데이터의 집합. 데이터의 중복을 허용하지 않음
    - `HashSet` `TreeSet` 등
- `Map` : 키와 값의 쌍으로 이루어진 데이터의 집합. 순서 유지 X / 키 중복 X / 값 중복 O
    - `HashMap` `TreeMap` `HashTable` `Properties` 등
## 3~6. Collection, List, Set, Map
---
## Collection 인터페이스의 메서드
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
- Collection 인터페이스 메서드와 동일
## Map 인터페이스 - 순서 X, 중복 (키 X, 값 O)
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
## 7~11. ArrayList
---
## ArrayList
- 기존의 Vector 를 개선한 것으로 구현 원리와 기능적으로 동일
    - Vector 는 자체적으로 동기화 처리가 되어 있음
- List 인터페이스를 구현하므로, 저장 순서가 유지되고 중복을 허용
- 데이터의 저장 공간으로 배열을 사용 (배열 기반)
## ArrayList 의 메서드
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
- 마지막 객체부터 삭제해야 성능 향상 + 전체 삭제 가능
```java
for (int i = list.size() - 1; i >= 0; i--) {
		list.remove(i);
}
```
## 12~14. LinkedList
---
## 배열의 장단점
### 장점
- 배열은 구조가 간단하고 데이터를 읽는 데 걸리는 시간(접근 시간, access time)이 짧음
### 단점
- 크기를 변경할 수 없음
    - 크기를 변경해야 하는 경우 새로운 배열을 생성 후 데이터를 복사해야 함
    - 크기 변경을 피하기 위해 충분히 큰 배열을 생성하면, 메모리 낭비
- 비순차적인 데이터의 추가, 삭제에 시간이 많이 걸림
    - 데이터를 추가하거나 삭제하기 위해, 다른 데이터를 옮겨야 함
    - 그러나 순차적인 데이터 추가(끝에 추가)와 삭제(끝부터 삭제)는 빠름
## 배열의 단점을 보완
- 배열과 달리 LinkedList 는 불연속적으로 존재하는 데이터를 연결
- 데이터의 삭제 : 단 한 번의 참조변경만으로 가능
    - 각 데이터가 노드로써 서로를 연결하고 있음
    ```java
    class Node {
    		Node next;  // 다음 데이터의 주소
    		Object obj; // 데이터
    }
    ```
- 데이터의 추가 : 한번의 Node 객체 생성과 두 번의 참조변경만으로 가능
## 이중 연결 리스트
- LinkedList - 연결리스트. 데이터 접근성이 나쁨
- Doubly Linked List - 이중 연결리스트. 접근성 향상
    ```java
    class Node {
    		Node next;     // 다음 데이터의 주소
    		Node prvious;  // 이전 데이터의 주소
    		Object obj;    // 데이터
    }
    ```
- Doubly Circular Linked List - 이중 원형 연결리스트
    - 이중 연결리스트에서 첫 번째 노드와 마지막 노드를 연결한 구조
## ArrayList vs LinkedList - 성능 비교
1. 순차적 데이터 추가/삭제 - ArrayList가 빠름
2. 비순차적 데이터 추가/삭제 - LinkedList가 빠름
3. 접근시간(access time) - ArrayList가 빠름
## 15~18. Stack과 Queue
---
## Stack과 Queue
- Stack : LIFO(Last In First Out) 구조. 마지막에 저장된 것을 제일 먼저 꺼냄 (배열)
- Queue : FIFO(First In First Out) 구조. 제일 먼저 저장한 것을 제일 먼저 꺼냄 (링크드 리스트)
## Stack과 Queue의 메서드
### Stack
```java
Stack st = new Stack(); // 객체 생성 후 사용 가능
// Stack이 비어있는지 확인
boolean empty()
// 맨 위에 있는 객체를 반환
Object peek()
// 맨 위에 있는 객체를 꺼냄
Object pop()
// Stack에 객체 저장
Object push(Object item)
// Stack 에 주어진 객체를 찾아서 위치를 반환 (맨 위에서 1, 2, 3 순으로)
int search(Object o)
```
### Queue
```java
Queue 는 인터페이스이기 때문에 직접구현 혹은 Queue 를 구현한 클래스를 사용
Queue q = new LinkedList(); // 이후 사용 가능
// Queue에 객체 추가. 성공하면 true 반환. 저장공간 부족 시 IllegalStateException 발생
boolean add(Object o)
// Queue에서 객체를 꺼냄. 비어있으면 NoSuchElementException 발생
Object remove()
// 삭제없이 요소를 읽음. peek과 달리 비어있으면 NoSuchElementException 발생
Object element()
// Queue에 객체 추가. 성공하면 true 반환
boolean offer(Object o)
// Queue에서 객체를 꺼냄. 비어있으면 null 반환
Object poll()
// 삭제없이 요소를 읽음. 비어있으면 null 반환
Object peek()
```
## 19~21. Stack과 Queue의 활용
---
## Stack과 Queue의 활용
### Stack 활용의 예
- 수식계산
- 수식괄호검사
- 워드프로세서의 undo/redo
- 웹브라우저의 뒤로/앞으로
### Queue 활용의 예
- 최근사용문서
- 인쇄작업 대기목록
- 버퍼
## 22~24. Iterator, Enumeration, Map
---
## Iterator, ListIterator, Enumeration
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
- Map에는 iterator()가 없다.
    - Map은 Collection의 자손이 아님
    - keySet(), entrySet(), values()를 호출해야 함
```java
Map map = new HashMap();
Iterator it = map.entrySet().iterator();
```
## 25~29. Arrays
---
## Arrays - 배열을 다루기 편리한 메서드(static) 제공
1. 배열의 출력
```java
int[] arr  = {1,2,3,4,5};
String list = Arrays.toString(arr); // [1,2,3,4,5] 반환
```
1. 배열의 복사
```java
int[] arr  = {1,2,3,4,5};
int[] arr2 = Arrays.copyOf(arr, 3);         // arr2 = [0,1,2]
int[] arr3 = Arrays.copyOfRange(arr, 2, 4); // arr3 = [2,3]
```
1. 배열 채우기
```java
int[] arr = new int[5];
Arrays.fill(arr, 9);                                     // arr = [9,9,9,9,9]
Arrays.setAll(arr, (i) -> (int)(Math.random() * 5) + 1); // arr = [1,5,2,1,1]
```
1. 배열의 정렬과 검색
```java
int[] arr = {3,2,0,1,4};
int idx = Arrays.binarySearch(arr, 2);    // idx = -5 <- 잘못된 결과
// 이진탐색은 정렬되어 있을 때만 가능
Arrays.sort(arr);                         // arr 정렬
System.out.println(Arrays.toString(arr)); // [0,1,2,3,4]
int idx = Arrays.binarySearch(arr, 2);    // idx = 2 <- 올바른 결과
```
1. 다차원 배열의 출력
```java
int[]   arr   = {0,1,2,3,4};
int[][] arr2D = {{11,22}, {21,22}};
System.out.println(Arrays.toString(arr));       // [0, 1, 2, 3, 4]
System.out.println(Arrays.deepToString(arr2D)); // [[11, 12], [21, 22]]
```
1. 다차원 배열의 비교
```java
String[][] str2D  = new String[][]{{"aaa","bbb"},{"AAA","BBB"}};
String[][] str2D2 = new String[][]{{"aaa","bbb"},{"AAA","BBB"}};
System.out.println(Arrays.equals(str2D, str2D2));     // false
System.out.println(Arrays.deepEquals(str2D, str2D2)); // true
```
1. 배열을 List로 변환
```java
List list = Arrays.asList(new Integer[]{1,2,3,4,5}); // list = [1,2,3,4,5]
List list = Arrays.asList(1,2,3,4,5);                // list = [1,2,3,4,5]
list.add(6) // UnsupportedOperationException 예외 발생. 읽기 전용이기 때문에
List list = new ArrayList(Arrays.asList(1,2,3,4,5)); // 새로운 ArrayList. 변경가능
```
## 30~33. Comparator와 Comparable
---
## Comparator와 Comparable
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
## 34~38. HashSet
---
## HashSet - 순서 X, 중복 X
### HashSet
- Set 인터페이스를 구현한 대표적인 컬렉션 클래스
- 순서를 유지하려면, LinkedHashSet 클래스를 사용
### TreeSet
- 범위 검색과 정렬에 유리한 컬렉션 클래스
- HashSet 보다 데이터 추가, 삭제에 시간이 더 걸림
## HashSet - 주요 메서드
```java
// 생성자
HashSet()
HashSet(Collection c)
HashSet(int initialCapacity)                   // 초기용량 설정
HashSet(int initialCapacity, float loadFactor) // 언제 용량을 늘릴건지
// 추가
boolean add(Object o)
boolean addAll(Collection c) // 합집합
// 삭제
boolean remove(Object o)
boolean removeAll(Collection c) // 교집합
// 모두삭제
void clear()
// 조건부삭제
boolean retainAll(Collection c) // 차집합
// 포함 여부 확인
boolean contains(Object o)
boolean containsAll(Collection c) // 여러 객체를 모두 포함하는지
// 비었는지 확인
boolean isEmpty()
// 저장된 객체 수 확인
int size()
// 객체배열로 반환
Object[] toArray()
Object[] toArray(Object[] a)
```
## HashSet - 예제 3
- HashSet은 객체를 저장하기 전에 기존에 같은 객체가 있는지 확인
    - 같은 객체가 없으면 저장, 있으면 저장 X
- `boolean add(Object o)`는 저장할 객체의 `equals()`와 `hashCode()`를 호출
    - `equals()`와 `hashCode()`가 오버라이딩 되어 있어야 함
```java
public boolean equals(Object o) {
		if (!(obj instanceof Person)) {
				return false;
		}
		Person tmp = (Person)obj;
		return name.equals(tmp.name) && age==tmp.age;
}
public int hashCode() {
		return Objects.hash(name, age);
}
```
## 39~45. TreeSet
---
## TreeSet - 범위 탐색, 정렬
- 이진 탐색 트리(binary search tree)로 구현. 범위 탐색과 정렬에 유리.
- 이진 트리는 모든 노드가 최대 2개의 하위 노드를 갖음
    - 각 노드가 트리 형태로 연결 (LinkedList의 변형)
## 이진 탐색 트리(binary search tree)
- 부모보다 작은 값은 왼쪽, 큰 값은 오른쪽에 저장
- 데이터가 많아질수록 추가, 삭제에 시간이 더 걸림 (비교 횟수 증가)
## TreeSet - 데이터 저장과정 `boolean add(Object o)`
- TreeSet 에 7,4,9,1,5 의 순서로 데이터를 저장할 때
![[39~45%20TreeSet%208e03cd04bd8a40b49abe19e02167d7ca/Untitled.png]]## TreeSet - 주요 생성자와 메서드
```java
// 생성자
TreeSet()
HashSet(Collection c)
TreeSet(Comparator comp) // 주어진 정렬기준으로 정렬하는 TreeSet 생성
Object first() // 정렬된 순서에서 첫번째 객체 반환
Object last()  // 정렬된 순서에서 마지막 객체 반환
Object ceiling(Object o) // 지정된 객체와 같은 객체를 반환. 없으면 가장 가까운 큰 값 반환
Object floor(Object o)   // 지정된 객체와 같은 객체를 반환. 없으면 가장 가까운 작은 값 반환
Object higher(Object o) // 지정된 객체보다 큰 가장 가까운 값 반환
Object lower(Object o)  // 지정된 객체보다 작은 가장 가까운 값 반환
SortedSet subSet(Object fromElement, Object toElement) // 범위 검색의 결과 반환
SortedSet headSet(Object toElement)                    // 지정된 객체보다 작은 객체들
SortedSet tailSet(Object fromElement)                  // 지정된 객체보다 큰 객체들
```
## 46~51. HashMap
---
## HashMap과 Hashtable - 순서 X, 중복(키 X, 값 O)
- Map 인터페이스를 구현. 데이터를 키와 값의 쌍으로 저장
- HashMap(동기화 X)은 Hashtable(동기화O)의 신버전
### HashMap
- Map 인터페이스를 구현한 대표적인 컬렉션 클래스
- 순서를 유지하려면 `LinkedHashMap` 클래스 사용
### TreeMap
- 범위 검색과 정렬에 유리한 컬렉션 클래스
- HashMap 보다 데이터 추가, 삭제에 시간이 더 걸림
## HashMap의 키(key)와 값(value)
- 해싱(hashing) 기법으로 데이터를 저장. 데이터가 많아도 검색이 빠름
- Map 인터페이스를 구현. 데이터를 키와 값의 쌍으로 저장
```java
public class HashMap extends AbstractMap implements Map, Cloneable, Serializable {
		transient Entry[] table;
		...
		static class Entry implements Map.Entry {
				final Object key;
				Object value;
				...
		}
}
```
## 해싱(hashing)
- 해시함수(hash function)로 해시테이블(hash table)에 데이터를 저장, 검색
- 해시테이블은 배열과 링크드 리스트가 조합된 형태
- 해시함수는 같은 키에 대해 항상 같은 해시코드를 반환해야 함 (저장 후 검색을 위해)
- 서로 다른 키일지라도 같은 값의 해시코드를 반환할 수 있음
## HashMap - 주요 메서드
```java
// 생성자
HashMap()
HashMap(int initialCapacity)                   // 초기용량 설정
HashMap(int initialCapacity, float loadFactor) // 언제 용량을 늘릴건지
HashMap(Map m)                                 // 다른 Map을 HashMap으로 변경
// 추가
Object put(Object key, Object value)
void putAll(Map m)
// 삭제
Object remove(Object key)
// 수정
Object replace(Object key, Object value)
boolean replace(Object key, Object oldValue, Object newValue)
// 읽어오기
Set entrySet()
Set keySet()
Collection values()
// 탐색
Object get(Object key)
Object getOrDefault(Object key, Object defaultValue)
boolean containsKey(Object key)
boolean containsValue(Object value)
```
## 52~54. Collections 클래스
---
## Collections - 컬렉션을 위한 메서드(static)를 제공
1. 컬렉션 채우기, 복사, 정렬, 검색 - fill(), copy(), sort(), binarySearch() 등
2. 컬렉션의 동기화 - synchronizedXXX()
3. 변경불가(readOnly) 컬렉션 만들기 - unmodifiableXXX()
4. 싱글톤 컬렉션 만들기(객체 1개만 저장) - singletonXXX()
5. 한 종류의 객체만 저장하는 컬렉션 만들기 - checkedXXX()
