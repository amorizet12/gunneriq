// ─────────────────────────────────────────────────────────────────
// data/news.js
//
// Latest news articles per team.
// Arsenal is fully populated. Others have empty arrays as placeholders.
//
// WHERE TO PLUG IN THE REAL API LATER:
//   Replace NEWS_DATA with a fetch in newsService.js:
//     GET /api/v1/teams/:slug/news?limit=4
//   Or integrate a news aggregator (e.g. NewsAPI, SportsDB):
//     GET https://newsapi.org/v2/everything?q=Arsenal&language=en
// ─────────────────────────────────────────────────────────────────

// ── News article schema ──────────────────────────────────────────
// {
//   id:          string   — unique article ID
//   tag:         string   — category label shown as a pill (e.g. 'TEAM NEWS')
//   title:       string   — headline
//   summary:     string   — short description (1-2 sentences)
//   source:      string   — publication name (e.g. 'The Athletic')
//   publishedAt: string   — ISO datetime or relative string
//   url:         null     — TODO: link to full article
//   teamSlug:    string   — which team this news belongs to
// }

var NEWS_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL  (fully populated)
  // ═══════════════════════════════════════
  arsenal: [
    {
      id:          'ars-news-001',
      tag:         'TEAM NEWS',
      title:       'Arteta confirms Saka fit for City clash',
      summary:     'Bukayo Saka has been passed fit for Saturday\'s crunch Premier League fixture after missing training on Thursday.',
      source:      'The Athletic',
      publishedAt: '1h ago',
      url:         null,
      teamSlug:    'arsenal',
    },
    {
      id:          'ars-news-002',
      tag:         'TRANSFER',
      title:       'Arsenal tracking Bundesliga striker this summer',
      summary:     'Sources close to the club suggest Arsenal have scouted the striker on multiple occasions over the past three months.',
      source:      'Sky Sports',
      publishedAt: '3h ago',
      url:         null,
      teamSlug:    'arsenal',
    },
    {
      id:          'ars-news-003',
      tag:         'INTERVIEW',
      title:       'Rice: "This weekend is a true six-pointer"',
      summary:     'Declan Rice spoke at length about the significance of Saturday\'s match and Arsenal\'s title ambitions.',
      source:      'BBC Sport',
      publishedAt: '5h ago',
      url:         null,
      teamSlug:    'arsenal',
    },
    {
      id:          'ars-news-004',
      tag:         'TRAINING',
      title:       'Martinelli returns to full training session',
      summary:     'Gabriel Martinelli has rejoined the main group after being managed carefully through the international break.',
      source:      'arsenal.com',
      publishedAt: '8h ago',
      url:         null,
      teamSlug:    'arsenal',
    },
  ],

  // ═══════════════════════════════════════
  // BARCELONA  (placeholder)
  // ═══════════════════════════════════════
  barcelona: [],   // TODO: populate when Barcelona is activated

  // ═══════════════════════════════════════
  // REAL MADRID  (placeholder)
  // ═══════════════════════════════════════
  'real-madrid': [],

  // ═══════════════════════════════════════
  // LIVERPOOL  (placeholder)
  // ═══════════════════════════════════════
  liverpool: [],

  // ═══════════════════════════════════════
  // MAN CITY  (placeholder)
  // ═══════════════════════════════════════
  'man-city': [],
};
