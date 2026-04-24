// ─────────────────────────────────────────────────────────────────
// data/teams.js
//
// Central team registry. Each team entry defines everything that
// is club-specific: identity, colors, stadium, AI context, quiz
// questions, and suggested prompts.
//
// HOW TO ADD A NEW TEAM:
//   1. Copy the `arsenal` block below.
//   2. Replace every value (slug, colors, stadium, etc.).
//   3. Set APP_CONFIG.activeTeamSlug to the new slug in GunnerIQ.html.
//
// WHERE TO PLUG IN THE REAL API LATER:
//   Replace TEAMS_DATA with a fetch in teamService.js:
//     GET /api/v1/teams/:slug
// ─────────────────────────────────────────────────────────────────

var TEAMS_DATA = {

  // ═══════════════════════════════════════
  // ARSENAL  (fully populated)
  // ═══════════════════════════════════════
  arsenal: {
    id:        'arsenal',
    name:      'Arsenal FC',
    shortName: 'Arsenal',
    slug:      'arsenal',
    code:      'ARS',             // 3-letter badge code shown in the UI
    league:    'Premier League',
    country:   'England',
    founded:   1886,

    // ── Visual identity ──────────────────
    colors: {
      primary:      '#EF0107',    // Arsenal red — used for CTAs, accents, active nav
      secondary:    '#FFFFFF',
      accent:       '#EF0107',
      background:   '#180A0C',    // dark page tint (very dark maroon)
      heroGradient: 'linear-gradient(150deg,#1C1C2C 0%,#0E0E18 50%,#180A0C 100%)',
      badgeBg:      'rgba(239,1,7,0.15)',
      badgeBorder:  'rgba(239,1,7,0.25)',
    },

    // TODO: replace null with a real CDN URL, e.g. 'https://cdn.example.com/logos/arsenal.svg'
    logoUrl: null,

    // ── Club info ────────────────────────
    stadium:  'Emirates Stadium',
    capacity: 60704,
    manager:  'Mikel Arteta',

    // ── AI Assistant configuration ────────
    // Drives the Chat screen. Swap mockResponses for a real API call in aiService.js.
    aiContext: {
      appName:         'GunnerIQ Assistant',
      appTagline:      'Tactics · Transfers · Analysis · Predictions',
      welcomeMessage:  "I'm GunnerIQ AI — your football intelligence assistant. I cover tactics, transfers, player analysis, betting angles, and anything else you want to dig into. What are we looking at?",
      suggestedPrompts: [
        "How does Arteta's press work?",
        "Saka vs Salah — who's better?",
        "Who should Arsenal sign this summer?",
        "Value bet angle for the next match?",
        "Should Havertz start or Trossard?",
        "Best Arsenal XI of all time?",
        "Explain Arsenal's 4-3-3 half-spaces",
        "Ødegaard vs Bruno Fernandes",
      ],
      // Keyword → response map. Keys are lowercase substrings to match in user input.
      // In the real API these come from your backend. See: aiService.js
      keywordResponses: {
        saka:     "Saka vs. Kyle Walker is the matchup to watch. Walker is still elite but Saka's cut-inside combination play with Ødegaard has been unstoppable this season.",
        rice:     "Rice has covered more ground than any other midfielder in the league this season. His defensive output will be crucial on Saturday.",
        odegaard: "Ødegaard's pressing triggers and positional intelligence are what makes this Arsenal team tick. When he's in the pocket between City's lines, that's where Arsenal create the most danger.",
        history:  "Historically Arsenal win 38% of home games against City in the PL era. But this squad has the quality to improve that record — Saturday feels different.",
        xg:       "Looking at the xG data, Arsenal actually overperform City in direct duels at the Emirates. Home advantage is very real.",
        "set piece": "One thing often overlooked: Arsenal's set-piece routine has produced 8 goals this season. Against a City side that can be vulnerable at corners, that's a real weapon.",
      },
      fallbackResponses: [
        "Based on current form, Arsenal's high press should be highly effective against City's build-up. Saka and Martinelli's intensity from wide areas will be the key tactical battle to watch.",
        "Looking at the xG data, Arsenal actually overperform City in direct duels at the Emirates. Home advantage is very real — they've won 7 of their last 9 home league games.",
        "Rice has covered more ground than any other midfielder in the league this season. His defensive output will be crucial on Saturday — he'll likely shadow either De Bruyne or Rodri.",
        "Ødegaard's pressing triggers and positional intelligence are what makes this Arsenal team tick. When he's in the pocket between City's lines, that's where Arsenal create the most danger.",
        "Historically Arsenal win 38% of their home fixtures against City in the Premier League era. But this current squad has the quality and the home support to improve that record — Saturday feels different.",
      ],
    },

    // ── Daily quiz questions ──────────────
    // 3 multiple-choice questions. `answer` is the 0-based index of the correct option.
    quiz: [
      {
        q:       "Who is Arsenal's all-time leading Premier League scorer?",
        options: ["Ian Wright", "Thierry Henry", "Robin van Persie", "Dennis Bergkamp"],
        answer:  1,
        explanation: "Thierry Henry scored 175 Premier League goals for Arsenal between 1999 and 2007.",
      },
      {
        q:       "In which season did Arsenal go the entire Premier League campaign unbeaten?",
        options: ["2002/03", "2003/04", "2004/05", "2001/02"],
        answer:  1,
        explanation: "The Invincibles went 38 games unbeaten in 2003/04, finishing with 90 points.",
      },
      {
        q:       "How many times have Arsenal won the FA Cup — the most of any club?",
        options: ["10 times", "12 times", "14 times", "16 times"],
        answer:  2,
        explanation: "Arsenal have lifted the FA Cup 14 times, more than any other club in history.",
      },
    ],
  },

  // ═══════════════════════════════════════
  // BARCELONA  (placeholder — populate to activate)
  // ═══════════════════════════════════════
  barcelona: {
    id:        'barcelona',
    name:      'FC Barcelona',
    shortName: 'Barcelona',
    slug:      'barcelona',
    code:      'FCB',
    league:    'La Liga',
    country:   'Spain',
    founded:   1899,
    colors: {
      primary:      '#A50044',
      secondary:    '#004D98',
      accent:       '#EDBB00',
      background:   '#0A0310',
      heroGradient: 'linear-gradient(150deg,#100320 0%,#0A0A18 50%,#100318 100%)',
      badgeBg:      'rgba(165,0,68,0.15)',
      badgeBorder:  'rgba(165,0,68,0.25)',
    },
    logoUrl:  null,
    stadium:  'Spotify Camp Nou',
    capacity: 99354,
    manager:  'Hansi Flick',
    aiContext: {
      appName:         'BarçaIQ Assistant',
      appTagline:      'Tactics · Transfers · Analysis · Predictions',
      welcomeMessage:  "I'm BarçaIQ AI — your football intelligence assistant. Ask me about Barcelona's tactics, transfer targets, tiki-taka evolution, or any football topic. Let's go.",
      suggestedPrompts: [
        "How does Flick's Barça press?",
        "Yamal vs Lamine — future GOAT?",
        "Who should Barça sign?",
        "Barça vs Real Madrid betting angle",
        "Best Barça XI of all time?",
        "Explain Barça's positional play",
        "Pedri vs Iniesta comparison",
        "Should Lewandowski start?",
      ],
      keywordResponses: {},
      fallbackResponses: ["Ask me anything about Barcelona — tactics, history, transfers, or the wider football world."],
    },
    quiz: [],
  },

  // ═══════════════════════════════════════
  // REAL MADRID  (placeholder)
  // ═══════════════════════════════════════
  'real-madrid': {
    id:        'real-madrid',
    name:      'Real Madrid CF',
    shortName: 'Real Madrid',
    slug:      'real-madrid',
    code:      'RMA',
    league:    'La Liga',
    country:   'Spain',
    founded:   1902,
    colors: {
      primary:      '#FEBE10',
      secondary:    '#FFFFFF',
      accent:       '#00529F',
      background:   '#0A0A08',
      heroGradient: 'linear-gradient(150deg,#1A1A10 0%,#0E0E08 50%,#181408 100%)',
      badgeBg:      'rgba(254,190,16,0.15)',
      badgeBorder:  'rgba(254,190,16,0.25)',
    },
    logoUrl:  null,
    stadium:  'Estadio Santiago Bernabéu',
    capacity: 81044,
    manager:  'Carlo Ancelotti',
    aiContext: {
      appName:         'MadridIQ Assistant',
      appTagline:      'Tactics · Transfers · Analysis · Predictions',
      welcomeMessage:  "I'm MadridIQ AI — your Real Madrid intelligence assistant. Tactics, transfers, Champions League history, player analysis. What do you want to break down?",
      suggestedPrompts: [
        "How does Ancelotti set up Madrid?",
        "Vinicius vs Mbappé — who starts?",
        "Who should Madrid sign this summer?",
        "Madrid UCL final betting angle",
        "Best Real Madrid XI of all time?",
        "Explain the Galácticos era",
        "Bellingham vs De Bruyne",
        "Should Modric get a new contract?",
      ],
      keywordResponses: {},
      fallbackResponses: ["Ask me anything about Real Madrid — tactics, history, transfers, or the wider football world."],
    },
    quiz: [],
  },

  // ═══════════════════════════════════════
  // LIVERPOOL  (placeholder)
  // ═══════════════════════════════════════
  liverpool: {
    id:        'liverpool',
    name:      'Liverpool FC',
    shortName: 'Liverpool',
    slug:      'liverpool',
    code:      'LIV',
    league:    'Premier League',
    country:   'England',
    founded:   1892,
    colors: {
      primary:      '#C8102E',
      secondary:    '#F6EB61',
      accent:       '#C8102E',
      background:   '#0C0505',
      heroGradient: 'linear-gradient(150deg,#1C1010 0%,#0E0808 50%,#180808 100%)',
      badgeBg:      'rgba(200,16,46,0.15)',
      badgeBorder:  'rgba(200,16,46,0.25)',
    },
    logoUrl:  null,
    stadium:  'Anfield',
    capacity: 61276,
    manager:  'Arne Slot',
    aiContext: {
      appName:         'KopIQ Assistant',
      appTagline:      'Tactics · Transfers · Analysis · Predictions',
      welcomeMessage:  "I'm KopIQ AI — your Liverpool intelligence assistant. From Slot's press to transfer targets to Anfield history, I've got you covered. What are we analysing?",
      suggestedPrompts: [
        "How does Slot's Liverpool press?",
        "Salah vs prime Ronaldo?",
        "Who should Liverpool sign?",
        "Liverpool title run-in betting angle",
        "Best Liverpool XI of all time?",
        "Explain Liverpool's high line",
        "Szoboszlai vs Thiago comparison",
        "Should Salah get a new deal?",
      ],
      keywordResponses: {},
      fallbackResponses: ["Ask me anything about Liverpool — tactics, history, transfers, or the wider football world."],
    },
    quiz: [],
  },

  // ═══════════════════════════════════════
  // MAN CITY  (placeholder)
  // ═══════════════════════════════════════
  'man-city': {
    id:        'man-city',
    name:      'Manchester City FC',
    shortName: 'Man City',
    slug:      'man-city',
    code:      'MCI',
    league:    'Premier League',
    country:   'England',
    founded:   1880,
    colors: {
      primary:      '#6CABDD',
      secondary:    '#FFFFFF',
      accent:       '#1C2C5B',
      background:   '#050A10',
      heroGradient: 'linear-gradient(150deg,#0E1A2C 0%,#060E18 50%,#080E1A 100%)',
      badgeBg:      'rgba(108,171,221,0.15)',
      badgeBorder:  'rgba(108,171,221,0.25)',
    },
    logoUrl:  null,
    stadium:  'Etihad Stadium',
    capacity: 53400,
    manager:  'Pep Guardiola',
    aiContext: {
      appName:         'CityIQ Assistant',
      appTagline:      'Tactics · Transfers · Analysis · Predictions',
      welcomeMessage:  "I'm CityIQ AI — your Man City intelligence assistant. Guardiola's systems, transfer strategy, title races, tactical breakdowns. What do you want to dig into?",
      suggestedPrompts: [
        "How does Guardiola's City build up?",
        "Haaland vs prime Aguero?",
        "Who should City sign this summer?",
        "City vs Arsenal title decider angle",
        "Best Man City XI of all time?",
        "Explain City's inverted fullback system",
        "De Bruyne vs prime Pirlo",
        "Can City win the Champions League?",
      ],
      keywordResponses: {},
      fallbackResponses: ["Ask me anything about Man City — tactics, history, transfers, or the wider football world."],
    },
    quiz: [],
  },
};
