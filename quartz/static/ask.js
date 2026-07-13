// Ask — 블로그에 임베드된 개인 AI 채팅 위젯.
// project-mirror 프록시(FastAPI)의 /api/login·/api/chat·/api/sessions 를 cross-origin
// 호출한다. 서버가 meatsby.github.io 오리진에 CORS를 허용하도록 설정돼 있다.
// 인라인 <script>는 Quartz markdown 파이프라인이 문자열 속 <pre> 등을 태그로
// 오해해 깨뜨리므로, 이 로직은 반드시 외부 static 파일로 둔다.
;(function () {
  const PROXY_DEFAULT = "https://gilog.me"
  const MODELS = ["opus", "sonnet", "haiku"]
  const EFFORTS = ["low", "medium", "high", "xhigh", "max"]
  const LS_CFG = "askw.config"

  // marked를 필요할 때 동적으로 로드한다. innerHTML로 삽입된 script 태그는 실행되지
  // 않으므로(Quartz SPA), 정적 태그 대신 JS에서 head에 주입한다.
  let markedPromise = null
  function ensureMarked() {
    if (window.marked) return Promise.resolve()
    if (markedPromise) return markedPromise
    markedPromise = new Promise((resolve) => {
      const s = document.createElement("script")
      s.src = "https://cdn.jsdelivr.net/npm/marked@12/marked.min.js"
      s.onload = () => resolve()
      s.onerror = () => resolve() // 실패 시 plain 텍스트 폴백
      document.head.appendChild(s)
    })
    return markedPromise
  }
  function renderMd(text) {
    if (window.marked) {
      try {
        return window.marked.parse(text, { breaks: true, gfm: true })
      } catch (e) {}
    }
    const div = document.createElement("div")
    div.textContent = text
    const pre = document.createElement("pre")
    pre.style.whiteSpace = "pre-wrap"
    pre.style.wordBreak = "break-word"
    pre.textContent = text
    return pre.outerHTML
  }

  function load(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback
    } catch {
      return fallback
    }
  }

  // --- 코드블록 문법 하이라이팅 (블로그 본문과 동일하게) ---
  // 블로그는 빌드 타임에 rehype-pretty-code(Shiki, github-light/dark)로 렌더한다.
  // 답변은 런타임 마크다운이라, 같은 Shiki로 동일 구조(figure>pre>code[data-line],
  // --shiki-light/--shiki-dark 토큰)를 만들어주면 Quartz 기존 CSS가 색·라인번호를 그대로 입힌다.
  const SVG_COPY =
    '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>'
  const SVG_CHECK =
    '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

  let shikiPromise = null
  function ensureShiki() {
    if (!shikiPromise) shikiPromise = import("https://esm.sh/shiki@1.24.0")
    return shikiPromise
  }
  // 엔진(WASM)+테마를 미리 로드해 첫 답변 하이라이팅 지연을 줄인다(로그인 시 호출).
  function warmShiki() {
    ensureShiki()
      .then((shiki) => shiki.codeToHtml("", { lang: "text", themes: { light: "github-light", dark: "github-dark" } }))
      .catch((e) => console.warn("[ask] Shiki 프리로드 실패:", e))
  }
  function makeCopyButton(source) {
    const btn = document.createElement("button")
    btn.className = "clipboard-button"
    btn.type = "button"
    btn.setAttribute("aria-label", "Copy source")
    btn.innerHTML = SVG_COPY
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(source).then(() => {
        btn.blur()
        btn.innerHTML = SVG_CHECK
        setTimeout(() => (btn.innerHTML = SVG_COPY), 2000)
      })
    })
    return btn
  }
  async function enhanceCodeBlocks(container) {
    const codes = [...container.querySelectorAll("pre > code")].filter(
      (c) => !c.closest("figure[data-rehype-pretty-code-figure]"), // 이미 처리된 건 건너뜀
    )
    if (!codes.length) return
    let shiki
    try {
      shiki = await ensureShiki()
    } catch (e) {
      console.warn("[ask] Shiki 로드 실패, plain 코드블록 유지:", e)
      return
    }
    for (const code of codes) {
      const pre = code.parentElement
      if (!pre) continue
      const cls = [...code.classList].find((c) => c.startsWith("language-"))
      const lang = cls ? cls.slice("language-".length) : "text"
      const raw = code.textContent.replace(/\n$/, "")
      const lineDigits = String(raw.split("\n").length).length
      const opts = {
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false,
        transformers: [
          {
            line(node) {
              node.properties["data-line"] = ""
            },
            code(node) {
              node.properties["data-theme"] = "github-light github-dark"
              if (lineDigits >= 2) node.properties["data-line-numbers-max-digits"] = String(lineDigits)
            },
          },
        ],
      }
      let html
      try {
        html = await shiki.codeToHtml(raw, { lang, ...opts })
      } catch {
        try {
          html = await shiki.codeToHtml(raw, { lang: "text", ...opts }) // 미지원 언어는 plaintext로
        } catch {
          continue
        }
      }
      const figure = document.createElement("figure")
      figure.setAttribute("data-rehype-pretty-code-figure", "")
      figure.innerHTML = html
      figure.querySelector("pre")?.prepend(makeCopyButton(raw))
      pre.replaceWith(figure)
    }
  }
  // 마크다운을 렌더해 넣고 코드블록을 하이라이팅한다.
  function renderInto(el, markdown) {
    el.innerHTML = renderMd(markdown)
    enhanceCodeBlocks(el)
  }

  // --- 사이드바(Explorer) 세션 목록 주입 (/ask 페이지에서만) ---
  // Ask 페이지는 unlisted라 일반 트리엔 안 뜬다. 대신 이 페이지에서만 Explorer 맨 아래
  // (03. Review 뒤)에 "Ask" 폴더를 JS로 붙이고 localStorage 세션을 나열한다(서버 불필요).
  let askApi = null // initAsk가 세션 API를 여기에 노출한다
  const FOLDER_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="5 8 14 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="folder-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>'

  function isAskPage() {
    return document.body?.dataset.slug === "ask"
  }
  function buildAskNav() {
    const li = document.createElement("li")
    li.className = "askw-nav"
    const header = document.createElement("div")
    header.className = "folder-container nav-folder-title tree-item-self askw-nav-header"
    header.innerHTML = FOLDER_ICON + '<div><button class="folder-button" type="button"><span class="folder-title">Ask</span></button></div>'
    const outer = document.createElement("div")
    outer.className = "askw-nav-outer"
    const list = document.createElement("ul")
    list.className = "askw-nav-list"
    outer.appendChild(list)
    li.append(header, outer)
    header.addEventListener("click", () => li.classList.toggle("collapsed"))
    return li
  }
  function refreshSidebar() {
    if (!isAskPage()) return
    const ul = document.querySelector(".explorer-ul")
    if (!ul) return
    const existing = ul.querySelector(".askw-nav")
    // 로그인 전에는 세션 목록을 감춘다(로그인 후에만 노출).
    if (!askApi || !askApi.loggedIn()) {
      if (existing) existing.remove()
      return
    }
    let folder = existing
    if (!folder) {
      folder = buildAskNav()
      ul.appendChild(folder) // 03. Review 뒤(맨 끝)
    }
    const list = folder.querySelector(".askw-nav-list")
    const sessions = askApi.listSessions()
    const currentId = askApi.currentId()
    list.innerHTML = ""
    const mkItem = (label, active, onClick, onDelete) => {
      // <a href>가 아니라 <button>을 쓴다: <a href="#">면 클릭 시 /ask#로 이동해
      // Quartz SPA가 페이지를 재렌더하고 위젯이 재초기화된다(세션 전환이 씹힘).
      const item = document.createElement("li")
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "askw-nav-item" + (active ? " askw-nav-active" : "")
      btn.textContent = label
      btn.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }
      item.appendChild(btn)
      if (onDelete) {
        const del = document.createElement("button")
        del.type = "button"
        del.className = "askw-nav-del"
        del.textContent = "✕"
        del.onclick = (e) => {
          e.stopPropagation()
          e.preventDefault()
          onDelete()
        }
        item.appendChild(del)
      }
      list.appendChild(item)
    }
    mkItem("+ 새 대화", false, () => {
      askApi?.newSession()
      refreshSidebar()
    })
    for (const s of sessions) {
      const id = s.session_id
      mkItem(
        s.title || "새 대화",
        id === currentId,
        () => askApi?.openSession(id),
        () => askApi?.deleteSession(id),
      )
    }
  }
  function mountSidebar() {
    refreshSidebar()
    refreshQuestions()
    // Explorer/우측 사이드바는 비동기로 다시 그리며 주입한 요소를 지울 수 있다.
    // keep-alive: /ask에서 사라졌으면 다시 붙인다(window에 저장해 중복 방지).
    if (!window.__askSidebarTimer) {
      window.__askSidebarTimer = setInterval(() => {
        if (!isAskPage() || !askApi?.loggedIn()) return
        if (document.querySelector(".explorer-ul") && !document.querySelector(".askw-nav")) refreshSidebar()
        if (document.querySelector(".right.sidebar") && !document.querySelector(".askw-questions") && askApi.getMessages().length) {
          refreshQuestions()
        }
      }, 700)
    }
  }

  // --- 우측 사이드바 Questions 패널 (/ask 전용, ToC 자리) ---
  // 현재 세션의 질문/답변을 목록으로 보여주고, 클릭하면 해당 메시지로 스크롤한다.
  function buildQuestionsPanel() {
    const panel = document.createElement("div")
    panel.className = "askw-questions"
    const header = document.createElement("button")
    header.type = "button"
    header.className = "askw-questions-header"
    header.innerHTML =
      "<h3>Questions</h3>" +
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="askw-q-fold"><polyline points="6 9 12 15 18 9"></polyline></svg>'
    const content = document.createElement("div")
    content.className = "askw-questions-content"
    content.appendChild(document.createElement("ul"))
    panel.append(header, content)
    header.addEventListener("click", () => panel.classList.toggle("collapsed"))
    return panel
  }
  function scrollToMsg(idx) {
    const el = document.querySelector('.askw-thread [data-idx="' + idx + '"]')
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  function refreshQuestions() {
    if (!isAskPage()) return
    const right = document.querySelector(".right.sidebar")
    const msgs = askApi && askApi.loggedIn() ? askApi.getMessages() : []
    let panel = right ? right.querySelector(".askw-questions") : null
    if (!right || !msgs.length) {
      if (panel) panel.remove()
      return
    }
    if (!panel) {
      panel = buildQuestionsPanel()
      right.appendChild(panel) // graph 뒤(ToC가 있던 자리)
    }
    const ul = panel.querySelector(".askw-questions-content ul")
    ul.innerHTML = ""
    msgs.forEach((m, i) => {
      const raw = Array.isArray(m.content)
        ? m.content.find((p) => p.type === "text")?.text || "이미지"
        : String(m.content)
      const preview = raw
        .replace(/```[\s\S]*?```/g, " 〔코드〕 ")
        .replace(/[#*`_>~[\]]/g, "")
        .replace(/\s+/g, " ")
        .trim()
      const li = document.createElement("li")
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "askw-q-nav " + (m.role === "user" ? "askw-q-nav-q" : "askw-q-nav-a")
      btn.textContent = preview || (m.role === "user" ? "(질문)" : "(답변)")
      btn.title = preview
      btn.onclick = () => scrollToMsg(i)
      li.appendChild(btn)
      ul.appendChild(li)
    })
  }

  // Quartz 네이티브 접이식 콜아웃을 런타임에 재현한다.
  // ([!info]- 마크다운 문법은 빌드 타임 전용이라 런타임 생성 콘텐츠엔 못 쓴다.
  //  Quartz 콜아웃 CSS가 클래스 기반으로 적용되므로 구조만 맞추고 토글만 직접 단다.)
  function buildCallout(text) {
    const bq = document.createElement("blockquote")
    // is-collapsible 은 일부러 뺀다: 붙이면 Quartz 전역 콜아웃 스크립트가 nav 때
    // 자체 클릭 핸들러를 또 달아 아래 내 핸들러와 이중 토글돼 상쇄된다.
    bq.className = "callout is-collapsed askw-qcallout"
    bq.setAttribute("data-callout", "info")
    bq.setAttribute("data-callout-fold", "")
    const title = document.createElement("div")
    title.className = "callout-title"
    title.innerHTML =
      '<div class="callout-icon"></div>' +
      '<div class="callout-title-inner"><p>전체 질문</p></div>' +
      '<div class="fold-callout-icon callout-fold"></div>'
    const content = document.createElement("div")
    content.className = "callout-content"
    content.style.gridTemplateRows = "0fr" // 접힌 상태로 시작
    // 전체 질문을 markdown으로 렌더한다(줄바꿈·``` 코드블록 반영).
    // grid 접기가 깔끔하도록 렌더 결과는 단일 wrapper div 한 개에만 담는다.
    const inner = document.createElement("div")
    inner.className = "askw-qcallout-body"
    renderInto(inner, text)
    content.appendChild(inner)
    bq.append(title, content)
    title.addEventListener("click", () => {
      const collapsed = bq.classList.toggle("is-collapsed")
      content.style.gridTemplateRows = collapsed ? "0fr" : "1fr"
    })
    return bq
  }
  // 질문이 한 줄로 다 안 보일 때(가로로 잘렸거나 · 줄바꿈이 있거나 · ``` 코드블록이 있을 때)
  // 그 아래에 전체 질문을 markdown으로 담은 접이식 콜아웃을 둔다.
  function refreshQuestion(wrap) {
    const h = wrap.querySelector(".askw-q")
    if (!h) return
    const full = h.dataset.full ?? h.textContent
    const needsFull = h.scrollWidth > h.clientWidth + 1 || full.includes("\n") || full.includes("```")
    const callout = wrap.querySelector(".askw-qcallout")
    if (needsFull && !callout) {
      wrap.appendChild(buildCallout(full))
    } else if (!needsFull && callout) {
      callout.remove()
    }
  }

  // TipTap(ProseMirror) 에디터 + markdown 직렬화 + placeholder 를 CDN에서 한 번만 로드한다.
  // 입력창을 WYSIWYG로 만든다: ```→코드블록, - →불릿 등 markdown input rule이 내장돼 있고,
  // 전송 시 editor.storage.markdown.getMarkdown() 으로 markdown 문자열을 뽑아 API에 보낸다.
  const TT = "https://esm.sh/"
  let tiptapPromise = null
  function ensureTiptap() {
    if (tiptapPromise) return tiptapPromise
    tiptapPromise = (async () => {
      const [core, sk, md, ph, pmState] = await Promise.all([
        import(TT + "@tiptap/core@2.11.5"),
        import(TT + "@tiptap/starter-kit@2.11.5"),
        import(TT + "tiptap-markdown@0.8.10"),
        import(TT + "@tiptap/extension-placeholder@2.11.5"),
        import(TT + "@tiptap/pm@2.11.5/state"),
      ])
      return {
        Editor: core.Editor,
        Extension: core.Extension,
        StarterKit: sk.default ?? sk.StarterKit,
        Markdown: md.Markdown ?? md.default,
        Placeholder: ph.default ?? ph.Placeholder,
        Plugin: pmState.Plugin,
        PluginKey: pmState.PluginKey,
      }
    })()
    return tiptapPromise
  }

  function initAsk(root) {
    if (!root || root.dataset.inited === "1") return
    root.dataset.inited = "1"

    const PROXY = (root.dataset.proxy || PROXY_DEFAULT).replace(/\/$/, "")
    const $ = (sel) => root.querySelector(sel)
    const loginBox = $(".askw-login")
    const pwEl = $(".askw-pw")
    const loginBtn = $(".askw-login-btn")
    const loginErr = $(".askw-login-error")
    const threadEl = $(".askw-thread")
    const composer = $(".askw-composer")
    const editorHost = $(".askw-input")
    const sendEl = $(".askw-send")
    const attachEl = $(".askw-attachments")
    const contextEl = $(".askw-context")
    const chips = {
      model: root.querySelector('[data-menu="model"]'),
      effort: root.querySelector('[data-menu="effort"]'),
      session: root.querySelector('[data-menu="session"]'),
      settings: root.querySelector('[data-menu="settings"]'),
    }

    let cfg = load(LS_CFG, { jwt: "", jwtExp: 0, model: "opus", effort: "high" })
    let serverSessions = [] // GET /api/sessions 결과: [{session_id,title,updated_at,message_count}]
    let currentSid = null // 활성 대화의 서버 session_id (null=아직 전송 안 한 새 대화)
    let currentMessages = [] // 현재 대화의 메시지(서버에서 불러오거나 이번에 주고받은 것)
    let currentContext = null // {pct, used}
    let busy = false
    let pending = [] // data URL 이미지 목록
    let openMenu = null
    let editor = null // TipTap 에디터 인스턴스

    function save() {
      // 세션은 서버가 소스 오브 트루스. localStorage엔 설정(jwt/model/effort)만 저장.
      localStorage.setItem(LS_CFG, JSON.stringify(cfg))
    }
    function loggedIn() {
      return cfg.jwt && Date.now() < cfg.jwtExp
    }
    function authHeaders() {
      return { Authorization: `Bearer ${cfg.jwt}` }
    }

    // 서버 세션 목록을 불러와 사이드바·칩을 갱신한다.
    async function loadSessions() {
      if (!loggedIn()) return
      try {
        const resp = await fetch(PROXY + "/api/sessions", { headers: authHeaders() })
        if (resp.status === 401) return logout()
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()
        serverSessions = Array.isArray(data.sessions) ? data.sessions : []
      } catch (e) {
        console.warn("[ask] 세션 목록 로드 실패:", e)
      }
      renderChips()
      refreshSidebar()
    }
    // 서버에서 특정 대화를 불러와 스레드에 렌더한다.
    async function openSession(sid) {
      if (busy || !sid) return
      currentSid = sid
      currentContext = null
      threadEl.innerHTML = '<div class="askw-loading">불러오는 중…</div>'
      renderChips()
      refreshSidebar()
      try {
        const resp = await fetch(PROXY + "/api/sessions/" + encodeURIComponent(sid), { headers: authHeaders() })
        if (resp.status === 401) return logout()
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()
        currentSid = data.session_id ?? sid
        currentMessages = Array.isArray(data.messages) ? data.messages : []
        currentContext = data.context || null
        renderThread()
        scrollToBottom() // 하단으로 스크롤해 바로 입력 가능하게
        focusInput()
      } catch (e) {
        threadEl.innerHTML = ""
        appendMsg("error", "대화 불러오기 실패: " + e.message)
      }
      renderChips()
      refreshSidebar()
    }
    // 새 대화: 빈 상태로 시작(첫 전송의 응답 session_id를 채택).
    function newChat() {
      currentSid = null
      currentMessages = []
      currentContext = null
      renderThread()
      focusInput()
    }
    async function deleteSession(sid) {
      if (!sid || !confirm("이 대화를 삭제할까요?")) return
      try {
        const resp = await fetch(PROXY + "/api/sessions/" + encodeURIComponent(sid), { method: "DELETE", headers: authHeaders() })
        if (resp.status === 401) return logout()
        if (!resp.ok && resp.status !== 404) throw new Error(`HTTP ${resp.status}`)
      } catch (e) {
        appendMsg("error", "삭제 실패: " + e.message)
        return
      }
      if (currentSid === sid) newChat()
      loadSessions()
    }
    // 로그인 후: 목록 로드 → 최근 대화 열기(없으면 새 대화).
    async function initConversation() {
      await loadSessions()
      if (serverSessions.length) openSession(serverSessions[0].session_id)
      else newChat()
    }
    // 사이드바(Explorer 주입)가 쓰는 세션 API를 모듈 스코프로 노출한다.
    askApi = {
      loggedIn: () => loggedIn(),
      listSessions: () => serverSessions,
      getMessages: () => currentMessages,
      currentId: () => currentSid,
      openSession: (sid) => openSession(sid),
      newSession: () => newChat(),
      deleteSession: (sid) => deleteSession(sid),
    }

    // --- 화면 전환 ---
    function reflectAuth() {
      const on = loggedIn()
      loginBox.hidden = on
      threadEl.hidden = !on
      composer.hidden = !on
      if (on) {
        setupEditor().then(focusInput) // WYSIWYG 에디터를 이 시점에 로드
        warmShiki() // 코드 하이라이터 엔진을 미리 데운다
        initConversation() // 서버 세션 목록 로드 → 최근 대화 열기
      }
      refreshSidebar() // 로그인 시 세션 목록 노출 / 로그아웃 시 감춤
    }

    // --- 렌더링 ---
    function renderThread() {
      threadEl.innerHTML = ""
      currentMessages.forEach((m, i) => {
        const el = appendMsg(m.role, m.content)
        if (el) el.dataset.idx = i // Questions 패널에서 클릭 시 스크롤 타깃
      })
      renderContext(currentContext)
      renderChips()
      refreshQuestions()
    }
    function scrollToBottom() {
      // 세션에 들어오면 페이지 맨끝까지 내린다(입력창 위치가 아니라 문서 최하단).
      // Shiki 등 비동기 높이 변화를 감안해 몇 차례 재조정한다.
      const go = () => {
        const se = document.scrollingElement || document.documentElement
        se.scrollTop = se.scrollHeight
      }
      requestAnimationFrame(go)
      setTimeout(go, 200)
      setTimeout(go, 600)
    }
    function appendMsg(role, content) {
      // 사용자 질문은 블로그 포스트처럼 H2 제목 + 구분선(---)으로 렌더한다.
      if (role === "user") {
        const wrap = document.createElement("div")
        wrap.className = "askw-msg user"
        const text = Array.isArray(content)
          ? content.find((p) => p.type === "text")?.text || "이미지 질문"
          : content
        const h = document.createElement("h2")
        h.className = "askw-q"
        h.dataset.full = text
        h.textContent = text
        wrap.appendChild(h)
        if (Array.isArray(content)) {
          for (const p of content) {
            if (p.type === "image_url") {
              const img = document.createElement("img")
              img.className = "askw-thumb"
              img.src = p.image_url.url
              wrap.appendChild(img)
            }
          }
        }
        const hr = document.createElement("hr")
        hr.className = "askw-sep"
        wrap.appendChild(hr)
        threadEl.appendChild(wrap)
        refreshQuestion(wrap) // DOM에 붙은 뒤라야 잘림 여부(scrollWidth)를 잴 수 있다
        return wrap
      }
      // 어시스턴트 답변은 제목 아래로 이어지는 본문(markdown), error는 텍스트.
      const div = document.createElement("div")
      div.className = "askw-msg " + role
      if (role === "assistant") {
        renderInto(div, typeof content === "string" ? content : "")
      } else {
        div.textContent = content
      }
      threadEl.appendChild(div)
      return div
    }
    function renderContext(ctx) {
      contextEl.textContent = ctx ? `컨텍스트 ${ctx.pct}% (${ctx.used.toLocaleString()} tok)` : ""
    }
    function renderChips() {
      chips.model.firstChild.textContent = cfg.model + " "
      chips.effort.firstChild.textContent = "effort: " + cfg.effort + " "
      const cur = serverSessions.find((s) => s.session_id === currentSid)
      chips.session.firstChild.textContent = (cur?.title || "새 대화") + " "
    }
    function renderAttachments() {
      attachEl.innerHTML = ""
      pending.forEach((url, i) => {
        const chip = document.createElement("div")
        chip.className = "askw-chip-img"
        const img = document.createElement("img")
        img.src = url
        const x = document.createElement("button")
        x.type = "button"
        x.textContent = "✕"
        x.onclick = () => {
          pending.splice(i, 1)
          renderAttachments()
        }
        chip.append(img, x)
        attachEl.appendChild(chip)
      })
    }

    // --- 드롭다운 ---
    function closeMenu() {
      if (openMenu) {
        openMenu.remove()
        openMenu = null
      }
    }
    function toggleMenu(chip, items) {
      const wasThis = openMenu && openMenu.dataset.owner === chip.dataset.menu
      closeMenu()
      if (wasThis) return
      const menu = document.createElement("div")
      menu.className = "askw-menu"
      menu.dataset.owner = chip.dataset.menu
      for (const it of items) {
        if (it.sep) {
          const sep = document.createElement("div")
          sep.className = "askw-menu-sep"
          menu.appendChild(sep)
          continue
        }
        const b = document.createElement("button")
        b.type = "button"
        b.className = it.active ? "active" : ""
        const label = document.createElement("span")
        label.textContent = it.label
        b.appendChild(label)
        if (it.onDelete) {
          const del = document.createElement("span")
          del.className = "askw-del"
          del.textContent = "✕"
          del.onclick = (e) => {
            e.stopPropagation()
            it.onDelete()
          }
          b.appendChild(del)
        }
        b.onclick = () => {
          closeMenu()
          it.onSelect()
        }
        menu.appendChild(b)
      }
      chip.appendChild(menu)
      openMenu = menu
    }

    chips.model.onclick = () =>
      toggleMenu(
        chips.model,
        MODELS.map((m) => ({
          label: m,
          active: m === cfg.model,
          onSelect: () => {
            cfg.model = m
            save()
            renderChips()
          },
        })),
      )
    chips.effort.onclick = () =>
      toggleMenu(
        chips.effort,
        EFFORTS.map((e) => ({
          label: "effort: " + e,
          active: e === cfg.effort,
          onSelect: () => {
            cfg.effort = e
            save()
            renderChips()
          },
        })),
      )
    chips.session.onclick = () => {
      const items = [
        { label: "+ 새 대화", onSelect: () => newChat() },
        { sep: true },
        ...serverSessions.map((s) => ({
          label: s.title || "새 대화",
          active: s.session_id === currentSid,
          onSelect: () => openSession(s.session_id),
          onDelete: () => {
            closeMenu()
            deleteSession(s.session_id)
          },
        })),
      ]
      toggleMenu(chips.session, items)
    }
    chips.settings.onclick = () =>
      toggleMenu(chips.settings, [
        { label: "로그아웃 (이 브라우저)", onSelect: () => logout() },
        { label: "모든 기기에서 로그아웃", onSelect: () => logoutAllDevices() },
      ])

    document.addEventListener("click", (e) => {
      if (openMenu && !e.target.closest(".askw-chip")) closeMenu()
    })

    // 창 크기가 바뀌면 질문 제목의 잘림 여부를 다시 판정해 콜아웃을 붙이거나 뗀다.
    window.addEventListener("resize", () => {
      threadEl.querySelectorAll(".askw-msg.user").forEach(refreshQuestion)
    })

    // --- 이미지 첨부 ---
    function downscale(file) {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          const scale = Math.min(1, 1568 / Math.max(img.width, img.height))
          const c = document.createElement("canvas")
          c.width = Math.round(img.width * scale)
          c.height = Math.round(img.height * scale)
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height)
          URL.revokeObjectURL(img.src)
          resolve(c.toDataURL("image/jpeg", 0.85))
        }
        img.src = URL.createObjectURL(file)
      })
    }
    async function addImage(file) {
      if (!file || !file.type.startsWith("image/")) return
      pending.push(await downscale(file))
      renderAttachments()
    }

    ;["dragenter", "dragover"].forEach((ev) =>
      composer.addEventListener(ev, (e) => {
        e.preventDefault()
        composer.classList.add("dragover")
      }),
    )
    ;["dragleave", "drop"].forEach((ev) =>
      composer.addEventListener(ev, (e) => {
        e.preventDefault()
        if (ev === "dragleave" && composer.contains(e.relatedTarget)) return
        composer.classList.remove("dragover")
      }),
    )
    composer.addEventListener("drop", (e) => {
      for (const f of e.dataTransfer?.files ?? []) addImage(f)
    })

    // --- 입력 에디터 (WYSIWYG) ---
    function getInput() {
      return editor ? editor.storage.markdown.getMarkdown() : ""
    }
    function clearInput() {
      editor?.commands.clearContent(true)
    }
    function setInput(md) {
      editor?.commands.setContent(md || "", true)
    }
    function focusInput() {
      editor?.commands.focus()
    }
    function submitFromEditor() {
      const text = getInput().trim()
      if (!text && !pending.length) return
      clearInput()
      send(text)
    }
    async function setupEditor() {
      if (editor) return editor
      const { Editor, Extension, StarterKit, Markdown, Placeholder, Plugin, PluginKey } = await ensureTiptap()
      if (editor) return editor // 동시 호출 방지

      // 문서 끝이 코드블록/리스트/인용이면 그 아래에 항상 빈 문단을 둔다.
      // → 마크다운 블록을 만든 뒤 아래 화살표로 인덴트 없는 새 줄로 빠져나갈 수 있다.
      const TrailingNode = Extension.create({
        name: "trailingNode",
        addProseMirrorPlugins() {
          const trap = ["codeBlock", "bulletList", "orderedList", "blockquote"]
          return [
            new Plugin({
              key: new PluginKey("askwTrailingNode"),
              appendTransaction: (_txs, _old, state) => {
                const last = state.doc.lastChild
                const para = state.schema.nodes.paragraph
                if (para && last && trap.includes(last.type.name)) {
                  return state.tr.insert(state.doc.content.size, para.create())
                }
              },
            }),
          ]
        },
      })

      editor = new Editor({
        element: editorHost,
        extensions: [
          StarterKit,
          Markdown.configure({ html: false, linkify: false, transformPastedText: true }),
          Placeholder.configure({ placeholder: editorHost.dataset.placeholder || "" }),
          TrailingNode,
        ],
        editorProps: {
          // Enter=전송(일반 문단에서만). 코드블록/리스트/인용 안에서는 기본 동작.
          // Shift+Enter는 절대 전송하지 않는다: 코드블록→줄바꿈, 리스트→다음 항목, 그 외→하드브레이크.
          handleKeyDown: (view, e) => {
            if (e.key !== "Enter" || e.isComposing) return false
            if (e.shiftKey) {
              if (editor.isActive("codeBlock") && editor.commands.newlineInCode()) return true
              if (editor.isActive("listItem") && editor.commands.splitListItem("listItem")) return true
              return false // 일반 문단: 기본 하드브레이크(줄바꿈)
            }
            if (editor.isActive("codeBlock") || editor.isActive("listItem") || editor.isActive("blockquote")) {
              return false
            }
            e.preventDefault()
            submitFromEditor()
            return true
          },
          // 이미지 붙여넣기 → 첨부로. 에디터 본문에는 넣지 않는다.
          handlePaste: (view, e) => {
            let hit = false
            for (const item of e.clipboardData?.items ?? []) {
              if (item.type.startsWith("image/")) {
                addImage(item.getAsFile())
                hit = true
              }
            }
            if (hit) {
              e.preventDefault()
              return true
            }
            return false
          },
          // 이미지 드롭 → 에디터 삽입 막고 composer 핸들러가 첨부 처리.
          handleDrop: (view, e) => {
            const files = e.dataTransfer?.files
            return !!(files && [...files].some((f) => f.type.startsWith("image/")))
          },
        },
      })
      return editor
    }

    // --- 로그인 ---
    async function doLogin() {
      loginErr.textContent = ""
      loginBtn.disabled = true
      try {
        const resp = await fetch(PROXY + "/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: pwEl.value }),
        })
        const data = await resp.json().catch(() => ({}))
        if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`)
        cfg.jwt = data.token
        cfg.jwtExp = Date.parse(data.expires_at)
        save()
        pwEl.value = ""
        reflectAuth()
      } catch (err) {
        loginErr.textContent = "로그인 실패: " + err.message
      } finally {
        loginBtn.disabled = false
      }
    }
    // 이 브라우저만 로그아웃: JWT + 메모리 세션 캐시를 비우고 로그인 화면으로.
    function logout() {
      cfg.jwt = ""
      cfg.jwtExp = 0
      save()
      serverSessions = []
      currentSid = null
      currentMessages = []
      currentContext = null
      reflectAuth()
    }
    // 모든 기기에서 로그아웃: 서버가 지금까지 발급한 토큰을 전부 무효화한다.
    async function logoutAllDevices() {
      if (!confirm("다른 기기 세션도 모두 끊깁니다. 계속할까요?")) return
      let notice = "모든 기기에서 로그아웃됐습니다."
      try {
        const resp = await fetch(PROXY + "/api/logout", { method: "POST", headers: authHeaders() })
        // 204 성공 / 401 이미 무효 → 둘 다 정상적으로 로컬 로그아웃 진행
        if (!resp.ok && resp.status !== 401) {
          notice = "전체 로그아웃 요청 실패(HTTP " + resp.status + "). 이 브라우저는 로그아웃됩니다."
        }
      } catch (e) {
        notice = "전체 로그아웃 요청 실패(네트워크). 이 브라우저는 로그아웃됩니다."
      }
      logout() // 서버 응답과 무관하게 로컬은 항상 로그아웃
      loginErr.textContent = notice // 로그인 화면에 결과 안내
    }
    loginBtn.onclick = doLogin
    pwEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        doLogin()
      }
    })

    // --- 전송 ---
    async function send(text) {
      if (busy) return
      if (!loggedIn()) return reflectAuth()
      await ensureMarked()
      const imgs = pending.slice()
      const content = imgs.length
        ? [...imgs.map((url) => ({ type: "image_url", image_url: { url } })), ...(text ? [{ type: "text", text }] : [])]
        : text
      currentMessages.push({ role: "user", content })
      pending = []
      renderAttachments()
      const userEl = appendMsg("user", content)
      userEl.dataset.idx = currentMessages.length - 1
      renderChips()

      busy = true
      sendEl.disabled = true
      const bubble = appendMsg("assistant", "")
      bubble.innerHTML = '<span class="askw-typing">…</span>'
      bubble.scrollIntoView({ block: "nearest" })

      try {
        const resp = await fetch(PROXY + "/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({
            session_id: currentSid, // null이면 서버가 새 session_id 발급
            message: text,
            images: imgs,
            model: cfg.model,
            effort: cfg.effort,
            format: "markdown",
          }),
        })
        if (resp.status === 401) {
          bubble.remove()
          userEl.remove()
          currentMessages.pop()
          setInput(text)
          pending = imgs
          renderAttachments()
          logout()
          return
        }
        const data = await resp.json()
        if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`)
        currentSid = data.session_id ?? currentSid
        currentContext = data.context
        currentMessages.push({ role: "assistant", content: data.reply })
        bubble.dataset.idx = currentMessages.length - 1
        renderInto(bubble, data.reply)
        renderContext(data.context)
        loadSessions() // 목록의 제목·순서·개수 갱신(터미널 대화도 함께 잡힘)
      } catch (err) {
        bubble.remove()
        userEl.remove()
        currentMessages.pop()
        appendMsg("error", "요청 실패: " + err.message)
        setInput(text)
        pending = imgs
        renderAttachments()
      } finally {
        busy = false
        sendEl.disabled = false
        focusInput()
        refreshQuestions() // Questions 패널 갱신(성공/실패 후 최종 상태 반영)
      }
    }

    // 전송 버튼(form submit) → 에디터 내용을 markdown으로 전송. Enter 전송은 에디터 handleKeyDown에서 처리.
    composer.addEventListener("submit", (e) => {
      e.preventDefault()
      submitFromEditor()
    })

    // --- 시작 ---
    ensureMarked()
    renderChips()
    reflectAuth() // 로그인돼 있으면 initConversation()이 서버에서 대화를 불러온다
  }

  function boot() {
    document.querySelectorAll(".askw").forEach(initAsk)
    mountSidebar() // /ask 페이지면 Explorer에 세션 목록 주입(+ keep-alive)
  }
  // Quartz SPA: nav 이벤트마다 재초기화 시도(중복은 dataset.inited로 방지).
  document.addEventListener("nav", boot)
  if (document.readyState !== "loading") boot()
  else document.addEventListener("DOMContentLoaded", boot)
})()
