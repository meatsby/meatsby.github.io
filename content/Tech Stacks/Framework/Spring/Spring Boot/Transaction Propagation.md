---
title: "Transaction Propagation"
date: 2022-10-07 14:40:00 +0900
status: In Progress
tags:
  - Spring Boot
---

## Transaction Propagation

---

Transaction Propagation, 트랜잭션 전파는 트랜잭션의 경계에서 이미 진행중인 트랜잭션이 있을 때 또는 없을 때 어떻게 동작할 것인가를 결정하는 방식을 의미한다.

`@Transactional` 의 `propagation` 속성을 통해 피호출 트랜잭션 입장에서 호출한 쪽의 트랜잭션을 그대로 사용할 수도 있고, 새롭게 트랜잭션을 생성할 수 도 있다.

### Propagation 종류

Transaction Propagation 에는 총 7가지 전파 속성이 존재한다.

- `REQUIRED`
- `SUPPORTS`
- `MANDATORY`
- `REQUIRES_NEW`
- `NOT_SUPPORTED`
- `NEVER`
- `NESTED`

## Physical Transaction & Logical Transaction

---

### Physical Transaction

- 물리적 트랜잭션은 실제 트랜잭션이 실행되는 스레드를 의미한다.

### Logical Transaction

- 논리적 트랜잭션은 선언적 트랜잭션이 적용된 모든 메서드를 의미한다.
    - 즉, 외부 트랜잭션과 내부 트랜잭션의 논리적 범위는 독립적이다.
- 롤백 상태를 개별적으로 결정할 수 있고 이는 물리적 트랜잭션에 매핑된다.
    - 따라서, 내부 트랜잭션 설정으로 인해 외부 트랜잭션의 커밋에 영향을 미칠 수 있다.
- 내부 트랜잭션으로 인한 롤백은 외부 트랜잭션 입장에선 예상할 수 없는 롤백이다.
    - `UnexpectedRollbackException` 을 발생시킴으로써 외부 트랜잭션이 그 사실을 알 수 있다.

## REQUIRED (DEFAULT)

---

```java
@Nested
class testRequired {

    @Test
    @DisplayName("부모 트랜잭션이 있는 Required")
    void withParent() {
        final var actual = parentService.required(ChildService::required);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }

    @Test
    @DisplayName("부모 트랜잭션이 없는 Required")
    void withoutParent() {
        final var actual = parentService.nonTransactional(ChildService::required);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }
}
```

- 부모 트랜잭션이 있다면 부모 트랜잭션에 합류한다.
- 부모 트랜잭션이 없다면 새로운 트랜잭션을 생성한다.

### 부모 트랜잭션이 있는 경우

```
ParentService   : Parent Transaction Active : 🟢
ChildService    :  Child Transaction Active : 🟢
PropagationTest : transactions : [ParentService]
```

### 부모 트랜잭션이 없는 경우

```
ParentService   : Parent Transaction Active : 🚫
ChildService    :  Child Transaction Active : 🟢
PropagationTest : transactions : [ChildService]
```

## SUPPORTS

---

```java
@Nested
class testSupports {

    @Test
    @DisplayName("부모 트랜잭션이 있는 Supports")
    void withParent() {
        final var actual = parentService.required(ChildService::supports);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }

    @Test
    @DisplayName("부모 트랜잭션이 없는 Supports")
    void withoutParent() {
        final var actual = parentService.nonTransactional(ChildService::supports);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }
}
```

- 트랜잭션이 필요한 처리는 없지만 실패하면 롤백해야 하는 경우 사용하는 전파 속성이다.
    - 부모 트랜잭션이 있다면 부모 트랜잭션에 합류한다.
    - 부모 트랜잭션이 없다면 트랜잭션을 생성하지 않는다.

### 부모 트랜잭션이 있는 경우

```
ParentService   : Parent Transaction Active : 🟢
ChildService    :  Child Transaction Active : 🟢
PropagationTest : transactions : [ParentService]
```

### 부모 트랜잭션이 없는 경우

```
ParentService   : Parent Transaction Active : 🚫
ChildService    :  Child Transaction Active : 🚫
```

## MANDATORY

---

```java
@Nested
class testMandatory {

    @Test
    @DisplayName("부모 트랜잭션이 있는 Mandatory")
    void withParent() {
        final var actual = parentService.required(ChildService::mandatory);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }

    @Test
    @DisplayName("부모 트랜잭션이 없는 Mandatory")
    void withoutParent() {
        assertThatThrownBy(() -> parentService.nonTransactional(ChildService::mandatory))
                .isInstanceOf(IllegalTransactionStateException.class)
                .hasMessage("No existing transaction found for transaction marked with propagation 'mandatory'");
    }
}
```

- 부모 트랜잭션에 의해 항상 피호출되어야 하는 전파 속성이다.
    - 부모 트랜잭션이 있다면 부모 트랜잭션에 합류한다.
    - 부모 트랜잭션이 없다면 예외를 발생시킨다.

### 부모 트랜잭션이 있는 경우

```
ParentService   : Parent Transaction Active : 🟢
ChildService    :  Child Transaction Active : 🟢
PropagationTest : transactions : [ParentService]
```

### 부모 트랜잭션이 없는 경우

```
No existing transaction found for transaction marked with propagation 'mandatory'
org.springframework.transaction.IllegalTransactionStateException: No existing transaction found for transaction marked with propagation 'mandatory'
```

## REQUIRES_NEW

---

```java
@Nested
class testRequiredNew {

    @Test
    @DisplayName("부모 트랜잭션이 있는 Requires_New")
    void withParent() {
        final var actual = parentService.required(ChildService::requiresNew);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(2);
    }

    @Test
    @DisplayName("부모 트랜잭션이 없는 Requires_New")
    void withoutParent() {
        final var actual = parentService.nonTransactional(ChildService::requiresNew);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }

    @Test
    @DisplayName("부모 트랜잭션이 예외를 발생하는 Requires_New")
    void withRollback() {
        assertThat(parentService.findAll()).hasSize(0);

        assertThatThrownBy(() -> parentService.exception(ChildService::requiresNew))
                .isInstanceOf(RuntimeException.class);

        assertThat(parentService.findAll()).hasSize(1);
    }
}
```

- 무조건 새로운 트랜잭션을 생성한다.
- 항상 물리적 트랜잭션을 새로 생성하기 때문에 내부 트랜잭션이 외부 트랜잭션에 영향을 주지 않는다.

### 부모 트랜잭션이 있는 경우

```
ParentService   : Parent Transaction Active : 🟢
ChildService    :  Child Transaction Active : 🟢
PropagationTest : transactions : [ParentService, ChildService]
```

### 부모 트랜잭션이 없는 경우

```
ParentService   : Parent Transaction Active : 🚫
ChildService    :  Child Transaction Active : 🟢
PropagationTest : transactions : [ChildService]
```

### 부모 트랜잭션이 예외를 발생시킬 경우

```
ChildService    :  Child Transaction Active : 🟢
PropagationTest : transactions : [ChildService]
```

## NOT_SUPPORTED

---

```java
@Nested
class testNotSupported {

    @Test
    @DisplayName("부모 트랜잭션이 있는 Not_Supported")
    void withParent() {
        final var actual = parentService.required(ChildService::notSupported);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(2);
    }

    @Test
    @DisplayName("부모 트랜잭션이 없는 Not_Supported")
    void withoutParent() {
        final var actual = parentService.nonTransactional(ChildService::notSupported);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }
}
```

- 부모 트랜잭션이 있다면 해당 트랜잭션을 보류시키고 트랜잭션이 없는 상태로 처리를 수행한다.
- 부모 트랜잭션이 없다면 트랜잭션을 생성하지 않는다.

### 부모 트랜잭션이 있는 경우

```
ParentService   : Parent Transaction Active : 🟢
ChildService    :  Child Transaction Active : 🚫
PropagationTest : transactions : [ParentService]
```

### 부모 트랜잭션이 없는 경우

```
ParentService   : Parent Transaction Active : 🚫
ChildService    :  Child Transaction Active : 🚫
```

## NEVER

---

```java
@Nested
class testNever {

    @Test
    @DisplayName("부모 트랜잭션이 있는 Never")
    void withParent() {
        assertThatThrownBy(() -> parentService.required(ChildService::never))
                .isInstanceOf(IllegalTransactionStateException.class)
                .hasMessage("Existing transaction found for transaction marked with propagation 'never'");
    }

    @Test
    @DisplayName("부모 트랜잭션이 없는 Never")
    void withoutParent() {
        final var actual = parentService.nonTransactional(ChildService::never);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }
}
```

- 트랜잭션을 사용하지 않도록 강제하는 속성이다.
    - 부모 트랜잭션이 있다면 예외를 발생시킨다.

### 부모 트랜잭션이 있는 경우

```
Existing transaction found for transaction marked with propagation 'never'
org.springframework.transaction.IllegalTransactionStateException: Existing transaction found for transaction marked with propagation 'never'
```

### 부모 트랜잭션이 없는 경우

```
ParentService   : Parent Transaction Active : 🚫
ChildService    :  Child Transaction Active : 🚫
```

## NESTED

---

```java
@Nested
class testNested {

    @Test
    @DisplayName("부모 트랜잭션이 있는 Nested")
    void withParent() {
        assertThatThrownBy(() -> parentService.required(ChildService::nested))
                .isInstanceOf(NestedTransactionNotSupportedException.class)
                .hasMessage("JpaDialect does not support savepoints - check your JPA provider's capabilities");
    }

    @Test
    @DisplayName("부모 트랜잭션이 없는 Nested")
    void withoutParent() {
        final var actual = parentService.nonTransactional(ChildService::nested);

        log.info("transactions : {}", actual);
        assertThat(actual)
                .hasSize(1);
    }
}
```

- 부모 트랜잭션이 있다면 JDBC Savepoint 기능을 이용해 내부에 중첩 트랜잭션을 생성한다.
    - 중첩 트랜잭션에서 롤백 발생 시, 해당 중첩 트랜잭션 시작 시점까지만 롤백된다.
    - 중첩 트랜잭션은 부모 트랜잭션이 커밋될 때 같이 커밋된다.
- 단일 물리적 트랜잭션에 여러 Savepoint 를 두어 내부 트랜잭션에 롤백이 실행되어도 외부 트랜잭션에서는 물리적 트랜잭션을 계속할 수 있다.
- 부모 트랜잭션이 없다면 새로운 트랜잭션을 생생한다.

### 부모 트랜잭션이 있는 경우

```
JpaDialect does not support savepoints - check your JPA provider's capabilities
org.springframework.transaction.NestedTransactionNotSupportedException: JpaDialect does not support savepoints - check your JPA provider's capabilities
```

- JPA 의 경우 Dirty Checking 을 통한 쓰기 지연 때문에 중첩 트랜잭션을 생성할 수 없어 지원하지 않는다.

### 부모 트랜잭션이 없는 경우

```
ParentService   : Parent Transaction Active : 🚫
ChildService    :  Child Transaction Active : 🟢
PropagationTest : transactions : [ChildService]
```

## References

---

- [https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#tx-propagation](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#tx-propagation)
- [https://www.baeldung.com/spring-transactional-propagation-isolation](https://www.baeldung.com/spring-transactional-propagation-isolation)
- [https://reiphiel.tistory.com/m/entry/understanding-of-spring-transaction-management-practice](https://reiphiel.tistory.com/m/entry/understanding-of-spring-transaction-management-practice)
- [https://deveric.tistory.com/m/86](https://deveric.tistory.com/m/86)
