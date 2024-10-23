---
title: EC2 MySQL Installation & Spring App Deployment
date: 2022-06-08 18:00:00 +0900
status: In Progress
draft: false
tags:
  - AWS
  - EC2
---
## 서버 EC2 에서 Spring Boot Application 생성
---
### 서버 EC2 로 cer 인증서 이동

```bash
$ cd 인증서 위치
$ ssh -i key-quaritch.cer ubuntu@13.125.173.161
```

### 레포지토리 폴더 생성 후 프로젝트 폴더 가져오기

```bash
$ mkdir repository
$ cd repository
$ git clone https://github.com/meatsby/jwp-shopping-cart.git
```

## DB EC2 에 MySQL 설치
---
### DB EC2 인스턴스 생성

- 이름: `ec2-크루1-크루2-db`
- 애플리케이션: `Uduntu`
- 인스턴스 유형: `t3.micro`
- 키 페어: `key-quaritch`
- 네트워크 설정
    - VPC: `TECHCOURSE`
    - 서브넷: `TRAINING`
    - 퍼블릭 IP 자동 할당: **비활성화**
    - 보안 그룹: `SG-DEFAULT-DB`
- 태그: `Key: Role, Value: student`

### 서버 EC2 에서 DB EC2 로 cer 인증서 이동 후 접속

```bash
$ scp -i key-quaritch.cer key-quaritch.cer ubuntu@13.125.173.161:/home/ubuntu
$ ssh -i key-quaritch.cer ubuntu@192.168.0.240
```

### MySQL 설치

```bash
$ sudo apt install mysql-server
```

### MySQL 접속

```bash
$ sudo mysql -u root -p
Enter password:
```

### MySQL 사용자 생성 및 권한 설정

```bash
mysql> create user 'paritch'@'%' identified by 'password123!';
mysql> grant all privileges on *.* to 'paritch'@'%' with grant option;
```

### 생성한 사용자로 MySQL 재접속

```bash
mysql> exit;
$ sudo mysql -u paritch -p
Enter password: password123!
```

### MySQL Database 생성

```bash
mysql> create database paritch;
```

### MySQL 외부접속 허용

```bash
// DB EC2 Uduntu 로 이동 후
$ cd /etc/mysql/mysql.conf.d
$ sudo vi mysqld.cnf
// bind-address 를 0.0.0.0 으로 수정 후 :wq
```

### MySQL 재시작

```bash
$ sudo service mysql restart
```

## 서버 EC2 와 DB EC2 연결
---
### `build.gradle` 의존성 변경

```bash
$ cd repository/jwp-shopping-cart
$ vi build.gradle

// h2 의존성 제거 후 mysql 의존성 추가
implementation 'mysql:mysql-connector-java'
```

### `application.properties` 설정 변경

```bash
$ cd repository/jwp-shopping-cart/src/main/resources
$ vi application.properties
$ vi build.gradle

// h2 설정 제거 후 mysql 설정 추가
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://192.168.0.240:3306/paritch?serverTimezone=UTC&characterEncoding=UTF-8
spring.datasource.username=paritch
spring.datasource.password=password123!
```

### 프로젝트 빌드

```bash
$ cd jwp-shopping-cart
$ ./gradlew bootJar
```

### 백그라운드로 프로젝트 실행

```bash
$ cd build/libs
$ java -jar jwp-shopping-cart-0.0.1-SNAPSHOT.jar &
```

### 브라우저에서 프로젝트 실행 확인하기

```bash
http://13.125.173.161:8080/api/products?page=1&limit=12
```

## Shell Script 로 배포 자동화 하기
---
```bash
#!/bin/bash

echo "> 현재 구동중인 application pid 확인"

CURRENT_PID=$(ps -ef | grep java | awk 'print $2')

echo "$CURRENT_PID"

if [ -z $CURRENT_PID ]; then
    echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
    echo ">kill -9 $CURRENT_PID"
    kill -9 $CURRENT_PID
    sleep 10
fi

echo "새 application 배포"

cd repository/jwp-shopping-cart/
git pull
./gradlew bootJar

cd build/libs/
nohup java -jar jwp-shopping-cart-0.0.1-SNAPSHOT.jar >> application.log 2> /dev/null &
```

## References
---
- [https://prolog.techcourse.co.kr/studylogs/1612](https://prolog.techcourse.co.kr/studylogs/1612)
- [https://bibi6666667.tistory.com/312](https://bibi6666667.tistory.com/312)
