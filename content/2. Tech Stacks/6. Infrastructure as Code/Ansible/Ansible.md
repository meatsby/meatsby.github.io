---
title: Ansible
date: 2024-08-12 21:13:02 +0800
status: In Progress
draft: false
tags:
  - IaC
  - Ansible
---
## Introduction to Ansible
---
### 특징
- Provisioning
- Configuration Management
- Continuous Delivery
- Application Deployment
- Security Compliance

Redhat 에서 Python 으로 개발한 Provisioning 자동화 도구로 YAML 로 작성된 파일을 통해 Docker, EC2 등에 대한 설정을 관리할 수 있다. 머신 설정을 자동화하기 위해 shell script 를 많이 사용하지만 Ansible 이 이런 과정을 쉽게 만들어준다.

Ansible 은 여러대의 VM 의 집합을 Inventory 라고 부르고 각 VM 들을 host 라고 부른다. 가령 3대의 VM 의 집합을 Inventory 라고 했을 때, 2대의 VM 은 Web 을 호스팅하는 host 로 구분짓고 나머지 1대를 DB 를 호스팅하는 host 로 구분 지을 수 있다.

Ansible 은 주어진 Inventory 내 host 들을 provisioning 하고 config 을 관리하기 위해 Playbook 이라는 일종의 설정 파일을 사용하여 VM 을 선언적으로 관리한다. Playbook 은 Play 의 집합으로 Play 에는 해당 설정이 적용될 host 그룹과 그 그룹에 적용될 작업들을 나열하는 Tasks 와 Roles 가 존재한다.

Ansible 은 VM 에 필요한 설정과 커맨드를 실행하기 위해 VM 에 agent 를 설치하는 대신 ssh 연결을 통해 원격으로 VM 을 설정할 수 있다. 또한 설정 작업이 여러번 반복되도 동일한 결과를 도출하도록 Idempotency 를 보장한다.

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

## Ansible Inventory
---
```ini
server1.company.com
server2.company.com

[mail]
server3.company.com
server4.company.com

[db]
server5.company.com
server6.company.com

[web]
server7.company.com
server8.company.com
```
Ansible 은 1대 또는 여러대의 머신을 동시에 설정할 수 있다. Linux 의 경우엔 SSH, Windows 의 경우엔 Powershell Remoting 을 통해 통신하여 머신들을 설정한다. Ansible 은 이런 target systems 를 Inventory 를 통해 관리하는데 기본적으로 `/etc/ansible/hosts` 에 위치한다. Inventory 파일은 ini 또는 yaml 형태의 파일로 작성할 수 있다.

```ini
web  ansible_host=server1.company.com ansible_connection=ssh   ansible_user=root
db   ansible_host=server2.company.com ansible_connection=winrm ansible_user=admin
mail ansible_host=server3.company.com ansible_connection=ssh   ansible_ssh_pass=P

localhost ansible_connection=localhost
```
Inventory 파일에서 target host 를 그룹으로 분류하는 것 외에도 alias 를 통해 target system 에 대한 설정을 세분화 할 수도 있다. 이런 설정값들은 기본적으로 linux 를 기준으로 기본값이 설정된다.

## Ansible Variables
---
```yaml
name: Add DNS server to resolv.conf
hosts: localhost
vars:
  dns_server: 10.1.250.10
tasks:
  - lineinfile:
      path: /etc/resolv.conf
      line: 'nameserver {{ dns_server }}'
```
Ansible 에선 변수를 선언할 때 Playbook vars 딕셔너리에 선언하거나 variables 파일에 따로 선언할 수 있다. 변수를 사용할 때엔 Jinja2 템플릿 형식으로 적용할 수 있다.

## Ansible Playbooks
---
```yaml
# playbook.yml
-
name: Play 1
hosts: localhost
tasks:
 - name: Execute command 'date'
   command: date
 - name: Execute script
   script: test_script.sh

-
name: Play 2
hosts: localhost
tasks:
 - name: Install web service
   yum:
     name: httpd
     state: present
 - name: Start web server
   service:
     name: httpd
     state: started
```
Ansible Playbook 은 Ansible 이 target systems 에 적용할 Play 들을 모아두는 YAML 파일이다. 각 Play 는 target host 에 순차적으로 적용할 tasks 를 포함한다. Task 는 name 과 module 로 이루어지는데 여기서 module 은 command, script, yum, service 을 의미한다.

```
ansible-playbook playbook.yml
```
위 커맨드로 Playbook 을 실행할 수 있다.

```
ansible-playbook install_nginx.yml --check
```
check mode 로 실행 시 어떤 호스트에 변경이 일어날 지 확인할 수 있다. 모든 module 이 check mode 를 지원하진 않는다.

```
ansible-playbook configure_nginx.yml --check --diff
```
diff mode 를 함께 사용하면 어떤 변경점이 있는지 역시 확인할 수 있다.

```
ansible-playbook configure_nginx.yml --syntax-check
```
syntax-check mode 로 Playbook 의 오타를 찾아낼 수도 있다.

## References
---
- [IBM Technology - What is Ansible?](https://www.youtube.com/watch?v=fHO1X93e4WA)
- [Ansible for the Absolute Beginner - Hands-On - DevOps](https://www.udemy.com/course/learn-ansible/)
