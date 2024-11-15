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

## Introduction to Ansible
---
- Provisioning
- Configuration Management
- Continuous Delivery
- Application Deployment
- Security Compliance

머신 설정을 자동화하기 위해 shell script 를 많이 사용하지만 Ansible 이 이런 과정을 쉽게 만들어준다.

## Configuration and Basic Concepts
---
### Introduction to Ansible Configuration Files
```cfg
[defaults]

inventory      = /etc/ansible/hosts
log_path       = /var/log/ansible.log

...

[inventory]

enable_plugins = host_list, virtualbox, yaml, constructed

[privilege_escalation]

...
```
Ansible 을 설치하면 기본적으로 `/etc/ansible/ansible.cfg` 이라는 구성 파일이 생성된다. 이 파일은 Ansible 의 기본적인 동작을 설정하는 파일이다.

여러 Playbook 이 존재해서 각 Playbook 마다 다른 설정값을 주고 싶을 때엔 여러가지 방법으로 줄 수 있는데, 우선순위는 아래와 같다. 아래 순서대로 주어진 설정값들이 우선 적용되고 모두 다 작성하지 않아도 다음 우선순위 파일에 작성된 설정값이 적용된다.
1. `$ANSIBLE_CONFIG=/opt/ansible-web.cfg` 환경변수에 지정된 config 파일
2. `/opt/web-playbooks/ansible.cfg` Playbook 이 실행되는 디렉터리에 있는 config 파일
3. `.ansible.cfg` 유저의 홈 디렉터리에 있는 config 파일
4. `/etc/ansible/ansible.cfg` 기본 config 파일

## References
---
- [IBM Technology - What is Ansible?](https://www.youtube.com/watch?v=fHO1X93e4WA)
- [Ansible for the Absolute Beginner - Hands-On - DevOps](https://www.udemy.com/course/learn-ansible/)
