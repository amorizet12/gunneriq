// ─────────────────────────────────────────────────────────────────
// data/fixtures.js
//
// Upcoming fixture, form, recent results, key stats, and narrative
// per team.
//
// WHERE TO PLUG IN THE REAL API LATER:
//   Replace FIXTURES_DATA with a fetch in fixtureService.js:
//     GET /api/v1/teams/:slug/fixtures?status=upcoming&limit=1
//     GET /api/v1/teams/:slug/fixtures/:id/preview
//     GET /api/v1/teams/:slug/results?limit=5
//   Public options: football-data.org, API-Football
// ─────────────────────────────────────────────────────────────────

var FIXTURES_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL
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

      matchInsight: "Saka has goal involvements in 4 of his last 5 PL starts. City's right flank is vulnerable on the break.",

      narrative: "Arsenal's 4-3-3 high press will be the acid test — City struggle to build under sustained pressure when De Bruyne sits deep. Expect Ødegaard to press Rodri's left channel as the primary trigger, freeing Saka to exploit Walker's recovery speed in behind.",

      keyStats: [
        { label: 'Arsenal home xG avg', value: '2.34', context: 'per game',    trend: 'up'   },
        { label: 'Set-piece goals',      value: '8',    context: 'this season', trend: 'up'   },
        { label: "City away duel rate",  value: '58%',  context: 'right flank', trend: 'down' },
        { label: 'Press intensity',      value: '7.8',  context: 'PPDA last 5', trend: 'up'   },
      ],
    },

    form: {
      arsenal:  ['W', 'W', 'D', 'W', 'L'],
      opponent: ['W', 'L', 'W', 'W', 'D'],
    },

    recentResults: [
      { opponent: 'Brentford',     homeAway: 'H', score: '3–1', result: 'W', competition: 'PL',  date: '19 Apr' },
      { opponent: 'Chelsea',       homeAway: 'A', score: '2–2', result: 'D', competition: 'PL',  date: '13 Apr' },
      { opponent: 'Crystal Palace', homeAway:'H', score: '2–0', result: 'W', competition: 'PL',  date: '6 Apr'  },
      { opponent: 'PSG',           homeAway: 'A', score: '1–0', result: 'W', competition: 'UCL', date: '2 Apr'  },
      { opponent: 'Wolves',        homeAway: 'A', score: '1–2', result: 'L', competition: 'PL',  date: '30 Mar' },
    ],

    talkingPoint: {
      quote:  '"If Arsenal win on Saturday, they go top on goal difference. This is the biggest game of Arteta\'s tenure."',
      credit: 'GunnerIQ Analysis · 3 min read',
    },
  },

  // ═══════════════════════════════════════
  // BARCELONA
  // ═══════════════════════════════════════
  barcelona: {

    upcoming: {
      id:               'fcb-rma-2026-05-03',
      homeTeamSlug:     'barcelona',
      awayTeamSlug:     'real-madrid',
      homeCode:         'FCB',
      awayCode:         'RMA',
      homeLabel:        'Barcelona',
      awayLabel:        'Real Madrid',
      date:             'Sat 3 May',
      isoDate:          '2026-05-03',
      time:             '21:00',
      competition:      'La Liga',
      competitionShort: 'LL',
      gameweek:         34,
      venue:            'Spotify Camp Nou',
      isHome:           true,
      status:           'upcoming',

      winProb: {
        home:          48,
        draw:          24,
        away:          28,
        fanPredictPct: 61,
      },

      matchInsight: "Yamal has created 4.2 chances per 90 mins in his last 6 La Liga starts. Clásico records favour Barça at home.",

      narrative: "Flick's 4-2-3-1 high-press should suffocate Madrid's build-up — Casado and Pedri will look to win the ball high and turn transitions into Yamal's blistering pace. The key battle: whether Tchouaméni can prevent Dani Olmo from finding pockets between Madrid's defensive lines.",

      keyStats: [
        { label: 'Barça home goals',   value: '2.7',  context: 'per game',      trend: 'up'   },
        { label: 'Yamal key passes',   value: '4.2',  context: 'per 90 last 6', trend: 'up'   },
        { label: 'Madrid away press',  value: '8.9',  context: 'PPDA avg',      trend: 'down' },
        { label: 'Lewandowski vs RMA', value: '9 G',  context: 'La Liga H2H',   trend: 'up'   },
      ],
    },

    form: {
      barcelona: ['W', 'W', 'W', 'D', 'W'],
      opponent:  ['W', 'D', 'L', 'W', 'W'],
    },

    recentResults: [
      { opponent: 'Real Betis',   homeAway: 'H', score: '4–0', result: 'W', competition: 'LL',  date: '20 Apr' },
      { opponent: 'Atlético',     homeAway: 'A', score: '2–1', result: 'W', competition: 'LL',  date: '13 Apr' },
      { opponent: 'Celta Vigo',   homeAway: 'H', score: '3–0', result: 'W', competition: 'LL',  date: '5 Apr'  },
      { opponent: 'Girona',       homeAway: 'A', score: '1–1', result: 'D', competition: 'LL',  date: '30 Mar' },
      { opponent: 'Villarreal',   homeAway: 'H', score: '2–1', result: 'W', competition: 'LL',  date: '23 Mar' },
    ],

    talkingPoint: {
      quote:  '"Yamal at 18 is already doing things Messi did at 22. This Clásico could define a generation."',
      credit: 'BarçaIQ Analysis · 4 min read',
    },
  },

  // ═══════════════════════════════════════
  // REAL MADRID
  // ═══════════════════════════════════════
  'real-madrid': {

    upcoming: {
      id:               'fcb-rma-2026-05-03',
      homeTeamSlug:     'barcelona',
      awayTeamSlug:     'real-madrid',
      homeCode:         'FCB',
      awayCode:         'RMA',
      homeLabel:        'Barcelona',
      awayLabel:        'Real Madrid',
      date:             'Sat 3 May',
      isoDate:          '2026-05-03',
      time:             '21:00',
      competition:      'La Liga',
      competitionShort: 'LL',
      gameweek:         34,
      venue:            'Spotify Camp Nou',
      isHome:           false,
      status:           'upcoming',

      winProb: {
        home:          48,
        draw:          24,
        away:          28,
        fanPredictPct: 44,
      },

      matchInsight: "Mbappé has scored in 3 consecutive away games. Vinícius' direct duel with Koundé is the game's defining match-up.",

      narrative: "Ancelotti will set up Madrid to absorb pressure and explode on the counter — Vinícius and Mbappé's pace behind Barça's high line is the primary weapon. Bellingham dropping into midfield pockets to receive between the lines will be Madrid's key attacking trigger.",

      keyStats: [
        { label: 'Madrid away goals',  value: '2.1',  context: 'per game',      trend: 'up'   },
        { label: 'Mbappé last 5',      value: '6 G',  context: 'all comps',     trend: 'up'   },
        { label: 'Vinícius dribbles',  value: '5.1',  context: 'per 90 avg',    trend: 'up'   },
        { label: 'Barça high line',    value: '42m',  context: 'avg def. line',  trend: 'down' },
      ],
    },

    form: {
      'real-madrid': ['W', 'L', 'W', 'W', 'D'],
      opponent:      ['L', 'W', 'L', 'D', 'W'],
    },

    recentResults: [
      { opponent: 'Sevilla',       homeAway: 'H', score: '3–1', result: 'W', competition: 'LL',  date: '19 Apr' },
      { opponent: 'Arsenal',       homeAway: 'A', score: '0–1', result: 'L', competition: 'UCL', date: '15 Apr' },
      { opponent: 'Rayo Vallecano', homeAway:'H', score: '2–0', result: 'W', competition: 'LL',  date: '6 Apr'  },
      { opponent: 'Mallorca',      homeAway: 'H', score: '2–0', result: 'W', competition: 'LL',  date: '1 Apr'  },
      { opponent: 'Las Palmas',    homeAway: 'A', score: '1–1', result: 'D', competition: 'LL',  date: '23 Mar' },
    ],

    talkingPoint: {
      quote:  '"Madrid have never lost three consecutive Clásicos at Camp Nou. The resilience is in the DNA."',
      credit: 'MadridIQ Analysis · 3 min read',
    },
  },

  // ═══════════════════════════════════════
  // LIVERPOOL
  // ═══════════════════════════════════════
  liverpool: {

    upcoming: {
      id:               'liv-tot-2026-05-04',
      homeTeamSlug:     'liverpool',
      awayTeamSlug:     'tottenham',
      homeCode:         'LIV',
      awayCode:         'TOT',
      homeLabel:        'Liverpool',
      awayLabel:        'Tottenham',
      date:             'Sun 4 May',
      isoDate:          '2026-05-04',
      time:             '16:30',
      competition:      'Premier League',
      competitionShort: 'PL',
      gameweek:         35,
      venue:            'Anfield',
      isHome:           true,
      status:           'upcoming',

      winProb: {
        home:          67,
        draw:          19,
        away:          14,
        fanPredictPct: 74,
      },

      matchInsight: "Salah is 2 goals from equalling Ian Rush's all-time Liverpool PL record. Anfield hasn't lost in 22 home league games.",

      narrative: "Slot's 4-3-3 presses intensely from the front and will target Spurs' slow build-up. Gravenberch's positional discipline will be key to preventing Son from receiving in the half-spaces, while Alexander-Arnold's set-piece delivery remains Liverpool's biggest dead-ball threat.",

      keyStats: [
        { label: 'Anfield unbeaten',   value: '22',   context: 'home league games', trend: 'up'   },
        { label: 'Salah goals',        value: '27',   context: 'this season',       trend: 'up'   },
        { label: 'Spurs away xG',      value: '1.1',  context: 'per game',          trend: 'down' },
        { label: 'Liverpool PPDA',     value: '7.2',  context: 'press avg',         trend: 'up'   },
      ],
    },

    form: {
      liverpool: ['W', 'W', 'D', 'W', 'W'],
      opponent:  ['L', 'L', 'D', 'W', 'L'],
    },

    recentResults: [
      { opponent: 'Everton',       homeAway: 'H', score: '3–0', result: 'W', competition: 'PL',  date: '20 Apr' },
      { opponent: 'Newcastle',     homeAway: 'A', score: '2–1', result: 'W', competition: 'PL',  date: '13 Apr' },
      { opponent: 'Man City',      homeAway: 'H', score: '1–1', result: 'D', competition: 'PL',  date: '5 Apr'  },
      { opponent: 'Brighton',      homeAway: 'A', score: '2–0', result: 'W', competition: 'PL',  date: '30 Mar' },
      { opponent: 'Nottm Forest',  homeAway: 'H', score: '2–1', result: 'W', competition: 'PL',  date: '23 Mar' },
    ],

    talkingPoint: {
      quote:  '"Salah is rewriting history in his final season. If Liverpool win on Sunday, the title is effectively theirs."',
      credit: 'KopIQ Analysis · 4 min read',
    },
  },

  // ═══════════════════════════════════════
  // MAN CITY
  // ═══════════════════════════════════════
  'man-city': {

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
      isHome:           false,
      status:           'upcoming',

      winProb: {
        home:          54,
        draw:          22,
        away:          24,
        fanPredictPct: 39,
      },

      matchInsight: "Haaland has scored in 5 consecutive away games. City are unbeaten in 7 PL away fixtures.",

      narrative: "Guardiola's side will look to dominate possession and force Arsenal into a low block — De Bruyne's diagonal switches to Foden on the right will be the primary chance-creation route. The key question: can City's press suppress Ødegaard before Arsenal get into their rhythm?",

      keyStats: [
        { label: 'Haaland away goals', value: '14',   context: 'this season',   trend: 'up'   },
        { label: 'City possession',    value: '62%',  context: 'away average',  trend: 'up'   },
        { label: 'De Bruyne chances',  value: '3.8',  context: 'created per 90',trend: 'up'   },
        { label: 'City press PPDA',    value: '8.3',  context: 'away avg',      trend: 'up'   },
      ],
    },

    form: {
      'man-city': ['W', 'L', 'D', 'W', 'L'],
      opponent:   ['L', 'W', 'W', 'D', 'W'],
    },

    recentResults: [
      { opponent: 'Wolves',       homeAway: 'H', score: '4–1', result: 'W', competition: 'PL',  date: '19 Apr' },
      { opponent: 'Liverpool',    homeAway: 'A', score: '1–1', result: 'D', competition: 'PL',  date: '5 Apr'  },
      { opponent: 'Real Madrid',  homeAway: 'H', score: '2–1', result: 'W', competition: 'UCL', date: '9 Apr'  },
      { opponent: 'Aston Villa',  homeAway: 'A', score: '1–2', result: 'L', competition: 'PL',  date: '2 Apr'  },
      { opponent: 'Bournemouth',  homeAway: 'H', score: '5–0', result: 'W', competition: 'PL',  date: '30 Mar' },
    ],

    talkingPoint: {
      quote:  '"City are dangerous when written off. Haaland at the Emirates is one of the most fearsome prospects in the league."',
      credit: 'CityIQ Analysis · 3 min read',
    },
  },
};
