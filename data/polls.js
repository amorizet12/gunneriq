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
  // ARSENAL  (fully populated)
  // ═══════════════════════════════════════
  arsenal: {
    // Match Hub — score prediction poll
    scorePrediction: {
      id:          'ars-mci-score-poll',
      totalVotes:  12439,
      options: [
        { label: 'Arsenal win', pct: 52 },
        { label: 'Draw',        pct: 28 },
        { label: 'City win',    pct: 20 },
      ],
    },

    // Fan Zone — lineup selection poll
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

    // Fan confidence — % of fans predicting a win (shown on win probability bar)
    fanConfidence: 57,
  },

  // ═══════════════════════════════════════
  // BARCELONA  (placeholder)
  // ═══════════════════════════════════════
  barcelona: {
    scorePrediction: { id: '', totalVotes: 0, options: [] },
    lineupVote:      { id: '', question: '', totalVotes: 0, closesAt: '', options: [] },
    fanConfidence:   50,
  },

  // ═══════════════════════════════════════
  // REAL MADRID  (placeholder)
  // ═══════════════════════════════════════
  'real-madrid': {
    scorePrediction: { id: '', totalVotes: 0, options: [] },
    lineupVote:      { id: '', question: '', totalVotes: 0, closesAt: '', options: [] },
    fanConfidence:   50,
  },

  // ═══════════════════════════════════════
  // LIVERPOOL  (placeholder)
  // ═══════════════════════════════════════
  liverpool: {
    scorePrediction: { id: '', totalVotes: 0, options: [] },
    lineupVote:      { id: '', question: '', totalVotes: 0, closesAt: '', options: [] },
    fanConfidence:   50,
  },

  // ═══════════════════════════════════════
  // MAN CITY  (placeholder)
  // ═══════════════════════════════════════
  'man-city': {
    scorePrediction: { id: '', totalVotes: 0, options: [] },
    lineupVote:      { id: '', question: '', totalVotes: 0, closesAt: '', options: [] },
    fanConfidence:   50,
  },
};
