import "./style.css";
import "monaco-editor/min/vs/editor/editor.main.css";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_moduleId, label) {
    if (label === "javascript" || label === "typescript") {
      return new tsWorker();
    }

    return new editorWorker();
  },
};

const defaultPackages = "dayjs,lodash-es";
const defaultSource = `import dayjs from "dayjs";
import { startCase } from "lodash-es";

const app = document.getElementById("app");

app.innerHTML = \`
  <h1>\${startCase("monaco sandbox is running")}</h1>
  <p>Current time: \${dayjs().format("YYYY-MM-DD HH:mm:ss")}</p>
\`;

console.log("Sandbox loaded successfully.");
`;

const editorElement = document.getElementById("editor");
const runButton = document.getElementById("run-btn");
const resetButton = document.getElementById("reset-btn");
const packageInput = document.getElementById("packages");
const preview = document.getElementById("preview");
const consoleOutput = document.getElementById("console-output");

packageInput.value = defaultPackages;

monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  target: monaco.languages.typescript.ScriptTarget.ES2020,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  module: monaco.languages.typescript.ModuleKind.ESNext,
});

const editor = monaco.editor.create(editorElement, {
  value: defaultSource,
  language: "javascript",
  theme: "vs-dark",
  minimap: { enabled: false },
  automaticLayout: true,
  fontSize: 14,
  tabSize: 2,
});

function appendConsoleLine(level, message) {
  const line = `[${level}] ${message}`;
  consoleOutput.textContent = `${consoleOutput.textContent}${line}\n`;
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
  consoleOutput.textContent = "";
}

function parsePackageSpec(spec) {
  const trimmed = spec.trim();

  if (!trimmed) {
    return null;
  }

  if (!trimmed.includes("@")) {
    return { name: trimmed, version: "" };
  }

  if (trimmed.startsWith("@")) {
    const slashIndex = trimmed.indexOf("/");
    const versionIndex = trimmed.indexOf("@", slashIndex + 1);

    if (slashIndex === -1 || versionIndex === -1) {
      return { name: trimmed, version: "" };
    }

    return {
      name: trimmed.slice(0, versionIndex),
      version: trimmed.slice(versionIndex + 1),
    };
  }

  const versionIndex = trimmed.indexOf("@");
  return {
    name: trimmed.slice(0, versionIndex),
    version: trimmed.slice(versionIndex + 1),
  };
}

function parsePackageInput(inputValue) {
  return inputValue
    .split(",")
    .map((entry) => parsePackageSpec(entry))
    .filter((entry) => entry && entry.name);
}

function buildImportMap(packageList) {
  const imports = {};

  for (const pkg of packageList) {
    const packageId = pkg.version ? `${pkg.name}@${pkg.version}` : pkg.name;
    const url = `https://esm.sh/${packageId}`;
    imports[pkg.name] = url;
    imports[`${pkg.name}/`] = `${url}/`;
  }

  return { imports };
}

function toDisplayString(value) {
  if (value instanceof Error) {
    return value.stack || value.message;
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function escapeScriptContent(code) {
  return code.replaceAll("</script>", "<\\/script>");
}

function createPreviewDocument(sourceCode, importMap) {
  const safeSource = escapeScriptContent(sourceCode);
  const safeImportMap = escapeScriptContent(JSON.stringify(importMap, null, 2));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        padding: 16px;
        font-family: Inter, system-ui, -apple-system, sans-serif;
        background: #f8fafc;
        color: #0f172a;
      }

      #app {
        min-height: 40px;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const toStringValue = (value) => {
        if (value instanceof Error) {
          return value.stack || value.message;
        }

        if (typeof value === "string") {
          return value;
        }

        try {
          return JSON.stringify(value, null, 2);
        } catch {
          return String(value);
        }
      };

      const send = (type, payload) => {
        parent.postMessage({ source: "monaco-playground", type, payload }, "*");
      };

      ["log", "info", "warn", "error"].forEach((method) => {
        const original = console[method].bind(console);
        console[method] = (...args) => {
          send("console", {
            method,
            messages: args.map((arg) => toStringValue(arg)),
          });
          original(...args);
        };
      });

      window.addEventListener("error", (event) => {
        send("runtime-error", {
          message: event.message,
          stack: event.error ? event.error.stack : "",
        });
      });

      window.addEventListener("unhandledrejection", (event) => {
        send("runtime-error", {
          message: "Unhandled promise rejection",
          stack: toStringValue(event.reason),
        });
      });
    </script>
    <script type="importmap">
${safeImportMap}
    </script>
    <script type="module">
${safeSource}
    </script>
  </body>
</html>`;
}

function runCode() {
  clearConsole();
  const packageList = parsePackageInput(packageInput.value);
  const importMap = buildImportMap(packageList);
  const sourceCode = editor.getValue();
  const html = createPreviewDocument(sourceCode, importMap);

  preview.srcdoc = html;

  const packageLabel = packageList.length
    ? packageList
        .map((pkg) => (pkg.version ? `${pkg.name}@${pkg.version}` : pkg.name))
        .join(", ")
    : "(none)";

  appendConsoleLine("system", `Running with packages: ${packageLabel}`);
}

window.addEventListener("message", (event) => {
  if (event.source !== preview.contentWindow) {
    return;
  }

  const payload = event.data;
  if (!payload || payload.source !== "monaco-playground") {
    return;
  }

  if (payload.type === "console") {
    const text = payload.payload.messages.join(" ");
    appendConsoleLine(payload.payload.method, text);
    return;
  }

  if (payload.type === "runtime-error") {
    const detail = payload.payload.stack || payload.payload.message;
    appendConsoleLine("error", detail);
  }
});

runButton.addEventListener("click", runCode);
resetButton.addEventListener("click", () => {
  editor.setValue(defaultSource);
  packageInput.value = defaultPackages;
  runCode();
});

editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);

runCode();
