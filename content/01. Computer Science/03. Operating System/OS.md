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
![[Pasted image 20250812162512.png]]
- Operating System, OS 는 일반적으로 하드웨어를 제어하기 위한 소프트웨어인 Windows, Linux 정도로 알려져있다.
- 컨테이너를 제대로 이해하기 위해선 컨테이너화 기술의 기반인 Linux 를 제대로 이해해야하고, Linux 를 제대로 이해하려면 OS 를 구체적으로 알아야 한다.
- OS 의 구조는 크게 Kernel, Shell, System Program 으로 이루어져있다. 운영체제의 3요소다.

### Kernel
- Kernel 은 실제로 하드웨어를 제어한다.
- CPU, 메모리, 파일 시스템, 네트워크 등을 관리한다.
- 운영체제의 핵심이다.
- Application 은 system call 을 통해 Kernel 과 소통하는 것.
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
- CLI 또는 GUI 로 제공되는데, CLI 는 우리가 흔히 사용하는 Terminal 이고, GUI 는 윈도우 탐색기, macOS 의 Finder 가 해당된다. 크게보면 바탕화면도 GUI Shell 이다.
- Terminal 은 Shell 을 실행하는 입출력 창이다.
	- 실제로 우리가 키보드로 명령어를 입력하는 인터페이스
	- 대표적으로 iTerm2 가 있다.

### System Program
- Kernel 과 Shell 을 이용한 프로그램이다. Application Software, 그러니까 응용 프로그램이 아닌 System Software, 컴퓨터 시스템 자체를 제어하기 위한 프로그램이다.
- 개발자들이 흔히 사용하는 Java, Python 등 고수준 언어를 사용해 응용 프로그램을 개발하는 과정에서 하드웨어를 직접적으로 제어하는 코드를 작성하진 않는다. System Software 가 이 간극을 메꿔주기 때문이다.
- System Software 는 자신이 Kernel 을 직접 호출하고 하드웨어 자원을 조작하고, 다른 프로그램이 그 기능을 쉽게 사용할 수 있도록 추상화된 인터페이스를 제공한다.
- System Call 은 Kernel 에 명령을 전달하기 위해 있는 인터페이스다.
- System Call 이 운영체제의 서비스를 정의하기 때문에 엄밀히 말해, System Call 이 곧 운영체제다.
- System Programming 은 System Call 을 다루는 프로그래밍이라고 볼 수 있다.
- C 에서 read() 함수는 파일을 읽는 System Call 이다. read() 함수가 실행되는 순간, Kernel 에 System Call 이 전달된다. 이때 실행의 제어권이 User Mode 에서 Kernel Mode 로 넘어간다.
- System Programming 한다는 말은 곧 C 로 프로그래밍 한다는 뜻
- 복잡한 System Call 을 쉽게 사용하기 위해 한 단계 더 추상화된 라이브러리 함수를 통해 System Call 을 사용할 수 있다.
- Shell 을 통해서도 Kernel 에 System Call 을 호출할 수 있다.
- ls 는 System Software 다. Shell 에서 ls 명령어를 호출하면 쉘은 ls 라는 프로그램을 실행하는 것. 실행된 ls 는 C 라이브러리 함수나 System Call 을 호출해서 디렉터리 내 파일 정보를 가져와 출력한다.
- 프로그래밍은 결국엔 하드웨어를 제어하기 위한 Kernel 을 호출하기 위한 System Call 을 사용하기 위한 일을 하고 있는 셈이고, System Call 을 직접 호출하거나 한 단계 추상화된 라이브러리 함수 또는 쉘을 사용해 하드웨어를 제어하는 것이다.

## Linux
---
- 그렇다면 Linux 는 OS 인가?
- Linux 는 대충 OS 라고 한다.
- 사실 Linux 를 정확하게 얘기하면 Kernel 이다.
- OS 를 구성하기 위해선 위에서 설명한 3요소가 모두 갖춰져야한다.
- Linux 는 Kernel 만 만들었기 때문에 OS 라고 부르기엔 Shell 이랑 System Program 이 부족한 상태인 것.
- 그래서 Shell 과 System Program 은 Open Source 에서 가져와서 Linux OS 를 만들 것이다.
- 이런 특성 때문에 Kernel 은 Linux 를 사용하되 각기 다른 Shell 과 System Program 을 포함하여 만든 것들이 RedHat 의 CentOS, Fedora, Debian 의 Ubuntu, Amazon 의 Amazon Linux 등의 Linux 배포판이다.

## File System
---
- 컴퓨터는 정보를 체계적으로 저장하기 위해 File System 을 사용한다.
- 대표적으로 Linux 는 ext2/3/4 등의 File System 을 사용한다.

### 메타데이터 관리
- 파일에 대한 데이터를 저장한다.
	- 파일 크기
	- 만들어진 시각
	- 마지막 접근 시각
	- 변경된 시각
	- 파일 소유자
	- 파일 접근 모드
- 유닉스 계열에서 메타데이터를 저장하는 자료구조를 i-node 라고 부른다.
- 때문에 ls -i 명령어를 쳤을 때 i-node 번호가 포함되는 것

### 모든 것이 파일이다
- 유닉스에선 모든 것을 파일로 관리한다. 일반적으로 파일은 프로그램이나 데이터를 저장하는데 사용하는데, 유닉스에선 저장 장치, 입출력 장치, 네트워크 통신도 모두 파일로 관리한다.
- 이제서야.. 소켓이 결국 파일이라는 말을 정확하게 이해하게 되었다. 당시엔 대강 이해하기만 했는데 확실히 CS 가 중요하다. 결국 Kernel 입장에선 어떤 하드웨어든 정보를 전달하기만 하면된다. 때문에 파일이라는 이름의 인터페이스에 데이터를 던지는 것이다. 받는 대상이 디스크면 데이터가 저장될 것이고, 소켓이면 네트워크를 통해 데이터가 전송되는 차이일 뿐.
