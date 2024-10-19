---
title: "Linux Commands"
date: 2022-09-16 19:10:00 +0900
status: In Progress
draft: false
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
### 디스크 용량 확인

```bash
df -h
```

### 메모리 확인
```
free -m
```

### 경로 메모리 확인

```bash
sudo du -h --max-depth=1
```

### 파일 권한 확인
```
ls -al
```

### 파일 권한 설정
```
chmod {권한} {변경할 파일 or 디렉토리}
```
- `rwx(User)rwx(Group)rwx(Other)`
- `rwx(421)`

### 심볼릭 링크
```
ln [option] [source] [link]
ln -s  ~/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/Vault\ Name ~/path/to/local
```
- link 의 약자인 `ln` 명령어를 통해 링크파일 생성 가능
- Obsidian 을 사용할 경우 iCloud Drive 를 통해 기기간 연동이 가능한데 로컬에서의 변경사항을 iCloud Drive 내에 링크파일을 생성해서 동기화 및 백업을 수행할 수 있음
