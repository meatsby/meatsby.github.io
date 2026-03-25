---
title: "Amazon RDS"
date: 2024-05-03 23:42:51 +0800
status: To Do
draft: false
tags:
  - AWS
  - Database
---

## Amazon RDS
---
- RDS(Relational Database Service)는 SQL을 쿼리 언어로 사용하는 관리형 데이터베이스 서비스입니다.
	- Postgres
	- MySQL
	- MariaDB
	- Oracle
	- Microsoft SQL Server
	- Aurora(AWS 독점 DB)
- RDS를 사용하는 이유?
	- 자동 프로비저닝, OS 패치
	- 지속적인 백업 및 특정 시점 복원
	- 모니터링 대시보드 제공
	- 읽기 성능 향상을 위한 Read Replica 지원
	- DR(재해 복구)를 위한 Multi-AZ 구성
	- 업그레이드를 위한 유지보수 윈도우
	- 수직/수평 확장 가능
	- EBS(gp2 또는 io1) 기반 스토리지
	- 인스턴스에 SSH 접속 불가


### RDS 스토리지 자동 확장
- RDS DB 인스턴스의 스토리지를 동적으로 증가시켜줍니다.
- RDS가 DB의 여유 스토리지가 부족함을 감지하면 자동으로 확장합니다.
- `Maximum Storage Threshold`(최대 스토리지 한도)를 설정할 수 있습니다.
- 다음 조건을 모두 만족하면 자동으로 스토리지가 확장됩니다:
	- 여유 스토리지가 할당 스토리지의 10% 미만일 때
	- 낮은 스토리지 상태가 5분 이상 지속될 때
	- 마지막 확장 이후 6시간이 경과했을 때
- 예측 불가능한 워크로드를 가진 애플리케이션에 유용합니다.
- 모든 RDS DB 엔진에서 지원합니다.


### RDS Read Replica(읽기 확장)
- AZ 내, 교차 AZ, 교차 리전에서 최대 15개의 Read Replica 생성 가능
	- 동일 리전 내 데이터 전송은 무료
	- 교차 리전 데이터 전송은 비용 발생
- 복제는 비동기(ASYNC) 방식이므로 읽기 일관성 보장
- Replica를 메인 DB로 승격 가능
- 애플리케이션에서 Read Replica를 사용하려면 연결 문자열을 변경해야 함


### RDS Multi-AZ(재해 복구)
- 스탠바이 RDS DB 인스턴스에 동기(SYNC) 복제(읽기/쓰기 불가)
- 하나의 DNS 이름 사용 - 장애 발생 시 자동으로 스탠바이로 페일오버


### RDS Single-AZ에서 Multi-AZ로 전환
- 마스터 RDS DB 인스턴스의 스냅샷을 생성
- 새 AZ에 스냅샷으로부터 새로운 DB를 복원
- 두 DB 간 동기화가 설정됨


### RDS Custom
- OS 및 DB 커스터마이징이 가능한 관리형 Oracle, Microsoft SQL Server DB
- 기본 DB 및 OS에 접근 가능
	- 설정 구성
	- 패치 설치
	- 네이티브 기능 활성화
	- SSH 또는 SSM Session Manager로 EC2 인스턴스 접근 가능
- 커스터마이징을 위해 Automation Mode를 비활성화해야 하며, 사전에 DB 스냅샷을 생성하는 것이 좋음


### RDS 백업
- 자동 백업
	- DB의 전체 백업을 매일 수행
	- 트랜잭션 로그는 5분마다 백업
	- 보관 기간 1~35일(0으로 설정 시 비활성화)
- 수동 DB 스냅샷
	- 사용자가 직접 트리거
	- 원하는 기간만큼 백업 보관 가능


### RDS 복원
- RDS 백업 또는 스냅샷을 복원하여 새 DB 생성
- S3에서 MySQL RDS 데이터베이스 복원
	- 온프레미스 DB 백업 생성
	- S3에 저장
	- S3의 백업 파일을 새로운 MySQL RDS 인스턴스에 복원


## Amazon Aurora
---
- AWS에서 제공하는 독점 DB 엔진
- Postgres와 MySQL 모두 Aurora DB로 지원
	- 즉, 드라이버는 Aurora를 Postgres 또는 MySQL처럼 인식
- AWS 클라우드에 최적화
	- RDS의 MySQL 대비 5배, Postgres 대비 3배 성능
- 스토리지는 10GB~128TB까지 자동 확장
- Aurora는 최대 15개의 Replica 지원(MySQL은 5개)
	- 복제 속도도 더 빠름
- Aurora는 RDS보다 20% 비싸지만 더 효율적임


### Aurora 고가용성 및 읽기 확장
- 3개의 AZ에 데이터 6개 복제본 저장
	- 쓰기는 6개 중 4개 필요
	- 읽기는 6개 중 3개 필요
	- 피어 투 피어 복제로 자동 복구(Self-healing)
	- 스토리지는 수백 개 볼륨에 스트라이핑
- 1개의 마스터 Aurora 인스턴스가 쓰기 담당, 최대 15개의 Read Replica가 읽기 담당
	- 마스터 인스턴스용 Writer Endpoint
	- 자동 확장되는 Read Replica용 Reader Endpoint
- 교차 리전 복제 지원


### 커스텀 엔드포인트
- Aurora 인스턴스의 일부를 커스텀 엔드포인트로 지정 가능
	- 예: 특정 Replica에서 분석 쿼리 실행
- 커스텀 엔드포인트를 정의하면 일반적으로 Reader Endpoint는 사용하지 않음


### Aurora Serverless
- 실제 사용량에 따라 DB 인스턴스 자동 생성 및 자동 확장
	- 드물거나 간헐적, 예측 불가한 워크로드에 적합


### 글로벌 Aurora
- Aurora 교차 리전 Read Replica
	- 간단하게 구축 가능, DR에 유용
- Aurora 글로벌 데이터베이스(권장)
	- 1개의 기본 리전(R/W)
	- 최대 5개의 보조 리전(R), 리전당 최대 16개의 Read Replica
	- 다른 리전을 DR로 승격 시 RTO 1분 미만
	- 일반적인 교차 리전 복제는 1초 미만 소요


### Aurora 머신러닝
- SQL을 통해 애플리케이션에 ML 기반 예측 제공
- 지원 서비스:
	- Amazon SageMaker(모든 ML 모델 사용 가능)
	- Amazon Comprehend(감정 분석)


### Aurora 백업
- 자동 백업
	- 1~35일 보관
	- 해당 기간 내 시점 복구(Point-in-time recovery) 가능
- 수동 DB 스냅샷
	- 사용자가 직접 트리거
	- 원하는 기간만큼 백업 보관 가능


### Aurora 복원
- Aurora 백업 또는 스냅샷을 복원하여 새 DB 생성
- S3에서 MySQL Aurora 클러스터 복원
	- Percona XtraBackup으로 온프레미스 DB 백업 생성
	- S3에 저장
	- S3의 백업 파일을 새로운 MySQL Aurora 클러스터에 복원


### Aurora 데이터베이스 클로닝
- 기존 Aurora DB 클러스터에서 새로운 클러스터 생성
- 스냅샷 & 복원보다 빠름
- Copy-on-write 프로토콜 사용
	- 처음에는 새 DB 클러스터가 기존 DB 클러스터와 동일한 데이터 볼륨 사용
	- 새 DB 클러스터에 데이터가 변경되면 추가 스토리지가 할당되고 데이터가 분리되어 복사됨
- 운영 DB에서 스테이징 DB를 빠르게 생성할 때 유용


## RDS & Aurora 보안
---
- 저장 데이터 암호화(At-rest encryption)
	- AWS KMS를 이용한 마스터/Replica 암호화(생성 시 지정 필요)
	- 마스터가 암호화되지 않으면 Replica도 암호화 불가
	- DB 스냅샷 & 복원 시 암호화 적용 가능
- 전송 데이터 암호화(In-flight encryption): 기본적으로 TLS 지원, 클라이언트는 AWS TLS 루트 인증서 사용
- IAM 인증: 사용자명/비밀번호 대신 IAM 역할로 DB 접속
- 보안 그룹(Security Group): RDS/Aurora DB의 네트워크 접근 제어
- RDS Custom을 제외하면 SSH 불가
- 감사 로그(Audit log) 활성화 및 CloudWatch Logs로 전송 가능(장기 보관)


## RDS Proxy
---
- RDS를 위한 완전관리형 DB 프록시로, 애플리케이션이 DB 연결을 풀링 및 공유할 수 있게 해줌
- DB 효율성 향상:
	- DB 리소스에 대한 부하 감소
	- 오픈 커넥션 최소화
- RDS & Aurora 장애 조치(failover) 시간 최대 66% 단축
- RDS 및 Aurora 모두 지원
- DB에 대한 IAM 인증 강제 및 자격 증명을 AWS Secrets Manager에 안전하게 저장
- RDS Proxy는 퍼블릭 액세스 불가(VPC 내에서만 접근 가능)


## 참고자료
---
- [Udemy - Ultimate AWS Certified Solutions Architect Associate SAA-C03](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
