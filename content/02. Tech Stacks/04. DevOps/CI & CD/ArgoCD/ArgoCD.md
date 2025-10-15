---
title: ArgoCD
date: 2025-10-14 18:28:47 +0800
status: In Progress
draft: false
tags:
  - ArgoCD
  - GitOps
---
## ArgoCD 란
---
ArgoCD 는 kubernetes 를 위한 GitOps 도구다. 간단히 말해 kubernetes 상태를 Git 으로 관리하는 툴이다. Git 에 선언된 Desired State 와 kubernetes 의 실제 Live State 를 비교하여 관리할 수 있도록 도와준다.

### ArgoCD 를 사용하는 이유
IaC 처럼 kubernetes 리소스를 GitOps 를 통해 코드로 관리할 수 있기 때문에 수동으로 kubectl 을 사용하지 않아도된다. kubernetes 에 배포된 리소스의 형상 관리를 코드로 관리할 수 있다는 장점이 있는 것이다.

ArgoCD 는 배포만 담당하기 때문에 빌드는 Jenkins 나 CircleCI 같은 도구를 활용해야 한다. 또 kubernetes 환경에서만 사용할 수 있다.

ArgoCD 는 git 에 의존하기 때문에 GitHub 를 사용한다고 가정하면 GitHub 가 장애날 경우 ArgoCD 를 사용할 수 없는 상황이 발생할 수 있다.

ArgoCD 는 SSO, helm, kustomize, RBAC, Web UI 등 다양한 기능을 지원한다는 장점이 있다.

## References
---
- 
