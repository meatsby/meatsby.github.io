---
title: Packer
date: 2024-08-12 21:49:33 +0800
status: In Progress
draft: false
tags:
  - IaC
  - Packer
---
## Packer 란
---
HashiCorp 가 개발한 오픈소스 툴로 AWS, Azure, GCP 등 다양한 클라우드 플랫폼에 대한 동일한 Machine Image 를 작성할 수 있다. HCL/JSON 으로 작성된 config 파일을 토대로 기본 Machine Image 에서 추가적인 configuration 을 구성한 뒤 새로운 AMI 를 제공한다.

```json
// ami.json
{
	"_comment": "Custom Amazon Linux AMI",
	"variables": {},
	"builders": [
		{
			"type": "amazon-ebs",
			"source_ami": "",
			"vpc_id": "",
			"subnet_id": "",
			"security_group_id": "",
			"instance_type": "t3.micro",
		}
	],
	"provisioners": [
		{
			"type": "ansible",
			"playbook_file": "playbook/ami.yaml"
		}
	]
}
```

## References
---
- 
