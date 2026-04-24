// ─────────────────────────────────────────────────────────────────
// data/fixtures.js
//
// Upcoming fixture, form, recent results, key stats, and narrative
// per team. Arsenal is fully populated; others are placeholders.
//
// WHERE TO PLUG IN THE REAL API LATER:
//   Replace FIXTURES_DATA with a fetch in fixtureService.js:
//     GET /api/v1/teams/:slug/fixtures?status=upcoming&limit=1
//     GET /api/v1/teams/:slug/fixtures/:id/preview   (narrative + keyStats)
//     GET /api/v1/teams/:slug/results?limit=5
//   Public options: football-data.org, API-Football
// ─────────────────────────────────────────────────────────────────

var FIXTURES_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL  (fully populated)
  // ═══════════════════════════════════════
  arsenal: {

    upcoming: {
      id:               'ars-mci-2026-04-26',
      homeTeamSlug:     'arsenal',
      awayTeamSlug:     'man-city',
      homeCode:         'ARS',
      awayCode:         'MCI',
      homeLabel:        'Arsenal',
      awayLabel:        'Man City',
      date:             'Sun 26 Apr',
      isoDate:          '2026-04-26',
      time:             '12:30',
      competition:      'Premier League',
      competitionShort: 'PL',
      gameweek:         35,
      venue:            'Emirates Stadium',
      isHome:           true,
      status:           'upcoming',

      winProb: {
        home:          54,
        draw:          22,
        away:          24,
        fanPredictPct: 57,
      },

      // Short one-liner shown on the hero card
      matchInsight: "Saka has goal involvements in 4 of his last 5 PL starts. City's right flank is vulnerable on the break.",

      // Richer 2-sentence tactical narrative (used by AI context + match hub)
      narrative: "Arsenal's 4-3-3 high press will be the acid test — City struggle to build under sustained pressure when De Bruyne sits deep. Expect Ødegaard to press Rodri's left channel as the primary trigger, freeing Saka to exploit Walker's recovery speed in behind.",

      // Pre-match analytical stats — shown as a 2×2 grid on the hero card
      keyStats: [
        { label: 'Arsenal home xG avg', value: '2.34', context: 'per game', trend: 'up'   },
        { label: 'Set-piece goals',      value: '8',    context: 'this season', trend: 'up'   },
        { label: "City away duel rate",  value: '58%',  context: 'right flank', trend: 'down' },
        { label: 'Press intensity',      value: '7.8',  context: 'PPDA last 5', trend: 'up'   },
      ],
    },

    // Recent form — last 5 results, newest first
    form: {
      arsenal:  ['W', 'W', 'D', 'W', 'L'],
      opponent: ['W', 'L', 'W', 'W', 'D'],
    },

    // Last 5 results with scores — shown on the Form tab
    recentResults: [
      { opponent: 'Brentford',    homeAway: 'H', score: '3–1', result: 'W', competition: 'PL',  date: '19 Apr' },
      { opponent: 'Chelsea',      homeAway: 'A', score: '2–2', result: 'D', competition: 'PL',  date: '13 Apr' },
      { opponent: 'Crystal Palace',homeAway:'H', score: '2–0', result: 'W', competition: 'PL',  date: '6 Apr'  },
      { opponent: 'PSG',          homeAway: 'A', score: '1–0', result: 'W', competition: 'UCL', date: '2 Apr'  },
      { opponent: 'Wolves',       homeAway: 'A', score: '1–2', result: 'L', competition: 'PL',  date: '30 Mar' },
    ],

    talkingPoint: {
      quote:  '"If Arsenal win on Saturday, they go top on goal difference. This is the biggest game of Arteta\'s tenure."',
      credit: 'GunnerIQ Analysis · 3 min read',
    },
  },

  // ═══════════════════════════════════════
  // BARCELONA  (placeholder)
  // ═══════════════════════════════════════
  barcelona: {
    upcoming:      null,
    form:          { barcelona: [], opponent: [] },
    recentResults: [],
    talkingPoint:  { quote: '', credit: '' },
  },

  // ═══════════════════════════════════════
  // REAL MADRID  (placeholder)
  // ═══════════════════════════════════════
  'real-madrid': {
    upcoming:      null,
    form:          { 'real-madrid': [], opponent: [] },
    recentResults: [],
    talkingPoint:  { quote: '', credit: '' },
  },

  // ═══════════════════════════════════════
  // LIVERPOOL  (placeholder)
  // ═══════════════════════════════════════
  liverpool: {
    upcoming:      null,
    form:          { liverpool: [], opponent: [] },
    recentResults: [],
    talkingPoint:  { quote: '', credit: '' },
  },

  // ═══════════════════════════════════════
  // MAN CITY  (placeholder)
  // ═══════════════════════════════════════
  'man-city': {
    upcoming:      null,
    form:          { 'man-city': [], opponent: [] },
    recentResults: [],
    talkingPoint:  { quote: '', credit: '' },
  },
};
