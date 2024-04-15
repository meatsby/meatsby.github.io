---
title: Using Fields
date: 2024-03-25 21:27:57 +0800
status: In Progress
draft: false
tags:
  - APM
  - Splunk
---
## Introduction
---
- Use fields to fitler data to return the results needed
- Will learn how to use fields in SPL as well as the Splunk UI
- Fields are extracted from data at index vs search time
- The difference in persistent and temporary fields
- How to do more with data through the use of knowledge objects

## Using the Fields Sidebar
---
- The fields sidebar shows all the fields that are extracted at search time
- Fields are broken down into:
    - Selected Fields
        - Default fields: `host`, `source`, and `sourcetype`
    - Interesting Fields
        - Fields that have values in at least 20% of the events
        - `a` denotes a string value
        - `#` denotes a numeral

## Using Fields in Search
---
- Field names are case-sensitive, while values are not
- Field Operators
    - `=`, `!=` can be used with fields of numerical or string values
    - `>`, `>=`, `<`, `<=` can be used for fields with numerical values
- For fields containing an IP address, wildcards(`*`) are subnet and CIDR aware
- `status!=200` and `NOT status=200` are different
    - `status!=200` only returns events where the status field is not 200
    - `NOT status=200` returns all events that don't have a field where status = 200
        - Meaning that if an event doesn't have a status field at all, it will be included
- `(status=500 OR status=503 OR status=505)` is same as `status IN ("500", "503", "505")`
- `| fields` command can be used to include or exclude fields from search
    - we can make search more efficient by filtering as early as possible
    - `| +fields`: include (default)
    - `| -fields`: exclude
- `| rename` command can be used to rename fields in search
    - `| rename status as "HTTP Status", count as "Number of Events"`

## Fields in Search Results
---
- Some fields are extracted at `index time`, while others are extracted at `search time`
- When Splunk ingests data into the index, a select number of fields are automatically extracted
    - Including metadata fields such as `host`, `source`, and `sourcetype`
    - and internal fields such as `_time` and `_raw`
- At search time, field discovery extracts additional fields from raw event data
    - Splunk will automatically extract fields from your data based on its assigned sourcetype, as well as key, value pairs found in the data
    - These fields are persistent, and will be extracted every time a search is run containing the same search terms
- Temporary Fields
    - can also be created on an ad-hoc basis using commands such as `eval`
    - `| eval` command is used to calculate and manipulate field values
        - results of eval commands can be written to a new temporary field at search time, or replace an existing field's values
- Field Extraction
    - can be used to extract fields from data that were not automatically extracted for its assigned sourcetype
    - `| erex`, `| rex` to extract fields that were not extracted at search time
        - `| erex` is a lot like automatic field extraction in the field extractor
            - Easier to use but need to provide samples to generate regex
        - `| rex` can be used on field values or raw data

## Enriching Data with Knowledge Objects
---
- Calculated Fields
    - `| eval bandwidth = Bytes/1024/1024` to create temporary field at search time
        - will introduce bandwidth field but need to be typed every time
    - Store this command in a calculated field, will automatically create a field at search time every time a search containing Bytes field is run
        - Calculated fields can only reference fields that are already present in the events by a search
- Field Aliases
    - allow to assign alternate names to fields in data
- Lookups
    - allow to add other fields and values to events that are not part of the indexed data
    - these field value pairs can be configured to automatically append to events in search
- Field Extractions -> Field Aliases -> Calculated Fields -> Lookups -> Event Types -> Tags
    - Field Aliases cannot reference a value from a Lookups

## References
---
- [Splunk - Free Training](https://www.splunk.com/en_us/training/free-courses/overview.html)
