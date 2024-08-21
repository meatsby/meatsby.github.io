---
title: DCI Pattern
date: 2022-09-25 23:30:00 +0900
status: To Do
tags:
  - Test
---

## DCI 패턴이란?

---

DCI 패턴이란 `Describe` `Context` `It` 의 약자로 일종의 테스트 코드 작성 패턴이다.

`Given` `When` `Then` 과 비슷하지만 미묘한 차이점이 존재한다.

- `Describe` 설명할 테스트 대상을 명시한다.
    - e.g. 테스트 대상의 클래스, 메서드명
- `Context` 테스트 대상이 놓인 상황을 설명한다.
    - e.g. 테스트 대상 메서드의 파라미터
- `It` 테스트 대상의 행동을 설명한다.
    - e.g. 테스트 대상 메서드의 반환값

### DCI 패턴의 장점

- 테스트 코드를 계층 구조로 만들어 준다.
- 테스트 코드를 추가하거나 읽을 때 범위만 신경쓰면 된다.
- 작성하지 못한 테스트 코드를 찾기 쉽다.

## JUnit5 @Nested 활용

---

```java
@Nested
class changeSlackUrl_메소드는 {

    @Nested
    class 존재하는_Job을_입력_받는_경우 {

        private static final String SLACK_URL = "http://slackurl.com";
        private static final String NEW_SLACK_URL = "https://newslackurl.com";

        private final Host host = repository.save(Host_생성("1234", 1234L));
        private final Space space = repository.save(Space_생성(host, "잠실"));
        private final Job job = repository.save(Job_생성(space, "톱오브스윙방", SLACK_URL));
        private final SlackUrlChangeRequest request = new SlackUrlChangeRequest(NEW_SLACK_URL);

        @Test
        void Slack_Url을_수정한다() {
            jobService.changeSlackUrl(host.getId(), job.getId(), request);
            Job actual = repository.getById(Job.class, job.getId());

            assertThat(actual.getSlackUrl()).isEqualTo(NEW_SLACK_URL);
        }
    }
}
```

`JUnit5` 의 `@Nested` 를 활용해 `Java` 에서도 이런 계층형 테스트 코드를 작성할 수 있다.

![[Nested Test.png]]

계층형으로 테스트 코드를 작성하게 된다면 위처럼 테스트 대상 메서드를 쉽게 찾을 수 있다.

이는 누락된 테스트를 찾거나 새로운 테스트를 추가할 때 상당히 편하다.

![[DCI Test Result.png]]

테스트를 실행할 때도 실패하는 케이스등을 찾을 때 훨씬 수월하게 찾을 수 있다.

## References

---

- [https://johngrib.github.io/wiki/junit5-nested/#상속을-사용한-테스트-중복-제거](https://johngrib.github.io/wiki/junit5-nested/#%EC%83%81%EC%86%8D%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A4%91%EB%B3%B5-%EC%A0%9C%EA%B1%B0)
- [https://github.com/johngrib/example-junit5/blob/81a12afe2c9405afb5faa43da7eb46d7aad188a7/src/test/java/com/johngrib/example/math/ComplexNumberTest.java](https://github.com/johngrib/example-junit5/blob/81a12afe2c9405afb5faa43da7eb46d7aad188a7/src/test/java/com/johngrib/example/math/ComplexNumberTest.java)
