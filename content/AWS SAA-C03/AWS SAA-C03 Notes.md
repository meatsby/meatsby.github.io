---
title: AWS SAA-C03 Notes
date: 2024-07-10 21:48:33 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS SAA-C03 Notes
---
- S3 Transfer Acceleration = Edge Location 으로 transfer 해서 transfer speed 올리는 법
- PrincipalOrgID = AWS Organization member accounts 만 접근 가능하게 for resource policies
- GW VPC Endpoint vs Interface VPC Endpoint
- S3 File GW = extend storage space by leveraging Amazon S3
- Secrets Manager vs Parameter Store
	- Secrets Manager = Auto Rotation
- CloudFront vs Global Accelerator (both support Shield for DDoS)
	- CloudFront = CDN for fast static content delivery, dynamic content (API acceleration)
		- Origin = S3, ALB, EC2, HTTP backend
	- Global Accelerator = Best routing by using Edge Locations
		- TCP/UDP, MQTT(IoT), VoIP, HTTP with static IP address
- Network Firewall = provides filtering for both inbound and outbound network traffic
- GLB = L3 (IP Packets)
- EBS Fast Snapshot Restore (FSR) = no latency on first use
- SSO + MSAD = two-way forest trust AWS Directory Service for MSAD

- Lambda reserved concurrency vs provisioned concurrency
	- reserved concurrency
	- provisioned concurrency

## Questions to retry
---
6
9
12
15
16
19
20, not A since D is faster
24, not C

## Question 82
> B, AWS Config has a managed rule named acm-certificate-expiration-check to check for expiring certificates (configurable number of days)

## Question 189
> BD, why not C? Because we do not have control over rotation for SSE-S3 keys

## Question 207
> D, not B because DAX caches reads not writing

## Question 208
> A, not B because GW VPC EP does not guarantee that the data won't be routed through public internet

## Question 218
> AE, as NACL is stateless and outbound traffic is going to be dynamic ports

## Question 219
> D, as EC2 requires CW agents to collect memory metrics

## Question 257
> A, since near-real-time == Kinesis Data Firehose

## Question 264
> D, not B because DNS cache in clients could drive timeouts

## Question 267
> D, not C because it introduces unnecessary complexity by involving EMR

## Question 273
> B, as Multi-AZ is not for DR and warm standby has lowest RTO

## Question 275
> C, not A as C has better cost effectiveness

## Question 283
> D, since FSx for NetApp ONTAP provides shared storage between Linux and Windows file systems

## Question 301
> C, as Snowcone is suitable when network bandwidth is limited, FSx File GW only provides access to files stored in FSx, and Transfer Family is transferring file over SFTP and such

## Question 306
> A, as BCD distributes instances across AZs which is bad for inter-node network

## Question 308
> BD, as C is for 1 or 3 years

## Question 309
> A, as S3 Storage Lens is a fully managed S3 storage analytics solution that provides a comprehensive view of object storage usage, activity trends, and recommendations to optimize costs

## Question 310
> B, as A speeds uploads only

## Question 314
> B, as "without selecting a particular instance type" = serverless

## Question 319
> A, as STS does not generate SSH keys, bastion instances do not remove all shared keys, and Cognito is not meant for internal users

## Question 320
> A, as B does not offer real-time querying

## Question 324
> D, as C is for frequently accessed data and 10TB limit

## Question 327
> A, as a Network Firewall creates stateful outbound rules to allow certain domains for software patch download and deny all other domains

## Question 335
> B, Fast Snapshot Restore (FSR) is for initialization latency

## Question 338
> B, as D is more expensive

## Question 360
> B, as C is for S3 or DDB

## Question 379
> B, configuring provisioned concurrency would get rid of the "cold start" of the Lambda to load many libraries

## Question 384
> C, as only EFS supports POSIX

## Question 394
> D, as gp3's max IOPS is 16,000 and RDS does not support io2

## Question 398
> C, as AB would take around 600 days to transfer and D takes time to setup a connection

## Question 402
> A, since Kinesis Data Stream stores 24 hrs by default

## Question 405
> DE, since ASG cannot adjust ALB capacity

## Question 411
> C, since automatically scales compute and memory resources based on application usage

## Question 414
> B, since near-real time with least administrative overhead

## Question 417
> C, Compute Savings Plan can save costs for both EC2 and Lambda

## Question 421
> B, since SFTP cannot use EBS, and S3 doesn't guarantee high IOPS

## Question 423
> AB, since Identity-based policy is used for role and group

## Question 425
> C, since GP3 is cost effective

## Question 444
> D, S3 Transfer Acceleration supports both upload and download

## Question 453
> D, since we can delete backup in governance mode

## Question 457
> C, since Transfer Family supports AS2

## Question 465
> C, since Multi-Attach is supported only for io1 and io2 volumes

## Question 470
> D, since egress-only IG is for IPv6 and NATGW is for IPv4

## Question 485
> A, since Expedited retrievals typically take 1–5 minutes

## Question 487
> C, since A doesn't support native protocol

## Question 496
> BD, Storage GW file and volume is for NFS and block storage respectively

## Question 502
> CE, as CMS is dynamic and CloudFront is for content delivery

## Question 508
> BD, since on-demand is wrong and Lambda is overhead

## Question 510
> C, since we cannot reference the SG of a peer VPC that's in a different Region

## Question 514
> B, since the EKS control plane is configured with private endpoint access only which requires interface VPC endpoint to communicate

## Question 526
> D, RDS proxy also allows automatic routing for write requests to healthy writer

## Question 535
> B, Secrets Manager does not encrypt etcd store

## Question 536
> D, since read replicas are async whereas readable standby is synchronous

## Question 539
> B, since Warm Standby provides (RPO in seconds, RTO in minutes)

## Question 540
> D, since RDS for Oracle doesn't support Multi-AZ DB clusters

## Question 541
> ACE, since B is too much cost, D is for session management, and F doesn't work for S3 + PHP

## Question 543
> AE, Resource Access Manager is for security not for billing

## Question 546
> D, since it's tapes

## Question 550
> BD, least privileged == role level

## Question 552
> B, only Compute Savings Plan allows changing instance family

## Question 560
> A, as Control Tower has built-in account drift notifications that detects OU changes automatically

## Question 571
> A, since there is no option in ACM to request a certificate from third-party CA

## Question 572
> C, since provisioned Aurora and RDS have more admin overhead

## Question 573
> D, not A because it costs more

## Question 589
> B, as Memcache is not HA

## Question 598
> ACF, as S3 File GW supports SMB

## Question 599
> ACF, not D and E as it's AWS's responsibility for Outposts

## Question 601
> B, it is possible to promote RDS to Aurora

## Question 603
> B, Step Functions provide Map state which is for distributed processing

## Question 605
> D, iSCSI = Storage GW, low-latency access to frequently used data = cached volume

## Question 607
> C, storing blobs cost-effectively = S3

## Question 608
> A, endpoint restriction by IP addresses = AWS WAF

## Question 617
> BE, NFS = EFS

## Question 622
> AD, not B since Aurora can't rapidly evolve their schema

## Question 624
> D, not B since Cognito is for providing access to own apps, not AWS resources

## Question 630
> C, Fargate is cheaper than EC2

## Question 631
> B, Social Network -> Graph data -> Neptune

## Question 635
> C, as B is one-time copy

## Question 646
> C, host a high performance computing (HPC) workload -> FSx lustre

## Question 648
> B, as the entire dataset is required, A is for temporary data storage

## Question 651
> C, "The images cannot be lost during this process"

## Question 652
> B, as Transient cluster runs until the workload is completed and cannot lose data = primary and core nodes on demand

## Question 657
> B, as RAM is for this usage

## Question 658
> AE, as LEAST latency = cluster, NFS & SMB = NetApp ONTAP

## Question 667
> C, not A since the GW endpoint does not allow access from on-prem, peered VPCs in other Regions, or transit GW

## Question 670
> B, as applications have predictable traffic patterns

## Question 682
> A, not D inspector is for OS patching and vulnerability detections

## Question 702
> D, but B should be correct as per FSx cannot directly import data from Snowball Edge?

## Question 712
> A, since Outbound Resolver endpoints allows DNS queries from VPC to on-prem or another VPC

## Question 713
> B, DDB for metadata

## Question 714
> B, least outstanding requests algorithm = route to targets with the lowest number of in-progress requests

## Question 734
> D, Direct Connect GW = Direct Connect to 1 or more VPCs in different Regions

## Question 744
> A, NLB needs to be before ALB since only NLB can have static IP

## Question 754
> B, Global Accelerator provides static IP

## Question 759
> B, not C as per S3 Glacier Flexible Retrieval, expedited retrieval cannot retrieve files larger than 250MB+ within 1~5mins

## Question 761
> D, since not compatible with SAML

## Question 762
> C, Recycle Bin us a data recovery feature to restore accidental deletion of EBS snapshots and EBS-backed AMIs

## Question 775
> B, VPC Lattice is a new capability of VPC designed to simplify networking for service-to-service communications

## Question 778
> B, not C since Snowmobile is advised over 10PB

## Question 784
> C, Data preparation = Glue DataBrew, State handling = Step Functions

## Question 787
> A, auditing all accounts & FSBP standard = Control Tower with Security Hub

## Question 792
> A, Cognito authorizer for access?

## Question 795
> BD, Elastic Fabric Adapter is for HPC

## Question 804
> C, MPP = Redshift, serverless = Glue job

## Question 806
> B, S3 supports NFS

## Question 810
> C, PrivateLink allows to connect some AWS services hosted by other AWS accounts

## Question 814
> B, AMQP = Amazon MQ

## Question 826
> B, need IAM Identity Center

## Question 827
> D, Aurora has 2 storage options, Standard & I/O-Optimized

## Question 828
> D, Security Hub = assess AWS environment against security industry standards

## Question 832
> C, need SFTP enabled server with SFTP endpoint and AWS Directory Service with AD connector to reach on-prem AD for authentication and authorization

## Question 833
> C, Event bus can manipulate event, D is also possible but too much operations

## Question 841
> B, EBS Snapshots Archive is most cost-effective

## Question 867
> D, Compute Optimizer helps avoid overprovisioning and underprovisioning four types of AWS resources

## Question 886
> BC, Babelfish for Aurora PostgreSQL is a new capability for Amazon Aurora PostgreSQL-Compatible Edition that enables Aurora to understand commands from applications written for Microsoft SQL Server

## Question 888
> A, as Glue does not process data in real-time

## References
---
- 
