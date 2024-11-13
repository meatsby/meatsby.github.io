---
title: Ansible
date: 2024-08-12 21:13:02 +0800
status: In Progress
draft: false
tags:
  - IaC
  - Ansible
---
## Ansible
---
Redhat 에서 Python 으로 개발한 Provisioning 자동화 도구로 YAML 로 작성된 파일을 통해 Docker, EC2 등에 대한 설정을 관리할 수 있다.

Ansible 은 여러대의 VM 의 집합을 Inventory 라고 부르고 각 VM 들을 host 라고 부른다. 가령 3대의 VM 의 집합을 Inventory 라고 했을 때, 2대의 VM 은 Web 을 호스팅하는 host 로 구분짓고 나머지 1대를 DB 를 호스팅하는 host 로 구분 지을 수 있다.

Ansible 은 주어진 Inventory 내 host 들을 provisioning 하고 config 을 관리하기 위해 Playbook 이라는 일종의 설정 파일을 사용하여 VM 을 선언적으로 관리한다. Playbook 은 Play 의 집합으로 Play 에는 해당 설정이 적용될 host 그룹과 그 그룹에 적용될 작업들을 나열하는 Tasks 와 Roles 가 존재한다.

Ansible 은 VM 에 필요한 설정과 커맨드를 실행하기 위해 VM 에 agent 를 설치하는 대신 ssh 연결을 통해 원격으로 VM 을 설정할 수 있다. 또한 설정 작업이 여러번 반복되도 동일한 결과를 도출하도록 Idempotency 를 보장한다.

## References
---
- [IBM Technology - What is Ansible?](https://www.youtube.com/watch?v=fHO1X93e4WA)
