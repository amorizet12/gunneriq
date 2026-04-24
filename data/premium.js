// ─────────────────────────────────────────────────────────────────
// data/premium.js
//
// Premium feature definitions and pricing.
// Betting/odds data is structured here as a placeholder — do NOT
// connect a live betting API without appropriate licensing.
//
// WHERE TO PLUG IN THE REAL API LATER:
//   Pricing:
//     GET /api/v1/products/pro  (your own backend)
//   Odds / betting insights (requires commercial licence):
//     GET /api/v1/fixtures/:id/odds  (your backend, proxied from odds provider)
//     Providers: Betfair Exchange API, Odds API (the-odds-api.com), Pinnacle
//   Predictions:
//     GET /api/v1/fixtures/:id/predictions  (your ML backend)
// ─────────────────────────────────────────────────────────────────

var PREMIUM_DATA = {

  // ── Subscription plans ────────────────────────────────────────
  plans: [
    {
      id:          'monthly',
      label:       'Monthly',
      price:       '£4.99',
      period:      'per month',
      subtext:     'Cancel anytime',
      badge:       'Most Popular',
      isFeatured:  true,
      trialDays:   7,
      trialText:   '7-day free trial · No card needed',
      annualNote:  'Save 40% with annual — £35.99/yr',
    },
    {
      id:          'annual',
      label:       'Annual',
      price:       '£35.99',
      period:      'per year',
      subtext:     'Billed annually',
      badge:       'Best Value',
      isFeatured:  false,
      trialDays:   7,
      trialText:   '7-day free trial · No card needed',
      annualNote:  null,
    },
  ],

  // ── Locked feature list shown on the Premium screen ──────────
  lockedFeatures: [
    { id: 'predictions',  icon: '📊', label: 'Advanced match prediction models' },
    { id: 'betting',      icon: '🎯', label: 'Betting angles & value finder' },
    { id: 'pro-ai',       icon: '✦',  label: 'Pro AI — deeper tactical analysis' },
    { id: 'deep-stats',   icon: '📈', label: 'Deep stats dashboards & trends' },
    { id: 'alerts',       icon: '🔔', label: 'Priority injury & team news alerts' },
    { id: 'video',        icon: '🎬', label: 'Tactical video breakdowns' },
  ],

  // ── Social proof reviews ──────────────────────────────────────
  reviews: [
    {
      id:     'review-001',
      quote:  '"The match predictions are scarily accurate"',
      handle: '@gooner_dan',
      rating: 5,
    },
    {
      id:     'review-002',
      quote:  '"Best Arsenal app I\'ve used. The AI is next level."',
      handle: '@afc_forever99',
      rating: 5,
    },
  ],

  // ── Betting / odds placeholder ────────────────────────────────
  // This section is intentionally empty. Structure is defined so
  // the service layer knows what shape to expect from the real API.
  // DO NOT populate with real odds without a commercial licence.
  odds: {
    // TODO: fetched from odds provider via your backend proxy
    fixtureId:    null,
    provider:     null,    // e.g. 'betfair' | 'pinnacle'
    lastUpdated:  null,
    markets: {
      matchResult: {
        homeWin: null,    // e.g. 2.10 (decimal odds)
        draw:    null,
        awayWin: null,
      },
      btts:    null,      // Both Teams To Score
      over25:  null,      // Over 2.5 goals
    },
    valueInsights: [],    // TODO: array of { market, reason, confidence }
  },

  // ── AI prediction model output placeholder ────────────────────
  predictions: {
    // TODO: your ML backend populates these
    fixtureId:        null,
    modelVersion:     null,
    predictedScore:   null,   // e.g. { home: 2, away: 1 }
    predictedWinner:  null,
    confidence:       null,   // 0–100
    keyFactors:       [],     // array of strings
    generatedAt:      null,
  },
};
