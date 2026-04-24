// ─────────────────────────────────────────────────────────────────
// services/fixtureService.js
//
// All methods are async. When ApiConfig.USE_REAL_API is false
// (the default), they return mock data instantly.
// When USE_REAL_API is true, they call the real API and fall back
// to mock data if the request fails.
//
// API endpoints:
//   GET /api/v1/teams/:slug/fixtures?status=upcoming&limit=1
//   GET /api/v1/teams/:slug/form?limit=5
//   GET /api/v1/teams/:slug/results?limit=5
// ─────────────────────────────────────────────────────────────────

var FixtureService = {

  getUpcomingFixture: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        var origin = (typeof window !== 'undefined')
          ? window.location.origin
          : 'http://localhost:' + (typeof process !== 'undefined' && process.env && process.env.PORT ? process.env.PORT : 3000);
        var res = await fetch(origin + '/api/upcoming-fixture/' + teamSlug);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var json = await res.json();
        return json.fixture || null;
      } catch (err) {
        console.warn('[FixtureService.getUpcomingFixture] API error — using mock:', err.message);
      }
    }
    var data = FIXTURES_DATA[teamSlug];
    return data ? data.upcoming : null;
  },

  // Always returns { team: [...], opponent: [...] } regardless of raw data shape
  getForm: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        return await ApiConfig.request(ApiConfig.endpoints.teamForm(teamSlug));
      } catch (err) {
        console.warn('[FixtureService.getForm] API error — using mock:', err.message);
      }
    }
    var data = FIXTURES_DATA[teamSlug];
    if (!data || !data.form) return { team: [], opponent: [] };
    var raw = data.form;
    return { team: raw[teamSlug] || raw.team || [], opponent: raw.opponent || [] };
  },

  getRecentResults: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        return await ApiConfig.request(ApiConfig.endpoints.teamResults(teamSlug, 5));
      } catch (err) {
        console.warn('[FixtureService.getRecentResults] API error — using mock:', err.message);
      }
    }
    var data = FIXTURES_DATA[teamSlug];
    return (data && data.recentResults) ? data.recentResults : [];
  },

  getTalkingPoint: async function(teamSlug) {
    var data = FIXTURES_DATA[teamSlug];
    return data ? data.talkingPoint : null;
  },

  // Composite — awaits sub-calls, then maps to a flat display object.
  // Handles both mock shape (homeLabel/awayLabel) and real API shape (opponent/homeAway).
  getFixtureDisplay: async function(teamSlug) {
    var fixture      = await this.getUpcomingFixture(teamSlug);
    var form         = await this.getForm(teamSlug);
    var talkingPoint = await this.getTalkingPoint(teamSlug);
    if (!fixture) return null;

    var homeCode, awayCode, homeLabel, awayLabel, isHome;

    if (fixture.opponent) {
      // ── Real API shape ────────────────────────────────────────
      var teamData = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
      isHome    = fixture.homeAway === 'H';
      homeLabel = isHome ? (teamData.shortName || teamSlug) : fixture.opponent;
      awayLabel = isHome ? fixture.opponent : (teamData.shortName || teamSlug);
      homeCode  = isHome ? (teamData.code  || teamSlug.slice(0,3).toUpperCase()) : fixture.opponent.slice(0,3).toUpperCase();
      awayCode  = isHome ? fixture.opponent.slice(0,3).toUpperCase() : (teamData.code || teamSlug.slice(0,3).toUpperCase());
    } else {
      // ── Mock shape ────────────────────────────────────────────
      homeCode  = fixture.homeCode;
      awayCode  = fixture.awayCode;
      homeLabel = fixture.homeLabel;
      awayLabel = fixture.awayLabel;
    }

    return {
      homeCode:         homeCode,
      awayCode:         awayCode,
      homeLabel:        homeLabel,
      awayLabel:        awayLabel,
      date:             fixture.date,
      isoDate:          fixture.isoDate       || null,
      time:             fixture.time,
      competition:      fixture.competition,
      competitionShort: fixture.competitionShort || fixture.competition,
      gameweek:         fixture.gameweek      || null,
      venue:            fixture.venue         || null,
      winProb:          fixture.winProb       || null,
      matchInsight:     fixture.matchInsight  || null,
      narrative:        fixture.narrative     || fixture.matchInsight || null,
      keyStats:         fixture.keyStats      || [],
      formTeam:         form.team             || [],
      formOpponent:     form.opponent         || [],
      talkingPoint:     talkingPoint,
    };
  },
};
