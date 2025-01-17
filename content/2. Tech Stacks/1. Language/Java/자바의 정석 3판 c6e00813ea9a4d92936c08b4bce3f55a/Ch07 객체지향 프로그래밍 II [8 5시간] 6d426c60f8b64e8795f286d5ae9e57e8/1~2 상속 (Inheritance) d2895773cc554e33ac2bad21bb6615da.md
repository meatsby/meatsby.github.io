# 1~2. 상속 (Inheritance)

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