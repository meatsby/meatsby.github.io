---
title: Cassandra Fundamentals
date: 2025-03-25 23:25:30 +0800
status: In Progress
draft: false
tags:
  - Cassandra
  - NoSQL
  - Database
---
## Cassandra Fundamentals
---
### Cassandra 란
Apache Cassandra 는 Facebook 에서 시작고 현재는 Apache 재단에서 관리하고 있는 오픈소스 분산 NoSQL Database 이다. Java 로 작성되어 있으며 대규모 데이터 처리, High Availability, Scalability 를 SPOF 없이 제공하기 위해 Amazon DynamoDB 의 분산 스토리지 디자인과 Google Bigtable 의 데이터 모델을 조합하여 설계되었다.

### Cassandra 특징
- Masterless 방식으로 구성되어 Cluster 중단 없이 노드를 추가/삭제하여 수평 확장/축소가 가능하다.
- 데이터를 여러 노드에 분산 및 복제하여 저장한다.
- CQL(Cassandra Query Language) 이라는 SQL 과 유사한 쿼리를 사용하지만 JOIN 등 복잡한 연산은 지원하지 않는다.
- Column Family Data Model 을 사용함으로써 WHERE 절에 Key 만 사용 가능하듯 복잡한 쿼리는 지원하지 않지만 단순한 검색 조건으로 대량의 데이터를 검색하기 적합하다.

### Cassandra Architecture
![[Pasted image 20250326222312.png]]
Cassandra 는 모든 노드가 서로 소통할 수 있는 Peer-to-Peer 아키텍처와 모든 노드가 동일한 역할을 하는 Masterless 방식으로 클러스터(또는 Ring)를 이루어 분산 시스템을 구성한다. 각 노드가 동등한 역할을 수행할 수 있기 때문에 클러스터에 노드를 추가함으로써 클러스터를 수평으로 확장하기 용이하다.

![[Pasted image 20250326222451.png]]
Cassandra 에 저장된 데이터는 클러스터 전체에 균등하게 분산되고, 각 노드가 독립적으로 읽기와 쓰기 작업을 처리할 수 있다.

![[Pasted image 20250326225637.png]]
- Cassandra Cluster = Cassandra Ring
- Data Center = Rack 의 논리적인 집합
- Rack = Node 의 논리적인 집합으로 데이터 복제본이 다른 논리적 Rack 에 분산되도록 사용
- Node = Cassandra 를 호스팅하는 서버 인스턴스로 노드끼리 Gossip Protocol 을 통해 통신
- Keyspace = RDBMS 의 Database 역할을 수행하며 하나 이상의 Column Family 를 포함
- Column Family = RDBMS 의 Table 역할을 수행하며 각 Row 마다 다른 Column 을 가질 수 있음
- Column = Key-Value 형태로 저장되며 Key(Column Name) 은 정적, 동적 생성 가능

### Cassandra Data Model
![[Pasted image 20250326222507.png]]
Cassandra 에 저장되는 데이터는 Column Family 에 저장되는데 각 Row 가 Key-Value 로 이루어진 여러개의 Column 을 가질 수 있다. RDBMS 와 달리 Column 이 모두 존재하지 않아도 된다.

![[Pasted image 20250326231702.png]]
Cassandra 의 Primary Key 는 1개 이상의 Partition Key(Row Key) 와 0개 이상의 Cluster Key 로 구성된다. Cassandra 는 데이터를 분산 및 복제하여 저장하기 위해 Partition Key(Row Key) 를 사용해 Hash Token 을 생성하고 해당 Token 에 맞는 노드에 데이터를 분산 및 저장한다. Cluster Key(Sort Key) 는 데이터를 정렬할 때 사용하는 Key 로 데이터가 저장될 때 정렬해서 저장한다.

## Installing Cassandra with Docker
---
### Cassandra Node 2개 생성
```sh
docker pull cassandra:latest
docker network create cassandra
docker run \
  --name cassandra-node1 \
  --network cassandra \
  --rm -d cassandra:latest
docker run \
  --name cassandra-node2 \
  --network cassandra \
  -e CASSANDRA_SEEDS=cassandra-node1 \
  --rm -d cassandra:latest
```

```
 meatsby 👾  ~  docker ps
CONTAINER ID   IMAGE              COMMAND                   CREATED         STATUS         PORTS                                         NAMES
999d64b6b046   cassandra:latest   "docker-entrypoint.s…"   6 seconds ago   Up 6 seconds   7000-7001/tcp, 7199/tcp, 9042/tcp, 9160/tcp   cassandra-node2
bc4d85c6c785   cassandra:latest   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   7000-7001/tcp, 7199/tcp, 9042/tcp, 9160/tcp   cassandra-node1

 meatsby 👾  ~  docker exec -it cassandra-node1 bash
root@bc4d85c6c785:/# nodetool status
Datacenter: datacenter1
=======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address     Load        Tokens  Owns (effective)  Host ID                               Rack
UN  172.20.0.3  119.68 KiB  16      100.0%            8c056774-d514-4991-bf03-0d8e79fd74e0  rack1
UN  172.20.0.2  119.81 KiB  16      100.0%            3a905cff-d969-4f67-a37c-6ec3c7dc171b  rack1

root@bc4d85c6c785:/# cqlsh
Connected to Test Cluster at 127.0.0.1:9042
[cqlsh 6.2.0 | Cassandra 5.0.3 | CQL spec 3.4.7 | Native protocol v5]
Use HELP for help.
```

### Keyspace 생성 및 데이터 저장
```cql
-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS test WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '2' };

-- Create a table
CREATE TABLE IF NOT EXISTS test_table (
userid text PRIMARY KEY,
item_count int,
last_update_timestamp timestamp
);

-- Insert some data
INSERT INTO test_table
(userid, item_count, last_update_timestamp)
VALUES ('9876', 2, toTimeStamp(now()));
INSERT INTO test_table
(userid, item_count, last_update_timestamp)
VALUES ('1234', 5, toTimeStamp(now()));
```

```
root@bc4d85c6c785:/# nodetool status
Datacenter: datacenter1
=======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address     Load        Tokens  Owns (effective)  Host ID                               Rack
UN  172.20.0.3  112.97 KiB  16      100.0%            8c056774-d514-4991-bf03-0d8e79fd74e0  rack1
UN  172.20.0.2  95.8 KiB    16      100.0%            3a905cff-d969-4f67-a37c-6ec3c7dc171b  rack1
```
- `'replication_factor' : '2'` 로 지정해놨기 때문에 모든 노드에 저장된 모습

```
 meatsby 👾  ~  docker ps
CONTAINER ID   IMAGE              COMMAND                   CREATED         STATUS         PORTS                                         NAMES
999d64b6b046   cassandra:latest   "docker-entrypoint.s…"   5 minutes ago   Up 5 minutes   7000-7001/tcp, 7199/tcp, 9042/tcp, 9160/tcp   cassandra-node2
bc4d85c6c785   cassandra:latest   "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   7000-7001/tcp, 7199/tcp, 9042/tcp, 9160/tcp   cassandra-node1

 meatsby 👾  ~  docker stop 99
99

 meatsby 👾  ~  docker ps
CONTAINER ID   IMAGE              COMMAND                   CREATED         STATUS         PORTS                                         NAMES
bc4d85c6c785   cassandra:latest   "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   7000-7001/tcp, 7199/tcp, 9042/tcp, 9160/tcp   cassandra-node1

 meatsby 👾  ~  docker exec -it cassandra-node1 bash
root@bc4d85c6c785:/# nodetool status
Datacenter: datacenter1
=======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address     Load        Tokens  Owns (effective)  Host ID                               Rack
DN  172.20.0.3  112.97 KiB  16      100.0%            8c056774-d514-4991-bf03-0d8e79fd74e0  rack1
UN  172.20.0.2  95.8 KiB    16      100.0%            3a905cff-d969-4f67-a37c-6ec3c7dc171b  rack1

root@bc4d85c6c785:/# cqlsh
Connected to Test Cluster at 127.0.0.1:9042
[cqlsh 6.2.0 | Cassandra 5.0.3 | CQL spec 3.4.7 | Native protocol v5]
Use HELP for help.
cqlsh> use test;

cqlsh:test> select * from test_table;

 userid | item_count | last_update_timestamp
--------+------------+---------------------------------
   1234 |          5 | 2025-03-26 15:38:56.057000+0000
   9876 |          2 | 2025-03-26 15:38:55.600000+0000

(2 rows)
```
- Node2 가 다운됐지만 여전히 데이터가 조회되는 모습
	- `UN` (Up Normal): 노드가 정상적으로 작동 중 (Up & Normal)
	- `DN` (Down Normal): 노드가 정상적으로 토폴로지에 속하지만, 현재 다운됨 (Down & Normal)
	- `UJ` (Up Joining): 새로운 노드가 클러스터에 합류 중
	- `UL` (Up Leaving): 노드가 클러스터에서 떠나는 중    
	- `UM` (Up Moving): 노드가 토큰을 이동하는 중

## References
---
- [Cassandra Documentation](https://cassandra.apache.org/doc/latest/)
