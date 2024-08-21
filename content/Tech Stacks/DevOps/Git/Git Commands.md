---
title: Git Commands
date: 2022-11-10 12:10:00 +0900
status: In Progress
tags:
  - Git
---

### Fork 딴 Repo 브랜치 Clone

```
git clone -b {본인_아이디} --single-branch https://github.com/{본인_아이디}/{저장소 아이디}
ex) git clone -b javajigi --single-branch https://github.com/javajigi/java-baseball.git
```

### Branch 생성

```
git checkout -b 브랜치이름
ex) git checkout -b step1
```

### Push

```
git push origin 브랜치이름
ex) git push origin step1
```

### Branch 삭제

```
git checkout 본인_아이디
git branch -D 삭제할_브랜치이름
ex) git checkout javajigi
ex) git branch -D step1
```

### Fork Repo 를 동기화하기 위한 Origin Repo 추가 (최초 한 번)

```
git remote add {저장소_별칭} base_저장소_url
ex) git remote add upstream https://github.com/woowacourse/java-racingcar.git
// 위와 같이 woowacourse 저장소를 추가한 후 전체 remote 저장소 목록을 본다.
git remote -v
```

### Remote Repo 브랜치 갱신하기

```
git fetch upstream {본인_아이디}
ex) git fetch upstream javajigi
```

### Local 브랜치와 동기화하기

```
git rebase upstream/본인_아이디
ex) git rebase upstream/javajigi
```
