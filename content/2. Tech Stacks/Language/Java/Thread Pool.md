---
title: "Thread Pool"
date: 2022-11-15 16:30:00 +0900
status: In Progress
draft: false
tags:
  - Java
---
## Java Thread Pool
---
![[Executor Service.png]]

OS 는 병렬 처리를 모방하기 위해 Thread 간의 Context Switching 을 수행합니다. Java 에서 Thread 는 OS 의 Thread 에 매핑됩니다. 때문에 Thread 를 너무 많이 생성하게 된다면 OS 의 자원이 빠르게 소진될 수 있으며 Context Switching 비용 역시 증가할 수 있습니다.

이런 문제를 해결하기 위해 Thread Pool 이라는 개념이 등장합니다. 멀티스레드 환경에선 연산할 작업을 Thread Pool 에 전달하여 처리합니다. Thread Pool 은 전달받을 작업을 처리하는 Thread 를 관리하고 Thread 의 수와 생명주기를 제어하며 전달되는 작업을 큐에 담아 처리를 스케줄링하여 자원을 효율적으로 사용할 수 있도록 도와줍니다.

![[Executor Interface.png]]

Java 에서는 `Executor` 인터페이스를 통해 Thread Pool 을 구현하였습니다.

이번 글에선 `ExecutorService` `ThreadPoolExecutor` `ScheduledThreadPoolExecutor` `Executors` 에 대해 알아보겠습니다.

## ExecutorService
---
```java
@Test
void executorServiceTest() throws ExecutionException, InterruptedException {
    ExecutorService executorService = Executors.newFixedThreadPool(10);
    Future<String> future = executorService.submit(() -> "Hello World");
    String result = future.get();

    assertThat(result).isEqualTo("Hello World");
}
```

`ExecutorService` 는 `Executor` 를 확장한 인터페이스로서 작업의 진행을 제어하고 관리하는 많은 메서드가 포함되어 있습니다. 해당 인터페이스를 통해 실행할 작업을 제출하고 반환되는 `Future` 인스턴스를 통해 실행을 제어할 수도 있습니다.

```java
ExecutorService executorService = 
  new ThreadPoolExecutor(1, 1, 0L, TimeUnit.MILLISECONDS,   
  new LinkedBlockingQueue<Runnable>());
```

`ExecutorService` 는 다양한 구현체들이 존재하며 직접 구성하여 사용할 수도 있습니다. 위 예시는 `ThreadPoolExecutor` 클래스의 생성자를 통해 커스텀 Thread Pool 을 생성한 모습입니다.

### ThreadPoolExecutor

`ThreadPoolExecutor` 는 튜닝을 위한 많은 매개변수와 후크가 있는 확장성 있는 Thread Pool 입니다.

그 중 대표적인 매개변수들은 아래와 같습니다.

- `corePoolSize` 는 Thread Pool 에 항상 상주하는 Thread 의 수입니다.
- `maximumPoolSize` 는 Core Thread 가 모두 작업중이며 내부 `workQueue` 가 가득 차 있을 때 최대로 생성할 수 있는 Thread 의 수를 의미합니다.
- `keepAliveTime` 은 초과 생성된 Thread 가 idle 상태로 대기할 수 있는 시간입니다. `ThreadPoolExecutor` 는 기본적으로 초과 생성된 Thread 를 제거 대상으로 간주합니다. Core Thread 에 같은 제거 정책을 적용하고 싶을 경우 `allowCoreThreadTimeOut(true)` 메서드를 사용할 수 있습니다.
- `unit` 은 `keepAliveTime` 의 단위입니다.
- `workQueue` 는 Core Thread 가 모두 작업중일 때 작업이 대기하는 큐입니다. `Runnable` 인스턴스들만 대기할 수 있기 때문에 `Callable` 인스턴스를 제출할 수 있는 `submit()` 메서드는 `AbstractThreadPoolExecutor` 를 통해 `Runnable` 인스턴스로 변환되어 대기합니다.

이런 매개변수들을 통해 다양한 Thread Pool 을 사용할 수 있지만, 일반적으로 사용되는 Thread Pool 은 대부분 `Executors` 클래스의 팩토리 메서드를 통해 제공됩니다.

### Assigning Tasks

```java
Runnable runnableTask = () -> {
    try {
        TimeUnit.MILLISECONDS.sleep(300);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
};

executorService.execute(runnableTask);
```

`execute()` 메서드는 `Executor` 인터페이스로 부터 상속받은 메서드입니다. `Runnable` 인스턴스를 처리하며 반환타입이 `void` 이기 때문에 작업의 상태를 확인할 수 있는 방법이 제한적입니다.

처리 중 예외가 발생하면 해당 Thread 가 종료되고 Thread Pool 에서 제거되며 새로운 Thread 를 생성하여 다른 작업을 처리합니다.

```java
Callable<String> callableTask = () -> {
    TimeUnit.MILLISECONDS.sleep(300);
    return "Task's execution";
};

Future<String> future = 
  executorService.submit(callableTask);
```

`submit()` 메서드는 `Future` 인스턴스를 반환타입으로 가지고 있습니다. 처리 중 예외가 발생하더라도 Thread 가 종료되지 않고 다음 작업에 사용됩니다. 이런 특징 때문에 `submit()` 메서드를 사용하는 것이 더 바람직합니다.

```java
Callable<String> callableTask = () -> {
    TimeUnit.MILLISECONDS.sleep(300);
    return "Task's execution";
};

List<Callable<String>> callableTasks = new ArrayList<>();
callableTasks.add(callableTask);
callableTasks.add(callableTask);
callableTasks.add(callableTask);

String result = executorService.invokeAny(callableTasks);
```

`invokeAny()` 메서드는 작업의 컬렉션을 실행합니다. 모두 실행시키고 하나라도 성공한다면 해당 작업의 반환값을 반환합니다.

```java
Callable<String> callableTask = () -> {
    TimeUnit.MILLISECONDS.sleep(300);
    return "Task's execution";
};

List<Callable<String>> callableTasks = new ArrayList<>();
callableTasks.add(callableTask);
callableTasks.add(callableTask);
callableTasks.add(callableTask);

List<Future<String>> futures = executorService.invokeAll(callableTasks);
```

`invokeAll()` 메서드는 작업의 컬렉션을 실행합니다. 모두 실행시키고 모든 작업에 대한 결과를 컬렉션으로 반환합니다.

### Shutting Down

일반적으로 `ExecutorService` 는 작업이 없을 때 자동으로 제거되지 않고 새로운 작업이 할당되기를 무기한 기다립니다. 이는 불규칙적으로 나타나는 작업을 처리하거나 컴파일 시점에 작업의 수량을 알 수 없는 경우 유용할 수 있습니다.

하지만 대기중인 `ExecutorService` 로 인해 JVM 이 계속 실행되어 종료되어야 하는 시점에 애플리케이션이 종료되지 않을 수 있기 때문에 `ExecutorService` 를 종료하기 위한 `shutdown()` `shutdownNow()` 메서드가 존재합니다.

```java
executorService.shutdown();
```

`shutdown()` 은 `ExecutorService` 를 바로 종료하지 않고 해당 `ExecutorService` 에 더 이상 작업이 할당되지 않게한 뒤 현재 실행중인 모든 작업이 끝나면 비로소 종료됩니다.

```java
List<Runnable> notExecutedTasks = executorService.shutDownNow();
```

`shutdownNow()` 는 `ExecutorService` 를 바로 종료하지만 실행중인 작업들이 모두 동시에 종료된다는 보장은 하지 않습니다. 해당 메서드는 처리 대기중인 작업의 목록을 반환하기 때문에 이 작업들을 어떻게 처리할지 결정할 수 있습니다.

```java
executorService.shutdown();
try {
    if (!executorService.awaitTermination(800, TimeUnit.MILLISECONDS)) {
        executorService.shutdownNow();
    } 
} catch (InterruptedException e) {
    executorService.shutdownNow();
}
```

Oracle 에서도 권장하는 `ExecutorService` 를 종료하는 좋은 방법은 위처럼 `awaitTermination()` 메서드와 함께 위 두 메서드를 모두 사용하는 것입니다.

이런식으로 `ExecutorService` 를 종료한다면 해당 `ExecutorService` 는 더 이상 작업을 받지 않을 것이고 지정된 시간안에 모든 작업이 완료되지 않는다면 즉시 종료됩니다.

### Future Interface

`submit()` 과 `invokeAll()` 메서드는 `Future` 타입 또는 `Future` 의 컬렉션을 반환하여 작업의 실행 결과를 얻거나 작업의 상태를 확인할 수 있습니다.

```java
Future<String> future = executorService.submit(callableTask);
String result = null;
try {
    result = future.get();
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
}
```

`Future` 인터페이스는 `Callable` 의 실행 결과를 반환하는 `get()` 메서드를 제공합니다. 작업이 `Runnable` 일 경우 `null` 을 반환합니다.

작업이 실행중일 때 `get()` 메서드를 호출하면 작업이 제대로 실행되고 결과를 반환할 수 있을 때까지 실행이 차단됩니다.

```java
String result = future.get(200, TimeUnit.MILLISECONDS);
```

`get()` 메서드로 인한 긴 시간의 차단으로 인해 애플리케이션의 성능이 저하될 수 있습니다. 결과 데이터가 중요하지 않은 경우 시간 제한을 사용하여 이러한 문제를 방지할 수 있습니다.

위 예시처럼 실행 시간이 지정된 것보다 길면 `TimeoutException` 이 발생하기 때문에 `isDone()` 메서드를 통해 할당된 작업이 이미 처리되었는지 확인할 수도 있습니다.

```java
boolean canceled = future.cancel(true);
boolean isCancelled = future.isCancelled();
```

`Future` 인터페이스는 작업을 도중에 취소하는 `cancel()` 메서드를 제공하며 `isCancelled()` 메서드를 통해 작업의 취소 여부를 확인할 수 있습니다.

## ScheduledExecutorService
---
`ScheduledExecutorService` 인터페이스는 미리 정의된 지연 또는 주기적으로 작업을 실행할 수 있게 도와주는 인터페이스입니다.

```java
Future<String> resultFuture = 
  executorService.schedule(callableTask, 1, TimeUnit.SECONDS);
```

`ScheduledExecutorService` 의 `schedule()` 메서드를 이용하여 작업을 지정된 지연 이후 실행할 수 있습니다.

```java
executorService.scheduleAtFixedRate(runnableTask, 100, 450, TimeUnit.MILLISECONDS);
```

`scheduleAtFixedRate()` 메서드를 통해 작업을 주기적으로 실행할 수 있습니다. 위 예시의 경우 0.1초 대기 후 작업이 실행되며 작업의 시작시간을 기준으로 매 0.45초 마다 작업을 주기적으로 실행합니다. 만약 할당된 작업을 실행하는데 0.45초 이상의 시간이 필요할 경우 `ScheduledExecutorService` 는 다음 작업을 시작하기 전에 현재 작업이 완료될 때까지 대기합니다.

```java
executorService.scheduleWithFixedDelay(task, 100, 150, TimeUnit.MILLISECONDS);
```

만약 작업 반복 사이에 고정 길이의 지연이 필요한 경우 `scheduleWithFixedDelay()` 메서드를 사용할 수 있습니다. 위 예시의 경우 현재 실행의 끝과 다음 실행의 시작 사이의 0.15초의 중지를 보장합니다.

`scheduleAtFixedRate()` 및 `scheduleWithFixedDelay()` 메서드는 `ExecutorService` 가 종료되거나 실행 중 예외가 발생하는 경우 종료됩니다.

## Executors
---
`Executors` 클래스는 미리 구성된 Thread Pool 인스턴스를 만들기 위한 여러 메서드가 포함되어 있습니다. 커스텀 튜닝이 필요하지 않다면 해당 클래스를 통해 Thread Pool 을 생성하여 사용할 수 있습니다.

`Executor` 와 `ExecutorService` 인터페이스를 통해 다양한 Thread Pool 을 사용할 수 있습니다.

### newFixedThreadPool

`newFixedThreadPool()` 은 존재하는 Thread 의 수가 항상 같은 Thread Pool 을 생성합니다.

- `corePoolSize` = 지정
- `maximumPoolSize` = `corePoolSize`
- `keepAliveTime` = 0
- `workQueue` = `LinkedBlockingQueue*<*Runnable*>*`

```java
@Test
void newFixedThreadPoolTest() {
    ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(2);
    executor.submit(sleepThread());
    executor.submit(sleepThread());
    executor.submit(sleepThread());

    assertAll(() -> {
        assertThat(executor.getPoolSize()).isEqualTo(2);
        assertThat(executor.getQueue().size()).isEqualTo(1);
    });
}
```

`Executors.newFixedThreadPool(2)` 를 통해 2개의 Thread 를 가진 Thread Pool 을 생성한 뒤 1초간 정지하는 작업 3개를 Thread Pool 에 제출하면 2개의 작업은 Thread Pool 에 존재하는 2개의 Thread 에 할당되고 나머지 작업은 큐에서 대기하게 됩니다.

### newCachedThreadPool

`newCachedThreadPool()` 은 필요할 때 마다 Thread 를 생성하는 Thread Pool 입니다.

- `corePoolSize` = 0
- `maximumPoolSize` = `Integer.MAX`
- `keepAliveTime` = 60s
- `workQueue` = `SynchronousQueue`

```java
@Test
void newCachedThreadPoolTest() {
    ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
    executor.submit(sleepThread());
    executor.submit(sleepThread());
    executor.submit(sleepThread());

    assertAll(() -> {
        assertThat(executor.getPoolSize()).isEqualTo(3);
        assertThat(executor.getQueue().size()).isEqualTo(0);
    });
}
```

이런 설정값은 Thread Pool 이 제출된 작업을 수용하기 위해 제한없이 커질 수 있음을 의미합니다. 하지만 Thread 가 더 이상 필요하지 않다면 60초의 시간 이후 모두 제거됩니다.

`newCachedThreadPool()` 은 작업의 삽입과 제거가 한 쌍으로 이루어지는 `SynchronousQueue` 인스턴스를 내부 큐로 사용하고 있기 때문에 실질적인 큐의 크기는 항상 0입니다.

주로 단시간 작업이 많은 애플리케이션에 사용됩니다.

### newSingleThreadExecutor

`newSingleThreadExecutor()` 는 단일 Thread 를 사용하는 Thread Pool 을 생성합니다.

- `corePoolSize` = 1
- `maximumPoolSize` = 1
- `keepAliveTime` = 0
- `workQueue` = `LinkedBlockingQueue*<*Runnable*>*`

```java
@Test
void newSingleThreadExecutorTest() {
    AtomicInteger counter = new AtomicInteger();
    ExecutorService executor = Executors.newSingleThreadExecutor();
    executor.submit(() -> counter.set(1));
    executor.submit(() -> counter.compareAndSet(1, 2));
}
```

이 `ThreadPoolExecutor` 는 순차적으로 수행되며 불변 래퍼 클래스로 포장되어 있기 때문에 생성 후 재구성이 불가능합니다. 때문에 `ThreadPoolExecutor` 클래스로 캐스팅할 수 없습니다.

주로 이벤트 루프를 만드는 데 사용됩니다.

### newScheduledThreadPool

`newScheduledThreadPool()` 은 스케줄링을 위해 `DelayedWorkQueue` 를 사용합니다.

- `corePoolSize` = 지정
- `maximumPoolSize` = `Integer.MAX`
- `keepAliveTime` = 10ms
- `workQueue` = `DelayedWorkQueue`

```java
@Test
void scheduleTest() {
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(5);
    executor.schedule(() -> {
        log.info("Hello World");
    }, 500, TimeUnit.MILLISECONDS);
}
```

위 예시는 Thread Pool 에 있는 Thread 에서 0.5 초 뒤에 Hello World 를 출력합니다.

```java
@Test
void scheduleAtFixedRateTest() throws InterruptedException {
    CountDownLatch lock = new CountDownLatch(3);

    ScheduledExecutorService executor = Executors.newScheduledThreadPool(5);
    ScheduledFuture<?> future = executor.scheduleAtFixedRate(() -> {
        log.info("Hello World");
        lock.countDown();
    }, 500, 100, TimeUnit.MILLISECONDS);

    lock.await(1000, TimeUnit.MILLISECONDS);
    future.cancel(true);
}
```

위 코드는 0.5초 대기 후 매 0.1초 마다 Hello World 를 출력하는 스케줄링 입니다.

## References
---
- [Baeldung - Introduction to Thread Pools in Java](https://www.baeldung.com/thread-pool-java-and-guava)
- [Baeldung - A Guide to the Java ExecutorService](https://www.baeldung.com/java-executor-service-tutorial)
- [Tecoble - Java 에서 스레드 풀(Thread Pool) 을 사용해 보자](https://tecoble.techcourse.co.kr/post/2021-09-18-java-thread-pool/)
