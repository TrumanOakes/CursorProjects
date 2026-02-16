import "./style.css";
import "monaco-editor/min/vs/editor/editor.main.css";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { createAudiotoolClient, getLoginStatus } from "@audiotool/nexus";

self.MonacoEnvironment = {
  getWorker(_moduleId, label) {
    if (label === "javascript" || label === "typescript") {
      return new tsWorker();
    }

    return new editorWorker();
  },
};

const defaultPackages = "dayjs,lodash-es";
const audiotoolClientId = "379f8d67-b211-43b2-8a9d-9553aa8aad32";
const audiotoolScope = "project:write";
const importedRegionNamePrefix = "[Video Import]";
const canEmbedAudiotoolStudio = /(^|\.)audiotool\.com$/i.test(
  window.location.hostname,
);
const defaultSource = `import dayjs from "dayjs";
import { startCase } from "lodash-es";

console.log(startCase("video audio playground sandbox is running"));
console.log("Current time:", dayjs().format("YYYY-MM-DD HH:mm:ss"));
console.log(
  "After importing a video's audio into your project, run this script to tweak the first audio region gain."
);

try {
  await window.audiotool.apply({
    ops: [
      { op: "updateField", entityType: "audioRegion", field: "gain", value: 0.9 },
    ],
  });
  console.log("Applied audioRegion gain edit.");
} catch (error) {
  console.warn(
    "Import a video's audio first, then run again to sync timeline edits.",
    error,
  );
}
`;

const editorElement = document.getElementById("editor");
const runButton = document.getElementById("run-btn");
const resetButton = document.getElementById("reset-btn");
const packageInput = document.getElementById("packages");
const projectInput = document.getElementById("project-input");
const authButton = document.getElementById("auth-btn");
const connectButton = document.getElementById("connect-btn");
const disconnectButton = document.getElementById("disconnect-btn");
const openProjectButton = document.getElementById("open-project-btn");
const reloadPreviewButton = document.getElementById("reload-preview-btn");
const importAudioButton = document.getElementById("import-audio-btn");
const replaceImportedToggle = document.getElementById("replace-imported-toggle");
const videoPlayPauseButton = document.getElementById("video-play-pause-btn");
const videoBackFiveButton = document.getElementById("video-back-5-btn");
const videoForwardFiveButton = document.getElementById("video-forward-5-btn");
const videoToStartButton = document.getElementById("video-to-start-btn");
const setImportMarkerButton = document.getElementById("set-import-marker-btn");
const jumpImportMarkerButton = document.getElementById("jump-import-marker-btn");
const videoSeekSlider = document.getElementById("video-seek-slider");
const videoPlayheadLabel = document.getElementById("video-playhead-label");
const videoDurationLabel = document.getElementById("video-duration-label");
const importMarkerLabel = document.getElementById("import-marker-label");
const audiotoolStatusElement = document.getElementById("audiotool-status");
const redirectUrlElement = document.getElementById("redirect-url");
const projectPreview = document.getElementById("project-preview");
const localVideoPreview = document.getElementById("local-video-preview");
const videoFileInput = document.getElementById("video-file-input");
const videoStatusElement = document.getElementById("video-status");
const runtimeFrame = document.getElementById("runtime-frame");
const consoleOutput = document.getElementById("console-output");

packageInput.value = defaultPackages;

let loginStatus = null;
let audiotoolClient = null;
let activeDocument = null;
let activeProject = "";
let activeProjectStudioUrl = "";
let isConnectingProject = false;
let isInitializingAuth = false;
let isImportingAudio = false;
let audiotoolQueue = Promise.resolve();
let selectedVideoFile = null;
let selectedAudioBuffer = null;
let selectedVideoObjectUrl = "";
let importMarkerSeconds = 0;

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

function setAudiotoolStatus(message, state = "warn") {
  audiotoolStatusElement.textContent = message;
  audiotoolStatusElement.dataset.state = state;
}

function setVideoStatus(message, state = "warn") {
  videoStatusElement.textContent = message;
  videoStatusElement.dataset.state = state;
}

function revokeSelectedVideoUrl() {
  if (!selectedVideoObjectUrl) {
    return;
  }

  URL.revokeObjectURL(selectedVideoObjectUrl);
  selectedVideoObjectUrl = "";
}

async function decodeAudioTrack(file) {
  const audioContext = new AudioContext();

  try {
    const fileData = await file.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(fileData);
    return decoded;
  } finally {
    await audioContext.close();
  }
}

function audioBufferToWavBlob(audioBuffer) {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const format = 1;
  const bitDepth = 16;
  const samples = audioBuffer.length;
  const blockAlign = (numChannels * bitDepth) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  function writeString(offset, value) {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  }

  let offset = 0;
  writeString(offset, "RIFF");
  offset += 4;
  view.setUint32(offset, 36 + dataSize, true);
  offset += 4;
  writeString(offset, "WAVE");
  offset += 4;
  writeString(offset, "fmt ");
  offset += 4;
  view.setUint32(offset, 16, true);
  offset += 4;
  view.setUint16(offset, format, true);
  offset += 2;
  view.setUint16(offset, numChannels, true);
  offset += 2;
  view.setUint32(offset, sampleRate, true);
  offset += 4;
  view.setUint32(offset, byteRate, true);
  offset += 4;
  view.setUint16(offset, blockAlign, true);
  offset += 2;
  view.setUint16(offset, bitDepth, true);
  offset += 2;
  writeString(offset, "data");
  offset += 4;
  view.setUint32(offset, dataSize, true);
  offset += 4;

  const channels = Array.from({ length: numChannels }, (_, index) =>
    audioBuffer.getChannelData(index),
  );

  for (let sampleIndex = 0; sampleIndex < samples; sampleIndex += 1) {
    for (let channelIndex = 0; channelIndex < numChannels; channelIndex += 1) {
      const sample = Math.max(-1, Math.min(1, channels[channelIndex][sampleIndex]));
      const pcm =
        sample < 0 ? Math.round(sample * 0x8000) : Math.round(sample * 0x7fff);
      view.setInt16(offset, pcm, true);
      offset += 2;
    }
  }

  return new Blob([buffer], { type: "audio/wav" });
}

function isErrorResult(result) {
  return result instanceof Error;
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainder = wholeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function formatTimestamp(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00.000";
  }

  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainderSeconds = wholeSeconds % 60;
  const millis = Math.floor((seconds - wholeSeconds) * 1000);
  return `${String(minutes).padStart(2, "0")}:${String(remainderSeconds).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
}

function clampVideoTime(seconds) {
  const safe = Number.isFinite(seconds) ? seconds : 0;
  const duration = Number.isFinite(localVideoPreview.duration)
    ? localVideoPreview.duration
    : 0;

  if (duration <= 0) {
    return Math.max(0, safe);
  }

  return Math.min(Math.max(0, safe), duration);
}

function setImportMarker(seconds) {
  importMarkerSeconds = clampVideoTime(seconds);
  importMarkerLabel.textContent = `Import marker: ${formatTimestamp(importMarkerSeconds)}`;
}

function updateTransportUi() {
  const hasVideo = Boolean(selectedVideoFile);
  const duration = Number.isFinite(localVideoPreview.duration)
    ? localVideoPreview.duration
    : 0;
  const current = Number.isFinite(localVideoPreview.currentTime)
    ? localVideoPreview.currentTime
    : 0;

  videoPlayPauseButton.disabled = !hasVideo;
  videoBackFiveButton.disabled = !hasVideo;
  videoForwardFiveButton.disabled = !hasVideo;
  videoToStartButton.disabled = !hasVideo;
  setImportMarkerButton.disabled = !hasVideo;
  jumpImportMarkerButton.disabled = !hasVideo;
  videoSeekSlider.disabled = !hasVideo || duration <= 0;

  videoSeekSlider.max = duration > 0 ? String(duration) : "0";
  videoSeekSlider.value = duration > 0 ? String(clampVideoTime(current)) : "0";
  videoPlayheadLabel.textContent = `Playhead: ${formatTimestamp(current)}`;
  videoDurationLabel.textContent = `Duration: ${formatTimestamp(duration)}`;
  videoPlayPauseButton.textContent = localVideoPreview.paused ? "Play" : "Pause";
}

function secondsToTicksAtBpm(seconds, bpm) {
  const ticksPerBeat = 3840;
  return Math.max(1, Math.round((seconds * bpm * ticksPerBeat) / 60));
}

function sanitizeDisplayName(name) {
  const cleaned = name.replace(/\.[^/.]+$/, "").trim();
  if (cleaned) {
    return cleaned.slice(0, 60);
  }
  return "Imported Video Audio";
}

function buildImportedRegionDisplayName(fileName) {
  return `${importedRegionNamePrefix} ${sanitizeDisplayName(fileName)}`.slice(0, 90);
}

async function uploadAudioAsSample(fileName, audioBuffer) {
  const client = await ensureClient();
  const wavBlob = audioBufferToWavBlob(audioBuffer);
  const sampleDisplayName = sanitizeDisplayName(fileName);

  const createResult = await client.api.sampleService.createSample({
    sample: {
      displayName: sampleDisplayName,
      description: `Imported from local video file: ${fileName}`,
      sampleType: 1,
      usage: 3,
      tags: ["video-import", "local-workflow"],
    },
  });

  if (isErrorResult(createResult)) {
    throw new Error(`CreateSample failed: ${createResult.message}`);
  }

  const sampleName = createResult.sample?.name;
  const uploadEndpoint = createResult.uploadEndpoint;
  if (!sampleName || !uploadEndpoint?.uploadUrl) {
    throw new Error("CreateSample did not return a valid upload endpoint.");
  }

  const uploadHeaders = new Headers(uploadEndpoint.headers || {});
  if (!uploadHeaders.has("Content-Type")) {
    uploadHeaders.set("Content-Type", "audio/wav");
  }

  const uploadResponse = await fetch(uploadEndpoint.uploadUrl, {
    method: "PUT",
    headers: uploadHeaders,
    body: wavBlob,
  });
  if (!uploadResponse.ok) {
    throw new Error(
      `Sample upload failed with status ${uploadResponse.status} ${uploadResponse.statusText}.`,
    );
  }

  const finishedResult = await client.api.sampleService.uploadSampleFinished({
    name: sampleName,
  });
  if (isErrorResult(finishedResult)) {
    throw new Error(`UploadSampleFinished failed: ${finishedResult.message}`);
  }

  return {
    sampleName,
    wavBlob,
    sampleDisplayName,
  };
}

async function placeSampleIntoProject({
  sampleName,
  regionDisplayName,
  durationSeconds,
  positionSeconds,
  replacePreviousImports,
}) {
  if (!activeDocument) {
    throw new Error("No connected project document available.");
  }

  await activeDocument.modify((t) => {
    if (replacePreviousImports) {
      const existingAudioRegions = t.entities.ofTypes("audioRegion").get();
      for (const region of existingAudioRegions) {
        const regionName = region.region.fields.displayName.value || "";
        if (regionName.startsWith(importedRegionNamePrefix)) {
          t.remove(region);
        }
      }
    }

    const config = t.entities.ofTypes("config").getOne();
    const bpm = config ? config.fields.tempoBpm.value : 125;

    let track = t.entities.ofTypes("audioTrack").getOne();
    if (!track) {
      const device = t.entities.ofTypes("audioDevice").getOne();
      if (!device) {
        throw new Error("Could not find an AudioDevice to attach an AudioTrack.");
      }

      const tracks = t.entities.ofTypes("audioTrack").get();
      const maxOrder = tracks.reduce(
        (value, current) => Math.max(value, current.fields.orderAmongTracks.value),
        -1,
      );

      track = t.create("audioTrack", {
        player: device.location,
        orderAmongTracks: maxOrder + 1,
      });
    }

    const sampleEntity = t.create("sample", {
      sampleName,
      uploadStartTime: BigInt(Math.floor(Date.now() / 1000)),
    });
    const automationCollection = t.create("automationCollection", {});

    const regionDurationTicks = secondsToTicksAtBpm(durationSeconds, bpm);
    const regionPositionTicks = Math.max(
      0,
      secondsToTicksAtBpm(positionSeconds, bpm),
    );

    t.create("audioRegion", {
      track: track.location,
      playbackAutomationCollection: automationCollection.location,
      sample: sampleEntity.location,
      region: {
        positionTicks: regionPositionTicks,
        durationTicks: regionDurationTicks,
        loopDurationTicks: regionDurationTicks,
        displayName: regionDisplayName,
      },
    });
  });
}

async function importSelectedVideoAudio() {
  if (!selectedVideoFile || !selectedAudioBuffer) {
    throw new Error("Select a video file before importing audio.");
  }

  if (!activeDocument) {
    throw new Error("Connect a project before importing audio.");
  }

  const importPositionSeconds = clampVideoTime(importMarkerSeconds);
  const replacePreviousImports = replaceImportedToggle.checked;

  const uploadResult = await uploadAudioAsSample(
    selectedVideoFile.name,
    selectedAudioBuffer,
  );
  await placeSampleIntoProject({
    sampleName: uploadResult.sampleName,
    regionDisplayName: buildImportedRegionDisplayName(selectedVideoFile.name),
    durationSeconds: selectedAudioBuffer.duration,
    positionSeconds: importPositionSeconds,
    replacePreviousImports,
  });

  return {
    ...uploadResult,
    importPositionSeconds,
    durationSeconds: selectedAudioBuffer.duration,
    replacePreviousImports,
  };
}

function getRedirectUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";

  let path = url.pathname;
  if (path.endsWith(".html")) {
    path = path.slice(0, path.lastIndexOf("/") + 1);
  }
  if (!path.endsWith("/")) {
    path = `${path}/`;
  }

  url.pathname = path;
  return url.toString();
}

function extractProjectUuid(projectValue) {
  const uuidRegex =
    /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
  const directMatch = projectValue.match(uuidRegex);
  if (directMatch) {
    return directMatch[0];
  }

  try {
    const parsed = new URL(projectValue);
    const fromQuery = parsed.searchParams.get("project");
    if (!fromQuery) {
      return "";
    }
    const queryMatch = fromQuery.match(uuidRegex);
    return queryMatch ? queryMatch[0] : fromQuery;
  } catch {
    return "";
  }
}

function buildStudioUrl(origin, projectId) {
  return `${origin}/studio?project=${encodeURIComponent(projectId)}`;
}

function normalizeAudiotoolOrigin(candidateOrigin) {
  try {
    const parsed = new URL(candidateOrigin);
    if (parsed.hostname.toLowerCase() === "beta.audiotool.com") {
      return parsed.origin;
    }

    if (/audiotool\.com$/i.test(parsed.hostname)) {
      return "https://beta.audiotool.com";
    }
  } catch {
    // Ignore invalid origin.
  }

  return "https://beta.audiotool.com";
}

function resolveProjectConnection(projectValue) {
  const trimmed = projectValue.trim();
  if (!trimmed) {
    return { projectReference: "", studioUrl: "" };
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      const projectId = extractProjectUuid(trimmed);
      if (projectId) {
        const origin = normalizeAudiotoolOrigin(parsed.origin);
        return {
          projectReference: projectId,
          studioUrl: buildStudioUrl(origin, projectId),
        };
      }

      return {
        projectReference: trimmed,
        studioUrl: trimmed,
      };
    } catch {
      return { projectReference: trimmed, studioUrl: trimmed };
    }
  }

  const projectUuid = extractProjectUuid(trimmed);
  if (projectUuid) {
    return {
      projectReference: projectUuid,
      studioUrl: buildStudioUrl("https://beta.audiotool.com", projectUuid),
    };
  }

  return {
    projectReference: trimmed,
    studioUrl: buildStudioUrl("https://beta.audiotool.com", trimmed),
  };
}

function setProjectPreview(studioUrl, note = "") {
  if (!canEmbedAudiotoolStudio) {
    projectPreview.src = "about:blank";
    projectPreview.srcdoc = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        margin: 0;
        display: grid;
        place-items: center;
        min-height: 100vh;
        background: #0a142b;
        color: #d4e0ff;
        font-family: Inter, system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 24px;
      }
      p {
        max-width: 620px;
        line-height: 1.5;
      }
      code {
        background: #08122a;
        border: 1px solid #25345f;
        border-radius: 6px;
        padding: 2px 6px;
      }
    </style>
  </head>
  <body>
    <p>
      Embedded Audiotool Studio is disabled on <code>${window.location.hostname}</code>.
      Local dev is cross-site relative to <code>audiotool.com</code>, so login flow cookies are not valid in iframe context.
      Use <strong>Open Project Tab</strong> for now, then deploy under an <code>*.audiotool.com</code> host to enable embedded preview.
    </p>
  </body>
</html>`;
    return;
  }

  if (!studioUrl) {
    projectPreview.src = "about:blank";
    projectPreview.srcdoc = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        margin: 0;
        display: grid;
        place-items: center;
        min-height: 100vh;
        background: #0a142b;
        color: #d4e0ff;
        font-family: Inter, system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 24px;
      }
      p {
        max-width: 520px;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <p>${note || "Log in and connect a project to display Audiotool here."}</p>
  </body>
</html>`;
    return;
  }

  projectPreview.removeAttribute("srcdoc");
  projectPreview.src = studioUrl;
}

function updateControls() {
  const loggedIn = Boolean(loginStatus && loginStatus.loggedIn);
  authButton.disabled = isInitializingAuth;
  authButton.textContent = loggedIn ? "Logout" : "Login";

  connectButton.disabled = !loggedIn || isConnectingProject;
  disconnectButton.disabled = !activeDocument || isConnectingProject;
  openProjectButton.disabled = !activeProjectStudioUrl;
  reloadPreviewButton.disabled = !activeProjectStudioUrl || !canEmbedAudiotoolStudio;
  importAudioButton.disabled =
    !selectedAudioBuffer || !selectedVideoFile || !activeDocument || isImportingAudio;
}

function queueAudiotoolTask(task) {
  const nextTask = audiotoolQueue.then(task, task);
  audiotoolQueue = nextTask.catch(() => {});
  return nextTask;
}

async function stopActiveDocument(note = "Disconnected from project.") {
  if (!activeDocument) {
    return;
  }

  const previousDoc = activeDocument;
  activeDocument = null;
  const previousProject = activeProject;
  activeProject = "";
  activeProjectStudioUrl = "";
  setProjectPreview("", "Project preview is disconnected.");
  updateControls();

  try {
    await previousDoc.stop();
    setAudiotoolStatus(note, "warn");
    appendConsoleLine(
      "system",
      `Stopped Audiotool sync for project: ${previousProject || "(unknown)"}`,
    );
  } catch (error) {
    const detail = toDisplayString(error);
    setAudiotoolStatus(`Failed stopping project: ${detail}`, "error");
    appendConsoleLine("error", detail);
  }
}

async function ensureClient() {
  if (!loginStatus || !loginStatus.loggedIn) {
    throw new Error("Login required before creating an Audiotool client.");
  }

  if (audiotoolClient) {
    return audiotoolClient;
  }

  audiotoolClient = await createAudiotoolClient({
    authorization: loginStatus,
  });

  return audiotoolClient;
}

async function connectProject(project) {
  if (!project) {
    throw new Error("Project URL or UUID is required.");
  }

  const { projectReference, studioUrl } = resolveProjectConnection(project);
  if (!projectReference || !studioUrl) {
    throw new Error("Could not determine a valid project reference.");
  }

  isConnectingProject = true;
  updateControls();
  setAudiotoolStatus("Connecting to Audiotool project...", "warn");

  try {
    const client = await ensureClient();

    if (activeDocument && activeProject === projectReference) {
      setAudiotoolStatus("Project already connected.", "ok");
      return;
    }

    if (activeDocument) {
      await stopActiveDocument("Switching to another project...");
    }

    const document = await client.createSyncedDocument({
      project: projectReference,
    });
    await document.start();

    activeDocument = document;
    activeProject = projectReference;
    activeProjectStudioUrl = studioUrl;
    setProjectPreview(
      studioUrl,
      "Project preview could not be loaded in this frame. Open it in a new tab.",
    );
    projectInput.value = studioUrl;
    setAudiotoolStatus(`Connected to project: ${projectReference}`, "ok");
    appendConsoleLine(
      "system",
      `Connected Audiotool project: ${projectReference}`,
    );
    if (selectedAudioBuffer && selectedVideoFile) {
      setVideoStatus(
        `Project connected. Click "Import Video Audio to Connected Project" to transfer ${selectedVideoFile.name}.`,
        "warn",
      );
    }
    appendConsoleLine(
      "system",
      "Project preview updated. If the frame is blocked by browser policy, use Open Project Tab.",
    );
    appendConsoleLine(
      "system",
      "If you see a login error in the embedded preview, allow third-party cookies for audiotool.com or use Open Project Tab.",
    );
    appendConsoleLine(
      "system",
      "Google sign-in can fail inside iframes. Authenticate in a full tab, then reload preview.",
    );
    if (!canEmbedAudiotoolStudio) {
      appendConsoleLine(
        "system",
        "Embedded preview is disabled on local/non-audiotool hosts. Open Project Tab is the supported local workflow.",
      );
    }
  } finally {
    isConnectingProject = false;
    updateControls();
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value, name) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${name} must be a non-empty string.`);
  }

  return value.trim();
}

function resolveEntityFromOp(t, aliases, op) {
  if (typeof op.entityAlias === "string" && op.entityAlias.trim()) {
    const entity = aliases.get(op.entityAlias.trim());
    if (!entity) {
      throw new Error(`Entity alias "${op.entityAlias}" was not defined.`);
    }
    return entity;
  }

  if (typeof op.entityType === "string" && op.entityType.trim()) {
    const entity = t.entities.ofTypes(op.entityType.trim()).getOne();
    if (!entity) {
      throw new Error(`No entity found for type "${op.entityType}".`);
    }
    return entity;
  }

  throw new Error(
    'Operation must specify "entityAlias" or "entityType" to resolve an entity.',
  );
}

function safeUpdateField(t, fieldRef, value) {
  if (typeof t.tryUpdate === "function") {
    const maybeError = t.tryUpdate(fieldRef, value);
    if (maybeError) {
      throw maybeError instanceof Error ? maybeError : new Error(String(maybeError));
    }
    return;
  }

  t.update(fieldRef, value);
}

function applyAudiotoolOperations(t, operations) {
  const aliases = new Map();

  for (const rawOp of operations) {
    if (!isRecord(rawOp)) {
      throw new Error("Each operation must be an object.");
    }

    const opName = asString(rawOp.op, "op");

    if (opName === "ensureEntity") {
      const entityType = asString(rawOp.entityType, "entityType");
      let entity = t.entities.ofTypes(entityType).getOne();

      if (!entity) {
        const createValues = isRecord(rawOp.create) ? rawOp.create : {};
        entity = t.create(entityType, createValues);
      }

      if (typeof rawOp.alias === "string" && rawOp.alias.trim()) {
        aliases.set(rawOp.alias.trim(), entity);
      }

      continue;
    }

    if (opName === "createEntity") {
      const entityType = asString(rawOp.entityType, "entityType");
      const createValues = isRecord(rawOp.values) ? rawOp.values : {};
      const entity = t.create(entityType, createValues);

      if (typeof rawOp.alias === "string" && rawOp.alias.trim()) {
        aliases.set(rawOp.alias.trim(), entity);
      }

      continue;
    }

    if (opName === "updateField") {
      const entity = resolveEntityFromOp(t, aliases, rawOp);
      const fieldName = asString(rawOp.field, "field");
      const fieldRef = entity.fields?.[fieldName];

      if (!fieldRef) {
        throw new Error(`Field "${fieldName}" does not exist on selected entity.`);
      }

      safeUpdateField(t, fieldRef, rawOp.value);
      continue;
    }

    if (opName === "removeEntity") {
      const entity = resolveEntityFromOp(t, aliases, rawOp);
      t.remove(entity);
      continue;
    }

    throw new Error(
      `Unsupported Audiotool operation "${opName}". Supported ops: ensureEntity, createEntity, updateField, removeEntity.`,
    );
  }
}

function validateApplyPayload(rawPayload) {
  if (!isRecord(rawPayload)) {
    throw new Error("audiotool.apply payload must be an object.");
  }

  const project =
    typeof rawPayload.project === "string" ? rawPayload.project.trim() : "";

  if (!Array.isArray(rawPayload.ops)) {
    throw new Error('audiotool.apply payload must include an "ops" array.');
  }
  if (!rawPayload.ops.length) {
    throw new Error('audiotool.apply payload "ops" cannot be empty.');
  }
  if (rawPayload.ops.length > 50) {
    throw new Error("audiotool.apply supports up to 50 operations per request.");
  }

  return { project, ops: rawPayload.ops };
}

async function ensureRequestedProject(requestedProject) {
  const fallbackProject = projectInput.value.trim();
  const targetProject = requestedProject || activeProject || fallbackProject;

  if (!targetProject) {
    throw new Error(
      "No project selected. Enter a project URL/UUID and click Connect Project first.",
    );
  }

  if (!activeDocument || activeProject !== targetProject) {
    await connectProject(targetProject);
  }
}

function postAudiotoolResult(requestId, response) {
  const target = runtimeFrame.contentWindow;
  if (!target) {
    return;
  }

  target.postMessage(
    {
      source: "audiotool-host",
      type: "audiotool.result",
      requestId,
      ...response,
    },
    "*",
  );
}

async function processAudiotoolApplyRequest(request) {
  const requestId =
    typeof request?.requestId === "string" ? request.requestId.trim() : "";
  if (!requestId) {
    appendConsoleLine("error", "Ignored audiotool.apply message without requestId.");
    return;
  }

  try {
    const { project, ops } = validateApplyPayload(request?.payload);

    await ensureRequestedProject(project);
    await activeDocument.modify((transaction) => {
      applyAudiotoolOperations(transaction, ops);
    });

    setAudiotoolStatus(
      `Applied ${ops.length} operation(s) to project sync.`,
      "ok",
    );
    appendConsoleLine("system", `Audiotool apply succeeded (${ops.length} ops).`);
    postAudiotoolResult(requestId, {
      ok: true,
      payload: { applied: ops.length, project: activeProject },
    });
  } catch (error) {
    const detail = toDisplayString(error);
    setAudiotoolStatus(`Apply failed: ${detail}`, "error");
    appendConsoleLine("error", detail);

    if (activeDocument) {
      await stopActiveDocument(
        "Document stopped after apply error. Reconnect before retrying.",
      );
    }

    postAudiotoolResult(requestId, {
      ok: false,
      error: detail,
    });
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

      const pendingAudiotoolRequests = new Map();

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

      window.addEventListener("message", (event) => {
        const message = event.data;
        if (!message || message.source !== "audiotool-host") {
          return;
        }
        if (message.type !== "audiotool.result") {
          return;
        }

        const pending = pendingAudiotoolRequests.get(message.requestId);
        if (!pending) {
          return;
        }

        pendingAudiotoolRequests.delete(message.requestId);

        if (message.ok) {
          pending.resolve(message.payload);
        } else {
          pending.reject(new Error(message.error || "Audiotool apply failed."));
        }
      });

      window.audiotool = {
        apply(payload) {
          return new Promise((resolve, reject) => {
            const requestId =
              globalThis.crypto?.randomUUID?.() ||
              \`req-\${Date.now()}-\${Math.random().toString(16).slice(2)}\`;

            pendingAudiotoolRequests.set(requestId, { resolve, reject });
            send("audiotool.apply", { requestId, payload });
          });
        },
      };
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

  runtimeFrame.srcdoc = html;

  const packageLabel = packageList.length
    ? packageList
        .map((pkg) => (pkg.version ? `${pkg.name}@${pkg.version}` : pkg.name))
        .join(", ")
    : "(none)";

  appendConsoleLine("system", `Running with packages: ${packageLabel}`);
  appendConsoleLine(
    "system",
    "Script runtime is hidden; use project preview and console to inspect results.",
  );
}

window.addEventListener("message", (event) => {
  if (event.source !== runtimeFrame.contentWindow) {
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
    return;
  }

  if (payload.type === "audiotool.apply") {
    queueAudiotoolTask(() => processAudiotoolApplyRequest(payload.payload)).catch(
      (error) => {
        appendConsoleLine("error", toDisplayString(error));
      },
    );
  }
});

runButton.addEventListener("click", runCode);
resetButton.addEventListener("click", () => {
  editor.setValue(defaultSource);
  packageInput.value = defaultPackages;
  runCode();
});

projectInput.addEventListener("input", () => {
  if (activeProject && projectInput.value.trim() !== activeProject) {
    setAudiotoolStatus(
      "Project input changed. Click Connect Project to switch sync target.",
      "warn",
    );
  }
});

authButton.addEventListener("click", async () => {
  if (!loginStatus) {
    setAudiotoolStatus("Auth status not ready yet, try again.", "warn");
    return;
  }

  if (loginStatus.loggedIn) {
    loginStatus.logout();
    return;
  }

  try {
    setAudiotoolStatus("Redirecting to Audiotool login...", "warn");
    await loginStatus.login();
  } catch (error) {
    setAudiotoolStatus(`Login failed: ${toDisplayString(error)}`, "error");
  }
});

connectButton.addEventListener("click", () => {
  const project = projectInput.value.trim();
  queueAudiotoolTask(async () => {
    try {
      await connectProject(project);
    } catch (error) {
      const detail = toDisplayString(error);
      setAudiotoolStatus(`Connect failed: ${detail}`, "error");
      appendConsoleLine("error", detail);
    }
  });
});

disconnectButton.addEventListener("click", () => {
  queueAudiotoolTask(() => stopActiveDocument("Disconnected from project."));
});

openProjectButton.addEventListener("click", () => {
  if (!activeProjectStudioUrl) {
    return;
  }

  window.open(activeProjectStudioUrl, "_blank");
});

reloadPreviewButton.addEventListener("click", () => {
  if (!activeProjectStudioUrl) {
    return;
  }

  setProjectPreview(
    activeProjectStudioUrl,
    "Project preview could not be loaded in this frame. Open it in a new tab.",
  );
  appendConsoleLine(
    "system",
    "Preview reloaded. If login still fails inside iframe, continue in Open Project Tab.",
  );
});

function setVideoCurrentTime(seconds) {
  localVideoPreview.currentTime = clampVideoTime(seconds);
  updateTransportUi();
}

function seekVideoBy(deltaSeconds) {
  setVideoCurrentTime((localVideoPreview.currentTime || 0) + deltaSeconds);
}

videoPlayPauseButton.addEventListener("click", () => {
  if (!selectedVideoFile) {
    return;
  }

  if (localVideoPreview.paused) {
    void localVideoPreview.play();
  } else {
    localVideoPreview.pause();
  }
  updateTransportUi();
});

videoBackFiveButton.addEventListener("click", () => {
  seekVideoBy(-5);
});

videoForwardFiveButton.addEventListener("click", () => {
  seekVideoBy(5);
});

videoToStartButton.addEventListener("click", () => {
  setVideoCurrentTime(0);
});

setImportMarkerButton.addEventListener("click", () => {
  setImportMarker(localVideoPreview.currentTime || 0);
  appendConsoleLine(
    "system",
    `Set import marker to ${formatTimestamp(importMarkerSeconds)}.`,
  );
});

jumpImportMarkerButton.addEventListener("click", () => {
  setVideoCurrentTime(importMarkerSeconds);
});

videoSeekSlider.addEventListener("input", () => {
  if (videoSeekSlider.disabled) {
    return;
  }

  const next = Number(videoSeekSlider.value);
  setVideoCurrentTime(next);
});

localVideoPreview.addEventListener("loadedmetadata", () => {
  if (!Number.isFinite(importMarkerSeconds) || importMarkerSeconds <= 0) {
    setImportMarker(0);
  } else {
    setImportMarker(importMarkerSeconds);
  }
  updateTransportUi();
});

localVideoPreview.addEventListener("timeupdate", () => {
  updateTransportUi();
});

localVideoPreview.addEventListener("play", () => {
  updateTransportUi();
});

localVideoPreview.addEventListener("pause", () => {
  updateTransportUi();
});

videoFileInput.addEventListener("change", () => {
  const file = videoFileInput.files?.[0];
  if (!file) {
    selectedVideoFile = null;
    selectedAudioBuffer = null;
    revokeSelectedVideoUrl();
    localVideoPreview.removeAttribute("src");
    setImportMarker(0);
    updateTransportUi();
    setVideoStatus("No video selected yet.", "warn");
    updateControls();
    return;
  }

  queueAudiotoolTask(async () => {
    selectedVideoFile = file;
    selectedAudioBuffer = null;
    revokeSelectedVideoUrl();
    selectedVideoObjectUrl = URL.createObjectURL(file);
    localVideoPreview.src = selectedVideoObjectUrl;
    localVideoPreview.load();
    setImportMarker(0);
    updateTransportUi();
    setVideoStatus(
      `Selected ${file.name}. Decoding audio track for import...`,
      "warn",
    );
    updateControls();

    try {
      const decodedAudio = await decodeAudioTrack(file);
      selectedAudioBuffer = decodedAudio;
      setVideoStatus(
        `Ready: ${file.name} (${formatDuration(decodedAudio.duration)}), ${decodedAudio.numberOfChannels} channels @ ${decodedAudio.sampleRate}Hz.`,
        "ok",
      );
      appendConsoleLine(
        "system",
        `Decoded local video audio: ${file.name}, duration ${decodedAudio.duration.toFixed(2)}s.`,
      );
    } catch (error) {
      selectedAudioBuffer = null;
      const detail = toDisplayString(error);
      setVideoStatus(
        `Failed to decode audio from ${file.name}. Try another file. (${detail})`,
        "error",
      );
      appendConsoleLine("error", detail);
    } finally {
      updateControls();
    }
  });
});

importAudioButton.addEventListener("click", () => {
  queueAudiotoolTask(async () => {
    if (!selectedVideoFile || !selectedAudioBuffer) {
      setVideoStatus("Select a video file before importing audio.", "warn");
      return;
    }

    if (!activeDocument) {
      setAudiotoolStatus("Connect a project before importing audio.", "warn");
      return;
    }

    isImportingAudio = true;
    updateControls();
    setVideoStatus("Importing audio to connected project...", "warn");

    try {
      const result = await importSelectedVideoAudio();
      const modeText = result.replacePreviousImports
        ? "replaced previous imported regions and imported"
        : "imported";
      const message =
        `Successfully ${modeText} audio sample ${result.sampleName} at ${formatDuration(result.importPositionSeconds)} ` +
        `for ${formatDuration(result.durationSeconds)} duration. Edit it in Audiotool Studio now.`;
      setVideoStatus(message, "ok");
      appendConsoleLine("system", message);
      setAudiotoolStatus(
        "Audio imported into project timeline. Open project tab to edit audio.",
        "ok",
      );
    } catch (error) {
      const detail = toDisplayString(error);
      setVideoStatus(`Audio import failed: ${detail}`, "error");
      appendConsoleLine("error", detail);
      setAudiotoolStatus(`Audio import failed: ${detail}`, "error");
    } finally {
      isImportingAudio = false;
      updateControls();
    }
  });
});

async function initializeAudiotoolAuth() {
  isInitializingAuth = true;
  updateControls();
  setAudiotoolStatus("Initializing Audiotool authentication...", "warn");

  const redirectUrl = getRedirectUrl();
  redirectUrlElement.textContent = redirectUrl;

  try {
    loginStatus = await getLoginStatus({
      clientId: audiotoolClientId,
      redirectUrl,
      scope: audiotoolScope,
    });

    if (loginStatus.loggedIn) {
      const userName = await loginStatus.getUserName();
      setAudiotoolStatus(
        `Logged in as ${toDisplayString(userName)}. Connect a project to start syncing.`,
        "ok",
      );
      await ensureClient();
      appendConsoleLine("system", "Audiotool client initialized.");
      if (!canEmbedAudiotoolStudio) {
        setAudiotoolStatus(
          "Logged in. Embedded preview is disabled on this host; use Open Project Tab for Studio.",
          "warn",
        );
      }
    } else {
      setAudiotoolStatus("Logged out. Click Login to authorize this app.", "warn");
    }
  } catch (error) {
    const detail = toDisplayString(error);
    setAudiotoolStatus(`Auth setup failed: ${detail}`, "error");
    appendConsoleLine("error", detail);
  } finally {
    isInitializingAuth = false;
    updateControls();
  }
}

editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);

setProjectPreview("", "Log in and connect a project to show the Audiotool workspace here.");
setImportMarker(0);
updateTransportUi();
setVideoStatus("No video selected yet. Start by choosing a local video file.", "warn");
runCode();
initializeAudiotoolAuth();

window.addEventListener("beforeunload", () => {
  revokeSelectedVideoUrl();
  if (activeDocument) {
    void activeDocument.stop();
  }
});
