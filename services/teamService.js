// ─────────────────────────────────────────────────────────────────
// services/teamService.js
//
// All methods are async. When ApiConfig.USE_REAL_API is false
// (the default), they return mock data instantly.
// When USE_REAL_API is true, they call the real API and fall back
// to mock data if the request fails.
//
// API endpoint: GET /api/v1/teams/:slug
// ─────────────────────────────────────────────────────────────────

var TeamService = {

  getTeam: async function(slug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        return await ApiConfig.request(ApiConfig.endpoints.team(slug));
      } catch (err) {
        console.warn('[TeamService.getTeam] API error — using mock:', err.message);
      }
    }
    return TEAMS_DATA[slug] || null;
  },

  getActiveTeam: async function() {
    return this.getTeam(APP_CONFIG.activeTeamSlug);
  },

  getAllSlugs: function() {
    // Returns instantly — no API equivalent needed (client-side config)
    return Object.keys(TEAMS_DATA);
  },

  getQuiz: async function(slug) {
    var team = await this.getTeam(slug);
    return team ? (team.quiz || []) : [];
  },

  getAiContext: async function(slug) {
    var team = await this.getTeam(slug);
    return team ? (team.aiContext || null) : null;
  },
};
