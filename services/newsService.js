// ─────────────────────────────────────────────────────────────────
// services/newsService.js
//
// All methods are async. When ApiConfig.USE_REAL_API is false
// (the default), they return mock data instantly.
// When USE_REAL_API is true, they call the real API and fall back
// to mock data if the request fails.
//
// API endpoint: GET /api/v1/teams/:slug/news?limit=4
// Third-party options:
//   NewsAPI.org:  GET /v2/everything?q={teamName}&language=en&sortBy=publishedAt
//   Google News:  RSS feed at news.google.com/rss/search?q={teamName}+football
//   SportsDB:     GET https://www.thesportsdb.com/api/v1/json/{key}/searchevents.php
// ─────────────────────────────────────────────────────────────────

var NewsService = {

  getLatestNews: async function(teamSlug, limit) {
    if (ApiConfig.USE_REAL_API) {
      try {
        return await ApiConfig.request(ApiConfig.endpoints.teamNews(teamSlug, limit || 4));
      } catch (err) {
        console.warn('[NewsService.getLatestNews] API error — using mock:', err.message);
      }
    }
    var articles = NEWS_DATA[teamSlug] || [];
    return limit ? articles.slice(0, limit) : articles;
  },

  getArticle: async function(teamSlug, articleId) {
    var articles = NEWS_DATA[teamSlug] || [];
    return articles.find(function(a) { return a.id === articleId; }) || null;
  },
};
