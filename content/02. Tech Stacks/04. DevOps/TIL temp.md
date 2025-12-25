---
title: TIL temp
date: 2025-12-19 23:05:34 +0800
status: In Progress
draft: false
tags:
---
## SLI, SLO, SLA
---
### 개념
서비스 신뢰성을 측정하고 관리하기 위한 핵심 지표들로, 각각의 관계는 SLI → SLO → SLA 순으로 계층적으로 구성된다.

### SLI (Service Level Indicator)
- 서비스 수준을 측정하는 구체적인 지표
- 서비스의 품질을 정량화한 측정값
- 예시:
  - 가용성: 성공한 요청 수 / 전체 요청 수
  - 응답 시간: 500ms 이하로 응답한 요청의 비율
  - 처리량: 초당 처리된 요청 수
  - 에러율: 실패한 요청 수 / 전체 요청 수

### SLO (Service Level Objective)
- SLI를 기반으로 설정한 목표값
- 서비스가 달성해야 하는 신뢰성 목표
- 예시:
  - 월간 가용성 99.9% 이상
  - 95%의 요청이 200ms 이내 응답
  - API 에러율 0.1% 미만
- SLO를 위반하면 에러 예산(Error Budget)이 소진되며, 새 기능 개발보다 안정성 개선에 집중해야 함

### SLA (Service Level Agreement)
- 고객과의 법적 계약으로 명시된 서비스 수준 약속
- SLO보다 여유있게 설정 (일반적으로 SLO보다 낮은 목표)
- SLA 위반 시 보상이나 환불 조항 포함
- 예시:
  - 월간 가용성 99.5% 보장, 미달 시 크레딧 제공
  - 응답 시간 1초 이내 95% 보장

### 관계
```
실제 측정 → SLI (예: 99.95% 가용성)
         ↓
내부 목표 → SLO (예: 99.9% 이상)
         ↓
고객 약속 → SLA (예: 99.5% 보장)
```
SLA 는 SLO 보다 여유있게 설정하여 SLO 내에서 문제를 해결할 수 있는 버퍼를 확보한다. 이를 통해 SLA 위반 전에 내부적으로 대응할 수 있는 시간을 벌 수 있다.

## Linux - Zombie Process
---
### 좀비 프로세스란?
프로세스가 종료될 때 마지막 문장의 실행을 끝내고 exit() 시스템콜을 사용하여 운영체제에게 자신의 삭제를 요청하면서 종료된다. 부모 프로세스는 wait() 시스템콜을 사용해 자식 프로세스의 종료를 기다릴 수 있다. 

프로세스가 종료되면 메모리, CPU 등 사용하던 실행 리소스는 OS가 회수해간다. 하지만 프로세스의 종료 상태가 저장되는 프로세스 테이블의 해당 항목은 부모 프로세스가 wait()을 호출할 때까지 남아있게 된다. 즉, 종료는 되었지만 부모 프로세스가 아직 wait()을 호출하지 않은 프로세스를 좀비 프로세스라고 한다. 

모든 프로세스는 종료 후 좀비 상태가 되지만 일반적으로 아주 짧은 시간 머무르다가 부모 프로세스의 wait() 호출에 의해 프로세스 식별자와 프로세스 테이블의 해당 항목이 OS에 반환된다. 좀비 프로세스는 메모리나 CPU 같은 실행 리소스를 소모하지 않고 프로세스 테이블 엔트리만 점유하기 때문에 소수의 좀비 프로세스는 큰 문제가 되지 않는다. 다만 좀비 프로세스가 많아지면 프로세스 식별자(PID)가 고갈될 수 있으므로 주의가 필요하다.

### 실습
```sh
meatsby@lima-default:~$ ps aux | egrep "Z|defunct"
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root        1970  0.0  0.0      0     0 ?        Z    17:50   0:00 [sshd] <defunct>
meatsby     5053  0.0  0.0   6904  1884 pts/2    S+   17:55   0:00 grep -E --color=auto Z|defunct
```
좀비 프로세스는 `ps aux | egrep "Z|defunct"` 명령어로 필터링하여 확인 가능하다.

```sh
root@lima-default:~# cat zombie.py
import os
import time

cmd = os.popen('ps -ef --no-headers').read()
time.sleep(1000)

root@lima-default:~# python3 zombie.py
```
`os.popen()`은 내부적으로 쉘 프로세스를 생성하여 명령을 실행한다. `.read()`로 출력을 읽은 후 명시적으로 `.close()`를 호출하지 않으면, 쉘 프로세스가 종료된 후에도 부모 프로세스가 wait()을 호출하지 않아 좀비 상태로 남게 된다.

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

- cron 으로 죽이기?
- cron 은 꺼지니까 systemd daemon 으로 실행?

## Linux - mv * 하면 생기는 일
---
```sh
mv *
```
- 하면 해당 디렉터리에 있는 모든 파일 및 디렉터리가 맨 마지막 디렉터리 안으로 들어감
- 다 파일이면? lima 에서 실험해보자

## AWS 로 DMZ 구성
---
gql.api.example.com -> R53 -> CloudFront -> R53(Public Hosted Zone 을 타고 감) -> ALB(Ingress) -> EKS Node Group -> EKS Pod

## References
---
- 
