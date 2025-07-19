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
- ForgeRock AM 은 Policy 를 통해 유저 그룹의 리소스 접근을 제어할 수 있다.
- 유저가 IG/SDK 등을 통해 리소스에 대한 접근을 요청하면, IG/SDK 는 AM 에게 접근권한에 대한 확인을 요청하고 AM 이 제공하는 응답에 따라 리소스에 대한 접근을 제어할 수 있다.
- Subject, Action, Resource, Condition 을 통해 Policy 를 정의할 수 있다.
	- Subject: 룰이 적용될 누군가
		- e.g. 인증된 유저 및 그룹, OIDC, JWT claim 등
	- Actions: 무엇을 할 수 있는지
		- e.g. 일반적인 HTTP Method `GET`, `POST` 등 외에도 Database `INSERT`, `SELECT` 등도 설정할 수 있음
	- Resources: 어떤 리소스를 제한할 것인지
		- e.g. 일반적인 URL `https://fec.example.com` 이나, DB Table 도 가능
	- Conditions: 룰이 적용될 조건
		- e.g. IP 가 `192.168.100.22` 일 경우

### Protecting REST APIs and Integrating Mobile Applications
- ForgeRock AM 이 인증 서버로써 OIDC 와 OAuth 2.0 를 어떻게 지원하는지 알아보자.
- OAuth 2.0 은 인가를 위한 프로토콜이다. 리소스 소유자가 리소스에 대한 접근을 허용하고 싶을 때 Access Token 을 발급하여 Access Token 을 가진 사용자가 리소스에 접근할 수 있도록 한다. 때문에 리소스에 접근하려는 유저는 아무런 Credentials 를 제공하지 않아도되며 리소스를 제공하는 쪽 역시 본인이 발급한 Access Token 의 validity 만 확인하면 된다.
- OIDC 는 인증을 위한 프로토콜이다. OAuth 2.0 handshake 위에서 작동하며 Access Token 이외에도 추가적으로 ID Token 을 발급하여 인증 기능을 제공한다. 클라이언트가 ForgeRock AM 에 요청하는 엔드포인트는 OAuth 2.0 과 같지만, Scope 를 `openid` 로 설정하여 요청할 경우 ID Token 을 반환하는 방식이다.
- Access Token 은 Bearer Token 형식으로 이루어져 있기 때문에 탈취될 경우 아무나 리소스에 접근할 수 있게된다. 때문에 항상 TLS/SSL 을 사용해야하며, 추가적으로 Proof-of-Possession 이라는 방식을 통해 요청이 실제로 Access Token 을 발급해준 유저에게서 온 것인지 확인할 수 있다. Access Token 을 발급할 때 클라이언트의 identity 를 함께 첨가하는 방식으로 AM 과 Resource Server 가 이를 대조하여 동일한 유저가 요청한 것인지 확인하는 방법이다.
- Scope 의 경우 OIDC Provider, 여기선 ForgeRock AM 에게 요청 시, Claims 를 반환한다.
	- Scope: Subscription 이라면,
	- Claims: Subscription Level, Subscription Expiry, 등등 이 반환된다.
	- OIDC 는 Scope: openid 로 요청하는 것이고, 반환되는 Claims 가 sn, givenName, cn 등 유저 정보를 반환하기 때문에 인증 역할을 수행할 수 있는 것이다.
- 모바일 애플리케이션의 경우 ForgeRock 에서 제공하는 iOS, Android, JS SDKs 들을 통해 AM 에 쉽게 연동할 수 있다.

### Realms
- AM 에서 인증 정책과 사용자 그룹을 격리시키기 위한 보안 도메인이다.
	- `/` : 기본 realm
	- `/banking` : 은행 사용자용 인증/인가 realm
	- `/admin` : 관리자 전용 realm
- Realm 별로 Auth Tree, OAuth2, Policy 등 독립적인 설정이 가능하다.

## ForgeRock DS
---
- ForgeRock Directory Services 는 사용자, 그룹, 토큰 등 모든 아이덴티티 정보를 저장하는 LDAP 기반의 디렉토리 서버다.
- LDAP, Lightweight Directory Access Protocol 은 네트워크 상에서 조직이나 조직 내 파일, 개인정보, 디바이스 정보 등을 찾아볼 수 있도록 하는 프로토콜이다.

### PingDS Concepts
- Directory Service 는 LDAP 혹은 HTTP 형태로 접근할 수 있는 디렉터리형 저장소 정도로 볼 수 있다. 저장되는 내용은 잘 변경되지 않는 유저 정보, 애플리케이션 정보 등이 저장된다. 유저 정보는 구조가 대부분 일정하고 인증, 권한, 조직 구조 관리 등의 목적으로 읽기 중심의 데이터가 저장되기 때문에 LDAP 에 주로 저장하여 사용한다.
- PingDS 는 LDAPv3 표준을 기반으로 Java Platform 위에서 작동하도록 설계되었으며, 고성능, 고가용성을 자랑한다.
- PingDS 는 크게 3가지 컴포넌트로 이루어지는데,
	- Directory Server: LDAP Client 에게 Directory 데이터를 제공하는 주체로 LDAP Server 를 구성하기 위해 최소 1개 이상 필요하다. LDAP 외에 HTTP 역시 지원한다.
	- LDAP Proxy Server: 분산된 Directory Server 앞단에서 Single Point of Access 역할을 해주는 Server. LDAP 은 HTTP 와 다르게 FTP 나 SQL 처럼 Stateful 하기 때문에 Proxy 역시 LDAP 전용 Proxy 를 사용해야한다. HTTP 로 프록시를 통하고 싶을 경우 HDAP 을 통해 HTTP 요청을 LDAP 으로 변환시켜줘야한다.
	- Replication Server: 분산된 Directory Server 들의 동기화를 수행하는 서버들이다.

### DS Proxy Server


### Using Directory Servers in PingAM Deployment


## References
---
- 
