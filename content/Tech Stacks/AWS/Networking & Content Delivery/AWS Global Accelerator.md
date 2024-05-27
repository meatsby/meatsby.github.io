---
title: AWS Global Accelerator
date: 2024-05-13 18:07:26 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Global Accelerator
---
- Leverages the AWS internal network to route to the application
- 2 Anycast IPs are created for the application
	- Unicast IP: One server holds one IP address
	- Anycast IP: All servers hold the same IP address and the client is routed to the nearest one
- The Anycast IP sends traffic directly to Edge Locations
- The Edge locations send the traffic to the application
- Works with EIP, EC2, ALB, NLB, Public or Private
- Consistent Performance
- Health Checks
- Security
	- Only 2 external IPs need to be whitelisted
	- DDoS protection by AWS Shield

### AWS Global Accelerator vs CloudFront
- They both use the AWS global network and its edge locations around the world
- Both services integrate with AWS Shield for DDoS protection
- CloudFront
	- Improves performance for both cacheable content (such as images and videos)
	- Dynamic content (such as API acceleration and dynamic site delivery)
	- Content is served at the edge
- Global Accelerator
	- Improves performance for a wide range of applications over TCP/UDP
	- Proxying packets at the edge to applications running in one or more AWS Regions
	- Good for
		- non-HTTP use cases, such as gaming(UDP), IoT(MQTT), or Voice over IP
		- HTTP use cases that require a static IP addresses
		- HTTP use cases that require deterministic, fast regional failover

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
