---
title: Ask
draft: false
unlisted: true
---

<div id="askw" class="askw" data-proxy="https://done-defined-namely-capture.trycloudflare.com">
  <div class="askw-login">
    <p class="askw-login-title">로그인</p>
    <input class="askw-pw" type="password" placeholder="비밀번호" autocomplete="current-password" />
    <button class="askw-login-btn" type="button">로그인</button>
    <p class="askw-login-error"></p>
  </div>

  <div class="askw-thread" hidden></div>

  <form class="askw-composer" hidden>
    <div class="askw-attachments"></div>
    <div class="askw-input" data-placeholder="메시지 입력 — Enter 전송, Shift+Enter 줄바꿈, ``` 코드블록, - 불릿, 이미지 붙여넣기·드래그"></div>
    <div class="askw-toolbar">
      <button class="askw-chip" type="button" data-menu="model">opus <span class="askw-caret">▾</span></button>
      <button class="askw-chip" type="button" data-menu="effort">effort: high <span class="askw-caret">▾</span></button>
      <button class="askw-chip" type="button" data-menu="session">새 대화 <span class="askw-caret">▾</span></button>
      <button class="askw-chip askw-gear" type="button" data-menu="settings" title="설정" aria-label="설정">⚙</button>
      <span class="askw-context"></span>
      <span class="askw-spacer"></span>
      <button class="askw-send" type="submit">전송</button>
    </div>
  </form>
</div>

<style>
.askw {
  --askw-radius: 10px;
  margin: 1.5rem 0 2rem;
  font-family: var(--bodyFont);
}
.askw *,
.askw *::before,
.askw *::after { box-sizing: border-box; }
/* hidden 속성이 아래 display 규칙을 항상 이기도록 한다 */
.askw [hidden] { display: none !important; }

/* 로그인 */
.askw-login {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--lightgray);
  border-radius: var(--askw-radius);
  background: var(--light);
}
.askw-login-title { flex-basis: 100%; margin: 0 0 0.25rem; font-weight: 700; }
.askw-pw {
  flex: 1 1 12rem;
  min-width: 0;
  padding: 0.5rem 0.7rem;
  font: inherit;
  color: var(--dark);
  background: var(--light);
  border: 1px solid var(--gray);
  border-radius: 6px;
}
.askw-login-btn,
.askw-send {
  padding: 0.5rem 1rem;
  font: inherit;
  font-weight: 700;
  color: var(--light);
  background: var(--secondary);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.askw-login-btn:hover,
.askw-send:hover { filter: brightness(1.08); }
.askw-send:disabled { opacity: 0.5; cursor: default; }
.askw-login-error { flex-basis: 100%; margin: 0; color: #c0392b; font-size: 0.85em; min-height: 1em; }

/* 대화 스레드 — 블로그 포스트처럼 자연스러운 문서 흐름 */
.askw-thread { display: block; }
.askw-msg { max-width: 100%; }
/* 사용자 질문 = H2 제목(블로그 본문 typography 상속) + 구분선.
   한 줄을 넘기면 …로 자른다(클릭 불가). 전체 질문은 아래 접이식 콜아웃에서 본다 */
.askw-q {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.askw-sep { margin: 0.6rem 0 1.25rem; }
/* 잘린 질문 아래의 전체 질문 콜아웃 — Quartz 콜아웃 스타일을 그대로 상속 */
.askw-qcallout { margin: 0 0 1.25rem; }
/* 접혔을 때 ⓘ 아이콘과 "전체 질문" 텍스트 수직 중앙 정렬(기본 flex-start는 어긋난다) */
.askw-qcallout .callout-title { align-items: center; }
/* 펼친 전체 질문 본문 여백 정리 */
.askw-qcallout-body > :first-child { margin-top: 0; }
.askw-qcallout-body > :last-child { margin-bottom: 1rem; }
/* 어시스턴트 답변은 제목 아래로 이어지고, 턴 사이는 여백으로 구분한다 */
.askw-msg.assistant { margin-bottom: 1.5rem; }
.askw-msg.assistant > :first-child { margin-top: 0; }
.askw-msg.assistant > :last-child { margin-bottom: 0; }
.askw-msg.error {
  color: #c0392b;
  font-size: 0.9em;
  margin-bottom: 1.5rem;
}
.askw-msg .askw-thumb {
  max-width: 220px;
  max-height: 220px;
  border-radius: 8px;
  margin-bottom: 0.4rem;
  display: block;
}
.askw-typing { color: var(--gray); }
.askw-loading { color: var(--gray); padding: 1rem 0; }

/* 컴포저 */
/* 입력창은 떠 있지 않고 본문(대화)의 맨 끝에 자연스럽게 배치된다 */
.askw-composer {
  margin-top: 1.5rem;
  padding: 0.6rem;
  border: 1px solid var(--lightgray);
  border-radius: var(--askw-radius);
  background: var(--light);
}
.askw-composer.dragover { border-color: var(--secondary); border-style: dashed; }
.askw-attachments { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.askw-attachments:not(:empty) { margin-bottom: 0.5rem; }
.askw-chip-img { position: relative; }
.askw-chip-img img { width: 52px; height: 52px; object-fit: cover; border-radius: 6px; display: block; }
.askw-chip-img button {
  position: absolute; top: -6px; right: -6px;
  width: 18px; height: 18px; line-height: 16px;
  padding: 0; font-size: 11px;
  color: var(--light); background: var(--darkgray);
  border: none; border-radius: 50%; cursor: pointer;
}
/* WYSIWYG 입력 에디터 (TipTap/ProseMirror) — 타이핑하면 그 자리에서 렌더된다 */
.askw-input { font: inherit; }
.askw-input .ProseMirror {
  outline: none;
  min-height: 1.6em;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.4rem 0.2rem;
  color: var(--dark);
  line-height: 1.6;
  word-break: break-word;
}
.askw-input .ProseMirror > :first-child { margin-top: 0; }
.askw-input .ProseMirror > :last-child { margin-bottom: 0; }
.askw-input .ProseMirror p { margin: 0.35em 0; }
.askw-input .ProseMirror ul,
.askw-input .ProseMirror ol { margin: 0.35em 0; padding-left: 1.4em; }
.askw-input .ProseMirror li { margin: 0.1em 0; }
.askw-input .ProseMirror blockquote {
  margin: 0.35em 0;
  padding-left: 0.8em;
  border-left: 3px solid var(--lightgray);
  color: var(--darkgray);
}
.askw-input .ProseMirror pre {
  margin: 0.4em 0;
  padding: 0.6rem 0.8rem;
  background: var(--highlight);
  border-radius: 6px;
  font-family: var(--codeFont);
  font-size: 0.9em;
  white-space: pre;
  overflow-x: auto;
}
.askw-input .ProseMirror pre code { background: none; padding: 0; font-family: inherit; }
.askw-input .ProseMirror code {
  font-family: var(--codeFont);
  font-size: 0.9em;
  background: var(--highlight);
  padding: 0.1em 0.3em;
  border-radius: 4px;
}
/* placeholder (extension-placeholder가 빈 첫 문단에 data-placeholder를 넣어준다) */
.askw-input .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: var(--gray);
  float: left;
  height: 0;
  pointer-events: none;
}
.askw-toolbar { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.35rem; flex-wrap: wrap; }
.askw-spacer { flex: 1 1 auto; }
.askw-context { color: var(--gray); font-size: 0.78em; }
.askw-chip {
  position: relative;
  padding: 0.3rem 0.6rem;
  font: inherit;
  font-size: 0.82em;
  color: var(--darkgray);
  background: transparent;
  border: 1px solid var(--lightgray);
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
}
.askw-chip:hover { border-color: var(--gray); }
.askw-caret { opacity: 0.6; }

/* 드롭다운 메뉴 */
.askw-menu {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  z-index: 20;
  min-width: 160px;
  max-height: 260px;
  overflow-y: auto;
  padding: 0.3rem;
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
.askw-menu button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0.4rem 0.5rem;
  font: inherit;
  font-size: 0.85em;
  text-align: left;
  color: var(--darkgray);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.askw-menu button:hover { background: var(--highlight); }
.askw-menu button.active { color: var(--secondary); font-weight: 700; }
.askw-menu .askw-del { flex: 0 0 auto; color: var(--gray); }
.askw-menu .askw-del:hover { color: #c0392b; }
.askw-menu-sep { height: 1px; margin: 0.3rem 0; background: var(--lightgray); }

/* Explorer 사이드바에 주입되는 "Ask" 세션 목록 (/ask 페이지 전용) */
.askw-nav-header { cursor: pointer; }
.askw-nav .folder-icon { transition: transform 0.15s ease; }
.askw-nav.collapsed .folder-icon { transform: rotate(-90deg); }
.askw-nav.collapsed .askw-nav-outer { display: none; }
.askw-nav-list { list-style: none; margin: 0; padding: 0.1rem 0 0.2rem 1.4rem; }
.askw-nav-list li { position: relative; }
.askw-nav-item {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  font: inherit;
  cursor: pointer;
  padding: 0.15rem 1.2rem 0.15rem 0.4rem;
  color: var(--darkgray);
  text-decoration: none;
  font-size: 0.85rem;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.askw-nav-item:hover { background: var(--highlight); }
.askw-nav-active { color: var(--secondary); font-weight: 700; }
.askw-nav-del {
  position: absolute;
  right: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: var(--gray);
  cursor: pointer;
  font-size: 0.7rem;
  line-height: 1;
  padding: 0.1rem 0.2rem;
  opacity: 0;
}
.askw-nav-list li:hover .askw-nav-del { opacity: 1; }
.askw-nav-del:hover { color: #c0392b; }

/* 우측 사이드바 Questions 패널 (/ask 전용, ToC 자리) — ToC와 동일하게 정렬 */
/* margin-top 없음: 우측 사이드바가 flex-gap으로 컴포넌트 간격을 준다(중복 방지) */
.askw-questions-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--dark);
}
.askw-questions-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--headerFont);
}
.askw-q-fold { flex: 0 0 auto; transition: transform 0.2s ease; }
.askw-questions.collapsed .askw-q-fold { transform: rotate(-90deg); }
.askw-questions.collapsed .askw-questions-content { display: none; }
.askw-questions-content { margin-top: 0.5rem; max-height: 40vh; overflow-y: auto; }
.askw-questions-content ul { list-style: none; margin: 0; padding: 0; }
.askw-q-nav {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.18rem 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  line-height: 1.3;
  color: var(--gray);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.askw-q-nav:hover { color: var(--secondary); }
.askw-q-nav-q { color: var(--darkgray); }
.askw-q-nav-a { padding-left: 1rem; }
</style>

<script src="/static/ask.js" defer></script>
