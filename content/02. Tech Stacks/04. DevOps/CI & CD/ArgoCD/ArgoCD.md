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

## ArgoCD 설치
---
```sh
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
ArgoCD 공식문서에선 위와 같은 방법을 소개한다. ArgoCD 를 위한 namespace 를 생성하고 공식 yaml 을 kubectl 을 통해 설치하는 방법이다. 이 외에도 helm 을 사용한 설치 역시 가능하다.

### 설치 확인
```
k -n argocd get po,svc,cm,secret
```
설치 후 생성된 ArgoCD 의 컴포넌트들을 확인해보자.

```
NAME                                                    READY   STATUS    RESTARTS   AGE
pod/argocd-application-controller-0                     1/1     Running   0          66s
pod/argocd-applicationset-controller-86bfbfd54c-99fn8   1/1     Running   0          66s
pod/argocd-dex-server-86bd88bb45-hr6wk                  1/1     Running   0          66s
pod/argocd-notifications-controller-67cc46b754-8g2x6    1/1     Running   0          66s
pod/argocd-redis-757f74dd67-ltxl5                       1/1     Running   0          66s
pod/argocd-repo-server-584c99df7d-c4l7l                 1/1     Running   0          66s
pod/argocd-server-5496498b9-txss7                       1/1     Running   0          66s

NAME                                              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
service/argocd-applicationset-controller          ClusterIP   10.101.20.253    <none>        7000/TCP,8080/TCP            67s
service/argocd-dex-server                         ClusterIP   10.106.72.197    <none>        5556/TCP,5557/TCP,5558/TCP   67s
service/argocd-metrics                            ClusterIP   10.107.12.228    <none>        8082/TCP                     67s
service/argocd-notifications-controller-metrics   ClusterIP   10.110.188.49    <none>        9001/TCP                     67s
service/argocd-redis                              ClusterIP   10.107.34.106    <none>        6379/TCP                     67s
service/argocd-repo-server                        ClusterIP   10.111.253.231   <none>        8081/TCP,8084/TCP            67s
service/argocd-server                             ClusterIP   10.101.71.246    <none>        80/TCP,443/TCP               67s
service/argocd-server-metrics                     ClusterIP   10.110.143.101   <none>        8083/TCP                     67s

NAME                                  DATA   AGE
configmap/argocd-cm                   9      67s
configmap/argocd-cmd-params-cm        0      67s
configmap/argocd-gpg-keys-cm          0      67s
configmap/argocd-notifications-cm     0      67s
configmap/argocd-rbac-cm              0      67s
configmap/argocd-ssh-known-hosts-cm   1      67s
configmap/argocd-tls-certs-cm         0      67s
configmap/kube-root-ca.crt            1      69s

NAME                                 TYPE     DATA   AGE
secret/argocd-initial-admin-secret   Opaque   1      36s
secret/argocd-notifications-secret   Opaque   0      67s
secret/argocd-redis                  Opaque   1      47s
secret/argocd-secret                 Opaque   5      67s
```
이 외에도 ServiceAccount, Role, RoleBinding 등이 생성된다.

### Web UI 접속
```
k -n argocd port-forward svc/argocd-server 8080:443
```
Web UI 에 접속하기 위해 argocd-server Service 를 위처럼 포트포워딩하거나 NodePort 또는 LoadBalancer 로 변경해야 한다.

```
k -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```
로그인하기 위한 초기 비밀번호는 secret 에 저장되어 있다. 초기 Username 은 admin 으로 설정되어 있다.

## References
---
- 
