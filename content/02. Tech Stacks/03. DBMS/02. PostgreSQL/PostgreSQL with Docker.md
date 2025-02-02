---
title: PostgreSQL with Docker
date: 2025-02-01 23:27:21 +0800
status: In Progress
draft: false
tags:
  - Database
  - PostgreSQL
---
## PostgreSQL with Docker
---
```bash
docker pull postgres
```
- PostgreSQL image 를 당겨오자.

```bash
docker images
```
- Image 가 잘 들어왔는지 확인하고,

```bash
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD="password" --name PostgresTest postgres
```
- Image 를 실행하자.
	- `-d` 옵션으로 detached mode 로 background 에서 실행하고
	- `-p 5432:5432` 옵션으로 port mapping 해주고
	- `-e POSTGRES_PASSWORD="password"` 옵션으로 환경변수에 원하는 DB password 를 지정하고
	- `--name PostgresTest` 옵션으로 컨테이너 이름을 지정해주자

```bash
sudo docker exec --user="root" -it PostgresTest "bash"
```
- 실행된 컨테이너로 진입해서,
	- `--user="root"` 옵션으로 root user 로 지정하고
	- `-it` 옵션으로 컨테이너 쉘을 열어주자

```bash
psql -U postgres
```
- PostgreSQL 을 실행하고,
	- `-U postgres` 옵션으로 superuser 인 postgres 로 들어가자

```bash
\l
```
- 기본 database 들을 확인해주고,

```bash
CREATE DATABASE test_db;
```
- 테스트용 database 를 만들어주자.

```bash
\c test_db
```
- 테스트용 database 를 선택하고,

```bash
\dt
```
- JPA 가 생성한 table 들을 확인하자.

```bash
\q
```
- PostgreSQL 에서 나오고,

```bash
exit
```
- 컨테이너에서 나오자.

```bash
docker stop {CONTAINER_ID}
```
- 컨테이너를 멈춰주고,

```bash
docker container restart {CONTAINER_ID}
```
- 필요할 때 다시 재시작해주자.

```bash
docker rm {CONTAINER_ID}
```
- 컨테이너를 제거하면 내부 데이터도 모두 제거되기 때문에 Mount 를 연결하는 것 역시 고려할 수 있다.

## pgAdmin with Docker
---
![[Screenshot 2025-02-02 at 12.01.57 AM.png]]
- pgAdmin 실행 후 Add New Server

![[Screenshot 2025-02-02 at 12.04.25 AM.png]]
- General 탭에서 Server 이름을 정해주고

![[Screenshot 2025-02-02 at 12.06.29 AM.png]]
- Connection 탭에서 컨테이너의 주소와 환경변수 `POSTGRES_PASSWORD` 에 설정한 비밀번호를 지정한 뒤 저장하면

![[Screenshot 2025-02-02 at 12.13.49 AM.png]]
- pgAdmin 과 PostgreSQL 컨테이너가 연결된 것을 확인할 수 있다.
- 미리 생성해둔 test_db 에서 Query Tool 을 열어 SQL 쿼리를 날려보자.

## References
---
- 
