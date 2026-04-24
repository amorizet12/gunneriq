// ─────────────────────────────────────────────────────────────────
// services/dataService.js
//
// Async orchestration layer — the ONLY thing UI components touch.
//
// Components call DataService.load*Screen() and get back a plain
// data object. They never import or call individual services.
// They never call fetch() or ApiConfig.request() directly.
//
// Swap path:
//   Today  → services call mock data (ApiConfig.USE_REAL_API = false)
//   Day 1  → flip ApiConfig.USE_REAL_API = true, ensure backend is running
//   Done   → UI unchanged, real data flows through the same load*Screen calls
//
// API endpoints are defined in apiConfig.js.
// Mock data is defined in data/*.js.
// Service files handle the mock ↔ real switch per method.
// ─────────────────────────────────────────────────────────────────

var DataService = {

  // ── Simulated network latency for development ─────────────────
  // Gives loading skeletons enough time to render realistically.
  // Set to 0 before deploying to production.
  MOCK_DELAY_MS: 380,

  _delay: function() {
    return new Promise(function(resolve) {
      setTimeout(resolve, ApiConfig.USE_REAL_API ? 0 : DataService.MOCK_DELAY_MS);
    });
  },


  // ── Home screen ───────────────────────────────────────────────
  // Loads: fixture hero card, news, lineup + player map
  // API readiness: swap FixtureService, NewsService, PlayerService internals
  loadHomeScreen: async function(teamSlug) {
    await this._delay();

    var results = await Promise.all([
      FixtureService.getFixtureDisplay(teamSlug),
      NewsService.getLatestNews(teamSlug, 4),
      PlayerService.getPlayerMap(teamSlug),
      PlayerService.getLineup(teamSlug),
    ]);

    return {
      fixture:   results[0],
      news:      results[1],
      playerMap: results[2],
      lineup:    results[3],
    };
  },


  // ── Match Hub screen ──────────────────────────────────────────
  // Loads: fixture header, all 4 tabs worth of data in one shot
  // API readiness: swap MatchStatsService, FixtureService, PollService, PlayerService internals
  loadMatchScreen: async function(teamSlug) {
    await this._delay();

    var form = await FixtureService.getForm(teamSlug);

    var results = await Promise.all([
      FixtureService.getUpcomingFixture(teamSlug),
      MatchStatsService.getSeasonAverages(teamSlug),
      MatchStatsService.getH2H(teamSlug),
      MatchStatsService.getInjuryList(teamSlug),
      MatchStatsService.getOpponentLineup(teamSlug),
      MatchStatsService.getKeyBattles(teamSlug),
      PollService.getScorePoll(teamSlug),
      PlayerService.getPlayerMap(teamSlug),
      PlayerService.getLineup(teamSlug),
      FixtureService.getRecentResults(teamSlug),
    ]);

    return {
      fixture:       results[0],
      stats:         results[1],
      h2h:           results[2],
      injuryList:    results[3],
      oppLineup:     results[4],
      keyBattles:    results[5],
      scorePoll:     results[6],
      playerMap:     results[7],
      lineup:        results[8],
      recentResults: results[9],
      formTeam:      form.team     || [],
      formOpponent:  form.opponent || [],
    };
  },


  // ── Fan Zone screen ───────────────────────────────────────────
  // Loads: lineup poll, quiz questions
  // Streak / playedToday come from localStorage and stay synchronous.
  // API readiness: swap PollService.getLineupPoll, TeamService.getQuiz internals
  loadFanScreen: async function(teamSlug) {
    await this._delay();

    var results = await Promise.all([
      PollService.getLineupPoll(teamSlug),
      TeamService.getQuiz(teamSlug),
    ]);

    return {
      lineupPoll: results[0],
      quiz:       results[1],
    };
  },


  // ── Premium screen ────────────────────────────────────────────
  // Loads: feature list, pricing plans, reviews
  // API readiness: swap PremiumService internals
  loadPremiumScreen: async function() {
    await this._delay();

    var results = await Promise.all([
      PremiumService.getLockedFeatures(),
      PremiumService.getPlans(),
      PremiumService.getReviews(),
    ]);

    return {
      features: results[0],
      plans:    results[1],
      reviews:  results[2],
    };
  },


  // ── AI Chat screen ────────────────────────────────────────────
  // Loads: AI context config, prompt chips, welcome message, fixture context line
  // The chat itself (sendMessage) is handled separately in AIService.
  // API readiness: swap TeamService.getTeam, FixtureService.getUpcomingFixture
  loadAIScreen: async function(teamSlug) {
    await this._delay();

    var results = await Promise.all([
      TeamService.getTeam(teamSlug),
      FixtureService.getUpcomingFixture(teamSlug),
    ]);

    var team    = results[0];
    var fixture = results[1];
    var aiCtx   = team ? (team.aiContext || null) : null;

    return {
      aiCtx:   aiCtx,
      prompts: aiCtx ? (aiCtx.suggestedPrompts || []) : [],
      welcome: aiCtx ? aiCtx.welcomeMessage : "Hello! How can I help you?",
      ctxLine: fixture
        ? fixture.homeLabel + ' vs ' + fixture.awayLabel + ' · ' + fixture.date + ' · ' + fixture.time
        : null,
    };
  },
};
