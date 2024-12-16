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
### Terraform Basics
```
terraform init
```
- `terraform init` 을 통해 Terraform config 파일을 initialize 할 수 있다. 이때 config 파일에 사용된 각종 plugin 과 lock 파일을 설치한다.

```
terraform validate
```
- `terraform validate` 을 통해 작성된 config 파일이 문법적으로 오류가 없는지 확인한다. 가령 module 을 호출할 때 잘못된 variable 값을 작성했을 때 해당 부분을 잡아준다.

```
terraform plan
```
- `terraform plan` 을 호출하면 Terraform 은 local 또는 backend 에 저장된 state 파일과 실제 배포된 클라우드 환경의 리소스를 비교하여 상태가 일정한지 확인하고, 만약 Terraform config 파일에 수정된 부분이 있다면 이를 토대로 apply 전에 어떤 변화가 있을 지 알려준다.

```
terraform apply
```
- `terraform apply` 를 호출하면 plan 에서 확인된 변경사항을 적용한다. 이때 provider 들의 API 를 호출하고 실제 인프라에 리소스들이 생성된다.

```
terraform destroy
```
- `terraform destroy` 는 말 그대로 배포된 리소스들을 제거한다.

### HashiCorp Configuration Language (HCL)
```hcl
# Template
<BLOCK TYPE> "<BLOCK LABEL>" "<BLOCK LABEL>" {
  # Block body
  <IDENTIFIER> = <EXPRESSION> # Argument
}

# AWS EC2 Example
resource "aws_instance" "web_server" {
  ami           = "ami-..."
  instance_type = var.instance_type
}
```
Terraform 은 HCL 로 작성되고 위와 같은 구조로 이루어져있다.

### Splat Expressions
```hcl
# id List 를 반환하는 표현식, 아래 2줄 모두 같은 결과가 나온다
[for o in var.list : o.id]
var.list[*].id

# name List 를 반환하는 표현식, 아래 3줄 모두 같은 결과가 나온다
[for o in var.list : o.interfaces[0].name]
var.list[*].interfaces[0].name
var.list.*.interfaces[0].name
```
Terraform 은 for 문과 동시에 Splat Expression 역시 지원하는데, List 를 순회할 때 위처럼 작성할 수 있다.
마지막 줄은 Legacy 를 지원하기 위해 존재하는 표현식인데 작동방식이 다르기 때문에 사용을 지양하고 있다.
for_each 의 경우 Map 형태로 Object 를 순회하기 때문에 Splat Expression 을 사용할 수 없다.

Terraform 은 아래와 같은 다양한 종류의 `<BLOCK TYPE>` 을 제공한다.
- Setting Block
- Provider Block
- Resource Block
- Data Block
- Input Variable Block
- Local Variable Block
- Output Values Block
- Modules Block

### Terraform Plug-in-Based Architecture
```
Terraform Core <-> Providers(Plugins) <-> Upstream APIs
```
Terraform은 remote system 에 인프라를 구축하기 위해 plug-in-based architecture 로 구성되어 있다. 이는 remote system 이 제공하는 API 를 Provider 형태로 구성하여 Terraform Core 가 Provider 와 상호작용하여 API 를 호출하는 방식이다. 예를 들어 AWS 인프라를 구축하고 싶다면 AWS Provider 를 통해 AWS resource 생성 API 를 호출하는 형태다. Provider 는 [Terraform Registry](https://registry.terraform.io/browse/providers) 에서 확인할 수 있다.

```hcl
# terraform.tf
terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}
```
Terraform provider 를 설치하기 위해선 `terraform.tf` 파일에 설치하고자 하는 provider 들 위처럼 추가해주어야 한다. Terraform 은 provider 버전을 명시적으로 적어주지 않아도 어딘가 사용되고 있으면 기본적으로 가장 최신 버전의 provider 를 가져오기 때문에 불필요한 버전업을 방지하기 위해 버전을 명시적으로 선언하거나 가장 오른쪽 버전을 최신화하는 `~>` 연산자를 통해 버전업을 관리해줄 수 있다.

```
terraform init
```
원하는 provider 를 모두 추가해주었다면 `terraform init` 을 통해 provider 를 설치하자.

```
terraform version
```

```
Terraform v1.9.8
on darwin_arm64
+ provider registry.terraform.io/hashicorp/aws v3.76.1
```
`terraform version` 을 실행해 어느 버전의 provider 가 설치되었는지 확인할 수 있고,

```
terraform providers
```

```
Providers required by configuration:
.
└── provider[registry.terraform.io/hashicorp/aws] ~> 3.0
```
`terraform providers` 를 실행해 어떤 provider 들이 요구되는지 확인할 수 있다.

### Provider Block
```hcl
provider "aws" {
  region                  = "ap-east-1"  
  access_key              = "my-access-key"
  secret_key              = "my-secret-key"
  shared_credentials_file = "/Users/tf_user/.aws/creds"
  profile                 = "customprofile"
}
```
Provider Block 은 설치된 provider 에 대한 설정을 해주기 위한 block 이다. AWS provider 를 예시로 위처럼 region 을 지정해줄 수 있고, access_key 와 secret_key 등을 명시해줄 수도 있다.

### Resource Block
```hcl
# Template
resource "<RESOURCE_TYPE>" "<RESOURCE_NAME>" {
  <IDENTIFIER> = <EXPRESSION> # Argument
}

# AWS EC2 Example
resource "aws_instance" "web_server" {
  ami           = "ami-..."
  instance_type = var.instance_type
}
```
Resource Block 은 말 그대로 provider 에서 제공하는 resource 를 생성하기 위한 block 이다. 위 예시처럼 제공하는 `RESOURCE_TYPE` 을 명시하고 세부적인 설정들을 작성해주면 resource 를 생성할 수 있다.

### Variables Block
```hcl
# Template
variable "<VARIABLE_NAME>" {
  type        = <VARIABLE_TYPE>
  description = <DESCRIPTION>
  default     = <EXPRESSION>
  sensitive   = <BOOLEAN>
  validation  = <RULES>
}

# Example
variable "aws_region" {
  type        = string
  description = "region used to deploy workloads"
  default     = "us-east-1"
  validation {
    condition     = can(regex("^us-", var.aws_region))
    error_message = "The aws_region value must be a valid region in the
    USA, starting with \"us-\"."
  }
}
```
Terraform 에선 Variable Block 을 통해 변수를 선언하고 사용한다. 위와 같은 구조를 가지고 있으며, default 값이 주어지지 않는 경우 `terraform plan` 시 각 variable 값을 입력해 주어야 한다. 때문에 Variable Block 을 Input Variable Block 이라고도 부른다.

Variable 값을 지정해주는 방법이 여러가지 있는데 아래와 같은 우선순위로 값이 적용된다.
1. Variable defaults
2. Env Variables
3. `terraform.tfvars` file
4. `terraform.tfvars.json`
5. `*.auto.tfvars` or `*.auto.tfvars.json`
6. Command Line: `-var` and `-var-file`

### Locals Block
```hcl
# Template
locals {
  local_variable_name = <EXPRESSION OR VALUE>
  local_variable_name = <EXPRESSION OR VALUE>
}

# Example
locals {
  time        = timestamp()
  application = "api_server"
  server_name = "${var.account}-${local.application}"
}
```
Locals Block 을 통해 자주 사용되는 값들을 정해두고 `local.local_variable_name` 형식으로 참조해서 사용할 수 있다. 위 예시처럼 특정 값 뿐 아니라 expression 으로 variable 과 함께 사용할 수도 있다. 기타 언어의 지역변수와 달리 여러 파일에서 참조가능하다.

### Data Block
```hcl
# Template
data "<DATA TYPE>" "<DATA LOCAL NAME>" {
  <IDENTIFIER> = <EXPRESSION> # Argument
}

# Example
data "aws_ami" "ubuntu_22_04" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  owners = ["<AWS_ACCOUNT>"]
}
```
Data Block 은 API 를 통해 provider 에서 제공하는 data 를 받아와 Terraform 코드에서 사용할 수 있게 도와주는 block 이다. 위 예시처럼 가장 최신 Ubuntu AMI 의 ID 를 가져와 EC2 를 생성할 때 사용할 수 있다.

### Configuration Block
```hcl
# Template
terraform {
  <ARGUMENT> = <VALUE>
}

# Example
 terraform {
   required_version = ">= 1.0.0"
 }
```
Configuration Block 은 provider 나 Terraform 의 버전등을 지정해주기 위한 block 이다. 기본적으로 `terraform.tf` 파일에서 사용되며 형식은 위와 같다.

### Module Block
```hcl
# Template
module "<MODULE_NAME>" {
  source = <MODULE_SOURCE>
  <INPUT_NAME> = <DESCRIPTION> #Inputs
  <INPUT_NAME> = <DESCRIPTION> #Inputs
}

# Example
module "website_s3_bucket" {
  source = "./modules/aws-s3-static-website-bucket"

  bucket_name = var.s3_bucket_name
  aws_region = "ap-east-1"

  tags = {
    Terraform   = "true"
    Environment = "certification"
  }
}
```
Module Block 은 일반적으로 함께 사용하는 resource block 들을 묶어 재사용 가능한 형태로 제공하기 위해 사용되는 block 이다. 이런 Module 들은 Github, Terraform Module Registry 등 remote 에서 가져와 사용하거나 local 에 함께 선언하여 사용할 수 있다.

```
parent(root)_module
├── modules
│	├── child_module
│   │   ├── main.tf
│   │   └── variables.tf
│	└── child_module_2
├── main.tf
└── variables.tf
```
local 에서 선언하여 사용할 경우 일반적으로 modules directory 내에 module 을 선언하여 root 에서 불러 사용하는 방식이다.

### Output Block
```hcl
# Template
output "<NAME>" {
  value= <EXPRESSION> # Argument
}

# Example
output "web_server_ip" {
  description = "Public IP Address of Web Server on EC2"
  value       = aws_instance.web_server.public_ip
  sensitive   = true
}
```
Output Block 은 Terraform 이 apply 된 이후 출력되는 값들을 선언하기 위한 block 이다. 간단하게 hello world 를 출력할 수도 있고 Terraform 에 의해 생성된 resource 에 대한 정보를 참조해 출력할 수도 있다. 이런 outputs 를 통해 나온 값들을 활용하여 자동화하거나 다른 Terraform workspace 에서 data source 로 활용할 수도 있다.

### Commenting
```hcl
# One-line comment

/*
Multiple
line
comment
*/
```
주석은 위와 같이 작성할 수 있다.

### .terraform.lock.hcl
```hcl
provider "registry.terraform.io/hashicorp/aws" {
  version     = "3.61.0"
  constraints = "~> 3.0"
  hashes = [
    "h1:fpZ14qQnn+uEOO2ZOlBFHgty48Ol8IOwd+ewxZ4z3zc=",
    "zh:0483ca802ddb0ae4f73144b4357ba72242c6e2641aeb460b1aa9a6f6965464b0",
    "zh:274712214ebeb0c1269cbc468e5705bb5741dc45b05c05e9793ca97f22a1baa1",
    "zh:3c6bd97a2ca809469ae38f6893348386c476cb3065b120b785353c1507401adf",
    "zh:53dd41a9aed9860adbbeeb71a23e4f8195c656fd15a02c90fa2d302a5f577d8c",
    "zh:65c639c547b97bc880fd83e65511c0f4bbfc91b63cada3b8c0d5776444221700",
    "zh:a2769e19137ff480c1dd3e4f248e832df90fb6930a22c66264d9793895161714",
    "zh:a5897a99332cc0071e46a71359b86a8e53ab09c1453e94cd7cf45a0b577ff590",
    "zh:bdc2353642d16d8e2437a9015cd4216a1772be9736645cc17d1a197480e2b5b7",
    "zh:cbeace1deae938f6c0aca3734e6088f3633ca09611aff701c15cb6d42f2b918a",
    "zh:d33ca19012aabd98cc03fdeccd0bd5ce56e28f61a1dfbb2eea88e89487de7fb3",
    "zh:d548b29a864b0687e85e8a993f208e25e3ecc40fcc5b671e1985754b32fdd658",
  ]
}

provider "registry.terraform.io/hashicorp/random" {
  version     = "3.0.0"
  constraints = "3.0.0"
  hashes = [
    "h1:yhHJpb4IfQQfuio7qjUXuUFTU/s+ensuEpm23A+VWz0=",
    "zh:0fcb00ff8b87dcac1b0ee10831e47e0203a6c46aafd76cb140ba2bab81f02c6b",
    "zh:123c984c0e04bad910c421028d18aa2ca4af25a153264aef747521f4e7c36a17",
    "zh:287443bc6fd7fa9a4341dec235589293cbcc6e467a042ae225fd5d161e4e68dc",
    "zh:2c1be5596dd3cca4859466885eaedf0345c8e7628503872610629e275d71b0d2",
    "zh:684a2ef6f415287944a3d966c4c8cee82c20e393e096e2f7cdcb4b2528407f6b",
    "zh:7625ccbc6ff17c2d5360ff2af7f9261c3f213765642dcd84e84ae02a3768fd51",
    "zh:9a60811ab9e6a5bfa6352fbb943bb530acb6198282a49373283a8fa3aa2b43fc",
    "zh:c73e0eaeea6c65b1cf5098b101d51a2789b054201ce7986a6d206a9e2dacaefd",
    "zh:e8f9ed41ac83dbe407de9f0206ef1148204a0d51ba240318af801ffb3ee5f578",
    "zh:fbdd0684e62563d3ac33425b0ac9439d543a3942465f4b26582bcfabcb149515",
  ]
}
```
위 파일은 `terraform init` 으로 provider 가 설치될 때 자동으로 생성되는 파일로 Terraform 에선 이를 Dependency Lock File 이라고 부른다. 이 파일은 당시 사용된 provider 버전을 기록하기 위해 생성되는데 이 파일을 통해 팀 간 동일한 버전을 유지할 수 있기 때문에 보통 VCS 에 같이 push 된다. 즉, 고정된 provider 버전 사용을 보장하기 위한 파일이라고 생각하면 된다.

```
terraform init -upgrade
```
provider 버전을 다운그레이드하거나 업그레이드 하고 싶을 땐 Configuration Block 에서 provider 버전을 수정하고 위 명령어를 실행하여 원하는 provider 버전을 설치하여 사용할 수 있다. 이 때 Dependency Lock File 은 자동으로 같이 수정된다.

### Provisioner
```hcl
resource "aws_instance" "ubuntu_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.public_subnets["public_subnet_1"].id
  security_groups             = [aws_security_group.vpc-ping.id, aws_security_group.ingress-ssh.id, aws_security_group.vpc-web.id] 
  associate_public_ip_address = true
  key_name                    = aws_key_pair.generated.key_name
  connection {
    user        = "ubuntu"
    private_key = tls_private_key.generated.private_key_pem
    host        = self.public_ip
  }

  provisioner "local-exec" {
    command = "chmod 600 ${local_file.private_key_pem.filename}"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo rm -rf /tmp",
      "sudo git clone https://github.com/hashicorp/demo-terraform-101 /tmp",
      "sudo sh /tmp/assets/setup-web.sh",
    ]
  }

  tags = {
    Name = "Ubuntu EC2 Server"
  }

  lifecycle {
    ignore_changes = [security_groups]
  }
}
```
Provisioner 를 통해 EC2 인스턴스 같은 머신을 provisioning 할 수 있다. `local-exec` 은 Terraform 이 실행되는 머신에서 수행할 provisioning 을 실행하고, `remote-exec` 은 target system 에 수행할 provisioning 을 ssh 로 전달한다. remote system 에 명령어를 전달하기 위해 ssh 가 필요하기 때문에 tls connection 을 함께 선언해주어야 한다. Terraform Provisioner 는 멱등성을 보장하지 않기 때문에 Ansible 같은 provisioning 전용 툴을 사용하는 것이 더 권장된다.

## 4. Use Terraform outside the Core Workflow
---
### Auto Formatting
```
terraform fmt
```
`terraform fmt` (format) 명령어를 통해 자동으로 코드를 정렬할 수 있다.

### Taint and Replace
```
terraform taint aws_instance.web_server
Resource instance aws_instance.web_server has been marked as tainted.
```
`terraform taint` 명령어를 통해 성공적으로 생성되지 않은 resource 를 mark 해두고 추후 apply 과정에서 해당 resource 를 재생성할 수 있다. 기본적으로 Terraform 은 resource 를 정상적으로 생성하지 못하면 해당 resource 를 자동으로 taint 처리해둔다. 예를 들어 provisioner block 에서 실행한 커맨드가 에러를 반환할 경우 해당 EC2 instance 를 taint 처리해두고 추후 apply 에서 재생성을 시도한다.

```
terraform untaint aws_instance.web_server
```
재생성을 원하지 않는 경우 `untaint` 역시 가능하다.

```
terraform apply -replace="aws_instance.web_server"
```
Terraform v0.15.2 버전부터 `taint` 명령어는 deprecated 되고 대신 `-replace` 옵션을 통해 resource 를 재생성하길 권장한다.

### Import
```
terraform import {resource_address} {resource_id}
```

```hcl
resource "aws_instance" "aws_linux" {}
```

```
terraform import aws_instance.aws_linux i-0bfff5070c5fb87b6
aws_instance.linux: Importing from ID "i-0bfff5070c5fb87b6 "...
aws_instance.linux: Import prepared!
  Prepared aws_instance for import
aws_instance.linux: Refreshing state... [id=i-0bfff5070c5fb87b6]

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.
```
`terraform import` 를 통해 수동으로 생성한 resource 를 Terraform state 에 가져올 수 있다. 각 resource 마다 import 명령어 실행 시 전달해야 할 인자값이 다 다르기 때문에 Terraform Registry 에서 검색해서 import 하면된다. EC2 instance 를 예로 들었을 때 EC2 instance 의 instance id 와 해당 resource 가 매핑될 빈 resource 블럭을 작성해준 뒤 import 명령을 실행해주자.

다만 import 만 한다고 resource block 이 다 채워지지 않는다. plan 을 실행해 필요한 필드값들을 알아내고 `terraform state show aws_instance.aws_linux` 를 통해 필요한 필드값들을 손수 작성해주어야한다.

### Workspace
```
terraform workspace show
default

terraform workspace new development

Created and switched to workspace "development"!

You're now on a new, empty workspace. Workspaces isolate their state, so if you run "terraform plan" Terraform will not see any existing state
for this configuration.

terraform workspace show
development

terraform show
No state.

terraform workspace list           
  default
* development

terraform workspace select default
```
Terraform 으로 구성한 인프라를 dev, stg, prod 등 다양한 환경에서 똑같이 구성하고 싶을 때 terraform workspace 를 사용할 수 있다. Terraform 은 기본적으로 `default` workspace 를 사용하고 `terraform workspace new {name}` 명령어를 실행하면 지정한 이름으로 새로운 workspace 를 생성한다. 이때 `terraform.tfstate.d` 폴더가 생성된다. 각 workspace 는 다른 state file 을 갖게되고 이를 바탕으로 여러 환경을 구성하는 것이다.

### State CLI
```
terraform show

terraform state list

terraform state show aws_instance.web_server
```
Terraform 으로 생성된 resource 는 모두 state file 에 저장되고 관리된다. 해당 workspace 의 state 를 확인하기 위해 위와 같은 명령어를 실행할 수 있는데, `terraform show` 는 상세정보를 모두 포함한 resource 를 출력하기 때문에 `terraform state list` 와 `terraform state show` 명령어의 조합으로 원하는 resource 의 상세정보만 따로 확인할 수도 있다.

### Debugging
```
export TF_LOG=TRACE
terraform apply

export TF_LOG_PATH="terraform_log.txt"
terraform init -upgrade

export TF_LOG=""
export TF_LOG_PATH=""
terraform init -upgrade
```
디버깅이 필요한 경우 `TF_LOG` 환경변수를 원하는 로깅 레벨로 설정하고 terraform 명령어 실행 시 모든 로그를 확인할 수 있다. 로그를 따로 파일로 관리하고 싶은 경우 `TF_LOG_PATH` 환경변수를 설정해주고 `terraform init -upgrade` 로 재설정 해준 뒤 실행하면된다. 디버깅이 이후엔 모든 환경변수를 제거해주자.
`TF_LOG` 는 기본적으로 stderr 에 로그를 출력한다.

## 5. Interact with Terraform Modules
---
### Modules
```hcl
variable "ami" {}

variable "size" {
  default = "t3.micro"
}

variable "subnet_id" {}

variable "security_groups" {
  type = list(any)
}

resource "aws_instance" "web" {
  ami                    = var.ami
  instance_type          = var.size
  subnet_id              = var.subnet_id
  vpc_security_group_ids = var.security_groups

  tags = {
    "Name"        = "Server from Module"
    "Environment" = "Training"
  }
}

output "public_ip" {
  value = aws_instance.web.public_ip
}

output "public_dns" {
  value = aws_instance.web.public_dns
}
```

```hcl
module "server" {
  source          = "./server"
  ami             = data.aws_ami.ubuntu.id
  subnet_id       = aws_subnet.public_subnets["public_subnet_3"].id
  security_groups = [
    aws_security_group.vpc-ping.id,
    aws_security_group.ingress-ssh.id,
    aws_security_group.vpc-web.id
  ]
}
```
자주 함께 사용되는 resource 를 묶은 Module 은 직접 작성했던 외부에서 가져오던 `terraform init` 을 통해 초기화줘야한다. `terraform init` 을 실행하면 기본적으로 `.terraform/modules` 에 저장된다.

### Module Sources
```
module "autoscaling" {
  source  = "terraform-aws-modules/autoscaling/aws"
  version = "4.9.0"

  # Autoscaling group
  name = "myasg"

  vpc_zone_identifier = [aws_subnet.private_subnets["private_subnet_1"].id, 
  aws_subnet.private_subnets["private_subnet_2"].id, 
  aws_subnet.private_subnets["private_subnet_3"].id]
  min_size            = 0
  max_size            = 1
  desired_capacity    = 1

  # Launch template
  use_lt    = true
  create_lt = true

  image_id      = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  tags_as_map = {
    Name = "Web EC2 Server 2"
  }

}
```
직접 작성한 Module 은 보통 `working_dir/modules/module_name/main.tf` 에 작성하여 사용하고 Terraform Registry, GitHub 등 외부에서 역시 가져와 사용할 수 있다.

### Module Inputs and Outputs
```hcl
# main.tf
resource "aws_instance" "web" {
  ami                    = var.ami
  instance_type          = var.size
  subnet_id              = var.subnet_id
  vpc_security_group_ids = var.security_groups

  tags = {
    "Name"        = "Server from Module"
    "Environment" = "Training"
  }
}
```
Module 은 Variable Block 을 통해 Input 을 받고 Output Block 을 통해 Output 을 내보낸다. 모든 Variable Block, Resource Block, Output Block 을 `main.tf` 하나의 파일에 선언한 채로 사용해도 정상적으로 작동하지만 Best Practice 는 `main.tf`, `variables.tf`, `outputs.tf` 로 구분지어 선언해주는 것이 이상적이다.

```hcl
# variables.tf
variable "ami" {}
variable "size" {
  default = "t3.micro"
}
variable "subnet_id" {}
variable "security_groups" {
  type = list(any)
}
```
Input 에 default 값을 주고 싶은 경우엔 Variable Block 에 default 값을 선언해주면 되고,

```hcl
outputs.tf
output "public_ip" {
  value = aws_instance.web.public_ip
}

output "public_dns" {
  value       = aws_instance.web.public_dns
}
```
Output 을 module 을 호출하는 root 에서 사용하고 싶은 경우엔 `module.module_name.output_name` 으로 참조해서 사용할 수 있다.

### Module Scope
```
terraform console

> module.autoscaling
```
Terraform Module 은 단순히 Input 과 Output 을 가진 Terraform configuration file 의 집합이다. Module 을 사용하는 이유는 자주 사용되는 resource 의 조합을 module 로 추상화하여 재사용하기 편하게 제공하기 위함이다. Module 이 제공하는 추상화된 output 을 사용하기 위해서 관련 문서를 찾아도 되지만 위 명령어를 통해 직접 확인할 수도 있다.

### Public Module Registry
Terraform Module 을 제공하는 공식 저장소로 누구나 GitHub Public Repo 로 Module 을 만들어서 제공할 수 있다.

### Module Versioning
Public Terraform Module 에서도 보이듯이 Module 을 versioning 하는 것이 중요하다. Module 을 수정하는 것 외에도 Terraform 이 업데이트될 때 호환되지 않는 코드가 존재할 수 있기 때문. Private Module 을 사용할 때도 versioning 을 해주도록 하자. Terraform Module 의 경우 `version = ">3.0.0"` 과 같이 버전 제약을 걸어줄 수도 있다.

## 6. Use the Core Terraform Workflow
---
### Understanding Terraform Workflow
Terraform 은 기본적으로 Write -> Plan -> Apply 순서로 작업이 진행된다.

### `terraform init`
Terraform 을 초기화하는 명령어로 `.terraform` 폴더가 생성되며 필요한 Module 과 Provider 들을 설치하고 state/lock file 등을 위한 local/remote backend 과도 연결한다. 때문에 이 설정들이 변경되었을 때 항상 `terraform init` 으로 새롭게 초기화해줘야한다.

이 외에 `terraform init -upgrade` 로 이미 있는 provider, module 을 최신화할 수도 있으며, `terraform init -migrate-state` 으로 기존 backend 에 있던 state 를 옮겨줄 수도 있다.

### `terraform validate`
Local directory 에 선언된 config files 만 문법적으로 맞는지 확인하는 명령어다.
- 예를 들어 같은 이름의 resource 가 존재하는지 확인해준다.
- indent 나 space 차이를 잡아주진 않는다.
다만 모든걸 잡아내진 않는데, 예를 들어 존재하지 않는 경로를 사용해도 문법이 맞으면 Success 를 반환한다.

`terraform validate -json` 으로 반환값을 다른 머신이 사용할 수 있게끔 json 형식으로 내보낼 수도 있다.

### `terraform plan`
작성한 Terraform configuration file 들이 어떤 resource 들을 생성할 지 dry-run 으로 확인하는 명령어다. `terraform plan -out=myplan` 으로 plan 을 파일로 저장할 수도 있으며, No Changes 시 refactoring 후 변화가 없다는 걸 검증할 수도 있다.

`terraform plan -refresh-only` 를 통해 Terraform 외부에서 변경된 사항을 파악하고 state 파일에 저장하여 Terraform 이 관리하게끔 할 수 있다.

### `terraform apply`
`terraform apply -auto-approve` 로 적용 확인 여부를 무시할 수 있고, `terraform apply myplan` 으로 파일로 저장된 plan 을 apply 할 수도 있다.

### `terraform destroy`
```
terraform destroy
terraform apply -destroy
```
위 두 명령어 모두 Terraform 이 생성한 resource 들을 제거하는 명령어다.

## 7. Implement and Maintain State
---
### Default Local Backend
```
terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}
```
Terraform 은 `terraform.tfstate` 이라는 json 파일에 Terraform 으로 생성된 resource 의 state 를 저장한다. 기본적으로 Terraform 은 state backend 를 local 을 default 로 두기 때문에 위 코드를 작성하지 않아도 동일하게 local 에 state file 이 저장된다.

### State Locking
state file 은 reference and update 되기 때문에 여러 사람이 작업할 경우 locking 이 중요해짐
prevents concurrent state modification
apply 하고 yes 안 한 다음 다른 터미널에서 apply 하면 state lock 되었다고 알려줌
Locking 중엔 `.terraform.tfstate.lock.info` 파일이 생성되어 있음

Lock 이 반환되길 기다리기 위해 `terraform apply -lock-timeout=60s` 를 사용할 수 있음

state backend 를 remote 로 설정해서 TFE 나 TFC 로 state 를 관리할 수도 있고, AWS S3 로 state file 을 관리할 수도 있음 다만 S3 의 경우 State locking 을 적용하기 위해선 DDB 와 연동이 필요함

### Backend Authentication
```
terraform {
  backend "s3" {
    bucket = "myterraformstate"
    key    = "path/to/my/key"
    region = "us-east-1"
  }
}
```
S3 를 backend 로 사용할 경우 bucket name 과 state file 이 저장될 경로 등을 지정해주면 된다. backend 를 바꿨기 때문에 `terraform init -reconfigure` 로 초기화 해주면된다. 만약 AWS Credentials 가 환경변수로 등록되어 있지 않다면 에러가 발생한다.

remote backend 를 사용할 경우 terraform cloud 계정이 있어야한다. `terraform login` 실행 시 브라우저에서 login 을 요구하고 login 성공 시 `.terraform.d/credentials.tfrc.json` 에 토큰이 저장된다.
이후 terraform cloud 에서 api 토큰을 생성하고 입력해주면 연동이 완료된다.

### Backend Storage
```
terraform {
  backend "s3" {
    # Replace this with your bucket name!
    bucket = "myterraformstate"
    key    = "path/to/my/key"
    region = "us-east-1"

    # Replace this with your DynamoDB table name!
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```
S3 로 연동 시 Bucket Versioning 및 Encryption 을 활용할 수 있는데, state file 을 S3 Versioning 형태로 저장할 수 있다.

S3 를 State Backend 로 사용할 때 Locking 을 활성화하려면 위 코드처럼 DDB 를 연동해야한다.

`terraform init -reconfigure` 는 잊지 말자.

### Remote State - Enhanced Backend
S3 를 사용할 경우엔 state 만 remote 에 두고 terraform 은 local 에서 실행되었다. Terraform Cloud 의 경우 state 과 실행 모두 Cloud 에서 해결할 수 있기 때문에 Enhanced Backend 라고 한다.

Terraform Cloud 에서 Terraform 을 실행하기 때문에 AWS Crendentials 는 모두 Workspace Variable 에서 환경변수로 설정해주어야한다.

### State Migration
```
terraform validate
terraform init -migrate-state
```
backend 변경 시 위 명령어를 통해 기존에 state 를 관리하던 backend 에서 새로운 backend 로 state file 을 이동할 수 있다.

### State Refresh
terraform refresh 시 Terraform 외부에서 발생한 변경사항 (drift) 를 파악하고 자동으로 state file 에 변경사항을 추가했던 반면, `terraform apply -refresh-only` 는 어떤 drift 가 있었는 지 알려주고 state 에 추가할 것인지 물어본다.

### Backend Configuration
backend 선언 시 몇몇 인자값들을 생략한 것을 Partial configuration 이라 하는데, 이런 partial configuraiton 을 file 을 통해 backend 에 적용할 수 있다.

### Sensitive Data in State
state file 은 암호화되지 않은 상태로 저장되기 때문에 `sensitive = true` 를 설정해주어 state file 에 저장되지 않도록 하자. State file 자체도 암호화하는 것이 좋다.

## 8. Read, Generate, and Modify Configuration
---
### Local Variables
```hcl
locals {
  service_name = "Automation"
  app_team     = "Cloud Team"
  createdby    = "terraform"
}
```

```hcl
...

 tags = {
    "Service"   = local.service_name
    "AppTeam"   = local.app_team
    "CreatedBy" = local.createdby
  }

...
```
자주 사용되는 텍스트를 Local Variable 로 선언해서 참조할 수 있다.

```
locals {
  # Common tags to be assigned to all resources
  common_tags = {
    Name      = var.server_name
    Owner     = local.team
    App       = local.application
    Service   = local.service_name
    AppTeam   = local.app_team
    CreatedBy = local.createdby
 } 
}
```

```
resource "aws_instance" "web_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.public_subnets["public_subnet_1"].id
  ...
  tags = local.common_tags
}
```
텍스트 뿐만 아니라 var, local 등을 참조해서 map 형식의 local variable 을 만들어 그대로 참조할 수도 있다.

### Input Variables
```
export TF_VAR_variables_sub_cidr="10.0.203.0/24"
```

```
# terraform.tfvars
variables_sub_auto_ip = true
variables_sub_az      = "us-east-1d"
variables_sub_cidr    = "10.0.204.0/24"
```

```
terraform plan -var variables_sub_az="us-east-1e" -var variables_sub_cidr="10.0.205.0/24"
```
Input Variable 들은 우선순위를 가진다고 했었는데, 위와 같이 적용될 경우 결론적으론 환경변수는 무시되고 tfvars 파일에선 `auto_ip` 만 적용되고 나머진 plan 실행 시 같이 제공된 var 값들이 적용된다.

### Terraform Outputs
```
terraform output
```
위 명령어로 작성된 모든 output 을 확인할 수 있고,

```
terraform output public_ip
```
위처럼 원하는 output variable 만 확인할 수도 있다.

### Variable Validation and Suppression
```
variable "cloud" {
  type = string

  validation {
    condition     = contains(["aws", "azure", "gcp", "vmware"], lower(var.cloud))
    error_message = "You must use an approved cloud."
  }

  validation {
    condition     = lower(var.cloud) == var.cloud
    error_message = "The cloud name must not have capital letters."
  }
}
```
Variable 선언 시 validation 을 추가하여 Input 값을 유효성을 검증할 수 있다.

Variable 을 sensitive 설정했다면 Output 으로 해당값을 출력하려고 할 때 에러가 발생한다. Output 역시 sensitive 설정해주도록 하자. 근데 이렇게 해도 state file 에는 여전히 값이 그대로 노출된다. 때문에 state file 에 대한 접근 권한 등을 따로 설정해줘야한다.

### Secure Secrets
sensitive 설정 외에도 `TF_VAR_{variable_name}` 형식의 환경변수를 적용해 코드에 노출하지 않는 방법도 있다.

``` hcl
data "vault_generic_secret" "phone_number" {
  path = "secret/app"
}

output "phone_number" {
  value = data.vault_generic_secret.phone_number
  sensitive = true
}
```
HashiCorp 는 Vault 라는 Secret Manager 를 제공하는데 이를 이용해서 위처럼 참조해서 사용할 수도 있다.

### Variable Collection and Structure Types
```hcl
variable "us-east-1-azs" {
    type = list(string)
    default = [
        "us-east-1a",
        "us-east-1b",
        "us-east-1c",
        "us-east-1d",
        "us-east-1e"
    ]
}

variable "ip" {
  type = map(string)
  default = {
    prod = "10.0.150.0/24"
    dev  = "10.0.250.0/24"
  }
}

resource "aws_subnet" "list_subnet" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.ip[var.environment]
  availability_zone = var.us-east-1-azs[0]
}
```
Terraform 은 List, Map 등의 collection 을 제공하고 위처럼 참조해서 사용할 수 있다.

```hcl
variable "env" {
  type = map(any)
  default = {
    prod = {
      ip = "10.0.150.0/24"
      az = "us-east-1a"
    }
    dev  = {
      ip = "10.0.250.0/24"
      az = "us-east-1e"
    }
  }
}

resource "aws_subnet" "list_subnet" {
  for_each          = var.env
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = each.value.ip
  availability_zone = each.value.az
}
```
또한, for_each 를 통해 위처럼 collection 을 순회하여 prod 와 dev 의 서브넷을 생성할 수도 있다.

### Terraform Built-in Functions
Terraform 은 일반적인 built-in functions 역시 제공한다. [공식문서](https://developer.hashicorp.com/terraform/language/functions)

### Dynamic Blocks
```hcl
resource "aws_security_group" "main" {
  name   = "core-sg"
  vpc_id = aws_vpc.vpc.id

  ingress {
    description = "Port 443"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Port 80"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```
Terraform 은 Block 내부에서 사용되는 연속되는 nested block 을 for 문 처럼 순회해서 적용해주기 위해 Dynamic Block 을 제공한다. 위처럼 2개의 ingress 가 필요한 경우,

```hcl
locals {
  ingress_rules = [{
      port        = 443
      description = "Port 443"
    },
    {
      port        = 80
      description = "Port 80"
    }
  ]
}

resource "aws_security_group" "main" {
  name   = "core-sg"
  vpc_id = aws_vpc.vpc.id

  dynamic "ingress" {
    for_each = local.ingress_rules

    content {
      description = ingress.value.description
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}
```
이런식으로 dynamic block 을 사용하여 중복을 제거해줄 수 있다.

```hcl
variable "web_ingress" {
  type = map(object(
    {
      description = string
      port        = number
      protocol    = string
      cidr_blocks = list(string)
    }
  ))
  default = {
    "80" = {
      description = "Port 80"
      port        = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    "443" = {
      description = "Port 443"
      port        = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}

resource "aws_security_group" "main" {
  name = "core-sg"

  vpc_id = aws_vpc.vpc.id

  dynamic "ingress" {
    for_each = var.web_ingress
    content {
      description = ingress.value.description
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }
}
```
Local 로 선언해서 사용하는 대신 variable 로 선언해서 위처럼 적용할 수도 있다. 대신 dynamic block 은 가독성을 해칠 우려가 크기 때문에 웬만해선 literal 하게 작성해주자.

### Terraform Graph
```
terraform init
terraform apply
terraform graph
```
`terraform graph` 명령어를 통해 Terraform 으로 생성된 resource 간 dependency 를 확인할 수 있다.

### Terraform Resource Lifecycles
```hcl
resource "aws_security_group" "main" {
  name = "core-sg-global"

  # ...

  lifecycle {
    create_before_destroy = true
    prevent_destroy       = true
  }
}
```
Resource 에는 생명주기를 관리하기 위한 lifecycle block 을 적용할 수 있는데, 위처럼 재생성 시 생성 후 기존 resource 제거, 제거 방지 등을 설정해줄 수 있다.

## 9. Understand HCP Terraform Capabilities
---
### Terraform Cloud Getting Started
[Terraform Cloud](https://app.terraform.io/session) 는 HashiCorp 이 제공하는 Terraform SaaS 로 Terraform Cloud 에서 인프라 생성 API 등을 호출하고 state 를 관리한다. 위 링크에서 계정 생성 후 local 에서 `terraform login` 으로 Terraform Cloud 와 연동하자.

### Terraform Remote State
```hcl
terraform {
 backend "remote" {
    hostname = "app.terraform.io"
    organization = "YOUR-ORGANIZATION"

    workspaces {
      name = "my-aws-app"
    }
  }
}
```
위 처럼 Terraform Cloud Remote Backend 와 연결하고,

```
terraform init -reconfigure
terraform apply
```
위 명령어로 Terraform Cloud 가 프로비저닝을 진행하게끔 호출하자. 물론 `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` 등을 Terraform Cloud 내에서 environment variable 로 설정해줘야한다.

### Terraform Cloud Workspaces
Local 에서 workspace 를 분리하여 여러 환경을 구성하였듯, Terraform Cloud 에서도 다양한 workspace 를 구성하여 사용할 수 있다. 각 Workspace 는 각자의 resource, state, env variable 등을 가질 수 있다.

이런 Workspace 는 CLI, VCS, API 로 Workflow 를 구성할 수 있는데, 대부분 VCS 로 Workflow 를 구성한다. 예를 들어, GitHub Repository 하나를 하나의 Workspace 로 구성하여 PR 이 merge 될 때 apply 하는 식이다.

### Terraform Cloud Secure Variable
Terraform Cloud Workspace 에는 variable 을 설정해줄 수 있는데, env variable 말고도 Terraform Configuration file 에서 사용될 variable 역시 지정해줄 수 있다. 이 때 sensitive 설정을 추가해주면 한 번 입력된 이후 읽기나 수정이 불가능한 상태로 안전하게 Terraform Cloud 가 해당 variable 을 사용할 수 있다.

### Terraform Cloud Private Module Registry
Terraform Cloud 는 사용자가 직접 만든 Module 을 등록하여 사용할 수 있는 Registry 도 지원한다. 직접 만든 Module 을 VCS 에 push 한 뒤 Terraform Cloud Module Registry 에 등록하여 사용하자.

### Terraform Cloud Sentinel Policy
```hcl
module "tfplan-functions" {
  source = "https://raw.githubusercontent.com/hashicorp/terraform-guides/master/governance/third-generation/common-functions/tfplan-functions/tfplan-functions.sentinel"
}

module "tfconfig-functions" {
    source = "https://raw.githubusercontent.com/hashicorp/terraform-guides/master/governance/third-generation/common-functions/tfconfig-functions/tfconfig-functions.sentinel"
}

policy "enforce-mandatory-tags" {
    enforcement_level = "advisory"
}

policy "restrict-ec2-instance-type" {
    enforcement_level = "hard-mandatory"
}
```
Terraform Cloud 에선 plan 과 apply 사이에 Policy as Code 원칙으로 개발된 Sentinel 을 추가하여 실제로 인프라가 생성되기 전에 Policy 가 지켜졌는지 확인할 수 있다. 예를 들어, EC2 에 필수 tag 가 추가되었는지, 허용된 instance type 이 설정되었는지 등을 확인할 수 있다.

## References
---
- [Udemy - HashiCorp Certified: Terraform Associate - Hands-On Labs](https://www.udemy.com/course/terraform-hands-on-labs)
