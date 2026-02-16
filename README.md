# Video Audio Importer for Audiotool

This app imports the audio track from a **local video file** into an Audiotool
project timeline at an exact marker position.

It is intentionally focused on the import workflow only (no Monaco sandbox UI).

## Quick start

```bash
npm install
npm run dev
```

Open:

`http://127.0.0.1:5173/`

## Audiotool app setup

Configured client ID:

`7c3188d7-220f-4d34-92a6-608acc8ed4eb`

Register this redirect URI in your Audiotool application settings:

`http://127.0.0.1:5173/`

Use scope:

`project:write`

## Workflow

1. Login.
2. Connect a project (Studio URL or UUID).
3. Select a local video file.
4. Set marker using the transport controls.
5. Click **Import Video Audio at Marker**.

Import pipeline:

- decode local video audio in-browser,
- upload WAV to Audiotool sample service,
- call `uploadSampleFinished`,
- wait for sample conversion readiness,
- create timeline entities (`sample`, `automationCollection`, `audioRegion`).

## Notes

- On local/non-`audiotool.com` hosts, embedded Studio preview is restricted by
  browser cookie policy. Use **Open Project Tab** as the primary local workflow.
- The import button can optionally replace previously imported regions whose
  display names start with `[Video Import]`.
