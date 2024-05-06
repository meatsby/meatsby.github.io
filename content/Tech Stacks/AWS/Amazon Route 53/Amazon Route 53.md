---
title: Amazon Route 53
date: 2024-05-06 20:22:00 +0800
status: In Progress
draft: false
tags:
  - AWS
  - DNS
---
## DNS 란
---
### DNS Terminologies
![[FQDN.png]]
- Domain Register: Amazone Route 53, GoDaddy, ...
- DNS Records: A, AAAA, CNAME, NS, ...
- Zone File: Contains DNS records
- Name Server: Resolves DNS queries (Authoritative or Non-Authoritative)
- Top Level Domain (TLD): `.com`, `.gov`, `.org`, ...
- Second Level Domain (SLD): `amazon.com`, `google.com`, ...

### How DNS works
![[How DNS works.png]]

## Amazon Route 53
---
- A HA, scalable, fully managed, and Authoritative DNS
	- Authoritative: Customer can update the DNS records
- R53 is also a Domain Register
- Health-check available
- The only AWS service that provides 100% availability SLA

### Records
- How you want to route traffic for a domain
- Each record contains:
	- Domain/Subdomain Name: e.g. example.com
	- Record Type: e.g. A or AAAA
	- Value: e.g. 123.456.789.123
	- Routing Policy: How R53 responds to queries
	- TTL: Amount of time the record cached at DNS Resolvers
- R53 supports the following DNS record types:
	- A / AAAA / CNAME / NS
	- (Advanced) CAA / DS / MX / NAPTR / PTR / SOA / TXT / SPF / SRV

### Record Types
- A: maps a hostname to IPv4
- AAAA: maps a hostname to IPv6
- CNAME: maps a hostname to another hostname
	- The target is a domain name which must have an A or AAAA record
	- Cannot create a CNAME record for the top node of a DNS namespace (Zone Apex)
- NS: Name Servers for the Hosted Zone
	- Control how traffic is routed for a domain

### CNAME vs Alias
- AWS Resources (LB, CloudFront, ...) expose an AWS hostname
- CNAME
	- Points a hostname to any other hostname (app.domain.com => any.thing.com)
	- Only for non-root domain (sub.domain.com)
- Alias
	- Points a hostname to an AWS Resources (app.domain.com => any.amazonaws.com)
	- Works for the root domain and non-root domain (domain.com)
	- Free of charge
	- Native health-check

### Alias Records
- Maps a hostname to an AWS resource
- An extension to DNS functionality
- Automatically recognizes changes in the resource's IP addresses
- Unlike CNAME, it can be used for the top node of a DNS namespace (Zone Apex)
	- e.g. example.com
- Alias Record is always of type A/AAAA for AWS resources (IPv4/IPv6)
- Cannot set TTL
- Alias Records Targets
	- ELB
	- CloudFront Distributions
	- API Gateway
	- EB Environments
	- S3 Websites
	- VPC Interface Endpoints
	- Global Accelerator's Accelerator
	- R53 Record in the same hosted zone
	- But cannot set for EC2 DNS name

### Hosted Zones
![[Hosted Zones.png]]
- A container for records that define how to route traffic to a domain and its subdomains
- Public Hosted Zones - contains records that specify how to route traffic on the internet (public domain names)
- Private Hosted Zones - contains records that specify how you route traffic within one or more VPCs (private domain names)
- $0.5 per month per hosted zone

## Routing Policies
---
- Define how R53 responds to DNS queries
- R53 supports the following Routing Policies
	- Simple
	- Weighted
	- Failover
	- Latency based
	- Geolocation
	- Multi-Value Answer
	- Geoproximity (using R53 Traffic Flow feature)

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
