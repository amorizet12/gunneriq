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
      keywordResponses: {
        yamal:       "Yamal at 18 is already operating at a level most wingers never reach. His ability to cut inside on his left and create from the right channel mirrors classic Barça DNA — pace, technique, and vision in one package.",
        lewandowski: "Lewandowski still leads La Liga with 22 goals at 37. His movement off the ball and link play with Olmo and Pedri is as sharp as his Bundesliga peak. He reads space like no one else in the league.",
        pedri:       "Pedri's 94% pass accuracy and his ability to pick pockets in tight spaces is the engine of Flick's press. He's the modern Iniesta — technically perfect but with more dynamism.",
        flick:       "Flick's 4-2-3-1 is built on vertical pressing and rapid transitions. The back four push high, Casado anchors, and the front four press as a unit. When it clicks, Barcelona are the most intense pressing team in Europe.",
        clasico:     "Barça have won the last four Clásicos, including a 5-2 in January. Madrid have looked more vulnerable since Carvajal's injury, and Barça's high press exploits exactly the kind of defensive line Madrid now use.",
        messi:       "Messi left a legacy that still defines the club's identity. The positional play he perfected under Guardiola — false nine, drifting left, combining with Xavi and Iniesta — is still the template Flick is building towards.",
      },
      fallbackResponses: [
        "Based on current form, Barcelona's press under Flick is the most intense in La Liga. Yamal and Raphinha's width stretches opponents before Pedri picks apart the central spaces.",
        "Lewandowski at 37 is defying logic — 22 goals in 33 games. His movement and link play with Dani Olmo is making this Barcelona attack one of the best in Europe.",
        "The Clásico at Camp Nou is exactly where Barça want it. They've won 4 in a row and Camp Nou under floodlights is the most hostile environment in Spanish football.",
        "Pedri vs Bellingham is the midfield battle Europe is most excited about. Pedri's retention and positioning against Bellingham's late runs and goalscoring — it's a genuine 50-50.",
        "Barcelona's rebuild under Flick has been remarkable — Cubarsí at 17 is already one of La Liga's best defenders, and the academy-to-first-team pipeline is flowing again.",
      ],
    },
    quiz: [
      {
        q:       "In what year was FC Barcelona founded?",
        options: ["1895", "1897", "1899", "1902"],
        answer:  2,
        explanation: "FC Barcelona was founded on 29 November 1899 by a group of Swiss, English, and Spanish footballers led by Joan Gamper.",
      },
      {
        q:       "What is Barcelona's famous club motto?",
        options: ["Més que un club", "Visca el Barça", "Força Barça", "Una idea, una passió"],
        answer:  0,
        explanation: "'Més que un club' (More than a club) has been Barcelona's motto since the Franco era, reflecting their role as a symbol of Catalan identity.",
      },
      {
        q:       "How many goals did Messi score in the 2011/12 La Liga season — a world record at the time?",
        options: ["58", "60", "50", "73"],
        answer:  3,
        explanation: "Lionel Messi scored 73 goals in all competitions during 2011/12, including 50 in La Liga alone — a world record at the time.",
      },
    ],
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
      keywordResponses: {
        mbappe:      "Mbappé's first season at Real Madrid has been transformative — 24 league goals and he's only improving. His relationship with Vinícius creates a left-side partnership that every defence in Europe dreads. The UCL is where he defines his legacy.",
        vinicius:    "Vinícius is the most dangerous left winger in the world right now. His dribbling statistics (5.1 per 90) are the highest in La Liga and his combination play with Bellingham in tight spaces is devastating.",
        bellingham:  "Bellingham's 16 goals from central midfield is staggering. He's the closest thing to a complete midfielder in world football — press-resistant, box-to-box, technically elite, and mentally unbreakable under pressure.",
        ancelotti:   "Ancelotti's genius is man-management. He gives elite players freedom within structure. The 4-3-3 looks simple but the spacing, rotations, and off-ball positioning are meticulously drilled. He wins because players believe in him.",
        clasico:     "Madrid haven't won a Clásico in the league since 2023. The loss of Carvajal has exposed the right flank defensively. But Mbappé away at Camp Nou is a different proposition — he has the pace to run in behind Barça's high line all day.",
        champions:   "Madrid's record 15 European Cups is unmatched. The mentality to win late, in finals, in extra time — it's been built into the club's DNA for 70 years. Every generation of players inherits that belief.",
      },
      fallbackResponses: [
        "Madrid's front three of Vinícius, Mbappé, and Rodrygo are the most dangerous attacking unit in European football right now. Their ability to hurt teams on the counter and through individual brilliance makes them unique.",
        "Bellingham's transformation from box-to-box midfielder to a genuine goal threat from midfield is what separates this Madrid side. 16 goals from the #5 position is an extraordinary number.",
        "Ancelotti has won 4 Champions Leagues as manager for a reason — he understands that elite players need freedom. His squad management and tactical flexibility has kept a 66-year-old coaching career at the very top of the game.",
        "Camp Nou is the most difficult away trip in European football, but Madrid thrive in those environments. The away kit, the white wall of noise, the pressure — historically it has brought out the best in Madrid's biggest players.",
        "Mbappé vs Araújo at Camp Nou is the most compelling individual duel in the world right now. Pace against pace, technique against power. It will define the Clásico.",
      ],
    },
    quiz: [
      {
        q:       "How many UEFA Champions League / European Cups have Real Madrid won — the most of any club?",
        options: ["12", "13", "14", "15"],
        answer:  3,
        explanation: "Real Madrid have won 15 European Cups/Champions League titles, more than any other club in the tournament's history.",
      },
      {
        q:       "Which Real Madrid player won the Ballon d'Or a record 5 times?",
        options: ["Zinedine Zidane", "Ronaldo Nazário", "Cristiano Ronaldo", "Karim Benzema"],
        answer:  2,
        explanation: "Cristiano Ronaldo won 5 Ballon d'Or awards during his time at Real Madrid (2008, 2013, 2014, 2016, 2017), more than any other Madrid player.",
      },
      {
        q:       "In which year did Real Madrid complete the first-ever back-to-back Champions League victories in the modern era?",
        options: ["2014", "2015", "2016", "2017"],
        answer:  2,
        explanation: "Real Madrid became the first club to retain the Champions League trophy in 2016, defeating Atlético Madrid on penalties in Milan.",
      },
    ],
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
      keywordResponses: {
        salah:       "Salah at 33 is having his best statistical season ever — 27 goals and 15 assists puts him in genuinely historic territory. He's settled every contract debate with his performances. If this really is his last season, he's going out at the absolute top.",
        slot:        "Slot's genius has been improving defensive structure without sacrificing the press. Liverpool concede 20% fewer goals than under Klopp while maintaining the same attacking output. He's earned his place as one of the best managers in Europe.",
        vandijk:     "Van Dijk's ability to read the game and organise the backline is what makes Liverpool's high line possible. At 34 he's still covering more ground than midfielders. The contract extension was one of the easiest decisions the club has ever made.",
        klopp:       "Klopp's legacy is everything at Anfield — two Premier Leagues, a Champions League, the domestic treble. Slot hasn't replaced him, he's built on those foundations. But the emotional connection Klopp had with this club was once in a generation.",
        anfield:     "Anfield is the most intimidating stadium in English football on a European night. The acoustic design of the Kop, 22 consecutive home wins, the atmosphere — it's a genuine sporting phenomenon. Away teams concede 0.4 more goals per game there than at neutral venues.",
        champions:   "Liverpool's record of 6 European Cups is the best in English football. The 2019 comeback against Barcelona — 4-0 on the night — is the greatest individual result in Champions League history. Anfield nights are in a category of their own.",
      },
      fallbackResponses: [
        "Slot's Liverpool are on course for their second Premier League title under new management. The defensive improvement while maintaining attacking output is tactically remarkable — Liverpool concede 0.6 fewer goals per game than last season.",
        "Salah is chasing Ian Rush's all-time Liverpool Premier League scoring record and he has two games to break it. At 33, this is a genuinely historic season for one of the greatest players this club has ever seen.",
        "Anfield hasn't lost in 22 consecutive home league games. The combination of crowd noise, the Kop, and Slot's disciplined defensive shape makes Liverpool at home the most difficult challenge in the Premier League.",
        "Gravenberch's evolution from squad player at Bayern to the best defensive midfielder in the Premier League is one of the stories of the season. His calmness under pressure unlocks everything Liverpool do going forward.",
        "Alexander-Arnold's set-piece delivery is the best in the league — 14 assists already this season and most of them come from dead balls. He's still one of the best right backs in the world despite the contract noise.",
      ],
    },
    quiz: [
      {
        q:       "How many European Cups / Champions League titles have Liverpool won?",
        options: ["4", "5", "6", "7"],
        answer:  2,
        explanation: "Liverpool have won the European Cup / Champions League 6 times: 1977, 1978, 1981, 1984, 2005, and 2019 — the most of any English club.",
      },
      {
        q:       "Who scored Liverpool's most famous European goal — the pivotal header against Atlético Madrid at Anfield in 1973?",
        options: ["Kevin Keegan", "Ian Rush", "Kenny Dalglish", "John Toshack"],
        answer:  0,
        explanation: "Kevin Keegan's performances in Liverpool's early European campaigns were pivotal. Liverpool's first European Cup win came in 1977 under Bob Paisley.",
      },
      {
        q:       "Which Liverpool manager won the most league titles in the club's history?",
        options: ["Bill Shankly", "Bob Paisley", "Kenny Dalglish", "Jürgen Klopp"],
        answer:  1,
        explanation: "Bob Paisley won 6 First Division titles (plus 3 European Cups) between 1974 and 1983 — the most successful manager in Liverpool's history.",
      },
    ],
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
      keywordResponses: {
        haaland:     "Haaland's 28 league goals are extraordinary even by his standards. His movement into the channels and hold-up play has improved enormously — he's no longer just a penalty-box poacher, he's a complete centre-forward. The scary part: he's still only 25.",
        debruyne:    "De Bruyne's 17 assists lead the Premier League. His ability to switch play with both feet, combine in tight spaces, and drive from deep makes him the most complete midfielder in world football when fit. City are a different team when he plays.",
        guardiola:   "Guardiola's system at City has evolved every season. The inverted fullback concept, the false nine experiment, the 3-2-4-1 — no manager adapts tactically mid-season better than Pep. His 8 Premier League titles in 12 seasons is unprecedented in the modern era.",
        rodri:       "Rodri won the Ballon d'Or in 2024 and he deserved it. No player in Europe covers more ground while also being the most technically precise defensive midfielder in the game. City's record without him last season proved just how irreplaceable he is.",
        treble:      "The 2022/23 treble was the greatest achievement in Manchester City's history — and arguably in English football history. Winning the Premier League, FA Cup, and Champions League in a single season is something only a handful of clubs have ever done globally.",
        haaland:     "Haaland has scored in 5 consecutive away games. At the Emirates he'll look to isolate Saliba on his right shoulder — that's the space City will target with diagonal switches from De Bruyne.",
      },
      fallbackResponses: [
        "Guardiola's City are at their best when Rodri and De Bruyne dictate tempo simultaneously. Their partnership — defensive control meeting creative brilliance — is the heartbeat of everything City build in the final third.",
        "Haaland's record of 28 league goals is extraordinary. But what makes him even more dangerous this season is his improved link play — he's now creating as well as finishing, dragging defenders before releasing runners from midfield.",
        "The Emirates away trip is one of the toughest in the league, but City have more away points than any other club this season. Guardiola's organisation in transition has been excellent — they concede just 0.7 goals per away game.",
        "City's inverted fullback system creates numerical superiority in central areas. Gvardiol and Walker both push inside, overloading the zones where De Bruyne and Bernardo operate. It's the system that's made City the most technically difficult side to press in English football.",
        "The 2022/23 treble was historic but the squad has evolved. Doku's pace on the left, Haaland's aerial dominance, and De Bruyne's vision combine to make this City attack arguably more dangerous than the treble-winning side.",
      ],
    },
    quiz: [
      {
        q:       "In which season did Manchester City win their first-ever Champions League title?",
        options: ["2020/21", "2021/22", "2022/23", "2023/24"],
        answer:  2,
        explanation: "Manchester City won the Champions League for the first time in 2022/23, defeating Inter Milan 1-0 in Istanbul to complete a historic domestic and European treble.",
      },
      {
        q:       "Who scored the winning goal in City's 2022/23 Champions League final?",
        options: ["Erling Haaland", "Kevin De Bruyne", "Rodri", "Bernardo Silva"],
        answer:  2,
        explanation: "Rodri scored the only goal of the Champions League final against Inter Milan in Istanbul, heading home from a corner in the 68th minute.",
      },
      {
        q:       "How many Premier League titles have Manchester City won under Pep Guardiola?",
        options: ["5", "6", "7", "8"],
        answer:  3,
        explanation: "Pep Guardiola has won 8 Premier League titles with Manchester City since joining in 2016, including four consecutive titles from 2021 to 2024.",
      },
    ],
  },
};
