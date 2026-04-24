// ─────────────────────────────────────────────────────────────────
// services/aiService.js
//
// sendMessage()     — async, calls POST /api/v1/chat on server.js
//                     which proxies to Anthropic. API key stays on
//                     the server and is never exposed to the browser.
// getMockResponse() — synchronous keyword matcher, used only for
//                     the seeded display conversation on first load.
//
// The screen context (welcome message, chips, fixture line) is now
// loaded by DataService.loadAIScreen() — AIService no longer needs
// its own getWelcomeMessage / getSuggestedPrompts helpers.
// ─────────────────────────────────────────────────────────────────

var AIService = {

  // ── Real API call ─────────────────────────────────────────────
  // Sends the full conversation history to the backend proxy.
  // conversationHistory = [{ role: 'user'|'assistant', content: string }, ...]
  sendMessage: async function(teamSlug, conversationHistory) {
    var team     = await TeamService.getTeam(teamSlug);
    var fixture  = await FixtureService.getUpcomingFixture(teamSlug);
    var form     = await FixtureService.getForm(teamSlug);
    var lineup   = await PlayerService.getLineup(teamSlug);
    var starters = await PlayerService.getStartingXI(teamSlug);
    var aiCtx    = team ? (team.aiContext || null) : null;

    // Compact squad string — gives Claude real stats to reference
    var squadSummary = '';
    if (starters && starters.length > 0) {
      squadSummary = starters.map(function(p) {
        var parts = [];
        if (p.stats.goals > 0)       parts.push(p.stats.goals + 'G');
        if (p.stats.assists > 0)     parts.push(p.stats.assists + 'A');
        if (p.stats.cleanSheets > 0) parts.push(p.stats.cleanSheets + 'CS');
        return p.position + ': ' + p.name + (parts.length ? ' (' + parts.join(' ') + ')' : '');
      }).join(' | ');
    }

    var teamFormArr = (form && (form[teamSlug] || form.team)) || [];
    var recentForm  = teamFormArr.length > 0 ? teamFormArr.join('-') : null;

    var fixtureLine  = null;
    var opponentName = null;
    if (fixture) {
      fixtureLine  = fixture.homeLabel + ' vs ' + fixture.awayLabel
                   + ' (' + (fixture.competition || '') + ', ' + fixture.date + ')';
      opponentName = fixture.isHome ? fixture.awayLabel : fixture.homeLabel;
    }

    var teamContext = {
      teamName:     team    ? team.name       : teamSlug,
      teamShort:    team    ? team.shortName  : teamSlug,
      league:       team    ? team.league     : null,
      manager:      team    ? team.manager    : null,
      formation:    lineup  ? lineup.formation : null,
      appName:      aiCtx   ? aiCtx.appName   : 'GunnerIQ',
      appTagline:   aiCtx   ? aiCtx.appTagline : '',
      fixtureLine:  fixtureLine,
      opponentName: opponentName,
      squadSummary: squadSummary,
      recentForm:   recentForm,
    };

    var res = await fetch(API_BASE_URL + '/chat', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        teamSlug:    teamSlug,
        teamContext: teamContext,
        messages:    conversationHistory,
      }),
    });

    if (!res.ok) {
      var errData = await res.json().catch(function() { return {}; });
      throw new Error(errData.error || 'Server error ' + res.status);
    }

    var data = await res.json();
    return data.message;
  },

  // ── Mock response — keyword matching ─────────────────────────
  // Used only for the seeded demo exchange shown on first load.
  getMockResponse: function(teamSlug, userMessage) {
    var aiCtx = (TEAMS_DATA[teamSlug] || {}).aiContext;
    if (!aiCtx) return "I'm not configured for this team yet.";

    var lower      = userMessage.toLowerCase();
    var keywordMap = aiCtx.keywordResponses || {};
    var keys       = Object.keys(keywordMap);

    for (var i = 0; i < keys.length; i++) {
      if (lower.indexOf(keys[i]) !== -1) return keywordMap[keys[i]];
    }

    var fallbacks = aiCtx.fallbackResponses || ["I'm not sure about that one."];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  },
};
