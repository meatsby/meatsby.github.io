---
title: ForgeRock
date: 2025-06-24 17:00:45 +0800
status: In Progress
draft: false
tags:
  - IAM
  - ForgeRock
---
## ForgeRock
---
- ForgeRock 은 기업용 IAM 을 제공하는 플랫폼으로, 주요 컴포넌트로 AM, DS 등이 있다.
- IAM, Identity and Access Management 은 회원가입, 로그인 인증, 인가, 로그인 이력관리, 회원 정보 수정, 탈퇴 등 인증/인가 기능이 모두 구현되어 있는 솔루션을 말한다.
- 다른 솔루션으로 오픈소스인 CNCF 의 [KeyCloak](https://www.keycloak.org/)을 사용할 수 있다.

## ForgeRock AM
---
### Introducing AM Core Concepts
- ForgeRock Access Management 는 인증, 인가를 담당하는 컴포넌트다.
- SSO, OIDC, OAuth2, SAML, MFA 등을 지원한다.
- Authentication Tree 와 Node 를 활용해 UI 에서 인증 플로우를 설계할 수 있다.

### Protecting an Application with Intelligent Authentication


### Controlling Access to an Application with AM Authorization


### Protecting REST APIs and Integrating Mobile Applications

### Authentication Tree & Node
- Authentication Tree & Node 는 ForgeRock AM 에서 유저 인증 플로우를 드래그 앤 드랍 방식으로 시각적으로 설계할 때 사용되는 엔티티다.
	- Auth Tree: 인증 플로우의 전체 구조
	- Auth Node: 인증 과정의 각 단계를 구성하는 노드
		- e.g. Username Collector, Password Collector, OTP Validator 등

### Realms
- AM 에서 인증 정책과 사용자 그룹을 격리시키기 위한 보안 도메인이다.
	- `/` : 기본 realm
	- `/banking` : 은행 사용자용 인증/인가 realm
	- `/admin` : 관리자 전용 realm
- Realm 별로 Auth Tree, OAuth2, Policy 등 독립적인 설정이 가능하다.

### ForgeRock DS
- ForgeRock Directory Services 는 사용자, 그룹, 토큰 등 모든 아이덴티티 정보를 저장하는 LDAP 기반의 디렉토리 서버다.
- LDAP, Lightweight Directory Access Protocol 은 네트워크 상에서 조직이나 조직 내 파일, 개인정보, 디바이스 정보 등을 찾아볼 수 있도록 하는 프로토콜이다.

## References
---
- 
