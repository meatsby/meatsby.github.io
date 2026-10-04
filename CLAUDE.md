# CLAUDE.md

이 레포는 블로그 `meatsby.github.io` 의 **Quartz v5 사이트 셸**이다. 노트는 private 레포 `meatsby/vault` 에 있고 `content/` 서브모듈로 연결된다. 노트 작성 규칙은 vault 의 `CLAUDE.md` 를 따른다.

## 1. 구조

- `content/` = vault 서브모듈(`.gitmodules`, branch `v5`). 노트 수정과 커밋은 `content/` 안에서 vault 레포에 한다. 이 레포에서는 노트를 커밋하지 않는다.
- `quartz.config.yaml` = 사이트 설정. `ignorePatterns`, `remove-draft` 같은 빌드 규칙이 여기 있다.
- Quartz 업데이트는 업스트림 `jackyzha0/quartz` 를 머지하는 방식이다(`npx quartz update`).

## 2. 빌드와 배포

`.github/workflows/deploy.yml` 이 빌드와 배포를 맡는다.

- 트리거: 이 레포 `v5` push, vault push 가 보내는 `repository_dispatch`(`vault-updated`), 수동 `workflow_dispatch`.
- 빌드 시 서브모듈 포인터가 아니라 vault `v5` 최신 커밋으로 갱신해 빌드한다. vault 를 푸시할 때마다 이 레포의 포인터를 올릴 필요가 없다.
- 시크릿 `PRIVATE_READ_TOKEN` = vault 와 `meatsby/project-mirror` 를 읽는 fine-grained PAT(Contents: Read). 만료되면 배포가 깨진다.
- ask 위젯: 빌드 때 project-mirror 의 `web/ask.md`, `web/ask.js` 를 `content/ask.md`, `quartz/static/ask.js` 로 복사한다. 이 두 경로를 어떤 `.gitignore` 에도 넣지 않는다. Quartz 가 gitignore 된 파일을 빌드에서 빼기 때문이다.
- 배포는 `github-pages` 환경의 브랜치 허용 목록(`v5`)을 거친다. 배포가 안 되면 이 설정부터 확인한다.

## 3. 작업 원칙

- 커밋·푸시는 사용자가 명시적으로 요청할 때만 한다. `v5` 푸시는 곧 배포다.
