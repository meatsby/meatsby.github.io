---
title: Java
date: 2022-01-05 20:20:45 +0900
status: Done
draft: false
tags:
  - Java
---
## 1~2. 상속 (Inheritance)
---
### 개념
- 기존의 클래스로 새로운 클래스를 작성하는 것. (코드의 재사용)
- 두 클래스를 부모와 자식으로 관계를 맺어주는 것.
    ```java
    class 자식클래스 extends 부모클래스 {
    	// ...
    }
    class Parent { }
    class Child extends Parent {
    	// ...
    }
    ```
### 특징
- 자손은 조상의 모든 멤버를 상속받는다. (생성자, 초기화블럭 제외)
- 자손의 멤버 개수는 조상보다 적을 수 없다. (같거나 많다.)
    ```java
    class Parent {
    	int age;
    }
    class Child extends Parent { }
    ```
- 자손의 변경은 조상에 영향을 미치지 않는다.
    ```java
    class Parent {
    	int age;
    }
    class Child extends Parent {
    	void play() {
    		System.out.println("놀자~");
    	}
    }
    ```
## 3~4. 클래스 간의 관계, 상속과 포함
---
## 포함 관계
### 포함(composite)이란?
- 클래스의 멤버로 참조변수를 선언하는 것
- 작은 단위의 클래스를 만들고, 이 들을 조합해서 클래스를 만든다.
```java
class Circle {
	int x;
	int y;
	int r;
}
```
```java
class Point {
	int x;
	int y;
}
class Circle {
	Point c = new Point();
	int r;
}
```
```java
class Car {
	Engine e = new Engine();
	Door[] d = new Door[4];
}
```
## 클래스 간의 관계 결정하기
- `상속관계` ‘~은 ~이다.’
    - 원은 점이다.
- `포함관계` ‘~은 ~을 가지고 있다.’
    - 원은 점을 가지고 있다. (더 자연스럽기 때문에 포함관계가 적합)
## 5~6. 단일 상속, Object 클래스
---
## 단일 상속 (Single Inheritance)
- Java는 단일상속만을 허용한다. (C++은 다중상속 허용)
    ```java
    class TvDVD extends Tv, DVD { // 에러. 조상은 하나만 허용된다.
    	// ...
    	// Tv.power() 와 DVD.power() 가 존재했을 때 충돌 우려
    }
    ```
- 비중이 높은 클래스 하나만 상속관계로, 나머지는 포함관계로 한다.
    ```java
    class TvDVD extends Tv {
    	DVD dvd = new DVD();
    	void play() {
    		dvd.play();
    	}
    	void stop() {
    		dvd.stop();
    	}
    	void rew() {
    		dvd.rew();
    	}
    	void ff() {
    		dvd.ff();
    	}
    }
    ```
## Object 클래스 - 모든 클래스의 조상
- 부모가 없는 클래스는 자동적으로 Object 클래스를 상속받게 된다.
- 모든 클래스는 Object 클래스에 정의된 11개의 메서드를 상속받는다.
    - `toString()` `equals(Object obj)` `hashcode()` `...`
```java
class Tv {
	// ...
}
class SmartTv extends Tv {
	// ...
}
```
```java
// 컴파일러 자동 추가
class Tv extends Object {
	// ...
}
class SmartTv extends Tv {
	// ...
}
```
## 7~9. 오버라이딩
---
## 오버라이딩 (overriding)
- 상속받은 조상의 메서드를 자신에 맞게 변경하는 것
    ```java
    class Point {
    	int x;
    	int y;
    	String getLocation() {
    		return "x :" + x + ", y:" + y;
    	}
    }
    class Point3D extends Point {
    	int z;
    	// 오버라이딩
    	String getLocation() {
    		return "x :" + x + ", y:" + y + ", z:" + z;
    	}
    }
    ```
## 오버라이딩의 조건
1. 선언부(반환타입, 메서드 이름, 매개변수 목록)가 조상 클래스의 메서드와 일치해야 한다.
2. 접근 제어자를 조상 클래스의 메서드보다 좁은 범위로 변경할 수 없다.
3. 예외는 조상 클래스의 메서드보다 많이 선언할 수 없다.
    1. 왜? 조상이 모든 자손의 예외를 감당하기 때문에
## 오버로딩 vs 오버라이딩
- `오버로딩(overloading)` 기존에 없는 이름이 같은 새로운 메서드를 정의하는 것(new)
- `오버라이딩(overriding)` 상속받은 메서드의 내용을 변경하는 것(change, modify)
```java
class Parent {
	void parentMethod() {}
}
class Child extends Parent {
	void parentMethod() {}      // 오버라이딩
	void parentMethod(int i) {} // 오버로딩
	
	void childMethod() {}       // 메서드 정의
	void childMethod(int i) {}  // 오버로딩
	void childMethod() {}       // 에러. 중복정의
}
```
## 10~11. 참조변수 super, 생성자 super()
---
## 참조변수 super
- 객체 자신을 가리키는 참조변수. 인스턴스 메서드(생성자)내에만 존재
- 조상의 멤버를 자신의 멤버와 구별할 때 사용
- 바로 상위 조상을 의미
    - Parent → Child → GrandChild 일 때
    - GrandChild 의 super 는 Child
```java
public class Ex7_2 {
	public static void main(String[] args) {
		Child c = new Child();
		c.method();
	}
}
class Parent {
	int x = 10; // super.x
}
class Child extends Parent {
	int x = 20; // this.x
	void method() {
		System.out.println("x=" + x);
		System.out.println("this.x=" + this.x);
		System.out.println("super.x=" + super.x);
	}
}
```
```java
public class Ex7_3 {
	public static void main(String[] args) {
		Child2 c = new Child2();
		c.method();
	}
}
class Parent2 {
	int x = 10; // super.x 면서 this.x
}
class Child2 extends Parent2 {
	void method() {
		System.out.println("x=" + x);
		System.out.println("this.x=" + this.x);
		System.out.println("super.x=" + super.x);
	}
}
```
## super() - 조상의 생성자
- 조상의 생성자를 호출할 때 사용
- 조상의 멤버는 조상의 생성자를 호출해서 초기화
```java
class Point {
	int x, y;
	Point(int x, int y) {
		this.x = x;
		this.y = y;
	}
}
class Point3D extends Point {
	int z;
	// 부적절한 초기화
	Point3D(int x, int y, int z) {
		this.x = x; // 조상의 멤버를 초기화
		this.y = y; // 조상의 멤버를 초기화
		this.z = z;
	}
	// 올바른 초기화
	Point3D(int x, int y, int z) {
		super(x, y); // 조상클래스의 생성자 Point(int x, int y)를 호출
		this.z = z;  // 자신의 멤버를 초기화
	}
}
```
- ⭐ 생성자의 첫 줄에 반드시 생성자를 호출해야 한다.
    - 그렇지 않으면 컴파일러가 생성자의 첫 줄에 `super();`를 삽입
## 12~14. 패키지, 클래스 패스
---
## 패키지 (package)
- 서로 관련된 클래스의 묵음
- 클래스는 클래스 파일(*.class), 패키지는 폴더, 하위 패키지는 하위 폴더
- 클래스의 실제 이름(full name)은 패키지를 포함. (java.lang.String)
## 패키지의 선언
- 패키지는 소스파일의 첫 번째 문장으로 단 한번 선언
- 같은 소스 파일의 클래스들은 모두 같은 패키지에 속하게 된다.
- 패키지 선언이 없으면 이름없는(unnamed) 패키지에 속하게 된다.
## 클래스 패스 (class path)
- 클래스 파일(*.class)의 위치를 알려주는 경로(path)
- 환경변수 classpath로 관리하며, 경로간의 구분자는 ‘;’를 사용
    - classpath(환경변수)에 패키지의 루트를 등록해줘야 함.
## 15~16. import문, static import문
---
## import문
- 클래스를 사용할 때 패키지 이름을 생략할 수 있다.
- 컴파일러에게 클래스가 속한 패키지를 알려준다.
```java
class ImportTest {
	java.util.Date today = new java.util.Date();
}
import java.util.Date;
class ImportTest {
	Date today = new Date();
}
```
- java.lang패키지의 클래스는 import하지 않고도 사용할 수 있다.
    - String, Object, System, Thread, ...
## import문의 선언
- import문을 선언하는 방법은 다음과 같다.
```java
import 패키지명.클래스명;
	또는
import 패키지명.*;
```
- import문은 패키지문과 클래스 선언의 사이에 선언한다.
- import문은 컴파일 시에 처리되므로 프로그램의 성능에 영향없음.
- 아래의 두 코드는 서로 의미가 다르다.
```java
import java.util.*;
import java.text.*;
// java패키지의 모든 클래스 (패키지 제외)
import java.*;
```
- 이름이 같은 클래스가 속한 두 패키지를 import할 때는 클래스 앞에 패키지명을 붙여줘야 한다.
```java
import java.sql.*;  // java.sql.Date
import java.util.*; // java.util.Date
public class ImportTest {
	public static void main(String[] args) {
		java.util.Date today = new java.util.Date();
	}
}
```
## static import문
- static멤버를 사용할 때 클래스 이름을 생략할 수 있게 해준다.
```java
import static java.lang.Integer.*;   // Integer클래스의 모든 static메서드
import static java.lang.Math.random; // Math.random()만
import static java.lang.System.out;  // System.out을 out만으로 참조가능
```
## 17~20. 제어자, static, final, abstract
---
## 제어자(modifier)
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
| 대상 | 의미 |
| --- | --- |
| 멤버변수 | 모든 인스턴스에 공통적으로 사용되는 클래스 변수가 된다.
클래스 변수는 인스턴스를 생성하지 않고도 사용 가능하다.
클래스가 메모리에 로드될 때 생성된다. |
| 메서드 | 인스턴스를 생성하지 않고도 호출이 가능한 static 메서드가 된다.
static 메서드 내에서는 인스턴스 멤버들을 직접 사용할 수 없다. |
## final - 마지막의, 변경될 수 없는
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
## 21. 접근 제어자
---
## 접근 제어자 (access modifier)
- `private` - 같은 클래스 내에서만 접근 가능
- `(default)` - 같은 패키지 내에서만 접근 가능
- `protected` - 같은 패지키 내에서, 그리고 다른 패키지의 자손클래스에서 접근 가능
- `public` - 접근 제한이 없음
| 제어자 | 같은 클래스 | 같은 패키지 | 자손 클래스 | 전체 |
| --- | --- | --- | --- | --- |
| `public` | ⭕ | ⭕ | ⭕ | ⭕ |
| `protected` | ⭕ | ⭕ | ⭕ |  |
| `(default)` | ⭕ | ⭕ |  |  |
| `private` | ⭕ |  |  |  |
## 22. 캡슐화
---
## 캡슐화와 접근 제어자
접근 제어자를 사용하는 이유
- 외부로부터 데이터를 보호하기 위해서
- 외부에는 불필요한, 내부적으로만 사용되는, 부분을 감추기 위해서
```java
public class Time {
	// 외부에서 직접 접근하지 못하도록 private
	private int hour;
	private int minute;
	private int second;
	// 메서드를 통해 간접 접근 허용
	public int getHour() {
		return hour;
	}
	public void setHour(int hour) {
		if (hour < 0 || hour > 23) {
			return;
		}
		this.hour = hour;
	}
}
```
## 23. 다형성
---
## 다형성 (polymorphism)
### 개념
- 조상 타입 참조 변수로 자손 타입 객체를 다루는 것
```java
Tv t = new SmartTv(); // 타입 불일치
class Tv {
	boolean power;
	int channel;
	void power() {
		power = !power;
	}
	void channelUp() {
		++channel;
	}
	void channelDown() {
		--channel;
	}
}
class SmartTv extends Tv {
	boolean caption;
	void displayCaption(String text) {
		if (caption) {
			System.out.println(text);
		}
	}
}
```
### 특징
- 객체와 참조변수의 타입이 일치할 때와 일치하지 않을 때의 차이?
```java
SmartTv s = new SmartTv(); // 참조변수와 인스턴스의 타입이 일치
Tv      t = new SmartTv(); // 조상타입 참조변수로 자손타입 인스턴스 참조
// 조상타입 Tv참조변수로 자손타입 SmartTv인스턴스를 참조할 경우 조상의 멤버만 사용할 수 있음
```
- 자손 타입의 참조변수로 조상 타입의 객체를 가리킬 수 없다.
```java
Tv      t = new SmartTv(); // OK.
SmartTv s = new Tv();      // 에러.
```
### 장점
- 다형적 매개변수 - 메서드 호출 시, 자신과 같은 타입 또는 자손 타입의 인스턴스를 넘길 수 있음
- 하나의 배열에 여러 종류의 객체를 저장하여 다룰 수 있음
## 24~25. 참조변수의 형변환
---
## 참조변수의 형변환
- 참조변수의 형변환 시 변하는 것
    - 달라지는 것 : 객체의 타입
    - 그대로인 것 : 객체 자체, 주소값
- 참조변수의 형변환을 하는 이유
    - 사용할 수 있는 멤버의 갯수를 조절하기 위해서
- 조상 자손 관계의 참조변수는 서로 형변환 가능
```java
class Car { }
class FireEngine extends Car { }
class Ambulance extends Car { }
FireEngine f = new FireEngine();
Car c = (Car)f;                // OK. 조상인 Car타입으로 형변환 (업캐스팅)
FireEngine f2 = FireEngine(c); // OK. 자손인 FireEngine타입으로 형변환 (다운캐스팅)
Ambulance a = (Ambulance)f;    // 에러. 상속관계가 아닌 클래스 간의 형변환 불가
```
- 형변환 시 실제 인스턴스가 무엇인지가 중요
```java
public class Ex7_7 {
	public static void main(String[] args) {
		Car car = null;
		FireEngine fe = new FireEngine();
		FireEngine fe2 = (FireEngine)car; // 다운캐스팅
		Car car2 = (Car)fe2;              // 업캐스팅
		car2.drive();                     // NullPointerException 발생.
                                      // 왜? 기존 인스턴스인 car이 null이기 때문에
		Car c = new Car();
		FireEngine f = (FireEngine)c; // 형변환 실행 에러 ClassCastException 발생.
		f.water();                    // 컴파일은 OK.
                                  // 실제 객체는 Car인스턴스이기 때문에 f.water() 사용불가
	}
}
```
## 26. instanceof 연산자
---
## instanceof 연산자
- 참조변수의 형변환 가능 여부 확인에 사용. 가능하면 `true` 반환
- 형변환 전에 반드시 `instanceof` 로 확인해야 함
```java
void doWork(Car c) {
	if (c instanceof FireEngine) {   // 1. 형변환이 가능한지 확인
		FireEngine fe = (FireEngine)c; // 2. 형변환
		fe.water();
	}
}
FireEngine fe = new FireEngine();
System.out.println(fe instanceof Object);     // true
System.out.println(fe instanceof Car);        // true
System.out.println(fe instanceof FireEngine); // true
Object obj = (Object)fe; // OK.
Car    c   = (Car)fe;    // OK.
```
## 27~28. 매개변수의 다형성
---
## 매개변수의 다형성
- 참조형 매개변수는 메서드 호출 시, 자신과 같은 타입 또는 자손 타입의 인스턴스를 넘길 수 있음
```java
class Product {
	int price;
	int bonusPoint;
}
class Tv extends Product { }
class Computer extends Product { }
class Audio extends Product { }
class Buyer {
	int money = 1000;
	int bonusPoint = 0;
}
// Product의 자손 타입인 Tv, Computer, Audio 모두 매개변수로 받을 수 있음
void buy(Product p) {
	money -= p.price;
	bonusPoint += p.bonusPoint;
}
Buyer b = new Buyer();
Tv tv = new Tv();
Computer com = new Computer();
b.buy(tv);
b.buy(com);
```
## 27~28. 여러 종류의 객체를 배열로 다루기
---
## 여러 종류의 객체를 배열로 다루기
- 조상타입의 배열에 자손들의 객체를 담을 수 있음
```java
Product p[] = new Product[3];
p[0] = new Tv();
p[1] = new Computer();
p[2] = new Audio();
```
```java
class Buyer {
	int money = 1000;
	int bonusPoint = 0;
	Product[] cart = new Product[10];
	int i = 0;
	void buy(Product p) {
		if(money < p.price) {
			System.out.println("잔액부족");
			return;
		}
		money -= p.price;
		bonusPoint += p.bonusPoint;
		cart[i++] = p;
	}
}
```
## 31~32. 추상 클래스, 추상 메서드
---
## 추상 클래스 (abstract class)
### 개념
- 미완성 설계도. 미완성 메서드를 갖고 있는 클래스
```java
abstract class Player {        // 추상 클래스 (미완성 클래스)
	abstract void play(int pos); // 추상 메서드 (몸통{}이 없는 미완성 메서드)
	abstract void stop();        // 추상 메서드
}
```
- 다른 클래스 작성에 도움을 주기 위한 것. 인스턴스 생성 불가.
```java
Player p = new Player(); // 에러. 추상 클래스의 인스턴스 생성 불가
```
- 상속을 통해 추상 메서드를 완성해야 인스턴스 생성 가능
```java
class AudioPlayer extends Player {
	void play(int pos) {
		// 추상 메서드를 구현
	}
	void stop() {
		// 추상 메서드를 구현
	}
}
AudioPlayer ap = new AudioPlayer(); // OK.
```
## 추상 메서드 (abstract method)
### 개념
- 미완성 메서드. 구현부 (몸통 { }) 가 없는 메서드
```java
// 주석을 통해 어떤 기능을 수행할 목적으로 작성하였는지 설명
abstract 리턴타입 메서드이름();
```
- 꼭 필요하지만 자손마다 다르게  구현될 것으로 예상되는 경우
```java
abstract class Player {        // 추상 클래스
	abstract void play(int pos); // 추상 메서드
	abstract void stop();        // 추상 메서드
}
class AudioPlayer extends Player {
	void play(int pos) {
		// 추상 메서드를 구현
	}
	void stop() {
		// 추상 메서드를 구현
	}
}
// 추상 메서드를 1개 밖에 구현하지 않았기 때문에 abstract
abstract class AbstractPlayer extends Player {
	void play(int pos) {
		// 추상 메서드를 구현
	}
}
```
- 추상 메서드 호출 가능 (호출 할 때는 선언부만 필요)
```java
abstract class Player {        // 추상 클래스
	boolean pause;
	int currentPos;
	Player() {                   // 추상 클래스도 생성자가 있어야 함
		pause = false;
		currentPos = 0;
	}
	// 지정된 위치(pos)에서 재생하는 기능을 작성해야 함
	abstract void play(int pos); // 추상 메서드
	// 재생을 즉시 멈추는 기능을 작성해야 함
	abstract void stop();        // 추상 메서드
	void play() {
		play(currentPos);          // 추상 메서드 사용 가능
                               // 왜? 어짜피 추상 클래스는 객체 생성이 불가능
                               // 인스턴스 메서드를 호출 할 수 있다는 것은
                               // 자손이 완성된 클래스를 만들었다는 의미기 때문에
	}
}
```
- 추상 메서드를 선언함으로써 자손들에게 있어서 각자 필수 기능을 작성하게 끔 강제성을 부여
## 33~34. 추상 클래스의 작성
---
## 추상 클래스의 작성
- 여러 클래스에 공통적으로 사용될 수 있는 추상 클래스를 바로 작성하거나 기존 클래스의 공통 부분을 뽑아서 추상 클래스를 만든다.
```java
abstract class Unit {
	int x, y;
	abstract void move(int x, int y);
	void stop()             { }
}
class Marine extends Unit {
	void move(int x, int y) { }
	void stimPack()         { }
}
class Tank extends Unit {
	void move(int x, int y) { }
	void changeMode()       { }
}
class Dropship extends Unit {
	void move(int x, int y) { }
	void load()             { }
	void unload()           { }
}
Unit[] group = new Unit[3];
group[0] = new Marine();
group[1] = new Tank();
group[2] = new Dropship();
for (int i = 0; i < group.length; i++) {
	group[i].move(100, 200);
}
```
- 추상화 ↔ 구체화
- 추상화된 코드는 구체화된 코드보다 유연하다. 변경에 유리
```java
GregorianCalendar cal = new GregorianCalendar(); // 구체적
Calendar cal = Calendar.getInstance();           // 추상적
```
## 35~37. 인터페이스의 선언, 상속, 구현
---
## 인터페이스 (interface)
### 개념
- 추상 메서드의 집합 (프로그래밍 관점)
- 구현된 것이 전혀 없는 설계도. 껍데기 (모든 멤버가 public)
```java
interface PlayingCard {
	public static final int SPADE = 4;
	final int DIAMOND = 3; // public static final 생략 가능
	static int HEART = 2;  // public static final 생략 가능
	int CLOVER = 1;        // public static final 생략 가능
	public abstract String getCardNumber();
	String getCardKind();  // public abstract 생략 가능
}
```
## 인터페이스의 상속
- 인터페이스의 조상은 인터페이스만 가능 (Object가 최고 조상이 아님)
- 다중 상속 가능 (추상 메서드는 충돌해도 문제 없음. 왜? 구현부가 없으니까)
```java
interface Fightable extends Movalbe, Attackable { }
interface Movable {
	void move(int x, int y);
}
interface Attackable {
	void attack(Unit u);
}
```
## 인터페이스의 구현
- 인터페이스에 정의된 추상 메서드를 완성하는 것
```java
class Fighter implements Fightable {
	// 인터페이스에 정의된 추상메서드를 모두 구현해야 함
	public void move(int x, int y) {
		// 내용 구현
	}
	public void attack(Unit u) {
		// 내용 구현
	}
}
```
- 일부만 구현하는 경우, 클래스 앞에 `abstract` 를 붙여야 함
```java
abstract class Fighter implements Fightable {
	public void move(int x, int y) {
		// 내용 구현
	}
```
## 추상 클래스와 인터페이스의 차이점
- 추상 클래스는 일반 클래스와 같지만 추상 메서드를 갖고 있음
- 인터페이스는 추상 메서드 (static 메서드, default 메서드, 상수) 만 갖고 있음
    - `iv`, 생성자, 인스턴스 메서드 등을 가질 수 없음
## 38. 인터페이스와 다형성
---
## 인터페이스를 이용한 다형성
- 인터페이스도 구현 클래스의 부모
```java
class Fighter extends Unit implements Fightable {
	public void move(int x, int y) {
		// 내용 구현
	}
	public void attack(Fightable f) {
		// 내용 구현
	}
}
```
```java
// 조상 클래스 -> 자손 객체
Unit      u = new Fighter();
// 인터페이스도 가능. 하지만, 인터페이스에 선언된 기능만 사용 가능
Fightable f = new Fighter();
f.move(100, 200);
f.attack(new Fighter());
```
- 인터페이스를 메서드의 리턴타입으로 지정할 수 있음
```java
// Fightable 인터페이스를 구현한 클래스의 인스턴스를 반환
Fightable method() {
	return new Fighter();
}
class Fighter extends Unit implements Fightable {
	public void move(int x, int y) {
		// 내용 구현
	}
	public void attack(Fightable f) {
		// 내용 구현
	}
}
```
## 39. 인터페이스의 장점
---
## 인터페이스의 장점
- 두 대상(객체) 간의 ‘연걸, 대화, 소통’을 돕는 ‘중간 역할’
- 선언(설계)와 구현을 분리 시킬 수 있음
```java
// 껍데기 + 알맹이
class B {
	public void method() {
		System.out.println("methodInB");
	}
}
```
```java
// 껍데기
interface I {
	public void method();
}
// 알맹이
class B implements I {
	public void method() {
		System.out.println("methodInB");
	}
}
```
- 인터페이스 덕분에 B가 변경되어도 A는 안 바꿀 수 있게 된다. (느슨한 결합)
    - A가 B에 의존적일 때
```java
class A {
	public void methodA(B b) {
		b.methodB();
	}
}
class B {
	public void methodB() {
		System.out.println("methodB()");
	}
}
class InterfaceTest {
	public static void main(String args[]) {
		A a = new A();
		a.methodA(new B());
	}
}
```
```java
// B와 관계 없어진 A
class A {
	public void methodA(I i) {
		i.methodB();
	}
}
interface I {
	void methodB();
}
class B implemetns I {
	public void methodB() {
		System.out.println("methodB()");
	}
}
// B를 C로 변경 시 A는 변경 없음
class C implemetns I {
	public void methodB() {
		System.out.println("methodB() in C");
	}
}
```
- 개발 시간을 단축
    - A가 B에 의존적일 때 B의 인터페이스를 미리 구현함으로써 B가 완성되기 전 A를 개발
- 변경에 유리한 유연한 설계가 가능
- 표준화가 가능 (A가 의존하는 B와 C의 공통 표준을 요구할 수 있음)
- 서로 관계없는 클래스들을 관계를 맺어줄 수 있음
```java
// GroundUnit 자손으로 Marine, SCV, Tank 가 있고
// SCV, Tank 만 repair() 메서드를 추가하고 싶을 때
// repairable 이라는 인터페이스를 구현함으로써 관계없는 클래스 간에 공통점 생성 가능
void repair(Repariable r) {
	if (r instanceof Unit) {
		Unit u = (Unit)r;
		while (u.hitPoint != u.MAX_HP) {
			u.hitPoint++;
		}
	}
}
```
## 40~41. default 메서드, static 메서드
---
## default 메서드와 static 메서드
- 인터페이스에 default 메서드, static 메서드 추가 가능. (JDK 1.8 부터)
- 인터페이스에 새로운 메서드(추상 메서드)를 추가하기 어려움.
    - 기존에 인터페이스를 구현했던 다수의 클래스가 인터페이스에 새로운 메서드가 생겼을 때 각자 해당 메서드를 구현해야 했음
    - 해결책 ⇒ 몸통이 있는 default method
- default 메서드 = 인스턴스 메서드(인터페이스 원칙 위반)
```java
interface MyInterface {
	void method();
	default void newMethod() { // 내용 구현 }
}
```
- default 메서드가 기존의 메서드와 충돌할 때의 해결책
    - 여러 인터페이스의 default 메서드 간의 충돌
        - 인터페이스를 구현한 클래스에서 default 메서드를 오버라이딩해야 함
    - default 메서드와 조상 클래스의 메서드 간의 충돌
        - 조상 클래스의 메서드가 상속되고, default 메서드는 무시
## 42~44. 내부 클래스의 종류, 특징, 선언
---
## 내부 클래스 (inner class)
- 클래스 안의 클래스
```java
class A {   // 외부 클래스
	class B { // 내부 클래스
		// 객체 생성 없이 A의 멤버 접근 가능
		...
	}
}
```
### 장점
- 내부 클래스에서 외부 클래스의 멤버들을 쉽게 접근할 수 있음
- 코드의 복잡성을 줄일 수 있음 (캡슐화)
### 특징
- 내부 클래스의 종류와 유효범위(scope)는 변수와 동일
```java
class Outer {
	class InstanceInner { }
	static class StaticInner { }
	void myMethod() {
		class LocalInner { }
	}
}
```
| 내부 클래스 | 특징 |
| --- | --- |
| 인스턴스 클래스 | 외부 클래스의 멤버변수 선언위치에 선언
외부 클래스의 인스턴스 멤버처럼 다루어짐
주로 외부 클래스의 인스턴스 멤버들과 관련된 작업에 사용 |
| static 클래스 | 외부 클래스의 멤버변수 선언위치에 선언
외부 클래스의 static 멤버처럼 다루어짐
주로 외부 클래스의 static 멤버, 특히 static 메서드에 사용될 목적으로 선언 |
| local 클래스 | 외부 클래스의 메서드나 초기화 블럭 안에 선언
선언된 영역 내부에서만 사용 가능 |
| 익명 클래스 | 클래스의 선언과 객체의 생성을 동시에 하는 이름없는 클래스 (일회용) |
## 45~50. 내부 클래스의 제어자와 접근성
---
## 내부 클래스의 제어자와 접근성
- 내부 클래스의 제어자는 변수에 사용 가능한 제어자와 동일
    - 일반 클래스는 default 랑 public 만 가능
    - 내부 클래스는 protected 랑 private 도 가능
```java
class Outer {
	private class InstanceInner { }
	protected static class StaticInner { }
	void myMethod() {
		class LocalInner { }
	}
}
```
## 내부 클래스의 제어자와 접근성 - 예제
```java
class Ex7_12 {
	class InstanceInner {
		int iv = 100;
		// static int cv = 100;       // 에러. static 변수를 선언할 수 없음
		final static int CONST = 100; // 상수는 허용
	}
	static class StaticInner {
		int iv = 200;
		static int cv = 200; // static 클래스만 static 멤버 정의 가능
	}
	void myMethod() {
		class LocalInner {
			int iv = 300;
			// static int cv = 300;       // 에러. static 변수를 선언할 수 없음
			final static int CONST = 300; // 상수는 허용
		}
	}
	public static void main(String[] args) {
		System.out.println(InstanceInner.CONST);
		System.out.println(StaticInner.cv);
		// System.out.println(LocalInner.CONST); // 에러. 메서드 내에서만 가능
	}
}
```
## 51~52. 익명 클래스
---
## 익명 클래스 (anonymous class)
- 이름이 없는 일회용 클래스. 정의와 생성을 동시에
```java
new 조상클래스이름() {
	// 멤버 선언
}
new 구현인터페이스이름() {
	// 멤버 선언
}
```
## 익명 클래스 - 예제
```java
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
public class Ex7_18 {
	public static void main(String[] args) {
		Button b = new Button();
		// 클래스 정의와 객체 생성 따로
		b.addActionListener(new EventHandler());
		// 클래스 정의와 객체 생성 동시에
		b.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("ActionEvent occurred!!");
			}
		});
	}
}
class EventHandler implements ActionListener {
	public void actionPerformed(ActionEvent e) {
		System.out.println("ActionEvent occurred!!");
	}
}
```
