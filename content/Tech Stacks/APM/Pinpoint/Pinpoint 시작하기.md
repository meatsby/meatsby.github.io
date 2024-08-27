---
title: "Pinpoint 시작하기"
date: 2022-09-16 20:20:00 +0900
status: In Progress
draft: false
tags:
  - Pinpoint
---
## Pinpoint Collector 인스턴스
---
### GCP Compute Engine 인스턴스 생성

![[GCP Machine Config.png]]

![[Disk Config.png]]

![[API Config.png]]

### VPC 방화벽 정책 추가

![[VPC FW Policy.png]]

![[Creating FW Rule.png]]

![[VPC Network Config.png]]

### Java 8 설치

```bash
sudo apt-get update
sudo apt-get install openjdk-8-jdk

sudo vi /etc/profile

# 맨 아래 추가
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```

### HBase 설치

```bash
wget https://archive.apache.org/dist/hbase/1.2.7/hbase-1.2.7-bin.tar.gz

tar xzvf hbase-1.2.7-bin.tar.gz

vi hbase-1.2.7/conf/hbase-env.sh

# 이 옵션을 주석처리 하지 않으면 hbase 실행시 warning 발생
# 두 옵션 모두 주석처리
# export HBASE_MASTER_OPTS="$HBASE_MASTER_OPTS -XX:PermSize=128m -XX:MaxPermSize=128m"
# export HBASE_REGIONSERVER_OPTS="$HBASE_REGIONSERVER_OPTS -XX:PermSize=128m -XX:MaxPermSize=128m"

# 이름이 hbase인 동기화 폴더 생성
ln -s hbase-1.2.7 hbase

# hbase 실행
./hbase/bin/start-hbase.sh
```

### Pinpoint 정보를 담을 테이블 생성

```bash
# 스크립트 다운
wget https://raw.githubusercontent.com/pinpoint-apm/pinpoint/master/hbase/scripts/hbase-create.hbase

# 스크립트 실행
hbase/bin/hbase shell ../hbase-create.hbase
```

### Pinpoint Collector 설치

```bash
# jar 파일 다운
wget https://github.com/pinpoint-apm/pinpoint/releases/download/v2.2.2/pinpoint-collector-boot-2.2.2.jar

# 실행권한 부여
chmod +x pinpoint-collector-boot-2.2.2.jar

# 실행
# -Dpinpoint.zookeeper.address={Hbase 주소}
nohup java -jar -Dpinpoint.zookeeper.address=localhost pinpoint-collector-boot-2.2.2.jar >/dev/null 2>&1 &
```

### Pinpoint Web 설치

```bash
# jar 파일 다운
wget https://github.com/pinpoint-apm/pinpoint/releases/download/v2.2.2/pinpoint-web-boot-2.2.2.jar

# 실행 권한 부여
chmod +x pinpoint-web-boot-2.2.2.jar

# 실행
# -Dpinpoint.zookeeper.address={Hbase 주소}
nohup java -jar -Dpinpoint.zookeeper.address=localhost pinpoint-web-boot-2.2.2.jar >/dev/null 2>&1 &
```

### Pinpoint Web 접속

![[Pinpoint Web.png]]

- `{Instance Public IP}:8080/main` 접속 후 빈 화면이 보이면 성공

## WAS EC2 인스턴스
---
### Pinpoint Agent 설치

```bash
# agent 설치
wget https://github.com/pinpoint-apm/pinpoint/releases/download/v2.2.2/pinpoint-agent-2.2.2.tar.gz

# 압축 해제
tar xvzf pinpoint-agent-2.2.2.tar.gz

# config 파일 수정
sudo vi pinpoint-agent-2.2.2/pinpoint-root.config

# 127.0.0.1 에서 Collector IP 로 수정
# profiler.transport.grpc.collector.ip={xxx.xxx.xxx.xxx}

# agent + was 실행
sudo nohup java -jar -javaagent:pinpoint-agent-2.2.2/pinpoint-bootstrap-2.2.2.jar -Dpinpoint.agentId=gongcheck-dev -Dpinpoint.applicationName=GONGCHECK-DEV -Dpinpoint.config=pinpoint-agent-2.2.2/pinpoint-root.config deploy/gong-check-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev 2>> /dev/null >> /dev/null &
```

### Pinpoint 확인

![[Pinpoint.png]]

## 트러블 슈팅
---
```bash
09-15 12:18:36.036 [-Executor(12-0)] WARN  c.n.p.p.r.g.GrpcCommandService           -- Failed to command stream, cause=UNAVAILABLE: io exception
io.grpc.StatusRuntimeException: UNAVAILABLE: io exception
	at io.grpc.Status.asRuntimeException(Status.java:533) ~[grpc-api-1.33.1.jar:1.33.1]
	at io.grpc.stub.ClientCalls$StreamObserverToCallListenerAdapter.onClose(ClientCalls.java:478) [grpc-stub-1.33.1.jar:1.33.1]
	at io.grpc.internal.ClientCallImpl.closeObserver(ClientCallImpl.java:617) [grpc-core-1.33.1.jar:1.33.1]
	at io.grpc.internal.ClientCallImpl.access$300(ClientCallImpl.java:70) [grpc-core-1.33.1.jar:1.33.1]
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInternal(ClientCallImpl.java:803) [grpc-core-1.33.1.jar:1.33.1]
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInContext(ClientCallImpl.java:782) [grpc-core-1.33.1.jar:1.33.1]
	at io.grpc.internal.ContextRunnable.run(ContextRunnable.java:37) [grpc-core-1.33.1.jar:1.33.1]
	at io.grpc.internal.SerializingExecutor.run(SerializingExecutor.java:123) [grpc-core-1.33.1.jar:1.33.1]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128) [?:?]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628) [?:?]
	at java.lang.Thread.run(Thread.java:829) [?:?]
Caused by: io.netty.channel.ConnectTimeoutException: connection timed out: /{Collector IP xxx.xxx.xxx.xxx}:9991
	at io.netty.channel.nio.AbstractNioChannel$AbstractNioUnsafe$1.run(AbstractNioChannel.java:261) ~[netty-transport-4.1.51.Final.jar:4.1.51.Final]
	at io.netty.util.concurrent.PromiseTask.runTask(PromiseTask.java:98) ~[netty-common-4.1.51.Final.jar:4.1.51.Final]
	at io.netty.util.concurrent.ScheduledFutureTask.run(ScheduledFutureTask.java:170) ~[netty-common-4.1.51.Final.jar:4.1.51.Final]
	at io.netty.util.concurrent.AbstractEventExecutor.safeExecute(AbstractEventExecutor.java:164) ~[netty-common-4.1.51.Final.jar:4.1.51.Final]
	at io.netty.util.concurrent.SingleThreadEventExecutor.runAllTasks(SingleThreadEventExecutor.java:472) ~[netty-common-4.1.51.Final.jar:4.1.51.Final]
	at io.netty.channel.nio.NioEventLoop.run(NioEventLoop.java:500) ~[netty-transport-4.1.51.Final.jar:4.1.51.Final]
	at io.netty.util.concurrent.SingleThreadEventExecutor$4.run(SingleThreadEventExecutor.java:989) ~[netty-common-4.1.51.Final.jar:4.1.51.Final]
	at io.netty.util.internal.ThreadExecutorMap$2.run(ThreadExecutorMap.java:74) ~[netty-common-4.1.51.Final.jar:4.1.51.Final]
	... 3 more
```

- `connection timed out: /{Collector IP xxx.xxx.xxx.xxx}:9991` 방화벽 설정을 추가해야 한다.

## References
---
- [https://backtony.github.io/spring/2021-10-24-spring-test-4/](https://backtony.github.io/spring/2021-10-24-spring-test-4/)
- [https://bkjeon1614.tistory.com/662](https://bkjeon1614.tistory.com/662)
- [https://yamerong.tistory.com/55](https://yamerong.tistory.com/55)
