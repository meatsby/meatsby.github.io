# 30~31. 오버로딩(overloading)

> 한 클래스 안에 같은 이름의 메서드 여러 개 정의하는 것
> 

### 오버로딩이 성립하기 위한 조건

1. 메서드 이름이 같아야 한다.
2. 매개변수의 개수 또는 타입이 달라야 한다.
3. 반환 타입은 영향없다.

```java
// 틀린 예시
// 반환 타입만 다르기 때문에 오버로딩이 아님 (중복 정의)
int add(int a, int b) {
	return a + b;
}

long add(int a, int b) {
	return (long)(a + b);
}

// 올바른 예시
// 매개변수의 타입이 다르기 때문에 오버로딩
long add(int a, long b) {
	return a + b;
}

long add(long a, int b) {
	return a + b;
}
```

### 오버로딩의 올바른 예 - 매개변수는 다르지만 같은 의미의 기능수행

```java
class MyMath3 {
	int add(int a, int b) {
		System.out.println("int add(int a, int b) - ");
		return a + b;
	}

	long add(long a, long b) {
		System.out.println("long add(long a, long b) - ");
		return a + b;
	}

	int add(int[] a) {
		System.out.println("int add(int[] a) - ");
		int result = 0;
		for (int i = 0; i < a.length; i++) {
			result += a[i];
		}
		return result;
	}
}
```