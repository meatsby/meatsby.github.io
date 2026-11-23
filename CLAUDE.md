# CLAUDE.md

이 레포는 블로그 `meatsby.github.io` 의 **Quartz v5 사이트 셸**이다. 노트는 private 레포 `meatsby/vault` 에 있고 빌드 때 `content/` 로 받아 온다(서브모듈 아님). 노트 작성 규칙은 vault 의 `CLAUDE.md` 를 따른다.

## 1. 구조

- `content/` = vault. 이 레포에서는 gitignore 다. CI 는 `actions/checkout` 으로 vault `main` 을 `content/` 에 받고, 로컬 미리보기는 `content` → `~/repos/vault` 심볼릭 링크(`ln -s ~/repos/vault content`)를 쓴다. 노트 수정과 커밋은 `~/repos/vault` 에서 한다.
- `content/` 는 반드시 자기 `.git` 을 가진 저장소여야 한다. Quartz 는 gitignore 된 파일을 빌드에서 빼는데(globby `gitignore: true`), `content/` 가 따로 된 git 저장소면 그 안에서는 vault 자신의 `.gitignore` 만 적용된다. 날짜 플러그인도 `content/` 에서 vault 저장소를 찾아 git 날짜를 읽는다.
- `quartz.config.yaml` = 사이트 설정. `ignorePatterns`, `remove-draft` 같은 빌드 규칙이 여기 있다.
- Quartz 업데이트는 업스트림 `jackyzha0/quartz` 를 머지하는 방식이다(`npx quartz update`).

## 2. 빌드와 배포

`.github/workflows/deploy.yml` 이 빌드와 배포를 맡는다.

- 트리거: 이 레포 `v5` push, vault push 가 보내는 `repository_dispatch`(`vault-updated`), 수동 `workflow_dispatch`.
- 빌드 시 vault `main` 최신 커밋을 `fetch-depth: 0`(git 날짜용)으로 받아 빌드한다.
- 시크릿 `PRIVATE_READ_TOKEN` = vault 와 `meatsby/project-mirror` 를 읽는 fine-grained PAT(Contents: Read). 만료되면 배포가 깨진다.
- ask 위젯: 빌드 때 project-mirror 의 `web/ask.md`, `web/ask.js` 를 `content/ask.md`, `quartz/static/ask.js` 로 복사한다. 이 두 경로를 어떤 `.gitignore` 에도 넣지 않는다. Quartz 가 gitignore 된 파일을 빌드에서 빼기 때문이다.
- 배포는 `github-pages` 환경의 브랜치 허용 목록(`v5`)을 거친다. 배포가 안 되면 이 설정부터 확인한다.

## 3. 작업 원칙

- 커밋·푸시는 사용자가 명시적으로 요청할 때만 한다. `v5` 푸시는 곧 배포다.
