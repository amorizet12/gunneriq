// ─────────────────────────────────────────────────────────────────
// services/pollService.js
//
// Read methods (getScorePoll, getLineupPoll, getFanConfidence) are
// async and API-ready. Vote / streak mutation methods stay
// synchronous because they only touch localStorage.
//
// API endpoints:
//   GET  /api/v1/teams/:slug/polls/score-prediction
//   POST /api/v1/teams/:slug/polls/score-prediction { choice: string }
//   GET  /api/v1/teams/:slug/polls/lineup-vote
//   POST /api/v1/teams/:slug/polls/lineup-vote { playerId, delta }
// ─────────────────────────────────────────────────────────────────

var PollService = {

  // ── Score prediction poll ─────────────────────────────────────

  getScorePoll: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        return await ApiConfig.request(ApiConfig.endpoints.scorePoll(teamSlug));
      } catch (err) {
        console.warn('[PollService.getScorePoll] API error — using mock:', err.message);
      }
    }
    return (POLLS_DATA[teamSlug] || {}).scorePrediction || { options: [], totalVotes: 0 };
  },

  // Sync — reads localStorage only
  getUserScoreVote: function(teamSlug) {
    try { return localStorage.getItem('gunneriq_poll_' + teamSlug) || null; }
    catch(e) { return null; }
  },

  setUserScoreVote: function(teamSlug, choice) {
    try {
      if (choice === null) {
        localStorage.removeItem('gunneriq_poll_' + teamSlug);
      } else {
        localStorage.setItem('gunneriq_poll_' + teamSlug, choice);
      }
    } catch(e) {}

    // ── REAL API (also POST to backend when ready) ────────────────
    // if (ApiConfig.USE_REAL_API) {
    //   ApiConfig.request(ApiConfig.endpoints.scorePoll(teamSlug), {
    //     method: 'POST',
    //     body:   JSON.stringify({ choice }),
    //   }).catch(function(e) { console.warn('PollService vote sync failed:', e.message); });
    // }
  },

  // ── Lineup vote (per-player thumbs-up) ───────────────────────

  getLineupPoll: async function(teamSlug) {
    if (ApiConfig.USE_REAL_API) {
      try {
        return await ApiConfig.request(ApiConfig.endpoints.lineupPoll(teamSlug));
      } catch (err) {
        console.warn('[PollService.getLineupPoll] API error — using mock:', err.message);
      }
    }
    return (POLLS_DATA[teamSlug] || {}).lineupVote || { options: [], totalVotes: 0, question: '' };
  },

  // Sync — reads localStorage only
  getPlayerVotes: function(teamSlug) {
    try {
      var s = localStorage.getItem('gunneriq_votes_' + teamSlug);
      return s ? JSON.parse(s) : {};
    } catch(e) { return {}; }
  },

  getMyVotes: function(teamSlug) {
    try {
      var s = localStorage.getItem('gunneriq_my_votes_' + teamSlug);
      return s ? JSON.parse(s) : {};
    } catch(e) { return {}; }
  },

  togglePlayerVote: function(teamSlug, playerId) {
    var votes      = this.getPlayerVotes(teamSlug);
    var myVotes    = this.getMyVotes(teamSlug);
    var alreadyVoted = !!myVotes[playerId];

    votes[playerId]   = (votes[playerId] || 0) + (alreadyVoted ? -1 : 1);
    myVotes[playerId] = !alreadyVoted;

    try {
      localStorage.setItem('gunneriq_votes_' + teamSlug, JSON.stringify(votes));
      localStorage.setItem('gunneriq_my_votes_' + teamSlug, JSON.stringify(myVotes));
    } catch(e) {}

    return { votes, myVotes };
  },

  // ── Fan confidence ────────────────────────────────────────────

  getFanConfidence: async function(teamSlug) {
    return (POLLS_DATA[teamSlug] || {}).fanConfidence || 50;
  },

  // ── Daily quiz streak (localStorage only — stays synchronous) ──

  getStreak: function() {
    try {
      var s = localStorage.getItem('gunneriq_streak');
      return s ? JSON.parse(s) : { count: 0, lastDate: null };
    } catch(e) { return { count: 0, lastDate: null }; }
  },

  updateStreak: function() {
    var streak    = this.getStreak();
    var today     = new Date().toISOString().slice(0, 10);
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    var newCount = streak.lastDate === today     ? streak.count
                 : streak.lastDate === yesterday ? streak.count + 1
                 : 1;

    var newStreak = { count: newCount, lastDate: today };
    try { localStorage.setItem('gunneriq_streak', JSON.stringify(newStreak)); } catch(e) {}
    return newStreak;
  },

  playedToday: function() {
    return this.getStreak().lastDate === new Date().toISOString().slice(0, 10);
  },
};
