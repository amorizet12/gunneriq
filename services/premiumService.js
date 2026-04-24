// ─────────────────────────────────────────────────────────────────
// services/premiumService.js
//
// Read methods (getLockedFeatures, getPlans, getReviews, getOdds,
// getPrediction) are async and API-ready.
// isPro / activateMockPro stay synchronous (localStorage only).
//
// API endpoints:
//   GET /api/v1/products/pro/features
//   GET /api/v1/products/pro/plans
//   GET /api/v1/fixtures/:id/odds        (requires gambling licence)
//   GET /api/v1/fixtures/:id/predictions (requires ML inference service)
//   GET /api/v1/me/subscription          (requires auth)
// ─────────────────────────────────────────────────────────────────

var PremiumService = {

  getLockedFeatures: async function() {
    if (ApiConfig.USE_REAL_API) {
      try {
        var res = await ApiConfig.request(ApiConfig.endpoints.products() + '/features');
        return res.features || res;
      } catch (err) {
        console.warn('[PremiumService.getLockedFeatures] API error — using mock:', err.message);
      }
    }
    return PREMIUM_DATA.lockedFeatures || [];
  },

  getPlans: async function() {
    if (ApiConfig.USE_REAL_API) {
      try {
        var res = await ApiConfig.request(ApiConfig.endpoints.products() + '/plans');
        return res.plans || res;
      } catch (err) {
        console.warn('[PremiumService.getPlans] API error — using mock:', err.message);
      }
    }
    return PREMIUM_DATA.plans || [];
  },

  getReviews: async function() {
    return PREMIUM_DATA.reviews || [];
  },

  // Returns null until a real odds provider is connected.
  // DO NOT surface raw odds in the UI without a gambling licence.
  getOdds: async function(fixtureId) {
    return null;
    // async real version:
    // const res = await ApiConfig.request(`/fixtures/${fixtureId}/odds`);
    // return res;
  },

  getPrediction: async function(fixtureId) {
    return null;
    // async real version:
    // const res = await ApiConfig.request(`/fixtures/${fixtureId}/predictions`);
    // return res;
  },

  // Sync — reads localStorage
  isPro: function() {
    try { return localStorage.getItem('gunneriq_is_pro') === 'true'; }
    catch(e) { return false; }
    // Real API version:
    // const res = await ApiConfig.request('/me/subscription', {
    //   headers: { Authorization: `Bearer ${AuthService.getToken()}` }
    // });
    // return res.status === 'active';
  },

  // Sync — writes localStorage (mock activation only)
  activateMockPro: function() {
    try { localStorage.setItem('gunneriq_is_pro', 'true'); } catch(e) {}
  },
};
