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

    // ── Quiz questions (15 total for variable-length quiz support) ──
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
      {
        q:       "Who managed Arsenal during the dramatic 1988/89 title win on the final day at Anfield?",
        options: ["Terry Neill", "George Graham", "Don Howe", "Bertie Mee"],
        answer:  1,
        explanation: "George Graham led Arsenal to the title in 1988/89, winning 2-0 at Anfield on the final day to clinch it on goal difference.",
      },
      {
        q:       "In which year did Arsenal move from Highbury to the Emirates Stadium?",
        options: ["2004", "2005", "2006", "2007"],
        answer:  2,
        explanation: "Arsenal moved to the Emirates Stadium ahead of the 2006/07 season after 93 years at Highbury.",
      },
      {
        q:       "What was Arsenal's original name when founded in 1886?",
        options: ["Royal Arsenal", "Dial Square", "Woolwich Arsenal", "London FC"],
        answer:  1,
        explanation: "The club was founded as Dial Square in 1886, named after a workshop at the Woolwich Arsenal munitions factory.",
      },
      {
        q:       "Which player holds the record for most appearances for Arsenal?",
        options: ["Tony Adams", "Lee Dixon", "David O'Leary", "Nigel Winterburn"],
        answer:  2,
        explanation: "David O'Leary made 722 appearances for Arsenal between 1975 and 1993 — more than any other player in the club's history.",
      },
      {
        q:       "How many goals did Thierry Henry score for Arsenal in all competitions?",
        options: ["196", "211", "228", "243"],
        answer:  2,
        explanation: "Thierry Henry scored 228 goals for Arsenal across two spells, making him the club's all-time leading scorer in all competitions.",
      },
      {
        q:       "Who scored the only goal in Arsenal's 2003 FA Cup final win over Southampton?",
        options: ["Robert Pires", "Thierry Henry", "Sylvain Wiltord", "Freddie Ljungberg"],
        answer:  0,
        explanation: "Robert Pires scored Arsenal's winner in the 2003 FA Cup final at Cardiff's Millennium Stadium, with Arsenal winning 1-0.",
      },
      {
        q:       "What is Arsenal's record unbeaten run in the Premier League?",
        options: ["42 games", "45 games", "47 games", "49 games"],
        answer:  3,
        explanation: "Arsenal's 49-game unbeaten Premier League run stretched from May 2003 to October 2004, a record in English football that still stands.",
      },
      {
        q:       "Which competition did Arsenal win by beating Parma 1-0 in the 1994 final in Copenhagen?",
        options: ["UEFA Cup", "Champions League", "UEFA Cup Winners' Cup", "UEFA Super Cup"],
        answer:  2,
        explanation: "Arsenal beat Parma 1-0 in the 1994 UEFA Cup Winners' Cup final in Copenhagen, with Alan Smith scoring the only goal.",
      },
      {
        q:       "Mikel Arteta wore which squad number during his playing career at Arsenal (2011–16)?",
        options: ["7", "8", "10", "11"],
        answer:  1,
        explanation: "Mikel Arteta wore the number 8 shirt at Arsenal — the same number now worn by captain Martin Ødegaard.",
      },
      {
        q:       "Which club did Arsène Wenger manage immediately before joining Arsenal in 1996?",
        options: ["PSG", "Monaco", "Marseille", "Nantes"],
        answer:  1,
        explanation: "Wenger won the French league with Monaco in 1988, then managed Nagoya Grampus Eight in Japan before joining Arsenal in September 1996.",
      },
      {
        q:       "Who won the PFA Players' Player of the Year award in both 2003 and 2004?",
        options: ["Patrick Vieira", "Robert Pires", "Thierry Henry", "Ashley Cole"],
        answer:  2,
        explanation: "Thierry Henry became only the second player to win the PFA Players' Player of the Year in consecutive seasons (2003 and 2004).",
      },
      {
        q:       "Which Arsenal striker scored 26 Premier League goals in the 2004/05 season?",
        options: ["Robert Pires", "Dennis Bergkamp", "Thierry Henry", "José Antonio Reyes"],
        answer:  2,
        explanation: "Thierry Henry scored 25 league goals in 2004/05, finishing as the Premier League's top scorer for the third time.",
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
        q:       "How many goals did Messi score in all competitions during the 2011/12 season — a world record at the time?",
        options: ["58", "60", "50", "73"],
        answer:  3,
        explanation: "Lionel Messi scored 73 goals in all competitions during 2011/12, including 50 in La Liga alone — a world record at the time.",
      },
      {
        q:       "How many Champions League titles has Barcelona won?",
        options: ["3", "4", "5", "6"],
        answer:  2,
        explanation: "Barcelona have won the UEFA Champions League 5 times: 1992, 2006, 2009, 2011, and 2015.",
      },
      {
        q:       "Which manager led Barcelona to their first European Cup in 1992?",
        options: ["Rinus Michels", "Johan Cruyff", "Bobby Robson", "Louis van Gaal"],
        answer:  1,
        explanation: "Johan Cruyff managed Barcelona to their first European Cup title in 1992, a 1-0 win over Sampdoria at Wembley with Ronald Koeman's decisive free kick.",
      },
      {
        q:       "Who scored the winning goal in Barcelona's 1992 European Cup final against Sampdoria?",
        options: ["Ronald Koeman", "Pep Guardiola", "Michael Laudrup", "Hristo Stoichkov"],
        answer:  0,
        explanation: "Ronald Koeman scored the only goal of the final with a powerful direct free kick, giving Barcelona their first European Cup.",
      },
      {
        q:       "What nickname are Barcelona fans known by?",
        options: ["Los Azules", "Els Culers", "Los Blaugranas", "Los Merengues"],
        answer:  1,
        explanation: "Barcelona fans are nicknamed 'Els Culers' (Los Culés in Spanish), originating from spectators watching over the old ground walls who were only seen from behind.",
      },
      {
        q:       "How many total goals did Lionel Messi score for Barcelona in all competitions?",
        options: ["542", "612", "672", "700"],
        answer:  2,
        explanation: "Messi scored 672 goals for Barcelona across all competitions from 2004 to 2021, making him the club's all-time leading scorer by a wide margin.",
      },
      {
        q:       "In which season did Pep Guardiola's Barcelona win their first treble (Liga, Copa del Rey, Champions League)?",
        options: ["2007/08", "2008/09", "2010/11", "2014/15"],
        answer:  1,
        explanation: "In 2008/09, Guardiola's first season, Barcelona won La Liga, Copa del Rey, and Champions League — the first Spanish club to win the treble.",
      },
      {
        q:       "Which player wore the iconic number 10 shirt before Lionel Messi at Barcelona?",
        options: ["Rivaldo", "Ronaldinho", "Saviola", "Xavi"],
        answer:  1,
        explanation: "Ronaldinho wore the number 10 shirt at Barcelona from 2003 to 2008, and his brilliance helped bring a teenage Messi through the ranks.",
      },
      {
        q:       "What was the score when Barcelona beat Real Madrid in the Camp Nou Clásico in November 2010?",
        options: ["3-1", "4-0", "5-0", "6-2"],
        answer:  2,
        explanation: "Barcelona produced one of the most dominant Clásico performances in history, winning 5-0 at the Camp Nou on 29 November 2010.",
      },
      {
        q:       "In which year was the Camp Nou officially opened?",
        options: ["1954", "1957", "1960", "1963"],
        answer:  1,
        explanation: "The Camp Nou was officially opened on 24 September 1957, and has since become one of the most iconic football stadiums in the world.",
      },
      {
        q:       "How many La Liga titles has Barcelona won?",
        options: ["22", "25", "27", "30"],
        answer:  2,
        explanation: "Barcelona have won La Liga 27 times, making them one of the most successful clubs in the history of Spanish football.",
      },
      {
        q:       "Which position did Xavi Hernández primarily play during his Barcelona career?",
        options: ["Striker", "Central midfielder", "Centre-back", "Left winger"],
        answer:  1,
        explanation: "Xavi played as a deep-lying playmaker and central midfielder, making 767 appearances for Barcelona and winning 4 Champions Leagues.",
      },
      {
        q:       "Who is Barcelona's current manager as of the 2024/25 season?",
        options: ["Xavi Hernández", "Ronald Koeman", "Hansi Flick", "Quique Setién"],
        answer:  2,
        explanation: "Hansi Flick became Barcelona manager in the summer of 2024, taking over from Xavi Hernández and guiding the club to the top of La Liga.",
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
      {
        q:       "In which year did Real Madrid win their record 15th Champions League title?",
        options: ["2021", "2022", "2023", "2024"],
        answer:  3,
        explanation: "Real Madrid won their 15th Champions League in 2024, defeating Borussia Dortmund 2-0 at Wembley with goals from Carvajal and Vinícius.",
      },
      {
        q:       "Who is Real Madrid's all-time top scorer in all competitions?",
        options: ["Cristiano Ronaldo", "Alfredo Di Stéfano", "Raúl", "Karim Benzema"],
        answer:  0,
        explanation: "Cristiano Ronaldo scored 450 goals for Real Madrid between 2009 and 2018, making him the club's all-time leading scorer by a wide margin.",
      },
      {
        q:       "Which player holds the record for most appearances for Real Madrid?",
        options: ["Iker Casillas", "Sergio Ramos", "Raúl", "Cristiano Ronaldo"],
        answer:  2,
        explanation: "Raúl González made 741 appearances for Real Madrid between 1994 and 2010, more than any other player in the club's history.",
      },
      {
        q:       "In which decade did Real Madrid win five consecutive European Cups?",
        options: ["1940s", "1950s", "1960s", "1970s"],
        answer:  1,
        explanation: "Real Madrid won five consecutive European Cups from 1956 to 1960, a feat never matched before or since, led by Alfredo Di Stéfano and Ferenc Puskás.",
      },
      {
        q:       "Who managed Real Madrid to three consecutive Champions League titles (2016, 2017, 2018)?",
        options: ["Carlo Ancelotti", "José Mourinho", "Zinedine Zidane", "Vicente del Bosque"],
        answer:  2,
        explanation: "Zinedine Zidane managed Real Madrid to three consecutive Champions League titles, becoming the first manager to achieve this feat in the competition.",
      },
      {
        q:       "How many La Liga titles has Real Madrid won?",
        options: ["28", "32", "35", "38"],
        answer:  2,
        explanation: "Real Madrid have won La Liga 35 times, making them the most successful club in the history of the Spanish top flight.",
      },
      {
        q:       "In which year was Real Madrid founded?",
        options: ["1898", "1900", "1902", "1905"],
        answer:  2,
        explanation: "Real Madrid was founded on 6 March 1902 and received their 'Real' (Royal) prefix from King Alfonso XIII in 1920.",
      },
      {
        q:       "What squad number does Kylian Mbappé wear at Real Madrid?",
        options: ["7", "9", "10", "11"],
        answer:  1,
        explanation: "Kylian Mbappé wears the number 9 shirt at Real Madrid, following legends Raúl and Karim Benzema who previously wore it.",
      },
      {
        q:       "Which Real Madrid player won the Ballon d'Or in 2024?",
        options: ["Vinícius Júnior", "Bellingham", "Mbappé", "Rodrygo"],
        answer:  0,
        explanation: "Vinícius Júnior won the Ballon d'Or in 2024, becoming the first Brazilian to win the award since Ronaldo Nazário in 2002.",
      },
      {
        q:       "How many goals did Puskás and Di Stéfano score between them in the 1960 European Cup final (Real Madrid 7-3 Eintracht)?",
        options: ["5", "6", "7", "8"],
        answer:  2,
        explanation: "Di Stéfano scored 3 and Puskás scored 4 — all 7 Real Madrid goals came from just these two players in what is often called the greatest game ever played.",
      },
      {
        q:       "Real Madrid's home ground is named after which legendary figure?",
        options: ["Alfredo Di Stéfano", "Santiago Bernabéu", "Florentino Pérez", "Paco Gento"],
        answer:  1,
        explanation: "The Estadio Santiago Bernabéu is named after the club's legendary president who led Real Madrid during their golden era and oversaw the stadium's construction.",
      },
      {
        q:       "Which shirt number does Vinícius Júnior wear for Real Madrid?",
        options: ["7", "9", "11", "17"],
        answer:  0,
        explanation: "Vinícius Júnior wears the iconic number 7 shirt at Real Madrid, previously worn by Cristiano Ronaldo during his time at the club.",
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
        q:       "Which Liverpool manager won the most trophies in the club's history?",
        options: ["Bill Shankly", "Bob Paisley", "Kenny Dalglish", "Jürgen Klopp"],
        answer:  1,
        explanation: "Bob Paisley won 19 trophies as Liverpool manager between 1974 and 1983, including 6 league titles and 3 European Cups — the most decorated manager in club history.",
      },
      {
        q:       "In what year did Liverpool win their first FA Cup?",
        options: ["1965", "1971", "1974", "1977"],
        answer:  0,
        explanation: "Liverpool won their first FA Cup in 1965, beating Leeds United 2-1 at Wembley with goals from Roger Hunt and Ian St John.",
      },
      {
        q:       "Which two Liverpool players scored in the 2019 Champions League final win over Tottenham?",
        options: ["Salah and Firmino", "Salah and Origi", "Origi and Mané", "Firmino and Origi"],
        answer:  1,
        explanation: "Mohamed Salah converted an early penalty and Divock Origi added a late second for a 2-0 win over Tottenham in Madrid.",
      },
      {
        q:       "Who is Liverpool's all-time leading scorer in all competitions?",
        options: ["Ian Rush", "Kenny Dalglish", "Steven Gerrard", "Roger Hunt"],
        answer:  0,
        explanation: "Ian Rush scored 346 goals for Liverpool across two spells (1980–87 and 1988–96), making him the club's all-time leading scorer.",
      },
      {
        q:       "What is Anfield's most famous end terrace called?",
        options: ["The Liverpool End", "The Red Wall", "The Kop", "The Anfield End"],
        answer:  2,
        explanation: "The Spion Kop — simply known as 'The Kop' — is Anfield's most famous terrace and one of the most atmospheric stands in world football.",
      },
      {
        q:       "Which club did current Liverpool manager Arne Slot come from?",
        options: ["Ajax", "PSV Eindhoven", "Feyenoord", "AZ Alkmaar"],
        answer:  2,
        explanation: "Arne Slot joined Liverpool in the summer of 2024 after managing Feyenoord, where he won the Dutch Eredivisie and reached a European final.",
      },
      {
        q:       "In what dramatic fashion did Liverpool beat AC Milan in the 2005 Champions League final?",
        options: ["Extra time winner from Gerrard", "Penalty shootout after being 3-0 down at half-time", "Golden goal in extra time", "2-1 after a late comeback"],
        answer:  1,
        explanation: "3-0 down at half-time, Liverpool scored 3 goals in 6 minutes to level — Gerrard, Šmicer and Alonso — then won on penalties in one of football's greatest comebacks.",
      },
      {
        q:       "Who captained Liverpool to the Premier League title in 2019/20?",
        options: ["Steven Gerrard", "Jordan Henderson", "James Milner", "Virgil van Dijk"],
        answer:  1,
        explanation: "Jordan Henderson captained Liverpool to the Premier League title in 2019/20 — their first league championship in 30 years — finishing with 99 points.",
      },
      {
        q:       "How many FA Cup wins does Liverpool have?",
        options: ["5", "7", "8", "10"],
        answer:  2,
        explanation: "Liverpool have won the FA Cup 8 times, with their most recent triumph coming in 2022 against Chelsea on penalties.",
      },
      {
        q:       "How many League Cup titles has Liverpool won?",
        options: ["5", "8", "10", "12"],
        answer:  2,
        explanation: "Liverpool have won the League Cup (now the Carabao Cup) 10 times, the most of any club, including four consecutive victories from 1981 to 1984.",
      },
      {
        q:       "Which legendary striker scored 30 or more league goals in five consecutive seasons for Liverpool in the 1980s?",
        options: ["John Aldridge", "Ian Rush", "Kenny Dalglish", "Michael Owen"],
        answer:  1,
        explanation: "Ian Rush was prolific for Liverpool throughout the 1980s, winning the golden boot multiple times and becoming the Kop's most beloved striker.",
      },
      {
        q:       "Mohamed Salah holds the record for most goals in a single Premier League season (38-game format). How many did he score in 2017/18?",
        options: ["28", "30", "32", "36"],
        answer:  2,
        explanation: "Salah scored 32 Premier League goals in 2017/18, breaking the record for the 38-game era and winning the Golden Boot convincingly.",
      },
      {
        q:       "Which year did Liverpool win their first European Cup?",
        options: ["1974", "1975", "1977", "1979"],
        answer:  2,
        explanation: "Liverpool won their first European Cup in 1977 in Rome, beating Borussia Mönchengladbach 3-1, beginning a golden era of European success under Bob Paisley.",
      },
      {
        q:       "Anfield's famous anthem 'You'll Never Walk Alone' originally comes from which musical?",
        options: ["Oliver!", "My Fair Lady", "Carousel", "South Pacific"],
        answer:  2,
        explanation: "You'll Never Walk Alone was written by Rodgers and Hammerstein for the 1945 musical Carousel. Gerry and the Pacemakers' 1963 cover became Liverpool's anthem.",
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
      {
        q:       "Which player scored the iconic 'Agueroooo' goal to win City their first Premier League title in 2012?",
        options: ["Edin Džeko", "Mario Balotelli", "Carlos Tevez", "Sergio Agüero"],
        answer:  3,
        explanation: "Sergio Agüero scored in the 94th minute against QPR on the final day of 2011/12 to win the title on goal difference — immortalised by Martin Tyler's famous commentary.",
      },
      {
        q:       "How many consecutive Premier League titles did Manchester City win from 2021 to 2024?",
        options: ["2", "3", "4", "5"],
        answer:  2,
        explanation: "Manchester City won four consecutive Premier League titles from 2020/21 to 2023/24, a feat previously unmatched in the Premier League era.",
      },
      {
        q:       "What is Sergio Agüero's all-competition goal record for Manchester City?",
        options: ["200", "220", "260", "280"],
        answer:  2,
        explanation: "Sergio Agüero scored 260 goals for Manchester City across all competitions in his 10-year spell, making him the club's all-time leading scorer.",
      },
      {
        q:       "How many Premier League goals did Erling Haaland score in his debut City season (2022/23)?",
        options: ["28", "32", "36", "40"],
        answer:  2,
        explanation: "Erling Haaland scored 36 Premier League goals in his debut season at City in 2022/23, breaking the league's single-season scoring record.",
      },
      {
        q:       "Which year was Manchester City founded?",
        options: ["1875", "1880", "1888", "1892"],
        answer:  1,
        explanation: "Manchester City were founded in 1880 as St. Mark's (West Gorton), becoming Ardwick AFC in 1887 before taking their current name in 1894.",
      },
      {
        q:       "What is Manchester City's home stadium called?",
        options: ["Old Trafford", "Maine Road", "Etihad Stadium", "City of Manchester Stadium"],
        answer:  2,
        explanation: "City moved from Maine Road to the City of Manchester Stadium in 2003, which was rebranded as the Etihad Stadium following a sponsorship deal in 2011.",
      },
      {
        q:       "Which City player won the Ballon d'Or in 2024?",
        options: ["Kevin De Bruyne", "Erling Haaland", "Rodri", "Phil Foden"],
        answer:  2,
        explanation: "Rodri won the Ballon d'Or in 2024, becoming the first defensive midfielder to win the award since Fabio Cannavaro in 2006, recognised for his role in City's title and Spain's Euro 2024 win.",
      },
      {
        q:       "Who managed Man City immediately before Pep Guardiola took over in 2016?",
        options: ["Roberto Mancini", "Mark Hughes", "Manuel Pellegrini", "Sven-Göran Eriksson"],
        answer:  2,
        explanation: "Manuel Pellegrini managed Manchester City from 2013 to 2016, winning the Premier League in 2013/14 and two League Cups before Guardiola's arrival.",
      },
      {
        q:       "City's inverted fullback system — where fullbacks push central — was pioneered at City under Guardiola. Which fullback is most associated with this role?",
        options: ["Benjamin Mendy", "Kyle Walker", "João Cancelo", "Joško Gvardiol"],
        answer:  2,
        explanation: "João Cancelo became the defining example of Guardiola's inverted fullback system, operating as a central midfielder from a fullback starting position.",
      },
      {
        q:       "In which year did Manchester City win their first top-flight league title?",
        options: ["1934", "1937", "1956", "1968"],
        answer:  1,
        explanation: "Manchester City won their first Football League Championship in 1936/37, going on to also win the FA Cup in 1934 and the league again in 1967/68.",
      },
      {
        q:       "Kevin De Bruyne is known for his assist records. How many Premier League assists did he record in 2019/20 — the joint most in a single season?",
        options: ["16", "17", "18", "20"],
        answer:  2,
        explanation: "Kevin De Bruyne recorded 20 Premier League assists in 2019/20... actually, he set the record with 20 assists matching Thierry Henry's record. Let me adjust: De Bruyne set the PL assists record with 20 in 2019/20.",
      },
      {
        q:       "Which nickname is associated with Erling Haaland due to his extraordinary goal-scoring?",
        options: ["The Norwegian Viking", "The Terminator", "The Cyborg", "The Machine"],
        answer:  2,
        explanation: "Haaland is often called 'The Cyborg' or 'The Terminator' by fans due to his relentless, machine-like goal-scoring consistency since arriving at City.",
      },
    ],
  },
};
