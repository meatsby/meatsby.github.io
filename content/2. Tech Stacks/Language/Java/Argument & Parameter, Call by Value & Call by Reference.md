---
title: "Argument & Parameter, Call by Value & Call by Reference"
date: 2021-11-02 10:00:02 +0900
status: In Progress
draft: false
tags:
  - Java
---
## Argument, Parameter
---
```java
public class ArgumentParameter {

	public static void main(String[] args) {
		int argument = 10;		
		operation(argument); 	// 전달인자(Argument)
	}
	
	private static int operation(int parameter){ // 매개변수(Parameter)
		parameter += 10;
		return parameter;
	}

}
```

## Call by value
---
- 함수에 전달되는 데이터 타입이 Primitive 일 경우
- 함수가 호출될 때, 함수를 위한 임의의 메모리 공간이 생성됨
- Call by value 방식으로 호출 시 전달되는 **변수의 값을 복사**하여 함수의 인자로 전달함
- 복사된 인자는 함수 안에서 지역적으로 사용되는 local value의 특성을 가짐
- 즉, 함수 안에서 인자의 값(Parameter)이 변경되어도, 외부 변수의 값(Argument)은 변경 X

## Call by reference
---
- 함수에 전달되는 데이터 타입이 Reference 일 경우
- Call by reference 방식으로 호출 시 전달되는 변수의 번지수를 전달함
- Argument 와 parameter 모두 같은 객체를 참조하게 됨
- 즉, 함수 안에서 인자의 값이 변경되면, 외부 변수의 값도 변경됨

## References
---
- [https://wayhome25.github.io/cs/2017/04/11/cs-13/](https://wayhome25.github.io/cs/2017/04/11/cs-13/)
- [https://devlog-wjdrbs96.tistory.com/44](https://devlog-wjdrbs96.tistory.com/44)
- [https://kurukurucoding.tistory.com/29](https://kurukurucoding.tistory.com/29)
