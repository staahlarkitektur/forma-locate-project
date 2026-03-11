# Locate Project

A [Forma](https://app.autodeskforma.com) embedded view extension that locates your Forma project in the real world — in case you've named your project cryptically.

## What it does

Opens as a panel inside Forma and shows:

- **Interactive map** centred on the project's geographic coordinates
- **Address** looked up from those coordinates (via OpenStreetMap)
- **Coordinates** in both DMS and decimal formats, with a one-click copy button
- **Open in Google Maps** link
- **Project metadata** — name, region (EU/US), and timezone

## How to access it

The extension is registered in the Forma Developer Portal and available as an embedded view in Forma.

1. Open a project in [Forma](https://app.autodeskforma.com)
2. Click the extensions panel on the right-hand side
3. Find **Locate Project** and open it

The extension reads the project's geographic location automatically — no input needed.

## Development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Load it as a local extension in the Forma Developer Portal to test against real project data.

## Deploy

```bash
npm run deploy
```

Builds and publishes to GitHub Pages at:
`https://staahlarkitektur.github.io/forma-locate-project/`

## Tech

- React + TypeScript + Vite
- Tailwind CSS
- [forma-embedded-view-sdk](https://www.npmjs.com/package/forma-embedded-view-sdk)
- OpenStreetMap / Nominatim for reverse geocoding
