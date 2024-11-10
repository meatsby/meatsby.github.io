---
title: Terraform
date: 2023-09-11 20:00:00 +0800
status: In Progress
draft: false
tags:
  - IaC
  - Terraform
---
## 1. Understand Infrastructure as Code (IaC) Concepts
---
### What is IaC?
클라우드 인프라를 구성할 때 대부분은 AWS Console 과 같은 UI 를 통해 리소스를 생성하게 되는데 이는 아래와 같은 단점들을 가져온다.
- Human Error 를 통한 Misconfiguration
- 운영중인 리소스의 상태를 관리하기가 어려워짐

Infrastructure as Code (IaC) 는 클라우드 인프라를 수동으로 관리할 때 발생하는 위와 같은 문제점을 인프라를 코드로 관리함으로써 해결해준다. 한 마디로 IaC 는 인프라의 blueprint 와 같은 역할을 하는 것.

### Declarative vs Imperative
IaC 툴은 크게 선언형 도구와 명령형 도구로 구분되는데, AWS CloudFormation 등 선언형 도구는 JSON, YAML 과 같은 스크립트 언어로 작성되고, AWS CDK, Pulumi 등 명령형 도구는 Python 등 프로그래밍 언어로 작성된다.

Terraform 은 선언형과 명령형 그 중간 정도에 해당하는 HCL 로 작성하는데 Loop, Dynamic Blocks, Locals, Maps, Collections 등을 지원한다.

### Mutable vs Immutable Infrastructure
VM 을 예로, Mutable Infrastructure 는 클라우드 인프라가 배포된 후 Ansible 등 Provisioning 도구를 통해 설정하여 사용한다. Immutable Infrastructure 는 클라우드 인프라를 Packer 등의 도구를 통해 VM 을 Provisioning 한 상태를 이미지로 만들어 저장하고 이렇게 생성된 이미지를 통해 인프라를 배포하는 방식이다. 즉, Immutable Infrastructure 는 말 그대로 불변 상태로 배포되는 것.

### Terraform Lifecycle
1. Code - Terraform 파일을 HCL 로 작성
2. init - Terraform project 를 initialize 하고 latest provider 와 module 을 불러옴
3. plan - 작성된 Terraform 파일을 토대로 변경될 사항을 미리 계획
4. validate - 작성된 Terraform 파일이 제대로 작성되었는지 확인
5. apply - 작성된 Terraform 파일을 토대로 실제 인프라를 생성
6. destroy - 생성된 인프라를 제거

## 2. Understand the purpose of Terraform (vs other IaC)
---
### Benefits of Terraform State
대부분의 IaC 도구는 정의된 인프라의 상태를 State 파일을 통해 관리한다. Terraform 은 State 파일을 기본적으로 Terraform 명령어가 실행된 로컬에 저장하는데 협업 시 remote backend 에 저장하여 공유할 수도 있다. 보통 S3 나 Terraform Cloud 를 remote backend 로 활용한다.

## 3. Understand Terraform Basics
---

## 4. Use Terraform outside the Core Workflow
---

## 5. Interact with Terraform Modules
---

## 6. Use the Core Terraform Workflow
---

## 7. Implement and Maintain State
---

## 8. Read, Generate, and Modify Configuration
---

## 9. Understand HCP Terraform Capabilities
---

## References
---
- [Udemy - HashiCorp Certified: Terraform Associate - Hands-On Labs](https://www.udemy.com/course/terraform-hands-on-labs)
