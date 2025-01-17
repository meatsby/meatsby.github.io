# 15~16. import문, static import문

## import문

---

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

---

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

---

- static멤버를 사용할 때 클래스 이름을 생략할 수 있게 해준다.

```java
import static java.lang.Integer.*;   // Integer클래스의 모든 static메서드
import static java.lang.Math.random; // Math.random()만
import static java.lang.System.out;  // System.out을 out만으로 참조가능
```