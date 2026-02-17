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

## Deploy to GitHub Pages

This repo includes a Pages workflow at:

`.github/workflows/deploy-pages.yml`

### One-time GitHub setup

1. Go to **Settings -> Pages** for the repository.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from Actions tab).

### OAuth redirect setup for deployed site

For a project page deployment, your app URL is:

`https://<github-user>.github.io/<repo-name>/`

Add that exact URL (including trailing slash) as an additional redirect URI in
your Audiotool app settings.

Keep local dev redirect too:

`http://127.0.0.1:5173/`

## Audiotool app setup

Configured client ID:

`7c3188d7-220f-4d34-92a6-608acc8ed4eb`

Register this redirect URI in your Audiotool application settings:

`http://127.0.0.1:5173/`

Use scopes:

`project:write sample:write`

If you previously logged in with only `project:write`, log out and log in again
after updating scopes so the new token includes sample permissions.

## Workflow

1. Login.
2. Connect a project (Studio URL or UUID).
3. Select a local video file.
4. Set marker using the transport controls.
5. Click **Upload Video Audio as Sample**.
6. Click **Place Sample on Timeline at Marker** (uses the uploaded sample).

The sample-name input accepts either:

- `<uuid>`
- `samples/<uuid>`

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
