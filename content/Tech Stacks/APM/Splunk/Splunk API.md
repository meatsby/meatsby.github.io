---
title: Splunk API
date: 2024-03-27 23:39:42 +0800
status: In Progress
draft: true
tags:
  - APM
  - Splunk
---
## Splunk API
---
```python
import splunklib.client as client
import splunklib.results as results

# Splunk 인스턴스에 연결
service = client.connect(
    host='YOUR_SPLUNK_HOST',
    port='YOUR_SPLUNK_PORT',
    username='YOUR_USERNAME',
    password='YOUR_PASSWORD')

# Splunk에서 데이터 검색 실행
searchquery_normal = "search * | head 100"
job = service.jobs.create(searchquery_normal)

# 결과 가져오기
result_count = 50
offset = 0
results = []
while True:
    # 검색 결과 조각 가져오기
    kwargs_paginate = {'count': result_count, 'offset': offset}
    rs = results.ResultsReader(job.results(**kwargs_paginate))
    records = [record for record in rs]
    results.extend(records)
    if len(records) == 0:
        break
    offset += result_count

# 결과 출력
for result in results:
    print(result)

```
