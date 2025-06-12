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
- 우리는 Shell 을 통해 Kernel 에 명령을 내린다. 즉, 유저와 Kernel 사이의 인터페이스
- 우리가 ls 를 입력하면 Shell 은 Kernel 이 이해할 수 있는 명령으로 변환한다. 일종의 명령어 인터프리터인셈
- 대표적으로 sh, bash, zsh 등이 있다.
	- sh 은 가장 오래된 UNIX 시스템의 표준 Shell 로 계량형인 bash, zsh 등이 있다.
	- bash 는 Linux 에서 기본으로 제공되는 Shell 이다. `/bin/bash` 에 위치한다.
	- zsh 은 macOS Catalina 이후 제공되는 기본 Shell 로 `oh-my-zsh` 등 플러그인을 통해 사용자 편의 기능이 많이 제공된다. `/bin/zsh` 에 위치한다.
```sh
echo $SHELL
/bin/zsh
```
- 위 명령어를 통해 현재 사용중인 Shell 을 확인할 수 있다.
- CLI 또는 GUI 로 제공되는데, CLI 는 우리가 흔히 사용하는 Terminal 이고, GUI 는 윈도우 탐색기, macOS 의 Finder 가 해당된다.

### Terminal
- Shell 을 실행하는 입출력 창이다.
- 실제로 우리가 키보드로 명령어를 입력하는 인터페이스
- 대표적으로 iTerm2 가 있다.
