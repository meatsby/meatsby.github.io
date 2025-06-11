---
title: OS
date: 2025-06-08 19:12:37 +0800
status: In Progress
draft: false
tags:
  - OS
---
## OS
---
- Operating System, OS 는 일반적으로 하드웨어를 제어하기 위한 소프트웨어인 Windows, Linux 정도로 알려져있다.
- 컨테이너를 제대로 이해하기 위해선 컨테이너화 기술의 기반인 Linux 를 제대로 이해해야하고, Linux 를 제대로 이해하려면 OS 를 구체적으로 알아야 한다.
- OS 를 자세히 들여다보면 Kernel 과 Shell 로 이루어져있다.

### Kernel
- Kernel 은 실제로 하드웨어를 제어한다.
- CPU, 메모리, 파일 시스템, 네트워크 등을 관리한다.
- 대표적으로 Linux Kernel 이 있다.

### Shell
- 우리는 Shell 을 통해 Kernel 에 명령을 내린다.
- 우리가 ls 를 입력하면 Shell 은 Kernel 이 이해할 수 있는 명령으로 변환한다. 일종의 명령어 인터프리터인셈
- 대표적으로 bash, zsh 등이 있다.

### Terminal
- Shell 을 실행하는 입출력 창이다.
- 실제로 우리가 키보드로 명령어를 입력하는 인터페이스
- 대표적으로 iTerm2 가 있다.
