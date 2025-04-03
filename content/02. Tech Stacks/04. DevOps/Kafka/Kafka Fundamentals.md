---
title: Kafka Fundamentals
date: 2025-03-25 23:25:30 +0800
status: In Progress
draft: false
tags:
  - Kafka
---
## Kafka 란
---
Apache Kafka 는 Java, Scala 로 작성된 분산 데이터 스트리밍 플랫폼으로 Linkedin 에서 개발하고 Apache 재단에서 관리하고 있다.

### Kafka Broker
- Kafka Broker 는 Kafka Application 을 실행중인 서버 인스턴스다.
- Kafka 기본적으로 3대 이상의 Kafka Broker 클러스터로 구성된다.
- v2.5 까지 주키퍼를 통해 클러스터를 관리했고, v2.8 부터 KRaft 사용.
- n개의 브로커 중 1대는 컨트롤러 기능을 수행한다.
	- 컨트롤러의 역할:
		- 각 브로커에게 담당 파티션 할당
		- 브로커 정상 동작 모니터링
		- 어떤 브로커가 컨트롤러인지는 주키퍼에 저장된다.

### Record
```java
new ProducerRecord<String, String>("topic", "key", "message");
```

```java
ConsumerRecords<String, String> records = consumer.poll(1000);
```
- 객체를 Producer 에서 Consumer 로 전달할 때 Kafka 내부에서 byte 형태로 저장하기 때문에 직렬화/역직렬화가 필요하다.
- Kafka 에서 기본적으로 제공하는 StringSerializer, ShortSerializer 등을 사용할 수 있고, 커스텀 직렬화 클래스를 통해 POJO 도 직렬화/역직렬화가 가능하다.

### Topic & Partition
![[Pasted image 20250329153955.png]]
- 메시지를 Topic 으로 보내면 Partition 을 통해 메시지를 분류할 수 있다.
- 1개의 Topic 은 1개 이상의 Partition 을 가질 수 있다.
- 각 Partition 마다 고유한 Offset 을 가진다.
- 메시지 처리순서는 Partition 별로 각각 유지 및 관리된다.
- Producer 가 Topic 에 메시지를 보내면 메시지는 라운드로빈 또는 Producer 가 지정한 Partition Key 를 활용해 메시지를 저장할 Partition 을 지정할 수 있다.

### Kafka log and segment
- Kakfa 는 다른 메시징 플랫폼과 달리 메시지를 파일시스템에 저장된다.
- 메시지가 저장될 때는 segment 파일이 열려있으며, segment 는 시간 또는 용량 기준으로 닫힌다.
- segment 가 닫힌 이후엔 일정 시간 또는 용량에 따라 삭제 또는 압축된다.

### Partition & Consumer
- Partition 개수 >= Consumer개수
- 즉, 1개의 Consumer 가 3개의 Partition 으로부터 메시지를 컨슈밍 할 수 있고, 3개의 Consumer 가 각각 Partition 을 할당 받아 1:1 로 메시지를 컨슈밍 할 수 있지만, 4개의 Consumer 가 있는 경우 1개의 Consumer 는 놀게된다.
- Consumer 중 1대가 장애가 발생할 경우 Partition 을 다시 할당 받을 Consumer 를 찾기 위해 리밸런싱이 수행된다.
- Consumer 는 목적에 따라 Consumer 그룹으로 분리할 수 있다.

### Broker Partition Replication
- Broker 서버가 다운될 때 데이터 유실을 방지하기 위해 `--replicator-factor 3` 옵션을 통해 Partition 을 다른 Broker 에 복제하여 이슈에 대응한다.
- 즉, 1개의 Topic 을 3개의 Partition 과 3개의 Replicator Factor 로 설정하면, 3개의 Broker 서버에 각각 Partition 3개가 할당되어 총 9개의 Partition 을 가지게된다.
- Partition 복제는 리더와 팔로워로 구성되며, 리더는 Kafka 클라이언트와 직접 데이터를 주고 받고 팔로워는 리더로 부터 레고드를 지속 복제하며 리더가 다운될 경우 팔로워 중 1개가 리더로 선출된다.
	- 리더와 팔로워가 모두 sync 가 맞는 상태를 In-Sync Replica, ISR 이라고 하는데, 만약 ISR 이 아닌 상태에서 장애가 발생하면 팔로워는 리더가 복구될 때 까지 기다려야 하기 때문에 `unclean.leader.election.enable` 옵션을 true 로 설정해서 ISR 상태가 아닌 팔로워도 리더로 선출될 수있게끔 조치하여 다른 레코드를 먼저 처리할 수 있도록 설정할 수 있다.

## Kafka Producer
---
```java
Properties prop = new Properties();
prop.put("bootstrap.servers", "kafka01:9092, kafka01:9092, kafka01:9092");
prop.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
prop.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

KafkaProducer<Integer, String> producer = new KafkaProducer<>(prop);

producer.send(new ProducerRecord<>("topicName", "key", "value"));
producer.send(new ProducerRecord<>("topicName", "value"));

producer.close();
```
- `send()` 를 호출하면 `Serializer` 를 통해 Record 를 byte 로 변환하고 `Partitioner` 를 통해 저장될 파티션을 결정한다.
- 이후 Record 들을 Buffer 에 저장하는데 배치로 묶어서 저장한다.
- 이후 Sender 가 배치를 Kafka Broker 에게 배치를 전송한다.
	- Sender 는 별도의 스레드로 작동한다.
	- 배치가 찼는지 여부에 상관없이 Sender 는 차례대로 Broker 에 전송한다.
	- Sender 가 배치를 전송하는 동안 `send() -> Serializer -> Partitioner` 는 메시지를 배치로 모은다.
- 처리량 관련된 주요 설정
	- `batch.size` 는 배치 크기를 지정하고, 배치가 다 차면 바로 전송한다.
	- `linger.ms` 전송 대기 시간으로 기본값이 0인데, 대기 시간을 주면 설정값만큼 기다렸다가 배치를 전송하고 대기 시간이 없으면 바로 배치를 보낸다.

```java
Future<RecordMetadata> f = producer.send(new ProducerRecord<>("topic", "value"));
try {
	RecordMetadata meta = f.get(); // 블로킹
}
```
- `send()` 는 `Future` 를 반환해서 전송 결과를 확인할 수 있다.
- 하나의 메시지를 보낼때 마다 블로킹되기 때문에 배치에 메시지가 쌓이지 않고 하나씩만 들어가기 때문에 처리량이 저하된다.
- 대신 메시지건별로 확실하게 결과를 알 수 있다.

```java
producer.send(new ProducerRecord<>("topic", "value"),
	new Callback() {
		@Override
		public void onCompletion(RecordMetadata metadata, Exception ex) {
		}
	}
);
```
- 대신 Callback 객체를 전달해서 논블로킹 방식으로 전송을 확인할 수 있다. 때문에 배치가 정상적으로 쌓이기 때문에 처리량 저하가 없다.

### 전송 보장 ack + min.insync.replicas
- 위에서 ISR 에 대해 설명했듯이 메시지가 여러 브로커에 걸쳐 복제되는데, 프로듀서 입장에서 ack 값을 통해 전송 보장을 확인할 수 있다.
	- ack = 0 일 경우 서버의 응답을 기다리지 않기에 전송 보장이 되지 않는다.
	- ack = 1 일 경우 파티션의 리더에 저장되면 브로커로부터 응답이 온다. 때문에 리더에 장애가 나면 메시지가 유실될 수 있다.
	- ack = all 일 경우 모든 리플리카에 저장되면 응답을 받는다. 이때 리플리카는 브로커의 min.insync.replicas 설정에 따라 달라진다.
- 리플리카 개수가 3이고 ack = all 일 때
	- min.insync.replicas = 1 이면, ack = 1 과 동일하게 리더에 저장되면 응답한다.
	- min.insync.replicas = 2 이면, 리더에 저장하고 팔로워 1개에 저장되면 응답한다.
	- min.insync.replicas = 3 이면, 리더와 팔로워 2개가 모두 저장되야 응답한다. 팔로워 중 하나라도 장애가 나면 리플리카 부족으로 저장에 실패한다.

## Kafka Consumer
---
```java
Properties prop = new Properties();
prop.put("bootstrap.servers", "localhost:9092");
prop.put("group.id", "group1"); // 컨슈머그룹 지정
prop.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
prop.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(prop);
consumer.subscribe(Collections.singleton("simple")); // 토픽 구독
while () {
	ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
	for (ConsumerRecord<String, String> record : records) {
		System.out.println(record.value());
		System.out.println(record.topic());
		System.out.println(record.partition());
		System.out.println(record.offset());
	}
}
consumer.close();
```
- 위 코드는 Consumer 가 Partition 으로부터 메시지를 읽어올 때 사용하는 전형적인 코드 구조다.

### Commit & Offset
- `consumer.poll()` 메서드는 이전에 커밋된 오프셋으로부터 메시지를 읽어오고 마지막으로 읽어온 메시지의 오프셋을 기준으로 다시 커밋한다. 이 과정을 반복하여 메시지를 읽어오는 구조다.
- 만약 처음 접근이거나 커밋한 오프셋이 없는 겨우 `auto.offset.reset` 설정을 활용할 수 있다.
	- auto.offset.reset = earliest 의 경우 맨 처음 메시지를 오프셋으로 사용한다.
	- auto.offset.reset = latest 의 경우 기본값으로 적용되며 마지막 메시지를 오프셋으로 사용한다.
	- auto.offset.reset = none 의 경우 컨슈머 그룹에 대한 이전 커밋이 없으면 익셉션이 발생하기에 잘 사용하지 않는다.

### 조회에 영향을 주는 설정
- fetch.min.bytes 설정은 조회 시 브로커가 전송할 최소 데이터 크기를 지정한다.
	- 기본값은 1이며, 이 값이 크면 최소 데이터 크기가 다 찰 때까지 대기하기 때문에 대기 시간은 늘지만 처리량이 증가한다.
- fetch.max.wait.ms 설정은 데이터가 최소 크기가 될 때까지 기다릴 시간을 의미한다.
	- 기본값은 500이며, 브로커가 데이터가 다 찰 때까지 무한정 기다릴 수 없기에 리턴할 때까지 대기하는 시간으로 poll() 메서드의 대기 시간과 다르다.
- max.partition.fetch.bytes 설정은 파티션 당 서버가 리턴할 수 있는 최대 크기를 의미한다.
	- 기본값은 1048576 (1MB)이며 데이터가 이 값을 넘어가면 바로 리턴한다.

### 자동 커밋/수동 커밋
- enable.auto.commit 설정
	- true: 일정 주기로 컨슈머가 읽은 오프셋을 커밋 (기본값)
	- false: 수동으로 커밋 실행
- auto.commit.interval.ms 설정
	- 자동 커밋 주기를 의미하고 기본값은 5000ms 즉, 5초다.
- poll(), close() 메서드 호출 시 자동으로 커밋을 실행한다.

### 수동 커밋 : 동기/비동기 커밋
```java
ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
for (ConsumerRecord<String, String> record : records) {
	// 처리
}
try {
	consumer.commitSync();
} catch (Exception ex) {
	// 커밋 실패 시 에러 발생
}
```
- commitSync() 는 실패 시 익셉션을 발생시키기 때문에 이에 따른 처리가 필요하다.

```java
ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
for (ConsumerRecord<String, String> record : records) {
	// 처리
}
consumer.commitAsync(OffsetCommitCallback callback);
```
- commitAsync() 는 비동기로 커밋하기 때문에 성공 여부를 확인하고 싶으면 callback 을 통해 처리해야 한다.

### 재처리와 순서
- 카프카 사용 시 주의할 점은 컨슈머가 동일한 메시지를 조회할 수 있다는 점이다.
	- 일시적 커밋 실패, 리밸런스 등에 의해 발생한다.
- 때문에 컨슈머는 멱등성(idempotence)을 고려해야 한다.
- 데이터 특성에 따라 타임스탬프, 일련번호 등을 활용해서 멱득성을 구현해줘야한다.

### 세션 타임아웃, 하트비트, 최대 poll 간격
- 컨슈머는 하트비트를 전송해서 연결을 유지한다.
	- 브로커는 일정 시간 컨슈머로부터 하트비트가 없으면 컨슈머를 그룹에서 제외하고 리밸런스를 진행한다.
	- session.timeout.ms: 세션 타임 아웃 시간 (기본값 10초)
	- heartbeat.interval.ms: 하트비트 전송 주기 (기본값 3초), 세션 타임아웃의 1/3 이하를 추천한다.
- max.poll.interval.ms: poll() 메서드의 최대 호출 간격
	- 이 시간이 지나도록 poll() 하지 않으면 컨슈머를 그룹에서 빼고 리밸런스 진행

### 종료 처리
```java
KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(prop);
consumer.subscribe(Collections.singleton("simple")); // 토픽 구독
try {
	while (true) {
		ConsumerRecords<String, String> records = consumer.poll(); // wakeup()
		// records 처리
		try {
			consumer.commitAsync();
		} catch (Exception e) {
			// 커밋 실패 처리
		}
	}
} catch (Exception ex) {
	// Wakeup 익셉션 처리
} finally {
	consumer.close();
}
```
- 일반적으로 컨슈머는 무한루프 안에서 메시지를 받아오기 때문에 `wakeup()` 메서드를 통해 익셉션을 발생시켜 컨슈머를 종료할 수 있다.
- KafkaConsumer 는 Thread-safe 하지 않기 때문에 여러 스레드에서 사용하면 안된다.
	- wakeup() 메서드는 다른 스레드에서 실행해야된다.

## References
---
- [LINE 에서 Kafka 를 사용하는 방법](https://engineering.linecorp.com/ko/blog/how-to-use-kafka-in-line-1/)
- [29CM 로그 수집 시스템 소개](https://medium.com/29cm/29cm-%EB%A1%9C%EA%B7%B8-%EC%88%98%EC%A7%91-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%86%8C%EA%B0%9C-e7955d7deec6)
