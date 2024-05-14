---
title: AWS Snow Family
date: 2024-05-14 11:46:31 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Snow Family
---
- Highly secure, portable devices to collect and process data at the edge, and migrate data into and out of AWS
	- Data migration: Snowcone, Snowball Edge, Snowmobile
	- Edge computing: Snowcone, Snowball Edge

## Data Migration
---
### Snowcone & Snowcone SSD
- Small, portable computing, anywhere, rugged & secure, withstands harsh environments
- Light (2.1kg) device used for edge computing, storage, and data transfer
	- Snowcone - 8 TB of HDD
	- Snowcone SSD - 14TB of SSD
- Use Snowcone where Snowball does not fit (space-constrained environment)
- Must provide battery/cables
- Can be sent to AWS offline, or connected to the internet to use AWS DataSync to send data

### Snowball Edge
- Physical data transport solution to move TBs or PBs of data in or out of AWS
- Alternative to moving data over the network
- Pay per data transfer job
- Provide block storage and S3-compatible object storage
	- Snowball Edge Storage Optimized
		- 80 TB of HDD
	- Snowball Edge Compute Optimized
		- 42 TB of HDD or 28TB NVMe

### Snowmobile
- Transfer EBs of data
- Each Snowmobile has 100 PB of capacity
- High security: temperature controlled, GPS, 24/7 video surveillance

## Edge Computing
---
### Snowcone & Snowcone SSD
- 2 CPUs, 4 GB of memory, wired or wireless access
- USB-C power using a cable or battery
- Can run EC2 & Lambda (using AWS IoT Greengrass)

### Snowball Edge
- Snowball Edge Compute Optimized
	- 10 vCPUs, 416 GiB of RAM
	- Optional GPU
	- 28 TB NVMe or 42 TB HDD
	- Storage Clustering available (up to 16 nodes)
- Snowball Edge Storage Optimized
	- Up to 40 vCPUs, 80 GiB of RAM, 80 TB storage
- Can run EC2 & Lambda (using AWS IoT Greengrass)

## AWS OpsHub
---
- A software to manage Snow Family Devices
	- Unlocking and configuring single or clustered devices
	- Transferring files
	- Launching and managing instances running on Snow Family Devices
	- Monitor device metrics (storage capacity, active instances on devices)
	- Launch compatible AWS services on devices
		- e.g. EC2, DataSync, NFS

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
