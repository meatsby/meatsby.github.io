---
title: Amazon SQS
date: 2024-05-14 16:33:23 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## Amazon SQS
---
- Producers send messages and Consumers poll messages

### Standard Queue
- Fully managed service used to decouple applications
- Attributes:
	- Unlimited throughput, unlimited number of messages in queue
	- Default retention of messages: 4 days, up to 14 days
	- Low latency (<10ms on publish and receive)
	- Limitation of 256KB per message sent
- Can have duplicate messages (at least once delivery, occasionally)
- Can have out-of-order messages (best-effort ordering)
- Produces messages with `SendMessage` API and deletes messages with `DeleteMessage` API after consumption

### Security
- Encryption
	- In-flight encryption using HTTPS API
	- At-rest encryption using KMS keys
	- Client-side encryption if the client wants to perform encryption/decryption itself
- Access Controls
	- IAM policies to regulate access to the SQS API
- SQS Access Policies (similar to S3 bucket policies)
	- Useful for cross-account access to SQS queues
	- Useful for allowing other services (SNS, S3, ...) to write to an SQS queue

### Message Visibility Timeout
- After a consumer polls a message, it becomes invisible to other consumers
- "Message Visibility Timeout" is 30 secs by default
- After "Message Visibility Timeout" is over and it's not deleted, the message is visible in SQS
- If a message is not processed within the visibility timeout, it will be processed twice
- A consumer could call `ChangeMessageVisibility` API to get more time
	- If visibility timeout is high (hours), and consumer crashes, re-processing will take time
	- If visibility timeout is too low (seconds), we may get duplicates

### Long Polling
- Decreases the number of API calls made to SQS while increasing the efficiency and latency
- The wait time can be between 1 ~ 20 secs (20 secs preferable)
	- Long polling is preferable to short polling
- Long Polling can be enabled at the queue level or the API level using `WaitTimeSeconds`

### FIFO Queue
- Limited throughput: 300msg/s without batching, 3000msg/s
- Exactly-once send capability (by removing duplicates)
- Messages are processed in order by the consumer

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
