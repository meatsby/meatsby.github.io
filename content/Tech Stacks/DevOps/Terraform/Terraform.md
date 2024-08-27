---
title: "Terraform"
date: 2023-09-25 09:30:00 +0800
status: In Progress
draft: false
tags:
  - Terraform
---
- AWS WAF
	- Security Ingress
	- Set of rules to decide what to allow and detect some suspicious reequests
	- Define ACLs (Access Control Lists)
	- Logs are created in each rules
- AWS Data Firehose
	- Deliver logs from WAFs to designated destination
	- E.g., S3, DataDog
- Datadog

- Terraform Sentivie
```HCL
variable "example" {
	description = "Description of variable"
	type        = string
	sensitive   = true
}
```
- Terraform only recognizes root module as an entry point
- Terraform Format
```
$ terraform fmt
```
- Adjusting code format

- Module
	- Reusable code
	- common configs for each resources
- Environment
	- 실제 provision 되는 code
	- Module 을 불러서 필요한 설정만 바꿔줄 수 있음

Best practice for terraform versioning spacelift.io how to manage different terraform versions
