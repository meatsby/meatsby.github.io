---
title: Splunk API
date: 2024-03-27 23:39:42 +0800
status: In Progress
draft: false
tags:
  - APM
  - Splunk
---
## Using Splunk REST API
---
```python
import urllib
import lxml.html
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

baseurl = 'https://localhost:8089'
username = 'admin'
password = '1'

url = baseurl + '/services/auth/login'
data = urllib.parse.urlencode({'username': username, 'password': password})

with requests.post(url, data=data, verify=False) as req:
    sessionkey = lxml.html.fromstring(req.content)[0].text
print("sessionkey {}".format(sessionkey))

searchquery = 'index="_internal" | head 10'
if not searchquery.startswith('search'):
    searchquery = 'search ' + searchquery

searchjoburl = baseurl + '/services/search/jobs'
with requests.post(searchjoburl, verify=False, 
              data=urllib.parse.urlencode({'search': searchquery}),
              headers={'Authorization': 'Splunk {}'.format(sessionkey)}) as req:
    sid = lxml.html.fromstring(req.content)[0].text
print("sid {}".format(sid))

servicessearchstatusstr = '/services/search/jobs/%s/' % sid

isnotdone = True
while isnotdone:
    with requests.post(baseurl + servicessearchstatusstr, 
                             headers={'Authorization': 'Splunk {}'.format(sessionkey)}, verify=False) as searchstatus:
            
        isDone=lxml.html.fromstring(searchstatus.content)
        
        isdonestatus=isDone.cssselect('key[name=isDone]')[0].text
        if(isdonestatus == '1'):
            isnotdone = False
print ("search status : {}".format(isdonestatus))

services_search_results_str = "/services/search/jobs/{}/results?output_mode=json&count=0".format(sid)
print(services_search_results_str)

with requests.get(baseurl + services_search_results_str, 
                 headers={'Authorization': 'Splunk {}'.format(sessionkey)}, verify=False) as searchresults:
    print(searchresults.content)
            
print ("====>search result:  [%s]  <====" % searchresults.content)
```

## Using Splunk Enterprise SDK for Python
---
### Using search
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

### Using export
```python
import splunklib.client as client
import splunklib.results as results

# Splunk 인스턴스에 연결
service = client.connect(
    host='YOUR_SPLUNK_HOST',
    port='YOUR_SPLUNK_PORT',
    username='YOUR_USERNAME',
    password='YOUR_PASSWORD')

# Run an export search and display the results using the results reader.
searchquery_export = "search index=_internal"
kwargs_export = {"earliest_time": "-1h",
                 "latest_time": "now",
                 "search_mode": "normal",
                 "output_mode": "json"}

exportsearch_results = service.jobs.export(searchquery_export, **kwargs_export)

# Get the results and display them using the JSONResultsReader
reader = results.JSONResultsReader(exportsearch_results)
for result in reader:
    if isinstance(result, dict):
        print "Result: %s" % result
    elif isinstance(result, results.Message):
        # Diagnostic messages may be returned in the results
        print "Message: %s" % result

# Print whether results are a preview from a running search
print "is_preview = %s " % reader.is_preview
```
- Exported events are somehow limited to 480K ~ 570K

```python
from datetime import datetime, timedelta
from pandas import date_range
import splunklib.client as client
import splunklib.results as results
import json
import time

# Splunk 인스턴스에 연결
service = client.connect(
    host='YOUR_SPLUNK_HOST',
    port='YOUR_SPLUNK_PORT',
    username='YOUR_USERNAME',
    password='YOUR_PASSWORD')

# Run an export search and display the results using the results reader.
search_query = "search index=_internal"

for date in date_range('2023-11-10', '2024-02-15'):
	end_time = date + timedelta(days=1)
	with gzip.open('logs.json.gz', 'wb') as gzip_file:
		while earliest_time < end_time:
			latest_time = earliest_time + timedelta(minutes=15)
			kwargs_export = {"earliest_time": earliest_time.strftime('%Y-%m-%dT%H:%M:%S.000+00:00'),
			                 "latest_time": latest_time.strftime('%Y-%m-%dT%H:%M:%S.000+00:00'),
			                 "search_mode": "normal",
			                 "output_mode": "json"}
		
			job = service.jobs.export(search_query, **kwargs_export)
			for result in results.JSONResultsReader(job):
				if isinstance(result, dict):
					f.write(json.dumps(result) + '\n')
			earliest_time = latest_time
```
- Windowing the search query can be a workaround

## References
---
- [Splunk Blog - Splunk REST API is EASY to use](https://www.splunk.com/en_us/blog/tips-and-tricks/splunk-rest-api-is-easy-to-use.html)
- [Splunk Docs - Run searches and jobs](https://dev.splunk.com/enterprise/docs/devtools/python/sdk-python/howtousesplunkpython/howtorunsearchespython/)
- [Splunk Community - Search returns only 50000 events in Python script?](https://community.splunk.com/t5/Splunk-Dev/Search-returns-only-50000-events-in-Python-script/m-p/398156)
- [GitHub - splunk-sdk-python](https://github.com/splunk/splunk-sdk-python/tree/master)
