---
title: "Linux Commands"
date: 2022-09-16 19:10:00 +0900
status: In Progress
tags:
  - Linux
---

### 로그 파일 생성 없이, 세션 종료 없이 백그라운드 실행

```bash
nohup {실행파일} 1>/dev/null 2>&1 &
```

### 저장 안하고 나가기

```bash
# E37: No write since last change (add ! to override) 발생 시
:q!
```

### 실행중인 프로세스 확인

```bash
ps -ef | grep {패턴}
```

### 특정 PORT 사용 프로세스 확인

```bash
lsof -i:8080
```

### 로그 파일 확인

```bash
tail -f {로그 파일 경로}
```

### 파일 작성
```bash
cat << EOF > /home/ec2-user/{파일이름}
#!/usr/bin/python
...
EOF
```

### SCP 파일 전송
```
scp -rp -i ssh-key-2023-08-09.key {파일} opc@129.154.55.231:/home/opc
```

### SSH 접속
```
ssh -i ssh-key-2023-08-09.key opc@129.154.55.231
```

## Insufficient space for shared memory file

---

### 메모리 확인

```bash
df -h
```

### 경로 메모리 확인

```bash
sudo du -h --max-depth=1
```
