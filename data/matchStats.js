// ─────────────────────────────────────────────────────────────────
// data/matchStats.js
//
// Season stats, head-to-head, key tactical battles, injury list,
// and opponent lineup for the upcoming fixture.
// Arsenal vs Man City is fully populated; others are placeholders.
//
// WHERE TO PLUG IN THE REAL API LATER:
//   GET /api/v1/fixtures/:fixtureId/stats
//   GET /api/v1/teams/:slug/season-stats
//   Third-party: Understat (xG), API-Football, Opta/Stats Perform
// ─────────────────────────────────────────────────────────────────

var MATCH_STATS_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL  (fully populated)
  // ═══════════════════════════════════════
  arsenal: {

    // Season averages — comparison bars on the Stats tab
    // teamWidth = % fill for the left (team) bar; implies opponent fills the rest
    seasonAverages: [
      { label: 'Goals / Game',     teamValue: '2.3',  oppValue: '2.5',  teamWidth: 48 },
      { label: 'xG / Game',        teamValue: '2.1',  oppValue: '2.3',  teamWidth: 47 },
      { label: 'Shots / Game',     teamValue: '15.4', oppValue: '14.8', teamWidth: 51 },
      { label: 'Shots on Target',  teamValue: '5.8',  oppValue: '5.3',  teamWidth: 52 },
      { label: 'Possession',       teamValue: '52%',  oppValue: '56%',  teamWidth: 44 },
      { label: 'Pass Accuracy',    teamValue: '87%',  oppValue: '90%',  teamWidth: 49 },
      { label: 'Press (PPDA)',     teamValue: '7.8',  oppValue: '8.3',  teamWidth: 52 },
      { label: 'Aerial Duels Won', teamValue: '54%',  oppValue: '49%',  teamWidth: 52 },
      { label: 'Corners / Game',   teamValue: '6.1',  oppValue: '5.9',  teamWidth: 51 },
    ],

    // Head-to-head — overall record + last 4 meetings
    h2h: {
      teamWins:   8,
      draws:      6,
      oppWins:    14,
      matchCount: 28,
      description: 'Last 28 Premier League meetings',
      recentMeetings: [
        { date: 'Oct 2025', homeTeam: 'Man City', score: '1–1', result: 'draw',    competition: 'PL'  },
        { date: 'Mar 2025', homeTeam: 'Arsenal',  score: '2–0', result: 'arsenal', competition: 'PL'  },
        { date: 'Feb 2025', homeTeam: 'Arsenal',  score: '1–0', result: 'arsenal', competition: 'FAC' },
        { date: 'Sep 2024', homeTeam: 'Man City', score: '2–2', result: 'draw',    competition: 'PL'  },
      ],
    },

    // Key individual battles — shown on the Stats tab
    keyBattles: [
      {
        teamPlayer:  'Saka',
        theirPlayer: 'Walker',
        context:     "Arsenal's most productive channel all season. Saka's cut-inside has left Walker exposed — he's been dribbled past 2.4 times per game in recent outings.",
        edge:        'arsenal',
      },
      {
        teamPlayer:  'Rice',
        theirPlayer: 'Rodri',
        context:     'Midfield control battle. Rice leads the league in ball recoveries (8.1/90); Rodri dictates City\'s tempo from deep. Whoever wins this contest likely wins the match.',
        edge:        'neutral',
      },
      {
        teamPlayer:  'Saliba',
        theirPlayer: 'Haaland',
        context:     "Saliba has won 87% of aerial duels vs elite strikers this season. Haaland has failed to score away against top-6 sides in his last 6 attempts.",
        edge:        'arsenal',
      },
    ],

    // Injury and availability list — shown on the Stats tab
    injuryList: [
      { name: 'Tomiyasu',   status: 'Out',       statusColor: 'var(--loss)' },
      { name: 'Havertz',    status: '75% fit',   statusColor: 'var(--draw)' },
      { name: 'Martinelli', status: 'Available', statusColor: 'var(--win)'  },
    ],

    // Opponent lineup (shown on Lineups tab)
    opponentLineup: {
      teamLabel:      'Man City',
      formation:      '3-2-4-1',
      playerInitials: ['EN', 'KW', 'MD', 'NA', 'KG', 'KR', 'KD', 'BS', 'BD', 'RD', 'EH'],
    },
  },

  // ═══════════════════════════════════════
  // BARCELONA  (placeholder)
  // ═══════════════════════════════════════
  barcelona: {
    seasonAverages: [],
    h2h:            { teamWins: 0, draws: 0, oppWins: 0, matchCount: 0, description: '', recentMeetings: [] },
    keyBattles:     [],
    injuryList:     [],
    opponentLineup: { teamLabel: '', formation: '', playerInitials: [] },
  },

  // ═══════════════════════════════════════
  // REAL MADRID  (placeholder)
  // ═══════════════════════════════════════
  'real-madrid': {
    seasonAverages: [],
    h2h:            { teamWins: 0, draws: 0, oppWins: 0, matchCount: 0, description: '', recentMeetings: [] },
    keyBattles:     [],
    injuryList:     [],
    opponentLineup: { teamLabel: '', formation: '', playerInitials: [] },
  },

  // ═══════════════════════════════════════
  // LIVERPOOL  (placeholder)
  // ═══════════════════════════════════════
  liverpool: {
    seasonAverages: [],
    h2h:            { teamWins: 0, draws: 0, oppWins: 0, matchCount: 0, description: '', recentMeetings: [] },
    keyBattles:     [],
    injuryList:     [],
    opponentLineup: { teamLabel: '', formation: '', playerInitials: [] },
  },

  // ═══════════════════════════════════════
  // MAN CITY  (placeholder)
  // ═══════════════════════════════════════
  'man-city': {
    seasonAverages: [],
    h2h:            { teamWins: 0, draws: 0, oppWins: 0, matchCount: 0, description: '', recentMeetings: [] },
    keyBattles:     [],
    injuryList:     [],
    opponentLineup: { teamLabel: '', formation: '', playerInitials: [] },
  },
};
