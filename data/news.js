// ─────────────────────────────────────────────────────────────────
// data/news.js
//
// Latest news articles per team.
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
  // ARSENAL
  // ═══════════════════════════════════════
  arsenal: [
    {
      id:          'ars-news-001',
      tag:         'TEAM NEWS',
      title:       'Arteta confirms Saka fit for City clash',
      summary:     "Bukayo Saka has been passed fit for Saturday's crunch Premier League fixture after missing training on Thursday.",
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
      summary:     "Declan Rice spoke at length about the significance of Saturday's match and Arsenal's title ambitions.",
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
  // BARCELONA
  // ═══════════════════════════════════════
  barcelona: [
    {
      id:          'fcb-news-001',
      tag:         'TEAM NEWS',
      title:       'Flick: "Yamal is ready for the biggest stage"',
      summary:     "Hansi Flick confirmed Lamine Yamal will start Saturday's El Clásico after a stellar week in training, dismissing any concerns over fatigue.",
      source:      'Mundo Deportivo',
      publishedAt: '2h ago',
      url:         null,
      teamSlug:    'barcelona',
    },
    {
      id:          'fcb-news-002',
      tag:         'TRANSFER',
      title:       'Barça in talks over Nico Williams after Clásico',
      summary:     "Barcelona are accelerating talks with Athletic Club over a move for Nico Williams, with a decision expected before the end of the season.",
      source:      'Sport',
      publishedAt: '4h ago',
      url:         null,
      teamSlug:    'barcelona',
    },
    {
      id:          'fcb-news-003',
      tag:         'INJURY',
      title:       'Gavi confirmed out for remainder of season',
      summary:     "Barcelona have ruled out Gavi for the rest of the 2025/26 campaign following a setback in his knee rehabilitation programme.",
      source:      'fc.barcelona',
      publishedAt: '6h ago',
      url:         null,
      teamSlug:    'barcelona',
    },
    {
      id:          'fcb-news-004',
      tag:         'ANALYSIS',
      title:       "Lewandowski closes in on La Liga golden boot",
      summary:     "With 22 goals in 33 games, Robert Lewandowski is just two behind the La Liga scoring leader with four matches remaining.",
      source:      'The Athletic',
      publishedAt: '10h ago',
      url:         null,
      teamSlug:    'barcelona',
    },
  ],

  // ═══════════════════════════════════════
  // REAL MADRID
  // ═══════════════════════════════════════
  'real-madrid': [
    {
      id:          'rma-news-001',
      tag:         'TEAM NEWS',
      title:       'Ancelotti: "Mbappé is at peak form ahead of Clásico"',
      summary:     "Carlo Ancelotti backed Kylian Mbappé to deliver at Camp Nou, pointing to the striker's six goals in his last five La Liga games.",
      source:      'AS',
      publishedAt: '1h ago',
      url:         null,
      teamSlug:    'real-madrid',
    },
    {
      id:          'rma-news-002',
      tag:         'INJURY',
      title:       'Carvajal ruled out for rest of the season',
      summary:     "Dani Carvajal suffered an ACL tear in October and has been confirmed out, with Lucas Vázquez deputising at right back.",
      source:      'Marca',
      publishedAt: '3h ago',
      url:         null,
      teamSlug:    'real-madrid',
    },
    {
      id:          'rma-news-003',
      tag:         'INTERVIEW',
      title:       'Bellingham: "We owe the fans after recent results"',
      summary:     "Jude Bellingham spoke candidly after last week's UCL exit, insisting the squad is fully focused on winning the Clásico at Camp Nou.",
      source:      'BBC Sport',
      publishedAt: '5h ago',
      url:         null,
      teamSlug:    'real-madrid',
    },
    {
      id:          'rma-news-004',
      tag:         'TRANSFER',
      title:       'Madrid target Premier League midfielder this summer',
      summary:     "Real Madrid are monitoring at least two Premier League central midfielders as they plan a squad overhaul ahead of next season.",
      source:      'Fabrizio Romano',
      publishedAt: '9h ago',
      url:         null,
      teamSlug:    'real-madrid',
    },
  ],

  // ═══════════════════════════════════════
  // LIVERPOOL
  // ═══════════════════════════════════════
  liverpool: [
    {
      id:          'liv-news-001',
      tag:         'TEAM NEWS',
      title:       "Slot: 'Jota decision made Sunday morning'",
      summary:     "Arne Slot confirmed Diogo Jota is touch-and-go for the Spurs fixture, with a late fitness test set for match day.",
      source:      'The Athletic',
      publishedAt: '1h ago',
      url:         null,
      teamSlug:    'liverpool',
    },
    {
      id:          'liv-news-002',
      tag:         'CONTRACT',
      title:       'Salah contract talks at advanced stage — reports',
      summary:     "Mohamed Salah's new deal is reportedly close, with the club keen to extend his contract beyond the current season despite interest from Saudi Arabia.",
      source:      'Sky Sports',
      publishedAt: '3h ago',
      url:         null,
      teamSlug:    'liverpool',
    },
    {
      id:          'liv-news-003',
      tag:         'ANALYSIS',
      title:       'How Slot turned Liverpool into a title machine',
      summary:     "A deep dive into the tactical changes Arne Slot made since replacing Klopp — and why the team has conceded 20% fewer goals this season.",
      source:      'The Athletic',
      publishedAt: '6h ago',
      url:         null,
      teamSlug:    'liverpool',
    },
    {
      id:          'liv-news-004',
      tag:         'TRANSFER',
      title:       'Liverpool scouting Bundesliga winger for summer move',
      summary:     "Liverpool's recruitment team has watched the 22-year-old on four occasions this season with a view to a potential summer transfer.",
      source:      'Liverpool Echo',
      publishedAt: '11h ago',
      url:         null,
      teamSlug:    'liverpool',
    },
  ],

  // ═══════════════════════════════════════
  // MAN CITY
  // ═══════════════════════════════════════
  'man-city': [
    {
      id:          'mci-news-001',
      tag:         'TEAM NEWS',
      title:       'Guardiola: "Haaland has never been in better shape"',
      summary:     "Pep Guardiola dismissed concerns over Erling Haaland's form, insisting the Norwegian is peaking at exactly the right moment heading into the final weeks of the season.",
      source:      'Manchester Evening News',
      publishedAt: '2h ago',
      url:         null,
      teamSlug:    'man-city',
    },
    {
      id:          'mci-news-002',
      tag:         'INJURY',
      title:       "Gündoğan fitness doubt for Arsenal trip",
      summary:     "İlkay Gündoğan picked up a minor calf strain in training and faces a late fitness test before Sunday's match at the Emirates.",
      source:      'BBC Sport',
      publishedAt: '4h ago',
      url:         null,
      teamSlug:    'man-city',
    },
    {
      id:          'mci-news-003',
      tag:         'INTERVIEW',
      title:       'De Bruyne: "These are the games you live for"',
      summary:     "Kevin De Bruyne spoke ahead of the trip to the Emirates, calling it a defining moment in City's season and promising an aggressive approach.",
      source:      'Sky Sports',
      publishedAt: '5h ago',
      url:         null,
      teamSlug:    'man-city',
    },
    {
      id:          'mci-news-004',
      tag:         'TRANSFER',
      title:       'City line up Sporting midfielder as Rodri cover',
      summary:     "Manchester City are reportedly close to agreeing terms for a summer signing to provide long-term competition and cover for Rodri in the holding midfield role.",
      source:      'Fabrizio Romano',
      publishedAt: '8h ago',
      url:         null,
      teamSlug:    'man-city',
    },
  ],
};
