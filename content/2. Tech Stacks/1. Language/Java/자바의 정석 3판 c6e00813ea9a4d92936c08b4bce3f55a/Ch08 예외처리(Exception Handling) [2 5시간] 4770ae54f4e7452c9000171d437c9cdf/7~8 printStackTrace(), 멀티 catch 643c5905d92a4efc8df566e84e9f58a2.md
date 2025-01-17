# 7~8. printStackTrace(), 멀티 catch

## printStackTrace()와 getMessage()

---

- `printStackTrace()` - 예외발생 당시의 호출스택(Call Stack)에 있었던 메서드의 정보와 예외 메시지를 화면에 출력
- `getMessage()` - 발생한 예외클래스의 인스턴스에 저장된 메시지를 반환

```java
try {
	...
	System.out.println(0/0); // ArithmeticException 예외 객체 생성
	...
} catch (ArithmeticException ae) {
	ae.printStackTrace();
	System.out.println(ae.getMessage());
} catch (Exception e) {
	...
}
```

## 멀티 catch 블럭

---

- 내용이 같은 catch 블럭을 하나로 합친 것 (JDK 1.7부터)

```java
try {
	...
} catch (ExceptionA | ExceptionB e) {
	e.printStackTrace();
	e.methodA(); // 에러. ExceptionA와 ExceptionB의 공통멤버만 사용 가능
} catch (ParentException | ChildException pe) { // 에러. 부모만 사용해도 됨
}
```