// ─────────────────────────────────────────────────────────────────
// services/dashboardService.js
//
// Provides standings, season stats, and match selector data.
// All sync reads from DASHBOARD_DATA (mock). Async wrappers kept
// so these can be swapped for real API calls later.
//
// WHERE TO PLUG IN THE REAL API LATER:
//   GET /api/v1/teams/:slug/standings
//   GET /api/v1/teams/:slug/season-stats
//   GET /api/v1/teams/:slug/fixtures?range=recent+upcoming
// ─────────────────────────────────────────────────────────────────

var DashboardService = {

  getStandings: async function(teamSlug) {
    var data = (typeof DASHBOARD_DATA !== 'undefined') ? DASHBOARD_DATA[teamSlug] : null;
    return data ? (data.standings || null) : null;
  },

  getSeasonStats: async function(teamSlug) {
    var data = (typeof DASHBOARD_DATA !== 'undefined') ? DASHBOARD_DATA[teamSlug] : null;
    return data ? (data.seasonStats || null) : null;
  },

  // Returns ordered array: past matches → current → future
  getMatchSelector: async function(teamSlug) {
    var data = (typeof DASHBOARD_DATA !== 'undefined') ? DASHBOARD_DATA[teamSlug] : null;
    return data ? (data.matchSelector || []) : [];
  },
};
