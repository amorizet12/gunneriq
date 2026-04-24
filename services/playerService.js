// ─────────────────────────────────────────────────────────────────
// services/playerService.js
//
// All methods are async. When ApiConfig.USE_REAL_API is false
// (the default), they return mock data instantly.
// When USE_REAL_API is true, they call the real API and fall back
// to mock data if the request fails.
//
// API endpoints:
//   GET /api/v1/teams/:slug/players
//   GET /api/v1/teams/:slug/lineup
// ─────────────────────────────────────────────────────────────────

var PlayerService = {

  getSquad: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        return await ApiConfig.request(ApiConfig.endpoints.teamPlayers(teamSlug));
      } catch (err) {
        console.warn('[PlayerService.getSquad] API error — using mock:', err.message);
      }
    }
    return PLAYERS_DATA[teamSlug] || [];
  },

  getPlayer: async function(teamSlug, playerNumber) {
    var squad = await this.getSquad(teamSlug);
    return squad.find(function(p) { return p.number === playerNumber; }) || null;
  },

  // Returns { jerseyNumber: playerObject } — used by lineup rendering
  getPlayerMap: async function(teamSlug) {
    var squad = await this.getSquad(teamSlug);
    var map = {};
    squad.forEach(function(p) { map[p.number] = p; });
    return map;
  },

  getLineup: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        return await ApiConfig.request(ApiConfig.endpoints.teamLineup(teamSlug));
      } catch (err) {
        console.warn('[PlayerService.getLineup] API error — using mock:', err.message);
      }
    }
    return PLAYERS_DATA[teamSlug + '_lineup'] || { formation: '', rows: [] };
  },

  getStartingXI: async function(teamSlug) {
    var squad = await this.getSquad(teamSlug);
    return squad.filter(function(p) { return p.lineupStatus === 'starting'; });
  },

  getInjuryList: async function(teamSlug) {
    var squad = await this.getSquad(teamSlug);
    return squad
      .filter(function(p) { return p.injuryStatus !== 'available' || p.injuryNote; })
      .map(function(p) {
        var statusMap = { available: 'Available', doubt: p.injuryNote || 'Doubt', out: 'Out' };
        var colorMap  = { available: 'var(--win)', doubt: 'var(--draw)', out: 'var(--loss)' };
        return {
          name:        p.shortName || p.name,
          status:      statusMap[p.injuryStatus],
          statusColor: colorMap[p.injuryStatus],
        };
      });
  },
};
