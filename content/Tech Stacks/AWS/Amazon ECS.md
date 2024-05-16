---
title: Amazon ECS
date: 2024-05-16 21:37:44 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon ECS
---
- ECS = Elastic Container Service
- Launch Docker containers on AWS = Launch ECS Tasks on ECS Clusters

### EC2 Launch Type
- EC2 Launch Type: you must provision & maintain the infrastructure
- Each EC2 instance must run the ECS agent to register in the ECS Cluster
- AWS takes care of starting/stopping containers

### Fargate Launch Type
- Launch Docker containers on AWS
- You do not provision the infrastructure (no EC2 instances to manage)
- It's all serverless
- You just create task definitions
- AWS just runs ECS tasks for you based on the CPU/RAM you need
- To scale, just increase the number of tasks

### IAM Roles for ECS
- EC2 Instance Profile (EC2 Launch Type only):
    - Used by the ECS agent
    - Makes API calls to ECS service
    - Send container logs to CloudWatch Logs
    - Pull Docker images from ECR
    - Reference sensitive data in Secrets Manager or SSM Parameter Store
- ECS Task Role
    - Allows each task to have a specific role
    - Use different roles for the different ECS services you run
    - Task Role is defined in the task definition

### Load Balancer Integrations
- ALB supported and works most use cases
- NLB recommended only for high throughput/high performance use cases, or to pair it with AWS Private Link

### Data Volumes (EFS)
- Mount EFS file systems onto ECS tasks
- Works for both EC2 and Fargate launch types
- Tasks running in any AZ will share the same data in the EFS file system
- Fargate + EFS = Serverless
- Use cases: persistent multi-AZ shared storage for your containers
- Note: S3 cannot be mounted as a file system

### ECS Service Auto Scaling
- Automatically increase/decrease the desired number of ECS tasks
- ECS Auto Scaling uses AWS Application Auto Scaling
    - ECS Service Average CPU Utilization
    - ECS Service Average Memory Utilization - Scale on RAM
    - ALB Request Count per Target - metric coming from the ALB
- Target Tracking - scale based on target value for a specific CloudWatch metric
- Step Scaling - scale based on a specified CloudWatch Alarm
- Scheduled Scaling - scale based on a specified date/time (predictable changes)
- ECS Service Auto Scaling (task level) != EC2 Auto Scaling (EC2 instance level)
- Fargate Auto Scaling is much easier to setup (because Serverless)

## Amazon ECR
---
- ECR = Elastic Container Registry
- Store and manage Docker images on AWS
- Private and Public repository (Amazon ECR Public Gallery)
- Fully integrated with ECS, backed by S3
- Access is controlled through IAM (permission errors => policy)
- Supports image vulnerability scanning, versioning, image tags, image lifecycle, ...

## Amazon EKS
---
- EKS = Elastic Kubernetes Service
- It is a way to launch managed Kubernetes clusters on AWS
- K8s is an open-source system for automatic deployment, scaling, and management of containerized(usually Docker) applications
- It's an alternative to ECS, similar goal but different API
- EKS supports EC2 if you want to deploy worker nodes or Fargate to deploy serverless containers
- Use case: if company is already using K8s on-premises or in another cloud, and wants to migrate to AWS using K8s
- K8s is cloud-agnostic (can be used in any cloud - Azure, GCP, ...)

### Node Types
- Managed Node Groups
    - Creates and manages Nodes (EC2 instances) for you
    - Nodes are part of an ASG managed by EKS
    - Supports On-Demand or Spot Instances
- Self-Managed Nodes
    - Nodes created by you and registered to the EKS cluster and managed by an ASG
    - You can use prebuilt AMI - Amazon EKS Optimized AMI
    - Supports On-Demand or Spot Instances
- AWS Fargate
    - No maintenance required, no nodes managed

### Data Volumes
- Need to specify Storage Class manifest on your EKS cluster
- Leverages a Container Storage Interface (CSI) compliant driver
- Supports:
    - EBS
    - EFS (works with Fargate)
    - FSx for Lustre
    - FSx for NetApp ONTAP

## AWS App Runner
---
- Fully managed service that makes it easy to deploy web applications and APIs at scale
- No infrastructure experience required
- Start with your source code or container image
- Automatically builds and deploy the web app
- Automatic scaling, high availability, load balancer, encryption
- VPC access support
- Connect to database, cache, and message queue services
- Use cases: web apps, APIs, microservices, rapid production deployments

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
