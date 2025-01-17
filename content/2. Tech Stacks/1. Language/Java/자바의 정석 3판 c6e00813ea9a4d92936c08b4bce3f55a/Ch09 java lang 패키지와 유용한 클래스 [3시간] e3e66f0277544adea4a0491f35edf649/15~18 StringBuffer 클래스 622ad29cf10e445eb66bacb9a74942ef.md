# 15~18. StringBuffer 클래스

## StringBuffer 클래스

---

- String 처럼 문자형 배열(char[])을 내부적으로 가지고 있음
- 그러나 String 과 달리 내용을 변경할 수 있음 (mutable)

## StringBuffer의 생성자

---

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

---

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

---

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