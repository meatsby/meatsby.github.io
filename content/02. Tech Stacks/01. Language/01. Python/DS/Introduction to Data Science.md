---
title: Introduction to Data Science
date: 2025-08-13 22:06:21 +0800
status: In Progress
draft: false
tags:
  - Python
  - NumPy
  - Pandas
---
## NumPy
---
### Array 생성
```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([[1,2,3],[4,5,6]])
c = np.array([2.2, 5, 1.1])
d = np.zeros((2,3))
e = np.ones((2,3))
np.random.rand(2,3)
f = np.arange(10, 50, 2)
```

### Array 연산
```python
import numpy as np

a = np.array([10,20,30,40])
b = np.array([1, 2, 3,4])
c = a-b
print(c)
d = a*b
print(d)

farenheit = np.array([0,-10,-5,-15,0])
celcius = (farenheit - 31) * (5/9)
```

## Pandas
---
### Series 자료구조
```python
import pandas as pd

pd.Series(['Alice', 'Jack', 'Molly'])
pd.Series([1, 2, 3])
pd.Series(['Alice', 'Jack', None])
pd.Series([1, 2, None])

students_scores = {'Alice': 'Physics',
                   'Jack': 'Chemistry',
                   'Molly': 'English'}
s = pd.Series(students_scores)
s = pd.Series(['Physics', 'Chemistry', 'English'], index=['Alice', 'Jack', 'Molly'])

# iloc 은 Index 순서를 기준
s.iloc[3]
s[3]

# loc 은 지정된 Index 를 기준
s.loc['Molly']

class_code = {99: 'Physics',
              100: 'Chemistry',
              101: 'English',
              102: 'History'}
s = pd.Series(class_code)

# 숫자를 Index 로 지정할 경우 iloc 은 에러
s[0]

# NumPy 는 내부적으로 병렬처리가 구현되어있기 때문에 단순한 iteration 보다 훨씬 빠른 성능을 가진다
s = pd.Series(np.random.randint(0,1000,1000))
np.sum(s)
s+=2
```

### DataFrame 자료구조
```python
import pandas as pd

# Python Dictionary 로 생성
pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})

# NumPy 2차원 배열로 생성
pd.DataFrame(np.array([[1, 2], [3, 4]]))

# Pandas Series 로 생성
pd.DataFrame({'A': pd.Series([1, 2, 3])})

# Group by
df.groupby("cancellation_policy").agg({"review_scores_value":(np.nanmean,np.nanstd), "reviews_per_month":np.nanmean})

# Scales
df=pd.DataFrame(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D'], index=['excellent', 'excellent', 'excellent', 'good', 'good', 'good', 'ok', 'ok', 'ok', 'poor', 'poor'], columns=["Grades"])
my_categories=pd.CategoricalDtype(categories=['D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'], ordered=True)
grades=df["Grades"].astype(my_categories)
grades[grades>"C"]
```

## References
---
- [Coursera - Applied Data Science with Python Specialization](https://www.coursera.org/specializations/data-science-python)
