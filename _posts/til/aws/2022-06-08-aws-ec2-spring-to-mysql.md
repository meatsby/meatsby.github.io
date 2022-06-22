---
title: '[AWS] AWS EC2 에 MySQL 설치 및 Spring Application 배포'
author: meatsby
date: 2022-06-08 10:00:00 +0900
categories: [TIL, AWS]
tags: [WoowaCourse, 학습로그, AWS, Spring, MySQL]
---

## 서버 EC2 에서 Spring Boot Application 생성

---

### 서버 EC2 로 cer 인증서 이동

```java
$ cd 인증서 위치
$ ssh -i {key 파일} ubuntu@{서버 IP}
```

### 레포지토리 폴더 생성 후 프로젝트 폴더 가져오기

```java
$ mkdir repository
$ cd repository
$ git clone {서버 GitHub Repository}
```

<br>

## DB EC2 에 MySQL 설치

---

### DB EC2 인스턴스 생성

- 이름: `ec2-db`
- 애플리케이션: `Uduntu`
- 인스턴스 유형: `t3.micro`
- 키 페어: `key 파일 이름`
- 네트워크 설정
    - VPC: `TECHCOURSE`
    - 서브넷: `TRAINING`
    - 퍼블릭 IP 자동 할당: **비활성화**
    - 보안 그룹: `SG-DEFAULT-DB`
- 태그: `Key: Role, Value: student`

### 서버 EC2 에서 DB EC2 로 cer 인증서 이동 후 접속

```jsx
$ scp -i {key 파일} {key 파일} ubuntu@{서버 IP}:/home/ubuntu
$ ssh -i {key 파일} ubuntu@{DB IP}
```

### MySQL 설치

```jsx
$ sudo apt install mysql-server
```

### MySQL 접속

```jsx
$ sudo mysql -u root -p
Enter password:
```

### MySQL 사용자 생성 및 권한 설정

```jsx
mysql> create user '유저 이름'@'%' identified by '비밀번호';
mysql> grant all privileges on *.* to '유저 이름'@'%' with grant option;
```

### 생성한 사용자로 MySQL 재접속

```jsx
mysql> exit;
$ sudo mysql -u '유저 이름' -p
Enter password: '비밀번호'
```

### MySQL Database 생성

```jsx
mysql> create database 'DB 이름';
```

### MySQL 외부접속 허용

```jsx
// DB EC2 Uduntu 로 이동 후
$ cd /etc/mysql/mysql.conf.d
$ sudo vi mysqld.cnf
// bind-address 를 0.0.0.0 으로 수정 후 :wq
```

### MySQL 재시작

```jsx
$ sudo service mysql restart
```

<br>

## 서버 EC2 와 DB EC2 연결

---

### `build.gradle` 의존성 변경

```jsx
$ cd repository/{서버 Repository 폴더}
$ vi build.gradle

// h2 의존성 제거 후 mysql 의존성 추가
implementation 'mysql:mysql-connector-java'
```

### `application.properties` 설정 변경

```jsx
$ cd repository/{서버 Repository 폴더}/src/main/resources
$ vi application.properties
$ vi build.gradle

// h2 설정 제거 후 mysql 설정 추가
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://{DB IP}:3306/{DB 이름}?serverTimezone=UTC&characterEncoding=UTF-8
spring.datasource.username={유저 이름}
spring.datasource.password={비밀번호}
```

### 프로젝트 빌드

```jsx
$ cd {서버 Repository 폴더}
$ ./gradlew bootJar
```

### 백그라운드로 프로젝트 실행

```java
$ cd build/libs
$ java -jar {서버 Repository 폴더}-0.0.1-SNAPSHOT.jar &
```

### 브라우저에서 프로젝트 실행 확인하기

```java
http://{서버 Public IP}:8080/api/products?page=1&limit=12
```

<br>

## Shell Script 로 배포 자동화 하기

---

```jsx
cd repository/{서버 Repository 폴더}/
./gradlew bootJar

// ./gradlew build jar
// 테스트를 제외하고 빌드하려면 ./gradlew build jar -x test

cd build/libs/
nohup java -jar {서버 Repository 폴더}-0.0.1-SNAPSHOT.jar >> application.log 2> /dev/null &

// 실행중인 자바 프로세스 확인
ps -ef | grep java

// 실행중인 자바 프로세스 종료
kill -9 PID번호
```