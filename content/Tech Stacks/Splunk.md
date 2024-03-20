# Splunk

## Splunk 란
 - Splunk 란, 위치, 규모, 종류에 관계없이 다양한 유형의 머신 데이터를 수집 및 분석할 수 있는 머신 빅데이터 플랫폼
     - 머신 데이터: 서버/네트워크 로그, 설비 데이터, 애플리케이션 로그, 기타 모든 텍스트 형태의 데이터
 - 정형/비정형 데이터 모두 수용 가능하며, 데이터 포맷, 용량에 제한이 없는 것이 특징
 - 수집 -> 저장 -> 분석 -> 시각화 까지 별도의 외부 솔루션 없이 모두 가능
 - 모든 데이터가 실시간으로 분석 가능하며, 분산 저장 및 검색으로 뛰어난 성능
 - Splunk Enterprise, Cloud 등 유상 라이센스 형태로 제공되며, 다른 빅데이터 엔진과 다른 특징들이 존재
     - Schema at Read: 데이터를 읽을 때 Field(Schema)가 정해짐
     - SPL 제공: |(Pipe)를 통해 쉽게 데이터 조회
     - 모든 종류의 Raw 데이터 수용

## SPL(Splunk Processing Language)
 - Splunk 에서 제공하는 검색 언어로 머신 데이터를 검색 및 분석 가능 (SQL 과 유사)

## 활용 사례
 - SIEM (Security Information & Event Management)
     - SIEM 이란 보안 이벤트 데이터, 네트워크 스트림 데이터를 실시간으로 분석하여 위협관리, 사고대응 하는 시스템
     - 공격, 위협 탐지 및 관리, 조사, 모니터링 등에 사용됨
 - UEBA (User and Entity Behavior Analytics)
     - UEBA 란 일반적인 보안 분석이 아닌 사용자 행위를 주된 목적으로 하는 분석
     - 분석대상이 사용자의 행위에 집중되어 있으며, 결론적으론 악의적인 행동을 탐지하는 것이 목적
     - 이에 대한 분석은 Rule-based 혹은 머신러닝으로 이뤄지기도 함
 - FDS (Fraud Detection System)
     - FDS 란 금융권에서 온라인 금융 거래 정보를 실시간으로 수집 및 분석하여 의심되는 거래를 추적 및 인증을 강화하는 시스템
     - Splunk 의 뛰어난 로그 검색 능력 덕에 대량의 트랜잭션이 오가는 금융권에서도 많이 사용됨

## Splunk 의 주요 컴포넌트
 - Search Head
     - 웹 기반 UI 로써 사용자 생성 및 권한 정의 및 APP 관리 기능 제공
     - SPL 을 통해 Indexer 에 저장된 Index 검색
     - Chart, Report, Dashboard 를 통한 데이터 시각화
     - 재사용 가능한 다양한 데이터 모델 정의
 - Indexers
     - 머신 데이터 저장 및 프로세싱 기능 제공
     - Search Head 로부터 SPL 검색 요청을 받아 저장된 데이터에 대한 프로세싱 수행
     - 데이터는 Bucket 단위로 저장되며, 로그의 종류 및 보관 기간 등 각각에 요건에 맞는 저장 정책 제공
         - Hot Bucket
             - 현재 수집되는 데이터가 Writing 되는 Bucket
             - 가장 최근 데이터를 저장하기에 SSD 사용
         - Warm Bucket
             - 더 이상 Writing 은 없고 Read Only 상태의 데이터가 있는 Bucket
             - 비교적 최근 데이터를 저장하기에 SSD 사용
         - Cold Bucket
             - 장기간 보관을 위한 Bucket
             - 낮은 빈도로 접근되기에 HDD 사용
         - Frozen Bucket
             - 보관정책 주기가 지난 데이터
             - 삭제 및 아카이빙
         - Thawed Bucket
             - 아카이빙 된 데이터를 다시 분석하기 위해 시스템에 장착하는 위치
 - Forwarders
     - 로컬 시스템에 저장된 다양한 머신 데이터에 대한 수집 및 전달
     - File, 네트워크(TCP, UDP) 등 다양한 방식으로 데이터 수집
         - Agent(Forwarder): File, Table, Wire Data
         - Agentless: HTTP, TCP, UDP, JMS
     - Universal Forwarder
         - 데이터 수집과 Indexer 로 전달이 목적인 바이너리
         - 목적에 맞게 필요한 기능만 포함하여 경량화된 상태
         - 수집한 데이터를 Heavy Forwarder 혹은 Indexer 로 전송
         - CSV 와 같은 정형데이터 외에 다른 데이터는 Parsing 불가
     - Heavy Forwarder
         - DB 데이터와 같은 특정 데이터는 Universal Forwarder 와 달리 모든 기능을 갖춘 Heavy Forwarder 가 요구됨
             - DBconnect, Checkpoint, Cisco IPS
         - 데이터를 Indexer 에 저장하기 전에 Parsing 함
             - 줄 삭제 및 합치기
             - Timestamp 추출
         - Data Lake 와 같은 Splunk 가 아닌 다른 목적지에도 데이터를 보낼 수 있음

## 데이터 구조
 - Index
     - Splunk 내 가장 큰 데이터 저장단위
     - RDBMS 의 Database 급
 - Source
     - Index 내 카테고리 의미
     - PostgreSQL 의 Schema 급
 - Sourcetype
     - RDBMS 의 Table 급
 - Bucket
     - Indexer 내 Index 들을 저장하는 장소
     - 로그의 종류 및 보관 기간 등 각각의 요건에 맞는 저장 정책 제공
         - 수집시기에 따라 고속/대용량 스토리지에 저장
