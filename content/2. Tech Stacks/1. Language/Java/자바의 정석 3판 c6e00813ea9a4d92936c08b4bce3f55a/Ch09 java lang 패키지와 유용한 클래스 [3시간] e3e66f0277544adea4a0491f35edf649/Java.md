---
title: Java
date: 2022-01-05 20:20:45 +0900
status: Done
draft: false
tags:
  - Java
---
## 1~3. Object 클래스와 equals()
---
## Object 클래스
- 모든 클래스의 최고 조상. 오직 11개의 메서드만을 갖고 있음
- notify(), wait() 등은 쓰레드 관련 메서드
## eqauls(Object obj)
- 객체 자신(this)과 주어진 객체(obj)를 비교
- Object 클래스의 equals()는 객체의 주소를 비교(참조변수 값 비교)
```java
class Value {
	int value;
	Value(int value) {
		this.value = value;
	}
	// equals()를 오버라이딩해서 주소가 아닌 value를 비교
	@Override
	public boolean equals(Object obj) {
		// 참조변수 형변환 전에는 항상 instanceof 로 확인
		if (!(obj instanceof Value)) {
			return false;
		}
		Value v = (Value)obj;
		return this.value == v.value;
	}
}
public class Ex9_1 {
	public static void main(String[] args) {
		Value v1 = new Value(10);
		Value v2 = new Value(10);
		// v1과 v2의 값은 같지만 equals 가 비교하는 값은 참조변수이기 때문에 false 반환
		System.out.println(v1.equals(v2));
	}
}
```
## eqauls(Object obj)의 오버라이딩
- 인스턴스 변수(iv)의 값을 비교하도록 equals()를 오버라이딩
```java
class Person {
	long id;
	public boolean equals(Object obj) {
		if (obj instanceof Person) {
			return id == ((Person)obj).id;
		} else {
			return false;
		}
	}
	Person(long id) {
		this.id = id;
	}
}
```
## 4~6. hashCode(), toString()
---
## hashCode()
- 객체의 해시코드를 반환하는 메서드
- Object 클래스의 hashCode()는 객체의 주소를 int로 변환해서 반환
- equals()를 오버라이딩하면, hashCode()도 오버라이딩해야 함
    - equals() 결과가 true 면 두 객체의 해시코드는 같아야 하기 때문
- System.identityHashCode(Object obj)는 Object 클래스의 hashCode()와 동일
## toString(), toString()의 오버라이딩
- toString() : 객체를 문자열로 변환하기 위한 메서드
```java
public String toString() {
	return getClass.getName() + "@" + Integer.toHexString(hashCode());
}
```
```java
class Card {
	String kind;
	int number;
	Card() {
		this("SPADE", 1);
	}
	Card(String kind, int number) {
		this.kind = kind;
		this.number = number;
	}
	// equals()를 오버라이딩 했기 때문에 hashCode()도 오버라이딩
	@Override
	public int hashCode() {
		return Objects.hash(kind, number);
	}
	@Override
	public boolean equals(Object obj) {
		if (!(obj instanceof Card)) {
			return false;
		}
		return this.kind.equals(((Card)obj).kind) && this.number == ((Card)obj).number;
	}
	@Override
	public String toString() {
		return "kind : " + kind + " number : " + number;
	}
}
public class Ex9_4 {
	public static void main(String[] args) {
		Card c1 = new Card();
		Card c2 = new Card();
		System.out.println(c1.equals(c2));
		System.out.println(c1.toString());
		System.out.println(c2.toString());
		System.out.println(c1.hashCode());
		System.out.println(c2.hashCode());
	}
}
```
## 7~10. String 클래스
---
## String 클래스
- String 클래스 = 데이터(char[]) + 메서드(문자열 관련)
```java
public final class String implements java.io.Serializable, Comparable {
	private char[] value;
		...
}
```
- 내용을 변경할 수 없는 불변(immutable) 클래스
```java
String a = "a";
String b = "b";
a = a + b; // "a" 는 사라지고 "ab" 가 참조변수 a 에 다시 할당됨
```
- 덧셈 연산자(+)를 이용한 문자열 결합은 성능이 떨어짐
    - 문자열의 결합이나 변경이 잦다면, 내용을 변경 가능한 StringBuffer 사용
## 문자열의 비교
- `String str = “abc;` 와 `String str = new String(”abc”);` 의 비교
```java
String str1 = "abc";             // 문자열 리터럴 "abc"의 주소가 str1에 저장됨
String str2 = "abc";             // 문자열 리터럴 "abc"의 주소가 str2에 저장됨
String str3 = new String("abc"); // 새로운 String 인스턴스 생성
String str4 = new String("abc"); // 새로운 String 인스턴스 생성
str1 == str2      // true;
str1.equals(str2) // true;
str3 == str4      // false;
str3.equals(str4) // true;
```
## 문자열 리터럴
- 문자열 리터럴은 프로그램 실행 시 자동으로 생성됨 (constant pool에 저장)
- 같은 내용의 문자열 리터럴은 하나만 만들어짐
## 빈 문자열 (””, empty String)
- 내용이 없는 문자열. 크기가 0인 char형 배열을 저장하는 문자열
- 크기가 0인 배열을 생성하는 것은 어느 타입이나 가능
- 문자와 문자열의 초기화
```java
String s = null;
char c = '\u0000';
// 위 보다 아래의 코드가 나음
Stirng s = "";
char c = ' ';
```
## 11. String 생성자
---
## String 클래스의 생성자와 메서드
```java
// String(String s) 거의 안씀
String s = new String("Hello");
// String(char[] value)
char[] c = {'H', 'e', 'l', 'l', 'o'};
String s = new String(c);
// String(StringBuffer buf)
StringBuffer sb = new StringBuffer("Hello");
String s = new String(sb);
// char charAt(int index)
String s = "Hello";
String n = "0123456";
char c = s.charAt(1);  // 'e'
cahr c2 = n.charAt(1); // '1'
// int compareTo(String str)
int i = "aaa".compareTo("aaa");  // i  = 0
int i2 = "aaa".compareTo("bbb"); // i2 = -1
int i3 = "bbb".compareTo("aaa"); // i3 = 1
// String concat(String str)
String s = "Hello";
String s2 = s.concat(" World"); // s2 = "Hello World"
// boolean contains(CharSequence s)
String s = "abcdefg";
boolean b = s.contains("bc"); // b = true
// boolean endsWith(String suffix)
String file = "Hello.txt";
boolean b = file.endsWith("txt"); // b = true
// boolean equals(Object obj)
String s = "Hello";
boolean b = s.equals("Hello");  // true
boolean b2 = s.equals("hello"); // false
// boolean equalsIgnoreCase(String str)
String s = "Hello";
boolean b = s.equalsIgnoreCase("HELLO");  // true
boolean b2 = s.equalsIgnoreCase("heLLo"); // true
// int indexOf(int ch)
String s = "Hello";
int idx1 = s.indexof('o'); // 4
int idx2 = s.indexof('k'); // -1
// int indexOf(int ch, int pos)
String s = "Hello";
int idx1 = s.indexof('e', 0); // 1
int idx2 = s.indexof('e', 2); // -1
// int indexOf(String str)
String s = "ABCDEFG";
int idx = s.indexOf("CD"); // 2
// int lastIndexOf(int ch)
String s = "java.lang.Object";
int idx1 = s.lastIndexOf('.'); // 9
int idx2 = s.indexOf('.');     // 4
// int lastIndexOf(String str)
String s = "java.lang.java";
int idx1 = s.lastIndexOf('java'); // 10
int idx2 = s.indexOf('java');     // 0
// int length()
String s = "Hello";
int length = s.length(); // 5
// String[] split(String regex)
String animals = "dog,cat,bear";
String arr[] = animals.split(","); // {"dog", "cat", "bear"}
// String[] split(String regex, int limit)
String animals = "dog,cat,bear";
String arr[] = animals.split(",", 2); // {"dog", "cat,bear"}
// boolean startsWith(String prefix)
String s = "java.lang.Object";
boolean b = s.startsWith("java");  // true
boolean b2 = s.startsWith("lang"); // false
// String substring(int begin, int end)
String s = "java.lang.Object";
String c = s.substring(10);   // "Object"
String p = s.substring(5, 9); // "lang"
// String toLowerCase()
String s = "Hello";
String s1 = s.toLowerCase(); // "hello"
// String toUpperCase()
String s = "Hello";
String s1 = s.toUpperCase(); // "HELLO"
// String trim()
String s = "   Hello World   ";
String s1 = s.trim(); // "Hello World"
// static String valueOf(기본형)
String b = String.valueOf(true); // "true"
String c = String.valueOf('a'); // "a"
String i = String.valueOf(100); // "100"
```
## 12~14. StringJoiner, 문자열과 기본형
---
## join()과 StringJoiner
- join()은 여러 문자열 사이에 구분자를 넣어서 결합
```java
String animals = "dog,cat,bear";
String[] arr = animals.split(",");
String str = String.join("-", arr);
System.out.println(str); // dog-cat-bear
```
## 문자열과 기본형 간의 변환
- 숫자를 문자열로 바꾸는 방법
```java
int i = 100;
String str1 = i + "";
String str2 = String.valueOf(i);
```
- 문자열을 숫자로 바꾸는 방법
```java
int i = Integer.parseInt("100");
int i2 = Integer.valueOf("100");
Integer i2 = Integer.valueOf("100"); // 원래 반환 타입은 Integer
```
## 15~18. StringBuffer 클래스
---
## StringBuffer 클래스
- String 처럼 문자형 배열(char[])을 내부적으로 가지고 있음
- 그러나 String 과 달리 내용을 변경할 수 있음 (mutable)
## StringBuffer의 생성자
- 배열은 길이 변경불가. 공간이 부족하면 새로운 배열 생성
- StringBuffer는 저장할 문자열의 길이를 고려해서 적절한 크기로 생성해야 함
```java
public StringBuffer(int length) {
	value = new char[length];
	shared = false;
}
public StringBuffer() {
	this(16); // 버퍼의 크기 미지정 시 16으로 생성
}
public StringBuffer(String str) {
	this(str.length() + 16); // 지정한 문자열보다 16 크게 생성
	append(str);
}
```
## StringBuffer의 변경
- StringBuffer 는 String 과 달리 내용 변경이 가능
- append() 는 지정된 내용을 StringBuffer 에 추가 후, StringBuffer 의 참조를 반환
```java
StringBuffer sb2 = sb.append("ZZ");
System.out.println(sb);  // abc123ZZ
System.out.println(sb2); // abc123ZZ
// 아래와 같이 써도된다
StringBuffer sb = new StringBuffer("abc");
sb.append("123").append("ZZ");
```
## StringBuffer의 비교
- StringBuffer 는 equals() 가 오버라이딩 되어 있지 않음 (주소 비교)
- StringBuffer 을 String 으로 변환 후에 equals() 로 비교
```java
StringBuffer sb = new StringBuffer("abc");
StringBuffer sb2 = new StringBuffer("abc");
System.out.println(sb.equals(sb2)); // false
String s = sb.toString();
String s2 = sb2.toString();
System.out.println(s.equals(s2)); // true
```
## 19~20. StringBuffer 클래스의 메서드
---
## StringBuffer 클래스의 메서드
```java
public class Ex9_12 {
	public static void main(String[] args) {
		StringBuffer sb = new StringBuffer("01");
		StringBuffer sb2 = sb.append(23);
		sb.append('4').append(56);
		StringBuffer sb3 = sb.append(78);
		sb3.append(9.0);
		System.out.println("sb =" + sb);
		System.out.println("sb2=" + sb2);
		System.out.println("sb3=" + sb3);
		System.out.println("sb =" + sb.deleteCharAt(10));
		System.out.println("sb =" + sb.delete(3, 6));
		System.out.println("sb =" + sb.insert(3, "abc"));
		System.out.println("sb =" + sb.replace(6, sb.length(), "END"));
		System.out.println("capacity=" + sb.capacity());
		System.out.println("length=" + sb.length());
	}
}
```
## 21~24. StringBuilder, Math 클래스
---
## StringBuilder
- StringBuffer는 동기화 되어 있음. 멀티 쓰레드에 안전 (thread-safe)
- 멀시 쓰레드 프로그램이 아닌 경우, 동기화는 불필요한 성능 저하
    - 이럴 땐 StringBuffer 대신 StringBuilder 를 사용
## Math 클래스
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
## 25~27. 래퍼클래스, Number 클래스
---
## 래퍼(wrapper) 클래스
- 8개의 기본형을 객체로 다뤄야할 때 사용하는 클래스
    - boolean → Boolean
    - char → Character
    - int → Integer
## Number 클래스
- 모든 숫자 래퍼 클래스의 조상
## 28~31. 오토박싱 & 언박싱
---
## 문자열을 숫자로 변환하기
- 문자열을 숫자로 변환하는 다양한 방법
```java
int     i  = new Integer("100").intValue();
int     i2 = Integer.parseInt("100");       // 주로 이 방법을 많이 사용
Integer i3 = Integer.valueOf("100");
```
- n진법의 문자열을 숫자로 변환하는 방법
```java
int i4 = Integer.parseInt("100",2);  // 100(2)  -> 4
int i5 = Integer.parseInt("100",8);  // 100(8)  -> 64
int i6 = Integer.parseInt("100",16); // 100(16) -> 256
int i7 = Integer.parseInt("FF",16);  // FF(16)  -> 255
```
## 오토박싱 & 언박싱
### 개념
- 기본형과 참조형 간의 자동 형변환
    - 오토박싱 : int → Integer (기본형을 래퍼클래스로)
    - 언박싱 : Integer → int (래퍼클래스를 기본형으로)
```java
ArrayList<Integer> list = new ArrayList<Integer>();
list.add(10);            // 오토박싱. 10 -> new Integer(10)
int value = list.get(0); // 언박싱. new Integer(10) -> 10
```
```java
public class Ex9_16 {
	public static void main(String[] args) {
		int i = 10;
		
		// 기본형을 참조형으로 형변환(형변환 생략가능)
		Integer intg = (Integer)i; // Integer intg = Integer.valueOf(i);
		Object obj = (Object)i;    // Object obj = (Object)Integer.valueOf(i);
		
		Long lng = 100L; // Long lng = new Long(100L);
		
		int i2 = intg + 10;  // 참조형과 기본형간의 연산 가능
		long l = intg + lng; // 참조형 간의 덧셈도 가능
		
		Integer intg2 = new Integer(20);
		int i3 = (int)intg2; // 참조형을 기본형으로 형변환도 가능(형변환 생략가능)
	}
}
```
