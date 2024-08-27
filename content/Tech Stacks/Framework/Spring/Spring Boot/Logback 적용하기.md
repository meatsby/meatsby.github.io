---
title: "Logback 적용하기"
date: 2022-07-28 20:10:00 +0900
status: In Progress
draft: false
tags:
  - Spring Boot
---

## 로깅

---

### 로깅이란?

프로그램 동작 시 발생하는 모든 일을 기록하는 행위를 말한다.

여기서 이야기하는 `모든 일`은 서비스의 동작 상태나 장애 등을 생각할 수 있다.

서비스의 동작 상태라 한다면, 시스템 로딩, HTTP 통신, 트랜잭션, DB 요청, 의도한 예외 등이 있고, 장애라 한다면 의도하지 않은 예외 정도가 있다.

### 로깅과 System.out.println()

코딩을 하면서 `System.out.println()` 많이 찍어봤을 것이다. 이것도 일종의 기록이라고 생각해볼 수 있을 것 같은데 이 둘은 어떤 차이가 있을까?

로깅은 출력 형식을 지정할 수 있고, 로그 레벨에 따라 남기고 싶은 로그를 별도 지정할 수 있으며, 콘솔, 파일, 네트워크 등 로그를 별도의 위치에 남길 수 있다.

### 로깅과 디버깅

로깅을 통해 기록하는 다양한 이유가 있겠지만, 그 중에서도 문제점을 파악하는 역할도 분명 수행할 것이다.

개발과정중엔 디버깅이라는 과정이 존재하는데 왜 로깅이 필요할까?

사실 디버깅을 사용할 수 있다면 디버깅을 최대한 활용하는 것이 효과적이다. 사전에 문제를 차단할 수 있기 때문이다.

하지만 디버깅을 할 수 없는 상황에서는 기록을 통해 문제점을 파악하여 추후에 개선하는 방향을 도모해야하기 때문에 로깅이 최선의 선택이 되는 것이다.

## Logback

---

### Logback 이란?

Logback 이란 Log4J 를 기반으로 개발된 SLF4J 의 구현체, 로깅 라이브러리다.

Log4J 에 비해 약 10배 정도 빠른 퍼포먼스를 보여주며, 메모리 효율이 훨씬 좋아졌다.

이러한 특성 때문에 Spring 에서도 SLF4J 와 Logback 을 채택하고 있다.

### Logback 특징

Logback 은 로그에 특정 레벨을 설정할 수 있는데, 실운영과 테스트 상황에서 각각 다른 출력 레벨을 설정하여 로그를 확인할 수 있다.

특히 테스트에서 사용할 경우 자세한 내용을 파악해서 개발을 수정 보완해야 하기 때문에 `Debug` 레벨을 자주 사용한다.

또한, 출력 방식에 대해 설정할 수 있다. 콘솔, 파일, 메일, DB 등 저장하고자 하는 위치를 지정하여 로그 파일을 저장할 수 있다.

별도의 프로그램 없이 자체적으로 로그 압축을 지원하며, 로그 보관 기간을 설정할 수 있다.

뿐만 아니라, 설정 파일을 일정 시간마다 스캔하여 애플리케이션 중단 없이 설정 변경 가능하다는 장점도 존재한다.

### 로그 레벨

로깅에선 로그 레벨을 통해 남기고 싶은 로그의 단계를 지정할 수 있다.

이는 크게 6가지로 이루어져 있으며 실제로 프로덕션에서 많이 찾을 수 있는 레벨은 `Error` `Warn` `Info` 정도가 있다.

| 레벨 | 설명 |
| --- | --- |
| Fatal | 매우 심각한 에러. 프로그램이 종료되는 경우가 많음. |
| Error | 의도하지 않은 에러가 발생한 경우. 프로그램이 종료되진 않음. |
| Warn | 에러가 될 수 있는 잠재적 가능성이 있는 경우. |
| Info | 명확한 의도가 있는 에러. 요구사항에 따라 시스템 동작을 보여줄 때. |
| Debug | Info 레벨보다 더 자세한 정보가 필요한 경우. Dev 환경에서 사용. |
| Trace | Debug 레벨보다 더 자세함. Dev 환경에서 버그를 해결하기 위해 사용. |

## Logback 구조

---

### logback-core

다른 두 모듈을 위한 기반 역할을 하는 모듈이며, Appender 와 Layout 인터페이스가 이 모듈에 속한다.

![[Logback-core.png]]

위 사진은 Appender 의 구조를 도식화한 것이다.

### logback-classic

`logback-core` 에서 확장된 모듈려로 `logback-core` 와 SLF4J API 를 가지고 있다.

`Logger` 클래스가 이 모듈에 속한다.

### logback-access

Servlet Container 와 통합되어 HTTP 엑세스에 대한 로깅 기능을 제공한다.

웹 애플리케이션 레벨이 아닌 컨테이너 레벨에서 설치 되어야한다.

## Logback 설정

---

### Logback 설정 파일 형식

![[Logback Config.png]]

일반적으로 Classpath 에 있는 logback 설정 파일을 참조하게 된다.

- Java Legacy, Spring 같은 경우 `logback.xml` 참조
- Spring Boot 의 경우 `logback-spring.xml` 참조

### Logback 설정 요소

Logback 의 설정 요소는 크게 3가지로 분류된다.

- `Logger` 어떻게 기록할까?
    - 실제 로깅을 수행하는 구성요소이며, 출력 레벨 조정이 가능하다.
- `Appender` 어디에 기록할까?
    - 로그 메시지가 출력할 대상 결정한다.
- `Layout` 어떻게 출력할까?
    - Encoder(Layout) 로도 불리며, Appender 에 포함된다.
    - 사용자가 지정한 형식으로 표현될 로그 메시지를 변환하는 역할을 수행한다.

### Appender

Log 의 형태 및 출력 위치를 설정하기 위한 영역이다. Logback 은 총 5가지의 Appender 를 지원하는데 이는 아래와 같다.

- `ConsoleAppender` 콘솔에 로그 출력
- `FileAppender` 파일에 로그 저장
- `RollingFileAppender` 여러 개의 파일을 순회하며 로그 저장
- `SMTPAppender` 로그를 메일로 보냄
- `DBAppender` DB 에 로그 저장

### Encoder

Appender 내에 포함되는 항목이며, pattern 을 사용하여 원하는 형식으로 로그를 표현할 수 있다.

### Root

설정한 Appender 를 참조해서 로그 레벨을 설정할 수 있음

root 는 전역 설정, 지역 설정을 하기 위해선 logger 를 사용

### Pattern

```xml
<pattern>[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%-5level] [%thread] %logger %msg%n</patern>
```

- `%Logger{length}` Logger Name
- `%-5level` 로그 레벨, -5 는 출력의 고정폭 값
- `%msg` 로그 메시지 영역 (==%message)
- `{PID:-}` 프로세스 Id
- `%d` 로그 기록 시간
- `%p` 로깅 레벨
- `%F` 로깅이 발생한 프로그램 파일명
- `%M` 로깅이 발생한 메서드의 이름
- `%I` 로깅이 발생한 호출지의 정보
- `%L` 로깅이 발생한 호출지의 라인 수
- `%thread` 현재 Thread 명
- `%t` 로깅이 발생한 Thread 명
- `%c` 로깅이 발생한 카테고리
- `%C` 로깅이 발생한 클래스 명
- `%m` 로그 메시지
- `%n` 줄바꿈
- `%%` % 출력
- `%r` 어플리케이션 실행 후 로깅이 발생한 시점까지의 시간

## 프로젝트 적용

---

### 왜 로깅을 해야할까?

로깅을 적용하기에 앞서 로깅을 왜 적용해야 하는가에 대한 의논이 필요했다.

로깅은 말 그대로 기록을 남기는 행위이다. 그렇다면 우리는 무엇을 이루어내기 위해 기록을 하는 것일까?

먼저 개발은 처음부터 완벽할 수 없다는 것을 인정하는 것에서 시작한다.

애플리케이션을 개발하고 배포한 뒤 운영하는 과정에서 무엇을 더 개선해야 할 지 논의하기 위해선 운영하는 동안의 기록이 필요하다.

이 때 사용되는 것이 운영하며 쌓인 수많은 로그들이 될 것이다.

기록된 로그들을 토대로 서버를 증설하거나 로직을 개선하는 등 추후 방향성이 결정되는 것이다.

### 어떤 것을 로그로 남겨야할까?

프로젝트에 Logback 을 적용하면서 어떤 부분에 로그를 남겨야하는가에 대해 많이 고민하게 되었다.

결론적으론 아래와 같은 것들을 로깅하기로 결정했다.

- 요청과 응답에 대한 로깅
- 의도한 예외들에 대한 로깅
- 의도하지 않은 예외들에 대한 로깅

요청과 응답에 대한 로깅과 의도한 예외들에 대한 로깅을 통해 사용자가 애플리케이션을 사용하면서 겪을 수 있는 시스템 흐름의 통계를 분석할 수 있다. 이를 바탕으로 어떤 부분을 개선해야 할 지 확인할 수 있다.

또한, 외부 API 를 사용하는 등 예상할 수 없는 예외들을 로깅하여 지속적으로 외부 API 를 사용할 것인가, 또는 어디에서 놓친 부분이 있는지 확인할 수 있다.

### 로그 레벨의 기준은?

로그 레벨의 기준은 팀 바이 팀, 사람 바이 사람일 것이다. 물론 [공식화된 문서](https://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/Level.html)도 존재하지만, 의견이 분분할 수 있는 부분이다.

이는 결국 사용하는 쪽에서 어떻게 구분할 것인가에 대해 정하는 것이기 때문에 알맞게 커스텀하여 사용하는 것이 좋을 것이라 생각했다.

우리 팀은 아래는 우리 팀에서 정한 로그 레벨의 기준이다.

- `Error` 외부 라이브러리 예외 혹은 예상하지 못한 예외
- `Warn` 팀에서 예상하는 사용자 플로우에서 벗어난 예외 (Postman, curl 등)
- `Info` 정상적인 사용 시 발생할 수 있는 예외

## References

---

- [https://www.youtube.com/watch?v=fkwb8coxBJM&t=531s](https://www.youtube.com/watch?v=fkwb8coxBJM&t=531s)
- [https://livenow14.tistory.com/63](https://livenow14.tistory.com/63)
- [https://livenow14.tistory.com/64](https://livenow14.tistory.com/64)
- [https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.logging](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.logging)
- [https://taetaetae.github.io/2020/10/04/a-good-developer-in-terms-of-log-and-monitoring/](https://taetaetae.github.io/2020/10/04/a-good-developer-in-terms-of-log-and-monitoring/)
