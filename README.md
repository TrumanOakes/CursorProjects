# Monaco JavaScript Sandbox (Embeddable Website Playground)

This project is a **clear, minimal example** of how to build a JavaScript playground with:

- **Monaco Editor** (the code editor),
- a **sandboxed iframe** (safe execution),
- and **npm package imports** using `esm.sh` + import maps.

---

## 1) Quick start

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

---

## 2) What this example includes

- Left pane: Monaco editor
- Right pane: sandboxed preview iframe (`sandbox="allow-scripts"`)
- Top controls:
  - package input (`dayjs,lodash-es` by default)
  - **Run** button
  - **Reset** button
- Bottom pane: console output (logs + runtime errors)

---

## 3) Project structure

```text
.
├── index.html         # Page layout
├── src/
│   ├── main.js        # Monaco + sandbox runtime
│   └── style.css      # Page styling
└── package.json
```

---

## 4) How the sandbox works

### Step A: Read editor code + package list

`main.js` collects:

1. the current Monaco code,
2. and package names from the input (comma-separated).

Examples:

- `dayjs`
- `lodash-es`
- `@scope/pkg@1.2.3`

### Step B: Build an import map

For each package, the app creates import map entries pointing to `https://esm.sh/<package>`.

Example:

```json
{
  "imports": {
    "dayjs": "https://esm.sh/dayjs",
    "dayjs/": "https://esm.sh/dayjs/"
  }
}
```

### Step C: Create iframe `srcdoc`

The app builds a full HTML document string and sets `iframe.srcdoc`.

That document includes:

- a small `#app` mount element,
- console/error forwarding with `postMessage`,
- the generated import map,
- the user code as `<script type="module">`.

### Step D: Keep execution isolated

The preview iframe uses:

```html
sandbox="allow-scripts"
```

This prevents user code from running in the host page context.

---

## 5) Keyboard shortcut

- **Run code:** `Ctrl+Enter` (or `Cmd+Enter` on macOS)

---

## 6) How to embed this in a website

You can reuse the same approach inside any docs/developer portal:

1. Move the editor + preview block into a component.
2. Pass initial code and package list as props/config.
3. Keep code execution in a sandboxed iframe.
4. Optionally persist snippets and share links from your backend.

---

## 7) Notes for production hardening

For a production public playground, add:

- package allowlist/denylist,
- stricter iframe policies/CSP,
- request limits or snippet size limits,
- telemetry and error reporting.

This starter intentionally stays small and easy to understand first.
