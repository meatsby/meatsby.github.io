---
title: HCTA 003 Practice Questions
date: 2024-12-03 14:54:50 +0800
status: In Progress
draft: false
tags:
  - IaC
  - Terraform
---
## Question 1
---
The `terraform.tfstate` file always matches your currently built infrastructure.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75524-exam-terraform-associate-topic-1-question-1-discussion/)
> B

## Question 2
---
One remote backend configuration always maps to a single remote workspace.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75671-exam-terraform-associate-topic-1-question-2-discussion/)
> B

## Question 3
---
How is the Terraform remote backend different than other state backends such as S3, Consul, etc.?

- A. It can execute Terraform runs on dedicated infrastructure on premises or in Terraform Cloud
- B. It doesn't show the output of a terraform apply locally
- C. It is only available to paying customers
- D. All of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75672-exam-terraform-associate-topic-1-question-3-discussion/)
> A

## Question 4
---
What is the workflow for deploying new infrastructure with Terraform?  

- A. terraform plan to import the current infrastructure to the state file, make code changes, and terraform apply to update the infrastructure.
- B. Write a Terraform configuration, run terraform show to view proposed changes, and terraform apply to create new infrastructure.
- C. terraform import to import the current infrastructure to the state file, make code changes, and terraform apply to update the infrastructure.
- D. Write a Terraform configuration, run terraform init, run terraform plan to view planned infrastructure changes, and terraform apply to create new infrastructure.

> [!done]- Answer
> D

## Question 5
---
A provider configuration block is required in every Terraform configuration.
Example:
![](https://www.examtopics.com/assets/media/exam-media/04279/0000400001.png)

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75674-exam-terraform-associate-topic-1-question-5-discussion/)
> B

## Question 6
---
You run a local-exec provisioner in a null resource called null_resource.run_script and realize that you need to rerun the script. Which of the following commands would you use first?

- A. terraform taint null_resource.run_script
- B. terraform apply -target=null_resource.run_script
- C. terraform validate null_resource.run_script
- D. terraform plan -target=null_resource.run_script

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75954-exam-terraform-associate-topic-1-question-6-discussion/)
> A

## Question 7
---
Which provisioner invokes a process on the resource created by Terraform?

- A. remote-exec
- B. null-exec
- C. local-exec
- D. file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74490-exam-terraform-associate-topic-1-question-7-discussion/)
> A

## Question 8
---
Which of the following is not true of Terraform providers?

- A. Providers can be written by individuals
- B. Providers can be maintained by a community of users
- C. Some providers are maintained by HashiCorp
- D. Major cloud vendors and non-cloud vendors can write, maintain, or collaborate on Terraform providers
- E. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74084-exam-terraform-associate-topic-1-question-8-discussion/)
> E

## Question 9
---
What command does Terraform require the first time you run it within a configuration directory?  

- A. terraform import
- B. terraform init
- C. terraform plan
- D. terraform workspace

> [!done]- Answer
> B

## Question 10
---
You have deployed a new webapp with a public IP address on a cloud provider. However, you did not create any outputs for your code.
What is the best method to quickly find the IP address of the resource you deployed?

- A. Run terraform output ip_address to view the result
- B. In a new folder, use the terraform_remote_state data source to load in the state file, then write an output for each resource that you find the state file
- C. Run terraform state list to find the name of the resource, then terraform state show to find the attributes including public IP address
- D. Run terraform destroy then terraform apply and look for the IP address in stdout

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74085-exam-terraform-associate-topic-1-question-10-discussion/)
> C

## Question 11
---
Which of the following is not a key principle of infrastructure as code?

- A. Versioned infrastructure
- B. Golden images
- C. Idempotence
- D. Self-describing infrastructure

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74491-exam-terraform-associate-topic-1-question-11-discussion/)
> B

## Question 12
---
Terraform variables and outputs that set the "description" argument will store that description in the state file.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/78939-exam-terraform-associate-topic-1-question-12-discussion/)
> B

## Question 13
---
What is the provider for this fictitious resource?
![](https://www.examtopics.com/assets/media/exam-media/04279/0000800001.png)

- A. vpc
- B. main
- C. aws
- D. test

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75676-exam-terraform-associate-topic-1-question-13-discussion/)
> C

## Question 14
---
If you manually destroy infrastructure, what is the best practice reflecting this change in Terraform?

- A. Run terraform refresh
- B. It will happen automatically
- C. Manually update the state fire
- D. Run terraform import

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74312-exam-terraform-associate-topic-1-question-14-discussion/)
> A

## Question 15
---
What is not processed when running a terraform refresh?

- A. State file
- B. Configuration file
- C. Credentials
- D. Cloud provider

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74493-exam-terraform-associate-topic-1-question-15-discussion/)
> B, State file is updated during refresh, Cloud provider is required for comparing the state file and the cloud infrastructure, Credentials is required for Cloud provider

## Question 16
---
What information does the public Terraform Module Registry automatically expose about published modules?

- A. Required input variables
- B. Optional inputs variables and default values
- C. Outputs
- D. All of the above
- E. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74314-exam-terraform-associate-topic-1-question-16-discussion/)
> D

## Question 17
---
If a module uses a local values, you can expose that value with a terraform output.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/81400-exam-terraform-associate-topic-1-question-17-discussion/)
> A

## Question 18
---
You should store secret data in the same version control repository as your Terraform configuration.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75203-exam-terraform-associate-topic-1-question-18-discussion/)
> B

## Question 19
---
Which of the following is not a valid string function in Terraform?

- A. split
- B. join
- C. slice
- D. chomp

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74099-exam-terraform-associate-topic-1-question-19-discussion/)
> C

## Question 20
---
You have provisioned some virtual machines (VMs) on Google Cloud Platform (GCP) using the gcloud command line tool. However, you are standardizing with Terraform and want to manage these VMs using Terraform instead. What are the two things you must do to achieve this? (Choose two.)

- A. Provision new VMs using Terraform with the same VM names
- B. Use the terraform import command for the existing VMs
- C. Write Terraform configuration for the existing VMs
- D. Run the terraform import-gcp command

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74316-exam-terraform-associate-topic-1-question-20-discussion/)
> BC

## Question 21
---
You have recently started a new job at a retailer as an engineer. As part of this new role, you have been tasked with evaluating multiple outages that occurred during peak shopping time during the holiday season. Your investigation found that the team is manually deploying new compute instances and configuring each compute instance manually. This has led to inconsistent configuration between each compute instance. How would you solve this using infrastructure as code?

- A. Implement a ticketing workflow that makes engineers submit a ticket before manually provisioning and configuring a resource
- B. Implement a checklist that engineers can follow when configuring compute instances
- C. Replace the compute instance type with a larger version to reduce the number of required deployments
- D. Implement a provisioning pipeline that deploys infrastructure configurations committed to your version control system following code reviews

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74317-exam-terraform-associate-topic-1-question-21-discussion/)
> D

## Question 22
---
terraform init initializes a sample main.tf file in the current directory.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79070-exam-terraform-associate-topic-1-question-22-discussion/)
> B

## Question 23
---
Which two steps are required to provision new infrastructure in the Terraform workflow? (Choose two.)

- A. Destroy
- B. Apply
- C. Import
- D. Init
- E. Validate

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75678-exam-terraform-associate-topic-1-question-23-discussion/)
> BD

## Question 24
---
Why would you use the terraform taint command?

- A. When you want to force Terraform to destroy a resource on the next apply
- B. When you want to force Terraform to destroy and recreate a resource on the next apply
- C. When you want Terraform to ignore a resource on the next apply
- D. When you want Terraform to destroy all the infrastructure in your workspace

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75433-exam-terraform-associate-topic-1-question-24-discussion/)
> B

## Question 25
---
Terraform requires the Go runtime as a prerequisite for installation.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76734-exam-terraform-associate-topic-1-question-25-discussion/)
> B

## Question 26
---
When should you use the force-unlock command?

- A. You see a status message that you cannot acquire the lock
- B. You have a high priority change
- C. Automatic unlocking failed
- D. You apply failed due to a state lock

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75054-exam-terraform-associate-topic-1-question-26-discussion/)
> C

## Question 27
---
Terraform can import modules from a number of sources which of the following is not a valid source?

- A. FTP server
- B. GitHub repository
- C. Local path
- D. Terraform Module Registry

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75680-exam-terraform-associate-topic-1-question-27-discussion/)
> A

## Question 28
---
Which of the following is available only in Terraform Enterprise or Cloud workspaces and not in Terraform CLI?

- A. Secure variable storage
- B. Support for multiple cloud providers
- C. Dry runs with terraform plan
- D. Using the workspace as a data source

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74318-exam-terraform-associate-topic-1-question-28-discussion/)
> A

## Question 29
---
terraform validate validates the syntax of Terraform files.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76192-exam-terraform-associate-topic-1-question-29-discussion/)
> A

## Question 30
---
You have used Terraform to create an ephemeral development environment in the cloud and are now ready to destroy all the infrastructure described by your Terraform configuration. To be safe, you would like to first see all the infrastructure that will be deleted by Terraform. Which command should you use to show all of the resources that will be deleted? (Choose two.)

- A. Run terraform plan -destroy.
- B. This is not possible. You can only show resources that will be created.
- C. Run terraform state rm *.
- D. Run terraform destroy and it will first output all the resources that will be deleted before prompting for approval.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74957-exam-terraform-associate-topic-1-question-30-discussion/)
> AD

## Question 31
---
Which of the following is the correct way to pass the value in the variable num_servers into a module with the input servers?

- A. servers = num_servers
- B. servers = variable.num_servers
- C. servers = var(num_servers)
- D. servers = var.num_servers

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74319-exam-terraform-associate-topic-1-question-31-discussion/)
> D

## Question 32
---
A Terraform provisioner must be nested inside a resource configuration block.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76904-exam-terraform-associate-topic-1-question-32-discussion/)
> A

## Question 33
---
Terraform can run on Windows or Linux, but it requires a Server version of the Windows operating system.

- A. True
- B. False

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75682-exam-terraform-associate-topic-1-question-33-discussion/)
> B, Terraform is platform-agnostic

## Question 34
---
What does the default "local" Terraform backend store?

- A. tfplan files
- B. Terraform binary
- C. Provider plugins
- D. State file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75683-exam-terraform-associate-topic-1-question-34-discussion/)
> D

## Question 35
---
You have multiple team members collaborating on infrastructure as code (IaC) using Terraform, and want to apply formatting standards for readability. How can you format Terraform HCL (HashiCorp Configuration Language) code according to standard Terraform style convention?

- A. Run the terraform fmt command during the code linting phase of your CI/CD process
- B. Designate one person in each team to review and format everyone's code
- C. Manually apply two spaces indentation and align equal sign "=" characters in every Terraform file (*.tf)
- D. Write a shell script to transform Terraform files using tools such as AWK, Python, and sed

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74322-exam-terraform-associate-topic-1-question-35-discussion/)
> A

## Question 36
---
What value does the Terraform Cloud/Terraform Enterprise private module registry provide over the public Terraform Module Registry?

- A. The ability to share modules with public Terraform users and members of Terraform Enterprise Organizations
- B. The ability to tag modules by version or release
- C. The ability to restrict modules to members of Terraform Cloud or Enterprise organizations
- D. The ability to share modules publicly with any user of Terraform

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74324-exam-terraform-associate-topic-1-question-36-discussion/)
> C

## Question 37
---
Which task does terraform init not perform?

- A. Sources all providers present in the configuration and ensures they are downloaded and available locally
- B. Connects to the backend
- C. Sources any modules and copies the configuration locally
- D. Validates all required variables are present

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76384-exam-terraform-associate-topic-1-question-37-discussion/)
> D, this is done by plan or apply

## Question 38
---
You have declared a variable called var.list which is a list of objects that all have an attribute id. Which options will produce a list of the IDs? (Choose two.)

- A. `{ for o in var.list : o => o.id }`
- B. `var.list[*].id`
- C. `[ var.list[*].id ]`
- D. `[ for o in var.list : o.id ]`

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75092-exam-terraform-associate-topic-1-question-38-discussion/)
> BD, According to the [official doc](https://developer.hashicorp.com/terraform/language/expressions/splat), splat expression provides a more concise way to express a common operation that could otherwise be performed with a for expression.

## Question 39
---
Which argument(s) is (are) required when declaring a Terraform variable?

- A. type
- B. default
- C. description
- D. All of the above
- E. None of the above

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74327-exam-terraform-associate-topic-1-question-39-discussion/)
> E, we can define a variable without a type

## Question 40
---
When using a module block to reference a module stored on the public Terraform Module Registry such as:
![](https://www.examtopics.com/assets/media/exam-media/04279/0002300001.png)
How do you specify version 1.0.0?

- A. Modules stored on the public Terraform Module Registry do not support versioning
- B. Append ?ref=v1.0.0 argument to the source path
- C. Add version = "1.0.0" attribute to module block
- D. Nothing ג€" modules stored on the public Terraform Module Registry always default to version 1.0.0

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76479-exam-terraform-associate-topic-1-question-40-discussion/)
> C

## Question 41
---
What features does the hosted service Terraform Cloud provide? (Choose two.)

- A. Automated infrastructure deployment visualization
- B. Automatic backups
- C. Remote state storage
- D. A web-based user interface (UI)

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76327-exam-terraform-associate-topic-1-question-41-discussion/)
> CD

## Question 42
---
Where does the Terraform local backend store its state?

- A. In the /tmp directory
- B. In the terraform file
- C. In the terraform.tfstate file
- D. In the user's terraform.state file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/78954-exam-terraform-associate-topic-1-question-42-discussion/)
> C

## Question 43
---
Which option can not be used to keep secrets out of Terraform configuration files?

- A. A Terraform provider
- B. Environment variables
- C. A -var flag
- D. secure string

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75093-exam-terraform-associate-topic-1-question-43-discussion/)
> D, Terraform providers such as Vault can be used to supply secrets

## Question 44
---
What is one disadvantage of using dynamic blocks in Terraform?

- A. They cannot be used to loop through a list of values
- B. Dynamic blocks can construct repeatable nested blocks
- C. They make configuration harder to read and understand
- D. Terraform will run more slowly

> [!done]- Answer
> C

## Question 45
---
Only the user that generated a plan may apply it.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74958-exam-terraform-associate-topic-1-question-45-discussion/)
> B

## Question 46
---
Examine the following Terraform configuration, which uses the data source for an AWS AMI. What value should you enter for the ami argument in the AWS instance resource?
![](https://www.examtopics.com/assets/media/exam-media/04279/0002600001.png)

- A. aws_ami.ubuntu
- B. data.aws_ami.ubuntu
- C. data.aws_ami.ubuntu.id
- D. aws_ami.ubuntu.id

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76717-exam-terraform-associate-topic-1-question-46-discussion/)
> C

## Question 47
---
FILL BLANK -
You need to specify a dependency manually. What resource meta-parameter can you use to make sure Terraform respects the dependency? Type your answer in the field provided. The text field is not case-sensitive and all variations of the correct answer are accepted.

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76388-exam-terraform-associate-topic-1-question-47-discussion/)
> depends_on

## Question 48
---
You have never used Terraform before and would like to test it out using a shared team account for a cloud provider. The shared team account already contains 15 virtual machines (VM). You develop a Terraform configuration containing one VM, perform terraform apply, and see that your VM was created successfully. What should you do to delete the newly-created VM with Terraform?

- A. The Terraform state file contains all 16 VMs in the team account. Execute terraform destroy and select the newly-created VM.
- B. The Terraform state file only contains the one new VM. Execute terraform destroy.
- C. Delete the Terraform state file and execute Terraform apply.
- D. Delete the VM using the cloud provider console and terraform apply to apply the changes to the Terraform state file.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75952-exam-terraform-associate-topic-1-question-48-discussion/)
> B

## Question 49
---
What is the name assigned by Terraform to reference this resource?
![](https://www.examtopics.com/assets/media/exam-media/04279/0002800001.png)

- A. dev
- B. azurerm_resource_group
- C. azurerm
- D. test

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74438-exam-terraform-associate-topic-1-question-49-discussion/)
> A

## Question 50
---
Setting the TF_LOG environment variable to DEBUG causes debug messages to be logged into syslog.

- A. True
- B. False

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74899-exam-terraform-associate-topic-1-question-50-discussion/)
> B, TF_LOG_PATH is required for syslog

## Question 51
---
Where in your Terraform configuration do you specify a state backend?

- A. The terraform block
- B. The resource block
- C. The provider block
- D. The datasource block

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76913-exam-terraform-associate-topic-1-question-51-discussion/)
> A

## Question 52
---
In Terraform 0.13 and above, outside of the required_providers block, Terraform configurations always refer to providers by their local names.

- A. True
- B. False

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75721-exam-terraform-associate-topic-1-question-52-discussion/)
> A, [official doc](https://developer.hashicorp.com/terraform/language/providers/requirements#local-names)

## Question 53
---
What command should you run to display all workspaces for the current configuration?

- A. terraform workspace
- B. terraform workspace show
- C. terraform workspace list
- D. terraform show workspace

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76737-exam-terraform-associate-topic-1-question-53-discussion/)
> C

## Question 54
---
Terraform providers are always installed from the Internet.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75722-exam-terraform-associate-topic-1-question-54-discussion/)
> B

## Question 55
---
Which of these is the best practice to protect sensitive values in state files?

- A. Blockchain
- B. Secure Sockets Layer (SSL)
- C. Enhanced remote backends
- D. Signed Terraform providers

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75244-exam-terraform-associate-topic-1-question-55-discussion/)
> C

## Question 56
---
When does terraform apply reflect changes in the cloud environment?

- A. Immediately
- B. However long it takes the resource provider to fulfill the request
- C. After updating the state file
- D. Based on the value provided to the -refresh command line argument
- E. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74960-exam-terraform-associate-topic-1-question-56-discussion/)
> B

## Question 57
---
How would you reference the "name" value of the second instance of this fictitious resource?
![](https://www.examtopics.com/assets/media/exam-media/04279/0003200001.png)

- A. `element(aws_instance.web, 2)`
- B. `aws_instance.web[1].name`
- C. `aws_instance.web[1]`
- D. `aws_instance.web[2].name`
- E. `aws_instance.web.*.name`

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74961-exam-terraform-associate-topic-1-question-57-discussion/)
> B

## Question 58
---
A Terraform provider is not responsible for:

- A. Understanding API interactions with some service
- B. Provisioning infrastructure in multiple clouds
- C. Exposing resources and data sources based on an API
- D. Managing actions to take based on resource differences

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76736-exam-terraform-associate-topic-1-question-58-discussion/)
> B, Terraform provider(AWS) is not responsible for provisioning in multiple clouds(Azure/GCP)

## Question 59
---
Terraform provisioners can be added to any resource block.

- A. True
- B. False

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75723-exam-terraform-associate-topic-1-question-59-discussion/)
> A, can perform "local-exec"

## Question 60
---
What is terraform refresh intended to detect?

- A. Terraform configuration code changes
- B. Empty state files
- C. State file drift
- D. Corrupt state files

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76752-exam-terraform-associate-topic-1-question-60-discussion/)
> C

## Question 61
---
FILL BLANK -
Which flag would you add to terraform plan to save the execution plan to a file?
Type your answer in the field provided. The text field is not case-sensitive and all variations of the correct answer are accepted.

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77137-exam-terraform-associate-topic-1-question-61-discussion/)
> -out=FILENAME

## Question 62
---
FILL BLANK -
What is the name of the default file where Terraform stores the state?
Type your answer in the field provided. The text field is not case-sensitive and all variations of the correct answer are accepted.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77138-exam-terraform-associate-topic-1-question-62-discussion/)
> terraform.tfstate

## Question 63
---
A Terraform local value can reference other Terraform local values.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77139-exam-terraform-associate-topic-1-question-63-discussion/)
> A

## Question 64
---
Which of the following is not a valid Terraform collection type?

- A. list
- B. map
- C. tree
- D. set

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77140-exam-terraform-associate-topic-1-question-64-discussion/)
> C

## Question 65
---
When running the command terraform taint against a managed resource you want to force recreation upon, Terraform will immediately destroy and recreate the resource.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76494-exam-terraform-associate-topic-1-question-65-discussion/)
> B

## Question 66
---
All standard backend types support state storage, locking, and remote operations like plan, apply and destroy.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75508-exam-terraform-associate-topic-1-question-66-discussion/)
> B

## Question 67
---
How can terraform plan aid in the development process?

- A. Validates your expectations against the execution plan without permanently modifying state
- B. Initializes your working directory containing your Terraform configuration files
- C. Formats your Terraform configuration files
- D. Reconciles Terraform's state against deployed resources and permanently modifies state using the current status of deployed resources

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76915-exam-terraform-associate-topic-1-question-67-discussion/)
> A

## Question 68
---
You would like to reuse the same Terraform configuration for your development and production environments with a different state file for each.
Which command would you use?

- A. terraform import
- B. terraform workspace
- C. terraform state
- D. terraform init

> [!done]- Answer
> B

## Question 69
---
What is the name assigned by Terraform to reference this resource?
![](https://www.examtopics.com/assets/media/exam-media/04279/0004000001.png)

- A. compute_instance
- B. main
- C. google
- D. test

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77141-exam-terraform-associate-topic-1-question-69-discussion/)
> B, not D as Terraform is referencing this resource by name "main"

## Question 70
---
You're building a CI/CD (continuous integration/ continuous delivery) pipeline and need to inject sensitive variables into your Terraform run.
How can you do this safely?

- A. Pass variables to Terraform with a ג€"var flag
- B. Copy the sensitive variables into your Terraform code
- C. Store the sensitive variables in a secure_vars.tf file
- D. Store the sensitive variables as plain text in a source code repository

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75266-exam-terraform-associate-topic-1-question-70-discussion/)
> A

## Question 71
---
Your security team scanned some Terraform workspaces and found secrets stored in a plaintext in state files.
How can you protect sensitive data stored in Terraform state files?

- A. Delete the state file every time you run Terraform
- B. Store the state in an encrypted backend
- C. Edit your state file to scrub out the sensitive data
- D. Always store your secrets in a secrets.tfvars file.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77142-exam-terraform-associate-topic-1-question-71-discussion/)
> B

## Question 72
---
In contrast to Terraform Open Source, when working with Terraform Enterprise and Cloud Workspaces, conceptually you could think about them as completely separate working directories.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76916-exam-terraform-associate-topic-1-question-72-discussion/)
> A

## Question 73
---
You want to know from which paths Terraform is loading providers referenced in your Terraform configuration (`*.tf files`). You need to enable debug messages to find this out.
Which of the following would achieve this?

- A. Set the environment variable TF_LOG=TRACE
- B. Set verbose logging for each provider in your Terraform configuration
- C. Set the environment variable TF_VAR_log=TRACE
- D. Set the environment variable TF_LOG_PATH

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77000-exam-terraform-associate-topic-1-question-73-discussion/)
> A

## Question 74
---
How is terraform import run?

- A. As a part of terraform init
- B. As a part of terraform plan
- C. As a part of terraform refresh
- D. By an explicit call
- E. All of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77168-exam-terraform-associate-topic-1-question-74-discussion/)
> D

## Question 75
---
You have a simple Terraform configuration containing one virtual machine (VM) in a cloud provider. You run terraform apply and the VM is created successfully.
What will happen if you delete the VM using the cloud provider console, and run terraform apply again without changing any Terraform code?

- A. Terraform will remove the VM from state file
- B. Terraform will report an error
- C. Terraform will not make any changes
- D. Terraform will recreate the VM

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74965-exam-terraform-associate-topic-1-question-75-discussion/)
> D

## Question 76
---
Which of these options is the most secure place to store secrets for connecting to a Terraform remote backend?

- A. Defined in Environment variables
- B. Inside the backend block within the Terraform configuration
- C. Defined in a connection configuration outside of Terraform
- D. None of above

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76919-exam-terraform-associate-topic-1-question-76-discussion/)
> C, A is also possible but storing secrets in external storage such as Vault is more safer

## Question 77
---
Your DevOps team is currently using the local backend for your Terraform configuration. You would like to move to a remote backend to begin storing the state file in a central location.
Which of the following backends would not work?

- A. Amazon S3
- B. Artifactory
- C. Git
- D. Terraform Cloud

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74893-exam-terraform-associate-topic-1-question-77-discussion/)
> C, B is deprecated after Terraform v1.3

## Question 78
---
Which backend does the Terraform CLI use by default?

- A. Terraform Cloud
- B. Consul
- C. Remote
- D. Local

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76921-exam-terraform-associate-topic-1-question-78-discussion/)
> D

## Question 79
---
When you initialize Terraform, where does it cache modules from the public Terraform Module Registry?

- A. On disk in the /tmp directory
- B. In memory
- C. On disk in the .terraform sub-directory
- D. They are not cached

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76740-exam-terraform-associate-topic-1-question-79-discussion/)
> C

## Question 80
---
You write a new Terraform configuration and immediately run terraform apply in the CLI using the local backend.
Why will the apply fail?

- A. Terraform needs you to format your code according to best practices first
- B. Terraform needs to install the necessary plugins first
- C. The Terraform CLI needs you to log into Terraform cloud first
- D. Terraform requires you to manually run terraform plan first

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74894-exam-terraform-associate-topic-1-question-80-discussion/)
> B

## Question 81
---
What features stops multiple admins from changing the Terraform state at the same time?

- A. Version control
- B. Backend types
- C. Provider constraints
- D. State locking

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76741-exam-terraform-associate-topic-1-question-81-discussion/)
> D

## Question 82
---
A fellow developer on your team is asking for some help in refactoring their Terraform code. As part of their application's architecture, they are going to tear down an existing deployment managed by Terraform and deploy new. However, there is a server resource named `aws_instance.ubuntu[1]` they would like to keep to perform some additional analysis.
What command should be used to tell Terraform to no longer manage the resource?

- A. `terraform apply rm aws_instance.ubuntu[1]`
- B. `terraform state rm aws_instance.ubuntu[1]`
- C. `terraform plan rm aws_instance.ubuntu[1]`
- D. `terraform delete aws_instance.ubuntu[1]`

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76922-exam-terraform-associate-topic-1-question-82-discussion/)
> B

## Question 83
---
Terraform can only manage resource dependencies if you set them explicitly with the depends_on argument.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75127-exam-terraform-associate-topic-1-question-83-discussion/)
> B

## Question 84
---
A terraform apply can not _________ infrastructure.

- A. change
- B. destroy
- C. provision
- D. import

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79263-exam-terraform-associate-topic-1-question-84-discussion/)
> D

## Question 85
---
You need to constrain the GitHub provider to version 2.1 or greater.
Which of the following should you put into the Terraform 0.12 configuration's provider block?

- A. version >= 2.1
- B. version ~> 2.1
- C. version = "<= 2.1"
- D. version = ">= 2.1"

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75724-exam-terraform-associate-topic-1-question-85-discussion/)
> D

## Question 86
---
You just scaled your VM infrastructure and realized you set the count variable to the wrong value. You correct the value and save your change.
What do you do next to make your infrastructure match your configuration?

- A. Run an apply and confirm the planned changes
- B. Inspect your Terraform state because you want to change it
- C. Reinitialize because your configuration has changed
- D. Inspect all Terraform outputs to make sure they are correct

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74898-exam-terraform-associate-topic-1-question-86-discussion/)
> A

## Question 87
---
Terraform provisioners that require authentication can use the ______ block.

- A. connection
- B. credentials
- C. secrets
- D. ssh

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76923-exam-terraform-associate-topic-1-question-87-discussion/)
> A

## Question 88
---
Terraform validate reports syntax check errors from which of the following scenarios?

- A. Code contains tabs indentation instead of spaces
- B. There is missing value for a variable
- C. The state files does not match the current infrastructure
- D. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76924-exam-terraform-associate-topic-1-question-88-discussion/)
> D

## Question 89
---
Which of the following is allowed as a Terraform variable name?

- A. count
- B. name
- C. source
- D. version

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76925-exam-terraform-associate-topic-1-question-89-discussion/)
> B

## Question 90
---
What type of block is used to construct a collection of nested configuration blocks?

- A. for_each
- B. repeated
- C. nesting
- D. dynamic

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76561-exam-terraform-associate-topic-1-question-90-discussion/)
> D

## Question 91
---
Module variable assignments are inherited from the parent module and do not need to be explicitly set.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76632-exam-terraform-associate-topic-1-question-91-discussion/)
> B

## Question 92
---
If writing Terraform code that adheres to the Terraform style conventions, how would you properly indent each nesting level compared to the one above it?

- A. With four spaces
- B. With a tab
- C. With three spaces
- D. With two spaces

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77340-exam-terraform-associate-topic-1-question-92-discussion/)
> D

## Question 93
---
Which of the following is not an action performed by terraform init?

- A. Create a sample main.tf file
- B. Initialize a configured backend
- C. Retrieve the source code for all referenced modules
- D. Load required provider plugins

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77341-exam-terraform-associate-topic-1-question-93-discussion/)
> A

## Question 94
---
HashiCorp Configuration Language (HCL) supports user-defined functions.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77342-exam-terraform-associate-topic-1-question-94-discussion/)
> B

## Question 95
---
How can you trigger a run in a Terraform Cloud workspace that is connected to a Version Control System (VCS) repository?

- A. Only Terraform Cloud organization owners can set workspace variables on VCS connected workspaces
- B. Commit a change to the VCS working directory and branch that the Terraform Cloud workspace is connected to
- C. Only members of a VCS organization can open a pull request against repositories that are connected to Terraform Cloud workspaces
- D. Only Terraform Cloud organization owners can approve plans in VCS connected workspaces

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77343-exam-terraform-associate-topic-1-question-95-discussion/)
> B

## Question 96
---
Terraform and Terraform providers must use the same major version number in a single configuration.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/76928-exam-terraform-associate-topic-1-question-96-discussion/)
> B

## Question 97
---
Which statement describes a goal of infrastructure as code?

- A. An abstraction from vendor specific APIs
- B. Write once, run anywhere
- C. A pipeline process to test and deliver software
- D. The programmatic configuration of resources

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75725-exam-terraform-associate-topic-1-question-97-discussion/)
> D

## Question 98
---
When using Terraform to deploy resources into Azure, which scenarios are true regarding state files? (Choose two.)

- A. When a change is made to the resources via the Azure Cloud Console, the changes are recorded in a new state file
- B. When a change is made to the resources via the Azure Cloud Console, Terraform will update the state file to reflect them during the next plan or apply
- C. When a change is made to the resources via the Azure Cloud Console, the current state file will not be updated
- D. When a change is made to the resources via the Azure Cloud Console, the changes are recorded in the current state file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/74985-exam-terraform-associate-topic-1-question-98-discussion/)
> C

## Question 99
---
You need to deploy resources into two different cloud regions in the same Terraform configuration. To do that, you declare multiple provider configurations as follows:
![](https://www.examtopics.com/assets/media/exam-media/04279/0005900001.png)
What meta-argument do you need to configure in a resource block to deploy the resource to the `us-west-2` AWS region?

- A. alias = west
- B. provider = west
- C. provider = aws.west
- D. alias = aws.west

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75456-exam-terraform-associate-topic-1-question-99-discussion/)
> C

## Question 100
---
You have declared an input variable called environment in your parent module. What must you do to pass the value to a child module in the configuration?

- A. Add node_count = var.node_count
- B. Declare the variable in a terraform.tfvars file
- C. Declare a node_count input variable for child module
- D. Nothing, child modules inherit variables of parent module

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/77518-exam-terraform-associate-topic-1-question-100-discussion/)
> C

## Question 101
---
If a module declares a variable with a default, that variable must also be defined within the module.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/75388-exam-terraform-associate-topic-1-question-101-discussion/)
> B

## Question 102
---
Which option cannot be used to keep secrets out of Terraform configuration files?

- A. Environment Variables
- B. Mark the variable as sensitive
- C. A Terraform provider
- D. A -var flag

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/78961-exam-terraform-associate-topic-1-question-102-discussion/)
> B

## Question 103
---
Which of the following arguments are required when declaring a Terraform output?

- A. sensitive
- B. description
- C. default
- D. value

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79120-exam-terraform-associate-topic-1-question-103-discussion/)
> D

## Question 104
---
Your risk management organization requires that new AWS S3 buckets must be private and encrypted at rest. How can Terraform Enterprise automatically and proactively enforce this security control?

- A. With a Sentinel policy, which runs before every apply
- B. By adding variables to each TFE workspace to ensure these settings are always enabled
- C. With an S3 module with proper settings for buckets
- D. Auditing cloud storage buckets with a vulnerability scanning tool

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/78962-exam-terraform-associate-topic-1-question-104-discussion/)
> A

## Question 105
---
Most Terraform providers interact with ____________.

- A. API
- B. VCS Systems
- C. Shell scripts
- D. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79483-exam-terraform-associate-topic-1-question-105-discussion/)
> A

## Question 106
---
terraform validate validates that your infrastructure matches the Terraform state file.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79014-exam-terraform-associate-topic-1-question-106-discussion/)
> B

## Question 107
---
What does terraform import allow you to do?

- A. Import a new Terraform module
- B. Use a state file to import infrastructure to the cloud
- C. Import provisioned infrastructure to your state file
- D. Import an existing state file to a new Terraform workspace

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79122-exam-terraform-associate-topic-1-question-107-discussion/)
> C

## Question 108
---
FILL BLANK -
In the below configuration, how would you reference the module output vpc_id?
![](https://www.examtopics.com/assets/media/exam-media/04279/0006300001.png)
Type your answer in the field provided. The text field is not case sensitive and all variations of the correct answer are accepted.


> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79123-exam-terraform-associate-topic-1-question-108-discussion/)
> module.vpc.vpc_id

## Question 109
---
How would you reference the Volume IDs associated with the ebs_block_device blocks in this configuration?
![](https://www.examtopics.com/assets/media/exam-media/04279/0006400001.png)

- A. `aws_instance.example.ebs_block_device.[*].volume_id`
- B. `aws_instance.example.ebs_block_device.volume_id`
- C. `aws_instance.example.ebs_block_device[sda2,sda3].volume_id`
- D. `aws_instance.example.ebs_block_device.*.volume_id`

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79464-exam-terraform-associate-topic-1-question-109-discussion/)
> D

## Question 110
---
What does state locking accomplish?

- A. Copies the state file from memory to disk
- B. Encrypts any credentials stored within the state file
- C. Blocks Terraform commands from modifying the state file
- D. Prevents accidental deletion of the state file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79012-exam-terraform-associate-topic-1-question-110-discussion/)
> C

## Question 111
---
You just upgraded the version of a provider in an existing Terraform project. What do you need to do to install the new provider?

- A. Run terraform apply -upgrade
- B. Run terraform init -upgrade
- C. Run terraform refresh
- D. Upgrade your version of Terraform

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79496-exam-terraform-associate-topic-1-question-111-discussion/)
> B

## Question 112
---
A module can always refer to all variables declared in its parent module.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79128-exam-terraform-associate-topic-1-question-112-discussion/)
> B

## Question 113
---
When you use a remote backend that needs authentication, HashiCorp recommends that you:

- A. Use partial configuration to load the authentication credentials outside of the Terraform code
- B. Push your Terraform configuration to an encrypted git repository
- C. Write the authentication credentials in the Terraform configuration files
- D. Keep the Terraform configuration files in a secret store

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79130-exam-terraform-associate-topic-1-question-113-discussion/)
> A

## Question 114
---
You have a simple Terraform configuration containing one virtual machine (VM) in a cloud provider. You run terraform apply and the VM is created successfully.
What will happen if you terraform apply again immediately afterwards without changing any Terraform code?

- A. Terraform will terminate and recreate the VM
- B. Terraform will create another duplicate VM
- C. Terraform will apply the VM to the state file
- D. Nothing

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79131-exam-terraform-associate-topic-1-question-114-discussion/)
> D

## Question 115
---
A junior admin accidentally deleted some of your cloud instances. What does Terraform do when you run terraform apply?

- A. Build a completely brand new set of infrastructure
- B. Tear down the entire workspace infrastructure and rebuild it
- C. Rebuild only the instances that were deleted
- D. Stop and generate an error message about the missing instances

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79085-exam-terraform-associate-topic-1-question-115-discussion/)
> C

## Question 116
---
You have created a main.tf Terraform configuration consisting of an application server, a database, and a load balancer. You ran terraform apply and all resources were created successfully. Now you realize that you do not actually need the load balancer so you run terraform destroy without any flags What will happen?

- A. Terraform will destroy the application server because it is listed first in the code
- B. Terraform will prompt you to confirm that you want to destroy all the infrastructure
- C. Terraform will destroy the main.tf file
- D. Terraform will prompt you to pick which resource you want to destroy
- E. Terraform will immediately destroy all the infrastructure

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79133-exam-terraform-associate-topic-1-question-116-discussion/)
> B

## Question 117
---
Which type of block fetches or computes information for use elsewhere in a Terraform configuration?

- A. provider
- B. resource
- C. local
- D. data

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79137-exam-terraform-associate-topic-1-question-117-discussion/)
> D, Data sources allow data to be fetched or computed for use elsewhere in Terraform configuration. Use of data sources allows a Terraform configuration to build on information defined outside of Terraform, or defined by another separate Terraform configuration.

## Question 118
---
You have just developed a new Terraform configuration for two virtual machines with a cloud provider. You would like to create the infrastructure for the first time.
Which Terraform command should you run first?

- A. terraform apply
- B. terraform plan
- C. terraform show
- D. terraform init

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79138-exam-terraform-associate-topic-1-question-118-discussion/)
> D

## Question 119
---
All modules published on the official Terraform Module Registry have been verified by HashiCorp.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80142-exam-terraform-associate-topic-1-question-119-discussion/)
> B

## Question 120
---
You have to initialize a Terraform backend before it can be configured.

- A. True
- B. False

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80143-exam-terraform-associate-topic-1-question-120-discussion/)
> B, you have to configure first and then initialize

## Question 121
---
Which of the following does terraform apply change after you approve the execution plan? (Choose two.)

- A. Cloud infrastructure
- B. The .terraform directory
- C. The execution plan
- D. State file
- E. Terraform code

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79141-exam-terraform-associate-topic-1-question-121-discussion/)
> AD

## Question 122
---
A Terraform backend determines how Terraform loads state and stores updates when you execute ___________.

- A. apply
- B. taint
- C. destroy
- D. All of the above
- E. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79163-exam-terraform-associate-topic-1-question-122-discussion/)
> D

## Question 123
---
What does Terraform use .terraform.lock.hcl file for?

- A. Tracking provider dependencies
- B. There is no such file
- C. Preventing Terraform runs from occurring
- D. Storing references to workspaces which are locked

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79148-exam-terraform-associate-topic-1-question-123-discussion/)
> A, The .terraform.lock.hcl file is used to track provider dependencies and their exact versions.

## Question 124
---
You've used Terraform to deploy a virtual machine and a database. You want to replace this virtual machine instance with an identical one without affecting the database. What is the best way to achieve this using Terraform?

- A. Use the terraform state rm command to remove the VM from state file
- B. Use the terraform taint command targeting the VMs then run terraform plan and terraform apply
- C. Use the terraform apply command targeting the VM resources only
- D. Delete the Terraform VM resources from your Terraform code then run terraform plan and terraform apply

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80548-exam-terraform-associate-topic-1-question-124-discussion/)
> B

## Question 125
---
How do you specify a module's version when publishing it to the public Terraform Module Registry?

- A. The module's configuration page on the Terraform Module Registry
- B. Terraform Module Registry does not support versioning modules
- C. The release tags in the associated repo
- D. The module's Terraform code

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79157-exam-terraform-associate-topic-1-question-125-discussion/)
> C, For example, GitHub release tag will be the version of the module

## Question 126
---
Terraform plan updates your state file.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79023-exam-terraform-associate-topic-1-question-126-discussion/)
> B

## Question 127
---
To check if all code in a Terraform configuration with multiple modules is properly formatted without making changes, what command should be run?

- A. terraform fmt -check
- B. terraform fmt -write-false
- C. terraform fmt -list -recursive
- D. terraform fmt -check -recursive

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79527-exam-terraform-associate-topic-1-question-127-discussion/)
> D

## Question 128
---
As a member of the operations team, you need to run a script on a virtual machine created by Terraform. Which provision is best to use in your Terraform code?

- A. null-exec
- B. local-exec
- C. remote-exec
- D. file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79026-exam-terraform-associate-topic-1-question-128-discussion/)
> C

## Question 129
---
You are using a networking module in your Terraform configuration with the name label my_network. In your main configuration you have the following code:
![](https://www.examtopics.com/assets/media/exam-media/04279/0007200001.png)
When you run terraform validate, you get the following error:
![](https://www.examtopics.com/assets/media/exam-media/04279/0007200002.png)
What must you do to successfully retrieve this value from your networking module?

- A. Define the attribute vnet_id as a variable in the networking module
- B. Change the referenced value to module.my_network.outputs.vnet_id
- C. Define the attribute vnet_id as an output in the networking module
- D. Change the referenced value to my_network.outputs.vnet_id

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79532-exam-terraform-associate-topic-1-question-129-discussion/)
> C

## Question 130
---
You are writing a child Terraform module which provisions an AWS instance. You want to make use of the IP address returned in the root configuration. You name the instance resource "main".
Which of these is the correct way to define the output value using HCL2?
- A.
	![](https://www.examtopics.com/assets/media/exam-media/04279/0007300001.jpg)
- B.
	![](https://www.examtopics.com/assets/media/exam-media/04279/0007300002.jpg)

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80553-exam-terraform-associate-topic-1-question-130-discussion/)
> A

## Question 131
---
How can a ticket-based system slow down infrastructure provisioning and limit the ability to scale? (Choose two.)

- A. A full audit trail of the request and fulfillment process is generated
- B. A request must be submitted for infrastructure changes
- C. As additional resources are required, more tickets are submitted
- D. A catalog of approved resources can be accessed from drop down lists in a request form

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80427-exam-terraform-associate-topic-1-question-131-discussion/)
> BC

## Question 132
---
Which of the following statements about Terraform modules is not true?

- A. Modules must be publicly accessible
- B. Modules can be called multiple times
- C. Module is a container for one or more resources
- D. Modules can call other modules

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79027-exam-terraform-associate-topic-1-question-132-discussion/)
> A

## Question 133
---
Which Terraform collection type should you use to store key/value pairs?

- A. tuple
- B. set
- C. map
- D. list

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79029-exam-terraform-associate-topic-1-question-133-discussion/)
> C

## Question 134
---
You have used Terraform to create an ephemeral development environment in the cloud and are now ready to destroy all the infrastructure described by your Terraform configuration. To be safe, you would like to first see all the infrastructure that will be deleted by Terraform.
Which command should you use to show all of the resources that will be deleted? (Choose two.)

- A. Run terraform plan -destroy
- B. Run terraform show -destroy
- C. Run terraform destroy and it will first output all the resources that will be deleted before prompting for approval
- D. Run terraform show -destroy

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79158-exam-terraform-associate-topic-1-question-134-discussion/)
> AC

## Question 135
---
When do you need to explicitly execute terraform refresh?

- A. Before every terraform plan
- B. Before every terraform apply
- C. Before every terraform import
- D. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79030-exam-terraform-associate-topic-1-question-135-discussion/)
> D

## Question 136
---
All Terraform Cloud tiers support team management and governance.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79031-exam-terraform-associate-topic-1-question-136-discussion/)
> B

## Question 137
---
What advantage does an operations team that uses infrastructure as code have?

- A. The ability to delete infrastructure
- B. The ability to update existing infrastructure
- C. The ability to reuse best practice configurations and settings
- D. The ability to autoscale a group of servers

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79167-exam-terraform-associate-topic-1-question-137-discussion/)
> C

## Question 138
---
You have modified your Terraform configuration to fix a typo in the Terraform ID of a resource from aws_security_group.htp to aws_security_group.http
![](https://www.examtopics.com/assets/media/exam-media/04279/0007700001.jpg)
Which of the following commands would you run to update the ID in state without destroying the resource?

- A. terraform state mv aws_security_group.htp aws_security_group.http
- B. terraform apply
- C. terraform refresh

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79169-exam-terraform-associate-topic-1-question-138-discussion/)
> A

## Question 139
---
You are creating a Terraform configuration which needs to make use of multiple providers, one for AWS and one for Datadog.
Which of the following provider blocks would allow you to do this?
- A.
	![](https://www.examtopics.com/assets/media/exam-media/04279/0007800001.jpg)
- B.
	![](https://www.examtopics.com/assets/media/exam-media/04279/0007900001.jpg)
- C.
	![](https://www.examtopics.com/assets/media/exam-media/04279/0008000001.jpg)

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80556-exam-terraform-associate-topic-1-question-139-discussion/)
> B

## Question 140
---
Terraform variable names are saved in the state file.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80558-exam-terraform-associate-topic-1-question-140-discussion/)
> B

## Question 141
---
Terraform Cloud is available only as a paid offering from HashiCorp.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79171-exam-terraform-associate-topic-1-question-141-discussion/)
> B

## Question 142
---
Which of the following is not a way to trigger terraform destroy?

- A. Using the destroy command with auto-approve
- B. Running terraform destroy from the correct directory and then typing "yes" when prompted in the CLI
- C. Passing --destroy at the end of a plan request
- D. Delete the state file and run terraform apply

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80479-exam-terraform-associate-topic-1-question-142-discussion/)
> C

## Question 143
---
Which of the following is not an advantage of using infrastructure as code operations?

- A. Self-service infrastructure deployment
- B. Troubleshoot via a Linux diff command
- C. Public cloud console configuration workflows
- D. Modify a count parameter to scale resources
- E. API driven workflows

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80774-exam-terraform-associate-topic-1-question-143-discussion/)
> C, B is also strange but C is not an advantage of IaC for sure

## Question 144
---
You're writing a Terraform configuration that needs to read input from a local file called id_rsa.pub.
Which built-in Terraform function can you use to import the file's contents as a string?

- A. fileset("id_rsa.pub")
- B. filebase64("id_rsa.pub")
- C. templatefile("id_rsa.pub")
- D. file("id_rsa.pub")

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79032-exam-terraform-associate-topic-1-question-144-discussion/)
> D

## Question 145
---
What does Terraform use providers for? (Choose three.)

- A. Provision resources for on-premises infrastructure services
- B. Simplify API interactions
- C. Provision resources for public cloud infrastructure services
- D. Enforce security and compliance policies
- E. Group a collection of Terraform configuration files that map to a single state file

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79381-exam-terraform-associate-topic-1-question-145-discussion/)
> ABC

## Question 146
---
You can reference a resource created with for_each using a Splat `(*)` expression.

- A. True
- B. False

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79034-exam-terraform-associate-topic-1-question-146-discussion/)
> B, for_each is map of objects not list of objects

## Question 147
---
How does Terraform determine dependencies between resources?

- A. Terraform automatically builds a resource graph based on resources, provisioners, special meta-parameters, and the state file, if present.
- B. Terraform requires all dependencies between resources to be specified using the depends_on parameter
- C. Terraform requires resources in a configuration to be listed in the order they will be created to determine dependencies
- D. Terraform requires resource dependencies to be defined as modules and sourced in order

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80574-exam-terraform-associate-topic-1-question-147-discussion/)
> A

## Question 148
---
Which parameters does terraform import require? (Choose two.)

- A. Path
- B. Provider
- C. Resource ID
- D. Resource address

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79153-exam-terraform-associate-topic-1-question-148-discussion/)
> CD, the command is `terraform import {resource_address} {resource_id}`

## Question 149
---
Once a new Terraform backend is configured with a Terraform code block, which command(s) is (are) used to migrate the state file?

- A. terraform apply
- B. terraform push
- C. terraform destroy, then terraform apply
- D. terraform init

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80152-exam-terraform-associate-topic-1-question-149-discussion/)
> D

## Question 150
---
What does this code do?
![](https://www.examtopics.com/assets/media/exam-media/04279/0008400001.jpg)

- A. Requires any version of the AWS provider >= 3.0 and < 4.0
- B. Requires any version of the AWS provider >= 3.0
- C. Requires any version of the AWS provider after the 3.0 major release, like 4.1
- D. Requires any version of the AWS provider > 3.0

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79036-exam-terraform-associate-topic-1-question-150-discussion/)
> A

## Question 151
---
What does terraform refresh modify?

- A. Your cloud infrastructure
- B. Your state file
- C. Your Terraform plan
- D. Your Terraform configuration

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79269-exam-terraform-associate-topic-1-question-151-discussion/)
> B

## Question 152
---
Which of the following is not valid source path for specifying a module?

- A. source = "./modulelversion=v1.0.0"
- B. source = "github.com/hashicorp/example?ref=v1.0.0"
- C. source = "./module"
- D. source = "hashicorp/consul/aws"

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80155-exam-terraform-associate-topic-1-question-152-discussion/)
> A

## Question 153
---
Which of the following is true about terraform apply? (Choose two.)

- A. It only operates on infrastructure defined in the current working directory or workspace
- B. You must pass the output of a terraform plan command to it
- C. Depending on provider specification, Terraform may need to destroy and recreate your infrastructure resources
- D. By default, it does not refresh your state file to reflect current infrastructure configuration
- E. You cannot target specific resources for the operation

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80580-exam-terraform-associate-topic-1-question-153-discussion/)
> AC, There are some resources that need to be destroyed and recreated

## Question 154
---
Which of the following statements about local modules is incorrect?

- A. Local modules are not cached by terraform init command
- B. Local modules are sourced from a directory on disk
- C. Local modules support versions
- D. All of the above (all statements above are incorrect)
- E. None of the above (all statements above are correct)

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80158-exam-terraform-associate-topic-1-question-154-discussion/)
> C

## Question 155
---
Which of the following is true about Terraform's implementation of infrastructure as code? (Choose two.)

- A. It is only compatible with AWS infrastructure management
- B. You cannot reuse infrastructure configuration
- C. You can version your infrastructure configuration
- D. It requires manual configuration of infrastructure resources
- E. It allows you to automate infrastructure provisioning

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79460-exam-terraform-associate-topic-1-question-155-discussion/)
> CE

## Question 156
---
You need to write some Terraform code that adds 42 firewall rules to a security group as shown in the example.
![](https://www.examtopics.com/assets/media/exam-media/04279/0008700001.jpg)
What can you use to avoid writing 42 different nested ingress config blocks by hand?

- A. A count loop
- B. A for block
- C. A for each block
- D. A dynamic block

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80162-exam-terraform-associate-topic-1-question-156-discussion/)
> D

## Question 157
---
Which of the following is the safest way to inject sensitive values into a Terraform Cloud workspace?

- A. Write the value to a file and specify the file with the -var-file flag
- B. Set a value for the variable in the UI and check the "Sensitive" check box
- C. Edit the state file directly just before running terraform apply
- D. Set the variable value on the command line with the -var flag

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80164-exam-terraform-associate-topic-1-question-157-discussion/)
> B

## Question 158
---
terraform apply will fail if you have not am terraform plan first to update the plan output.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80582-exam-terraform-associate-topic-1-question-158-discussion/)
> B

## Question 159
---
How would you reference the attribute "name" of this fictitious resource in HCL?
![](https://www.examtopics.com/assets/media/exam-media/04279/0008900001.jpg)

- A. resource.kubernetes_namespace.example.name
- B. kubernetes_namespace.test.name
- C. kubernetes_namespace.example.name
- D. data.kubernetes_namespace.name
- E. None of the above

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80166-exam-terraform-associate-topic-1-question-159-discussion/)
> C

## Question 160
---
A Terraform output that sets the "sensitive" argument to true will not store that value in the state file.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79466-exam-terraform-associate-topic-1-question-160-discussion/)
> B

## Question 161
---
Which are forbidden actions when the Terraform state file is locked? (Choose three.)

- A. terraform destroy
- B. terraform fmt
- C. terraform state list
- D. terraform apply
- E. terraform plan
- F. terraform validate

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80583-exam-terraform-associate-topic-1-question-161-discussion/)
> ADE

## Question 162
---
Terraform installs its providers during which phase?

- A. Plan
- B. Init
- C. Refresh
- D. All of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80584-exam-terraform-associate-topic-1-question-162-discussion/)
> B

## Question 163
---
When does Sentinel enforce policy logic during a Terraform Enterprise run?

- A. Before the plan phase
- B. During the plan phase
- C. Before the apply phase
- D. After the apply phase

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79468-exam-terraform-associate-topic-1-question-163-discussion/)
> C

## Question 164
---
What is the purpose of a Terraform workspace in either open source or enterprise?

- A. Workspaces allow you to manage collections of infrastructure in state files
- B. A logical separation of business units
- C. A method of grouping multiple infrastructure security policies
- D. Provides limited access to a cloud environment

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/81871-exam-terraform-associate-topic-1-question-164-discussion/)
> A

## Question 165
---
Which is the best way to specify a tag of v1.0.0 when referencing a module stored in Git (for example git::https://example.com/vpc.git)?

- A. Append ?ref=v1. 0. 0 argument to the source path
- B. Add version = "1.0.0" parameter to module block
- C. Nothing ג€" modules stored on GitHub always default to version 1.0.0
- D. Modules stored on GitHub do not support versioning

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79469-exam-terraform-associate-topic-1-question-165-discussion/)
> A

## Question 166
---
Changing the Terraform backend from the default "local" backend to a different one after doing your first terraform apply is:

- A. Mandatory
- B. Optional
- C. Impossible
- D. Discouraged

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80589-exam-terraform-associate-topic-1-question-166-discussion/)
> B

## Question 167
---
You have modified your local Terraform configuration and ran terraform plan to review the changes. Simultaneously, your teammate manually modified the infrastructure component you are working on. Since you already ran terraform plan locally, the execution plan for terraform apply will be the same.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80591-exam-terraform-associate-topic-1-question-167-discussion/)
> B

## Question 168
---
terraform apply is failing with the following error. What next step should you take to determine the root cause of the problem?
Error loading state: AccessDenied: Access Denied status code: 403, request id: 288766CE5CCA24A0, host id: FOOBAR

- A. Set TF_LOG=DEBUG
- B. Review syslog for Terraform error messages
- C. Run terraform login to reauthenticate with the provider
- D. Review /var/log/terraform.log for error messages

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79471-exam-terraform-associate-topic-1-question-168-discussion/)
> A, C is for logging in to TFE

## Question 169
---
As a member of an operations team that uses infrastructure as code (IaC) practices, you are tasked with making a change to an infrastructure stack running in a public cloud.
Which pattern would follow IaC best practices for making a change?

- A. Clone the repository containing your infrastructure code and then run the code
- B. Use the public cloud console to make the change after a database record has been approved
- C. Make the change programmatically via the public cloud CLI
- D. Make the change via the public cloud API endpoint
- E. Submit a pull request and wait for an approved merge of the proposed changes

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80593-exam-terraform-associate-topic-1-question-169-discussion/)
> E

## Question 170
---
What command can you run to generate DOT (Document Template) formatted data to visualize Terraform dependencies?

- A. terraform refresh
- B. terraform show
- C. terraform graph
- D. terraform output

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79474-exam-terraform-associate-topic-1-question-170-discussion/)
> C

## Question 171
---
Which provider authentication method prevents credentials from being stored in the state file?

- A. Using environment variables
- B. Specifying the login credentials in the provider block
- C. Setting credentials as Terraform variables
- D. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80804-exam-terraform-associate-topic-1-question-171-discussion/)
> A

## Question 172
---
Running terraform fmt without any flags in a directory with Terraform configuration files will check the formatting of those files without changing their contents.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79475-exam-terraform-associate-topic-1-question-172-discussion/)
> B

## Question 173
---
terraform init retrieves the source code for all referenced modules.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80805-exam-terraform-associate-topic-1-question-173-discussion/)
> A

## Question 174
---
You have a Terraform configuration that defines a single virtual machine with no references to it. You have run terraform apply to create the resource, and then removed the resource definition from your Terraform configuration file.
What will happen when you run terraform apply in the working directory again?

- A. Nothing
- B. Terraform will destroy the virtual machine
- C. Terraform will error
- D. Terraform will remove the virtual machine from the state file, but the resource will still exist

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80596-exam-terraform-associate-topic-1-question-174-discussion/)
> B

## Question 175
---
Which configuration consistency errors does terraform validate report?

- A. A mix of spaces and tabs in configuration files
- B. Differences between local and remote state
- C. Terraform module isn't the latest version
- D. Declaring a resource identifier more than once

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80597-exam-terraform-associate-topic-1-question-175-discussion/)
> D

## Question 176
---
In Terraform HCL, an object type of object({ name=string, age=number }) would match this value:
- A.
	![](https://www.examtopics.com/assets/media/exam-media/04279/0009600001.jpg)
- B.
	![](https://www.examtopics.com/assets/media/exam-media/04279/0009600002.jpg)

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/82190-exam-terraform-associate-topic-1-question-176-discussion/)
> B

## Question 177
---
Where can Terraform not load a provider from?

- A. Source code
- B. Plugins directory
- C. Official HashiCorp distribution on releases.hashicorp.com
- D. Provider plugin cache

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/83172-exam-terraform-associate-topic-1-question-177-discussion/)
> A

## Question 178
---
Which of the following locations can Terraform use as a private source for modules? (Choose two.)

- A. Internally hosted SCM (Source Control Manager) platform
- B. Public Terraform Module Registry
- C. Private repository on GitHub
- D. Public repository on GitHub

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80599-exam-terraform-associate-topic-1-question-178-discussion/)
> AC

## Question 179
---
Why should secrets not be hard coded into Terraform code? (Choose two.)

- A. It makes the code less reusable.
- B. Terraform code is typically stored in version control, as well as copied to the systems from which it's run. Any of those may not have robust security mechanisms.
- C. The Terraform code is copied to the target resources to be applied locally and could expose secrets if a target resource is compromised.
- D. All passwords should be rotated on a quarterly basis.

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80807-exam-terraform-associate-topic-1-question-179-discussion/)
> AB

## Question 180
---
If a Terraform creation-time provisioner fails, what will occur by default?

- A. The resource will not be affected, but the provisioner will need to be applied again
- B. The resource will be destroyed
- C. The resource will be marked as "tainted"
- D. Nothing, provisioners will not show errors in the command line

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79480-exam-terraform-associate-topic-1-question-180-discussion/)
> C

## Question 181
---
When should Terraform configuration files be written when running terraform import on existing infrastructure?

- A. Infrastructure can be imported without corresponding Terraform code
- B. Terraform will generate the corresponding configuration files for you
- C. You should write Terraform configuration files after the next terraform import is executed
- D. Terraform configuration should be written before terraform import is executed

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79119-exam-terraform-associate-topic-1-question-181-discussion/)
> D

## Question 182
---
Which command lets you experiment with Terraform's built-in functions?

- A. terraform env
- B. terraform console
- C. terraform test
- D. terraform validate

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79336-exam-terraform-associate-topic-1-question-182-discussion/)
> B

## Question 183
---
Why does this backend configuration not follow best practices?
![](https://www.examtopics.com/assets/media/exam-media/04279/0009900001.jpg)

- A. You should not store credentials in Terraform Configuration
- B. You should use the local enhanced storage backend whenever possible
- C. An alias meta-argument should be included in backend blocks whenever possible
- D. The backend configuration should contain multiple credentials so that more than one user can execute terraform plan and terraform apply

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79576-exam-terraform-associate-topic-1-question-183-discussion/)
> A

## Question 184
---
Open source Terraform can only import publicly-accessible and open-source modules.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79339-exam-terraform-associate-topic-1-question-184-discussion/)
> B

## Question 185
---
What does terraform destroy do?

- A. Destroy all infrastructure in the Terraform state file
- B. Destroy all Terraform code files in the current directory while leaving the state file intact
- C. Destroy all infrastructure in the configured Terraform provider
- D. Destroy the Terraform state file while leaving infrastructure intact

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79565-exam-terraform-associate-topic-1-question-185-discussion/)
> A

## Question 186
---
While attempting to deploy resources into your cloud provider using Terraform, you begin to see some odd behavior and experience sluggish responses. In order to troubleshoot you decide to turn on Terraform debugging. Which environment variables must be configured to make Terraform's logging more verbose?

- A. TF_LOG_LEVEL
- B. TF_LOG_FILE
- C. TF_LOG
- D. TP_LOG_PATH

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80606-exam-terraform-associate-topic-1-question-186-discussion/)
> C

## Question 187
---
If a DevOps team adopts AWS CloudFormation as their standardized method for provisioning public cloud resources, which of the following scenarios poses a challenge for this team?

- A. The team is asked to build a reusable code base that can deploy resources into any AWS region
- B. The team is asked to manage a new application stack built on AWS-native services
- C. The organization decides to expand into Azure and wishes to deploy new infrastructure using their existing codebase
- D. The DevOps team is tasked with automating a manual provisioning process

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79568-exam-terraform-associate-topic-1-question-187-discussion/)
> C

## Question 188
---
You cannot install third party plugins using terraform init.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79340-exam-terraform-associate-topic-1-question-188-discussion/)
> B

## Question 189
---
Which of the following can you do with terraform plan? (Choose two.)

- A. Save a generated execution plan to apply later
- B. Execute a plan in a different workspace
- C. View the execution plan and check if the changes match your expectations
- D. Schedule Terraform to run at a planned time in the future

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/80808-exam-terraform-associate-topic-1-question-189-discussion/)
> AC

## Question 190
---
Which are examples of infrastructure as code? (Choose two.)

- A. Cloned virtual machine images
- B. Change management database records
- C. Versioned configuration files
- D. Docker files

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/79583-exam-terraform-associate-topic-1-question-190-discussion/)
> CD

## Question 191
---
FILL BLANK -
You need to migrate a workspace to use a remote backend. After updating your configuration, what command do you run to perform the migration?
Type your answer in the field provided. The text field is not case-sensitive and all variations of the correct answer are accepted.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/81331-exam-terraform-associate-topic-1-question-191-discussion/)
> terraform init

## Question 192
---
When using a module from the public Terraform Module Registry, the following parameters are required attributes in the module block. (Choose two.)

- A. Each of the module’s required inputs
- B. The module’s source address
- C. Terraform Module Registry account token
- D. Each of the module’s dependencies (example: submodules)
- E. The version of the module

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95113-exam-terraform-associate-topic-1-question-192-discussion/)
> AB, E is not required

## Question 193
---
As a developer, you want to ensure your plugins are up to date with the latest versions. Which Terraform command should you use?

- A. terraform init -upgrade
- B. terraform apply -upgrade
- C. terraform refresh -upgrade
- D. terraform providers -upgrade

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95763-exam-terraform-associate-topic-1-question-193-discussion/)
> A

## Question 194
---
You can access state stored with the local backend by using the terraform_remote_state data source.

- A. True
- B. False

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95150-exam-terraform-associate-topic-1-question-194-discussion/)
> A

## Question 195
---
You have been working in a Cloud provider account that is shared with other team members. You previously used Terraform to create a load balancer that is listening on port 80. After some application changes, you updated the Terraform code to change the port to 443.
You run terraform plan and see that the execution plan shows the port changing from 80 to 443 like you intended, and step away to grab some coffee.
In the meantime, another team member manually changes the load balancer port to 443 through the Cloud provider console before you get back to your desk.
What will happen when you terraform apply upon returning to your desk?

- A. Terraform will fail with an error because the state file is no longer accurate.
- B. Terraform will change the load balancer port to 80, and then change it back to 443.
- C. Terraform will not make any changes to the Load Balancer and will update the state file to reflect any changes made.
- D. Terraform will change the port back to 80 in your code.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95151-exam-terraform-associate-topic-1-question-195-discussion/)
> C

## Question 196
---
In a Terraform Cloud workspace linked to a version control repository, speculative plan runs start automatically when you merge or commit changes to version control.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95512-exam-terraform-associate-topic-1-question-196-discussion/)
> A

## Question 197
---
You have some Terraform code and a variable definitions file named dev.auto.tfvars that you tested successfully in the dev environment. You want to deploy the same code in the staging environment with a separate variable definition file and a separate state file.
Which two actions should you perform? (Choose two.)

- A. Copy the existing terraform.tfstate file and save it as staging.terraform.tfstate
- B. Write a new staging.auto.tfvars variable definition file and run Terraform with the  var-file=”staging.auto.tfvars” flag
- C. Create a new Terraform workspace for staging
- D. Create a new Terraform provider for staging
- E. Add new Terraform code (`*.tf` files) for staging in the same directory

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95074-exam-terraform-associate-topic-1-question-197-discussion/)
> BC

## Question 198
---
The ________ determines how Terraform creates, updates, or deletes resources.

- A. Terraform configuration
- B. Terraform core
- C. Terraform provider
- D. Terraform provisioner

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95075-exam-terraform-associate-topic-1-question-198-discussion/)
> C, providers such as AWS, Azure, GCP determines how

## Question 199
---
Terraform destroy is the only way to remove infrastructure.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95076-exam-terraform-associate-topic-1-question-199-discussion/)
> B

## Question 200
---
Which of the following is the correct way to pass the value in the variable num_servers into a module with the input servers in HCL2?

- A. servers = var.num_servers
- B. servers = num_servers
- C. servers = var(num_servers)
- D. $(var.num_servers)

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95077-exam-terraform-associate-topic-1-question-200-discussion/)
> A

## Question 201
---
Which of the following commands would you use to access all of the attributes and details of a resource managed by Terraform?

- A. terraform state list
- B. terraform state show
- C. terraform get
- D. terraform state list

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95053-exam-terraform-associate-topic-1-question-201-discussion/)
> B

## Question 202
---
How would you be able to reference an attribute from the vsphere_datacenter data source for use with the datacenter_id argument within the vsphere_folder resource in the following configuration?
![](https://img.examtopics.com/terraform-associate/image1.png)

- A. data.dc.id
- B. data.vsphere_datacenter.dc
- C. vsphere_datacenter.dc.id
- D. data.vsphere_datacenter.dc.id

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95054-exam-terraform-associate-topic-1-question-202-discussion/)
> D

## Question 203
---
You decide to move a Terraform state file to Amazon S3 from another location. You write the code below into a file called backend.tf.
![](https://img.examtopics.com/terraform-associate/image2.png)
Which command will migrate your current state file to the new S3 remote backend?

- A. terraform state
- B. terraform init
- C. terraform refresh
- D. terraform push

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95055-exam-terraform-associate-topic-1-question-203-discussion/)
> B

## Question 204
---
You want to tag multiple resources with a string that is a combination of a generated random_id and a variable.
How should you use the same value in all these resources without repeating the random_id and variable in each resource?

- A. Local values
- B. Data source
- C. Modules
- D. Outputs

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95104-exam-terraform-associate-topic-1-question-204-discussion/)
> A

## Question 205
---
Which of the following is not a benefit of adopting infrastructure as code?

- A. Interpolation
- B. Reusability of code
- C. Versioning
- D. Automation

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95105-exam-terraform-associate-topic-1-question-205-discussion/)
> A

## Question 206
---
Module version is required to reference a module on the Terraform Module Registry.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95148-exam-terraform-associate-topic-1-question-206-discussion/)
> B

## Question 207
---
While deploying a virtual machine, the first launch user_data script fails due to race condition with another resource deployed during the same Terraform run.
What is the least disruptive method to correct the issue?

- A. Run terraform taint against the virtual machine’s resource name, then terraform apply
- B. Restart the virtual machine from the cloud portal
- C. Run terraform apply again
- D. Run terraform destroy then terraform apply

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95106-exam-terraform-associate-topic-1-question-207-discussion/)
> A

## Question 208
---
The public Module Registry is free to use.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95107-exam-terraform-associate-topic-1-question-208-discussion/)
> A

## Question 209
---
Both Terraform Cloud and Terraform Enterprise support policy as code (Sentinel).

- A. True
- B. False

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95108-exam-terraform-associate-topic-1-question-209-discussion/)
> A

## Question 210
---
You want to define multiple data disks as nested blocks inside the resource block for a virtual machine.
What Terraform feature would help you define the blocks using the values in a variable?

- A. Local values
- B. Collection functions
- C. Dynamic blocks
- D. Count arguments

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95109-exam-terraform-associate-topic-1-question-210-discussion/)
> C

## Question 211
---
Which of the following module source paths does not specify a remote module?

- A. source = “./modules/consul”
- B. source = “git@github.com:hashicorp/example.git”
- C. source = “github.com/hashicorp/example”
- D. source = “hashicorp/consul/aws”

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95110-exam-terraform-associate-topic-1-question-211-discussion/)
> A

## Question 212
---
You have a list of numbers that represents the number of free CPU cores on each virtual cluster:

`numcpus = [ 18, 3, 7, 11, 2 ]`

What Terraform function could you use to select the largest number from the list?

- A. `max(numcpus)`
- B. `ceil(numcpus)`
- C. `top(numcpus)`
- D. `high[numcpus]`

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95111-exam-terraform-associate-topic-1-question-212-discussion/)
> A

## Question 213
---
Variables declared within a module are accessible outside of the module.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95518-exam-terraform-associate-topic-1-question-213-discussion/)
> B

## Question 214
---
Which of the following is not a valid Terraform variable type?

- A. list
- B. map
- C. array
- D. string

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95717-exam-terraform-associate-topic-1-question-214-discussion/)
> C

## Question 215
---
What is a key benefit of the Terraform state file?

- A. A state file can be used to schedule recurring infrastructure tasks
- B. A state file represents a source of truth for resources provisioned with a public cloud console
- C. A state file represents the desired state expressed by the Terraform code files
- D. A state file represents a source of truth for resources provisioned with Terraform

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/95149-exam-terraform-associate-topic-1-question-215-discussion/)
> D

## Question 216
---
Which of these statements about Terraform Enterprise workspaces is false?

- A. They can securely store cloud credentials
- B. You must use the CLI to switch between workspaces
- C. Plans and applies can be triggered via version control system integrations
- D. They have role-based access controls

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/96142-exam-terraform-associate-topic-1-question-216-discussion/)
> B

## Question 217
---
Define the purpose of state in Terraform.

- A. State is used to map real world resources to your configuration and keep track of metadata
- B. State is a method of codifying the dependencies of related resources
- C. State is used to enforce resource configurations that relate to compliance policies
- D. State is used to store variables and quickly reuse existing code

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104149-exam-terraform-associate-topic-1-question-217-discussion/)
> A

## Question 218
---
Which backend does the Terraform CLI use by default?

- A. API
- B. Remote
- C. Terraform Cloud
- D. Local
- E. HTTP

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104150-exam-terraform-associate-topic-1-question-218-discussion/)
> D

## Question 219
---
Using the terraform state rm command against a resource will destroy it.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104151-exam-terraform-associate-topic-1-question-219-discussion/)
> B

## Question 220
---
Which method for sharing Terraform configurations keeps them confidential within your organization, supports Terraform’s semantic version constraints, and provides a browsable directory?

- A. Generic git repository
- B. Terraform Cloud/Terraform Enterprise private module registry
- C. Public Terraform Module Registry
- D. Subfolder within a workspace

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104152-exam-terraform-associate-topic-1-question-220-discussion/)
> B

## Question 221
---
You are writing a child Terraform module which provisions an AWS instance. You want to make use of the IP address returned in the root configuration. You name the instance resource “main”.
Which of these is the correct way to define the output value using HCL2?

- A. ![](https://img.examtopics.com/terraform-associate/image3.png)
- B. ![](https://img.examtopics.com/terraform-associate/image4.png)
- C. ![](https://img.examtopics.com/terraform-associate/image5.png)
- D. ![](https://img.examtopics.com/terraform-associate/image6.png)

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104661-exam-terraform-associate-topic-1-question-221-discussion/)
> A

## Question 222
---
How would you refer to the indexing instance from the below configuration?
![](https://img.examtopics.com/terraform-associate/image7.png)

- A. `aws_instance[“web”][“indexing”]`
- B. `aws_instance.web.indexing`
- C. `aws_instance-web[“indexing”]`
- D. `aws_instance.web[“indexing”]`

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104667-exam-terraform-associate-topic-1-question-222-discussion/)
> D

## Question 223
---
Which feature is not included in Terraform Cloud’s free tier?

- A. Workspace
- B. Remote state management
- C. Audit logging
- D. Private module registry

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104310-exam-terraform-associate-topic-1-question-223-discussion/)
> C, Terraform Cloud supports private module registry

## Question 224
---
When should you run terraform init?

- A. After you run terraform apply for the first time in a new Terraform project and before you run terraform plan
- B. After you run terraform plan for the first time in a new Terraform project and before you run terraform apply
- C. After you start coding a new Terraform project and before you run terraform plan for the first time
- D. Before you start coding a new Terraform project

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104255-exam-terraform-associate-topic-1-question-224-discussion/)
> C

## Question 225
---
Terraform configuration (including any module references) can contain only one Terraform provider type.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104153-exam-terraform-associate-topic-1-question-225-discussion/)
> B

## Question 226
---
You are making changes to existing Terraform code to add some new infrastructure.
When is the best time to run terraform validate?

- A. After you run terraform plan so you can validate that your state file is consistent with your infrastructure
- B. Before you run terraform plan so you can validate your code syntax
- C. Before you run terraform apply so you can validate your infrastructure changes
- D. After you run terraform apply so you can validate that your infrastructure is reflected in your code

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104155-exam-terraform-associate-topic-1-question-226-discussion/)
> B

## Question 227
---
How does Terraform manage most dependencies between resources?

- A. By defining dependencies as modules and including them in a particular order
- B. The order that resources appear in Terraform configuration indicates dependencies
- C. Using the depends_on parameter
- D. Terraform will automatically manage most resource dependencies

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104413-exam-terraform-associate-topic-1-question-227-discussion/)
> D

## Question 228
---
What does running a terraform plan do?

- A. Imports all of your existing cloud provider resources to the state file
- B. Compares the state file to your Terraform code and determines if any changes need to be made
- C. Imports all of your existing cloud provider resources to your Terraform configuration file
- D. Compares your Terraform code and local state file to the remote state file in a cloud provider and determines if any changes need to be made

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104258-exam-terraform-associate-topic-1-question-228-discussion/)
> B

## Question 229
---
What are some benefits of using Sentinel with Terraform Cloud/Terraform Enterprise? (Choose three.)

- A. Policy-as-code can enforce security best practices
- B. You can restrict specific configurations on resources like "CIDR=0.0.0.0/0" not allowed
- C. You can enforce a list of approved AWS AMIs
- D. Sentinel Policies can be written in HashiCorp Configuration Language (HCL)
- E. You can check out and check in cloud access keys

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104669-exam-terraform-associate-topic-1-question-229-discussion/)
> ABC

## Question 230
---
You want to share Terraform state with your team, store it securely, and provide state locking.
How would you do this? (Choose three.)

- A. Using the remote Terraform backend with Terraform Cloud / Terraform Enterprise.
- B. Using the local backend.
- C. Using the s3 terraform backend. The dynamodb_field option is not needed.
- D. Using an s3 terraform backend with an appropriate IAM policy and dynamodb_field option configured.
- E. Using the consul Terraform backend.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104672-exam-terraform-associate-topic-1-question-230-discussion/)
> ADE

## Question 231
---

> [!done]- Answer
> 

## Question 232
---
How would you output returned values from a child module?

- A. Declare the output in the root configuration
- B. Declare the output in the child module
- C. Declare the output in both the root and child module
- D. None of the above

> [!help]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104624-exam-terraform-associate-topic-1-question-232-discussion/)
> C

## Question 233
---
You have decided to create a new Terraform workspace to deploy a development environment.
What is different about this workspace?

- A. It has its own state file
- B. It pulls in a different terraform.tfvars file
- C. It uses a different branch of code
- D. It uses a different backend

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104670-exam-terraform-associate-topic-1-question-233-discussion/)
> A

## Question 234
---
Any user can publish modules to the public Terraform Module Registry.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/104671-exam-terraform-associate-topic-1-question-234-discussion/)
> A

## Question 235
---
Which of these commands makes your code more human readable?

- A. terraform validate
- B. terraform output
- C. terraform plan
- D. terraform fmt

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108526-exam-terraform-associate-topic-1-question-235-discussion/)
> D

## Question 236
---
Infrastructure as Code (IaC) can be stored in a version control system along with application code.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108638-exam-terraform-associate-topic-1-question-236-discussion/)
> A

## Question 237
---
Select the command that doesn’t cause Terraform to refresh its state.

- A. terraform apply
- B. terraform destroy
- C. terraform plan
- D. terraform state list

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108637-exam-terraform-associate-topic-1-question-237-discussion/)
> D

## Question 238
---
Sentinel policy-as-code is available in Terraform Enterprise.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108536-exam-terraform-associate-topic-1-question-238-discussion/)
> A

## Question 239
---
Before you can use Terraform’s remote backend, you must first execute terraform init.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108636-exam-terraform-associate-topic-1-question-239-discussion/)
> A

## Question 240
---
Which two steps are required to provision new infrastructure in the Terraform workflow? (Choose two.)

- A. Plan
- B. Apply
- C. Import
- D. Init
- E. Validate

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108634-exam-terraform-associate-topic-1-question-240-discussion/)
> BD

## Question 241
---
You are working on some new application features and you want to spin up a copy of your production deployment to perform some quick tests. In order to avoid having to configure a new state backend, what open source Terraform feature would allow you create multiple states but still be associated with your current code?

- A. Terraform data sources
- B. Terraform local values
- C. Terraform modules
- D. Terraform workspaces
- E. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108632-exam-terraform-associate-topic-1-question-241-discussion/)
> D

## Question 242
---
Which provisioner invokes a process on the machine running Terraform?

- A. remote-exec
- B. file
- C. local-exec
- D. null-exec

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108631-exam-terraform-associate-topic-1-question-242-discussion/)
> C

## Question 243
---
____________ backends support state locking.

- A. Some
- B. No
- C. Only local
- D. All

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108629-exam-terraform-associate-topic-1-question-243-discussion/)
> A

## Question 244
---
Which of the following methods, used to provision resources into a public cloud, demonstrates the concept of infrastructure as code?

- A. curl commands manually run from a terminal
- B. A sequence of REST requests you pass to a public cloud API endpoint
- C. A script that contains a series of public cloud CLI commands
- D. A series of commands you enter into a public cloud console

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108628-exam-terraform-associate-topic-1-question-244-discussion/)
> C

## Question 245
---
Which of the following should you put into the required_providers block?

- A. version >= 3.1
- B. version = “>= 3.1”
- C. version ~> 3.1

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108627-exam-terraform-associate-topic-1-question-245-discussion/)
> B

## Question 246
---
When should you write Terraform configuration files for existing infrastructure that you want to start managing with Terraform?

- A. Before you run terraform import
- B. You can import infrastructure without corresponding Terraform code
- C. Terraform will generate the corresponding configuration files for you
- D. After you run terraform import

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108626-exam-terraform-associate-topic-1-question-246-discussion/)
> A

## Question 247
---
Which command should you run to check if all code in a Terraform configuration that references multiple modules is properly formatted without making changes?

- A. terraform fmt -write=false
- B. terraform fmt -list -recursive
- C. terraform fmt -check -recursive
- D. terraform fmt -check

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108625-exam-terraform-associate-topic-1-question-247-discussion/)
> C

## Question 248
---
What features stops multiple users from operating on the Terraform state at the same time?

- A. Provider constraints
- B. Remote backends
- C. State locking
- D. Version control

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108624-exam-terraform-associate-topic-1-question-248-discussion/)
> C

## Question 249
---
You are creating a reusable Terraform configuration and want to include a billing_dept tag so your Finance team can track team-specific spending on resources. Which of the following billing_dept variable declarations will allow you to do this?

- A. ![](https://img.examtopics.com/terraform-associate/image8.png)
- B. ![](https://img.examtopics.com/terraform-associate/image9.png)
- C. ![](https://img.examtopics.com/terraform-associate/image10.png)
- D. ![](https://img.examtopics.com/terraform-associate/image11.png)

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108623-exam-terraform-associate-topic-1-question-249-discussion/)
> C

## Question 250
---
Which of these are secure options for storing secrets for connecting to a Terraform remote backend? (Choose two.)

- A. Inside the backend block within the Terraform configuration
- B. Defined in Environment variables
- C. Defined in a connection configuration outside of Terraform
- D. A variable file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108622-exam-terraform-associate-topic-1-question-250-discussion/)
> BC

## Question 251
---
You want to define a single input variable to capture configuration values for a server. The values must represent memory as a number, and the server name as a string.Which variable type could you use for this input?

- A. List
- B. Object
- C. Map
- D. Terraform does not support complex input variables of different types

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108621-exam-terraform-associate-topic-1-question-251-discussion/)
> B

## Question 252
---
What does Terraform not reference when running a terraform apply -refresh-only?

- A. Credentials
- B. State file
- C. Terraform resource definitions in configuration files
- D. Cloud provider

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108620-exam-terraform-associate-topic-1-question-252-discussion/)
> C

## Question 253
---
Multiple team members are collaborating on infrastructure using Terraform and want to format their Terraform code following standard Terraform-style convention. How could they automatically ensure the code satisfies conventions?

- A. Run the terraform fmt command during the code linting phase of your CI/CD process
- B. Manually apply two spaces indentation and align equal sign "=" characters in every Terraform file (*.tf)
- C. Run the terraform validate command prior to executing terraform plan or terraform apply

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/108619-exam-terraform-associate-topic-1-question-253-discussion/)
> A

## Question 254
---
When using a remote backend or Terraform Cloud integration, where does Terraform save resource state?

- A. On the disk
- B. In memory
- C. In an environment variable
- D. In the remote backend or Terraform Cloud

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112484-exam-terraform-associate-topic-1-question-254-discussion/)
> D

## Question 255
---
In Terraform HCL, an object type of object({ name=string, age=number }) would match this value:

- A. 
- B. 
- C. 
- D. 

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112204-exam-terraform-associate-topic-1-question-255-discussion/)
> B

## Question 256
---
You add a new resource to an existing Terraform configuration, but do not update the version constraint in the configuration. The existing and new resources use the same provider. The working directory contains a .terraform-lock.hcl file.How will Terraform choose which version of the provider to use?

- A. Terraform will use the latest version of the provider for the new resource and the version recorded in the lock file to manage existing resources
- B. Terraform will use the version recorded in your lock file
- C. Terraform will check your state file to determine the provider version to use
- D. Terraform will use the latest version of the provider available at the time you provision your new resource

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112037-exam-terraform-associate-topic-1-question-256-discussion/)
> B

## Question 257
---
You must use different Terraform commands depending on the cloud provider you use.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112922-exam-terraform-associate-topic-1-question-257-discussion/)
> B

## Question 258
---
Define the purpose of state in Terraform.

- A. State stores variables and lets you quickly reuse existing code
- B. State lets you enforce resource configurations that relate to compliance policies
- C. State codifies the dependencies of related resources
- D. State maps real world resources to your configuration and keeps track of metadata

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112923-exam-terraform-associate-topic-1-question-258-discussion/)
> D

## Question 259
---
Which of these actions will prevent two Terraform runs from changing the same state file at the same time?

- A. Refresh the state after running Terraform
- B. Delete the state before running Terraform
- C. Configure state locking for your state backend
- D. Run Terraform with parallelism set to 1

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112924-exam-terraform-associate-topic-1-question-259-discussion/)
> C

## Question 260
---
While attempting to deploy resources into your cloud provider using Terraform, you begin to see some odd behavior and experience slow responses. In order to troubleshoot you decide to turn on Terraform debugging. Which environment variables must be configured to make Terraform’s logging more verbose?

- A. TF_LOG_PATH
- B. TF_VAR_log_level
- C. TF_LOG
- D. TF_VAR_log_path

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/113321-exam-terraform-associate-topic-1-question-260-discussion/)
> C

## Question 261
---
The Terraform binary version and provider versions must match each other in a single configuration.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112482-exam-terraform-associate-topic-1-question-261-discussion/)
> B

## Question 262
---
The .terraform.lock.hcl file tracks module versions.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112481-exam-terraform-associate-topic-1-question-262-discussion/)
> B

## Question 263
---
You can develop a custom provider to manage its resources using Terraform.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/113324-exam-terraform-associate-topic-1-question-263-discussion/)
> A

## Question 264
---
Which of these is not a benefit of remote state?

- A. Keeping unencrypted sensitive information off disk
- B. Easily share reusable code modules
- C. Working in a team
- D. Delegate output to other teams

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112926-exam-terraform-associate-topic-1-question-264-discussion/)
> B

## Question 265
---
When using multiple configurations of the same Terraform provider, what meta-argument must be included in any non-default provider configurations?

- A. depends_on
- B. alias
- C. id
- D. name

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/113326-exam-terraform-associate-topic-1-question-265-discussion/)
> B

## Question 266
---
A developer accidentally launched a VM (virtual machine) outside of the Terraform workflow and ended up with two servers with the same name. They don’t know which VM Terraform manages but do have a list of all active VM IDs.Which of the following methods could you use to discover which instance Terraform manages?

- A. Run terraform taint/code on all the VMs to recreate them
- B. Update the code to include outputs for the ID of all VMs, then run terraform plan to view the outputs
- C. Run terraform state list to find the names of all VMs, then run terraform state show for each of them to find which VM ID Terraform manages
- D. Use terraform refresh/code to find out which IDs are already part of state

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/113329-exam-terraform-associate-topic-1-question-266-discussion/)
> C

## Question 267
---
Which of the following is not considered a safe way to inject sensitive values into a Terraform Cloud workspace?

- A. Edit the state file directly just before running terraform apply
- B. Set the variable value on the command line with the -var flag
- C. Write the value to a file and specify the file with the -var-file flag

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112928-exam-terraform-associate-topic-1-question-267-discussion/)
> A

## Question 268
---
If you update the version constraint in your Terraform configuration, Terraform will update your lock file the next time you run terraform init.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/112975-exam-terraform-associate-topic-1-question-268-discussion/)
> B

## Question 269
---
You must initialize your working directory before running terraform validate.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/113331-exam-terraform-associate-topic-1-question-269-discussion/)
> A

## Question 270
---
If you manually destroy infrastructure, what is the best practice reflecting this change in Terraform?

- A. Manually update the state fire
- B. Remove the resource definition from your file and run terraform apply -refresh-only
- C. Run terraform import
- D. It will happen automatically

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/118901-exam-terraform-associate-topic-1-question-270-discussion/)
> B

## Question 271
---
You created infrastructure outside of the Terraform workflow that you now want to manage using Terraform. Which command brings the infrastructure into Terraform state?

- A. terraform init
- B. terraform get
- C. terraform refresh
- D. terraform import

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/113332-exam-terraform-associate-topic-1-question-271-discussion/)
> D

## Question 272
---
When using Terraform to deploy resources into Azure, which scenarios are true regarding state files? (Choose two.)

- A. When you change a Terraform-managed resource via the Azure Cloud Console, Terraform updates the state file to reflect the change during the next plan or apply
- B. Changing resources via the Azure Cloud Console records the change in the current state file
- C. When you change a resource via the Azure Cloud Console, Terraform records the changes in a new state file
- D. Changing resources via the Azure Cloud Console does not update current state file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/113333-exam-terraform-associate-topic-1-question-272-discussion/)
> D

## Question 273
---
Which statement describes a goal of infrastructure as code?

- A. A pipeline process to test and deliver software
- B. Defining a vendor-agnostic API
- C. Write once, run anywhere
- D. The programmatic configuration of resources

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/113366-exam-terraform-associate-topic-1-question-273-discussion/)
> D

## Question 274
---
terraform validate confirms the syntax of Terraform files.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/117993-exam-terraform-associate-topic-1-question-274-discussion/)
> A

## Question 275
---
Which command adds existing resources into Terraform state?

- A. terraform init
- B. terraform plan
- C. terraform refresh
- D. terraform import
- E. All of these

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/118902-exam-terraform-associate-topic-1-question-275-discussion/)
> D

## Question 276
---
It is best practice to store secret data in the same version control repository as your Terraform configuration.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/118903-exam-terraform-associate-topic-1-question-276-discussion/)
> B

## Question 277
---
Which of the following commands would you use to access all of the attributes and details of a resource managed by Terraform?

- A. terraform state list ‘provider_type.name’
- B. terraform state show ‘provider_type.name’
- C. terraform get ‘provider_type.name’
- D. terraform state list

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/118904-exam-terraform-associate-topic-1-question-277-discussion/)
> B

## Question 278
---
terraform validate confirms that your infrastructure matches the Terraform state file.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/118905-exam-terraform-associate-topic-1-question-278-discussion/)
> B

## Question 279
---
A senior admin accidentally deleted some of your cloud instances. What does Terraform do when you run terraform apply?

- A. Build a completely brand new set of infrastructure
- B. Tear down the entire workspace infrastructure and rebuild it
- C. Rebuild only the instances that were deleted
- D. Stop and generate an error message about the missing instances

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/118907-exam-terraform-associate-topic-1-question-279-discussion/)
> C

## Question 280
---
terraform init creates an example main.tf file in the current directory.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/118909-exam-terraform-associate-topic-1-question-280-discussion/)
> B

## Question 281
---
Which argument helps prevent unexpected updates when calling Terraform Registry modules?

- A. count
- B. source
- C. version
- D. lifecycle

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/118129-exam-terraform-associate-topic-1-question-281-discussion/)
> C

## Question 282
---
Setting the TF_LOG environment variable to DEBUG causes debug messages to be logged into stdout.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/117591-exam-terraform-associate-topic-1-question-282-discussion/)
> B

## Question 283
---
How would you output returned values from a child module in the Terraform CLI output?

- A. Declare the output in the root configuration
- B. Declare the output in the child module
- C. Declare the output in both the root and child module
- D. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/117285-exam-terraform-associate-topic-1-question-283-discussion/)
> C

## Question 284
---
What is the Terraform resource name of the following resource block?

- A. azurerm_resource_group
- B. azurerm
- C. test
- D. dev

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127231-exam-terraform-associate-topic-1-question-284-discussion/)
> D

## Question 285
---
When do you need to explicitly execute terraform refresh-only?

- A. Before every terraform plan
- B. Before every terraform apply
- C. Before every terraform import
- D. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127232-exam-terraform-associate-topic-1-question-285-discussion/)
> D

## Question 286
---
How is the Terraform cloud integration differ from other state backends such as S3, Consul, etc.?

- A. It can execute Terraform runs on dedicated infrastructure in Terraform Cloud
- B. It doesn't show the output of a terraform apply locally
- C. It is only available to paying customers
- D. All of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127335-exam-terraform-associate-topic-1-question-286-discussion/)
> A

## Question 287
---
Which of the following are advantages of using infrastructure as code (IaC) instead of provisioning with a graphical user interface (GUI)? (Choose two.)

- A. Secures your credentials
- B. Lets your version, reuse, and share infrastructure configuration
- C. Provisions the same resources at a lower cost
- D. Reduces risk of operator error
- E. Prevents manual modifications to your resources

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127121-exam-terraform-associate-topic-1-question-287-discussion/)
> BD

## Question 288
---
One cloud configuration always maps to a single remote workspace.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127157-exam-terraform-associate-topic-1-question-288-discussion/)
> B

## Question 289
---
Multiple team members are collaborating on infrastructure using Terraform and want to format their Terraform code following standard Terraform-style convention.How could they automatically ensure the code satisfies conventions?

- A. Replace all tabs with spaces
- B. Terraform automatically formats configuration on terraform apply
- C. Run terraform validate prior to executing terraform plan or terraform apply
- D. Use terraform fmt

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127158-exam-terraform-associate-topic-1-question-289-discussion/)
> D

## Question 290
---
Which backend does the Terraform CLI use by default?

- A. Depends on the cloud provider configured
- B. Remote
- C. Terraform Cloud
- D. Local
- E. HTTP

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127159-exam-terraform-associate-topic-1-question-290-discussion/)
> D

## Question 291
---
The Terraform CLI will print output values from a child module after running terraform apply.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127160-exam-terraform-associate-topic-1-question-291-discussion/)
> B

## Question 292
---
What does terraform refresh-only modify?

- A. Your cloud infrastructure
- B. Your Terraform plan
- C. Your Terraform configuration
- D. Your state file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127161-exam-terraform-associate-topic-1-question-292-discussion/)
> D

## Question 293
---
What does terraform import do?

- A. Imports existing resources into the state file
- B. Imports all infrastructure from a given cloud provider
- C. Imports a new Terraform module
- D. Imports clean copies of tainted resources
- E. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127162-exam-terraform-associate-topic-1-question-293-discussion/)
> A

## Question 294
---
Which of the following is the correct way to pass the value in the variable num_servers into a module with the input server?

- A. servers = var(num_servers)
- B. $(var.num_servers)
- C. servers = num_servers
- D. servers = var.num_servers

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127336-exam-terraform-associate-topic-1-question-294-discussion/)
> D

## Question 295
---
A developer on your team is going to tear down an existing deployment managed by Terraform and deploy a new one. However, there is a server resource named aws_instance.ubuntu[1] they would like to keep. What command should they use to tell Terraform to stop managing that specific resource?

- A. terraform destroy aws_instance.ubuntu[l]
- B. terraform apply rm aws_instance.ubuntu[l]
- C. terraform state rm aws_instance.ubuntu[l]
- D. terraform plan rm aws_instance.ubuntu[l]

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127163-exam-terraform-associate-topic-1-question-295-discussion/)
> C

## Question 296
---
Before you can use a remote backend, you must first execute terraform init.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127164-exam-terraform-associate-topic-1-question-296-discussion/)
> A

## Question 297
---
What does running a terraform plan do?

- A. Compares your Terraform code and local state file to the remote state file in a cloud provider and determines if any changes need to be made
- B. Imports all of your existing cloud provider resources to the state file
- C. Installs all providers and modules referenced by configuration
- D. Compares the state file to your Terraform code and determines if any changes need to be made

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127168-exam-terraform-associate-topic-1-question-297-discussion/)
> D

## Question 298
---
Which of the following statements about Terraform modules is not true?

- A. Modules must be publicly accessible
- B. You can call the same module multiple times
- C. A module is a container for one or more resources
- D. Modules can call other modules

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127171-exam-terraform-associate-topic-1-question-298-discussion/)
> A

## Question 299
---
How can a ticket-based system slow down infrastructure provisioning and limit the ability to scale? (Choose two.)

- A. End-users have to request infrastructure changes
- B. Ticket based systems generate a full audit trail of the request and fulfillment process
- C. Users can access a catalog of approved resources from drop down lists m a request form
- D. The more resources your organization needs, the more tickets your infrastructure team has to process

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127172-exam-terraform-associate-topic-1-question-299-discussion/)
> AD

## Question 300
---
How do you specify a module's version when publishing it to the public Terraform Module Registry?

- A. Configure it in the module's Terraform code
- B. Mention it on the module s configuration page on the Terraform Module Registry
- C. The Terraform Module Registry does not support versioning modules
- D. Tag a release in the associated repo

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127174-exam-terraform-associate-topic-1-question-300-discussion/)
> D

## Question 301
---
What Terraform command always causes a state file to be updated with changes that might have been made outside of Terraform?

- A. terraform plan -refresh-only
- B. terraform show -json
- C. terraform apply -lock-false
- D. terraform plan -target-state

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127153-exam-terraform-associate-topic-1-question-301-discussion/)
> A

## Question 302
---
Which command must you first run before performing further Terraform operations in a working directory?

- A. terraform plan
- B. terraform workspace
- C. terraform init
- D. terraform import

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/128743-exam-terraform-associate-topic-1-question-302-discussion/)
> C

## Question 303
---
Which command lets you experiment with Terraform expressions?

- A. terraform console
- B. terraform validate
- C. terraform env
- D. terraform test

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127177-exam-terraform-associate-topic-1-question-303-discussion/)
> A

## Question 304
---
What kind of configuration block will create an infrastructure object with settings specified within the block?

- A. provider
- B. state
- C. data
- D. resource

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127178-exam-terraform-associate-topic-1-question-304-discussion/)
> D

## Question 305
---
When do changes invoked by terraform apply take effect?

- A. After Terraform has updated the state file
- B. Once the resource provider has fulfilled the request
- C. Immediately
- D. None of the above are correct

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127123-exam-terraform-associate-topic-1-question-305-discussion/)
> B

## Question 306
---
What is the workflow for deploying new infrastructure with Terraform?

- A. Write Terraform configuration, run terraform init to initialize the working directory or workspace, and run terraform apply
- B. Write Terraform configuration, run terraform show to view proposed changes, and terraform apply to create new infrastructure
- C. Write Terraform configuration, run terraform apply to create infrastructure, use terraform validate to confirm Terraform deployed resources correctly
- D. Write Terraform configuration, run terraform plan to initialize the working directory or workspace, and terraform apply to create the infrastructure

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127180-exam-terraform-associate-topic-1-question-306-discussion/)
> A

## Question 307
---
Which of these are features of Terraform Cloud? (Choose two.)

- A. Remote state storage
- B. A web-based user interface (UI)
- C. Automatic backups
- D. Automated infrastructure deployment visualization

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127181-exam-terraform-associate-topic-1-question-307-discussion/)
> AB

## Question 308
---
Which option can not keep secrets out of Terraform configuration files?

- A. A shared credential file
- B. Mark the variable as sensitive
- C. Environment Variables
- D. A -var flag

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127234-exam-terraform-associate-topic-1-question-308-discussion/)
> B

## Question 309
---
Which of the following is not true of Terraform providers?

- A. An individual person can write a Terraform Provider
- B. A community of users can maintain a provider
- C. HashiCorp maintains some providers
- D. Cloud providers and infrastructure vendors can write, maintain, or collaborate on Terraform providers
- E. None of the above

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127329-exam-terraform-associate-topic-1-question-309-discussion/)
> E

## Question 310
---
Which Terraform command checks that your configuration syntax is correct?

- A. terraform fmt
- B. terraform validate
- C. terraform init
- D. terraform show

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127328-exam-terraform-associate-topic-1-question-310-discussion/)
> B

## Question 311
---
terraform validate uses provider APIs to verify your infrastructure settings.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/127235-exam-terraform-associate-topic-1-question-311-discussion/)
> B

## Question 312
---
You add a new provider to your configuration and immediately run terraform apply in the CLI using the local backend. Why does the apply fail?

- A. Terraform needs you to format your code according to best practices first
- B. Terraform requires you to manually run terraform plan first
- C. The Terraform CLI needs you to log into Terraform Cloud first
- D. Terraform needs to install the necessary plugins first

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/134454-exam-terraform-associate-topic-1-question-312-discussion/)
> D

## Question 313
---
Which of these statements about Terraform Cloud workspaces is false?

- A. They can securely store cloud credentials
- B. They have role-based access controls
- C. You must use the CLI to switch between workspaces
- D. Plans and applies can be triggered via version control system integrations

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/134591-exam-terraform-associate-topic-1-question-313-discussion/)
> C

## Question 314
---
What value does the Terraform Cloud private registry provide over the public Terraform Module Registry?

- A. The ability to restrict modules to members of Terraform Cloud or Enterprise organizations
- B. The ability to share modules publicly with any user of Terraform
- C. The ability to tag modules by version or release
- D. The ability to share modules with public Terraform users and members of Terraform Cloud Organizations

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/140328-exam-terraform-associate-topic-1-question-314-discussion/)
> A

## Question 315
---
Terraform providers are part of the Terraform core binary.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/136915-exam-terraform-associate-topic-1-question-315-discussion/)
> B

## Question 316
---
Which of the following is not a benefit of adopting infrastructure as code?

- A. Reusability of code
- B. Automation
- C. Graphical User Interface
- D. Versioning

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/136916-exam-terraform-associate-topic-1-question-316-discussion/)
> C

## Question 317
---
Where does the Terraform local backend store its state?

- A. In the terraform.tfstate file
- B. In the .terraform directory
- C. In the terraform.tfstate directory
- D. In the .terraform.lock.hcl file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/136917-exam-terraform-associate-topic-1-question-317-discussion/)
> A

## Question 318
---
Which of these is true about Terraform's plugin-based architecture?

- A. Terraform can only source providers from the internet
- B. You can create a provider for your API if none exists
- C. Every provider in a configuration has its own state file for its resources
- D. All providers are part of the Terraform core binary

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/134592-exam-terraform-associate-topic-1-question-318-discussion/)
> B

## Question 319
---
Your risk management organization requires that new AWS S3 buckets must be private and encrypted at rest. How can Terraform Cloud automatically and proactively enforce this security control?

- A. Auditing cloud storage buckets with a vulnerability scanning tool
- B. With a Sentinel policy, which runs before every apply
- C. With an S3 module with proper settings for buckets
- D. By adding variables to each Terraform Cloud workspace to ensure these settings are always enabled

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/134418-exam-terraform-associate-topic-1-question-319-discussion/)
> B

## Question 320
---
If you don't use the local backend, where does Terraform save resource state?

- A. In the remote backend or Terraform Cloud
- B. On the disk
- C. In memory
- D. In an environment variable

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/145045-exam-terraform-associate-topic-1-question-320-discussion/)
> A

## Question 321
---
You are writing a child Terraform module that provisions an AWS instance. You want to reference the IP address returned by the child module in the root configuration. You name the instance resource "main".Which of these is the correct way to define the output value?

- A. 
- B. 
- C. 
- D. 

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/134705-exam-terraform-associate-topic-1-question-321-discussion/)
> A

## Question 322
---
When does Sentinel enforce policy logic during a Terraform Cloud run?

- A. Before the plan phase
- B. During the plan phase
- C. Before the apply phase
- D. After the apply phase

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/137268-exam-terraform-associate-topic-1-question-322-discussion/)
> C

## Question 323
---
What is terraform refresh-only intended to detect?

- A. Empty state files
- B. Corrupt state files
- C. Terraform configuration code changes
- D. State file drift

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/135012-exam-terraform-associate-topic-1-question-323-discussion/)
> D

## Question 324
---

> [!done]- Answer
> 

## Question 325
---
Why would you use the -replace flag for terraform apply?

- A. You want to force Terraform to destroy a resource on the next apply
- B. You want Terraform to ignore a resource on the next apply
- C. You want to force Terraform to destroy and recreate a resource on the next apply
- D. You want Terraform to destroy all the infrastructure in your workspace

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/140189-exam-terraform-associate-topic-1-question-325-discussion/)
> C

## Question 326
---
You can configure Terraform to log to a file using the TF_LOG environment variable.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/134462-exam-terraform-associate-topic-1-question-326-discussion/)
> B

## Question 327
---
When does Terraform create the .terraform.lock.hcl file?

- A. After your first terraform plan
- B. After your first terraform apply
- C. After your first terraform init
- D. Whenever you enable state locking

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/135149-exam-terraform-associate-topic-1-question-327-discussion/)
> C

## Question 328
---
You have been working in a Cloud provider account that is shared with other team members. You previously used Terraform to create a load balancer that is listening on port 80. After some application changes, you updated the Terraform code to change the port to 443.You run terraform plan and see that the execution plan shows the port changing from 80 to 443 like you intended, and step away to grab some coffee.In the meantime, another team member manually changes the load balancer port to 443 through the Cloud provider console before you get back to your desk.What will happen when you terraform apply upon returning to your desk?

- A. Terraform will fail with an error because the state file is no longer accurate.
- B. Terraform will change the load balancer port to 80, and then change it back to 443.
- C. Terraform will not make any changes to the Load Balancer and will update the state file to reflect any changes made.
- D. Terraform will recreate the load balancer.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/141442-exam-terraform-associate-topic-1-question-328-discussion/)
> C

## Question 329
---
Which of the following is not an action performed by terraform init?

- A. Create template configuration files
- B. Initialize a configured backend
- C. Retrieve the source code for all referenced modules
- D. Load required provider plugins

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/145230-exam-terraform-associate-topic-1-question-329-discussion/)
> A

## Question 330
---
In a HCP Terraform/Terraform Cloud workspace linked to a version control repository, speculative plan runs start automatically when you merge or commit change to version control.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146929-exam-terraform-associate-topic-1-question-330-discussion/)
> A

## Question 331
---

> [!done]- Answer
> 

## Question 332
---
A resource block is shown in the Exhibit space of this page. What is the Terraform resource name of the resource block?

- A. test
- B. main
- C. google
- D. compute_instance

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146889-exam-terraform-associate-topic-1-question-332-discussion/)
> B

## Question 333
---
A module block is shown in the Exhibit space of this page.When you use a module block to reference a module from the Terraform Registry such as the one in the example, how do you specify version 1.0.0 of the module?

- A. You cannot. Modules stored on the public Terraform Registry do not support versioning.
- B. Add a version = “1.0.0” attribute to the module block.
- C. Nothing. Modules stored on the public Terraform module Registry always default to version 1.0.0.
- D. Append ?ref=v1.0.0 argument to the source path.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146932-exam-terraform-associate-topic-1-question-333-discussion/)
> B

## Question 334
---
Which syntax check errors when you run terraform validate?

- A. The code contains tabs for indentation instead of spaces.
- B. There is a missing value for a variable.
- C. The state file does not match the current infrastructure.
- D. None of the above.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146924-exam-terraform-associate-topic-1-question-334-discussion/)
> D

## Question 335
---
Terraform encrypts sensitive values stored in your state file.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146933-exam-terraform-associate-topic-1-question-335-discussion/)
> B

## Question 336
---
When should you run terraform init?

- A. Every time you run terraform apply
- B. After you run terraform plan for the first time in a new Terraform project and before you run terraform apply
- C. After you start coding a new Terraform project and before you run terraform plan for the first time
- D. Before you start coding a new Terraform project

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146934-exam-terraform-associate-topic-1-question-336-discussion/)
> C

## Question 337
---
You are making changes to existing Terraform code to add some new infrastructure.When is the best time to run terraform validate?

- A. After you run terraform plan so you can validate that your state file is consistent with your infrastructure
- B. Before you run terraform plan so you can validate your code syntax
- C. Before you run terraform apply so you can validate your infrastructure
- D. After you run terraform apply so you can validate your provider credentials

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146935-exam-terraform-associate-topic-1-question-337-discussion/)
> B

## Question 338
---
Which of these commands makes your code more human readable?

- A. terraform validate
- B. terraform output
- C. terraform show
- D. terraform fmt

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/151146-exam-terraform-associate-topic-1-question-338-discussion/)
> D

## Question 339
---

> [!done]- Answer
> 

## Question 340
---

> [!done]- Answer
> 

## Question 341
---
terraform init retrieves and caches the configuration for all remote modules.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146936-exam-terraform-associate-topic-1-question-341-discussion/)
> A

## Question 342
---

> [!done]- Answer
> 

## Question 343
---
A resource block is shown in the Exhibit section of this page. How would you reference the attribute name of this resource in HCL?

- A. data.kubernetes_namespace.name
- B. resource.kubernetes_namespace.example.name
- C. kubernetes_namespace.test.name
- D. kubernetes_namespace.example.name

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/146937-exam-terraform-associate-topic-1-question-343-discussion/)
> D

## Question 344
---

> [!done]- Answer
> 

## Question 345
---
What happens when you execute terraform plan?

- A. Imports all of your existing cloud provider resources to the state.
- B. Installs all providers and modules referenced by configuration.
- C. Compares your Terraform code and local state file to the remote state file in a cloud provider and determines if any changes need to be made.
- D. Refreshes your state, then compares your state file to your Terraform configuration and creates an execution plan if any changes need to be made.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/147184-exam-terraform-associate-topic-1-question-345-discussion/)
> D

## Question 346
---
What does terraform destroy do?

- A. Destroys the Terraform state file, leaves the infrastructure intact.
- B. Destroys all Terraform code files in the current directory, leaves the state file intact.
- C. Destroy all infrastructure in the Terraform state file.
- D. Destroys all infrastructure in the configured Terraform provider.

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/151974-exam-terraform-associate-topic-1-question-346-discussion/)
> C

## Question 347
---
When you include a module block in your configuration that references a module from the Terraform Registry, the “version” attribute is required.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/151729-exam-terraform-associate-topic-1-question-347-discussion/)
> B

## Question 348
---
Your root module contains a variable named num.servers. Which is the correct way to pass its value to a child module with an input named servers?

- A. ${var.num.servers}
- B. servers = num.servers
- C. servers = var(num.servers)
- D. servers = var.num_servers

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/151722-exam-terraform-associate-topic-1-question-348-discussion/)
> D

## Question 349
---
What does the default local Terraform backend store?

- A. Provider plugins
- B. Terraform binary
- C. tfplan files
- D. State file

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/151730-exam-terraform-associate-topic-1-question-349-discussion/)
> D

## Question 350
---

> [!done]- Answer
> 

## Question 351
---

> [!done]- Answer
> 

## Question 352
---

> [!done]- Answer
> 

## Question 353
---

> [!done]- Answer
> 

## Question 354
---

> [!done]- Answer
> 

## Question 355
---
It is _________ to change the Terraform backend from the default “local” backend to a different one after performing your first terraform apply.

- A. mandatory
- B. optional
- C. impossible
- D. discouraged

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/151731-exam-terraform-associate-topic-1-question-355-discussion/)
> D

## Question 356
---
A child module can always access variables declared in its parent module.

- A. True
- B. False

> [!done]- [Answer](https://www.examtopics.com/discussions/hashicorp/view/151601-exam-terraform-associate-topic-1-question-356-discussion/)
> A

## Question 357
---

> [!done]- Answer
> 

## Question 358
---

> [!done]- Answer
> 

