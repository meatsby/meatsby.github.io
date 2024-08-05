---
title: K8s Core Concepts
date: 2024-08-05 21:58:02 +0800
status: In Progress
draft: false
tags:
  - K8s
---
## Cluster Architecture
---
### K8s Architecture
- Worker Nodes = Host Application as Containers
	- Container Runtime
	- Kubelet
	- Kube-proxy
- Master Node = Manage, Plan, Schedule, Monitor Worker Nodes
	- Kube-apiserver
	- Controller-Manager
		- Node-Controller
		- Replication Controller
	- ETCD Cluster = HA Key-Value Store
	- Kube-scheduler = Identifies the right node to place a container

### ETCD


### Kube-API Server


### Controller Managers


### Kube Scheduler


### Kubelet


### Kube Proxy


## API Primitives
---


## Services & Other Network Primitives
---


## References
---
- [Udemy - Certified Kubernetes Administrator (CKA) with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/)
