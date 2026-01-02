---
title: Zombie Process
date: 2025-12-23 20:07:13 +0800
status: In Progress
draft: false
tags:
  - Linux
---
## 좀비 프로세스란?
---
프로세스가 종료될 때 마지막 문장의 실행을 끝내고 `exit()` 시스템콜을 사용하여 운영체제에게 자신의 삭제를 요청하면서 종료된다. 부모 프로세스는 `wait()` 시스템콜을 사용해 자식 프로세스의 종료를 기다릴 수 있다. 

프로세스가 종료되면 메모리, CPU 등 사용하던 실행 리소스는 OS가 회수해간다. 하지만 프로세스의 종료 상태가 저장되는 프로세스 테이블의 해당 항목은 부모 프로세스가 `wait()`을 호출할 때까지 남아있게 된다. 즉, 종료는 되었지만 부모 프로세스가 아직 `wait()`을 호출하지 않은 프로세스를 좀비 프로세스라고 한다. 

모든 프로세스는 종료 후 좀비 상태가 되지만 일반적으로 아주 짧은 시간 머무르다가 부모 프로세스의 `wait()` 호출에 의해 프로세스 식별자와 프로세스 테이블의 해당 항목이 OS에 반환된다. 좀비 프로세스는 메모리나 CPU 같은 실행 리소스를 소모하지 않고 프로세스 테이블 엔트리만 점유하기 때문에 소수의 좀비 프로세스는 큰 문제가 되지 않는다. 다만 좀비 프로세스가 많아지면 프로세스 식별자(PID)가 고갈될 수 있으므로 주의가 필요하다.

## 좀비 프로세스 확인
---
### 좀비 프로세스 필터링
```bash
ps aux | egrep "Z|defunct"
```

```sh
meatsby@lima-default:~$ ps aux | egrep "Z|defunct"
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root        1970  0.0  0.0      0     0 ?        Z    17:50   0:00 [sshd] <defunct>
meatsby     5053  0.0  0.0   6904  1884 pts/2    S+   17:55   0:00 grep -E --color=auto Z|defunct
```

좀비 프로세스는 `ps aux | egrep "Z|defunct"` 명령어로 필터링하여 확인할 수 있다.

## 실습: 좀비 프로세스 생성
---
### 테스트 스크립트 작성
```python
# zombie.py
import os
import time

cmd = os.popen('ps -ef --no-headers').read()
time.sleep(1000)
```

`os.popen()`은 내부적으로 쉘 프로세스를 생성하여 명령을 실행한다. `.read()`로 출력을 읽은 후 명시적으로 `.close()`를 호출하지 않으면, 쉘 프로세스가 종료된 후에도 부모 프로세스가 `wait()`을 호출하지 않아 좀비 상태로 남게 된다.

### 스크립트 실행
```bash
python3 zombie.py
```

### 좀비 프로세스 확인
```sh
meatsby@lima-default:~$ ps -ef | grep zombie
root        5133    4989  0 18:03 pts/1    00:00:00 python3 zombie.py
meatsby     5143    5000  0 18:04 pts/2    00:00:00 grep --color=auto zombie

meatsby@lima-default:~$ ps -ef | grep 5133
root        5133    4989  0 18:03 pts/1    00:00:00 python3 zombie.py
root        5134    5133  0 18:03 pts/1    00:00:00 [sh] <defunct>
meatsby     5145    5000  0 18:04 pts/2    00:00:00 grep --color=auto 5133

meatsby@lima-default:~$ ps aux | egrep "Z|defunct"
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root        1970  0.0  0.0      0     0 ?        Z    17:50   0:00 [sshd] <defunct>
root        5134  0.0  0.0      0     0 pts/1    Z+   18:03   0:00 [sh] <defunct>
meatsby     5147  0.0  0.0   6904  1864 pts/2    S+   18:04   0:00 grep -E --color=auto Z|defunct
```

PID 5133 파이썬 부모 프로세스가 `os.popen()`으로 실행한 sh 프로세스(PID 5134)가 종료 후 좀비 상태로 남아있는 것을 확인할 수 있다.

## References
---
- 
