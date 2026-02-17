import "./style.css";
import { createAudiotoolClient, getLoginStatus } from "@audiotool/nexus";

const audiotoolClientId = "7c3188d7-220f-4d34-92a6-608acc8ed4eb";
const requiredAudiotoolScopes = ["project:write", "sample:write"];
const audiotoolScope = requiredAudiotoolScopes.join(" ");
const importedRegionNamePrefix = "[Video Import]";
const canEmbedAudiotoolStudio = /(^|\.)audiotool\.com$/i.test(
  window.location.hostname,
);

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
const consoleOutput = document.getElementById("console-output");

let loginStatus = null;
let audiotoolClient = null;
let activeDocument = null;
let activeProject = "";
let activeProjectStudioUrl = "";

let isConnectingProject = false;
let isInitializingAuth = false;
let isImportingAudio = false;

let selectedVideoFile = null;
let selectedAudioBuffer = null;
let selectedVideoObjectUrl = "";
let importMarkerSeconds = 0;
let missingRequiredScopes = [];

let audiotoolQueue = Promise.resolve();

function appendConsoleLine(level, message) {
  const line = `[${level}] ${message}`;
  consoleOutput.textContent = `${consoleOutput.textContent}${line}\n`;
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function toDisplayString(value) {
  if (value instanceof Error) {
    const message = typeof value.message === "string" ? value.message.trim() : "";
    if (message) {
      return message;
    }
    return value.stack || value.name || "Unknown error";
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

function formatApiErrorDetail(errorLike) {
  const seen = new Set();

  function renderOne(err) {
    if (!err || typeof err !== "object") {
      return String(err);
    }
    if (seen.has(err)) {
      return "(circular error cause)";
    }
    seen.add(err);

    const parts = [];
    if (err instanceof Error && err.message) {
      parts.push(err.message);
    }
    if (typeof err.name === "string" && err.name && err.name !== "Error") {
      parts.push(`name=${err.name}`);
    }
    if (typeof err.code !== "undefined") {
      parts.push(`code=${String(err.code)}`);
    }
    if (typeof err.rawMessage === "string" && err.rawMessage) {
      parts.push(`raw=${err.rawMessage}`);
    }
    if (typeof err.details === "string" && err.details) {
      parts.push(`details=${err.details}`);
    }
    if (typeof err.message === "string" && !parts.length) {
      parts.push(err.message);
    }

    const ownKeys = Object.getOwnPropertyNames(err);
    if (!parts.length && ownKeys.length) {
      const entries = ownKeys
        .filter((key) => key !== "stack" && key !== "cause")
        .map((key) => `${key}=${toDisplayString(err[key])}`);
      if (entries.length) {
        parts.push(entries.join(", "));
      }
    }

    let text = parts.join(" | ") || toDisplayString(err);
    if (err.cause) {
      text = `${text} -> cause: ${renderOne(err.cause)}`;
    }
    return text;
  }

  return renderOne(errorLike);
}

function isLikelyScopeErrorText(detail) {
  const text = String(detail || "").toLowerCase();
  return (
    text.includes("scope") ||
    text.includes("permission") ||
    text.includes("forbidden") ||
    text.includes("unauth") ||
    text.includes("denied") ||
    text.includes("403")
  );
}

function isLikelyValidationErrorText(detail) {
  const text = String(detail || "").toLowerCase();
  return (
    text.includes("invalid") ||
    text.includes("argument") ||
    text.includes("bad request") ||
    text.includes("out of range") ||
    text.includes("must be") ||
    text.includes("failed to parse") ||
    text.includes("malformed") ||
    text.includes("400")
  );
}

function decodeBase64Url(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded =
    normalized.length % 4 === 0
      ? normalized
      : `${normalized}${"=".repeat(4 - (normalized.length % 4))}`;
  return atob(padded);
}

function extractGrantedScopesFromToken(token) {
  if (typeof token !== "string") {
    return [];
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return [];
  }

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1]));
    const rawScope =
      typeof payload.scope === "string"
        ? payload.scope
        : typeof payload.scp === "string"
          ? payload.scp
          : Array.isArray(payload.scope)
            ? payload.scope.join(" ")
            : "";
    if (!rawScope) {
      return [];
    }
    return rawScope.split(/\s+/).filter(Boolean);
  } catch {
    return [];
  }
}

async function refreshMissingRequiredScopes() {
  missingRequiredScopes = [];
  if (!loginStatus || !loginStatus.loggedIn) {
    return;
  }

  const tokenResult = await loginStatus.getToken();
  if (tokenResult instanceof Error) {
    appendConsoleLine(
      "warn",
      `Could not inspect granted scopes from token: ${formatApiErrorDetail(tokenResult)}`,
    );
    return;
  }

  const grantedScopes = extractGrantedScopesFromToken(tokenResult);
  if (!grantedScopes.length) {
    appendConsoleLine(
      "system",
      "Could not decode OAuth scopes from token payload; continuing without scope pre-check.",
    );
    return;
  }

  missingRequiredScopes = requiredAudiotoolScopes.filter(
    (scope) => !grantedScopes.includes(scope),
  );
  if (missingRequiredScopes.length) {
    appendConsoleLine(
      "warn",
      `Missing required scopes: ${missingRequiredScopes.join(", ")}. Logout and login again after updating app scopes if needed.`,
    );
  }
}

function isErrorResult(result) {
  return result instanceof Error;
}

function setAudiotoolStatus(message, state = "warn") {
  audiotoolStatusElement.textContent = message;
  audiotoolStatusElement.dataset.state = state;
}

function setVideoStatus(message, state = "warn") {
  videoStatusElement.textContent = message;
  videoStatusElement.dataset.state = state;
}

function queueAudiotoolTask(task) {
  const nextTask = audiotoolQueue.then(task, task);
  audiotoolQueue = nextTask.catch(() => {});
  return nextTask;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const wholeSeconds = Math.floor(seconds);
  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const remainder = wholeSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }

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

function revokeSelectedVideoUrl() {
  if (!selectedVideoObjectUrl) {
    return;
  }

  URL.revokeObjectURL(selectedVideoObjectUrl);
  selectedVideoObjectUrl = "";
}

async function decodeAudioTrack(file) {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    throw new Error("Web Audio API is unavailable in this browser.");
  }

  const audioContext = new AudioContextCtor();
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

function estimateAudioPeak(audioBuffer) {
  if (!audioBuffer || audioBuffer.length <= 0) {
    return 0;
  }

  const sampleWindow = Math.min(audioBuffer.length, 200000);
  const stride = Math.max(1, Math.floor(audioBuffer.length / sampleWindow));
  let peak = 0;

  for (let channelIndex = 0; channelIndex < audioBuffer.numberOfChannels; channelIndex += 1) {
    const channel = audioBuffer.getChannelData(channelIndex);
    for (let sampleIndex = 0; sampleIndex < channel.length; sampleIndex += stride) {
      const abs = Math.abs(channel[sampleIndex]);
      if (abs > peak) {
        peak = abs;
      }
    }
  }

  return peak;
}

function secondsToTicksAtBpm(seconds, bpm) {
  const ticksPerBeat = 3840;
  return Math.round((seconds * bpm * ticksPerBeat) / 60);
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

function chooseDocumentSampleName(uploadedSampleName, existingSampleNames) {
  const prefixedCount = existingSampleNames.filter((name) =>
    String(name).startsWith("samples/"),
  ).length;
  const unprefixedCount = existingSampleNames.filter(
    (name) => name && !String(name).startsWith("samples/"),
  ).length;

  const uploaded = String(uploadedSampleName || "");
  const stripped = uploaded.replace(/^samples\//, "");

  // Some projects appear to use unprefixed sample names internally.
  if (unprefixedCount > prefixedCount && stripped) {
    return {
      sampleNameForDocument: stripped,
      reason: `existing samples favor unprefixed format (${unprefixedCount} vs ${prefixedCount})`,
    };
  }

  return {
    sampleNameForDocument: uploaded,
    reason: `existing samples favor prefixed format (${prefixedCount} vs ${unprefixedCount})`,
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
    !selectedAudioBuffer ||
    !selectedVideoFile ||
    !activeDocument ||
    Boolean(missingRequiredScopes.length) ||
    isConnectingProject ||
    isImportingAudio;

  if (missingRequiredScopes.length) {
    importAudioButton.title = `Missing OAuth scopes: ${missingRequiredScopes.join(", ")}`;
  } else {
    importAudioButton.removeAttribute("title");
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

async function stopActiveDocument(note = "Disconnected from project.") {
  if (!activeDocument) {
    return;
  }

  const previousDoc = activeDocument;
  const previousProject = activeProject;

  activeDocument = null;
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
    projectInput.value = studioUrl;

    setProjectPreview(
      studioUrl,
      "Project preview could not be loaded in this frame. Open it in a new tab.",
    );
    setAudiotoolStatus(`Connected to project: ${projectReference}`, "ok");
    appendConsoleLine("system", `Connected Audiotool project: ${projectReference}`);
    appendConsoleLine(
      "system",
      "Project preview updated. If frame login is blocked, continue in Open Project Tab.",
    );

    if (!canEmbedAudiotoolStudio) {
      appendConsoleLine(
        "system",
        "Embedded preview is disabled on local/non-audiotool hosts. Open Project Tab is the supported local workflow.",
      );
    }

    if (selectedAudioBuffer && selectedVideoFile) {
      setVideoStatus(
        `Project connected. Click "Import Video Audio at Marker" to transfer ${selectedVideoFile.name}.`,
        "warn",
      );
    }
  } finally {
    isConnectingProject = false;
    updateControls();
  }
}

async function uploadAudioAsSample(fileName, audioBuffer) {
  const client = await ensureClient();
  const wavBlob = audioBufferToWavBlob(audioBuffer);
  const sampleDisplayName = sanitizeDisplayName(fileName);

  const sampleCandidates = [
    {
      sample: {
        displayName: sampleDisplayName,
        description: `Imported from local video file: ${fileName}`,
        sampleType: 1,
        usage: 3,
        tags: ["video-import", "local-workflow"],
      },
      label: "displayName+description+sampleType+usage+tags",
    },
    {
      sample: {
        displayName: sampleDisplayName,
        sampleType: 1,
        usage: 3,
      },
      label: "displayName+sampleType+usage",
    },
    {
      sample: {
        displayName: sampleDisplayName,
      },
      label: "displayName-only",
    },
    {
      sample: {},
      label: "empty-sample",
    },
  ];

  let createResult = null;
  let lastCreateDetail = "CreateSample failed for unknown reason.";
  for (let index = 0; index < sampleCandidates.length; index += 1) {
    const candidate = sampleCandidates[index];
    appendConsoleLine(
      "system",
      `CreateSample attempt ${index + 1}/${sampleCandidates.length} (${candidate.label}).`,
    );

    try {
      const result = await client.api.sampleService.createSample(candidate);
      if (!isErrorResult(result)) {
        createResult = result;
        break;
      }

      const detail = formatApiErrorDetail(result);
      lastCreateDetail = detail;
      appendConsoleLine(
        "warn",
        `CreateSample attempt ${index + 1} failed: ${detail}`,
      );

      // Validation errors may be caused by payload shape; retry with a smaller payload.
      if (isLikelyValidationErrorText(detail) && index < sampleCandidates.length - 1) {
        continue;
      }
      break;
    } catch (error) {
      const detail = formatApiErrorDetail(error);
      lastCreateDetail = detail;
      appendConsoleLine(
        "warn",
        `CreateSample attempt ${index + 1} threw: ${detail}`,
      );
      if (isLikelyValidationErrorText(detail) && index < sampleCandidates.length - 1) {
        continue;
      }
      break;
    }
  }

  if (!createResult) {
    const maybeScopeHint = isLikelyScopeErrorText(lastCreateDetail)
      ? ` Required scopes include: ${requiredAudiotoolScopes.join(", ")}. If scopes changed, logout and login again.`
      : "";
    throw new Error(`CreateSample failed: ${lastCreateDetail}.${maybeScopeHint}`);
  }

  const sampleName = createResult.sample?.name;
  const uploadEndpoint = createResult.uploadEndpoint;
  if (!sampleName || !uploadEndpoint?.uploadUrl) {
    throw new Error("CreateSample did not return a valid upload endpoint.");
  }

  const uploadHeaders = new Headers();
  for (const [headerName, headerValue] of Object.entries(uploadEndpoint.headers || {})) {
    if (headerName.toLowerCase() === "host") {
      continue;
    }
    uploadHeaders.set(headerName, headerValue);
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
    throw new Error(`UploadSampleFinished failed: ${formatApiErrorDetail(finishedResult)}`);
  }

  return {
    sampleName,
    sampleDisplayName,
    wavBlob,
  };
}

function isSampleReady(sample) {
  if (!sample) {
    return false;
  }

  const hasUrl = (value) => typeof value === "string" && value.trim().length > 0;
  return Boolean(
    hasUrl(sample.wavUrl) ||
      hasUrl(sample.mp3Url) ||
      hasUrl(sample.flacUrl) ||
      hasUrl(sample.previewMp3Url),
  );
}

function isLikelyPermissionError(error) {
  const text = toDisplayString(error).toLowerCase();
  return (
    text.includes("permission") ||
    text.includes("forbidden") ||
    text.includes("unauth") ||
    text.includes("denied")
  );
}

async function waitForSampleReady(sampleName, opts = {}) {
  const timeoutMs = Number.isFinite(opts.timeoutMs) ? opts.timeoutMs : 180000;
  const pollMs = Number.isFinite(opts.pollMs) ? opts.pollMs : 1500;

  const client = await ensureClient();
  const deadline = Date.now() + timeoutMs;
  let lastDetail = "Sample conversion is still in progress.";

  while (Date.now() < deadline) {
    const sampleResult = await client.api.sampleService.getSample({
      name: sampleName,
    });

    if (isErrorResult(sampleResult)) {
      lastDetail = formatApiErrorDetail(sampleResult);
      if (isLikelyPermissionError(sampleResult)) {
        appendConsoleLine(
          "warn",
          `Skipping sample readiness polling due permissions on getSample: ${lastDetail}`,
        );
        return null;
      }
      await sleep(pollMs);
      continue;
    }

    if (isSampleReady(sampleResult.sample)) {
      appendConsoleLine(
        "system",
        `Sample URLs ready (wav/mp3/flac available): ${sampleName}`,
      );
      return sampleResult.sample;
    }

    lastDetail = "Sample exists but conversion has not finished yet.";
    await sleep(pollMs);
  }

  throw new Error(
    `Sample conversion did not complete in time for ${sampleName}. ${lastDetail}`,
  );
}

function isLikelySampleNotReadyError(error) {
  const text = toDisplayString(error).toLowerCase();
  return (
    (text.includes("sample") &&
      (text.includes("not found") ||
        text.includes("missing") ||
        text.includes("unknown") ||
        text.includes("unavailable") ||
        text.includes("404"))) ||
    (text.includes("convert") && text.includes("sample"))
  );
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

  let usedTrackId = "";
  let createdTrack = false;
  let playbackSource = "seeded-automation-collection";

  await activeDocument.modify((t) => {
    const existingAudioRegions = t.entities.ofTypes("audioRegion").get();
    const previousImportedRegions = [];

    if (replacePreviousImports) {
      for (const region of existingAudioRegions) {
        const regionName = region.fields?.region?.fields?.displayName?.value || "";
        if (regionName.startsWith(importedRegionNamePrefix)) {
          previousImportedRegions.push(region);
          t.remove(region);
        }
      }
    }

    const config = t.entities.ofTypes("config").getOne();
    const bpm = config ? config.fields.tempoBpm.value : 125;

    const existingAudioTracks = t.entities.ofTypes("audioTrack").get();
    const existingSampleNames = t
      .entities.ofTypes("sample")
      .get()
      .map((sampleEntity) => sampleEntity.fields.sampleName.value)
      .filter(Boolean);

    const { sampleNameForDocument, reason: sampleNameChoiceReason } =
      chooseDocumentSampleName(sampleName, existingSampleNames);
    appendConsoleLine(
      "system",
      `Sample entity naming: using "${sampleNameForDocument}" because ${sampleNameChoiceReason}.`,
    );

    const trackSortByOrder = (a, b) =>
      a.fields.orderAmongTracks.value - b.fields.orderAmongTracks.value;
    const enabledTracks = existingAudioTracks
      .filter((currentTrack) => currentTrack.fields.isEnabled.value)
      .sort(trackSortByOrder);

    const nonImportedAudioRegions = existingAudioRegions.filter(
      (region) =>
        !(region.fields?.region?.fields?.displayName?.value || "").startsWith(
          importedRegionNamePrefix,
        ),
    );
    const preferredTrackIds = new Set(
      nonImportedAudioRegions.map((region) => region.fields.track.value.entityId),
    );
    const enabledPreferredTracks = enabledTracks.filter((currentTrack) =>
      preferredTrackIds.has(currentTrack.id),
    );

    const previousImportedTrackId =
      replacePreviousImports && previousImportedRegions.length
        ? previousImportedRegions[0].fields.track.value.entityId
        : "";
    const previousImportedTrack = previousImportedTrackId
      ? t.entities.ofTypes("audioTrack").getEntity(previousImportedTrackId)
      : undefined;

    let track =
      enabledPreferredTracks[0] ||
      previousImportedTrack ||
      enabledTracks[0] ||
      [...existingAudioTracks].sort(trackSortByOrder)[0] ||
      undefined;
    if (!track) {
      const device = t.entities.ofTypes("audioDevice").getOne();
      if (!device) {
        throw new Error("Could not find an AudioDevice to attach an AudioTrack.");
      }

      const tracks = t
        .entities.ofTypes("audioTrack", "noteTrack", "patternTrack", "automationTrack")
        .get();
      const maxOrder = tracks.reduce(
        (value, current) => Math.max(value, current.fields.orderAmongTracks.value),
        -1,
      );

      track = t.create("audioTrack", {
        player: device.location,
        orderAmongTracks: maxOrder + 1,
      });
      createdTrack = true;
    }

    usedTrackId = track.id;
    let trackSelectionReason = enabledPreferredTracks[0]
      ? "enabled-track-with-existing-audio"
      : previousImportedTrack
        ? "previous-imported-track"
        : enabledTracks[0]
          ? "first-enabled-audio-track"
          : "first-audio-track";

    const sampleEntity = t.create("sample", {
      sampleName: sampleNameForDocument,
      uploadStartTime: BigInt(Math.floor(Date.now() / 1000)),
    });

    const regionDurationTicks = Math.max(1, secondsToTicksAtBpm(durationSeconds, bpm));
    const regionPositionTicks = Math.max(0, secondsToTicksAtBpm(positionSeconds, bpm));
    const safeFadeTicks = Math.min(10, Math.floor(regionDurationTicks / 2));

    const playbackAutomationCollection = t.create("automationCollection", {});
    // Always seed a stable 1x playback curve for imported regions.
    const usedPositions = new Set();
    const addPlaybackEvent = (positionTicks, value) => {
      const safePosition =
        usedPositions.has(positionTicks) && positionTicks >= regionDurationTicks
          ? positionTicks + 1
          : positionTicks;
      usedPositions.add(safePosition);
      t.create("automationEvent", {
        collection: playbackAutomationCollection.location,
        positionTicks: safePosition,
        value,
        interpolation: 1,
      });
    };
    addPlaybackEvent(0, 1);
    addPlaybackEvent(regionDurationTicks, 1);

    t.create("audioRegion", {
      track: track.location,
      playbackAutomationCollection: playbackAutomationCollection.location,
      sample: sampleEntity.location,
      gain: 1,
      fadeInDurationTicks: safeFadeTicks,
      fadeOutDurationTicks: safeFadeTicks,
      region: {
        positionTicks: regionPositionTicks,
        durationTicks: regionDurationTicks,
        loopDurationTicks: regionDurationTicks,
        displayName: regionDisplayName,
      },
    });

    if (!track.fields.isEnabled.value) {
      t.update(track.fields.isEnabled, true);
      trackSelectionReason = `${trackSelectionReason}+forced-track-enabled`;
    }
    const trackPlayer = track.fields.player.value;
    const audioDevice = trackPlayer?.entityId
      ? t.entities.ofTypes("audioDevice").getEntity(trackPlayer.entityId)
      : undefined;
    if (audioDevice && !audioDevice.fields.isActive.value) {
      t.update(audioDevice.fields.isActive, true);
      trackSelectionReason = `${trackSelectionReason}+forced-device-active`;
    }
    playbackSource = `${playbackSource},track=${trackSelectionReason}`;
  });

  appendConsoleLine(
    "system",
    `Placed imported audio region on track ${usedTrackId || "(unknown)"}${createdTrack ? " (new track created)" : ""}; playback source=${playbackSource}.`,
  );
}

async function placeSampleIntoProjectWithRetry(args) {
  const retryWaitsMs = [0, 1000, 2000, 3500];
  let lastError = null;

  for (let attempt = 0; attempt < retryWaitsMs.length; attempt += 1) {
    if (retryWaitsMs[attempt] > 0) {
      await sleep(retryWaitsMs[attempt]);
    }

    try {
      await placeSampleIntoProject(args);
      return;
    } catch (error) {
      lastError = error;
      if (!isLikelySampleNotReadyError(error) || attempt === retryWaitsMs.length - 1) {
        throw error;
      }
    }
  }

  if (lastError) {
    throw lastError;
  }
}

async function importSelectedVideoAudio() {
  if (!selectedVideoFile || !selectedAudioBuffer) {
    throw new Error("Select a video file before importing audio.");
  }

  if (!activeDocument) {
    throw new Error("Connect a project before importing audio.");
  }

  if (missingRequiredScopes.length) {
    throw new Error(
      `Missing OAuth scopes: ${missingRequiredScopes.join(", ")}. Click Logout, then Login to grant updated permissions.`,
    );
  }

  const importPositionSeconds = clampVideoTime(importMarkerSeconds);
  const replacePreviousImports = replaceImportedToggle.checked;

  setVideoStatus("Uploading decoded audio as a new sample...", "warn");
  const uploadResult = await uploadAudioAsSample(
    selectedVideoFile.name,
    selectedAudioBuffer,
  );

  setVideoStatus("Waiting for sample conversion to finish...", "warn");
  const readySample = await waitForSampleReady(uploadResult.sampleName);
  if (!readySample) {
    appendConsoleLine(
      "warn",
      "Continuing without sample readiness polling result; project insertion will retry automatically.",
    );
  } else {
    appendConsoleLine(
      "system",
      `Sample conversion ready: ${uploadResult.sampleName}`,
    );
  }

  // Give backend caches/indexing a brief moment before timeline insertion.
  await sleep(1200);
  setVideoStatus("Placing sample region into project timeline...", "warn");
  await placeSampleIntoProjectWithRetry({
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

function setVideoCurrentTime(seconds) {
  localVideoPreview.currentTime = clampVideoTime(seconds);
  updateTransportUi();
}

function seekVideoBy(deltaSeconds) {
  setVideoCurrentTime((localVideoPreview.currentTime || 0) + deltaSeconds);
}

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
    "Preview reloaded. If login still fails in iframe, continue in Open Project Tab.",
  );
});

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
      if (selectedVideoFile !== file) {
        return;
      }

      selectedAudioBuffer = decodedAudio;
      const peak = estimateAudioPeak(decodedAudio);
      setVideoStatus(
        `Ready: ${file.name} (${formatDuration(decodedAudio.duration)}), ${decodedAudio.numberOfChannels} channels @ ${decodedAudio.sampleRate}Hz.`,
        "ok",
      );
      appendConsoleLine(
        "system",
        `Decoded local video audio: ${file.name}, duration ${decodedAudio.duration.toFixed(2)}s, peak ${peak.toFixed(4)}.`,
      );
      if (peak < 0.0005) {
        appendConsoleLine(
          "warn",
          "Decoded audio appears near-silent (very low peak). The source video may not contain audible track data.",
        );
      }
    } catch (error) {
      if (selectedVideoFile !== file) {
        return;
      }

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
    await refreshMissingRequiredScopes();
    updateControls();

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

    try {
      const result = await importSelectedVideoAudio();
      const modeText = result.replacePreviousImports
        ? "replaced previous imported regions and imported"
        : "imported";
      const message =
        `Successfully ${modeText} audio sample ${result.sampleName} at ${formatTimestamp(result.importPositionSeconds)} ` +
        `for ${formatDuration(result.durationSeconds)} duration.`;

      setVideoStatus(message, "ok");
      setAudiotoolStatus(
        "Audio imported into project timeline. Open project tab to edit audio.",
        "ok",
      );
      appendConsoleLine("system", message);
    } catch (error) {
      const detail = toDisplayString(error);
      setVideoStatus(`Audio import failed: ${detail}`, "error");
      setAudiotoolStatus(`Audio import failed: ${detail}`, "error");
      appendConsoleLine("error", detail);
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
  appendConsoleLine("system", `Requested OAuth scope: ${audiotoolScope}`);

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
        `Logged in as ${toDisplayString(userName)}. Connect a project to start importing.`,
        "ok",
      );
      await ensureClient();
      await refreshMissingRequiredScopes();
      if (missingRequiredScopes.length) {
        setAudiotoolStatus(
          `Logged in, but token is missing required scopes (${missingRequiredScopes.join(", ")}). Click Logout then Login.`,
          "warn",
        );
      }
      appendConsoleLine("system", "Audiotool client initialized.");

      if (!canEmbedAudiotoolStudio) {
        appendConsoleLine(
          "system",
          "Embedded preview is disabled on this host; use Open Project Tab for Studio.",
        );
      }
    } else {
      const errorText = loginStatus.error ? toDisplayString(loginStatus.error) : "";
      if (errorText) {
        setAudiotoolStatus(`Logged out: ${errorText}`, "error");
      } else {
        setAudiotoolStatus("Logged out. Click Login to authorize this app.", "warn");
      }
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

setProjectPreview("", "Log in and connect a project to show the Audiotool workspace here.");
setImportMarker(0);
updateTransportUi();
setVideoStatus("No video selected yet. Start by choosing a local video file.", "warn");
updateControls();
initializeAudiotoolAuth();

window.addEventListener("beforeunload", () => {
  revokeSelectedVideoUrl();
  if (activeDocument) {
    void activeDocument.stop();
  }
});
