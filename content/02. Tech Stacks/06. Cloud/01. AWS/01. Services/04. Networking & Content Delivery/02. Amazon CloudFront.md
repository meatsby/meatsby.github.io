---
title: "Amazon CloudFront"
date: 2024-05-13 17:17:53 +0800
status: In Progress
draft: false
tags:
  - AWS
  - CDN
---
## Amazon CloudFront
---
- Amazon CloudFront is a CDN that improves read performance by caching content at the edge location resulting in improved user experience
- 216 Point of Presence globally (edge locations)
- DDoS protection (because worldwide), integration with Shield, AWS WAF

### Origins
- S3 Bucket
	- For distributing files and caching them at the edge
	- Enhanced security with CloudFront Origin Access Control (OAC)
	- CloudFront can be used as an ingress (to upload files to S3)
- Custom Origin (HTTP)
	- Application Load Balancer
	- EC2 instance
	- S3 website
	- Any HTTP backend

### Geo Restriction
- You can restrict who can access your distribution with Allowlist or Blocklist
- The "Country" is determined using a 3rd party Geo-IP DB
- Use case: Copyright Laws to control access to content

### Pricing
- CloudFront Edge Locations are all around the world
- The cost of data out per Edge Location varies
- Price Classes
	- You can reduce the number of Edge Locations for cost reduction
	- 3 Price Classes
		- Price Class All: All regions - best performance
		- Price Class 200: Most regions, but excludes the most expensive regions
		- Price Class 100: Only the least expensive regions

### Cache Invalidations
- In case you update the back-end origin, CloudFront doesn't know about it and will only get the refreshed content after the TTL has expired
- However, you can force an entire or partial cache refresh by performing Cache Invalidation
- You can invalidate all files (`*`) or a special path (`/images/*`)

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
