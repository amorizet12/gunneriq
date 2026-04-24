// ─────────────────────────────────────────────────────────────────
// data/polls.js
//
// Default poll options and baseline vote counts.
// User-specific votes are stored separately in localStorage
// (managed by pollService.js — not here).
//
// WHERE TO PLUG IN THE REAL API LATER:
//   Replace POLLS_DATA with fetches in pollService.js:
//     GET  /api/v1/teams/:slug/polls/score-prediction
//     POST /api/v1/teams/:slug/polls/score-prediction { choice: 'Arsenal win' }
//     GET  /api/v1/teams/:slug/polls/lineup-vote
//     POST /api/v1/teams/:slug/polls/lineup-vote { playerId: 7, vote: 1 }
// ─────────────────────────────────────────────────────────────────

var POLLS_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL
  // ═══════════════════════════════════════
  arsenal: {
    scorePrediction: {
      id:          'ars-mci-score-poll',
      totalVotes:  12439,
      options: [
        { label: 'Arsenal win', pct: 52 },
        { label: 'Draw',        pct: 28 },
        { label: 'City win',    pct: 20 },
      ],
    },
    lineupVote: {
      id:          'ars-lineup-vote-gw35',
      question:    'Who Starts vs City?',
      totalVotes:  8217,
      closesAt:    'midnight',
      options: [
        { label: 'Havertz (CF)',  pct: 44 },
        { label: 'Trossard (CF)', pct: 33 },
        { label: 'Nketiah (CF)',  pct: 23 },
      ],
    },
    fanConfidence: 57,
  },

  // ═══════════════════════════════════════
  // BARCELONA
  // ═══════════════════════════════════════
  barcelona: {
    scorePrediction: {
      id:          'fcb-rma-score-poll',
      totalVotes:  18742,
      options: [
        { label: 'Barça win',    pct: 48 },
        { label: 'Draw',         pct: 24 },
        { label: 'Madrid win',   pct: 28 },
      ],
    },
    lineupVote: {
      id:          'fcb-lineup-vote-gw34',
      question:    'Who partners Casado vs Madrid?',
      totalVotes:  9831,
      closesAt:    'midnight',
      options: [
        { label: 'Pedri (CM)',    pct: 61 },
        { label: 'Gündoğan (CM)', pct: 22 },
        { label: 'Fermín (CM)',   pct: 17 },
      ],
    },
    fanConfidence: 61,
  },

  // ═══════════════════════════════════════
  // REAL MADRID
  // ═══════════════════════════════════════
  'real-madrid': {
    scorePrediction: {
      id:          'rma-fcb-score-poll',
      totalVotes:  16504,
      options: [
        { label: 'Madrid win',  pct: 41 },
        { label: 'Draw',        pct: 26 },
        { label: 'Barça win',   pct: 33 },
      ],
    },
    lineupVote: {
      id:          'rma-lineup-vote-gw34',
      question:    'Who starts on the right flank?',
      totalVotes:  7614,
      closesAt:    'midnight',
      options: [
        { label: 'Rodrygo (RW)',   pct: 54 },
        { label: 'Brahim (RW)',    pct: 28 },
        { label: 'Valverde (RW)', pct: 18 },
      ],
    },
    fanConfidence: 44,
  },

  // ═══════════════════════════════════════
  // LIVERPOOL
  // ═══════════════════════════════════════
  liverpool: {
    scorePrediction: {
      id:          'liv-tot-score-poll',
      totalVotes:  11283,
      options: [
        { label: 'Liverpool win', pct: 67 },
        { label: 'Draw',          pct: 19 },
        { label: 'Spurs win',     pct: 14 },
      ],
    },
    lineupVote: {
      id:          'liv-lineup-vote-gw35',
      question:    "Who leads the line vs Spurs?",
      totalVotes:  6942,
      closesAt:    'midnight',
      options: [
        { label: 'Núñez (ST)',    pct: 52 },
        { label: 'Jota (ST)',     pct: 31 },
        { label: 'Gakpo (ST)',    pct: 17 },
      ],
    },
    fanConfidence: 74,
  },

  // ═══════════════════════════════════════
  // MAN CITY
  // ═══════════════════════════════════════
  'man-city': {
    scorePrediction: {
      id:          'mci-ars-score-poll',
      totalVotes:  10817,
      options: [
        { label: 'City win',    pct: 39 },
        { label: 'Draw',        pct: 27 },
        { label: 'Arsenal win', pct: 34 },
      ],
    },
    lineupVote: {
      id:          'mci-lineup-vote-gw35',
      question:    'Who plays the #10 role vs Arsenal?',
      totalVotes:  5563,
      closesAt:    'midnight',
      options: [
        { label: 'De Bruyne (CM)',  pct: 58 },
        { label: 'Bernardo (CM)',   pct: 26 },
        { label: 'Foden (RW→10)',  pct: 16 },
      ],
    },
    fanConfidence: 39,
  },
};
