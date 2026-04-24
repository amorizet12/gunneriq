# GunnerIQ

A mobile-first football intelligence app featuring AI chat, match previews, fan polls, and team stats. Built with React (CDN), vanilla JS, and an Express backend that proxies the Anthropic Claude API.

Supports Arsenal, Liverpool, Man City, Barcelona, and Real Madrid. Switch teams from the status bar inside the app.

---

## What this project is

- **Frontend**: A single HTML file (`GunnerIQ.html`) with React loaded via CDN and Babel Standalone for JSX. No build step required.
- **Backend**: An Express server (`server.js`) that:
  - Serves all static files (HTML, JS, CSS, data, services)
  - Proxies chat messages to the Anthropic Claude API (keeps your key server-side)
  - Optionally fetches live fixture data from API-Football
- **Data**: Mock data in `data/*.js` files. Flip `ApiConfig.USE_REAL_API` in `services/apiConfig.js` to `true` to switch to live APIs.

---

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher
- An [Anthropic API key](https://console.anthropic.com/) (for AI chat)
- Optional: An [API-Football key](https://www.api-football.com/) (for live fixture data — free plan available)

---

## Local setup

**1. Clone or download the project**

```bash
git clone <your-repo-url>
cd GunnerIQ_files
```

**2. Install dependencies**

```bash
npm install
```

**3. Create your `.env` file**

```bash
cp .env.example .env
```

Open `.env` and fill in your keys:

```
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
PORT=3000

FOOTBALL_API_KEY=your_api_football_key_here
FOOTBALL_API_HOST=v3.football.api-sports.io
```

`FOOTBALL_API_KEY` is optional. If it is not set, the app uses mock fixture data automatically.

**4. Start the server**

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

**5. Open the app**

```
http://localhost:3000
```

---

## Project structure

```
GunnerIQ_files/
├── server.js             # Express backend — API proxy, static file server
├── GunnerIQ.html         # App entry point — loads all scripts, CSS, React
├── app.js                # All React UI components (no hardcoded team data)
│
├── data/
│   ├── teams.js          # Club identity, colors, AI context, quiz questions
│   ├── players.js        # Squad rosters + predicted lineup layouts
│   ├── fixtures.js       # Upcoming match, form, recent results
│   ├── news.js           # Latest news articles per team
│   ├── matchStats.js     # Season averages, H2H, injury list
│   ├── polls.js          # Poll options and baseline vote counts
│   └── premium.js        # Feature list, pricing, reviews
│
├── services/
│   ├── apiConfig.js      # USE_REAL_API flag + request helper
│   ├── dataService.js    # Async orchestration — the only layer components touch
│   ├── teamService.js
│   ├── fixtureService.js
│   ├── playerService.js
│   ├── newsService.js
│   ├── matchStatsService.js
│   ├── pollService.js
│   ├── premiumService.js
│   └── aiService.js
│
├── .env                  # Your local secrets (never committed)
├── .env.example          # Template — copy to .env
├── .gitignore
└── package.json
```

---

## Adding a new team

1. Add an entry to each `data/*.js` file using the existing Arsenal block as a template.
2. The team's slug must match across all files (e.g. `'juventus'`).
3. Add the slug and API-Football team ID to the `TEAM_IDS` map in `server.js`.
4. Add the team to `TEAM_LIST` in `app.js`.

---

## Switching to live APIs

1. Open `services/apiConfig.js`
2. Set `USE_REAL_API: true`
3. Make sure `node server.js` is running with your API keys in `.env`

Each service file has commented-out API call examples showing the exact endpoint shape expected.

---

## Deployment

### Option A — Render (recommended, zero config)

Render runs Node/Express apps directly. No restructuring needed.

1. Push this project to a GitHub repository.
2. Go to [render.com](https://render.com) → New → Web Service.
3. Connect your GitHub repo.
4. Set the following in Render's dashboard:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add your environment variables under **Environment → Add Environment Variable**:
   - `ANTHROPIC_API_KEY`
   - `FOOTBALL_API_KEY` (optional)
   - `FOOTBALL_API_HOST` → `v3.football.api-sports.io`
6. Deploy. Render assigns a public URL like `https://gunneriq.onrender.com`.

> The free tier spins down after 15 minutes of inactivity. The first request after sleep takes ~30 seconds. Upgrade to a paid instance ($7/mo) to keep it always-on.

---

### Option B — Railway

Very similar to Render. Railway auto-detects Node.js apps.

1. Push to GitHub.
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub.
3. Add env vars in the Variables tab.
4. Railway auto-runs `npm start` and assigns a public URL.

---

### Option C — Vercel (requires restructuring)

Vercel is designed for frontend frameworks and serverless functions. This project is an Express app, so it does **not** deploy to Vercel directly without changes.

**What you would need to do:**
- Move each Express route (`/api/v1/chat`, `/api/upcoming-fixture/:slug`, etc.) into individual files in a `/api/` directory as Vercel serverless functions.
- Serve `GunnerIQ.html` as a static asset via `vercel.json`.

**Recommendation:** Do not do this now. Render or Railway is the right deployment target for this architecture. If you want to use Vercel long-term, migrate the frontend to Next.js (React with file-based routing) and move the backend logic to Next.js API routes. That is a larger but worthwhile refactor when the product matures.

---

### Express vs Next.js — should you switch?

**Stick with Express for now.** The current architecture is:
- Simple to understand and modify
- Zero build step for the frontend
- Easy to run locally with one command
- Straightforward to deploy to Render/Railway

**Migrate to Next.js later when:**
- You want server-side rendering or static generation for SEO
- You want to use the Vercel platform specifically
- The team grows and you want a more structured React codebase with TypeScript
- You need per-team dynamic routes (e.g. `/arsenal`, `/barcelona`)

The service layer (`services/*.js`) and data layer (`data/*.js`) are already cleanly separated and would survive a Next.js migration with minimal changes.

---

## Security checklist

- `.env` is in `.gitignore` — your keys are never committed
- The Anthropic API key is only used in `server.js` — it is never sent to the browser
- The Football API key is only used in `server.js` — same protection
- `node_modules/` is gitignored

**Before pushing to GitHub, double-check:**

```bash
git status          # .env should not appear as a tracked file
git diff --cached   # no API keys in staged files
```

---

## Environment variable reference

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Powers the AI Chat. Get one at console.anthropic.com |
| `PORT` | No | Port to listen on. Defaults to `3000`. Render sets this automatically. |
| `FOOTBALL_API_KEY` | No | Live fixture data. Free plan at api-football.com. Falls back to mock if unset. |
| `FOOTBALL_API_HOST` | No | Always `v3.football.api-sports.io`. Only needed if key is set. |
