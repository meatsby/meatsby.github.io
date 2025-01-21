---
title: Broken pipe 오류 원인, 해결 방법
date: 2022-04-06 23:20:00 +0900
status: Done
draft: false
tags:
  - Java
---
## java.net.SocketException: Broken pipe
---
### 원인

잦은 입출력 호출로 발생한다.

처리중인 요청 또는 응답을 사용자가 기다리지 않고 새로고침 또는 종료를 자주 실행하게 되면 소켓이 끊어져 발생한다.

웹 브라우저에서 서버에 연결하면 accept 된 소켓을 HttpThread 에 전달, ThreadPool 에서 조건에 맞으면 해당 HttpThread 를 가동하게 되어있다.

HttpThread 가 완료되기 전에 재요청을 할 경우 문제가 생긴다. 처음 요청 때 생성된 소켓의 자원을 `httpThread.run()` 에서 사용하려고 하는 중에 두 번째 요청이 들어와 첫 번째 요청의 소켓이 끊어져버리기 때문이다.

## java.io.IOException: Broken pipe
---
### 원인

Receiver 에서 송신 받은 데이터를 제때 처리하지 못하는 상황(네트워크가 느리거나 CPU 가 max 인 경우)에서 Sender 가 계속 보내는 경우 발생한다.

2개의 소켓상의 통신에서 소켓을 담당하던 프로세서가 갑작스런 이상으로 종료된 상황에서 상대 소켓은 이를 알지 못하고 데이터를 전송할 때 문제가 발생한다.

클라이언트 요청 후 서버에서 작업을 완료하여 클라이언트로 결과를 넘겨주기 전에:

- 네트워크가 끊김
- 클라이언트가 정지 버튼을 누름
- 브라우저를 종료
- 다른화면으로 이동

위와 같은 최초 요청에 대한 정보가 사라질 경우 서버 측에서 작업 결과를 전달할 곳이 없어 발생한다.

## 해결 방법
---
1. Request 이후 Response 기다리기
    
    클라이언트는 계속해서 데이터를 보내지 않고 하나의 레코드를 보낸 뒤 서버에서 정상적으로 수신 되었다는 응답을 받도록 한다. (속도가 좀 느려진다.)
    
2. Exception 무시하기
    
    클라이언트가 비정상적인 종료를 했을 때 Broken pipe Signal 이 발생하고 클라이언트의 종료를 서버에서 제어가 불가능하기 때문에 Signal 을 무시한다.
    
3. 중복 요청 막기
    
    클라이언트에서 연속적인 클릭을 방지하거나 Exception 처리 부분에서 오류를 던지지 않도록 한다.
    

## 미션 도중 만난 Broken pipe
---
### 재시작 시 404 Not Found
- 원인
    - `Caused by: java.io.IOException: Broken pipe`
    - JS 코드 내부에서 두 번의 요청이 겹치는 문제
```java
document.getElementById("terminate").addEventListener('click', (e) => {
	if (e.target.id) {
		if (confirm("재시작 하시겠습니까?")) {
			fetch("/terminate", {
			}).then(() => {
				location.href = "/"; // redirect 요청
			});
		}
		location.href = "/"; // 또 다른 redirect 요청
	}
});
```
- 해결
    - JS 코드 내부에서 `if-else` 문으로 redirect 조정
```java
document.getElementById("terminate").addEventListener('click', (e) => {
	if (e.target.id) {
		if (confirm("재시작 하시겠습니까?")) {
			fetch("/terminate", {
			}).then(() => {
				location.href = "/";
			});
		} else {
			location.href = "/";
		}
	}
});
```

## References
---
- [https://born-dev.tistory.com/28](https://born-dev.tistory.com/28)
- [https://lookingfor.tistory.com/entry/자바-ExceptionBroken-pipe-오류-해결-방법](https://lookingfor.tistory.com/entry/%EC%9E%90%EB%B0%94-ExceptionBroken-pipe-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)
