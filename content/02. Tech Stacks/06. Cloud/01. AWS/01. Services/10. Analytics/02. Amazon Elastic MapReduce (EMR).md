---
title: "Amazon Elastic MapReduce (EMR)"
date: 2024-05-27 21:30:04 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon Elastic MapReduce (EMR)
---
- EMR helps create Hadoop clusters (Big Data) to analyze and process vast amounts of data
- The clusters can be made of 100s of EC2s
- EMR comes bundled with Apache Spark, HBase, Presto, Flink, ...
- EMR takes care of all the provisioning and configuration
- Auto-scaling and integrated with Spot instances
- Use cases: data processing, ML, web indexing, big data, ...

### Node types & Purchasing
- Master Node: Manage the cluster, coordinate, and manage health - long-running
- Core Node: Run tasks and store data - long-running
- Task Node (optional): Just to run tasks - usually Spot
- Purchasing options
	- On-demand: Reliable, predictable, won't be terminated
	- Reserved (min 1yr): Cost savings (EMR will automatically use if available)
	- Spot Instances: Cheaper, can be terminated, less reliable
- Can have a long-running cluster, or transient (temporary) cluster

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
