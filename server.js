// ─────────────────────────────────────────────────────────────────
// server.js  —  GunnerIQ backend
//
// Serves static files AND proxies chat messages to the Anthropic API.
// The API key lives only here — it is never exposed to the browser.
//
// Usage:
//   1. npm install
//   2. Copy .env.example to .env and add your ANTHROPIC_API_KEY
//   3. node server.js   (or: npm run dev  for auto-reload)
//   4. Open http://localhost:3000/GunnerIQ.html
// ─────────────────────────────────────────────────────────────────

require('dotenv').config();
const express   = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path      = require('path');

const app    = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname)));


// ── Build the system prompt from teamContext ──────────────────────
// teamContext shape (all fields optional):
//   teamName, teamShort, league, manager, formation,
//   appName, fixtureLine, opponentName, squadSummary, recentForm
// ─────────────────────────────────────────────────────────────────
function buildSystemPrompt(teamContext) {
  const tc = teamContext || {};

  const appName      = tc.appName      || 'GunnerIQ';
  const teamName     = tc.teamName     || 'the active team';
  const teamShort    = tc.teamShort    || teamName;
  const league       = tc.league       || '';
  const manager      = tc.manager;
  const formation    = tc.formation;
  const fixtureLine  = tc.fixtureLine;
  const opponentName = tc.opponentName;
  const squadSummary = tc.squadSummary;
  const recentForm   = tc.recentForm;

  // ── Identity ──────────────────────────────────────────────────
  const identity = `You are an elite football intelligence assistant embedded in ${appName}, a dedicated app for ${teamName} supporters. You have deep expertise across every major league worldwide.`;

  // ── Expertise ─────────────────────────────────────────────────
  const expertise = `Your coverage spans:
- Tactics: formations, pressing systems, defensive shapes, transitions, set pieces, positional play
- Statistics: xG, xA, PPDA, progressive passes, defensive actions, pressing intensity
- Transfers: valuations, likely targets, contract situations, positional needs
- History: club records, iconic matches, managerial eras, legendary players across all eras
- Betting angles: value identification, key matchup factors, form-based reasoning, market edges
- Player comparisons: across eras, leagues, and positions with contextual caveats`;

  // ── Live data honesty ─────────────────────────────────────────
  const dataPolicy = `LIVE DATA STATUS: Current season live statistics are NOT connected — a real-time API integration is pending. Be transparent about this:
- If asked for exact current stats (goals, assists, league table positions this season): acknowledge you don't have a live feed, then give your best analysis based on training knowledge
- Never fabricate exact current season numbers as if they are confirmed
- Frame historical or training-data knowledge as such: "Based on my last data..." or "As of my training data..."
- For fixture predictions or form: give analytical reasoning, not made-up results`;

  // ── Active team context ───────────────────────────────────────
  const contextLines = [];
  if (teamName)    contextLines.push(`Active team: ${teamName}${league ? ' (' + league + ')' : ''}.`);
  if (manager)     contextLines.push(`Manager: ${manager}.`);
  if (formation)   contextLines.push(`Expected formation: ${formation}.`);
  if (fixtureLine) contextLines.push(`Next fixture: ${fixtureLine}.`);
  if (opponentName) contextLines.push(`Opponent: ${opponentName}.`);
  if (squadSummary) contextLines.push(`Starting XI — ${squadSummary}.`);
  if (recentForm)   contextLines.push(`${teamShort} recent form (mock data): ${recentForm}.`);
  const teamCtxBlock = contextLines.length > 0
    ? `ACTIVE TEAM CONTEXT (use this to personalise answers where relevant):\n${contextLines.join(' ')}`
    : '';

  // ── Behaviour rules ───────────────────────────────────────────
  const rules = `BEHAVIOUR RULES:
- Answer ANY football question — any team, player, era, or league. Never refuse or deflect.
- Lead with the direct answer or a strong take. Never open with "${appName}...", "As an AI...", "Great question!", or repeating the question back.
- Be opinionated. Give a specific insight or recommendation, not a generic summary.
- For ${teamShort} questions, naturally weave in the squad context above when relevant.
- Use tactical vocabulary naturally (half-spaces, compactness, PPDA, vertical compactness, transitions) but keep it readable for fans, not just analysts.
- For transfer questions: discuss realistic targets, positional needs, financial constraints, and why the move makes sense tactically.
- For betting angles: give the analytical reasoning (form, matchup, market inefficiency) clearly — never just "back them to win."
- For player comparisons: be direct about who you think is better and why, with specific reasoning.
- Keep responses under 200 words unless the user asks for a deep dive or detailed analysis.
- Never add filler. Every sentence must add value.`;

  return [identity, expertise, dataPolicy, teamCtxBlock, rules]
    .filter(s => s.trim())
    .join('\n\n');
}


// ── POST /api/v1/chat ─────────────────────────────────────────────
// Body: { teamSlug, teamContext, messages }
//   teamSlug    — e.g. 'arsenal'
//   teamContext — { teamName, teamShort, league, manager, formation,
//                   appName, fixtureLine, opponentName,
//                   squadSummary, recentForm }
//   messages    — [{ role: 'user'|'assistant', content: string }, ...]
//
// Returns: { message: string }
// ─────────────────────────────────────────────────────────────────
app.post('/api/v1/chat', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      error: 'ANTHROPIC_API_KEY is not configured on this server. Add it to your environment variables.',
    });
  }

  const { teamContext, messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required and must not be empty' });
  }

  const systemPrompt = buildSystemPrompt(teamContext);

  try {
    const response = await client.messages.create({
      model:      'claude-sonnet-4-6',  // swap to claude-opus-4-7 for deeper tactical analysis
      max_tokens: 600,
      system:     systemPrompt,
      messages:   messages,
    });

    res.json({ message: response.content[0].text });

  } catch (err) {
    console.error('[GunnerIQ] Anthropic API error:', err.message);
    const status = (err.status >= 400 && err.status < 500) ? err.status : 500;
    res.status(status).json({ error: err.message || 'Failed to get AI response' });
  }
});


// ── GET /api/v1/health ────────────────────────────────────────────
app.get('/api/v1/health', (req, res) => {
  res.json({ ok: true, model: 'claude-sonnet-4-6', keySet: !!process.env.ANTHROPIC_API_KEY });
});


// ── GET /api/upcoming-fixture/:teamSlug ───────────────────────────
// Proxies to API-Football. Returns simplified fixture object.
// Requires FOOTBALL_API_KEY and FOOTBALL_API_HOST in .env
// ─────────────────────────────────────────────────────────────────
const TEAM_IDS = {
  arsenal:      42,
  barcelona:   529,
  'real-madrid': 541,
  liverpool:    40,
  'man-city':   50,
};

app.get('/api/upcoming-fixture/:teamSlug', async (req, res) => {
  const { teamSlug } = req.params;
  console.log(`[GunnerIQ] GET /api/upcoming-fixture/${teamSlug}`);

  const teamId = TEAM_IDS[teamSlug];
  if (!teamId) {
    console.warn(`[GunnerIQ] Unknown teamSlug: ${teamSlug}`);
    return res.status(404).json({ error: 'Unknown team slug: ' + teamSlug });
  }

  if (!process.env.FOOTBALL_API_KEY) {
    console.warn('[GunnerIQ] FOOTBALL_API_KEY not set — returning 503');
    return res.status(503).json({ error: 'FOOTBALL_API_KEY not configured' });
  }

  const host = process.env.FOOTBALL_API_HOST || 'v3.football.api-sports.io';
  // API-Football free plan only allows season=2024 (2024/25). Filter by date client-side.
  const url  = `https://${host}/fixtures?team=${teamId}&season=2024`;

  console.log('[GunnerIQ] Team slug:', teamSlug);
  console.log('[GunnerIQ] Team ID:', teamId);
  console.log('[GunnerIQ] API KEY exists:', !!process.env.FOOTBALL_API_KEY);
  console.log('[GunnerIQ] API HOST:', host);
  console.log('[GunnerIQ] Request URL:', url);

  try {
    const apiRes = await fetch(url, {
      headers: {
        'x-apisports-key':  process.env.FOOTBALL_API_KEY,
        'x-apisports-host': host,
      },
    });

    console.log('[GunnerIQ] API STATUS:', apiRes.status);

    const json = await apiRes.json();
    console.log('[GunnerIQ] Total fixtures returned:', json.response ? json.response.length : 0);

    if (!apiRes.ok) throw new Error('API-Football HTTP ' + apiRes.status);

    if (!json.response || json.response.length === 0) {
      console.warn('[GunnerIQ] No fixtures in response. Errors:', JSON.stringify(json.errors));
      return res.status(404).json({
        error:    'no_fixtures_found',
        rawCount: 0,
        errors:   json.errors || null,
      });
    }

    const now = new Date();

    // Partition by date only — free plan season=2024 data may be fully finished
    const future = json.response.filter(f => new Date(f.fixture.date) > now);
    const past   = json.response.filter(f => new Date(f.fixture.date) <= now);

    console.log(`[GunnerIQ] Future fixtures: ${future.length} | Past fixtures: ${past.length}`);

    let upcoming;
    if (future.length > 0) {
      // Sort ascending, take the closest upcoming
      future.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
      upcoming = future[0];
      console.log(`[GunnerIQ] Selected upcoming: ${upcoming.fixture.date} | ${upcoming.fixture.status.short} | ${upcoming.teams.home.name} vs ${upcoming.teams.away.name}`);
    } else if (past.length > 0) {
      // No future fixtures — fall back to the most recently played match
      past.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));
      upcoming = past[0];
      console.log(`[GunnerIQ] No future fixtures — returning last played: ${upcoming.fixture.date} | ${upcoming.teams.home.name} vs ${upcoming.teams.away.name}`);
    } else {
      console.warn('[GunnerIQ] No fixtures found after date filter');
      return res.status(404).json({
        error:         'no_upcoming_fixture_after_filter',
        totalFixtures: json.response.length,
      });
    }

    const isHome      = upcoming.teams.home.id === teamId;
    const fixtureDate = new Date(upcoming.fixture.date);

    res.json({
      fixture: {
        opponent:    isHome ? upcoming.teams.away.name : upcoming.teams.home.name,
        date:        fixtureDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        time:        fixtureDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        homeAway:    isHome ? 'H' : 'A',
        competition: upcoming.league.name,
        venue:       upcoming.fixture.venue ? upcoming.fixture.venue.name : null,
        fixtureId:   upcoming.fixture.id,
      },
    });

  } catch (err) {
    console.error('[GunnerIQ] API-Football error:', err.message);
    res.status(502).json({ error: err.message });
  }
});


// ── Root redirect ─────────────────────────────────────────────────
// Visiting / (e.g. https://gunneriq.onrender.com) serves the app.
app.get('/', (req, res) => res.redirect('/GunnerIQ.html'));


// ── Start ─────────────────────────────────────────────────────────
// Bind to 0.0.0.0 so Render/Railway/Fly can route external traffic.
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  ⚽  GunnerIQ server started');
  console.log(`  →  http://localhost:${PORT}`);
  console.log(`  →  Anthropic key set:  ${!!process.env.ANTHROPIC_API_KEY}`);
  console.log(`  →  Football API key set: ${!!process.env.FOOTBALL_API_KEY}`);
  console.log('');
});
