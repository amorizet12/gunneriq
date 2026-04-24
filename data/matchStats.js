// ─────────────────────────────────────────────────────────────────
// data/matchStats.js
//
// Season stats, head-to-head, key tactical battles, injury list,
// and opponent lineup for the upcoming fixture.
//
// WHERE TO PLUG IN THE REAL API LATER:
//   GET /api/v1/fixtures/:fixtureId/stats
//   GET /api/v1/teams/:slug/season-stats
//   Third-party: Understat (xG), API-Football, Opta/Stats Perform
// ─────────────────────────────────────────────────────────────────

var MATCH_STATS_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL  vs  Man City
  // ═══════════════════════════════════════
  arsenal: {

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
        context:     "Midfield control battle. Rice leads the league in ball recoveries (8.1/90); Rodri dictates City's tempo from deep. Whoever wins this contest likely wins the match.",
        edge:        'neutral',
      },
      {
        teamPlayer:  'Saliba',
        theirPlayer: 'Haaland',
        context:     "Saliba has won 87% of aerial duels vs elite strikers this season. Haaland has failed to score away against top-6 sides in his last 6 attempts.",
        edge:        'arsenal',
      },
    ],

    injuryList: [
      { name: 'Tomiyasu',   status: 'Out',       statusColor: 'var(--loss)' },
      { name: 'Havertz',    status: '75% fit',   statusColor: 'var(--draw)' },
      { name: 'Martinelli', status: 'Available', statusColor: 'var(--win)'  },
    ],

    opponentLineup: {
      teamLabel:      'Man City',
      formation:      '4-3-3',
      playerInitials: ['ED', 'KW', 'RD', 'MA', 'JG', 'RO', 'KD', 'BS', 'PF', 'EH', 'JD'],
    },
  },

  // ═══════════════════════════════════════
  // BARCELONA  vs  Real Madrid
  // ═══════════════════════════════════════
  barcelona: {

    seasonAverages: [
      { label: 'Goals / Game',     teamValue: '2.7',  oppValue: '2.4',  teamWidth: 53 },
      { label: 'xG / Game',        teamValue: '2.5',  oppValue: '2.2',  teamWidth: 53 },
      { label: 'Shots / Game',     teamValue: '17.1', oppValue: '15.6', teamWidth: 52 },
      { label: 'Shots on Target',  teamValue: '6.4',  oppValue: '5.8',  teamWidth: 52 },
      { label: 'Possession',       teamValue: '58%',  oppValue: '54%',  teamWidth: 52 },
      { label: 'Pass Accuracy',    teamValue: '90%',  oppValue: '88%',  teamWidth: 51 },
      { label: 'Press (PPDA)',     teamValue: '7.1',  oppValue: '8.8',  teamWidth: 55 },
      { label: 'Aerial Duels Won', teamValue: '50%',  oppValue: '52%',  teamWidth: 49 },
      { label: 'Corners / Game',   teamValue: '6.8',  oppValue: '5.4',  teamWidth: 56 },
    ],

    h2h: {
      teamWins:   48,
      draws:      22,
      oppWins:    44,
      matchCount: 114,
      description: 'All-time El Clásico record (all competitions)',
      recentMeetings: [
        { date: 'Nov 2025', homeTeam: 'Real Madrid', score: '1–2', result: 'barcelona',   competition: 'LL'  },
        { date: 'Apr 2025', homeTeam: 'Barcelona',   score: '3–2', result: 'barcelona',   competition: 'LL'  },
        { date: 'Jan 2025', homeTeam: 'Barcelona',   score: '5–2', result: 'barcelona',   competition: 'SC'  },
        { date: 'Oct 2024', homeTeam: 'Real Madrid', score: '0–4', result: 'barcelona',   competition: 'LL'  },
      ],
    },

    keyBattles: [
      {
        teamPlayer:  'Yamal',
        theirPlayer: 'Mendy',
        context:     "Yamal has beaten his man 5.4 times per 90 this season — the highest in La Liga. Mendy's pace is his only cover; if Yamal gets a yard, he's lethal.",
        edge:        'barcelona',
      },
      {
        teamPlayer:  'Pedri',
        theirPlayer: 'Bellingham',
        context:     "The marquee midfield battle. Pedri's 94% pass accuracy and 7.2 progressive carries per game vs Bellingham's 16 goals and runs from deep. Whoever dominates the half-spaces controls this game.",
        edge:        'neutral',
      },
      {
        teamPlayer:  'Araújo',
        theirPlayer: 'Mbappé',
        context:     "Araújo's pace and physicality is tailor-made for Mbappé's straight-line running. The Brazilian has conceded 0 dribbles in his last 8 La Liga starts — a remarkable stat.",
        edge:        'barcelona',
      },
    ],

    injuryList: [
      { name: 'Gavi',        status: 'Out',       statusColor: 'var(--loss)' },
      { name: 'ter Stegen',  status: 'Out',       statusColor: 'var(--loss)' },
      { name: 'Dani Olmo',   status: 'Available', statusColor: 'var(--win)'  },
    ],

    opponentLineup: {
      teamLabel:      'Real Madrid',
      formation:      '4-3-3',
      playerInitials: ['TC', 'LV', 'EM', 'AR', 'FM', 'AT', 'FV', 'JB', 'RO', 'KM', 'VJ'],
    },
  },

  // ═══════════════════════════════════════
  // REAL MADRID  vs  Barcelona
  // ═══════════════════════════════════════
  'real-madrid': {

    seasonAverages: [
      { label: 'Goals / Game',     teamValue: '2.4',  oppValue: '2.7',  teamWidth: 47 },
      { label: 'xG / Game',        teamValue: '2.2',  oppValue: '2.5',  teamWidth: 47 },
      { label: 'Shots / Game',     teamValue: '15.6', oppValue: '17.1', teamWidth: 48 },
      { label: 'Shots on Target',  teamValue: '5.8',  oppValue: '6.4',  teamWidth: 48 },
      { label: 'Possession',       teamValue: '54%',  oppValue: '58%',  teamWidth: 48 },
      { label: 'Pass Accuracy',    teamValue: '88%',  oppValue: '90%',  teamWidth: 49 },
      { label: 'Press (PPDA)',     teamValue: '8.8',  oppValue: '7.1',  teamWidth: 45 },
      { label: 'Aerial Duels Won', teamValue: '52%',  oppValue: '50%',  teamWidth: 51 },
      { label: 'Corners / Game',   teamValue: '5.4',  oppValue: '6.8',  teamWidth: 44 },
    ],

    h2h: {
      teamWins:   44,
      draws:      22,
      oppWins:    48,
      matchCount: 114,
      description: 'All-time El Clásico record (all competitions)',
      recentMeetings: [
        { date: 'Nov 2025', homeTeam: 'Real Madrid', score: '1–2', result: 'barcelona',  competition: 'LL'  },
        { date: 'Apr 2025', homeTeam: 'Barcelona',   score: '3–2', result: 'barcelona',  competition: 'LL'  },
        { date: 'Jan 2025', homeTeam: 'Barcelona',   score: '5–2', result: 'barcelona',  competition: 'SC'  },
        { date: 'Oct 2024', homeTeam: 'Real Madrid', score: '0–4', result: 'barcelona',  competition: 'LL'  },
      ],
    },

    keyBattles: [
      {
        teamPlayer:  'Vinícius',
        theirPlayer: 'Koundé',
        context:     "Vinícius has completed 5.1 dribbles per 90 this season — Koundé is his most difficult opponent. This right-side channel will determine whether Madrid can create from open play.",
        edge:        'neutral',
      },
      {
        teamPlayer:  'Bellingham',
        theirPlayer: 'Pedri',
        context:     "Bellingham's 16 goals from midfield are unmatched in Europe. Pedri's positional intelligence and ball-retention will try to prevent Bellingham from finding his dangerous late runs.",
        edge:        'neutral',
      },
      {
        teamPlayer:  'Mbappé',
        theirPlayer: 'Araújo',
        context:     "Mbappé's 24 league goals this season make him the most prolific in Europe. If he gets in behind Barça's high defensive line even once, he has the pace and finish to be decisive.",
        edge:        'real-madrid',
      },
    ],

    injuryList: [
      { name: 'Carvajal',  status: 'Out',       statusColor: 'var(--loss)' },
      { name: 'Alaba',     status: 'Out',       statusColor: 'var(--loss)' },
      { name: 'Bellingham', status: 'Available', statusColor: 'var(--win)'  },
    ],

    opponentLineup: {
      teamLabel:      'Barcelona',
      formation:      '4-2-3-1',
      playerInitials: ['WS', 'JK', 'PC', 'RA', 'AB', 'MC', 'PE', 'LY', 'DO', 'RP', 'RL'],
    },
  },

  // ═══════════════════════════════════════
  // LIVERPOOL  vs  Tottenham
  // ═══════════════════════════════════════
  liverpool: {

    seasonAverages: [
      { label: 'Goals / Game',     teamValue: '2.6',  oppValue: '1.7',  teamWidth: 60 },
      { label: 'xG / Game',        teamValue: '2.4',  oppValue: '1.5',  teamWidth: 61 },
      { label: 'Shots / Game',     teamValue: '16.8', oppValue: '13.2', teamWidth: 56 },
      { label: 'Shots on Target',  teamValue: '6.2',  oppValue: '4.4',  teamWidth: 58 },
      { label: 'Possession',       teamValue: '55%',  oppValue: '46%',  teamWidth: 54 },
      { label: 'Pass Accuracy',    teamValue: '88%',  oppValue: '83%',  teamWidth: 52 },
      { label: 'Press (PPDA)',     teamValue: '7.2',  oppValue: '9.8',  teamWidth: 58 },
      { label: 'Aerial Duels Won', teamValue: '56%',  oppValue: '48%',  teamWidth: 54 },
      { label: 'Corners / Game',   teamValue: '6.4',  oppValue: '4.8',  teamWidth: 57 },
    ],

    h2h: {
      teamWins:   62,
      draws:      21,
      oppWins:    37,
      matchCount: 120,
      description: 'All-time Premier League meetings',
      recentMeetings: [
        { date: 'Jan 2026', homeTeam: 'Tottenham',  score: '1–3', result: 'liverpool', competition: 'PL'  },
        { date: 'Sep 2025', homeTeam: 'Liverpool',  score: '2–1', result: 'liverpool', competition: 'PL'  },
        { date: 'May 2025', homeTeam: 'Tottenham',  score: '0–2', result: 'liverpool', competition: 'PL'  },
        { date: 'Jan 2025', homeTeam: 'Liverpool',  score: '1–1', result: 'draw',      competition: 'PL'  },
      ],
    },

    keyBattles: [
      {
        teamPlayer:  'Salah',
        theirPlayer: 'Udogie',
        context:     "Salah has scored 27 goals this season including 4 against Spurs in the last two encounters. Udogie offers pace on the overlap but has been dribbled past more than any Spurs fullback this term.",
        edge:        'liverpool',
      },
      {
        teamPlayer:  'Gravenberch',
        theirPlayer: 'Sarr',
        context:     "The midfield engine room battle. Gravenberch's ball-carrying from deep has been crucial to Liverpool's press-and-go style. Sarr's energy and work-rate could disrupt Liverpool's rhythm.",
        edge:        'liverpool',
      },
      {
        teamPlayer:  'Van Dijk',
        theirPlayer: 'Son',
        context:     "Son drops into pockets between the lines — Van Dijk's reading of the game makes him almost impossible to beat in those areas. Liverpool's captain has won 91% of duels at Anfield this season.",
        edge:        'liverpool',
      },
    ],

    injuryList: [
      { name: 'Diogo Jota',  status: 'Doubt',     statusColor: 'var(--draw)' },
      { name: 'Thiago',      status: 'Out',        statusColor: 'var(--loss)' },
      { name: 'Robertson',   status: 'Available',  statusColor: 'var(--win)'  },
    ],

    opponentLineup: {
      teamLabel:      'Tottenham',
      formation:      '4-2-3-1',
      playerInitials: ['FO', 'PP', 'RB', 'BJ', 'DU', 'BS', 'YB', 'MS', 'JM', 'HH', 'SO'],
    },
  },

  // ═══════════════════════════════════════
  // MAN CITY  vs  Arsenal (away)
  // ═══════════════════════════════════════
  'man-city': {

    seasonAverages: [
      { label: 'Goals / Game',     teamValue: '2.5',  oppValue: '2.3',  teamWidth: 52 },
      { label: 'xG / Game',        teamValue: '2.3',  oppValue: '2.1',  teamWidth: 52 },
      { label: 'Shots / Game',     teamValue: '14.8', oppValue: '15.4', teamWidth: 49 },
      { label: 'Shots on Target',  teamValue: '5.3',  oppValue: '5.8',  teamWidth: 48 },
      { label: 'Possession',       teamValue: '56%',  oppValue: '52%',  teamWidth: 52 },
      { label: 'Pass Accuracy',    teamValue: '90%',  oppValue: '87%',  teamWidth: 51 },
      { label: 'Press (PPDA)',     teamValue: '8.3',  oppValue: '7.8',  teamWidth: 48 },
      { label: 'Aerial Duels Won', teamValue: '49%',  oppValue: '54%',  teamWidth: 48 },
      { label: 'Corners / Game',   teamValue: '5.9',  oppValue: '6.1',  teamWidth: 49 },
    ],

    h2h: {
      teamWins:   14,
      draws:      6,
      oppWins:    8,
      matchCount: 28,
      description: 'Last 28 Premier League meetings',
      recentMeetings: [
        { date: 'Oct 2025', homeTeam: 'Man City', score: '1–1', result: 'draw',      competition: 'PL'  },
        { date: 'Mar 2025', homeTeam: 'Arsenal',  score: '2–0', result: 'arsenal',   competition: 'PL'  },
        { date: 'Feb 2025', homeTeam: 'Arsenal',  score: '1–0', result: 'arsenal',   competition: 'FAC' },
        { date: 'Sep 2024', homeTeam: 'Man City', score: '2–2', result: 'draw',      competition: 'PL'  },
      ],
    },

    keyBattles: [
      {
        teamPlayer:  'De Bruyne',
        theirPlayer: 'Rice',
        context:     "De Bruyne's 17 assists lead the league. Rice will look to win the ball high and cut City's supply lines early. When De Bruyne gets the ball in space between the lines, Arsenal's shape is tested most.",
        edge:        'neutral',
      },
      {
        teamPlayer:  'Haaland',
        theirPlayer: 'Saliba',
        context:     "Haaland's 28 goals make him the most lethal striker in the division. Saliba has conceded 0 goals in his last 5 games — the collision of form vs ruthlessness is the defining battle.",
        edge:        'neutral',
      },
      {
        teamPlayer:  'Foden',
        theirPlayer: 'Zinchenko',
        context:     "Foden's drifting inside from the right has created havoc for opposition fullbacks all season. Zinchenko's inverted role means he'll be tracking Foden's late runs into the box.",
        edge:        'man-city',
      },
    ],

    injuryList: [
      { name: 'Gündoğan',  status: 'Doubt',     statusColor: 'var(--draw)' },
      { name: 'Walker',    status: 'Available', statusColor: 'var(--win)'  },
      { name: 'Rodri',     status: 'Available', statusColor: 'var(--win)'  },
    ],

    opponentLineup: {
      teamLabel:      'Arsenal',
      formation:      '4-3-3',
      playerInitials: ['DR', 'BW', 'CS', 'OZ', 'KT', 'DR', 'TO', 'KH', 'BS', 'GT', 'LM'],
    },
  },
};
