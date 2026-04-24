// ─────────────────────────────────────────────────────────────────
// data/players.js
//
// Player rosters and predicted lineups for each team.
//
// Player ID = jersey number (unique within a team).
//
// WHERE TO PLUG IN THE REAL API LATER:
//   Replace PLAYERS_DATA with a fetch in playerService.js:
//     GET /api/v1/teams/:slug/players
//     GET /api/v1/teams/:slug/lineup
// ─────────────────────────────────────────────────────────────────

// ── Player schema ────────────────────────────────────────────────
// {
//   id:             number   — jersey number (unique per team)
//   name:           string   — full name
//   shortName:      string   — display name (e.g. "D. Raya")
//   pitchInitials:  string   — 2-3 chars shown on the pitch graphic
//   position:       string   — GK | RB | CB | LB | DM | CM | CAM | RW | LW | ST
//   number:         number   — shirt number (same as id)
//   imagePlaceholder: null   — TODO: replace with CDN photo URL
//   stats: {
//     goals, assists, cleanSheets, appearances, yellowCards, redCards
//   }
//   injuryStatus:   'available' | 'doubt' | 'out'
//   injuryNote:     string | null
//   lineupStatus:   'starting' | 'bench' | 'unavailable'
//   fanVotePct:     number   — % of fans who want this player to start
// }

var PLAYERS_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL  (fully populated)
  // ═══════════════════════════════════════
  arsenal: [
    {
      id: 22, name: 'David Raya',       shortName: 'D. Raya',
      pitchInitials: 'DR', position: 'GK', number: 22, imagePlaceholder: null,
      stats: { goals: 0, assists: 0, cleanSheets: 14, appearances: 32, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 94,
    },
    {
      id: 4,  name: 'Ben White',         shortName: 'B. White',
      pitchInitials: 'BW', position: 'RB', number: 4, imagePlaceholder: null,
      stats: { goals: 2, assists: 4, cleanSheets: 0, appearances: 29, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 89,
    },
    {
      id: 12, name: 'William Saliba',    shortName: 'W. Saliba',
      pitchInitials: 'CS', position: 'CB', number: 12, imagePlaceholder: null,
      stats: { goals: 3, assists: 1, cleanSheets: 0, appearances: 34, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 96,
    },
    {
      id: 35, name: 'Oleksandr Zinchenko', shortName: 'O. Zinchenko',
      pitchInitials: 'OZ', position: 'CB', number: 35, imagePlaceholder: null,
      stats: { goals: 1, assists: 3, cleanSheets: 0, appearances: 22, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 72,
    },
    {
      id: 3,  name: 'Kieran Tierney',    shortName: 'K. Tierney',
      pitchInitials: 'KT', position: 'LB', number: 3, imagePlaceholder: null,
      stats: { goals: 0, assists: 2, cleanSheets: 0, appearances: 18, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 68,
    },
    {
      id: 41, name: 'Declan Rice',       shortName: 'D. Rice',
      pitchInitials: 'DR', position: 'DM', number: 41, imagePlaceholder: null,
      stats: { goals: 4, assists: 7, cleanSheets: 0, appearances: 35, yellowCards: 6, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 98,
    },
    {
      id: 8,  name: 'Martin Ødegaard',   shortName: 'M. Ødegaard',
      pitchInitials: 'TO', position: 'CM', number: 8, imagePlaceholder: null,
      stats: { goals: 11, assists: 7, cleanSheets: 0, appearances: 30, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 99,
    },
    {
      id: 29, name: 'Kai Havertz',       shortName: 'K. Havertz',
      pitchInitials: 'KH', position: 'CM', number: 29, imagePlaceholder: null,
      stats: { goals: 13, assists: 4, cleanSheets: 0, appearances: 33, yellowCards: 2, redCards: 0 },
      injuryStatus: 'doubt', injuryNote: '75% fit — monitored daily',
      lineupStatus: 'starting', fanVotePct: 76,
    },
    {
      id: 7,  name: 'Bukayo Saka',       shortName: 'B. Saka',
      pitchInitials: 'BS', position: 'RW', number: 7, imagePlaceholder: null,
      stats: { goals: 17, assists: 12, cleanSheets: 0, appearances: 34, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 99,
    },
    {
      id: 19, name: 'Leandro Trossard',  shortName: 'L. Trossard',
      pitchInitials: 'GT', position: 'ST', number: 19, imagePlaceholder: null,
      stats: { goals: 8, assists: 6, cleanSheets: 0, appearances: 31, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 71,
    },
    {
      id: 11, name: 'Gabriel Martinelli', shortName: 'G. Martinelli',
      pitchInitials: 'LM', position: 'LW', number: 11, imagePlaceholder: null,
      stats: { goals: 9, assists: 5, cleanSheets: 0, appearances: 29, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: 'Returned to full training', lineupStatus: 'starting', fanVotePct: 84,
    },
    {
      id: 18, name: 'Takehiro Tomiyasu',  shortName: 'T. Tomiyasu',
      pitchInitials: 'TT', position: 'RB', number: 18, imagePlaceholder: null,
      stats: { goals: 0, assists: 1, cleanSheets: 0, appearances: 8, yellowCards: 0, redCards: 0 },
      injuryStatus: 'out', injuryNote: 'Knee injury — season over', lineupStatus: 'unavailable', fanVotePct: 0,
    },
  ],

  arsenal_lineup: {
    formation: '4-3-3',
    rows: [
      { playerIds: [22],          isGoalkeeper: true },
      { playerIds: [4, 12, 35, 3]               },
      { playerIds: [41, 8, 29]                  },
      { playerIds: [7, 19, 11]                  },
    ],
  },

  // ═══════════════════════════════════════
  // BARCELONA
  // ═══════════════════════════════════════
  barcelona: [
    {
      id: 25, name: 'Wojciech Szczęsny',  shortName: 'W. Szczęsny',
      pitchInitials: 'WS', position: 'GK', number: 25, imagePlaceholder: null,
      stats: { goals: 0, assists: 0, cleanSheets: 11, appearances: 26, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 88,
    },
    {
      id: 23, name: 'Jules Koundé',       shortName: 'J. Koundé',
      pitchInitials: 'JK', position: 'RB', number: 23, imagePlaceholder: null,
      stats: { goals: 3, assists: 5, cleanSheets: 0, appearances: 31, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 92,
    },
    {
      id: 33, name: 'Pau Cubarsí',        shortName: 'P. Cubarsí',
      pitchInitials: 'PC', position: 'CB', number: 33, imagePlaceholder: null,
      stats: { goals: 1, assists: 2, cleanSheets: 0, appearances: 30, yellowCards: 5, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 95,
    },
    {
      id: 4,  name: 'Ronald Araújo',      shortName: 'R. Araújo',
      pitchInitials: 'RA', position: 'CB', number: 4, imagePlaceholder: null,
      stats: { goals: 2, assists: 1, cleanSheets: 0, appearances: 28, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 91,
    },
    {
      id: 3,  name: 'Alejandro Balde',    shortName: 'A. Balde',
      pitchInitials: 'AB', position: 'LB', number: 3, imagePlaceholder: null,
      stats: { goals: 2, assists: 7, cleanSheets: 0, appearances: 32, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 87,
    },
    {
      id: 14, name: 'Marc Casado',        shortName: 'M. Casado',
      pitchInitials: 'MC', position: 'DM', number: 14, imagePlaceholder: null,
      stats: { goals: 1, assists: 3, cleanSheets: 0, appearances: 29, yellowCards: 7, redCards: 1 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 82,
    },
    {
      id: 8,  name: 'Pedri',              shortName: 'Pedri',
      pitchInitials: 'PE', position: 'CM', number: 8, imagePlaceholder: null,
      stats: { goals: 7, assists: 9, cleanSheets: 0, appearances: 27, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 97,
    },
    {
      id: 20, name: 'Dani Olmo',          shortName: 'D. Olmo',
      pitchInitials: 'DO', position: 'CAM', number: 20, imagePlaceholder: null,
      stats: { goals: 10, assists: 8, cleanSheets: 0, appearances: 24, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 89,
    },
    {
      id: 27, name: 'Lamine Yamal',       shortName: 'L. Yamal',
      pitchInitials: 'LY', position: 'RW', number: 27, imagePlaceholder: null,
      stats: { goals: 14, assists: 16, cleanSheets: 0, appearances: 34, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 99,
    },
    {
      id: 9,  name: 'Robert Lewandowski', shortName: 'R. Lewandowski',
      pitchInitials: 'RL', position: 'ST', number: 9, imagePlaceholder: null,
      stats: { goals: 22, assists: 6, cleanSheets: 0, appearances: 33, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 93,
    },
    {
      id: 11, name: 'Raphinha',           shortName: 'Raphinha',
      pitchInitials: 'RP', position: 'LW', number: 11, imagePlaceholder: null,
      stats: { goals: 18, assists: 11, cleanSheets: 0, appearances: 33, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 94,
    },
    {
      id: 6,  name: 'Gavi',              shortName: 'Gavi',
      pitchInitials: 'GV', position: 'CM', number: 6, imagePlaceholder: null,
      stats: { goals: 0, assists: 0, cleanSheets: 0, appearances: 0, yellowCards: 0, redCards: 0 },
      injuryStatus: 'out', injuryNote: 'Knee ligament — season over', lineupStatus: 'unavailable', fanVotePct: 0,
    },
  ],

  barcelona_lineup: {
    formation: '4-2-3-1',
    rows: [
      { playerIds: [25],             isGoalkeeper: true },
      { playerIds: [23, 33, 4, 3]                    },
      { playerIds: [14, 8]                            },
      { playerIds: [27, 20, 11]                       },
      { playerIds: [9]                                },
    ],
  },

  // ═══════════════════════════════════════
  // REAL MADRID
  // ═══════════════════════════════════════
  'real-madrid': [
    {
      id: 1,  name: 'Thibaut Courtois',  shortName: 'T. Courtois',
      pitchInitials: 'TC', position: 'GK', number: 1, imagePlaceholder: null,
      stats: { goals: 0, assists: 0, cleanSheets: 13, appearances: 29, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 96,
    },
    {
      id: 17, name: 'Lucas Vázquez',     shortName: 'L. Vázquez',
      pitchInitials: 'LV', position: 'RB', number: 17, imagePlaceholder: null,
      stats: { goals: 1, assists: 3, cleanSheets: 0, appearances: 25, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 71,
    },
    {
      id: 3,  name: 'Éder Militão',      shortName: 'É. Militão',
      pitchInitials: 'EM', position: 'CB', number: 3, imagePlaceholder: null,
      stats: { goals: 2, assists: 1, cleanSheets: 0, appearances: 28, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 88,
    },
    {
      id: 22, name: 'Antonio Rüdiger',   shortName: 'A. Rüdiger',
      pitchInitials: 'AR', position: 'CB', number: 22, imagePlaceholder: null,
      stats: { goals: 3, assists: 1, cleanSheets: 0, appearances: 31, yellowCards: 5, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 90,
    },
    {
      id: 23, name: 'Ferland Mendy',     shortName: 'F. Mendy',
      pitchInitials: 'FM', position: 'LB', number: 23, imagePlaceholder: null,
      stats: { goals: 1, assists: 4, cleanSheets: 0, appearances: 27, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 80,
    },
    {
      id: 14, name: 'Aurélien Tchouaméni', shortName: 'A. Tchouaméni',
      pitchInitials: 'AT', position: 'DM', number: 14, imagePlaceholder: null,
      stats: { goals: 3, assists: 2, cleanSheets: 0, appearances: 30, yellowCards: 6, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 84,
    },
    {
      id: 15, name: 'Federico Valverde',  shortName: 'F. Valverde',
      pitchInitials: 'FV', position: 'CM', number: 15, imagePlaceholder: null,
      stats: { goals: 8, assists: 6, cleanSheets: 0, appearances: 33, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 93,
    },
    {
      id: 5,  name: 'Jude Bellingham',   shortName: 'J. Bellingham',
      pitchInitials: 'JB', position: 'CM', number: 5, imagePlaceholder: null,
      stats: { goals: 16, assists: 11, cleanSheets: 0, appearances: 31, yellowCards: 5, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 98,
    },
    {
      id: 11, name: 'Rodrygo Goes',      shortName: 'Rodrygo',
      pitchInitials: 'RO', position: 'RW', number: 11, imagePlaceholder: null,
      stats: { goals: 12, assists: 8, cleanSheets: 0, appearances: 32, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 87,
    },
    {
      id: 9,  name: 'Kylian Mbappé',     shortName: 'K. Mbappé',
      pitchInitials: 'KM', position: 'ST', number: 9, imagePlaceholder: null,
      stats: { goals: 24, assists: 9, cleanSheets: 0, appearances: 34, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 97,
    },
    {
      id: 7,  name: 'Vinícius Júnior',   shortName: 'Vinícius',
      pitchInitials: 'VJ', position: 'LW', number: 7, imagePlaceholder: null,
      stats: { goals: 19, assists: 13, cleanSheets: 0, appearances: 33, yellowCards: 5, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 98,
    },
    {
      id: 2,  name: 'Dani Carvajal',     shortName: 'D. Carvajal',
      pitchInitials: 'DC', position: 'RB', number: 2, imagePlaceholder: null,
      stats: { goals: 0, assists: 0, cleanSheets: 0, appearances: 4, yellowCards: 0, redCards: 0 },
      injuryStatus: 'out', injuryNote: 'ACL — season over', lineupStatus: 'unavailable', fanVotePct: 0,
    },
  ],

  'real-madrid_lineup': {
    formation: '4-3-3',
    rows: [
      { playerIds: [1],               isGoalkeeper: true },
      { playerIds: [17, 3, 22, 23]                    },
      { playerIds: [14, 15, 5]                        },
      { playerIds: [11, 9, 7]                         },
    ],
  },

  // ═══════════════════════════════════════
  // LIVERPOOL
  // ═══════════════════════════════════════
  liverpool: [
    {
      id: 1,  name: 'Alisson Becker',    shortName: 'Alisson',
      pitchInitials: 'AL', position: 'GK', number: 1, imagePlaceholder: null,
      stats: { goals: 0, assists: 0, cleanSheets: 16, appearances: 33, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 97,
    },
    {
      id: 66, name: 'Trent Alexander-Arnold', shortName: 'T. Alexander-Arnold',
      pitchInitials: 'TA', position: 'RB', number: 66, imagePlaceholder: null,
      stats: { goals: 4, assists: 14, cleanSheets: 0, appearances: 32, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 91,
    },
    {
      id: 5,  name: 'Ibrahima Konaté',   shortName: 'I. Konaté',
      pitchInitials: 'IK', position: 'CB', number: 5, imagePlaceholder: null,
      stats: { goals: 2, assists: 0, cleanSheets: 0, appearances: 29, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 88,
    },
    {
      id: 4,  name: 'Virgil van Dijk',   shortName: 'V. van Dijk',
      pitchInitials: 'VD', position: 'CB', number: 4, imagePlaceholder: null,
      stats: { goals: 4, assists: 2, cleanSheets: 0, appearances: 34, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 98,
    },
    {
      id: 26, name: 'Andrew Robertson',  shortName: 'A. Robertson',
      pitchInitials: 'AR', position: 'LB', number: 26, imagePlaceholder: null,
      stats: { goals: 2, assists: 8, cleanSheets: 0, appearances: 31, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 86,
    },
    {
      id: 38, name: 'Ryan Gravenberch',  shortName: 'R. Gravenberch',
      pitchInitials: 'RG', position: 'DM', number: 38, imagePlaceholder: null,
      stats: { goals: 3, assists: 5, cleanSheets: 0, appearances: 33, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 90,
    },
    {
      id: 10, name: 'Alexis Mac Allister', shortName: 'A. Mac Allister',
      pitchInitials: 'AM', position: 'CM', number: 10, imagePlaceholder: null,
      stats: { goals: 6, assists: 7, cleanSheets: 0, appearances: 32, yellowCards: 5, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 88,
    },
    {
      id: 8,  name: 'Dominik Szoboszlai', shortName: 'D. Szoboszlai',
      pitchInitials: 'DS', position: 'CM', number: 8, imagePlaceholder: null,
      stats: { goals: 7, assists: 9, cleanSheets: 0, appearances: 30, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 85,
    },
    {
      id: 11, name: 'Mohamed Salah',     shortName: 'M. Salah',
      pitchInitials: 'MS', position: 'RW', number: 11, imagePlaceholder: null,
      stats: { goals: 27, assists: 15, cleanSheets: 0, appearances: 35, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 99,
    },
    {
      id: 9,  name: 'Darwin Núñez',      shortName: 'D. Núñez',
      pitchInitials: 'DN', position: 'ST', number: 9, imagePlaceholder: null,
      stats: { goals: 14, assists: 7, cleanSheets: 0, appearances: 30, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 78,
    },
    {
      id: 7,  name: 'Luis Díaz',         shortName: 'L. Díaz',
      pitchInitials: 'LD', position: 'LW', number: 7, imagePlaceholder: null,
      stats: { goals: 12, assists: 8, cleanSheets: 0, appearances: 31, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 87,
    },
    {
      id: 20, name: 'Diogo Jota',        shortName: 'D. Jota',
      pitchInitials: 'DJ', position: 'ST', number: 20, imagePlaceholder: null,
      stats: { goals: 5, assists: 3, cleanSheets: 0, appearances: 18, yellowCards: 1, redCards: 0 },
      injuryStatus: 'doubt', injuryNote: 'Hamstring — monitored ahead of Spurs',
      lineupStatus: 'bench', fanVotePct: 62,
    },
  ],

  liverpool_lineup: {
    formation: '4-3-3',
    rows: [
      { playerIds: [1],               isGoalkeeper: true },
      { playerIds: [66, 5, 4, 26]                    },
      { playerIds: [38, 10, 8]                       },
      { playerIds: [11, 9, 7]                        },
    ],
  },

  // ═══════════════════════════════════════
  // MAN CITY
  // ═══════════════════════════════════════
  'man-city': [
    {
      id: 31, name: 'Ederson',           shortName: 'Ederson',
      pitchInitials: 'ED', position: 'GK', number: 31, imagePlaceholder: null,
      stats: { goals: 0, assists: 0, cleanSheets: 12, appearances: 30, yellowCards: 1, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 93,
    },
    {
      id: 2,  name: 'Kyle Walker',       shortName: 'K. Walker',
      pitchInitials: 'KW', position: 'RB', number: 2, imagePlaceholder: null,
      stats: { goals: 0, assists: 3, cleanSheets: 0, appearances: 28, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 76,
    },
    {
      id: 3,  name: 'Rúben Dias',        shortName: 'R. Dias',
      pitchInitials: 'RD', position: 'CB', number: 3, imagePlaceholder: null,
      stats: { goals: 1, assists: 2, cleanSheets: 0, appearances: 32, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 95,
    },
    {
      id: 25, name: 'Manuel Akanji',     shortName: 'M. Akanji',
      pitchInitials: 'MA', position: 'CB', number: 25, imagePlaceholder: null,
      stats: { goals: 2, assists: 1, cleanSheets: 0, appearances: 29, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 82,
    },
    {
      id: 24, name: 'Joško Gvardiol',    shortName: 'J. Gvardiol',
      pitchInitials: 'JG', position: 'LB', number: 24, imagePlaceholder: null,
      stats: { goals: 5, assists: 6, cleanSheets: 0, appearances: 31, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 89,
    },
    {
      id: 16, name: 'Rodri',             shortName: 'Rodri',
      pitchInitials: 'RO', position: 'DM', number: 16, imagePlaceholder: null,
      stats: { goals: 3, assists: 6, cleanSheets: 0, appearances: 30, yellowCards: 5, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 97,
    },
    {
      id: 17, name: 'Kevin De Bruyne',   shortName: 'K. De Bruyne',
      pitchInitials: 'KD', position: 'CM', number: 17, imagePlaceholder: null,
      stats: { goals: 9, assists: 17, cleanSheets: 0, appearances: 28, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 98,
    },
    {
      id: 20, name: 'Bernardo Silva',    shortName: 'B. Silva',
      pitchInitials: 'BS', position: 'CM', number: 20, imagePlaceholder: null,
      stats: { goals: 7, assists: 8, cleanSheets: 0, appearances: 32, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 91,
    },
    {
      id: 47, name: 'Phil Foden',        shortName: 'P. Foden',
      pitchInitials: 'PF', position: 'RW', number: 47, imagePlaceholder: null,
      stats: { goals: 13, assists: 10, cleanSheets: 0, appearances: 31, yellowCards: 2, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 94,
    },
    {
      id: 9,  name: 'Erling Haaland',   shortName: 'E. Haaland',
      pitchInitials: 'EH', position: 'ST', number: 9, imagePlaceholder: null,
      stats: { goals: 28, assists: 5, cleanSheets: 0, appearances: 33, yellowCards: 4, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 99,
    },
    {
      id: 11, name: 'Jérémy Doku',      shortName: 'J. Doku',
      pitchInitials: 'JD', position: 'LW', number: 11, imagePlaceholder: null,
      stats: { goals: 6, assists: 9, cleanSheets: 0, appearances: 28, yellowCards: 3, redCards: 0 },
      injuryStatus: 'available', injuryNote: null, lineupStatus: 'starting', fanVotePct: 83,
    },
    {
      id: 8,  name: 'İlkay Gündoğan',  shortName: 'İ. Gündoğan',
      pitchInitials: 'IG', position: 'CM', number: 8, imagePlaceholder: null,
      stats: { goals: 4, assists: 5, cleanSheets: 0, appearances: 20, yellowCards: 1, redCards: 0 },
      injuryStatus: 'doubt', injuryNote: 'Calf strain — fitness test Saturday',
      lineupStatus: 'bench', fanVotePct: 58,
    },
  ],

  'man-city_lineup': {
    formation: '4-3-3',
    rows: [
      { playerIds: [31],              isGoalkeeper: true },
      { playerIds: [2, 3, 25, 24]                    },
      { playerIds: [16, 17, 20]                      },
      { playerIds: [47, 9, 11]                       },
    ],
  },
};
