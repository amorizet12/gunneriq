// ─────────────────────────────────────────────────────────────────
// data/dashboard.js
//
// Dashboard data per team: season stats, league standings (top 10),
// and match selector entries (5 past, 1 current, 2 future).
//
// WHERE TO PLUG IN THE REAL API LATER:
//   Replace DASHBOARD_DATA with fetches in dashboardService.js:
//     GET /api/v1/teams/:slug/season-stats
//     GET /api/v1/competitions/:id/standings
//     GET /api/v1/teams/:slug/fixtures?limit=8
//   Public options: football-data.org, API-Football
// ─────────────────────────────────────────────────────────────────

var DASHBOARD_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL
  // ═══════════════════════════════════════
  arsenal: {

    seasonStats: {
      played:        34,
      goalsScored:   64,
      goalsConceded: 26,
      assists:       42,
      cleanSheets:   14,
      possession:    '52%',
      shotsPerGame:  '15.4',
      xGFor:         '58.2',
      xGAgainst:     '24.1'
    },

    standings: {
      competition: 'Premier League',
      table: [
        { pos: 1,  code: 'ARS', team: 'Arsenal',      P: 34, W: 22, D: 8, L: 4,  GD: '+38', Pts: 74, active: true  },
        { pos: 2,  code: 'MCI', team: 'Man City',      P: 34, W: 21, D: 7, L: 6,  GD: '+33', Pts: 70, active: false },
        { pos: 3,  code: 'LIV', team: 'Liverpool',     P: 34, W: 21, D: 6, L: 7,  GD: '+35', Pts: 69, active: false },
        { pos: 4,  code: 'CHE', team: 'Chelsea',       P: 34, W: 18, D: 8, L: 8,  GD: '+21', Pts: 62, active: false },
        { pos: 5,  code: 'TOT', team: 'Tottenham',     P: 34, W: 16, D: 9, L: 9,  GD: '+14', Pts: 57, active: false },
        { pos: 6,  code: 'NEW', team: 'Newcastle',     P: 34, W: 16, D: 7, L: 11, GD: '+17', Pts: 55, active: false },
        { pos: 7,  code: 'AVL', team: 'Aston Villa',   P: 34, W: 14, D: 8, L: 12, GD: '+9',  Pts: 50, active: false },
        { pos: 8,  code: 'MUN', team: 'Man United',    P: 34, W: 13, D: 7, L: 14, GD: '-3',  Pts: 46, active: false },
        { pos: 9,  code: 'BRI', team: 'Brighton',      P: 34, W: 12, D: 8, L: 14, GD: '+2',  Pts: 44, active: false },
        { pos: 10, code: 'WOL', team: 'Wolves',        P: 34, W: 11, D: 6, L: 17, GD: '-12', Pts: 39, active: false }
      ]
    },

    matchSelector: [
      {
        id:          'ars-wol-2026-03-30',
        type:        'past',
        opponent:    'Wolves',
        opCode:      'WOL',
        homeAway:    'A',
        teamScore:   1,
        oppScore:    2,
        date:        '30 Mar',
        competition: 'PL'
      },
      {
        id:          'ars-psg-2026-04-02',
        type:        'past',
        opponent:    'PSG',
        opCode:      'PSG',
        homeAway:    'A',
        teamScore:   1,
        oppScore:    0,
        date:        '2 Apr',
        competition: 'UCL'
      },
      {
        id:          'ars-cpa-2026-04-06',
        type:        'past',
        opponent:    'C.Palace',
        opCode:      'CPA',
        homeAway:    'H',
        teamScore:   2,
        oppScore:    0,
        date:        '6 Apr',
        competition: 'PL'
      },
      {
        id:          'ars-che-2026-04-13',
        type:        'past',
        opponent:    'Chelsea',
        opCode:      'CHE',
        homeAway:    'A',
        teamScore:   2,
        oppScore:    2,
        date:        '13 Apr',
        competition: 'PL'
      },
      {
        id:          'ars-bre-2026-04-19',
        type:        'past',
        opponent:    'Brentford',
        opCode:      'BRE',
        homeAway:    'H',
        teamScore:   3,
        oppScore:    1,
        date:        '19 Apr',
        competition: 'PL'
      },
      {
        id:          'ars-mci-2026-04-26',
        type:        'current',
        opponent:    'Man City',
        opCode:      'MCI',
        homeAway:    'H',
        date:        '26 Apr',
        time:        '12:30',
        competition: 'PL'
      },
      {
        id:          'a-eve',
        type:        'future',
        opponent:    'Everton',
        opCode:      'EVE',
        homeAway:    'A',
        date:        '2 May',
        time:        '15:00',
        competition: 'PL'
      },
      {
        id:          'a-bha',
        type:        'future',
        opponent:    'Brighton',
        opCode:      'BHA',
        homeAway:    'H',
        date:        '10 May',
        time:        '16:00',
        competition: 'PL'
      }
    ]
  },

  // ═══════════════════════════════════════
  // BARCELONA
  // ═══════════════════════════════════════
  barcelona: {

    seasonStats: {
      played:        33,
      goalsScored:   89,
      goalsConceded: 29,
      assists:       62,
      cleanSheets:   13,
      possession:    '58%',
      shotsPerGame:  '17.1',
      xGFor:         '82.5',
      xGAgainst:     '27.3'
    },

    standings: {
      competition: 'La Liga',
      table: [
        { pos: 1,  code: 'FCB', team: 'Barcelona',     P: 33, W: 26, D: 4,  L: 3,  GD: '+60', Pts: 82, active: true  },
        { pos: 2,  code: 'RMA', team: 'Real Madrid',   P: 33, W: 24, D: 5,  L: 4,  GD: '+51', Pts: 77, active: false },
        { pos: 3,  code: 'ATM', team: 'Atlético',      P: 33, W: 20, D: 7,  L: 6,  GD: '+22', Pts: 67, active: false },
        { pos: 4,  code: 'ATH', team: 'Ath. Bilbao',   P: 33, W: 18, D: 8,  L: 7,  GD: '+19', Pts: 62, active: false },
        { pos: 5,  code: 'VIL', team: 'Villarreal',    P: 33, W: 15, D: 9,  L: 9,  GD: '+10', Pts: 54, active: false },
        { pos: 6,  code: 'BET', team: 'Real Betis',    P: 33, W: 14, D: 10, L: 9,  GD: '+7',  Pts: 52, active: false },
        { pos: 7,  code: 'SOC', team: 'Real Sociedad', P: 33, W: 13, D: 9,  L: 11, GD: '+3',  Pts: 48, active: false },
        { pos: 8,  code: 'SEV', team: 'Sevilla',       P: 33, W: 12, D: 8,  L: 13, GD: '-4',  Pts: 44, active: false },
        { pos: 9,  code: 'GIR', team: 'Girona',        P: 33, W: 11, D: 9,  L: 13, GD: '-2',  Pts: 42, active: false },
        { pos: 10, code: 'CEL', team: 'Celta Vigo',    P: 33, W: 10, D: 9,  L: 14, GD: '-9',  Pts: 39, active: false }
      ]
    },

    matchSelector: [
      {
        id:          'fcb-vil-2026-03-23',
        type:        'past',
        opponent:    'Villarreal',
        opCode:      'VIL',
        homeAway:    'H',
        teamScore:   2,
        oppScore:    1,
        date:        '23 Mar',
        competition: 'LL'
      },
      {
        id:          'fcb-gir-2026-03-30',
        type:        'past',
        opponent:    'Girona',
        opCode:      'GIR',
        homeAway:    'A',
        teamScore:   1,
        oppScore:    1,
        date:        '30 Mar',
        competition: 'LL'
      },
      {
        id:          'fcb-cel-2026-04-05',
        type:        'past',
        opponent:    'Celta Vigo',
        opCode:      'CEL',
        homeAway:    'H',
        teamScore:   3,
        oppScore:    0,
        date:        '5 Apr',
        competition: 'LL'
      },
      {
        id:          'fcb-atm-2026-04-13',
        type:        'past',
        opponent:    'Atlético',
        opCode:      'ATM',
        homeAway:    'A',
        teamScore:   2,
        oppScore:    1,
        date:        '13 Apr',
        competition: 'LL'
      },
      {
        id:          'fcb-bet-2026-04-20',
        type:        'past',
        opponent:    'Real Betis',
        opCode:      'BET',
        homeAway:    'H',
        teamScore:   4,
        oppScore:    0,
        date:        '20 Apr',
        competition: 'LL'
      },
      {
        id:          'fcb-rma-2026-05-03',
        type:        'current',
        opponent:    'Real Madrid',
        opCode:      'RMA',
        homeAway:    'H',
        date:        '3 May',
        time:        '21:00',
        competition: 'LL'
      },
      {
        id:          'b-gra',
        type:        'future',
        opponent:    'Granada',
        opCode:      'GRA',
        homeAway:    'A',
        date:        '10 May',
        time:        '18:00',
        competition: 'LL'
      },
      {
        id:          'b-val',
        type:        'future',
        opponent:    'Valencia',
        opCode:      'VAL',
        homeAway:    'H',
        date:        '17 May',
        time:        '20:00',
        competition: 'LL'
      }
    ]
  },

  // ═══════════════════════════════════════
  // REAL MADRID
  // ═══════════════════════════════════════
  'real-madrid': {

    seasonStats: {
      played:        33,
      goalsScored:   79,
      goalsConceded: 31,
      assists:       54,
      cleanSheets:   12,
      possession:    '54%',
      shotsPerGame:  '15.6',
      xGFor:         '72.4',
      xGAgainst:     '29.1'
    },

    standings: {
      competition: 'La Liga',
      table: [
        { pos: 1,  code: 'FCB', team: 'Barcelona',     P: 33, W: 26, D: 4,  L: 3,  GD: '+60', Pts: 82, active: false },
        { pos: 2,  code: 'RMA', team: 'Real Madrid',   P: 33, W: 24, D: 5,  L: 4,  GD: '+51', Pts: 77, active: true  },
        { pos: 3,  code: 'ATM', team: 'Atlético',      P: 33, W: 20, D: 7,  L: 6,  GD: '+22', Pts: 67, active: false },
        { pos: 4,  code: 'ATH', team: 'Ath. Bilbao',   P: 33, W: 18, D: 8,  L: 7,  GD: '+19', Pts: 62, active: false },
        { pos: 5,  code: 'VIL', team: 'Villarreal',    P: 33, W: 15, D: 9,  L: 9,  GD: '+10', Pts: 54, active: false },
        { pos: 6,  code: 'BET', team: 'Real Betis',    P: 33, W: 14, D: 10, L: 9,  GD: '+7',  Pts: 52, active: false },
        { pos: 7,  code: 'SOC', team: 'Real Sociedad', P: 33, W: 13, D: 9,  L: 11, GD: '+3',  Pts: 48, active: false },
        { pos: 8,  code: 'SEV', team: 'Sevilla',       P: 33, W: 12, D: 8,  L: 13, GD: '-4',  Pts: 44, active: false },
        { pos: 9,  code: 'GIR', team: 'Girona',        P: 33, W: 11, D: 9,  L: 13, GD: '-2',  Pts: 42, active: false },
        { pos: 10, code: 'CEL', team: 'Celta Vigo',    P: 33, W: 10, D: 9,  L: 14, GD: '-9',  Pts: 39, active: false }
      ]
    },

    matchSelector: [
      {
        id:          'rma-val-2026-03-22',
        type:        'past',
        opponent:    'Valencia',
        opCode:      'VAL',
        homeAway:    'H',
        teamScore:   3,
        oppScore:    1,
        date:        '22 Mar',
        competition: 'LL'
      },
      {
        id:          'rma-osa-2026-03-29',
        type:        'past',
        opponent:    'Osasuna',
        opCode:      'OSA',
        homeAway:    'A',
        teamScore:   2,
        oppScore:    0,
        date:        '29 Mar',
        competition: 'LL'
      },
      {
        id:          'rma-leg-2026-04-05',
        type:        'past',
        opponent:    'Leganés',
        opCode:      'LEG',
        homeAway:    'H',
        teamScore:   4,
        oppScore:    1,
        date:        '5 Apr',
        competition: 'LL'
      },
      {
        id:          'rma-sev-2026-04-12',
        type:        'past',
        opponent:    'Sevilla',
        opCode:      'SEV',
        homeAway:    'A',
        teamScore:   2,
        oppScore:    1,
        date:        '12 Apr',
        competition: 'LL'
      },
      {
        id:          'rma-bet-2026-04-19',
        type:        'past',
        opponent:    'Real Betis',
        opCode:      'BET',
        homeAway:    'H',
        teamScore:   3,
        oppScore:    0,
        date:        '19 Apr',
        competition: 'LL'
      },
      {
        id:          'fcb-rma-2026-05-03',
        type:        'current',
        opponent:    'Barcelona',
        opCode:      'FCB',
        homeAway:    'A',
        date:        '3 May',
        time:        '21:00',
        competition: 'LL'
      },
      {
        id:          'r-atm',
        type:        'future',
        opponent:    'Atlético',
        opCode:      'ATM',
        homeAway:    'H',
        date:        '10 May',
        time:        '21:00',
        competition: 'LL'
      },
      {
        id:          'r-ath',
        type:        'future',
        opponent:    'Ath. Bilbao',
        opCode:      'ATH',
        homeAway:    'A',
        date:        '17 May',
        time:        '21:00',
        competition: 'LL'
      }
    ]
  },

  // ═══════════════════════════════════════
  // LIVERPOOL
  // ═══════════════════════════════════════
  liverpool: {

    seasonStats: {
      played:        34,
      goalsScored:   88,
      goalsConceded: 30,
      assists:       60,
      cleanSheets:   16,
      possession:    '55%',
      shotsPerGame:  '16.8',
      xGFor:         '81.6',
      xGAgainst:     '25.5'
    },

    standings: {
      competition: 'Premier League',
      table: [
        { pos: 1,  code: 'ARS', team: 'Arsenal',      P: 34, W: 22, D: 8, L: 4,  GD: '+38', Pts: 74, active: false },
        { pos: 2,  code: 'MCI', team: 'Man City',      P: 34, W: 21, D: 7, L: 6,  GD: '+33', Pts: 70, active: false },
        { pos: 3,  code: 'LIV', team: 'Liverpool',     P: 34, W: 21, D: 6, L: 7,  GD: '+35', Pts: 69, active: true  },
        { pos: 4,  code: 'CHE', team: 'Chelsea',       P: 34, W: 18, D: 8, L: 8,  GD: '+21', Pts: 62, active: false },
        { pos: 5,  code: 'TOT', team: 'Tottenham',     P: 34, W: 16, D: 9, L: 9,  GD: '+14', Pts: 57, active: false },
        { pos: 6,  code: 'NEW', team: 'Newcastle',     P: 34, W: 16, D: 7, L: 11, GD: '+17', Pts: 55, active: false },
        { pos: 7,  code: 'AVL', team: 'Aston Villa',   P: 34, W: 14, D: 8, L: 12, GD: '+9',  Pts: 50, active: false },
        { pos: 8,  code: 'MUN', team: 'Man United',    P: 34, W: 13, D: 7, L: 14, GD: '-3',  Pts: 46, active: false },
        { pos: 9,  code: 'BRI', team: 'Brighton',      P: 34, W: 12, D: 8, L: 14, GD: '+2',  Pts: 44, active: false },
        { pos: 10, code: 'WOL', team: 'Wolves',        P: 34, W: 11, D: 6, L: 17, GD: '-12', Pts: 39, active: false }
      ]
    },

    matchSelector: [
      {
        id:          'liv-tot-2026-03-22',
        type:        'past',
        opponent:    'Tottenham',
        opCode:      'TOT',
        homeAway:    'H',
        teamScore:   2,
        oppScore:    1,
        date:        '22 Mar',
        competition: 'PL'
      },
      {
        id:          'liv-bou-2026-03-29',
        type:        'past',
        opponent:    'Bournemouth',
        opCode:      'BOU',
        homeAway:    'A',
        teamScore:   3,
        oppScore:    0,
        date:        '29 Mar',
        competition: 'PL'
      },
      {
        id:          'liv-mun-2026-04-05',
        type:        'past',
        opponent:    'Man United',
        opCode:      'MUN',
        homeAway:    'H',
        teamScore:   3,
        oppScore:    1,
        date:        '5 Apr',
        competition: 'PL'
      },
      {
        id:          'liv-lei-2026-04-12',
        type:        'past',
        opponent:    'Leicester',
        opCode:      'LEI',
        homeAway:    'A',
        teamScore:   2,
        oppScore:    1,
        date:        '12 Apr',
        competition: 'PL'
      },
      {
        id:          'liv-eve-2026-04-19',
        type:        'past',
        opponent:    'Everton',
        opCode:      'EVE',
        homeAway:    'H',
        teamScore:   3,
        oppScore:    0,
        date:        '19 Apr',
        competition: 'PL'
      },
      {
        id:          'liv-tot-2026-04-27',
        type:        'current',
        opponent:    'Tottenham',
        opCode:      'TOT',
        homeAway:    'H',
        date:        '27 Apr',
        time:        '20:00',
        competition: 'PL'
      },
      {
        id:          'l-avl',
        type:        'future',
        opponent:    'Aston Villa',
        opCode:      'AVL',
        homeAway:    'A',
        date:        '3 May',
        time:        '14:00',
        competition: 'PL'
      },
      {
        id:          'l-cry',
        type:        'future',
        opponent:    'Crystal Palace',
        opCode:      'CPA',
        homeAway:    'H',
        date:        '10 May',
        time:        '16:00',
        competition: 'PL'
      }
    ]
  },

  // ═══════════════════════════════════════
  // MAN CITY
  // ═══════════════════════════════════════
  'man-city': {

    seasonStats: {
      played:        34,
      goalsScored:   85,
      goalsConceded: 42,
      assists:       58,
      cleanSheets:   11,
      possession:    '56%',
      shotsPerGame:  '14.8',
      xGFor:         '78.2',
      xGAgainst:     '38.5'
    },

    standings: {
      competition: 'Premier League',
      table: [
        { pos: 1,  code: 'ARS', team: 'Arsenal',      P: 34, W: 22, D: 8, L: 4,  GD: '+38', Pts: 74, active: false },
        { pos: 2,  code: 'MCI', team: 'Man City',      P: 34, W: 21, D: 7, L: 6,  GD: '+33', Pts: 70, active: true  },
        { pos: 3,  code: 'LIV', team: 'Liverpool',     P: 34, W: 21, D: 6, L: 7,  GD: '+35', Pts: 69, active: false },
        { pos: 4,  code: 'CHE', team: 'Chelsea',       P: 34, W: 18, D: 8, L: 8,  GD: '+21', Pts: 62, active: false },
        { pos: 5,  code: 'TOT', team: 'Tottenham',     P: 34, W: 16, D: 9, L: 9,  GD: '+14', Pts: 57, active: false },
        { pos: 6,  code: 'NEW', team: 'Newcastle',     P: 34, W: 16, D: 7, L: 11, GD: '+17', Pts: 55, active: false },
        { pos: 7,  code: 'AVL', team: 'Aston Villa',   P: 34, W: 14, D: 8, L: 12, GD: '+9',  Pts: 50, active: false },
        { pos: 8,  code: 'MUN', team: 'Man United',    P: 34, W: 13, D: 7, L: 14, GD: '-3',  Pts: 46, active: false },
        { pos: 9,  code: 'BRI', team: 'Brighton',      P: 34, W: 12, D: 8, L: 14, GD: '+2',  Pts: 44, active: false },
        { pos: 10, code: 'WOL', team: 'Wolves',        P: 34, W: 11, D: 6, L: 17, GD: '-12', Pts: 39, active: false }
      ]
    },

    matchSelector: [
      {
        id:          'mci-bha-2026-03-22',
        type:        'past',
        opponent:    'Brighton',
        opCode:      'BHA',
        homeAway:    'H',
        teamScore:   2,
        oppScore:    1,
        date:        '22 Mar',
        competition: 'PL'
      },
      {
        id:          'mci-eve-2026-03-29',
        type:        'past',
        opponent:    'Everton',
        opCode:      'EVE',
        homeAway:    'A',
        teamScore:   2,
        oppScore:    0,
        date:        '29 Mar',
        competition: 'PL'
      },
      {
        id:          'mci-lei-2026-04-05',
        type:        'past',
        opponent:    'Leicester',
        opCode:      'LEI',
        homeAway:    'H',
        teamScore:   3,
        oppScore:    0,
        date:        '5 Apr',
        competition: 'PL'
      },
      {
        id:          'mci-che-2026-04-12',
        type:        'past',
        opponent:    'Chelsea',
        opCode:      'CHE',
        homeAway:    'A',
        teamScore:   1,
        oppScore:    1,
        date:        '12 Apr',
        competition: 'PL'
      },
      {
        id:          'mci-avl-2026-04-19',
        type:        'past',
        opponent:    'Aston Villa',
        opCode:      'AVL',
        homeAway:    'H',
        teamScore:   2,
        oppScore:    0,
        date:        '19 Apr',
        competition: 'PL'
      },
      {
        id:          'ars-mci-2026-04-26',
        type:        'current',
        opponent:    'Arsenal',
        opCode:      'ARS',
        homeAway:    'A',
        date:        '26 Apr',
        time:        '12:30',
        competition: 'PL'
      },
      {
        id:          'c-bou',
        type:        'future',
        opponent:    'Bournemouth',
        opCode:      'BOU',
        homeAway:    'A',
        date:        '3 May',
        time:        '15:00',
        competition: 'PL'
      },
      {
        id:          'c-mun',
        type:        'future',
        opponent:    'Man United',
        opCode:      'MUN',
        homeAway:    'H',
        date:        '10 May',
        time:        '14:00',
        competition: 'PL'
      }
    ]
  }

};
