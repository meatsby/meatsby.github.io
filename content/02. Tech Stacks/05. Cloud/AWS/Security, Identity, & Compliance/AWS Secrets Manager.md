---
title: "AWS Secrets Manager"
date: 2024-06-02 21:30:29 +0800
status: In Progress
draft: false
tags:
  - AWS
---
## AWS Secrets Manager
---
- Newer service, meant for storing secrets
- Capability to force rotation of secrets every X days
- Automate generation of secrets on rotation (uses Lambda)
- Integration with RDS
- Secrets are encrypted using KMS
- Mostly meant for RDS integration

### Multi-Region Secrets
- Replicate Secrets across multiple AWS Regions
- Secrets Manager keeps read replicas in sync with the primary Secret
- Ability to promote a read replica Secret to a standalone Secret

## Using Secrets Manager with Python
---
```python
class GetSecretWrapper:
    def __init__(self, secretsmanager_client):
        self.client = secretsmanager_client


    def get_secret(self, secret_name):
        """
        Retrieve individual secrets from AWS Secrets Manager using the get_secret_value API.
        This function assumes the stack mentioned in the source code README has been successfully deployed.
        This stack includes 7 secrets, all of which have names beginning with "mySecret".

        :param secret_name: The name of the secret fetched.
        :type secret_name: str
        """
        try:
            get_secret_value_response = self.client.get_secret_value(
                SecretId=secret_name
            )
            logging.info("Secret retrieved successfully.")
            return get_secret_value_response["SecretString"]
        except self.client.exceptions.ResourceNotFoundException:
            msg = f"The requested secret {secret_name} was not found."
            logger.info(msg)
            return msg
        except Exception as e:
            logger.error(f"An unknown error occurred: {str(e)}.")
            raise
```
- Other type key-value pair 로 저장 시 `get_secret_value_response` 는 json 형식의 String 이 반환됨
- `json.loads()` 로 dictionary 로 전환해 사용 가능
- 물론 Lambda 에 할당된 IAM Role 에 GetSecrets permission 을 적용해야 호출 가능

## AWS-Parameters-and-Secrets-Lambda-Extension
---
- AWS Secrets Manager 는 API 호출 마다 비용이 발생함
- 1M per 5USD 로 저렴해서 호출이 많이 발생하지 않는 경우 비용을 감수해도 무관
- 호출이 많은 서비스 개발 시 Lambda Layer 에서 해당 Extension 을 통해 호출한 secrets 를 캐싱하여 사용 가능 + 응답속도 향상 역시 이점으로 챙길 수 있음

## References
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
