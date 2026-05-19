---
title: "Python"
date: 2024-08-16 18:17:41 +0800
status: To Do
draft: false
tags:
  - Python
---
## Python
---
```python
# List Comprehension
arr = [i for i in range(20) if i % 2 == 1]
arr.append()  # O(1)
arr.sort(reverse=True)    # O(NlogN)
arr.reverse() # O(N)
arr.insert()  # O(N)
arr.count()   # O(N)
arr.remove()  # O(N)

# Set
s = {1, 2, 3}
a | b # 합
a & b # 교
a - b # 차
s.add(4)
s.update([5,6])
s.remove(3)

# IO
import sys
input = sys.stdin.readline

# Lambda
sorteD(arr, key=lambda x: x[1]);
```

```python
items = ['1', '2', '3', '4', '5']
from itertools import permutations
list(permutations(items, 2))
# [('1', '2'), ('1', '3'), ('1', '4'), ('1', '5'), ('2', '1'), ('2', '3'), ('2', '4'), ('2', '5'), ('3', '1'), ('3', '2'), ('3', '4'), ('3', '5'), ('4', '1'), ('4', '2'), ('4', '3'), ('4', '5'), ('5', '1'), ('5', '2'), ('5', '3'), ('5', '4')]

from itertools import combinations
list(combinations(items, 2))
# [('1', '2'), ('1', '3'), ('1', '4'), ('1', '5'), ('2', '3'), ('2', '4'), ('2', '5'), ('3', '4'), ('3', '5'), ('4', '5')]
```
- 하나의 리스트에서 모든 조합

```python
from itertools import product
items = [['a', 'b', 'c,'], ['1', '2', '3', '4'], ['!', '@', '#']]
list(product(*items))
# [('a', '1', '!'), ('a', '1', '@'), ('a', '1', '#'), ('a', '2', '!'), ('a', '2', '@'), ('a', '2', '#'), ('a', '3', '!'), ('a', '3', '@'), ('a', '3', '#'), ('a', '4', '!'), ('a', '4', '@'), ('a', '4', '#'), ('b', '1', '!'), ('b', '1', '@'), ('b', '1', '#'), ('b', '2', '!'), ('b', '2', '@'), ('b', '2', '#'), ('b', '3', '!'), ('b', '3', '@'), ('b', '3', '#'), ('b', '4', '!'), ('b', '4', '@'), ('b', '4', '#'), ('c,', '1', '!'), ('c,', '1', '@'), ('c,', '1', '#'), ('c,', '2', '!'), ('c,', '2', '@'), ('c,', '2', '#'), ('c,', '3', '!'), ('c,', '3', '@'), ('c,', '3', '#'), ('c,', '4', '!'), ('c,', '4', '@'), ('c,', '4', '#')]
```
- 2개 이상 리스트 모든 조합

## Tips
---
```python
def serialize_number(number: str) -> Union[float, int]:
	if '.' in number:
		return float(number)
	return int(number)

setattr(TypeDeserializer, '_deserialize_n', lambda _, number: serialize_number(number))
```
- Convert Integer type DynamoDB data into int or float type when retrieving.

```python
def to_dict(self) -> dict:
	return asdict(self, dict_factory=lambda x: {k: v for (k, v) in x if v is not None})
```
- Recursively convert objects into a dictionary if the field is not None.

```python
d = {k: v[k] for v in d.values() for k in v}
```
- Creates a new dictionary with values only excluding keys

## ConfigParser
---
```cfg
[System]
env=dev
#env=stg
#env=prod
```

```python
import configparser

properties = configparser.ConfigParser()
properties.read('config.cfg')

print(properties["System"]["env"]) # dev
```
