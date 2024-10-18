---
title: "Packer & Ansible"
date: 2024-08-12 21:13:02 +0800
status: In Progress
draft: false
tags:
  - DevOps
---
## Packer
---
- 클라우드 플랫폼에 대해 동일한 시스템 이미지를 작성하기 위한 오픈 소스 도구
- AWS AMI, GCP Image 등을 스크립트 파일로 생성 가능

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

## Ansible
---
- Docker, EC2 등에 대한 Provisioning 자동화 도구
- yaml 로 작성된 파일을 통해 설정 관리 가능

## References
---
- 
