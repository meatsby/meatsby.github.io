

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
view rawcombination_single_list.py hosted with ❤ by GitHub
```