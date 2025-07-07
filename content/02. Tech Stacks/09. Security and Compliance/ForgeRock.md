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
- API, 웹사이트, 모바일 앱 등을 사용하려는 유저가 누군지, 어떤 권한을 가지고 있는지 확인하기 위해 유저는 먼저 인증, 인가, SSO 등을 ForgeRock AM 을 통해 거친다. 이 과정에서 OAuth 를 활용해 Google, Facebook 등 Social Media 에서 제공하는 유저의 이름, 이메일 등을 ForgeRock AM 에 저장할 수 있다.
- 유저가 사용하려는 컴포넌트에 따라 AM 과 통신하는 인터페이스가 다른데, 모바일 앱의 경우 SDK 를 활용해 AM 과 통신할 수 있고 API, 웹사이트 등은 Identity Gateway 를 통해 AM 과 통신할 수 있다.

### Protecting an Application with Intelligent Authentication
- 유저는 IG, Web agent, Java agent 를 통해 접근하고자 하는 리소스에 대한 인증을 요청할 수 있다.
	- IG 는 유저에게 AM 을 통해 인증을 받아게끔하는데, 유저는 AM 에게 지문인식, 얼굴인식 등을 통해 SSO token 을 발급받을 수 있다.
	- 이후 유저는 발급받은 SSO token 을 IG 에게 넘겨주고, IG 는 해당 token 이 유효한지 AM 을 통해 확인한다.
	- SSO token 이 유효하다면 IG 는 유저에게 리소스에 대한 접근을 허가한다.
- AM 은 ACR level 을 통해 여러 단계의 인증 역시 지원한다.
	- 예를 들어, 지문인식, 얼굴인식 보다 높은 수준의 인증을 위해 SMS OTP 등을 활용할 수 있다.
- AM 을 활용해 인증 플로우를 설계하는 관리자는 AM 이 제공하는 UI 를 통해 드래그 앤 드랍 방식을 통해 시각적으로 인증 플로우를 설계할 수 있다.
	- Authentication Tree & Node 는 ForgeRock AM 에서 유저 인증 플로우를 설계할 때 사용되는 엔티티다.
	- Auth Tree 는 인증 플로우의 전체 구조를 의미하고, Auth Tree 를 더 큰 인증 플로우의 일부분으로 활용할 수 있다.
	- Auth Node 는 인증 과정의 각 단계를 구성하는 노드로, Username Collector, Password Collector, OTP Validator 등이 있다. 관리자는 Auth Node 를 조합하여 Auth Tree 를 구성할 수 있다.
- ForgeRock AM 에서 제공하는 MFA Auth Node 를 활용해 더 높은 수준의 인증을 구현할 수 있다.
	- MFA 는 기본적인 ID, PW 인증 방식 외에 다른 채널(다른 타입의 프로토콜, 다른 디바이스)에서 추가적인 모바일 Authenticator 앱을 통한 푸시 또는 이메일, 문자등을 통한 OTP 를 활용한 인증을 거치는 과정을 의미한다.
	- ForgeRock 이 제공하는 MFA 외 다른 도구들도 손 쉽게 연동 가능하다.

### Controlling Access to an Application with AM Authorization


### Protecting REST APIs and Integrating Mobile Applications


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
