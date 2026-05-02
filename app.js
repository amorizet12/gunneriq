// ─────────────────────────────────────────────────────────────────
// app.js  —  React UI layer
//
// All team-specific data comes from the service layer (services/*.js).
// No team name, color, or stat is hardcoded here.
// To support a new team, populate its data files and change
// APP_CONFIG.activeTeamSlug in GunnerIQ.html.
// ─────────────────────────────────────────────────────────────────

const { useState, useEffect, useRef } = React;

// ── Hex → rgba helper (used for dynamic team color CSS vars) ──
function hexToRgba(hex, alpha) {
  var h = hex.replace('#', '');
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  var r = parseInt(h.slice(0,2),16);
  var g = parseInt(h.slice(2,4),16);
  var b = parseInt(h.slice(4,6),16);
  return 'rgba('+r+','+g+','+b+','+alpha+')';
}

// ── Apply a team's color tokens to CSS custom properties ─────
function applyTeamColors(teamSlug) {
  var team = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || TEAMS_DATA['arsenal'];
  var c    = team.colors || {};
  var root = document.documentElement.style;
  var primary = c.primary || '#EF0107';
  root.setProperty('--red',            primary);
  root.setProperty('--red-a',          c.badgeBg     || hexToRgba(primary, 0.15));
  root.setProperty('--red-b',          c.badgeBorder || hexToRgba(primary, 0.25));
  root.setProperty('--hero-gradient',  c.heroGradient || 'linear-gradient(150deg,#1C1C2C 0%,#0E0E18 50%,#180A0C 100%)');
  root.setProperty('--glow-hi',        hexToRgba(primary, 0.18));
  root.setProperty('--glow-lo',        hexToRgba(primary, 0.12));
  root.setProperty('--pwrap-start',    hexToRgba(primary, 0.7));
  root.setProperty('--pwrap-end',      hexToRgba(primary, 0.4));
}

// ── Fan Zone mock data ─────────────────────────────────────────
var TRANSFER_MOCK = {
  arsenal: {
    rumours: [
      { name: 'Florian Wirtz',     club: 'B. Leverkusen',  pos: 'CAM', likelihood: '65%', note: "Arsenal's #1 summer target — would cost £120m+" },
      { name: 'Viktor Gyökeres',   club: 'Sporting CP',    pos: 'ST',  likelihood: '50%', note: 'Viewed as the long-term striker solution' },
      { name: 'Martin Zubimendi',  club: 'Real Sociedad',  pos: 'DM',  likelihood: '35%', note: 'Arteta wants midfield depth alongside Rice' },
    ],
    inProcess: [
      { name: 'Riccardo Calafiori', club: 'Bologna',   pos: 'CB', status: 'Fee agreed',   note: 'Personal terms being finalised, £38m deal' },
      { name: 'Andrea Cambiaso',    club: 'Juventus',  pos: 'LB', status: 'Talks advanced', note: 'Versatile full-back targeted for depth' },
    ],
    doneDeal: [
      { name: 'Mikel Merino',     club: 'Real Sociedad',     pos: 'CM', status: 'Signed',   note: '£32m, adds quality rotation in midfield' },
      { name: 'Thomas Partey',    club: 'Contract expired',  pos: 'DM', status: 'Released', note: 'Contract not renewed after 4 seasons' },
    ],
  },
  barcelona: {
    rumours: [
      { name: 'Nico Williams',     club: 'Athletic Bilbao', pos: 'LW',  likelihood: '55%', note: 'Long-term target — would reunite with Yamal' },
      { name: 'Rodri',             club: 'Man City',        pos: 'DM',  likelihood: '20%', note: 'Dream signing but heavily contracted at City' },
      { name: 'Dani Olmo (ext.)',  club: 'Contract talks',  pos: 'CAM', likelihood: '70%', note: 'Extension priority after registration saga' },
    ],
    inProcess: [
      { name: 'Jonathan Tah',      club: 'B. Leverkusen',  pos: 'CB', status: 'Contract agreed', note: 'Free transfer, boosts defensive cover' },
      { name: 'Joan García',       club: 'Espanyol',       pos: 'GK', status: 'Fee being agreed', note: 'Future backup/successor to Szczęsny' },
    ],
    doneDeal: [
      { name: 'Dani Olmo',         club: 'RB Leipzig',       pos: 'CAM', status: 'Signed',   note: 'Club fought hard to register him legally' },
      { name: 'Fermín López',      club: 'Academy',          pos: 'CM',  status: 'Promoted', note: 'Signed pro deal, permanent first-team player' },
    ],
  },
  'real-madrid': {
    rumours: [
      { name: 'Trent Alexander-Arnold', club: 'Liverpool',    pos: 'RB',  likelihood: '60%', note: 'Contract expires — Florentino tracking closely' },
      { name: 'Álvaro Morata',          club: 'AC Milan',     pos: 'ST',  likelihood: '30%', note: 'Backup striker option if Benzema-style depth needed' },
      { name: 'Alphonso Davies',        club: 'Bayern Munich', pos: 'LB', likelihood: '45%', note: 'Out of contract, speed to complement Mendy' },
    ],
    inProcess: [
      { name: 'Dean Huijsen',  club: 'Bournemouth',  pos: 'CB', status: 'Talks ongoing', note: 'Young Spanish CB earmarked for long-term future' },
      { name: 'Endrick',       club: 'Palmeiras',    pos: 'ST', status: 'Deal done',     note: 'Already announced, joins summer 2024' },
    ],
    doneDeal: [
      { name: 'Kylian Mbappé',  club: 'PSG',           pos: 'ST', status: 'Signed',  note: 'Free transfer, the biggest signing of the era' },
      { name: 'Dani Carvajal',  club: 'Contract ext.', pos: 'RB', status: 'Extended', note: 'Renewed despite ACL injury, 1-year extension' },
    ],
  },
  liverpool: {
    rumours: [
      { name: 'Xavi Simons',       club: 'RB Leipzig',    pos: 'CAM', likelihood: '45%', note: 'Slot wants a creative link between midfield and attack' },
      { name: 'Florian Neuhaus',   club: 'B. Mönchengladbach', pos: 'CM', likelihood: '30%', note: 'Depth option in central midfield' },
      { name: 'Omar Marmoush',     club: 'Eintracht Frankfurt', pos: 'ST', likelihood: '55%', note: 'Clinical striker who fits Slot\'s pressing system' },
    ],
    inProcess: [
      { name: 'Federico Chiesa',  club: 'Juventus',   pos: 'RW', status: 'Medical done',  note: 'Adds pace and creativity to the right side' },
      { name: 'Giorgi Mamardashvili', club: 'Valencia', pos: 'GK', status: 'Fee agreed',  note: 'Alisson succession plan begins' },
    ],
    doneDeal: [
      { name: 'Arne Slot',         club: 'Feyenoord',      pos: 'Manager', status: 'Appointed', note: 'Replaced Klopp, won the league in first season' },
      { name: 'Jarell Quansah',    club: 'Academy',        pos: 'CB',      status: 'Promoted',  note: 'Signed long-term deal, now regular first-teamer' },
    ],
  },
  'man-city': {
    rumours: [
      { name: 'Rayan Cherki',      club: 'Olympique Lyon', pos: 'CAM', likelihood: '50%', note: 'Guardiola\'s next big creative signing project' },
      { name: 'Marco Asensio',     club: 'PSG',            pos: 'RW',  likelihood: '25%', note: 'Versatile cover across front three' },
      { name: 'Álex Grimaldo',     club: 'B. Leverkusen',  pos: 'LB',  likelihood: '40%', note: 'Attacking LB to replace Gvardiol if he moves' },
    ],
    inProcess: [
      { name: 'Savio',             club: 'Troyes',          pos: 'RW', status: 'Deal agreed', note: 'City owned — now being integrated into first team' },
      { name: 'Yan Couto',         club: 'Girona',          pos: 'RB', status: 'Recall planned', note: 'City owned — strong season in Spain' },
    ],
    doneDeal: [
      { name: 'Rodri (ext.)',      club: 'Contract ext.',   pos: 'DM', status: 'Extended', note: 'New deal signed after Ballon d\'Or win' },
      { name: 'Sergio Gómez',      club: 'Anderlecht',      pos: 'LB', status: 'Sold',     note: 'Moved on to create space and wages' },
    ],
  },
};

var TROPHY_MOCK = {
  arsenal: [
    { name: 'Premier League',         icon: '🏆', count: 13, note: 'Most recent: 2003/04 (Invincibles)' },
    { name: 'FA Cup',                 icon: '🏆', count: 14, note: 'Record 14 wins — more than any club' },
    { name: 'League Cup',             icon: '🏆', count: 2,  note: '1987, 1993' },
    { name: 'FA Community Shield',    icon: '🛡️', count: 16, note: 'Most recent: 2023' },
    { name: 'UEFA Cup Winners\' Cup', icon: '🏆', count: 1,  note: '1994 — beat Parma in Copenhagen' },
    { name: 'Inter-Cities Fairs Cup', icon: '🏆', count: 1,  note: '1970' },
    { name: 'UEFA Champions League',  icon: '🏆', count: 0,  note: 'Yet to be won' },
  ],
  barcelona: [
    { name: 'La Liga',                icon: '🏆', count: 27, note: 'Most recent: 2022/23' },
    { name: 'Copa del Rey',           icon: '🏆', count: 31, note: 'Record Copa del Rey winners' },
    { name: 'UEFA Champions League',  icon: '🏆', count: 5,  note: '1992, 2006, 2009, 2011, 2015' },
    { name: 'UEFA Cup Winners\' Cup', icon: '🏆', count: 4,  note: '1979, 1982, 1989, 1997' },
    { name: 'FIFA Club World Cup',    icon: '🌍', count: 3,  note: '2009, 2011, 2015' },
    { name: 'UEFA Super Cup',         icon: '🛡️', count: 5,  note: '1992, 1997, 2009, 2011, 2015' },
    { name: 'Spanish Super Cup',      icon: '🛡️', count: 14, note: 'Most recent: 2023' },
  ],
  'real-madrid': [
    { name: 'La Liga',                icon: '🏆', count: 35, note: 'More La Liga titles than any club' },
    { name: 'UEFA Champions League',  icon: '🏆', count: 15, note: 'Most in the competition\'s history' },
    { name: 'Copa del Rey',           icon: '🏆', count: 20, note: 'Most recent: 2023' },
    { name: 'FIFA Club World Cup',    icon: '🌍', count: 8,  note: 'More than any other club' },
    { name: 'UEFA Super Cup',         icon: '🛡️', count: 5,  note: 'Most recent: 2022' },
    { name: 'Spanish Super Cup',      icon: '🛡️', count: 12, note: 'Most recent: 2024' },
    { name: 'UEFA Cup Winners\' Cup', icon: '🏆', count: 0,  note: 'Never won' },
  ],
  liverpool: [
    { name: 'Premier League / Div. 1', icon: '🏆', count: 19, note: 'Most recent: 2019/20' },
    { name: 'FA Cup',                  icon: '🏆', count: 8,  note: 'Most recent: 2022' },
    { name: 'League Cup',              icon: '🏆', count: 10, note: 'Record 10 wins — most of any club' },
    { name: 'UEFA Champions League',   icon: '🏆', count: 6,  note: '1977, 1978, 1981, 1984, 2005, 2019' },
    { name: 'UEFA Super Cup',          icon: '🛡️', count: 4,  note: 'Most recent: 2019' },
    { name: 'FIFA Club World Cup',     icon: '🌍', count: 1,  note: '2019' },
    { name: 'UEFA Cup',                icon: '🏆', count: 3,  note: '1973, 1976, 2001' },
  ],
  'man-city': [
    { name: 'Premier League',         icon: '🏆', count: 10, note: 'Most recent: 2023/24 (4 in a row)' },
    { name: 'FA Cup',                 icon: '🏆', count: 7,  note: 'Most recent: 2022/23 (part of treble)' },
    { name: 'League Cup',             icon: '🏆', count: 8,  note: 'Most recent: 2023/24' },
    { name: 'UEFA Champions League',  icon: '🏆', count: 1,  note: '2022/23 — Istanbul, beat Inter 1-0' },
    { name: 'UEFA Super Cup',         icon: '🛡️', count: 0,  note: 'Yet to be won' },
    { name: 'FIFA Club World Cup',    icon: '🌍', count: 1,  note: '2023' },
    { name: 'FA Community Shield',    icon: '🛡️', count: 6,  note: 'Most recent: 2023' },
  ],
};

var TACTICAL_MOCK = {
  arsenal: {
    formation: '4-3-3',
    style: 'High-press · Possession-based · Half-space exploitation',
    preview: [
      { label: 'Pressing Trigger', value: 'GK receives ball' },
      { label: 'Defensive Shape',  value: 'Mid-block 4-3-3' },
      { label: 'Build-up Route',   value: 'Through RB + CM channel' },
      { label: 'Width Source',     value: 'Inverted wide forwards' },
    ],
    teaser: "Arteta's press fires when the opponent goalkeeper receives. Saka and Martinelli spring from wide positions simultaneously, while Rice drops to screen the centre. The shape flips from 4-3-3 to a 4-2-4 off-ball, compressing the opponent into wide areas. The key trigger is Ødegaard's press signal — a shoulder drop followed by a sprint...",
    locked: [
      'Full pressing trigger map — 8 scenarios with opponent reactions',
      'Set-piece routines — corners, free kicks, and throw-in patterns',
      'Defensive shape transitions when facing 3-at-the-back',
      'Build-up sequences from GK through to final-third entry',
      'Half-space exploitation — Ødegaard\'s deep run combinations',
      'Defensive line triggers and offside trap timing',
    ],
  },
  barcelona: {
    formation: '4-2-3-1',
    style: 'Positional play · Vertical pressing · La Masia DNA',
    preview: [
      { label: 'Pressing Trigger', value: 'Opponent's 2nd touch' },
      { label: 'Defensive Shape',  value: 'High press 4-2-3-1' },
      { label: 'Build-up Route',   value: 'Through centre via Pedri' },
      { label: 'Width Source',     value: 'Full-backs + Yamal/Raphinha' },
    ],
    teaser: "Flick's Barcelona press from the front — Lewandowski pins the first CB while Olmo shadows the pivot. The double pivot of Casado and Pedri creates a high-density midfield zone. When Yamal drifts inside, Koundé overlaps the right channel creating a 2v1 against the opposition LB — the most dangerous recurring pattern...",
    locked: [
      'Full positional play trigger sequences and spacing rules',
      'Flick\'s 4-2-3-1 vs. 4-3-3 — when does the shape shift?',
      'Yamal\'s half-space movements mapped against 5 defensive systems',
      'Set-piece patterns — Koundé\'s role in corner routines',
      'How Pedri bypasses pressing traps — 6 recurring passing sequences',
      'Counter-press triggers and reset positioning',
    ],
  },
  'real-madrid': {
    formation: '4-3-3',
    style: 'Controlled possession · UCL mentality · Individual brilliance',
    preview: [
      { label: 'Pressing Trigger', value: 'Opponent\'s slow build-up' },
      { label: 'Defensive Shape',  value: 'Mid-block 4-5-1' },
      { label: 'Build-up Route',   value: 'Wide to central switch via Valverde' },
      { label: 'Width Source',     value: 'Vinícius isolation + Mbappé runs' },
    ],
    teaser: "Ancelotti's Madrid set up in a compact 4-5-1 without the ball, inviting opponents to commit forward before releasing Vinícius or Mbappé on the counter. The key transition moment is Bellingham's turn in the pocket — when he faces up, Vinícius makes his diagonal run and Mbappé pins the backline...",
    locked: [
      'Transition patterns — how Madrid counter in 3–5 seconds',
      'Vinícius isolation play — 7 recurring right-to-left switch sequences',
      'Mbappé\'s pin runs and how they create channels for Rodrygo',
      'Ancelotti\'s 4-5-1 defensive organisation — zone-by-zone breakdown',
      'Set-piece delivery patterns and box positioning',
      'How Madrid defend their lead in the final 15 minutes (UCL blueprint)',
    ],
  },
  liverpool: {
    formation: '4-3-3',
    style: 'Gegenpressing · High line · Transition speed',
    preview: [
      { label: 'Pressing Trigger', value: 'Opponent\'s backwards pass' },
      { label: 'Defensive Shape',  value: 'High press 4-3-3' },
      { label: 'Build-up Route',   value: 'From Alisson — direct to wide' },
      { label: 'Width Source',     value: 'Robertson + TAA inverted' },
    ],
    teaser: "Slot's Liverpool press on backwards passes — the signal for Salah to sprint at the LB while Núñez pins both CBs. Gravenberch covers the pivot role, screening the back four in their absence. Alexander-Arnold's inside positioning creates a midfield 4 in possession, giving Liverpool an overload through the centre...",
    locked: [
      'Gegenpressing trigger zones — 5 high-value areas mapped',
      'Salah\'s off-ball movement patterns and how space is created',
      'TAA\'s hybrid role — fullback to CM transition breakdown',
      'How Liverpool exploit the space behind the press when it\'s beat',
      'Defensive line management — high line triggers and drop thresholds',
      'Set-piece analysis — 14-goal corner routine breakdown',
    ],
  },
  'man-city': {
    formation: '4-3-3',
    style: 'Positional superiority · Inverted fullbacks · Systematic dominance',
    preview: [
      { label: 'Pressing Trigger', value: 'Opponent GK long ball' },
      { label: 'Defensive Shape',  value: '4-2-4 off the ball' },
      { label: 'Build-up Route',   value: 'Inverted fullbacks into half-spaces' },
      { label: 'Width Source',     value: 'Striker width + Doku dribbles' },
    ],
    teaser: "Guardiola's City create a 3-2 structure in build-up: Rodri drops alongside the two CBs while Walker and Gvardiol invert into midfield zones. This creates a 5v3 advantage at the back, forcing opponents to commit centrally — exactly when De Bruyne switches the play to Doku in wide space...",
    locked: [
      'Full inverted fullback positional rules — 12 recurring sequences',
      'How City create 3-2 build-up structures against 4-4-2 vs 4-3-3',
      'De Bruyne\'s switch pass — when, why, and where it goes',
      'Haaland off-ball movement and the 3 key zones he exploits',
      'City\'s press resistance system — 8 passing patterns under pressure',
      'How Guardiola adjusts in-game: 3 documented mid-match tactical shifts',
    ],
  },
};

// ── Simple array shuffle (used for quiz question order) ──────
function shuffleArr(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// Bottom nav tab definitions — these are app-level, not team-specific
const NAV = [
  { id: 'home',  icon: '⌂',  lbl: 'Home'     },
  { id: 'match', icon: '⚽', lbl: 'Match Hub' },
  { id: 'ai',    icon: '✦',  lbl: 'AI Chat'  },
  { id: 'fan',   icon: '★',  lbl: 'Fan Zone' },
  { id: 'prem',  icon: '◆',  lbl: 'Premium'  },
];


// ═══════════════════════════════════════════════════════════════
// REUSABLE PRIMITIVES
// ═══════════════════════════════════════════════════════════════

// Renders a single W / D / L form dot
function FormDot({ result }) {
  return <div className={`fd ${result.toLowerCase()}`}>{result}</div>;
}

// Renders a labeled row of 5 form dots
function FormRow({ label, results }) {
  return (
    <div className="hform-row">
      <span className="hform-label">{label}</span>
      <div style={{ display: 'flex', gap: 5 }}>
        {results.map((r, i) => <FormDot key={i} result={r} />)}
      </div>
    </div>
  );
}

// Error state — shown when DataService.load*Screen() rejects
function ScreenError({ message, onRetry }) {
  return (
    <div className="screen-enter" style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
      <div style={{ fontSize: 36 }}>⚠️</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--t1)' }}>Something went wrong</div>
      <div style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.6, maxWidth: 280 }}>
        {message || 'Failed to load data. Check your connection and try again.'}
      </div>
      {onRetry && (
        <button className="btn btn-ghost" style={{ marginTop: 8 }} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

// Loading skeleton — shown while screen data is fetching
// Each bar animates with a pulse to mimic real loading
function ScreenSkeleton() {
  const bars = [
    { h: 68,  w: '55%'  },
    { h: 240, w: '100%' },
    { h: 18,  w: '40%'  },
    { h: 160, w: '100%' },
    { h: 18,  w: '35%'  },
    { h: 120, w: '100%' },
  ];
  return (
    <div className="screen-enter" style={{ padding: '18px 18px' }}>
      {bars.map(function(b, i) {
        return (
          <div
            key={i}
            className="skel"
            style={{
              height:        b.h,
              width:         b.w,
              marginBottom:  i % 2 === 0 ? 8 : 18,
              animationDelay: (i * 0.07) + 's',
            }}
          />
        );
      })}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════════════════════════

// ── Lineup Vote Modal ─────────────────────────────────────────
// Shows all 11 starters with a thumbs-up button.
// Votes accumulate on top of the baseline fanVotePct from player data.
function VoteModal({ teamSlug, onClose }) {
  const [playerVotes, setPlayerVotes] = useState(() => PollService.getPlayerVotes(teamSlug));
  const [myVotes,     setMyVotes]     = useState(() => PollService.getMyVotes(teamSlug));

  const playerMap = PlayerService.getPlayerMap(teamSlug);
  const lineup    = PlayerService.getLineup(teamSlug);

  // Flatten the lineup rows into a single ordered list of jersey numbers
  const allIds = lineup.rows.flatMap(row => row.playerIds);

  function toggle(playerId) {
    const result = PollService.togglePlayerVote(teamSlug, playerId);
    setPlayerVotes({ ...result.votes });
    setMyVotes({ ...result.myVotes });
  }

  if (allIds.length === 0) {
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="modal-title">Vote: Predicted Lineup</div>
          <div style={{ padding: '20px 20px 8px', color: 'var(--t3)', fontSize: 14, lineHeight: 1.6, textAlign: 'center' }}>
            Lineup data for this team isn't available yet. Check back once the squad is populated.
          </div>
          <div style={{ padding: '12px 16px 24px' }}>
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">Vote: Predicted Lineup</div>
        <div className="modal-sub">Tap 👍 to vote for the players you want to start</div>
        <div className="card" style={{ margin: '0 16px 20px', overflow: 'hidden' }}>
          {allIds.map(id => {
            const p = playerMap[id];
            if (!p) return null;
            const voted   = !!myVotes[id];
            const extra   = playerVotes[id] || 0;
            const display = p.fanVotePct + extra;
            return (
              <div key={id} className="vote-player">
                <div className="vote-pos">{p.position}</div>
                <div className="vote-name">{p.name}</div>
                <div className="vote-pct" style={{ color: voted ? 'var(--win)' : 'var(--t3)' }}>
                  {display}%
                </div>
                <div className={`vote-btn${voted ? ' voted' : ''}`} onClick={() => toggle(id)}>
                  {voted ? '✓' : '👍'}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '0 16px' }}>
          <button className="btn btn-red" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}


// ── Daily Quiz Modal ──────────────────────────────────────────
// questions are passed in via modal.data (preloaded by FanScreen)
// so this modal never calls a service directly
function QuizModal({ onClose, data }) {
  const questions = (data && data.questions) || [];
  const [qIndex, setQIndex] = useState(0);       // current question index, or 'results'
  const [chosen,  setChosen]  = useState(null);  // answer index picked this question
  const [score,   setScore]   = useState(0);

  // Handle no questions available
  if (!questions || questions.length === 0) {
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="modal-title">Quiz</div>
          <div style={{ padding: '20px', color: 'var(--t3)', fontSize: 14 }}>
            No quiz questions available for this team yet.
          </div>
          <div style={{ padding: '0 20px' }}>
            <button className="btn btn-red" onClick={onClose}>Back</button>
          </div>
        </div>
      </div>
    );
  }

  function pick(i) {
    if (chosen !== null) return;
    setChosen(i);
    const correct = i === questions[qIndex].answer;
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      setChosen(null);
      if (qIndex < questions.length - 1) {
        setQIndex(idx => idx + 1);
      } else {
        PollService.updateStreak();
        setQIndex('results');
      }
    }, 1000);
  }

  if (qIndex === 'results') {
    const msgs = ['Keep practicing!', 'Good effort!', 'Almost perfect!', 'Full marks! 🏆'];
    const msgIdx = score === questions.length ? 3 : score === 2 ? 2 : score === 1 ? 1 : 0;
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="modal-title">Quiz Complete</div>
          <div className="quiz-score">
            <div className="quiz-score-num" style={{ color: score === questions.length ? 'var(--win)' : score === 0 ? 'var(--loss)' : 'var(--t1)' }}>
              {score}/{questions.length}
            </div>
            <div className="quiz-score-label">Questions correct</div>
            <div className="quiz-score-msg">{msgs[msgIdx]}</div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--t3)' }}>
              Streak updated ✓ Come back tomorrow to keep it going
            </div>
          </div>
          <div style={{ padding: '0 20px' }}>
            <button className="btn btn-red" onClick={onClose}>Back to Fan Zone</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[qIndex];
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">Daily Quiz</div>
        <div className="quiz-progress">
          {questions.map((_, i) => (
            <div key={i} className={`quiz-dot${i < qIndex ? ' done' : i === qIndex ? ' current' : ''}`} />
          ))}
        </div>
        <div className="quiz-q">{q.q}</div>
        {q.options.map((opt, i) => {
          let cls = '';
          if (chosen !== null) {
            if (i === q.answer) cls = ' correct';
            else if (i === chosen) cls = ' wrong';
            else cls = ' dimmed';
          }
          return (
            <div key={i} className={`quiz-opt${cls}`} onClick={() => pick(i)}>
              <div className="quiz-letter">{String.fromCharCode(65 + i)}</div>
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ── Quiz Launcher Modal ───────────────────────────────────────
// Lets user pick quiz length (3 / 5 / 10 / 15), then plays that quiz
function QuizLauncherModal({ teamSlug, onClose }) {
  const allQuestions = ((typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug] && TEAMS_DATA[teamSlug].quiz) || []);
  const [step,    setStep]    = useState('pick');   // 'pick' | 'play' | 'results'
  const [length,  setLength]  = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex,  setQIndex]  = useState(0);
  const [chosen,  setChosen]  = useState(null);
  const [score,   setScore]   = useState(0);

  function startQuiz(len) {
    const shuffled = shuffleArr(allQuestions).slice(0, len);
    setLength(len);
    setQuestions(shuffled);
    setQIndex(0);
    setChosen(null);
    setScore(0);
    setStep('play');
  }

  function pick(i) {
    if (chosen !== null) return;
    setChosen(i);
    if (i === questions[qIndex].answer) setScore(s => s + 1);
    setTimeout(() => {
      setChosen(null);
      if (qIndex < questions.length - 1) {
        setQIndex(idx => idx + 1);
      } else {
        PollService.updateStreak();
        setStep('results');
      }
    }, 1000);
  }

  const teamData = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const teamShort = teamData.shortName || teamSlug;

  if (step === 'pick') {
    const maxLen = allQuestions.length;
    const lengths = [3, 5, 10, 15].filter(l => l <= maxLen || l === 3);
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="modal-title">Quizzes</div>
          <div className="modal-sub">Pick your quiz length — test your {teamShort} knowledge</div>
          <div style={{ padding: '0 16px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[3, 5, 10, 15].map(len => {
              const available = len <= maxLen;
              return (
                <button
                  key={len}
                  className={`btn ${available ? 'btn-ghost' : 'btn-ghost'}`}
                  style={{ opacity: available ? 1 : 0.4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}
                  onClick={() => available && startQuiz(len)}
                  disabled={!available}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)' }}>{len} Questions</span>
                  <span style={{ fontSize: 13, color: 'var(--t3)' }}>
                    {len === 3 ? 'Quick' : len === 5 ? 'Standard' : len === 10 ? 'Deep dive' : 'Full challenge'}
                    {!available ? ' — coming soon' : ' →'}
                  </span>
                </button>
              );
            })}
            <button className="btn btn-ghost" style={{ marginTop: 4, color: 'var(--t3)', fontSize: 14 }} onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    const pct = length > 0 ? score / length : 0;
    const msg = pct === 1 ? 'Full marks! 🏆' : pct >= 0.8 ? 'Almost perfect!' : pct >= 0.5 ? 'Good effort!' : 'Keep practicing!';
    const scoreColor = pct === 1 ? 'var(--win)' : pct === 0 ? 'var(--loss)' : 'var(--t1)';
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="modal-title">Quiz Complete</div>
          <div className="quiz-score">
            <div className="quiz-score-num" style={{ color: scoreColor }}>{score}/{length}</div>
            <div className="quiz-score-label">Questions correct</div>
            <div className="quiz-score-msg">{msg}</div>
          </div>
          <div style={{ padding: '0 16px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-red" onClick={() => startQuiz(length)}>Play Again</button>
            <button className="btn btn-ghost" style={{ fontSize: 14 }} onClick={() => setStep('pick')}>Try Different Length</button>
          </div>
        </div>
      </div>
    );
  }

  // Play step
  const q = questions[qIndex];
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">{teamShort} Quiz — {length}Q</div>
        <div className="quiz-progress">
          {questions.map((_, i) => (
            <div key={i} className={`quiz-dot${i < qIndex ? ' done' : i === qIndex ? ' current' : ''}`} />
          ))}
        </div>
        <div className="quiz-q">{q.q}</div>
        {q.options.map((opt, i) => {
          let cls = '';
          if (chosen !== null) {
            if (i === q.answer) cls = ' correct';
            else if (i === chosen) cls = ' wrong';
            else cls = ' dimmed';
          }
          return (
            <div key={i} className={`quiz-opt${cls}`} onClick={() => pick(i)}>
              <div className="quiz-letter">{String.fromCharCode(65 + i)}</div>
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ── Player Compare Modal ──────────────────────────────────────
function PlayerCompareModal({ teamSlug, onClose }) {
  const squad    = (PlayerService.getSquad(teamSlug) || []).filter(p => p.position !== 'GK' && p.injuryStatus !== 'out');
  const [p1Id, setP1Id] = useState(null);
  const [p2Id, setP2Id] = useState(null);
  const step = p1Id === null ? 'pick1' : p2Id === null ? 'pick2' : 'compare';

  const teamData  = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const teamShort = teamData.shortName || teamSlug;

  const COMPARE_STATS = [
    { key: 'goals',         label: 'Goals',            higherBetter: true },
    { key: 'assists',       label: 'Assists',          higherBetter: true },
    { key: 'appearances',   label: 'Appearances',      higherBetter: true },
    { key: 'minutes',       label: 'Minutes',          higherBetter: true },
    { key: 'shots',         label: 'Shots',            higherBetter: true },
    { key: 'shotsOnTarget', label: 'Shots on Target',  higherBetter: true },
    { key: 'passAccuracy',  label: 'Pass Accuracy',    higherBetter: true, suffix: '%' },
    { key: 'chancesCreated',label: 'Chances Created',  higherBetter: true },
  ];

  function PlayerPickList({ excludeId, onSelect }) {
    return (
      <div className="card" style={{ margin: '0 16px 24px', overflow: 'hidden' }}>
        {squad.filter(p => p.id !== excludeId).map(p => (
          <div
            key={p.id}
            style={{ display: 'flex', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid var(--b1)', cursor: 'pointer' }}
            onClick={() => onSelect(p.id)}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.5px', width: 32 }}>{p.position}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', flex: 1 }}>{p.name}</div>
            <div style={{ fontSize: 13, color: 'var(--t3)' }}>#{p.number}</div>
          </div>
        ))}
      </div>
    );
  }

  if (step === 'pick1') {
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="modal-title">Player Compare</div>
          <div className="modal-sub">Select first player</div>
          <PlayerPickList excludeId={null} onSelect={setP1Id} />
        </div>
      </div>
    );
  }

  if (step === 'pick2') {
    const p1 = squad.find(p => p.id === p1Id);
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="modal-title">Player Compare</div>
          <div className="modal-sub">Now pick a second player to compare with {p1 ? p1.shortName : ''}</div>
          <PlayerPickList excludeId={p1Id} onSelect={setP2Id} />
        </div>
      </div>
    );
  }

  // Compare view
  const p1 = squad.find(p => p.id === p1Id);
  const p2 = squad.find(p => p.id === p2Id);
  if (!p1 || !p2) return null;

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        {/* Header row */}
        <div style={{ display: 'flex', padding: '0 16px 16px', gap: 8 }}>
          <div style={{ flex: 1, background: 'var(--s2)', borderRadius: 14, padding: '14px 12px', textAlign: 'center', border: '1px solid var(--b2)' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{p1.position}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--t1)', marginTop: 4, lineHeight: 1.25 }}>{p1.shortName}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>#{p1.number}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--t3)', fontWeight: 800, fontSize: 12 }}>VS</div>
          <div style={{ flex: 1, background: 'var(--s2)', borderRadius: 14, padding: '14px 12px', textAlign: 'center', border: '1px solid var(--b2)' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{p2.position}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--t1)', marginTop: 4, lineHeight: 1.25 }}>{p2.shortName}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>#{p2.number}</div>
          </div>
        </div>
        {/* Stats comparison */}
        <div className="card" style={{ margin: '0 16px 16px', overflow: 'hidden' }}>
          {COMPARE_STATS.map(({ key, label, higherBetter, suffix = '' }) => {
            const v1 = p1.stats[key] || 0;
            const v2 = p2.stats[key] || 0;
            const p1Better = higherBetter ? v1 > v2 : v1 < v2;
            const p2Better = higherBetter ? v2 > v1 : v2 < v1;
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', padding: '11px 16px', borderBottom: '1px solid var(--b1)' }}>
                <div style={{ flex: 1, textAlign: 'right', fontSize: 16, fontWeight: 800, color: p1Better ? 'var(--win)' : 'var(--t1)' }}>
                  {v1}{suffix}
                </div>
                <div style={{ width: 110, textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.4px', padding: '0 6px' }}>
                  {label}
                </div>
                <div style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: 800, color: p2Better ? 'var(--win)' : 'var(--t1)' }}>
                  {v2}{suffix}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '0 16px 8px', display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={() => { setP1Id(null); setP2Id(null); }}>New Compare</button>
          <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}


// ── Transfer Tracker Modal ────────────────────────────────────
function TransferTrackerModal({ teamSlug, onClose }) {
  const [tab, setTab] = useState('rumours');
  const data = TRANSFER_MOCK[teamSlug] || TRANSFER_MOCK['arsenal'];
  const teamData = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const teamShort = teamData.shortName || teamSlug;

  const sections = {
    rumours:   { label: 'Rumours',    items: data.rumours   || [] },
    inProcess: { label: 'In Process', items: data.inProcess || [] },
    doneDeal:  { label: 'Done Deal',  items: data.doneDeal  || [] },
  };

  const SECTION_COLORS = {
    rumours:   { bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)', text: 'var(--draw)' },
    inProcess: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.28)', text: '#818CF8' },
    doneDeal:  { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.28)',  text: 'var(--win)' },
  };

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">Transfer Tracker</div>
        <div className="modal-sub">{teamShort} — summer window activity</div>
        {/* Tab strip */}
        <div style={{ display: 'flex', gap: 6, padding: '0 16px 16px' }}>
          {Object.entries(sections).map(([key, { label }]) => {
            const col = SECTION_COLORS[key];
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  flex: 1, border: `1px solid ${active ? col.border : 'var(--b1)'}`,
                  background: active ? col.bg : 'var(--s2)',
                  borderRadius: 10, padding: '8px 4px',
                  fontSize: 11, fontWeight: 700,
                  color: active ? col.text : 'var(--t3)',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        {/* Player cards */}
        <div className="card" style={{ margin: '0 16px 24px', overflow: 'hidden' }}>
          {sections[tab].items.map((item, i) => {
            const col = SECTION_COLORS[tab];
            return (
              <div key={i} style={{ padding: '14px 18px', borderBottom: i < sections[tab].items.length - 1 ? '1px solid var(--b1)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)' }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2 }}>{item.club}</div>
                  </div>
                  <div style={{ background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 700, color: 'var(--t3)', flexShrink: 0 }}>{item.pos}</div>
                  {tab === 'rumours' && item.likelihood && (
                    <div style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 800, color: col.text, flexShrink: 0 }}>{item.likelihood}</div>
                  )}
                  {(tab === 'inProcess' || tab === 'doneDeal') && item.status && (
                    <div style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 800, color: col.text, flexShrink: 0, maxWidth: 90, textAlign: 'center', lineHeight: 1.3 }}>{item.status}</div>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--t3)', lineHeight: 1.55 }}>{item.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ── Season Stats Modal ────────────────────────────────────────
function SeasonStatsModal({ teamSlug, onClose, onOpenModal }) {
  const dashData   = (typeof DASHBOARD_DATA !== 'undefined' && DASHBOARD_DATA[teamSlug]) || {};
  const stats      = dashData.seasonStats || {};
  const teamData   = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const teamShort  = teamData.shortName || teamSlug;
  const competition = (dashData.standings && dashData.standings.competition) || 'League';

  const STAT_ROWS = [
    { key: 'played',        label: 'Games Played',   icon: '📅', fmt: v => v },
    { key: 'goalsScored',   label: 'Goals Scored',   icon: '⚽', fmt: v => v },
    { key: 'goalsConceded', label: 'Goals Conceded',  icon: '🥅', fmt: v => v },
    { key: 'assists',       label: 'Assists',         icon: '🎯', fmt: v => v },
    { key: 'cleanSheets',   label: 'Clean Sheets',    icon: '🧤', fmt: v => v },
    { key: 'possession',    label: 'Avg Possession',  icon: '🔄', fmt: v => v },
    { key: 'shotsPerGame',  label: 'Shots / Game',    icon: '💨', fmt: v => v },
    { key: 'xGFor',         label: 'xG For',          icon: '📈', fmt: v => v },
    { key: 'xGAgainst',     label: 'xG Against',      icon: '📉', fmt: v => v },
  ];

  const hasData = Object.keys(stats).length > 0;

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">Season Stats</div>
        <div className="modal-sub">{teamShort} · {competition} · 2024/25</div>
        {hasData ? (
          <div className="card" style={{ margin: '0 16px 16px', overflow: 'hidden' }}>
            {STAT_ROWS.map(({ key, label, icon, fmt }, i) => {
              const val = stats[key];
              if (val === undefined || val === null) return null;
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'center', padding: '13px 18px', borderBottom: i < STAT_ROWS.length - 1 ? '1px solid var(--b1)' : 'none' }}>
                  <div style={{ fontSize: 16, marginRight: 12, width: 24, textAlign: 'center', flexShrink: 0 }}>{icon}</div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--t2)' }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.3px' }}>{fmt(val)}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: '24px 20px', textAlign: 'center', color: 'var(--t3)', fontSize: 14 }}>
            Season stats not yet available for this team.
          </div>
        )}
        {/* Locked Match Edge card */}
        <div style={{ margin: '0 16px 24px', background: 'linear-gradient(135deg,rgba(239,1,7,0.08) 0%,rgba(239,1,7,0.04) 100%)', border: '1px solid var(--red-b)', borderRadius: 16, padding: '16px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>🔒 Match Edge — Pro</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)', marginBottom: 4 }}>Advanced Performance Metrics</div>
          <div style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.55, marginBottom: 14 }}>
            xG per shot, PPDA, OBVA, progressive carries, press intensity and 20+ advanced metrics unlocked with Pro.
          </div>
          <button className="btn btn-red" style={{ fontSize: 14, padding: '12px' }} onClick={() => { onClose(); onOpenModal('waitlist'); }}>
            Unlock with Pro →
          </button>
        </div>
      </div>
    </div>
  );
}


// ── Trophy Room Modal ─────────────────────────────────────────
function TrophyRoomModal({ teamSlug, onClose }) {
  const trophies = TROPHY_MOCK[teamSlug] || TROPHY_MOCK['arsenal'];
  const teamData  = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const teamShort = teamData.shortName || teamSlug;
  const total     = trophies.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">Trophy Room</div>
        <div className="modal-sub">{teamShort} — {total} major trophies</div>
        <div className="card" style={{ margin: '0 16px 24px', overflow: 'hidden' }}>
          {trophies.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: i < trophies.length - 1 ? '1px solid var(--b1)' : 'none' }}>
              <div style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0, opacity: t.count > 0 ? 1 : 0.25 }}>{t.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.count > 0 ? 'var(--t1)' : 'var(--t3)' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2, lineHeight: 1.4 }}>{t.note}</div>
              </div>
              <div style={{
                minWidth: 36, height: 36, borderRadius: 10,
                background: t.count > 0 ? 'var(--red-a)' : 'var(--s2)',
                border: `1px solid ${t.count > 0 ? 'var(--red-b)' : 'var(--b1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: t.count > 9 ? 13 : 16, fontWeight: 800,
                color: t.count > 0 ? 'var(--red)' : 'var(--t3)',
                flexShrink: 0,
              }}>
                {t.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ── Tactical Breakdown Modal ──────────────────────────────────
function TacticalBreakdownModal({ teamSlug, onClose, onOpenModal }) {
  const td      = TACTICAL_MOCK[teamSlug] || TACTICAL_MOCK['arsenal'];
  const teamData = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const manager  = teamData.manager   || 'The manager';
  const teamShort = teamData.shortName || teamSlug;

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">Tactical Breakdown</div>
        <div className="modal-sub">{teamShort} · {td.formation} · {td.style}</div>

        {/* Quick stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 16px 16px' }}>
          {td.preview.map((item, i) => (
            <div key={i} style={{ background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', lineHeight: 1.35 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Teaser analysis */}
        <div style={{ margin: '0 16px 16px', background: 'var(--s2)', border: '1px solid var(--b2)', borderRadius: 14, padding: '16px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>Analysis Preview</div>
          <div style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65 }}>
            {td.teaser}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--t3)', fontStyle: 'italic' }}>— Analysis continues with Pro access</div>
        </div>

        {/* Locked full analysis */}
        <div style={{ margin: '0 16px 8px', background: 'linear-gradient(135deg,rgba(239,1,7,0.08) 0%,rgba(239,1,7,0.04) 100%)', border: '1px solid var(--red-b)', borderRadius: 16, padding: '16px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>🔒 Full Analysis — Pro</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {td.locked.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.6 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--s2)', border: '1px solid var(--b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, flexShrink: 0 }}>🔒</div>
                <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.4 }}>{item}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-red" style={{ fontSize: 14, padding: '12px' }} onClick={() => { onClose(); onOpenModal('waitlist'); }}>
            Unlock Full Analysis →
          </button>
        </div>

        <div style={{ padding: '12px 16px 8px' }}>
          <button className="btn btn-ghost" style={{ fontSize: 14 }} onClick={onClose}>Back</button>
        </div>
      </div>
    </div>
  );
}


// ── Paywall Modal ─────────────────────────────────────────────
function PaywallModal({ teamSlug, onClose, onSuccess }) {
  const [state, setState] = useState('idle'); // 'idle' | 'success'
  // Use PREMIUM_DATA directly — sync, always available, no async issue in a modal
  const plan     = (PREMIUM_DATA.plans || []).find(p => p.isFeatured) || {};
  const features = (PREMIUM_DATA.lockedFeatures || []).slice(0, 5);
  const _pwTeam    = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const _pwAppName = (_pwTeam.aiContext && _pwTeam.aiContext.appName) || 'GunnerIQ';
  const _pwShort   = _pwTeam.shortName || 'your club';

  if (state === 'success') {
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="paywall-success">
            <div className="paywall-success-icon">🎉</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.5px', marginBottom: 10 }}>
              Welcome to {_pwAppName} Pro!
            </div>
            <div style={{ fontSize: 14, color: 'var(--t3)', lineHeight: 1.6, marginBottom: 28 }}>
              Your {plan.trialDays}-day free trial has started. All Pro features are now unlocked.
            </div>
            <button className="btn btn-red" onClick={onClose}>Start Exploring →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="paywall-hero">
          <div className="paywall-icon">◆</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.5px', marginBottom: 8 }}>
            Try {_pwAppName} Pro Free
          </div>
          <div style={{ fontSize: 14, color: 'var(--t3)', lineHeight: 1.55 }}>
            {plan.trialDays} days free, then {plan.price}/{plan.period ? plan.period.replace('per ', '') : 'month'}. Cancel anytime.
          </div>
        </div>
        <div style={{ margin: '0 16px 20px' }}>
          <div className="card">
            {features.map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderBottom: '1px solid var(--b1)' }}>
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--t1)' }}>{f.label}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--win)', fontSize: 16 }}>✓</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '0 16px' }}>
          <button className="btn btn-red" style={{ fontSize: 16, padding: 16 }} onClick={() => {
            PremiumService.activateMockPro();
            setState('success');
            if (onSuccess) onSuccess();
          }}>
            Start Free Trial
          </button>
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--t3)', marginTop: 10 }}>
            {plan.trialText}
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Locked Feature Notice ─────────────────────────────────────
function LockedModal({ teamSlug, feature, onClose, onUpgrade }) {
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="locked-notice">
          <div className="locked-notice-icon">🔒</div>
          <div className="locked-notice-title">{feature.label} is a Pro feature</div>
          <div className="locked-notice-sub">
            {(function() {
              var _lt = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
              var _la = (_lt.aiContext && _lt.aiContext.appName) || 'GunnerIQ';
              return 'Upgrade to ' + _la + ' Pro to unlock ' + feature.label.toLowerCase() + ' and every other Pro feature. First 7 days are completely free.';
            })()}
          </div>
          <button className="btn btn-red" onClick={onUpgrade}>
            {(function() {
              var _lt = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
              return 'Unlock with ' + ((_lt.aiContext && _lt.aiContext.appName) || 'GunnerIQ') + ' Pro';
            })()}
          </button>
          <button className="btn btn-ghost" style={{ marginTop: 10, fontSize: 14 }} onClick={onClose}>Maybe later</button>
        </div>
      </div>
    </div>
  );
}


// ── Team Picker Sheet ─────────────────────────────────────────
const TEAM_LIST = [
  { slug: 'arsenal',     name: 'Arsenal',     code: 'ARS', league: 'Premier League' },
  { slug: 'liverpool',   name: 'Liverpool',   code: 'LIV', league: 'Premier League' },
  { slug: 'man-city',    name: 'Man City',    code: 'MCI', league: 'Premier League' },
  { slug: 'barcelona',   name: 'Barcelona',   code: 'FCB', league: 'La Liga'        },
  { slug: 'real-madrid', name: 'Real Madrid', code: 'RMA', league: 'La Liga'        },
];

function TeamPicker({ current, onSelect, onClose }) {
  return (
    <div className="modal-backdrop" onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">Select Your Team</div>
        <div style={{ margin: '4px 16px 28px' }}>
          {TEAM_LIST.map(function(t) {
            var teamData = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[t.slug]) || {};
            var c        = teamData.colors || {};
            var isSel    = t.slug === current;
            var primary  = c.primary || '#EF0107';
            return (
              <div
                key={t.slug}
                onClick={function() { onSelect(t.slug); }}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           14,
                  padding:       '12px 14px',
                  borderRadius:  14,
                  marginBottom:  8,
                  background:    isSel ? (c.badgeBg || 'var(--red-a)') : 'var(--s2)',
                  border:        '1px solid ' + (isSel ? (c.badgeBorder || 'var(--red-b)') : 'var(--b1)'),
                  cursor:        'pointer',
                  transition:    'opacity 0.15s',
                }}
              >
                {/* Badge */}
                <div style={{
                  width:           44,
                  height:          44,
                  borderRadius:    12,
                  background:      c.badgeBg     || 'var(--s3)',
                  border:          '1.5px solid ' + (c.badgeBorder || 'var(--b2)'),
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  fontSize:        11,
                  fontWeight:      900,
                  color:           primary,
                  letterSpacing:   '-0.3px',
                  flexShrink:      0,
                }}>
                  {t.code}
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2 }}>
                    {t.league} · {teamData.manager || '—'}
                  </div>
                </div>
                {/* Selected checkmark */}
                {isSel && (
                  <div style={{ fontSize: 17, color: primary, flexShrink: 0, fontWeight: 800 }}>✓</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ── Player insight generator ──────────────────────────────────
function playerInsight(p) {
  var ln = p.name ? (p.name.split(' ').slice(1).join(' ') || p.name) : 'This player';
  var s  = p.stats;
  if (p.position === 'GK')
    return s.cleanSheets + ' clean sheets across ' + s.appearances + ' appearances. Reliable under pressure and commanding from crosses.';
  if (p.position === 'CB')
    return ln + ' has been solid at the back — ' + s.appearances + ' appearances with ' + (s.goals > 0 ? s.goals + ' goal' + (s.goals > 1 ? 's' : '') + ' and ' : '') + 'strong aerial presence all season.';
  if (p.position === 'RB' || p.position === 'LB')
    return ln + ' contributes both ways — ' + s.assists + ' assist' + (s.assists !== 1 ? 's' : '') + ' from fullback and consistent defensive output across ' + s.appearances + ' starts.';
  if (p.position === 'DM')
    return ln + ' is the defensive anchor — strong in the press and covering ' + s.appearances + ' appearances with ' + s.goals + ' goals and ' + s.assists + ' assists from deep.';
  if (s.goals >= 15)
    return ln + "'s " + s.goals + ' goals and ' + s.assists + ' assists make him one of the most productive players in the squad this season.';
  if (s.assists >= 10)
    return s.assists + ' assists highlight ' + ln + "'s exceptional creativity. He consistently unlocks defences and creates high-quality chances.";
  return s.goals + ' goals and ' + s.assists + ' assists across ' + s.appearances + ' appearances. ' + ln + ' brings consistent quality and reliability to the side.';
}

// ── Player modal — bottom sheet shown when a player is tapped ──
function PlayerModal({ player, onClose }) {
  var parts    = player.name ? player.name.split(' ') : [];
  var insight  = playerInsight(player);
  var injColor = player.injuryStatus === 'out' ? 'var(--loss)' : player.injuryStatus === 'doubt' ? 'var(--draw)' : 'var(--win)';
  var injLabel = player.injuryStatus === 'out' ? 'Out' : player.injuryStatus === 'doubt' ? 'Doubt' : 'Available';
  var stats = player.position === 'GK'
    ? [
        { label: 'Clean Sh.', value: player.stats.cleanSheets },
        { label: 'Appearances', value: player.stats.appearances },
        { label: 'Fan Vote',  value: player.fanVotePct + '%' },
      ]
    : [
        { label: 'Goals',       value: player.stats.goals       },
        { label: 'Assists',     value: player.stats.assists      },
        { label: 'Appearances', value: player.stats.appearances  },
      ];

  return (
    <div className="modal-backdrop" onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div style={{ padding: '0 20px 24px' }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
              background: 'var(--s2)', border: '2px solid var(--b2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 900, color: 'var(--red)',
            }}>
              {player.position}
            </div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.4px', lineHeight: 1.2 }}>{player.name}</div>
              <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>#{player.number}</span>
                <span>·</span>
                <span>{player.position}</span>
                <span>·</span>
                <span style={{ color: injColor }}>{injLabel}</span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
            {stats.map(function(s) {
              return (
                <div key={s.label} style={{ background: 'var(--s2)', borderRadius: 12, padding: '12px 6px', textAlign: 'center', border: '1px solid var(--b1)' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--t1)', letterSpacing: '-0.5px' }}>{s.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 4 }}>{s.label}</div>
                </div>
              );
            })}
          </div>

          {/* AI insight */}
          <div style={{ background: 'var(--s2)', borderRadius: 12, padding: '14px 16px', border: '1px solid var(--b1)' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>✦ AI Insight</div>
            <div style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6 }}>{insight}</div>
          </div>

          {/* Injury note if present */}
          {player.injuryNote && (
            <div style={{ marginTop: 12, fontSize: 12, color: injColor, textAlign: 'center' }}>{player.injuryNote}</div>
          )}
        </div>
      </div>
    </div>
  );
}


// ── Modal dispatcher ──────────────────────────────────────────
function Modal({ modal, teamSlug, onClose, onOpenModal, onProActivated }) {
  const { type, data } = modal;
  if (type === 'player')             return <PlayerModal player={data.player} onClose={onClose} />;
  if (type === 'vote')               return <VoteModal teamSlug={teamSlug} onClose={onClose} />;
  if (type === 'quiz')               return <QuizModal onClose={onClose} data={data} />;
  if (type === 'quiz-launcher')      return <QuizLauncherModal teamSlug={teamSlug} onClose={onClose} />;
  if (type === 'player-compare')     return <PlayerCompareModal teamSlug={teamSlug} onClose={onClose} />;
  if (type === 'transfer-tracker')   return <TransferTrackerModal teamSlug={teamSlug} onClose={onClose} />;
  if (type === 'season-stats')       return <SeasonStatsModal teamSlug={teamSlug} onClose={onClose} onOpenModal={onOpenModal} />;
  if (type === 'trophy-room')        return <TrophyRoomModal teamSlug={teamSlug} onClose={onClose} />;
  if (type === 'tactical-breakdown') return <TacticalBreakdownModal teamSlug={teamSlug} onClose={onClose} onOpenModal={onOpenModal} />;
  if (type === 'paywall')  return <PaywallModal teamSlug={teamSlug} onClose={onClose} onSuccess={onProActivated} />;
  if (type === 'waitlist') return <WaitlistModal onClose={onClose} />;
  if (type === 'locked')  return (
    <LockedModal
      teamSlug={teamSlug}
      feature={data.feature}
      onClose={onClose}
      onUpgrade={() => { onClose(); onOpenModal('paywall'); }}
    />
  );
  return null;
}


// ═══════════════════════════════════════════════════════════════
// SCREEN: HOME
// ═══════════════════════════════════════════════════════════════
function HomeScreen({ teamSlug, onNavigate, onOpenModal }) {
  const [data,     setData]     = useState(null);
  const [error,    setError]    = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const [showOpp,       setShowOpp]       = useState(false);
  const [showOppInj,    setShowOppInj]    = useState(false);
  const [dashTab,       setDashTab]       = useState('standings');
  const [showNarrative, setShowNarrative] = useState(false);

  useEffect(function() {
    setShowOpp(false); setShowOppInj(false); setDashTab('standings'); setShowNarrative(false);
  }, [teamSlug]);

  useEffect(function() {
    var active = true;
    setData(null); setError(null);

    DataService.loadHomeScreen(teamSlug)
      .then(function(result) { if (active) setData(result); })
      .catch(function(err)   { if (active) setError(err.message || 'Failed to load'); });

    return function() { active = false; };
  }, [teamSlug, retryKey]);

  if (error)  return <ScreenError message={error} onRetry={function() { setRetryKey(function(k) { return k + 1; }); }} />;
  if (!data) return <ScreenSkeleton />;

  const screenData = data;

  const { fixture, news, playerMap, lineup, oppPlayerMap, oppLineup,
          injuryList, oppInjuryList, oppNews,
          recentResults, standings, seasonStats } = screenData;

  if (!fixture) {
    return (
      <div className="screen-enter" style={{ padding: 20, color: 'var(--t3)', fontSize: 14 }}>
        No upcoming fixture data available.
      </div>
    );
  }

  const { winProb, formTeam, formOpponent } = fixture;
  const hasWinProb = winProb && winProb.home != null;

  // Active team is always primary — shown on left, highlighted
  const _isHome      = fixture.isHome !== false;
  const primaryCode  = _isHome ? fixture.homeCode  : fixture.awayCode;
  const primaryLabel = _isHome ? fixture.homeLabel : fixture.awayLabel;
  const oppCode      = _isHome ? fixture.awayCode  : fixture.homeCode;
  const oppLabel     = _isHome ? fixture.awayLabel : fixture.homeLabel;
  const primaryProb  = winProb && (_isHome ? winProb.home : winProb.away);
  const oppProb      = winProb && (_isHome ? winProb.away : winProb.home);


  const _td      = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const lastResult = recentResults && recentResults[0];

  // Squad grouping helpers
  const DEF_POS = ['CB','LB','RB','LWB','RWB','WB'];
  const MID_POS = ['CDM','DM','CM','CAM','AM'];
  const FWD_POS = ['LW','RW','ST','CF','FW','SS'];
  const squadGroups = [
    { label: 'Goalkeepers', filter: function(p) { return p.position === 'GK'; } },
    { label: 'Defenders',   filter: function(p) { return DEF_POS.includes(p.position); } },
    { label: 'Midfielders', filter: function(p) { return MID_POS.includes(p.position); } },
    { label: 'Forwards',    filter: function(p) { return FWD_POS.includes(p.position); } },
  ];

  return (
    <div className="screen-enter">

      {/* ── Team Summary Card ── */}
      <div className="team-card">
        <div className="tc-glow" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="tc-badge">{_td.code || teamSlug.slice(0,3).toUpperCase()}</div>
            <div>
              <div className="tc-name">{_td.shortName || teamSlug}</div>
              <div className="tc-league">{_td.league || ''}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {_td.manager  && <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 2 }}>👤 {_td.manager}</div>}
            {_td.stadium  && <div style={{ fontSize: 11, color: 'var(--t3)' }}>🏟 {_td.stadium}</div>}
          </div>
        </div>
        <div className="tc-divider" />
        <div style={{ display: 'flex', gap: 8 }}>
          {lastResult && (
            <div className="tc-fixture">
              <div className="tc-fix-label">Last</div>
              <div className="tc-fix-opp">{lastResult.homeAway === 'H' ? 'vs' : '@'} {lastResult.opponent}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: lastResult.result === 'W' ? 'var(--win)' : lastResult.result === 'L' ? 'var(--loss)' : 'var(--draw)' }}>{lastResult.score}</span>
                <span style={{ fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '1px 5px', background: lastResult.result === 'W' ? 'rgba(74,222,128,0.15)' : lastResult.result === 'L' ? 'rgba(239,68,68,0.15)' : 'rgba(251,191,36,0.15)', color: lastResult.result === 'W' ? 'var(--win)' : lastResult.result === 'L' ? 'var(--loss)' : 'var(--draw)' }}>{lastResult.result}</span>
              </div>
            </div>
          )}
          {fixture && (
            <div className="tc-fixture">
              <div className="tc-fix-label">Next</div>
              <div className="tc-fix-opp">{_isHome ? 'vs' : '@'} {oppLabel}</div>
              <div className="tc-fix-sub">{fixture.time} · {fixture.date}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Dashboard Tabs ── */}
      <div className="sec" style={{ paddingTop: 16 }}>
        <div className="tabs">
          {[['standings','Table'],['stats','Stats'],['squad','Squad']].map(function([key, label]) {
            return (
              <button key={key} className={`tab ${dashTab === key ? 'on' : 'off'}`} onClick={() => setDashTab(key)}>
                {label}
              </button>
            );
          })}
        </div>

        {/* Standings */}
        {dashTab === 'standings' && standings && (function() {
          function zoneColor(pos) {
            if (pos <= 4)  return '#3B82F6';
            if (pos <= 6)  return '#F97316';
            if (pos === 7) return '#22C55E';
            if (pos >= 18) return 'var(--loss)';
            return null;
          }
          var tableRows  = standings.table;
          var activeIdx  = tableRows.findIndex(function(r) { return r.active; });
          var winSize    = 8;
          var winStart   = Math.max(0, Math.min(activeIdx - 2, tableRows.length - winSize));
          var visible    = tableRows.slice(winStart, winStart + winSize);
          return (
            <div className="card" style={{ marginTop: 10, overflow: 'hidden', padding: 0 }}>
              <div className="sth" style={{ paddingLeft: 6 }}>
                <span style={{ width: 6, display: 'inline-block' }} />
                <span style={{ width: 26, fontSize: 10, fontWeight: 700, color: 'var(--t3)' }}>#</span>
                <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: 'var(--t3)' }}>Club</span>
                {['P','W','D','L','GD','Pts'].map(function(h) {
                  return <span key={h} style={{ width: h === 'GD' ? 34 : h === 'Pts' ? 28 : 24, fontSize: 10, fontWeight: 700, color: 'var(--t3)', textAlign: 'center' }}>{h}</span>;
                })}
              </div>
              {visible.map(function(row) {
                var zc = zoneColor(row.pos);
                return (
                  <div key={row.pos} className={'str' + (row.active ? ' active' : '')} style={{ paddingLeft: 6 }}>
                    <div style={{ width: 3, alignSelf: 'stretch', background: zc || 'transparent', borderRadius: 2, marginRight: 3, flexShrink: 0 }} />
                    <span style={{ width: 26, fontSize: 12, fontWeight: 700, color: row.active ? 'var(--red)' : 'var(--t3)' }}>{row.pos}</span>
                    <span style={{ flex: 1, fontSize: 12, fontWeight: row.active ? 800 : 500, color: row.active ? 'var(--t1)' : 'var(--t2)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: row.active ? 'var(--red)' : 'var(--t3)', minWidth: 26 }}>{row.code}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 80 }}>{row.team}</span>
                    </span>
                    {[row.P, row.W, row.D, row.L].map(function(v, vi) {
                      return <span key={vi} style={{ width: 24, fontSize: 12, color: 'var(--t3)', textAlign: 'center' }}>{v}</span>;
                    })}
                    <span style={{ width: 34, fontSize: 12, color: 'var(--t3)', textAlign: 'center' }}>{row.GD}</span>
                    <span style={{ width: 28, fontSize: 13, fontWeight: 800, color: row.active ? 'var(--red)' : 'var(--t1)', textAlign: 'center' }}>{row.Pts}</span>
                  </div>
                );
              })}
              {/* Zone legend */}
              <div style={{ display: 'flex', gap: 10, padding: '7px 10px 8px', borderTop: '1px solid var(--b1)', flexWrap: 'wrap' }}>
                {[['#3B82F6','Champions League'],['#F97316','Europa League'],['#22C55E','Conference Lge']].map(function([c,l]) {
                  return (
                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: c, flexShrink: 0 }} />
                      <span style={{ fontSize: 9, color: 'var(--t3)', fontWeight: 600 }}>{l}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Season Stats */}
        {dashTab === 'stats' && seasonStats && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Goals Scored',   value: seasonStats.goalsScored   },
                { label: 'Goals Conceded', value: seasonStats.goalsConceded },
                { label: 'Assists',        value: seasonStats.assists        },
                { label: 'Clean Sheets',   value: seasonStats.cleanSheets   },
                { label: 'Possession',     value: seasonStats.possession    },
                { label: 'Shots / Game',   value: seasonStats.shotsPerGame  },
                { label: 'xG For',         value: seasonStats.xGFor         },
                { label: 'xG Against',     value: seasonStats.xGAgainst     },
              ].map(function(s) {
                return (
                  <div key={s.label} className="card" style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--t1)', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 5, fontWeight: 600 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: 'var(--t3)', textAlign: 'center', marginTop: 10 }}>{seasonStats.played} matches played this season</div>
          </div>
        )}

        {/* Squad */}
        {dashTab === 'squad' && playerMap && (function() {
          var squad = Object.values(playerMap).sort(function(a, b) { return a.number - b.number; });
          return (
            <div className="card" style={{ marginTop: 10, overflow: 'hidden', padding: 0 }}>
              {squadGroups.map(function(group, gi) {
                var players = squad.filter(group.filter);
                if (!players.length) return null;
                return (
                  <div key={group.label}>
                    <div style={{ padding: '7px 14px 5px', fontSize: 10, fontWeight: 800, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.8px', background: 'var(--s2)', borderTop: gi > 0 ? '1px solid var(--b1)' : 'none' }}>
                      {group.label}
                    </div>
                    {players.map(function(p, pi) {
                      var injColor = p.injuryStatus === 'out' ? 'var(--loss)' : p.injuryStatus === 'doubt' ? 'var(--draw)' : 'var(--win)';
                      return (
                        <div key={p.number} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderTop: '1px solid var(--b1)' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', width: 20, textAlign: 'right' }}>{p.number}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)', flex: 1 }}>{p.name}</span>
                          <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--t3)', background: 'var(--s2)', borderRadius: 4, padding: '2px 6px', border: '1px solid var(--b1)' }}>{p.position}</span>
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: injColor, flexShrink: 0 }} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* ── Hero match card ── */}
      <div className="hero">
        <div className="hero-glow-left" />
        <div className="hero-glow-right" />
        <div className="hero-top">
          <span className="comp-pill">{fixture.competition}{fixture.gameweek ? ' · GW' + fixture.gameweek : ''}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--t3)' }}>{fixture.date}</span>
        </div>
        <div className="hero-teams">
          <div className="hteam">
            <div className="hbadge home">{primaryCode}</div>
            <div className="hteam-name">{primaryLabel}</div>
          </div>
          <div className="hvc">
            <div className="hvc-vs">vs</div>
            <div className="hvc-time">{fixture.time}</div>
            <div className="hvc-venue">{fixture.venue}</div>
          </div>
          <div className="hteam">
            <div className="hbadge away">{oppCode}</div>
            <div className="hteam-name">{oppLabel}</div>
          </div>
        </div>

        {/* Recent form */}
        <div className="hero-forms">
          <FormRow label={primaryLabel} results={formTeam}     />
          <FormRow label={oppLabel}     results={formOpponent} />
        </div>

        {/* Win probability bar — only shown when data is available */}
        {hasWinProb && (
          <div className="prob-section">
            <div className="prob-label-row">
              <span style={{ color: 'var(--red)' }}>{primaryLabel} {primaryProb}%</span>
              <span style={{ color: 'var(--t3)' }}>Draw {winProb.draw}%</span>
              <span style={{ color: 'var(--t2)' }}>{oppLabel} {oppProb}%</span>
            </div>
            <div className="prob-track">
              <div className="prob-fill-home" style={{ width: primaryProb + '%' }} />
              <div className="prob-fill-draw" style={{ width: winProb.draw + '%' }} />
              <div className="prob-fill-away" />
            </div>
            <div className="prob-footer">
              <span>Win probability</span>
              <span>{winProb.fanPredictPct}% of fans predict {primaryLabel} win</span>
            </div>
          </div>
        )}

        {/* Key pre-match stats grid — 4 analytical pills */}
        {fixture.keyStats && fixture.keyStats.length > 0 && (
          <div className="key-stat-grid">
            {fixture.keyStats.map(function(s, i) {
              return (
                <div key={i} className="key-stat">
                  <div className={'key-stat-val ' + (s.trend || '')}>{s.value}</div>
                  <div className="key-stat-lbl">{s.label}</div>
                  <div className="key-stat-ctx">{s.context}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tactical narrative — collapsible */}
        {fixture.narrative && (
          <div>
            <button onClick={() => setShowNarrative(function(v) { return !v; })} style={{
              width: '100%', background: 'transparent', border: '1px solid var(--b2)', borderRadius: 8,
              color: 'var(--t2)', fontSize: 12, fontWeight: 700, padding: '8px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10,
            }}>
              <span>{showNarrative ? '▲' : '▼'}</span>
              <span>{showNarrative ? 'Hide match analysis' : 'View match analysis'}</span>
            </button>
            {showNarrative && <div className="narrative" style={{ marginTop: 8 }}>{fixture.narrative}</div>}
          </div>
        )}

        {/* Navigate to Match Hub */}
        <div className="hero-cta">
          <button className="btn btn-red" onClick={() => onNavigate('match')}>
            View Full Match Hub →
          </button>
        </div>
      </div>

      {/* ── Today's Talking Point ── */}
      {fixture.talkingPoint && fixture.talkingPoint.quote && (
        <div className="insight">
          <div className="insight-line" />
          <div style={{ paddingLeft: 16 }}>
            <div className="insight-tag">Today's Talking Point</div>
            <div className="insight-quote">{fixture.talkingPoint.quote}</div>
            <div className="insight-credit">{fixture.talkingPoint.credit}</div>
          </div>
        </div>
      )}

      {/* ── Predicted Lineup (hidden when no data for this team) ── */}
      {lineup && lineup.rows && lineup.rows.length > 0 && (function() {
        const activeLineup    = showOpp ? oppLineup    : lineup;
        const activePlayerMap = showOpp ? oppPlayerMap : playerMap;
        const hasOpp = oppLineup && oppLineup.rows && oppLineup.rows.length > 0;
        if (!activeLineup || !activeLineup.rows) return null;
        return (
          <div className="sec" style={{ paddingTop: 26 }}>
            <div className="sec-hd">
              <span className="lbl">Predicted Lineup · {activeLineup.formation}</span>
              <span className="sec-more" onClick={() => onOpenModal('vote')}>Vote →</span>
            </div>
            {hasOpp && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <button onClick={() => setShowOpp(false)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: !showOpp ? 'var(--red)' : 'var(--s2)',
                  color: !showOpp ? '#fff' : 'var(--t2)',
                  fontSize: 12, fontWeight: 700, transition: 'background 0.15s',
                }}>{primaryLabel}</button>
                <button onClick={() => setShowOpp(true)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: showOpp ? 'var(--t1)' : 'var(--s2)',
                  color: showOpp ? 'var(--bg)' : 'var(--t2)',
                  fontSize: 12, fontWeight: 700, transition: 'background 0.15s',
                }}>{oppLabel}</button>
              </div>
            )}
            <div className="card">
              <div className="pitch-wrap">
                <div className="pitch">
                  <div className="pitch-stripe" />
                  {activeLineup.rows.map(function(row, ri) {
                    return (
                      <div key={ri} className="pitch-row">
                        {row.playerIds.map(function(id) {
                          const p = activePlayerMap[id];
                          if (!p) return null;
                          var parts = p.name ? p.name.split(' ') : [];
                          var lastName = parts.length > 1 ? parts.slice(1).join(' ') : p.name;
                          return (
                            <div key={id} className="ptok" onClick={() => onOpenModal('player', { player: p })}>
                              <div className={`pcirc${row.isGoalkeeper ? ' gk' : ''}`}>
                                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '-0.2px' }}>{p.position}</span>
                              </div>
                              <div className="plabel">{lastName}</div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="tap-hint">Tap a player for stats &amp; insight</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Injury & Availability ── */}
      {injuryList && injuryList.length > 0 && (
        <div className="sec">
          <div className="sec-hd">
            <span className="lbl">Injury & Availability</span>
          </div>
          {oppInjuryList && oppInjuryList.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              <button onClick={() => setShowOppInj(false)} style={{
                flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: !showOppInj ? 'var(--red)' : 'var(--s2)',
                color: !showOppInj ? '#fff' : 'var(--t2)',
                fontSize: 12, fontWeight: 700, transition: 'background 0.15s',
              }}>{primaryLabel}</button>
              <button onClick={() => setShowOppInj(true)} style={{
                flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: showOppInj ? 'var(--t1)' : 'var(--s2)',
                color: showOppInj ? 'var(--bg)' : 'var(--t2)',
                fontSize: 12, fontWeight: 700, transition: 'background 0.15s',
              }}>{oppLabel}</button>
            </div>
          )}
          <div className="card">
            {(showOppInj ? oppInjuryList : injuryList).map(function({ name, status, statusColor }) {
              return (
                <div key={name} className="injrow">
                  <div className="injdot" style={{ background: statusColor }} />
                  <div className="injname">{name}</div>
                  <div className="injst" style={{ color: statusColor }}>{status}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Latest news ── */}
      <div className="sec">
        <div className="sec-hd">
          <span className="lbl">Latest</span>
          <span className="sec-more">All news →</span>
        </div>
        <div className="card">
          {(!news || news.length === 0) && (
            <div style={{ padding: '16px 18px', color: 'var(--t3)', fontSize: 13 }}>No news available.</div>
          )}
          {(news || []).map(function(article, i) {
            return (
              <div key={article.id} className="nrow">
                <div className="nidx">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <span className="ntag">{article.tag}</span>
                  <div className="nhead">{article.title}</div>
                  <div className="nmeta">{article.publishedAt} · {article.source}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="sec">
        <div className="lbl" style={{ marginBottom: 14 }}>Quick Actions</div>
        <div className="qa-grid">
          {[
            { icon: '✦', lbl: 'Ask AI',    sub: 'Chat with ' + (((typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {}).aiContext || {}).appName || 'AI',    tab: 'ai'    },
            { icon: '⇄', lbl: 'Transfers', sub: 'Ins, outs & rumours',   tab: null    },
            { icon: '📊',lbl: 'Stats',     sub: 'Season & match data',   tab: 'match' },
            { icon: '🗳',lbl: 'Fan Poll',  sub: "Vote on today's topic", tab: 'fan'   },
          ].map(function({ icon, lbl, sub, tab }) {
            return (
              <div key={lbl} className="qa" onClick={() => tab && onNavigate(tab)}>
                <div className="qa-icon">{icon}</div>
                <div className="qa-lbl">{lbl}</div>
                <div className="qa-sub">{sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// SCREEN: MATCH HUB
// ═══════════════════════════════════════════════════════════════
function MatchScreen({ teamSlug, isPro, onOpenModal }) {
  const [atab,       setAtab]      = useState('stats');
  const [pollVote,   setPollVote]  = useState(() => PollService.getUserScoreVote(teamSlug));
  const [data,       setData]      = useState(null);
  const [error,      setError]     = useState(null);
  const [retryKey,   setRetryKey]  = useState(0);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [lineupView,      setLineupView]      = useState('list');
  const [showMatchNews,   setShowMatchNews]   = useState('team');
  const mselStripRef = useRef(null);

  useEffect(function() { setSelectedMatchId(null); setLineupView('list'); setShowMatchNews('team'); }, [teamSlug]);

  useEffect(function() {
    if (!mselStripRef.current || !data) return;
    var strip = mselStripRef.current;
    var active = strip.querySelector('.msel.active');
    if (active) {
      strip.scrollLeft = active.offsetLeft - (strip.offsetWidth / 2) + (active.offsetWidth / 2);
    }
  }, [data]);

  useEffect(function() {
    var active = true;
    setData(null); setError(null);

    DataService.loadMatchScreen(teamSlug)
      .then(function(result) { if (active) setData(result); })
      .catch(function(err)   { if (active) setError(err.message || 'Failed to load'); });

    return function() { active = false; };
  }, [teamSlug, retryKey]);

  function vote(label) {
    const next = pollVote === label ? null : label;
    PollService.setUserScoreVote(teamSlug, next);
    setPollVote(next);
  }

  if (error)  return <ScreenError message={error} onRetry={function() { setRetryKey(function(k) { return k + 1; }); }} />;
  if (!data) return <ScreenSkeleton />;

  const { fixture, stats, h2h, injuryList, oppInjuryList, oppLineup, keyBattles,
          scorePoll, playerMap, lineup, formTeam, formOpponent, recentResults,
          matchEdge, matchSelector, news, oppNews } = data;

  const currentSel   = (matchSelector || []).find(function(m) { return m.id === selectedMatchId; }) || null;
  const selIsCurrent = !currentSel || currentSel.type === 'current';

  // Active team is always primary — shown on left, highlighted
  const _mhome        = fixture ? fixture.isHome !== false : true;
  const primaryLabel  = fixture ? (_mhome ? fixture.homeLabel : fixture.awayLabel) : '';
  const opponentLabel = fixture ? (_mhome ? fixture.awayLabel : fixture.homeLabel) : '';
  const primaryCode   = fixture ? (_mhome ? fixture.homeCode  : fixture.awayCode)  : '';
  const opponentCode  = fixture ? (_mhome ? fixture.awayCode  : fixture.homeCode)  : '';

  if (!fixture) {
    return (
      <div className="screen-enter" style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--t3)', fontSize: 14, lineHeight: 1.7 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
        <div style={{ fontWeight: 700, color: 'var(--t2)', marginBottom: 6 }}>No fixture scheduled</div>
        <div>Check back closer to the next match date.</div>
      </div>
    );
  }

  return (
    <div className="screen-enter">

      {/* ── Match selector strip ── */}
      {matchSelector && matchSelector.length > 0 && (
        <div className="msel-strip" ref={mselStripRef}>
          {matchSelector.map(function(m) {
            var isSel = selectedMatchId === m.id || (!selectedMatchId && m.type === 'current');
            var result = m.type === 'past'
              ? (m.teamScore > m.oppScore ? 'W' : m.teamScore < m.oppScore ? 'L' : 'D')
              : null;
            var haScore = result
              ? (m.homeAway === 'H' ? m.teamScore + '–' + m.oppScore : m.oppScore + '–' + m.teamScore)
              : null;
            var scoreColor = isSel ? '#fff'
              : result === 'W' ? 'var(--win)'
              : result === 'L' ? 'var(--loss)'
              : result === 'D' ? 'var(--draw)'
              : 'var(--t2)';
            return (
              <div key={m.id} className={'msel ' + (isSel ? 'active' : 'inactive')}
                onClick={() => setSelectedMatchId(m.type === 'current' ? null : m.id)}>
                <div className="msel-comp" style={{ color: isSel ? 'rgba(255,255,255,0.65)' : 'var(--t3)' }}>
                  {m.competition}{m.homeAway === 'H' ? ' H' : ' A'}
                </div>
                <div className="msel-opp" style={{ color: isSel ? '#fff' : 'var(--t1)' }}>{m.opCode}</div>
                {m.type === 'past' ? (
                  <div className="msel-score" style={{ color: scoreColor, fontWeight: 900 }}>{haScore}</div>
                ) : (
                  <div className="msel-time" style={{ color: isSel ? 'rgba(255,255,255,0.8)' : 'var(--t3)' }}>
                    {m.type === 'current' ? m.time : m.date}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Header ── */}
      {selIsCurrent ? (
        <div className="mhero">
          <div className="mhero-top">
            <div className="mpage-title">Match Hub</div>
            <span className="comp-pill">{fixture.competitionShort || fixture.competition}{fixture.gameweek ? ' · GW' + fixture.gameweek : ''}</span>
          </div>
          <div className="mteams">
            <div className="mt">
              <div className="mbadge h">{primaryCode}</div>
              <div className="mt-name">{primaryLabel}</div>
            </div>
            <div className="mvc">
              <div className="mvc-vs">vs</div>
              <div className="mvc-time">{fixture.time}</div>
              <div className="mvc-sub">{fixture.date} · {fixture.venue}</div>
            </div>
            <div className="mt">
              <div className="mbadge a">{opponentCode}</div>
              <div className="mt-name">{opponentLabel}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mhero">
          <div className="mhero-top">
            <div className="mpage-title">Match Hub</div>
            <span className="comp-pill">{currentSel.competition}{currentSel.homeAway === 'H' ? ' · Home' : ' · Away'}</span>
          </div>
          <div className="mteams">
            <div className="mt">
              <div className="mbadge h">{currentSel.homeAway === 'H' ? primaryCode : currentSel.opCode}</div>
              <div className="mt-name">{currentSel.homeAway === 'H' ? primaryLabel : currentSel.opponent}</div>
            </div>
            <div className="mvc">
              {currentSel.type === 'past' ? (
                <div className="mvc-vs" style={{ fontSize: 22, letterSpacing: '-0.5px' }}>
                  {currentSel.homeAway === 'H' ? currentSel.teamScore + '–' + currentSel.oppScore : currentSel.oppScore + '–' + currentSel.teamScore}
                </div>
              ) : (
                <div className="mvc-vs">vs</div>
              )}
              <div className="mvc-time">{currentSel.type === 'past' ? 'FT' : currentSel.time}</div>
              <div className="mvc-sub">{currentSel.date}</div>
            </div>
            <div className="mt">
              <div className="mbadge a">{currentSel.homeAway === 'H' ? currentSel.opCode : primaryCode}</div>
              <div className="mt-name">{currentSel.homeAway === 'H' ? currentSel.opponent : primaryLabel}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab bar ── */}
      <div className="tabs">
        {['stats', 'form', 'lineups', 'poll'].map(t => (
          <button key={t} className={`tab ${atab === t ? 'on' : 'off'}`} onClick={() => setAtab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ── STATS TAB ── */}
      {atab === 'stats' && (
        <div className="sec" style={{ paddingTop: 20 }}>

          {/* Notice when non-upcoming match is selected */}
          {!selIsCurrent && (
            <div style={{ background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14 }}>ℹ️</span>
              <span style={{ fontSize: 12, color: 'var(--t3)', lineHeight: 1.4 }}>Detailed stats shown for the upcoming fixture. Select the current match to see full analysis.</span>
            </div>
          )}

          {/* Season averages comparison bars */}
          <div className="card" style={{ padding: '20px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--red)' }}>{primaryLabel}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Season Avg</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--t2)' }}>{opponentLabel}</span>
            </div>
            {stats.map(function({ label, teamValue, oppValue, teamWidth }) {
              return (
                <div key={label} className="mstat">
                  <div className="mstat-row">
                    <span className="mval accent">{teamValue}</span>
                    <span className="mkey">{label}</span>
                    <span className="mval">{oppValue}</span>
                  </div>
                  <div className="mtrack"><div className="mfill" style={{ width: teamWidth + '%' }} /></div>
                </div>
              );
            })}
          </div>

          {/* Head-to-Head with recent meetings */}
          {h2h && (
            <div style={{ marginTop: 22 }}>
              <div className="lbl" style={{ marginBottom: 12 }}>Head-to-Head</div>
              <div className="card">
                <div className="h2h">
                  <div><div className="h2h-n">{h2h.teamWins}</div><div className="h2h-l">{primaryLabel} W</div></div>
                  <div><div className="h2h-n">{h2h.draws}</div><div className="h2h-l">Draws</div></div>
                  <div><div className="h2h-n">{h2h.oppWins}</div><div className="h2h-l">{opponentLabel} W</div></div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--t3)', textAlign: 'center', paddingBottom: h2h.recentMeetings && h2h.recentMeetings.length > 0 ? 4 : 16 }}>
                  {h2h.description}
                </div>
                {/* Recent meetings list */}
                {h2h.recentMeetings && h2h.recentMeetings.length > 0 && (
                  <div>
                    {h2h.recentMeetings.map(function(m, i) {
                      var scoreColor = m.result === teamSlug ? 'var(--win)' : m.result === 'draw' ? 'var(--t2)' : 'var(--loss)';
                      return (
                        <div key={i} className="h2h-meeting">
                          <span style={{ color: 'var(--t3)', width: 66, flexShrink: 0 }}>{m.date}</span>
                          <span className="h2h-meeting-home">{m.homeTeam}</span>
                          <span className="h2h-meeting-score" style={{ color: scoreColor }}>{m.score}</span>
                          <span className="h2h-meeting-comp">{m.competition}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Key individual battles */}
          {keyBattles && keyBattles.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <div className="lbl" style={{ marginBottom: 12 }}>Key Battles</div>
              <div className="card">
                {keyBattles.map(function(b, i) {
                  return (
                    <div key={i} className="key-battle">
                      <div className="battle-players">
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)' }}>{b.teamPlayer}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: 0.5 }}>vs</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t2)' }}>{b.theirPlayer}</span>
                      </div>
                      <div className="battle-ctx">{b.context}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Injury & availability — both teams shown together */}
          {(injuryList.length > 0 || (oppInjuryList && oppInjuryList.length > 0)) && (
            <div style={{ marginTop: 22 }}>
              <div className="lbl" style={{ marginBottom: 12 }}>Injury & Availability</div>
              <div className="card">
                {injuryList.length > 0 && (
                  <div>
                    <div style={{ padding: '7px 14px 5px', fontSize: 10, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.8px', background: 'var(--s2)', borderBottom: '1px solid var(--b1)' }}>
                      {primaryLabel}
                    </div>
                    {injuryList.map(function({ name, status, statusColor }) {
                      return (
                        <div key={name} className="injrow">
                          <div className="injdot" style={{ background: statusColor }} />
                          <div className="injname">{name}</div>
                          <div className="injst" style={{ color: statusColor }}>{status}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {oppInjuryList && oppInjuryList.length > 0 && (
                  <div style={{ borderTop: injuryList.length > 0 ? '1px solid var(--b1)' : 'none' }}>
                    <div style={{ padding: '7px 14px 5px', fontSize: 10, fontWeight: 800, color: 'var(--t2)', textTransform: 'uppercase', letterSpacing: '0.8px', background: 'var(--s2)', borderBottom: '1px solid var(--b1)' }}>
                      {opponentLabel}
                    </div>
                    {oppInjuryList.map(function({ name, status, statusColor }) {
                      return (
                        <div key={name} className="injrow">
                          <div className="injdot" style={{ background: statusColor }} />
                          <div className="injname">{name}</div>
                          <div className="injst" style={{ color: statusColor }}>{status}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── FORM TAB ── */}
      {atab === 'form' && (
        <div className="sec" style={{ paddingTop: 20 }}>

          {/* Form dots */}
          <div className="card" style={{ padding: '20px 18px' }}>
            {[
              { name: primaryLabel, form: formTeam     },
              { name: opponentLabel,   form: formOpponent },
            ].map(function({ name, form: f }) {
              return (
                <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)', width: 84 }}>{name}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {f.map(function(r, i) { return <FormDot key={i} result={r} />; })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent results with scores */}
          {recentResults && recentResults.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <div className="lbl" style={{ marginBottom: 12 }}>Recent Results</div>
              <div className="card">
                {recentResults.map(function(r, i) {
                  return (
                    <div key={i} className="recent-result">
                      <div className={'rr-badge ' + r.result}>{r.result}</div>
                      <div className="rr-meta">
                        <div className="rr-opp">{r.homeAway === 'H' ? 'vs' : '@'} {r.opponent}</div>
                        <div className="rr-comp">{r.competition} · {r.date}</div>
                      </div>
                      <div className={'rr-score result-' + r.result.toLowerCase()}>{r.score}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── LINEUPS TAB ── */}
      {atab === 'lineups' && (function() {
        var oppNames = oppLineup ? (oppLineup.playerNames || oppLineup.playerInitials || []) : [];

        // Parse opponent formation into rows: [GK], [DEF...], [MID...], [FWD...]
        function parseOppRows(formation, names) {
          var parts = formation ? formation.split('-').map(Number) : [];
          var rows = [[names[0]]];
          var idx = 1;
          for (var i = 0; i < parts.length; i++) {
            rows.push(names.slice(idx, idx + parts[i]));
            idx += parts[i];
          }
          return rows;
        }
        var oppRows = oppLineup ? parseOppRows(oppLineup.formation, oppNames) : [];

        return (
          <div className="sec" style={{ paddingTop: 20 }}>
            {/* View toggle */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              {[['list','List'],['pitch','Pitch']].map(function([v, lbl]) {
                return (
                  <button key={v} onClick={() => setLineupView(v)} style={{
                    flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: lineupView === v ? 'var(--red)' : 'var(--s2)',
                    color: lineupView === v ? '#fff' : 'var(--t2)',
                    fontSize: 12, fontWeight: 700, transition: 'background 0.15s',
                  }}>{lbl}</button>
                );
              })}
            </div>

            {/* LIST VIEW */}
            {lineupView === 'list' && (
              <div className="card" style={{ padding: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, textAlign: 'center', marginBottom: 4, color: 'var(--red)' }}>{primaryLabel}</div>
                    <div style={{ fontSize: 10, textAlign: 'center', color: 'var(--t3)', marginBottom: 10 }}>{lineup.formation}</div>
                    {lineup.rows.flatMap(function(r) { return r.playerIds; }).map(function(id, i) {
                      const p = playerMap[id];
                      var parts = p && p.name ? p.name.split(' ') : [];
                      var lastName = parts.length > 1 ? parts.slice(1).join(' ') : (p ? p.name : '?');
                      return (
                        <div key={id} style={{
                          background: i === 0 ? 'var(--red-a)' : 'var(--s2)',
                          border: '1px solid ' + (i === 0 ? 'var(--red-b)' : 'var(--b1)'),
                          borderRadius: 9, padding: '8px', fontSize: 12, fontWeight: 700,
                          color: i === 0 ? 'var(--red)' : 'var(--t1)', marginBottom: 4, textAlign: 'center',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{lastName}</div>
                      );
                    })}
                  </div>
                  {oppLineup && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, textAlign: 'center', marginBottom: 4, color: 'var(--t2)' }}>{oppLineup.teamLabel}</div>
                      <div style={{ fontSize: 10, textAlign: 'center', color: 'var(--t3)', marginBottom: 10 }}>{oppLineup.formation}</div>
                      {oppNames.map(function(name, i) {
                        return (
                          <div key={i} style={{
                            background: i === 0 ? 'rgba(255,255,255,0.06)' : 'var(--s2)',
                            border: '1px solid var(--b1)',
                            borderRadius: 9, padding: '8px', fontSize: 12, fontWeight: 700,
                            color: 'var(--t1)', marginBottom: 4, textAlign: 'center',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{name}</div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PITCH VIEW */}
            {lineupView === 'pitch' && (
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="pitch-wrap" style={{ minHeight: 520, paddingBottom: 16 }}>
                  <div className="pitch" style={{ gap: 0, paddingTop: 10, paddingBottom: 10 }}>
                    <div className="pitch-stripe" />

                    {/* Opponent — GK at top, attack near center */}
                    <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--t3)', textAlign: 'center', marginBottom: 6, letterSpacing: '0.4px' }}>
                      {oppLineup ? oppLineup.teamLabel : opponentLabel} · {oppLineup ? oppLineup.formation : ''}
                    </div>
                    {oppRows.map(function(row, ri) {
                      return (
                        <div key={'opp-' + ri} className="pitch-row" style={{ marginBottom: ri === oppRows.length - 1 ? 10 : 3 }}>
                          {row.map(function(name, pi) {
                            return (
                              <div key={pi} className="ptok">
                                <div className="pcirc" style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                                  <span style={{ fontSize: 8, fontWeight: 800, color: 'var(--t2)' }}>{name ? name.slice(0,2).toUpperCase() : ''}</span>
                                </div>
                                <div className="plabel" style={{ color: 'var(--t2)', fontSize: 9 }}>{name}</div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {/* Center line */}
                    <div style={{ width: '85%', height: 1, background: 'rgba(255,255,255,0.18)', margin: '4px auto 4px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%', position: 'absolute', background: 'transparent' }} />
                    </div>

                    {/* Home team — attack near center, GK at bottom */}
                    <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--red)', textAlign: 'center', marginTop: 10, marginBottom: 6, letterSpacing: '0.4px' }}>
                      {primaryLabel} · {lineup.formation}
                    </div>
                    {[...lineup.rows].reverse().map(function(row, ri) {
                      return (
                        <div key={'home-' + ri} className="pitch-row" style={{ marginBottom: ri === lineup.rows.length - 1 ? 0 : 3 }}>
                          {row.playerIds.map(function(id) {
                            const p = playerMap[id];
                            var parts = p && p.name ? p.name.split(' ') : [];
                            var lastName = parts.length > 1 ? parts.slice(1).join(' ') : (p ? p.name : '?');
                            return (
                              <div key={id} className="ptok">
                                <div className={`pcirc${row.isGoalkeeper ? ' gk' : ''}`}>
                                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '-0.2px' }}>{p ? p.position : ''}</span>
                                </div>
                                <div className="plabel">{lastName}</div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* ── POLL TAB ── */}
      {atab === 'poll' && (
        <div className="sec" style={{ paddingTop: 20 }}>
          <div className="lbl" style={{ marginBottom: 6 }}>Score Prediction</div>
          <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 14 }}>
            {pollVote ? `You predicted: ${pollVote}` : 'Tap an option to cast your vote'}
          </div>
          <div className="card">
            {scorePoll.options.map(function({ label, pct }, i) {
              return (
                <div key={i} className={`pollrow${pollVote === label ? ' selected' : ''}`} onClick={() => vote(label)}>
                  <div className="polltop">
                    <span>{label}</span>
                    <span className="pollpct">{pollVote === label ? '✓ ' : ''}{pct}%</span>
                  </div>
                  <div className="polltrack"><div className="pollfill" style={{ width: pct + '%' }} /></div>
                </div>
              );
            })}
            <div style={{ fontSize: 12, color: 'var(--t3)', textAlign: 'center', padding: '14px 0 6px' }}>
              {scorePoll.totalVotes.toLocaleString()} votes
            </div>
          </div>
        </div>
      )}

      {/* ── Latest News ── */}
      {news && news.length > 0 && (
        <div className="sec">
          <div className="sec-hd">
            <span className="lbl">Latest News</span>
          </div>
          {oppNews && oppNews.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              <button onClick={() => setShowMatchNews('team')} style={{
                flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: showMatchNews === 'team' ? 'var(--red)' : 'var(--s2)',
                color: showMatchNews === 'team' ? '#fff' : 'var(--t2)',
                fontSize: 12, fontWeight: 700, transition: 'background 0.15s',
              }}>{primaryLabel}</button>
              <button onClick={() => setShowMatchNews('opp')} style={{
                flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: showMatchNews === 'opp' ? 'var(--t1)' : 'var(--s2)',
                color: showMatchNews === 'opp' ? 'var(--bg)' : 'var(--t2)',
                fontSize: 12, fontWeight: 700, transition: 'background 0.15s',
              }}>{opponentLabel}</button>
            </div>
          )}
          <div className="card">
            {(showMatchNews === 'opp' ? (oppNews || []) : news).map(function(article, i) {
              return (
                <div key={article.id} className="nrow">
                  <div className="nidx">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <span className="ntag">{article.tag}</span>
                    <div className="nhead">{article.title}</div>
                    <div className="nmeta">{article.publishedAt} · {article.source}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Match Edge (Pro feature) ── */}
      {matchEdge && (function() {
        var _t = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
        var _appName = (_t.aiContext && _t.aiContext.appName) || 'GunnerIQ';

        // Confidence ring colour
        var ringColor = matchEdge.confidence >= 75 ? 'var(--win)' : matchEdge.confidence >= 60 ? 'var(--draw)' : 'var(--t3)';

        var content = (
          <div>
            {/* Recommendation + confidence */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Recommended Play</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.3px' }}>{matchEdge.recommendation}</div>
              </div>
              <div style={{ textAlign: 'center', flexShrink: 0, marginLeft: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', border: '3px solid ' + ringColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--s2)' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: ringColor, lineHeight: 1 }}>{matchEdge.confidence}</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>conf%</div>
                </div>
              </div>
            </div>

            {/* Reasons */}
            <div style={{ marginBottom: 14 }}>
              {matchEdge.reasons.map(function(r, i) {
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--red-a)', border: '1px solid var(--red-b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--red)' }}>{i + 1}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.5 }}>{r}</div>
                  </div>
                );
              })}
            </div>

            {/* Risk factor */}
            <div style={{ background: 'rgba(255,170,0,0.08)', border: '1px solid rgba(255,170,0,0.2)', borderRadius: 10, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>⚠️</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--draw)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>Risk Factor</div>
                <div style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.5 }}>{matchEdge.riskFactor}</div>
              </div>
            </div>
          </div>
        );

        return (
          <div className="sec">
            <div className="sec-hd">
              <span className="lbl">◆ Match Edge</span>
              {!isPro && <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Pro</span>}
            </div>
            <div className="card" style={{ padding: 18, position: 'relative', overflow: 'hidden' }}>
              {/* Always render content — blurred for free users */}
              <div style={!isPro ? { filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' } : {}}>
                {content}
              </div>

              {/* Lock overlay for free users */}
              {!isPro && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.18)',
                  backdropFilter: 'blur(1px)',
                  WebkitBackdropFilter: 'blur(1px)',
                  borderRadius: 14,
                  gap: 12,
                }}>
                  <div style={{ fontSize: 28 }}>🔒</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>Match Edge is Pro</div>
                  <div style={{ fontSize: 12, color: 'var(--t3)', textAlign: 'center', maxWidth: 180, lineHeight: 1.45 }}>
                    AI-generated value plays, confidence scores & risk analysis
                  </div>
                  <button className="btn btn-red" style={{ padding: '10px 22px', fontSize: 13 }}
                    onClick={() => onOpenModal('paywall')}>
                    Unlock {_appName} Pro
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// SCREEN: AI CHAT
// ═══════════════════════════════════════════════════════════════
function AIScreen({ teamSlug }) {
  const [screenCtx,  setScreenCtx]  = useState(null);  // { aiCtx, prompts, welcome, ctxLine }
  const [ctxError,   setCtxError]   = useState(null);
  const [retryKey,   setRetryKey]   = useState(0);
  const [mode,       setMode]       = useState('standard');
  const [inputText,  setInputText]  = useState('');
  const [loading,    setLoading]    = useState(false);
  const [apiError,   setApiError]   = useState(null);
  const chatRef  = useRef(null);
  const inputRef = useRef(null);

  // Seed one example exchange so the chat doesn't look empty on first load.
  // Messages flagged seeded:true are shown visually but excluded from the API
  // history — the real AI gets a clean slate from the user's first message.
  const _seedTeamShort = ((typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {}).shortName || teamSlug;
  const _seedQ = 'Are ' + _seedTeamShort + ' title contenders this season?';
  const [messages, setMessages] = useState([
    { r: 'user', t: _seedQ, seeded: true },
    { r: 'ai',   t: AIService.getMockResponse(teamSlug, _seedQ), seeded: true },
  ]);

  // Load screen context (header, chips, welcome) via DataService
  useEffect(function() {
    var active = true;
    setScreenCtx(null); setCtxError(null);

    DataService.loadAIScreen(teamSlug)
      .then(function(result) { if (active) setScreenCtx(result); })
      .catch(function(err)   { if (active) setCtxError(err.message || 'Failed to load'); });

    return function() { active = false; };
  }, [teamSlug, retryKey]);

  // Auto-scroll — must be declared before any early returns (Rules of Hooks).
  // chatRef.current is null while skeleton shows, so this safely does nothing then.
  useEffect(function() {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading, apiError]);

  if (ctxError)  return <ScreenError message={ctxError} onRetry={function() { setRetryKey(function(k) { return k + 1; }); }} />;
  if (!screenCtx) return <ScreenSkeleton />;

  const { aiCtx, prompts, welcome, ctxLine } = screenCtx;

  async function send() {
    const text = inputText.trim();
    if (!text || loading) return;

    // Append the user message immediately — UI feels instant
    const nextMessages = [...messages, { r: 'user', t: text }];
    setMessages(nextMessages);
    setInputText('');
    setLoading(true);
    setApiError(null);

    try {
      // Build API history: exclude seeded demo messages, map to Anthropic format
      const history = nextMessages
        .filter(function(m) { return !m.seeded; })
        .map(function(m) {
          return { role: m.r === 'user' ? 'user' : 'assistant', content: m.t };
        });

      const reply = await AIService.sendMessage(teamSlug, history);
      setMessages(prev => [...prev, { r: 'ai', t: reply }]);

    } catch (err) {
      const msg = err.message || '';
      const isNetworkErr = msg === 'Failed to fetch' || msg.includes('NetworkError') || msg.includes('fetch');
      const isKeyMissing = msg.includes('ANTHROPIC_API_KEY') || msg.includes('503');
      const userFacing = isKeyMissing
        ? 'AI Chat is not configured — the server is missing its API key. Add ANTHROPIC_API_KEY to your environment variables.'
        : isNetworkErr
          ? "Can't reach the server. If running locally, make sure `node server.js` is running."
          : 'Error: ' + msg;
      setApiError(userFacing);
      setMessages(prev => [...prev, {
        r: 'ai',
        t: isKeyMissing
          ? "The AI assistant isn't configured yet. The server needs an Anthropic API key to respond."
          : "Sorry, I couldn't connect right now. Please try again.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  // Bubble spacing: AI responses get a little more bottom margin to
  // visually separate turns without changing the bubble design itself.
  function bubbleStyle(m, i, all) {
    const isLastInTurn = i === all.length - 1 || all[i + 1].r !== m.r;
    return isLastInTurn ? { marginBottom: m.r === 'ai' ? 14 : 6 } : { marginBottom: 4 };
  }

  return (
    <div className="screen-enter" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ── Header ── */}
      <div className="ai-hdr">
        <div className="ai-brand">
          <div className="ai-dot" />
          <div className="ai-title">{aiCtx ? aiCtx.appName : 'AI Assistant'}</div>
        </div>
        <div className="ai-desc">{aiCtx ? aiCtx.appTagline : ''}</div>
        {ctxLine && (
          <div className="ai-ctx">
            <div className="ctx-dot" />
            <span>{ctxLine}</span>
          </div>
        )}
      </div>

      {/* ── Standard / Pro toggle ── */}
      <div className="mtoggle">
        <button className={`mbtn${mode === 'standard' ? ' on' : ''}`} onClick={() => setMode('standard')}>
          Standard · Free
        </button>
        <button className={`mbtn${mode === 'pro' ? ' pro' : ''}`} onClick={() => setMode('pro')}>
          ◆ Pro Mode
        </button>
      </div>

      {mode === 'pro' && (
        <div style={{ margin: '10px 16px 0', padding: '11px 14px', background: 'var(--red-a)', borderRadius: 12, fontSize: 13, color: 'var(--red)', fontWeight: 600, border: '1px solid var(--red-b)' }}>
          Pro mode — deeper analysis, betting context & priority responses
        </div>
      )}

      {/* ── Error banner (dismissible) ── */}
      {apiError && (
        <div style={{
          margin: '8px 16px 0', padding: '10px 14px',
          background: 'rgba(239,1,7,0.08)', border: '1px solid rgba(239,1,7,0.25)',
          borderRadius: 10, fontSize: 12, color: 'var(--red)', lineHeight: 1.5,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
        }}>
          <span>{apiError}</span>
          <span style={{ cursor: 'pointer', fontWeight: 700, flexShrink: 0 }} onClick={() => setApiError(null)}>✕</span>
        </div>
      )}

      {/* ── Suggested prompt chips ── */}
      <div className="chips">
        {prompts.map(p => (
          <div key={p} className="chip" onClick={() => { setInputText(p); inputRef.current && inputRef.current.focus(); }}>{p}</div>
        ))}
      </div>

      {/* ── Chat history ── */}
      <div className="chatarea" style={{ flex: 1, minHeight: 0 }} ref={chatRef}>
        <div className="bub ai" style={{ marginBottom: 14 }}>{welcome}</div>

        {messages.map((m, i, all) => (
          <div key={i} className={`bub ${m.r}`} style={bubbleStyle(m, i, all)}>
            {m.t}
          </div>
        ))}

        {/* Typing indicator — three animated dots */}
        {loading && (
          <div className="loading-dots" style={{ marginTop: 4, marginBottom: 14 }}>
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>
        )}
      </div>

      {/* ── Input bar ── */}
      <div className="cinput">
        <input
          ref={inputRef}
          className="chat-input-real"
          placeholder="Ask anything about football…"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKey}
        />
        <div className={`sbtn${(!inputText.trim() || loading) ? ' disabled' : ''}`} onClick={send}>↑</div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// SCREEN: FAN ZONE
// ═══════════════════════════════════════════════════════════════
function FanScreen({ teamSlug, onOpenModal }) {
  const [data,     setData]    = useState(null);
  const [error,    setError]   = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  // Streak lives in localStorage — stays synchronous, no loading needed
  const [streak, setStreak] = useState(function() { return PollService.getStreak(); });

  useEffect(function() {
    var active = true;
    setData(null); setError(null);

    DataService.loadFanScreen(teamSlug)
      .then(function(result) { if (active) setData(result); })
      .catch(function(err)   { if (active) setError(err.message || 'Failed to load'); });

    return function() { active = false; };
  }, [teamSlug, retryKey]);

  if (error)  return <ScreenError message={error} onRetry={function() { setRetryKey(function(k) { return k + 1; }); }} />;
  if (!data) return <ScreenSkeleton />;

  const { lineupPoll } = data;
  const playedToday  = PollService.playedToday();
  const fanTeamData  = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const fanShortName = fanTeamData.shortName || teamSlug;
  const fanManager   = fanTeamData.manager   || 'The manager';

  function handleStreakUpdate() {
    setStreak(PollService.getStreak());
  }

  return (
    <div className="screen-enter">
      <div style={{ padding: '20px 18px 0' }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.7px' }}>Fan Zone</div>
        <div style={{ fontSize: 13, color: 'var(--t3)', marginTop: 4 }}>Games, tools & content</div>
      </div>

      {/* Quiz hero */}
      <div className="fhero">
        <div className="fhero-glow" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="streak-pill">
            🔥 {streak.count > 0 ? `${streak.count}-day streak` : 'Start your streak!'}{streak.count > 0 ? ' — keep it going!' : ''}
          </div>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🧠</div>
          {!playedToday
            ? <div className="trending-badge">New Today</div>
            : <div className="trending-badge" style={{ background: 'rgba(34,197,94,0.15)', borderColor: 'var(--win)', color: 'var(--win)' }}>Completed ✓</div>
          }
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--t1)', marginBottom: 6 }}>Daily {fanShortName} Quiz</div>
          <div style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 18 }}>3 questions · Daily streak</div>
          <button
            className={`btn ${playedToday ? 'btn-ghost' : 'btn-red'}`}
            style={{ maxWidth: 220, margin: '0 auto', fontSize: 15 }}
            onClick={() => onOpenModal('quiz', { questions: data.quiz, onStreakUpdate: handleStreakUpdate })}
          >
            {playedToday ? 'Play Again' : "Play Today's Quiz →"}
          </button>
        </div>
      </div>

      {/* Tools grid */}
      <div className="sec">
        <div className="sec-hd">
          <span className="lbl">Tools & Content</span>
        </div>
        <div className="fgrid">
          {[
            { icon: '🧠', lbl: 'Quizzes',          sub: '3–15 question modes',       modal: 'quiz-launcher'      },
            { icon: '⇄',  lbl: 'Player Compare',   sub: 'Head-to-head stats',        modal: 'player-compare'     },
            { icon: '🔄', lbl: 'Transfer Tracker',  sub: 'Ins, outs & rumours',       modal: 'transfer-tracker'   },
            { icon: '🏆', lbl: 'Trophy Room',       sub: 'Club history',              modal: 'trophy-room'        },
            { icon: '📅', lbl: 'Season Stats',      sub: 'All competitions',          modal: 'season-stats'       },
            { icon: '📐', lbl: 'Tactical Board',    sub: 'How ' + fanShortName + ' play', modal: 'tactical-breakdown' },
          ].map(({ icon, lbl, sub, modal }) => (
            <div key={lbl} className="fcrd" onClick={() => onOpenModal(modal)}>
              <div className="ficn">{icon}</div>
              <div className="flbl">{lbl}</div>
              <div className="fsub">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fan poll from data layer */}
      {lineupPoll.options.length > 0 && (
        <div className="sec">
          <div className="lbl" style={{ marginBottom: 12 }}>
            Fan Poll · {lineupPoll.question}
          </div>
          <div className="card">
            {lineupPoll.options.map(({ label, pct }, i) => (
              <div key={i} className="pollrow">
                <div className="polltop">
                  <span>{label}</span>
                  <span className="pollpct">{pct}%</span>
                </div>
                <div className="polltrack"><div className="pollfill" style={{ width: pct + '%' }} /></div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: 'var(--t3)', textAlign: 'center', padding: '14px 0 6px' }}>
              {lineupPoll.totalVotes.toLocaleString()} votes · closes {lineupPoll.closesAt}
            </div>
          </div>
        </div>
      )}

      {/* Tactical read */}
      <div className="sec">
        <div className="lbl" style={{ marginBottom: 12 }}>Tactical Breakdown</div>
        <div className="card" style={{ padding: 18 }}>
          {(() => {
            const td = TACTICAL_MOCK[teamSlug] || TACTICAL_MOCK['arsenal'];
            return (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--t1)', flex: 1 }}>
                    {fanManager} · {td.formation}
                  </div>
                  <div style={{ background: 'var(--red-a)', border: '1px solid var(--red-b)', borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 700, color: 'var(--red)' }}>
                    Preview
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.6, marginBottom: 14 }}>
                  {td.style}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
                  {td.preview.slice(0, 2).map((item, i) => (
                    <div key={i} style={{ background: 'var(--s2)', borderRadius: 10, padding: '10px 12px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t1)' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 14 }} onClick={() => onOpenModal('tactical-breakdown')}>
                  Read Full Analysis →
                </button>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}


// ── Waitlist Modal ────────────────────────────────────────────
function WaitlistModal({ onClose }) {
  const [email,  setEmail]  = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success'

  function submit() {
    // Simulate submission — swap for real API call later
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="paywall-success">
            <div className="paywall-success-icon">✅</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.4px', marginBottom: 10 }}>You're on the list!</div>
            <div style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.6, marginBottom: 24 }}>
              We'll email you the moment Pro launches. First on the list means first access.
            </div>
            <button className="btn btn-red" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div style={{ padding: '20px 20px 32px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>◆ Pro Waitlist</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.4px', marginBottom: 8 }}>Get early access</div>
          <div style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.55, marginBottom: 24 }}>
            Be first to unlock Match Edge, Pro AI and every premium feature when we launch.
          </div>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onInput={e => setEmail(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'var(--s2)', border: '1px solid var(--b1)',
              borderRadius: 12, padding: '14px 16px',
              fontSize: 15, color: 'var(--t1)',
              outline: 'none', marginBottom: 14,
            }}
          />
          <button
            className="btn btn-red"
            style={{ fontSize: 15, padding: 14 }}
            onClick={submit}
          >
            Join Waitlist
          </button>
          <button className="btn btn-ghost" style={{ marginTop: 10, fontSize: 14 }} onClick={onClose}>Maybe later</button>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// SCREEN: PREMIUM
// ═══════════════════════════════════════════════════════════════
function PremiumScreen({ teamSlug, onOpenModal }) {
  const [data,     setData]    = useState(null);
  const [error,    setError]   = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(function() {
    var active = true;
    setData(null); setError(null);

    DataService.loadPremiumScreen()
      .then(function(result) { if (active) setData(result); })
      .catch(function(err)   { if (active) setError(err.message || 'Failed to load'); });

    return function() { active = false; };
  }, [retryKey]);

  if (error)  return <ScreenError message={error} onRetry={function() { setRetryKey(function(k) { return k + 1; }); }} />;
  if (!data) return <ScreenSkeleton />;

  const features    = data.features;
  const plan        = data.plans.find(function(p) { return p.isFeatured; }) || {};
  const reviews     = data.reviews;
  const premTeam    = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const premAppName = (premTeam.aiContext && premTeam.aiContext.appName) || 'GunnerIQ';
  const premShort   = premTeam.shortName || teamSlug;

  return (
    <div className="screen-enter">
      <div className="phero">
        <div className="phero-glow" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="p-icon">◆</div>
          <div className="p-title">{premAppName} Pro</div>
          <div className="p-sub">The full {premShort} intelligence suite</div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 24 }}>
        <div className="lbl" style={{ marginBottom: 12 }}>Everything included</div>
        <div className="card">
          {features.map(f => (
            /* Each locked row opens a specific notice when tapped */
            <div key={f.id} className="lockrow" onClick={() => onOpenModal('locked', { feature: f })}>
              <div className="lockicon">{f.icon}</div>
              <div className="locktext">{f.label}</div>
              <div className="lockgl">🔒</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient-border pricing card */}
      <div className="pwrap">
        <div className="pcard">
          <div className="pbadge">{plan.badge}</div>
          <div className="pamt">{plan.price}</div>
          <div className="pper">{plan.period} · {plan.subtext}</div>
          <div className="pdiv" />
          <div className="palt">{plan.annualNote}</div>
          <button className="btn btn-red" style={{ fontSize: 17, padding: 16 }} onClick={() => onOpenModal('paywall')}>
            Upgrade to {premAppName} Pro
          </button>
          <div className="ptrial">{plan.trialText}</div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 6 }}>
        <div className="lbl" style={{ marginBottom: 12 }}>What fans say</div>
        {reviews.map(r => (
          <div key={r.id} className="rcrd">
            <div className="rtxt">{r.quote}</div>
            <div className="rby">{r.handle}</div>
            <div className="rstars">{'★'.repeat(r.rating)}</div>
          </div>
        ))}
      </div>

      {/* Waitlist CTA */}
      <div className="sec" style={{ paddingBottom: 32 }}>
        <div className="card" style={{ padding: 18, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 14, lineHeight: 1.5 }}>
            Not ready to upgrade? Get notified the moment Pro launches.
          </div>
          <button className="btn btn-outline" onClick={() => onOpenModal('waitlist')}>
            Join Pro Waitlist
          </button>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// ONBOARDING: first-time team picker (full-screen, skipped if team already saved)
// ═══════════════════════════════════════════════════════════════
function OnboardingScreen({ onSelect }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'var(--bg)', zIndex: 200,
      display: 'flex', flexDirection: 'column', overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>
      {/* Header */}
      <div style={{ padding: '52px 24px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 18 }}>Welcome</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--t1)', letterSpacing: '-0.8px', lineHeight: 1.2, marginBottom: 12 }}>Pick Your Club</div>
        <div style={{ fontSize: 14, color: 'var(--t3)', lineHeight: 1.55 }}>Choose the team you support to personalise your experience</div>
      </div>

      {/* Team list */}
      <div style={{ padding: '8px 20px 52px', flex: 1 }}>
        {TEAM_LIST.map(function(t) {
          var teamData = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[t.slug]) || {};
          var c        = teamData.colors || {};
          var primary  = c.primary || '#EF0107';
          return (
            <div
              key={t.slug}
              onClick={function() { onSelect(t.slug); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 16, marginBottom: 10,
                background: 'var(--s1)', border: '1px solid var(--b1)',
                cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
                transition: 'opacity 0.12s',
              }}
            >
              {/* Badge */}
              <div style={{
                width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                background: c.badgeBg || 'var(--s3)',
                border: '1.5px solid ' + (c.badgeBorder || 'var(--b2)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 900, color: primary, letterSpacing: '-0.3px',
              }}>
                {t.code}
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2 }}>
                  {t.league}{teamData.manager ? ' · ' + teamData.manager : ''}
                </div>
              </div>
              {/* Arrow */}
              <div style={{ fontSize: 18, color: 'var(--t3)', flexShrink: 0 }}>›</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════
const SCREENS = { home: HomeScreen, match: MatchScreen, ai: AIScreen, fan: FanScreen, prem: PremiumScreen };

function App() {
  // teamSlug lives in state — persisted to localStorage, defaults to 'arsenal'
  const [teamSlug, setTeamSlug] = useState(function() {
    try { return localStorage.getItem('gunneriq_team') || 'arsenal'; } catch(e) { return 'arsenal'; }
  });

  // Show onboarding on first launch (no team saved yet)
  const [showOnboarding, setShowOnboarding] = useState(function() {
    try { return !localStorage.getItem('gunneriq_team'); } catch(e) { return false; }
  });

  const [tab,         setTab]         = useState('home');
  const [modal,       setModal]       = useState(null);    // null | { type, data }
  const [showPicker,  setShowPicker]  = useState(false);
  const [isPro,       setIsPro]       = useState(function() { return PremiumService.isPro(); });
  const screenRef = useRef(null);

  // Sync CSS vars + APP_CONFIG whenever team changes
  useEffect(function() {
    APP_CONFIG.activeTeamSlug = teamSlug;
    applyTeamColors(teamSlug);
  }, [teamSlug]);

  function selectTeam(slug) {
    try { localStorage.setItem('gunneriq_team', slug); } catch(e) {}
    setTeamSlug(slug);
    setShowPicker(false);
    setTab('home');
    setModal(null);
    if (screenRef.current) screenRef.current.scrollTop = 0;
  }

  function completeOnboarding(slug) {
    try { localStorage.setItem('gunneriq_team', slug); } catch(e) {}
    APP_CONFIG.activeTeamSlug = slug;
    applyTeamColors(slug);
    setTeamSlug(slug);
    setShowOnboarding(false);
  }

  function switchTab(id) {
    if (id === tab) return;
    if (screenRef.current) screenRef.current.scrollTop = 0;
    setTab(id);
    setModal(null);
  }

  function openModal(type, data = null) { setModal({ type, data }); }
  function closeModal()                 { setModal(null); }

  const Screen      = SCREENS[tab];
  const screenProps = { teamSlug, onNavigate: switchTab, onOpenModal: openModal, isPro };
  const teamData    = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const teamCode    = teamData.code      || teamSlug.slice(0,3).toUpperCase();
  const teamShort   = teamData.shortName || teamSlug;

  return (
    <div className="phone">
      {/* ── First-time onboarding (hides entire app until team is chosen) ── */}
      {showOnboarding && <OnboardingScreen onSelect={completeOnboarding} />}

      {/* ── Status bar ── */}
      <div className="status">
        <span>9:41</span>

        {/* Team switcher button — centre of status bar */}
        <button
          onClick={function() { setShowPicker(true); }}
          style={{
            background:    'var(--s2)',
            border:        '1px solid var(--b2)',
            borderRadius:  8,
            padding:       '3px 10px',
            display:       'flex',
            alignItems:    'center',
            gap:           6,
            cursor:        'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 900, color: 'var(--red)', letterSpacing: '-0.2px' }}>{teamCode}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--t2)' }}>{teamShort}</span>
          <span style={{ fontSize: 9, color: 'var(--t3)' }}>▾</span>
        </button>

        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            fontSize:      9,
            fontWeight:    800,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            padding:       '2px 6px',
            borderRadius:  4,
            background:    ApiConfig.USE_REAL_API ? 'rgba(34,197,94,0.15)' : 'rgba(255,180,0,0.12)',
            color:         ApiConfig.USE_REAL_API ? 'var(--win)'           : '#c8960a',
            border:        ApiConfig.USE_REAL_API ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,180,0,0.25)',
          }}>
            {ApiConfig.USE_REAL_API ? 'LIVE' : 'MOCK'}
          </span>
          100%
        </span>
      </div>

      <div className="screen" ref={screenRef}>
        {/* key includes teamSlug so switching team fully remounts the screen */}
        <Screen key={tab + '_' + teamSlug} {...screenProps} />
      </div>

      <nav className="bnav">
        {NAV.map(n => (
          <button key={n.id} className={`ni${tab === n.id ? ' on' : ''}`} onClick={() => switchTab(n.id)}>
            <div className="ni-icon">{n.icon}</div>
            {n.lbl}
          </button>
        ))}
      </nav>

      {/* Team picker sheet */}
      {showPicker && (
        <TeamPicker
          current={teamSlug}
          onSelect={selectTeam}
          onClose={function() { setShowPicker(false); }}
        />
      )}

      {/* Modal overlay */}
      {modal && !showPicker && (
        <Modal
          modal={modal}
          teamSlug={teamSlug}
          onClose={closeModal}
          onOpenModal={openModal}
          onProActivated={() => setIsPro(true)}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
