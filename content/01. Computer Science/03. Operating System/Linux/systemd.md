---
title: systemd
date: 2024-11-20 22:10:22 +0800
status: In Progress
draft: false
tags:
  - Linux
---
## systemd 란
---
systemd(system daemon)은 Unix 시스템 부팅 후 가장 먼저 생성된 후 다른 프로세스를 실행하는 init 역할을 하는 데몬이다. RedHat 에서 개발을 시작했고 대부분의 리눅스 시스템에 공식적으로 채택되어 사용중이다.

systemd 는 PID 1번을 갖으며 부팅부터 서비스관리, 로그관리 등을 담당한다. 부팅 시 병렬로 실행되기 때문에 부팅속도 역시 빠르다.

부팅 시 필요한 작업을 systemd unit 으로 등록하여 사용할 수 있으며, 해당 파일들은 `/etc/systemd/system` 에 위치한다.

### systemd Unit 파일 구조
```
[Unit]
Description=Systemd Test

[Service]
ExecStart=/usr/local/bin/example.sh

[Install]
WantedBy=multi-user.target
```

### systemd 파일의 섹션
- Unit
	- Description: 서비스 설명
- Service
	- ExecStart: 서비스를 시작하기 위한 실행파일
- Timer
- Install
- ...

## References
---
- 
