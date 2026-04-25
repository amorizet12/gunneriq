// ─────────────────────────────────────────────────────────────────
// services/matchStatsService.js
//
// All methods are async. When ApiConfig.USE_REAL_API is false
// (the default), they return mock data instantly.
// When USE_REAL_API is true, they call the real API and fall back
// to mock data if the request fails.
//
// API endpoint: GET /api/v1/teams/:slug/match-stats
// Third-party options:
//   Understat (xG):  https://understat.com/
//   API-Football:    GET /v3/teams/statistics?team={id}&season={year}&league={id}
//   Opta/Stats Perform: enterprise API
// ─────────────────────────────────────────────────────────────────

var MatchStatsService = {

  getSeasonAverages: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        var res = await ApiConfig.request(ApiConfig.endpoints.matchStats(teamSlug));
        return res.seasonAverages || [];
      } catch (err) {
        console.warn('[MatchStatsService.getSeasonAverages] API error — using mock:', err.message);
      }
    }
    var data = MATCH_STATS_DATA[teamSlug];
    return data ? (data.seasonAverages || []) : [];
  },

  // Returns { teamWins, draws, oppWins, matchCount, description, recentMeetings }
  getH2H: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        var res = await ApiConfig.request(ApiConfig.endpoints.matchStats(teamSlug));
        return res.h2h || null;
      } catch (err) {
        console.warn('[MatchStatsService.getH2H] API error — using mock:', err.message);
      }
    }
    var data = MATCH_STATS_DATA[teamSlug];
    return data ? (data.h2h || null) : null;
  },

  // Returns [{ teamPlayer, theirPlayer, context, edge }, ...]
  getKeyBattles: async function(teamSlug) {
    var data = MATCH_STATS_DATA[teamSlug];
    return data ? (data.keyBattles || []) : [];
  },

  getInjuryList: async function(teamSlug) {
    var data = MATCH_STATS_DATA[teamSlug];
    return data ? (data.injuryList || []) : [];
  },

  // Returns { teamLabel, formation, playerInitials }
  getOpponentLineup: async function(teamSlug) {
    var empty = { teamLabel: '', formation: '', playerInitials: [] };
    var data  = MATCH_STATS_DATA[teamSlug];
    return data ? (data.opponentLineup || empty) : empty;
  },

  // Returns { recommendation, confidence, reasons, riskFactor } | null
  getMatchEdge: async function(teamSlug) {
    var data = MATCH_STATS_DATA[teamSlug];
    return data ? (data.matchEdge || null) : null;
  },
};
