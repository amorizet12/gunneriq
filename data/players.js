// ─────────────────────────────────────────────────────────────────
// data/players.js
//
// Player rosters and predicted lineups for each team.
// Arsenal is fully populated. Other teams have placeholder arrays.
//
// Player ID = jersey number (unique within a team, no collisions).
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
    // ── Injury list (included for Match Hub stats) ──
    {
      id: 18, name: 'Takehiro Tomiyasu',  shortName: 'T. Tomiyasu',
      pitchInitials: 'TT', position: 'RB', number: 18, imagePlaceholder: null,
      stats: { goals: 0, assists: 1, cleanSheets: 0, appearances: 8, yellowCards: 0, redCards: 0 },
      injuryStatus: 'out', injuryNote: 'Knee injury — season over', lineupStatus: 'unavailable', fanVotePct: 0,
    },
  ],

  // Predicted starting lineup layout — rows map to pitch rows (GK → Def → Mid → Att)
  // Each `playerIds` array contains jersey numbers that match players above.
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
  // BARCELONA  (placeholder)
  // ═══════════════════════════════════════
  barcelona: [],
  barcelona_lineup: {
    formation: '4-3-3',
    rows: [],
  },

  // ═══════════════════════════════════════
  // REAL MADRID  (placeholder)
  // ═══════════════════════════════════════
  'real-madrid': [],
  'real-madrid_lineup': {
    formation: '4-3-4',
    rows: [],
  },

  // ═══════════════════════════════════════
  // LIVERPOOL  (placeholder)
  // ═══════════════════════════════════════
  liverpool: [],
  liverpool_lineup: {
    formation: '4-3-3',
    rows: [],
  },

  // ═══════════════════════════════════════
  // MAN CITY  (placeholder)
  // ═══════════════════════════════════════
  'man-city': [],
  'man-city_lineup': {
    formation: '3-2-4-1',
    rows: [],
  },
};
