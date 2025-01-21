---
title: "Acceptance Test Isolation"
date: 2022-12-19 08:30:00 +0900
status: Done
draft: false
tags:
  - Spring Boot
---
## Test Isolation
---
애플리케이션 개발에 있어서 테스트코드는 개발 생산성과 애플리케이션 신뢰도 향상에 큰 도움을 줍니다. 이런 테스트코드는 순서에 상관없이 독립적으로 수행되어야 비로소 신뢰성 있고 안정적일 수 있는데요. 아무리 테스트코드를 꼼꼼히 작성하더라도 동일한 입력값에 대해 항상 같은 결과를 출력하지 않는 비결정적 테스트가 된다면 테스트코드의 의미를 상실할 수 있습니다. 때문에 충분한 테스트 격리를 통해 안정적인 테스트가 수행될 수 있도록 하는 것이 매우 중요합니다.

테스트 격리가 이루어지지 않는 근본적인 원인은 각각의 테스트가 하나의 자원을 공유하기 때문입니다. JUnit 과 Spring 에선 `@AfterEach` 와 `@Transactional` 등을 통해 테스트 격리가 가능합니다. 뿐만 아니라 Mock 프레임워크를 활용하여 테스트 격리에 신경쓰지않고 계층 구조에서 단위 테스트를 수행할 수 있는 방법 역시 존재합니다.

하지만 운영 환경과 같은 조건에서 테스트를 수행하는 인수 테스트의 경우 Mock 프레임워크를 사용하지 않고 실제 DB 를 사용하여 테스트를 수행해야 합니다. 즉, 테스트가 진행됨에 따라 DB 상태가 지속적으로 변해 동일한 초기 상태를 보장하지 않기 때문에 충분한 테스트 격리가 이루어졌다고 볼 수 없습니다.

이번 글에선 인수 테스트를 수행할 때 테스트를 격리하는 다양한 방법에 대해 알아보겠습니다.

## Acceptance Test Isolation
---
### @Transactional

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Transactional
class AcceptanceTest {
}
```

통합 테스트를 작성하듯이 `@Transactional` 을 붙여 인수 테스트를 작성해보면 롤백이 수행되지 않는 것을 확인할 수 있습니다. 이는 인수 테스트를 수행할 때 `@SpringBootTest` 에 `port` 를 지정하여 테스트를 수행하기 때문인데요. `port` 를 지정하여 서버를 구동하게 되면 `@Transactional` 이 적용된 Test Thread 와는 별개로 구동중인 서버가 별도의 Thread 에서 Spring Container 를 실행시켜 트랜잭션을 커밋하기 때문에 롤백이 수행되지 않습니다.

### @DirtiesContext

```java
@DirtiesContext
class AcceptanceTest {
}
```

기본적으로 Spring 은 Context Caching 을 통해 Bean 을 재사용합니다. `@DirtiesContext` 는 이런 Bean 들에 대해 Dirties 를 확인하고 Context 를 새로 로드합니다. 즉, Context 가 재구성될 때마다 테이블도 재구성하여 초기 상태를 보장하는 방법입니다.

어노테이션 추가만으로 테스트 격리가 이루어져 사용이 간편하지만 매번 Context 를 새로 로드하기 때문에 시간이 오래걸린다는 단점이 존재하여 크게 추천하지 않는 방법입니다.

Context 를 매번 새로 로드할 필요 없이 DB 만 초기화 시켜주는 것이 목적이기 때문에 `@DirtiesContext` 보단 다른 방법이 더 좋은 선택지일 수 있습니다.

### 테스트 수행 후 직접 삭제

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class AcceptanceTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void beforeEach() {
        if (RestAssured.port == UNDEFINED_PORT) {
            RestAssured.port = port;
        }
        userRepository.save(new User("quaritch"));
    }

    // ...

    @AfterEach
    void afterEach() {
        userRepository.deleteAll();
    }
}
```

DB 를 초기화하는 가장 기본적인 방법은 매 테스트마다 초기 데이터를 세팅해주고 테스트가 종료될 때 마다 데이터를 제거해주는 방법입니다. JUnit 의 `@BeforeEach` 와 `@AfterEach` 를 사용하여 데이터 생성 및 삭제 요청을 보내는 방식을 생각해 볼 수 있습니다.

테스트에 필요한 데이터가 적은 경우, 간단하게 수행할 수 있는 방법이기 때문에 많이 사용되는 방식입니다. 하지만 생성할 데이터가 많을 경우 생성한 만큼 삭제 요청이 추가되며 연관관계 매핑이 되어있으면 도메인 지식이 없는 사람이 테스트를 작성할 때 연관관계로 생성되는 엔티티를 추적하기 어려우며 외래키 등 제약 조건에 따라 삭제가 어러울 수 있는 비효율이 존재합니다.

### 테스트 수행 후 TRUNCATE 로 테이블 초기화

`TRUNCATE` 명령어를 사용하면 앞서 소개된 방법들 보다 훨씬 간편하게 DB 를 초기화할 수 있습니다.

API 요청을 보낼 필요도 없고 `DELETE` 와 다르게 `SELECT` 가 필요하지 않기 때문에 상대적으로 적은 시간에 테이블을 초기화할 수 있는 장점이 있습니다.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Sql("truncate.sql")
class AcceptanceTest {
}
```

먼저 `@Sql` 어노테이션을 통해 `TRUNCATE` 쿼리를 실행하는 방식입니다. 테스트 클래스가 실행되기 전에 `@Sql` 에 선언된 경로에 있는 SQL 이 먼저 실행됩니다. 해당 파일 안에 모든 테이블에 대한 `TRUNCATE` 명령어를 작성해 놓으면 파일 하나만으로 테스트 격리를 이뤄낼 수 있습니다.

하지만 엔티티 혹은 테이블이 추가될 때 마다 파일을 직접 수정해주어야 한다는 단점이 존재합니다.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class AcceptanceTest {

    @Autowired
    private EntityManager entityManager;
    
    @AfterEach
    void afterEach() {
        // 쓰기 지연 저장소에 남은 쿼리 실행
        entityManager.flush();
        // 테이블 이름 추출
        List<String> tableNames = getTableNames();
        // 참조 무결성 비활성화
        executeQuery("SET REFERENTIAL_INTEGRITY FALSE");
        for (String tableName : tableNames) {
            // TRUNCATE 실행
            executeQuery(String.format("TRUNCATE TABLE %s", tableName));
            // ID 값 1로 초기화
            executeQuery(String.format("ALTER TABLE %s AUTO_INCREMENT = 1", tableName));
        }
        // 참조 무결성 재활성화
        executeQuery("SET REFERENTIAL_INTEGRITY TRUE");
    }

    private List<String> getTableNames() {
        return entityManager.getMetamodel()
                .getEntities()
                .stream()
                .map(e -> e.getJavaType()
                        .getAnnotation(Table.class)
                        .name()
                        .toUpperCase())
                .collect(Collectors.toList());
    }

    private void executeQuery(final String sql) {
        entityManager.createNativeQuery(sql)
                .executeUpdate();
    }
}
```

두 번째 방식은 `EntityManager` 나 `JdbcTemplate` 을 Bean 으로 주입받아 모든 테이블 이름을 조회하여 각 테스트가 시작될 때 `TRUNCATE` 쿼리를 실행하는 방법입니다.

`TRUNCATE` 명령어는 외래키 등으로 인해 정상적으로 실행되지 않을 수 있기 때문에 참조 무결성을 비활성화한 뒤 실행하고 추가적으로 `AUTO_INCREMENT` 를 사용한다면 ID 값을 초기화해주는 작업 역시 추가해줄 수 있습니다.

한 번 만들어 놓으면 엔티티가 얼마나 추가되고 삭제되는지와 관계없이 자동으로 테이블을 조회하여 모두 초기화하기 때문에 가장 효과적으로 인수 테스트를 격리할 수 있는 방법입니다.

해당 방법을 통해 관리 포인트를 줄이며 인수 테스트 시 충분한 격리성을 확보했습니다. 하지만 여전히 테스트 클래스가 추가될 때마다 해당 코드를 사용해야 하기 때문에 중복이 발생할 수 있습니다. 테스트 코드를 고도화하여 문제점을 해결해보겠습니다.

## Advancement
---
### Spring 의 TestExecutionListener 사용

```java
public class AcceptanceTestExecutionListener implements TestExecutionListener {

    private EntityManager entityManager;

    @Override
    public void afterTestMethod(final TestContext testContext) {
        this.entityManager = testContext.getApplicationContext()
                .getBean(EntityManager.class);
        List<String> tableNames = getTableNames();
        executeQuery("SET FOREIGN_KEY_CHECKS = 0");
        for (String tableName : tableNames) {
            executeQuery(String.format("TRUNCATE TABLE %s", tableName));
            executeQuery(String.format("ALTER TABLE %s AUTO_INCREMENT = 1", tableName));
        }
        executeQuery("SET FOREIGN_KEY_CHECKS = 1");
    }

    // ...
}
```

Spring 은 테스트의 특정 시점에 개입할 수 있는 리스너 인터페이스인 `TestExecutionListener` 를 제공합니다. `afterTestExecution()` 또는 `afterTestMethod()` 를 통해 테스트 실행 후 개입할 수 있습니다.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Retention(RetentionPolicy.RUNTIME)
@TestExecutionListeners(value = {AcceptanceTestExecutionListener.class,}, mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS)
public @interface AcceptanceTest {
}
```

`@TestExecutionListers` 를 통해 위와 같이 등록해줄 수 있습니다. 모든 테스트 클래스에 붙이는 번거로움을 줄이기 위해 커스텀 어노테이션을 선언해서 사용해주면 `@AcceptanceTest` 만을 붙여 간편하게 사용할 수 있습니다.

### JUnit5 의 Extension 사용

```java
public class DatabaseCleanerExtension implements AfterEachCallback {

    private EntityManager entityManager;

    @Override
    public void afterEach(final ExtensionContext context) {
        this.entityManager = SpringExtension.getApplicationContext(context)
                .getBean(EntityManager.class);
        List<String> tableNames = getTableNames();
        executeQuery("SET FOREIGN_KEY_CHECKS = 0");
        for (String tableName : tableNames) {
            executeQuery(String.format("TRUNCATE TABLE %s", tableName));
            executeQuery(String.format("ALTER TABLE %s AUTO_INCREMENT = 1", tableName));
        }
        executeQuery("SET FOREIGN_KEY_CHECKS = 1");
    }

    // ...
}
```

JUnit5 역시 테스트의 특정 시점에 개입할 수 있는 `Extension` 인터페이스를 제공합니다. `Extension` 인터페이스를 확장한 인터페이스 중 테스트 실행 직후에 개입할 수 있는 `AfterEachCallback` 인터페이스를 구현하여 DB 의 초기 상태를 보장할 수 있습니다.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Retention(RetentionPolicy.RUNTIME)
@ExtendWith({DatabaseCleanerExtension.class})
public @interface AcceptanceTest {
}
```

`@ExtendWith` 를 통해 위와 같이 등록해줄 수 있습니다. 역시 커스텀 어노테이션을 통해 간편하게 사용할 수 있도록 만들어줄 수 있습니다.

### DatabaseCleaner 생성

아직도 개선점이 보입니다. 테스트마다 이루고 싶은 것은 `TRUNCATE` 일 뿐인데 매번 Context 에서 `EntityManager` 를 가져와서 테이블 이름을 추출하는 과정이 포함되어 있습니다.

Spring 을 좀 더 Spring 답게 쓸 수 있도록 `DatabaseCleaner` 라는 Component 를 만들어 Bean 으로 등록시켜줍시다.

```java
@Component
public class DatabaseCleaner {

    @Autowired
    private EntityManager entityManager;

    private List<String> tableNames;

    @PostConstruct
    public void afterPropertiesSet() {
        this.tableNames = entityManager.getMetamodel()
                .getEntities()
                .stream()
                .map(e -> e.getJavaType()
                        .getAnnotation(Table.class)
                        .name()
                        .toUpperCase())
                .collect(Collectors.toList());
    }

    @Transactional
    public void truncateTables() {
        entityManager.flush();
        executeQuery("SET REFERENTIAL_INTEGRITY FALSE");
        for (String tableName : tableNames) {
            executeQuery(String.format("TRUNCATE TABLE %s", tableName));
            executeQuery(String.format("ALTER TABLE %s AUTO_INCREMENT = 1", tableName));
        }
        executeQuery("SET REFERENTIAL_INTEGRITY TRUE");
    }

    private void executeQuery(final String sql) {
        entityManager.createNativeQuery(sql)
                .executeUpdate();
    }
}
```

`DatabaseCleaner` 라는 Component 를 생성함으로써 Spring 의 DI 를 활용하여 `EntityManager` 를 가져올 수 있게 되었고 `@PostConstruct` 를 통해 Bean 생성 시 테이블 이름을 한 번만 추출하여 사용할 수 있게 되었습니다. 또한, `@Transactional` 을 추가하여 `TRUNCATE` 처리의 원자성 역시 보장할 수 있게 되었습니다.

```java
public class DatabaseCleanerExtension implements AfterEachCallback {

    @Override
    public void afterEach(final ExtensionContext context) {
        DatabaseCleaner databaseCleaner = SpringExtension.getApplicationContext(context)
                .getBean(DatabaseCleaner.class);
        databaseCleaner.truncateTables();
    }
}
```

이제 `DatabaseCleaner` 만 가져와서 메서드 하나만 실행하는 것으로 인수 테스트 격리가 완성됩니다.

## 마무리
---
인수 테스트는 실제 애플리케이션이 서비스 되는 것과 가장 비슷환 환경에서 이루지는 테스트인 만큼 안정성있는 테스트 코드 구축이 매우 중요합니다. `@DirtiesContext` 부터 `TRUNCATE` 쿼리 사용, Spring 의 `TestExecutionListener` 와 JUnit5 의 `Extension` 까지 다양한 방법을 통해 인수 테스트를 격리하는 방법에 대해 알아보았습니다. `TestExecutionListener` 와 `Extension` 의 차이에 대해 추가적으로 학습하여 어떤점이 다르고 어떤 상황에 사용하는 것이 좋은지 까지 알아보면 좋을 것 같습니다.

## References
---
- [Tecoble - 인수테스트에서 테스트 격리하기](https://tecoble.techcourse.co.kr/post/2020-09-15-test-isolation/)
- [Spring Docs - TestExecutionListener Configuration](https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#testcontext-tel-config)
- [JUnit5 Docs - Test Lifecycle Callbacks](https://junit.org/junit5/docs/current/user-guide/#extensions-lifecycle-callbacks)
