# 34~36. wait(), notify()

## wait(), notify()

---

- 동기화의 효율을 높이기 위해 wait(), notify()를 사용
- Object 클래스에 정의되어 있으며, 동기화 블록 내에서만 사용 가능
    - `wait()` - 객체의 lock을 풀고 쓰레드를 해당 객체의 waiting pool에 넣음
    - `notify()` - wating pool에서 대기중인 쓰레드 중 하나를 깨움
    - `notifyAll()` - wating pool에서 대기중인 모든 쓰레드를 깨움