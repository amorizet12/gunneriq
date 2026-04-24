// ─────────────────────────────────────────────────────────────────
// services/apiConfig.js
//
// Central API configuration. Every service reads from this file.
//
// TO ACTIVATE REAL APIs:
//   1. Set USE_REAL_API to true below.
//   2. Make sure API_BASE_URL in GunnerIQ.html points to your backend.
//   3. Your backend must implement the endpoints listed under `endpoints`.
//   4. Run `node server.js` for the AI chat proxy.
//
// That's it — the UI never changes; only the services change.
// ─────────────────────────────────────────────────────────────────

var ApiConfig = {

  // ── Feature flag ──────────────────────────────────────────────
  // false  → every service uses local mock data (default)
  // true   → services attempt real API calls, fall back to mock on error
  USE_REAL_API: false,

  // ── Request timeout ───────────────────────────────────────────
  TIMEOUT_MS: 8000,

  // ── Base URL (inherited from GunnerIQ.html) ───────────────────
  get BASE_URL() {
    return (typeof API_BASE_URL !== 'undefined') ? API_BASE_URL : '/api/v1';
  },

  // ── Centralized endpoint paths ────────────────────────────────
  // One place to update when backend routes change.
  endpoints: {
    team:           function(slug)         { return '/teams/' + slug; },
    teamPlayers:    function(slug)         { return '/teams/' + slug + '/players'; },
    teamLineup:     function(slug)         { return '/teams/' + slug + '/lineup'; },
    teamFixtures:   function(slug)         { return '/teams/' + slug + '/fixtures?status=upcoming&limit=1'; },
    teamForm:       function(slug)         { return '/teams/' + slug + '/form?limit=5'; },
    teamResults:    function(slug, limit)  { return '/teams/' + slug + '/results?limit=' + (limit || 5); },
    teamNews:       function(slug, limit)  { return '/teams/' + slug + '/news?limit='    + (limit || 4); },
    matchStats:     function(slug)         { return '/teams/' + slug + '/match-stats'; },
    scorePoll:      function(slug)         { return '/teams/' + slug + '/polls/score-prediction'; },
    lineupPoll:     function(slug)         { return '/teams/' + slug + '/polls/lineup-vote'; },
    products:       function()             { return '/products/pro'; },
    chat:           function()             { return '/chat'; },
  },

  // ── Request helper ────────────────────────────────────────────
  // Wraps fetch with: timeout via AbortController, JSON parsing,
  // and a clean Error on non-2xx responses.
  // All services call this instead of fetch() directly.
  request: async function(endpoint, options) {
    var url        = this.BASE_URL + endpoint;
    var controller = new AbortController();
    var tid        = setTimeout(function() { controller.abort(); }, ApiConfig.TIMEOUT_MS);

    try {
      var res = await fetch(url, Object.assign({
        headers: { 'Content-Type': 'application/json' },
        signal:  controller.signal,
      }, options || {}));

      clearTimeout(tid);

      if (!res.ok) {
        throw new Error('HTTP ' + res.status + ' from ' + endpoint);
      }
      return await res.json();

    } catch (err) {
      clearTimeout(tid);
      // Rethrow with a clearer message for timeout vs network vs server error
      if (err.name === 'AbortError') {
        throw new Error('Request timed out: ' + endpoint);
      }
      throw err;
    }
  },
};
