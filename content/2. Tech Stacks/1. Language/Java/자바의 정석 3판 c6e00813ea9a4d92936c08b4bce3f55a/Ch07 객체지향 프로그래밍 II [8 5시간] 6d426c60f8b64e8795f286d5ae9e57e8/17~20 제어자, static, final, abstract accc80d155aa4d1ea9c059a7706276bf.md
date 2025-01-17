# 17~20. 제어자, static, final, abstract

## 제어자(modifier)

---

- 클래스와 클래스의 멤버(멤버 변수, 메서드)에 부가적인 의미 부여
    - 접근 제어자 - `public` `protected` `(default)` `private`
    - 그 외 - `static` `final` `abstract` `native` `transient` `synchronized` `volatile` `strictfp`
- 하나의 대상에 여러 제어자를 같이 사용가능(접근 제어자는 하나만)
    
    ```java
    public class ModifierTest {
    	public static final int WIDTH = 200;
    
    	public static void main(String[] args) {
    		System.out.println("WIDTH=" + WIDTH);
    	}
    }
    ```
    

## static - 클래스의, 공통적인

---

| 대상 | 의미 |
| --- | --- |
| 멤버변수 | 모든 인스턴스에 공통적으로 사용되는 클래스 변수가 된다.
클래스 변수는 인스턴스를 생성하지 않고도 사용 가능하다.
클래스가 메모리에 로드될 때 생성된다. |
| 메서드 | 인스턴스를 생성하지 않고도 호출이 가능한 static 메서드가 된다.
static 메서드 내에서는 인스턴스 멤버들을 직접 사용할 수 없다. |

## final - 마지막의, 변경될 수 없는

---

| 대상 | 의미 |
| --- | --- |
| 클래스 | 변경될 수 없는 클래스, 확장될 수 없는 클래스가 된다.
그래서 final로 지정된 클래스는 다른 클래스의 조상이 될 수 없다. |
| 메서드 | 변경될 수 없는 메서드, final로 지정된 메서드는 오버라이딩을 통해 재정의 될 수 없다. |
| 멤버변수
지역변수 | 변수 앞에 final 이 붙으면, 값을 변경할 수 없는 상수가 된다. |

```java
final class AbstractTest {   // 조상이 될 수 없는 클래스
	final int MAX_SIZE = 10;   // 값을 변경할 수 없는 멤버변수 (상수)

	final void getMaxSize() {  // 오버라이딩을 할 수 없는 메서드 (변경불가)
		final int LV = MAX_SIZE; // 값을 변경할 수 없는 지역변수 (상수)
		return MAX_SIZE;
	}
}
```

## abstract - 추상의, 미완성의

---

| 대상 | 의미 |
| --- | --- |
| 클래스 | 클래스 내에 추상 메서드가 선언되어 있음을 의미한다. |
| 메서드 | 선언부만 작성하고 구현부는 작성하지 않은 추상 메서드임을 알린다. |

```java
abstract class AbstractTest { // 추상 클래스 (추상 메서드를 포함한 클래스)
	abstract void move();       // 추상 메서드 (구현부가 없는 메서드)
}

AbstractTest a = new AbstractTest(); // 에러. 추상 클래스의 인스턴스 생성불가
```