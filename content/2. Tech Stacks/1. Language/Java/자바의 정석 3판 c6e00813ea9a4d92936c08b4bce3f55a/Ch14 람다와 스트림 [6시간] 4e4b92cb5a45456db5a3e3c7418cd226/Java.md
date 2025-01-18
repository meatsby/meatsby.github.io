---
title: Java
date: 2022-01-05 20:20:45 +0900
status: Done
draft: false
tags:
  - Java
---
## 1~4. 람다식이란? 람다식 작성하기
---
## 람다식(Lambda Expression)
- 함수를 간단한 식으로 표현하는 방법
```java
int max(int a, int b) {
		return a > b ? a : b;
}
(a, b) -> a > b ? a : b
```
- 익명 함수(이름이 없는 함수, annonymous function)
    - 반환 타입, 함수 이름 제거
    - 화살표 삽입
- 함수와 메서드의 차이
    - 함수는 일반적 용어, 메서드는 객체지향개념 용어
    - 함수는 클래스에 독립적, 메서드는 클래스에 종속적
## 람다식 작성하기
1. 메서드의 이름과 반환타입을 제거하고 ‘→’ 를 블록 앞에 추가
2. 반환값이 있는 경우, 식이나 값만 적고 return문 생략 가능
3. 매개변수의 타입이 추론 가능하면 생략 가능
### 주의사항
1. 매개변수가 하나인 경우, 괄호() 생략 가능
2. 블록 안의 문장이 하나일 경우, 괄호{} 생략 가능
## 람다식의 예
```java
(a, b) -> a > b ? a : b
(name, i) -> System.out.println(name + "=" + i)
x -> x * x
() -> (int)(Math.random() * 6)
```
## 람다식은 익명 객체
- 람다식(익명 객체)을 다루기 위한 참조변수 필요
## 5~6. 함수형 인터페이스
---
## 함수형 인터페이스
- 단 하나의 추상 메서드만 선언된 인터페이스
```java
interface MyFuction {
		public abstract int max(int a, int b);
}
MyFunction f = new MyFunction() {
		public int max(int a, int b) {
				return a > b ? a : b;
		}
};
```
- 함수형 인터페이스 타입의 참조변수로 람다식을 참조할 수 있음
    - 단, 함수형 인터페이스의 메서드와 람다식의 매개변수 개수와 반환타입이 일치해야 함
```java
MyFuction f = (a, b) -> a > b ? a : b;
int value = f.max(3, 5); // 실제로는 람다식이 호출됨
```
## 함수형 인터페이스 - 예시
- 익명 객체를 람다식으로 대체
```java
List<String> list = Arrays.asList("abc", "aaa", "bbb", "ddd", "aaa");
@FunctionalInterface
interface Comparator<T> {
		int compare(T o1, T o2);
}
Collections.sort(list, new Comparator<String>() {
		public int compare(String s1, String s2) {
				return s2.compareTo(s1);
		}
});
Collections.sort(list, (s1, s2) -> s2.compareTo(s1));
```
## 함수형 인터페이스 타입의 매개변수, 반환타입
- 함수형 인터페이스 타입의 매개변수
```java
@FunctionalInterface
interface MyFunction {
		void myMethod();
}
// 람다식을 매개변수로 활용
void aMethod(MyFunction f) {
		f.myMethod(); // MyFunction에 정의된 메서드 호출
}
MyFunction f = () -> System.out.println("myMethod()");
aMethod(f);
// 줄여서
aMethod(() -> System.out.println("myMethod()"));
```
- 함수형 인터페이스 타입의 반환타입
```java
// 람다식을 반환
MyFunction myMethod() {
		MyFunction f = () -> {};
		return f;
}
// 줄여서
MyFunction myMethod() {
		return () -> {};
}
```
## 7~8. java.util.function 패키지
---
## java.util.function 패키지
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
## 9~12. Predicate의 결합, CF
---
## Predicate의 결합
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
- 함수형 인터페이스를 사용하는 컬렉션 프레임웍의 메서드
```java
list.forEach(i -> System.out.print(i + ", "));
list.removeIf(x -> x%2 == 0 || x%3 == 0);
list.replaceAll(i -> i*10);
// map의 모든 요소를 {k,v} 형식으로 출력
map.forEach((k,v) -> System.out.print("{" + k + "," + v + "},"));
```
## 13~14. 메서드, 생성자의 메서드 참조
---
## 메서드 참조
- 하나의 메서드만 호출하는 람다식은 ‘메서드 참조’로 더 간단히 할 수 있음
| 종류 | 람다 | 메서드 참조 |
| --- | --- | --- |
| static 메서드 참조 | (x) → ClassName.method(x) | ClassName::method |
| 인스턴스 메서드 참조 | (obj, x) → obj.method(x) | ClassName::method |
| 특정 객체 인스턴스 메서드 참조 | (x) → obj.method(x) | obj::method |
- static 메서드 참조
```java
Integer method(String s) {
		return Integer.parseInt(s);
}
Function<String, Integer> f = (String s) -> Integer.parseInt(s);
Function<String, Integer> f = Integer::parseInt;
```
## 생성자의 메서드 참조
- 생성자의 메서드 참조
```java
Supplier<MyClass> s = () -> new MyClass();
Supplier<MyCalss> s = MyClass::new;
Function<Integer, MyClass> s = (i) -> new MyClass(i);
Function<Integer, MyClass> s = MyClass::new;
```
- 배열과 메서드 참조
```java
Function<Integer, int[]> f = x -> new int[x];
Function<Integer, int[]> f2 = int[]::new;
```
## 15~16. 스트림, 스트림의 특징
---
## 스트림
- 다양한 데이터 소스를 표준화된 방법으로 다루기 위한 것
- 스트림이 제공하는 기능
    - 중간 연산 - 연산 결과가 스트림인 연산. 반복적으로 적용 가능
    - 최종 연산 - 연산 결과가 스트림이 아닌 연산. 단 한 번만 적용 가능 (스트림의 요소를 소모)
```java
stream.distinct().limit(5).sorted().forEach(System.out::println)
//     ----------중간 연산---------- ---------최종 연산----------
```
## 스트림의 특징
- 스트림은 데이터 소스로부터 데이터를 읽기만 할 뿐 변경하지 않음
```java
List<Integer> list = Arrays.asList(3,1,5,4,2);
List<Integer> sortedList = list.stream().sorted().collect(Collectors.toList());
System.outprintln(list);       // [3, 1, 5, 4, 2]
System.outprintln(sortedList); // [1, 2, 3, 4, 5]
```
- 스트림은 Iterator 처럼 일회용 (필요 시 다시 스트림을 생성해야 함)
```java
strStream.forEach(System.out::println); // 모든 요소를 화면에 출력(최종 연산)
int numOfStr = strStream.count();       // 에러. 스트림이 이미 닫혔음
```
- 최종 연산 전까지 중간연산이 수행되지 않음 - 지연된 연산
```java
IntStream intStream = new Random().int(1, 46);        // 1~45 범위의 무한 스트림
intStream.distinct().limit(6).sorted()                // 중간 연산
						.forEach(i -> System.out.print(i + ",")); // 최종 연산
```
- 스트림은 작업을 내부 반복으로 처리함
```java
stream.forEach(System.out::println); // forEach 메서드 안에 for문이 있음
```
- 스트팀의 작업을 병렬로 처리 - 병렬스트림
```java
Stream<String> strStream = Stream.of("dd", "aaa", "CC", "cc", "b");
int sum = strStream.parallel()                // 병렬 스트림으로 전환(속성만 변경)
						.mapToInt(s -> s.length()).sum(); // 모든 문자열의 길이의 합
```
- 기본형 스트림 - IntStream, LongStream, DoubleStream
    - 오토박싱 & 언박싱의 비효율이 제거됨(Stream<Integer> 대신 intStream 사용)
    - 숫자와 관련된 유용한 메서드를 Stream<T>보다 더 많이 제공
## 17~22. 스트림 만들기
---
## 스트림 만들기 - 컬렉션
- Collection 인터페이스의 stream()으로 컬렉션을 스트림으로 변환
```java
List<Integer> list = Arrays.asList(1,2,3,4,5);
Stream<Integer> intStream = list.stream(); // list를 스트림으로 변환
// 스트림의 모든 요소를 출력
intStream.forEach(System.out::print); // 12345
intStream.forEach(System.out::print); // 에러. 스트림이 이미 닫힘
```
## 스트림 만들기 - 배열
- 객체 배열로부터 스트림 생성하기
```java
Stream<String> strStream = Stream.of("a", "b", "c"); // 가변 인자
Stream<String> strStream = Stream.of(new String[]{"a", "b", "c"});
Stream<String> strStream = Arrays.stream(new String[]{"a", "b", "c"});
Stream<String> strStream = Arrays.stream(new String[]{"a", "b", "c"}, 0, 3);
```
- 기본형 배열로부터 스트림 생성하기
```java
IntStream IntStream.of(int... values) // Stream이 아니라 IntStream
IntStream IntStream.of(int[])
IntStream Arrays.stream(int[])
IntStream Arrays.stream(int[] array, int startInclusive, int endExclusive)
```
## 스트림 만들기 - 임의의 수
- 난수를 요소로 갖는 스트림 생성하기
```java
IntStream intStream = new Random().ints();       // 무한 난수 스트림 생성
intStream.limit(5).forEach(System.out::println); // 5개의 요소만 출력
IntStream intStream = new Random().ints(5);        // 5개짜리 유한 난수 스트림 생성
IntStream intStream = new Random().ints(5, 1, 11); // (1, 10)사이 5 요소 유한 난수 스트림
```
## 스트림 만들기 - 특정 범위의 정수
- 특정 범위의 정수를 요소로 갖는 스트림 생성하기 (IntStream, LongStream)
```java
IntStream intStream = IntStream.range(1, 5);       // 1,2,3,4
IntStream intStream = IntStream.rangeClosed(1, 5); // 1,2,3,4,5
```
## 스트림 만들기 - 람다식 iterate(), generate()
- 람다식을 소스로 하는 스트림 생성하기
```java
// iterate()는 이전 요소를 seed로 해서 다음 요소를 계산 (이전 요소에 종속적)
Stream<Integer> evenStream = Stream.iterate(0, n -> n+2);
// generate는 seed를 사용하지 않음 (이전 요소에 독립적)
Stream<Double> randomStream = Stream.generate(Math::random);
Stream<Integer> oneStream = Stream.generate(() -> 1);
```
## 스트림 만들기 - 파일과 빈 스트림
- 파일을 소스로 하는 스트림 생성하기
```java
Stream<Path> Files.list(Path dir); // Path는 파일 또는 디렉토리
Stream<String> Files.lines(Path dir);
Stream<String> Files.lines(Path dir, Charset cs);
Stream<String> lines(); // BufferedReader 클래스의 메서드
```
- 비어있는 스트림 생성하기
```java
Stream emptyStream = Stream.empty(); // empty()는 빈 스트림을 생성해서 반환
long count = emptyStream.count();    // count 값은 0
```
## 23~25. 스트림의 연산
---
## 스트림의 연산 - 중간 연산
```java
// 중복 제거
Stream<T> distinct()
// 조건에 안 맞는 요소 제외
Stream<T> filter(Predicate<T> predicate)
// 스트림의 일부를 잘라냄
Stream<T> limit(long maxSize)
// 스트림의 일부를 건너뜀
Stream<T> skip(long n)
// 스트림의 요소에 작업 수행
Stream<T> peek(Consumer<T> action)
// 스트림의 요소를 정렬
Stream<T> sorted()
Stream<T> sorted(Comparator<T> comparator)
// 스트림의 요소 변환
Stream<R>    map(Function<T,R> mapper)
DoubleStream mapToDouble(ToDoubleFunction<T> mapper)
IntStream    mapToInt(ToIntFunction<T> mapper)
LongStream   mapToLong(ToLongFunction<T> mapper)
Stream<R>    flatMap(Function<T,Stream<R>> mapper)
DoubleStream flatMapToDouble(Function<T, DoubleStream> m)
IntStream    flatMapToInt(Function<T, IntStream> m)
LongStream   flatMapToLong(Function<T, LongStream> m)
```
## 스트림의 연산 - 최종 연산
```java
// 각 요소에 지정된 작업 수행
void forEach(Consumer<? super T> action)
void forEachOrdered(Consumer<? super T> action)
// 스트림의 요소의 개수 반환
long count()
// 스트림의 최대/최소값 반환
Optional<T> max(Comparator<? super T> comparator)
Optional<T> min(Comparator<? super T> comparator)
// 스트림의 요소 하나 반환
Optional<T> findAny()   // 아무거나 하나
Optional<T> findFirst() // 첫번째 요소
// 주어진 조건을 모든 요소가 만족시키는지 확인
boolean allMatch(Predicate<T> p)  // 모두 만족하는지
boolean anyMatch(Predicate<T> p)  // 하나라도 만족하는지
boolean noneMatch(Predicate<T> p) // 모두 만족하지 않는지
// 스트림의 모든 요소를 배열로 반환
Object[] toArray()
A[] toArray(IntFunction<A[]> generator)
// 스트림의 요소를 하나씩 줄여가면서 계산
Optional<T> reduce(BinaryOperator<T> accumulator)
T reduce(T identity, BinaryOperator<T> accumulator)
U reduce(U identity, BiFunction<U,T,U> accumulator BinaryOperator<T> combiner)
// 스트림의 요소를 수집. 주로 요소를 그룹화하거나 분할한 결과를 컬렉션에 담아 반환
R collect(Collector<T,A,R> collector)
R collect(Supplier<R> supplier, BiConsumer<R,T> accumulator, BiConsumer<R,R> combiner)
```
## 26~34. 스트림의 중간 연산
---
## 스트림의 중간 연산
- 스트림 자르기 - skip(), limit()
```java
IntStream intStream = IntStream.rangeClosed(1, 10);    // 12345678910
intStream.skip(3).limit(5).forEach(System.out::print); // 45678
```
- 스트림 요소 걸러내기 - filter(), distinct()
```java
Int intStream = IntStream.of(1,2,2,3,3,3,4,5,5,6);
intStream.distinct().forEach(System.out::print); // 123456
Int intStream = IntStream.rangeClosed(1, 10);               // 12345678910
intStream.filter(i -> i%2 == 0).forEach(System.out::print); // 246810
intStream.filter(i -> i%2 != 0 && i%3 != 0).forEach(System.out::print);
intStream.filter(i -> i%2 != 0).filter(i -> i%3 != 0).forEach(System.out::print);
```
- 스트림 정렬하기 - sorted()
```java
Stream<T> sorted()                // 스트림 요소의 기본 정렬(Comparable)로 정렬
Stream<T> sorted(Comparator<? super T> comparator) // 지정된 Comparator로 정렬
```
- 스트림의 요소 반환하기 - map()
```java
// e.g. 파일 스트림에서 파일 확장자(대문자)를 중복없이 뽑아내기
fileStream.map(File::getName)                // Stream<File> -> Stream<String>
	.filter(s -> s.indexOf('.') != -1)         // 확장자가 없는 것은 제외
	.map(s -> s.substring(s.indexOf('.') + 1)) // Stream<String> -> Stream<String>
	.map(String::toUpperCase)                  // Stream<String> -> Stream<String>
	.distinct()                                // 중복 제거
	.forEach(System.out::print);               // JAVABAKTXT
```
- 스트림의 요소를 소비하지 않고 엿보기 - peek()
```java
fileStream.map(File::getName)                // Stream<File> -> Stream<String>
	.filter(s -> s.indexOf('.') != -1)         // 확장자가 없는 것은 제외
	.peek(s -> System.out.printf("filename=%s%n", s)) // 파일명 출력
	.map(s -> s.substring(s.indexOf('.') + 1)) // Stream<String> -> Stream<String>
	.peek(s -> System.out.printf("extension=%s%n", s)) // 확장자 출력
	.forEach(System.out::print);               // JAVABAKTXT
```
- 스트림의 스트림을 스트림으로 변환 - flatMap()
```java
Stream<String[]> strArrStream = Stream.of(
	new String[]{"abc", "def", "jkl"},
	new String[]{"ABC", "GHI", "JKL"}
);
// 스트림의 스트림
Stream<Stream<String>> strStreamStream = strArrStream.map(Arrays::stream);
// 스트림의 스트림 -> 스트링 스트림
Stream<String> strStream = strArrStream.flatMap(Arrays::stream);
```
## 35~39. Optional<T>
---
## Optional<T>
- T 타입 객체의 래퍼클래스 (간접적으로 null 다루기)
    - null을 직접 다루는 것은 위험
    - null 체크 시 if문 필수. 코드가 지저분
```java
public final class Optional<T> {
		private final T value; // T 타입의 참조변수 (모든 종류의 객체 저장 가능)
				...
}
```
## Optional<T> 객체 생성하기
```java
String str = "abc";
Optional<String> optVal = Optional.of(str);
Optional<String> optVal = Optional.of("abc");
Optional<String> optVal = Optional.of(null);         // NullPointerException 발생
Optional<String> optVal = Optional.ofNullable(null); // OK.
```
- null 대신 빈 Optional<T> 객체를 사용하자
```java
Optional<String> optVal = null;                     // 널로 초기화. 바람직 X
Optional<String> optVal = Optional.<String>empty(); // 빈 객체로 초기화
```
## Optional<T> 객체 값 가져오기
- Optional 객체의 값 가져오기 - get(), orElse(), orElseGet(), orElseThrow()
```java
Optional<String> optVal = Optional.of("abc");
String str1 = optVal.get();                  // optVal에 저장된 값을 반환. null이면 예외
String str2 = optVal.orElse("");             // optVal에 저장된 값이 null이면 "" 반환
String str3 = optVal.orElseGet(String::new); // 람다식 사용가능
String str4 = optVal.orElseThrow(NullPointerException::new); // null이면 예외 발생
```
- isPresent() - Optional 객채의 값이 null이면 false, 아니면 true 반환
## OptionalInt, OptionalLong, OptionalDouble
- 기본형 값을 감싸는 래퍼클래스
- 빈 Optional 객체와의 비교
```java
OptionalInt opt  = OptionalInt.of(0);
OptionalInt opt2 = OptionalInt.empty();
System.out.println(opt.isPresent());  // true
System.out.println(opt2.isPresent()); // false
System.out.println(opt.equals(opt2)); // false
```
