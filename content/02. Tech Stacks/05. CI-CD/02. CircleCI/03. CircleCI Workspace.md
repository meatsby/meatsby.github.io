---
title: "CircleCI Workspace"
date: 2024-05-31 20:07:58 +0800
status: In Progress
draft: false
tags:
  - CircleCI
---
## CircleCI Workspace
---
```yml
version: 2.1

executors:
  my-executor:
    docker:
      - image: buildpack-deps:jessie
    working_directory: /tmp

jobs:
  flow:
    executor: my-executor
    steps:
      - run: mkdir -p workspace
      - run: echo "Hello, world!" > workspace/echo-output

      - persist_to_workspace:
          root: workspace
          paths:
            - echo-output

  downstream:
    executor: my-executor
    steps:
      - attach_workspace:
          at: /tmp/workspace

      - run: |
          if [[ `cat /tmp/workspace/echo-output` == "Hello, world!" ]]; then
            echo "It worked!";
          else
            echo "Nope!"; exit 1
          fi

workflows:
  btd:
    jobs:
      - flow
      - downstream:
          requires:
            - flow
```
- [`persist_to_workspace`](https://circleci.com/docs/configuration-reference/#persisttoworkspace) 를 통해 Job 에서 생성된 파일 저장 가능
	- `root` 는 절대 경로 또는 `working_directory` 에 대한 상대 경로
- `attach_workspace` 는 절대 경로로 지정해줘야 함

## References
---
- [CircleCI Docs - Using Workspaces to Share Data between Jobs](https://circleci.com/docs/workspaces/)
