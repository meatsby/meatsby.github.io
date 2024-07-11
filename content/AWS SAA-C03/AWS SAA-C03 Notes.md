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
- AWS Config rules = to check resources that are not properly tagged
- AWS Shield Advanced = ELB, CF, GA, R53

- Direct Connect vs VPN vs VPC endpoint & PrivateLink
- DR RPO/RTO order
- DDB PITR vs AWS Backup
	- PITR = recover table to any point in time in a rolling 35 day window
	- Backup = for long-term archiving and retention
- Glue Job Bookmarks = prevent re-processing old data
- S3 Legal Hold?
- Control Tower vs SCPs
- CloudFront field-level encryption profile?
- Storage Gateway?
- S3 signed cookies vs signed URLs

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
39
47
50
52
56
71
78
82
84, Spot Blocks are no longer available and on-demand is not saving
93
98
103
105
107, Lambda is storing data to existing analytics platform
108
110
117, CloudWatch Logs subscription
119
120
121
133, needs to maintain access to the database’s underlying operating system
134
135
141
143
145
150
151
172
184
189
193, Read Replica vs ElastiCache for Redis
196
199
201
205
207
208
209
216
217
218
219
224, randomly access = multivalue
240
247
257
260
264
267
273
275
283
293
301
306
308
309
310
314
319
320
324
327
335
338
360
379
384
394
398
402
405
411
414
417
421
423
425
444
453
457
465
470
485
487
496
502
508
510
514
526
535
536
539
540
541
543
546
550
552
560
571
572
573
589
598
599
601
603
605
607
608
617
622
624
630
631
635
646
648
651
652
657
658
667
670
682
702
712
713
714
734
744
754
759
761
762
775
778
784
787
792
795
804
806
810
814
826
827
828
832
833
841
867
886
888

## References
---
- 
