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


// ── Paywall Modal ─────────────────────────────────────────────
function PaywallModal({ teamSlug, onClose }) {
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


// ── Modal dispatcher ──────────────────────────────────────────
function Modal({ modal, teamSlug, onClose, onOpenModal }) {
  const { type, data } = modal;
  if (type === 'vote')    return <VoteModal teamSlug={teamSlug} onClose={onClose} />;
  if (type === 'quiz')    return <QuizModal onClose={onClose} data={data} />;
  if (type === 'paywall') return <PaywallModal teamSlug={teamSlug} onClose={onClose} />;
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
  const [sel,      setSel]      = useState(null);
  const [data,     setData]     = useState(null);
  const [error,    setError]    = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(function() {
    var active = true;
    setData(null); setError(null); setSel(null);

    DataService.loadHomeScreen(teamSlug)
      .then(function(result) { if (active) setData(result); })
      .catch(function(err)   { if (active) setError(err.message || 'Failed to load'); });

    return function() { active = false; };
  }, [teamSlug, retryKey]);

  if (error)  return <ScreenError message={error} onRetry={function() { setRetryKey(function(k) { return k + 1; }); }} />;
  if (!data) return <ScreenSkeleton />;

  const screenData = data;

  const { fixture, news, playerMap, lineup } = screenData;
  const selPlayer = sel !== null ? playerMap[sel] : null;

  if (!fixture) {
    return (
      <div className="screen-enter" style={{ padding: 20, color: 'var(--t3)', fontSize: 14 }}>
        No upcoming fixture data available.
      </div>
    );
  }

  const { winProb, formTeam, formOpponent } = fixture;
  const hasWinProb = winProb && winProb.home != null;

  // Dynamic date + time-of-day greeting
  const now         = new Date();
  const DAY   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dateStr = DAY[now.getDay()] + ' ' + now.getDate() + ' ' + MONTH[now.getMonth()];
  const hour    = now.getHours();
  const greeting = hour < 12 ? 'Good morning ⚡' : hour < 17 ? 'Good afternoon ⚡' : 'Good evening ⚡';

  return (
    <div className="screen-enter">

      {/* ── Greeting ── */}
      <div className="greeting">
        <div>
          <div className="greet-sub">{dateStr}</div>
          <div className="greet-name">{greeting}</div>
        </div>
        <div className="avatar">👤</div>
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
            <div className="hbadge home">{fixture.homeCode}</div>
            <div className="hteam-name">{fixture.homeLabel}</div>
          </div>
          <div className="hvc">
            <div className="hvc-vs">vs</div>
            <div className="hvc-time">{fixture.time}</div>
            <div className="hvc-venue">{fixture.venue}</div>
          </div>
          <div className="hteam">
            <div className="hbadge away">{fixture.awayCode}</div>
            <div className="hteam-name">{fixture.awayLabel}</div>
          </div>
        </div>

        {/* Recent form */}
        <div className="hero-forms">
          <FormRow label={fixture.homeLabel} results={formTeam}     />
          <FormRow label={fixture.awayLabel} results={formOpponent} />
        </div>

        {/* Win probability bar — only shown when data is available */}
        {hasWinProb && (
          <div className="prob-section">
            <div className="prob-label-row">
              <span style={{ color: 'var(--red)' }}>{fixture.homeLabel} {winProb.home}%</span>
              <span style={{ color: 'var(--t3)' }}>Draw {winProb.draw}%</span>
              <span style={{ color: 'var(--t2)' }}>{fixture.awayLabel} {winProb.away}%</span>
            </div>
            <div className="prob-track">
              <div className="prob-fill-home" style={{ width: winProb.home + '%' }} />
              <div className="prob-fill-draw" style={{ width: winProb.draw + '%' }} />
              <div className="prob-fill-away" />
            </div>
            <div className="prob-footer">
              <span>Win probability</span>
              <span>{winProb.fanPredictPct}% of fans predict {fixture.homeLabel} win</span>
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

        {/* Tactical narrative — 2-sentence matchup storyline */}
        {fixture.narrative && (
          <div className="narrative">{fixture.narrative}</div>
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
      {lineup && lineup.rows && lineup.rows.length > 0 && <div className="sec" style={{ paddingTop: 26 }}>
        <div className="sec-hd">
          <span className="lbl">Predicted Lineup · {lineup.formation}</span>
          <span className="sec-more" onClick={() => onOpenModal('vote')}>Vote →</span>
        </div>
        <div className="card">
          <div className="pitch-wrap">
            <div className="pitch">
              <div className="pitch-stripe" />
              {lineup.rows.map(function(row, ri) {
                return (
                  <div key={ri} className="pitch-row">
                    {row.playerIds.map(function(id) {
                      const p = playerMap[id];
                      if (!p) return null;
                      return (
                        <div key={id} className="ptok" onClick={() => setSel(sel === id ? null : id)}>
                          <div className={`pcirc${row.isGoalkeeper ? ' gk' : ''}${sel === id ? ' sel' : ''}`}>
                            {p.pitchInitials}
                          </div>
                          <div className="plabel">{p.pitchInitials}</div>
                          <div className="pvote">{p.fanVotePct}%</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {!selPlayer && <div className="tap-hint">Tap a player to see stats</div>}
            {selPlayer && (
              <div className="spanel">
                <div className="spanel-name">{selPlayer.name}</div>
                <div className="spanel-grid">
                  <div>
                    <div className="sp-num">{selPlayer.stats.goals}</div>
                    <div className="sp-lbl">Goals</div>
                  </div>
                  <div>
                    <div className="sp-num">{selPlayer.stats.assists}</div>
                    <div className="sp-lbl">Assists</div>
                  </div>
                  <div>
                    <div className="sp-num">
                      {selPlayer.stats.cleanSheets > 0 ? selPlayer.stats.cleanSheets : selPlayer.fanVotePct + '%'}
                    </div>
                    <div className="sp-lbl">
                      {selPlayer.stats.cleanSheets > 0 ? 'Clean Sh.' : 'Fan vote'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>}

      {/* ── Latest news ── */}
      <div className="sec">
        <div className="sec-hd">
          <span className="lbl">Latest</span>
          <span className="sec-more">All news →</span>
        </div>
        <div className="card">
          {news.length === 0 && (
            <div style={{ padding: '16px 18px', color: 'var(--t3)', fontSize: 13 }}>No news available.</div>
          )}
          {news.map(function(article, i) {
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
function MatchScreen({ teamSlug }) {
  const [atab,     setAtab]    = useState('stats');
  const [pollVote, setPollVote] = useState(() => PollService.getUserScoreVote(teamSlug));
  const [data,     setData]    = useState(null);
  const [error,    setError]   = useState(null);
  const [retryKey, setRetryKey] = useState(0);

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

  const { fixture, stats, h2h, injuryList, oppLineup, keyBattles,
          scorePoll, playerMap, lineup, formTeam, formOpponent, recentResults } = data;

  // Derive active-team / opponent labels regardless of home/away status
  const activeTeamLabel = fixture ? (fixture.isHome ? fixture.homeLabel : fixture.awayLabel) : '';
  const opponentLabel   = fixture ? (fixture.isHome ? fixture.awayLabel : fixture.homeLabel) : '';

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

      {/* ── Header ── */}
      <div className="mhero">
        <div className="mhero-top">
          <div className="mpage-title">Match Hub</div>
          <span className="comp-pill">{fixture.competitionShort || fixture.competition}{fixture.gameweek ? ' · GW' + fixture.gameweek : ''}</span>
        </div>
        <div className="mteams">
          <div className="mt">
            <div className="mbadge h">{fixture.homeCode}</div>
            <div className="mt-name">{fixture.homeLabel}</div>
          </div>
          <div className="mvc">
            <div className="mvc-vs">vs</div>
            <div className="mvc-time">{fixture.time}</div>
            <div className="mvc-sub">{fixture.date} · {fixture.venue}</div>
          </div>
          <div className="mt">
            <div className="mbadge a">{fixture.awayCode}</div>
            <div className="mt-name">{fixture.awayLabel}</div>
          </div>
        </div>
      </div>

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

          {/* Season averages comparison bars */}
          <div className="card" style={{ padding: '20px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--red)' }}>{activeTeamLabel}</span>
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
                  <div><div className="h2h-n">{h2h.teamWins}</div><div className="h2h-l">{activeTeamLabel} W</div></div>
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

          {/* Injury & availability */}
          {injuryList.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <div className="lbl" style={{ marginBottom: 12 }}>Injury & News</div>
              <div className="card">
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
              { name: activeTeamLabel, form: formTeam     },
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
      {atab === 'lineups' && (
        <div className="sec" style={{ paddingTop: 20 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

              {/* Home team (from player service) */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, textAlign: 'center', marginBottom: 4, color: 'var(--red)' }}>
                  {activeTeamLabel}
                </div>
                <div style={{ fontSize: 10, textAlign: 'center', color: 'var(--t3)', marginBottom: 10 }}>
                  {lineup.formation}
                </div>
                {lineup.rows.flatMap(function(r) { return r.playerIds; }).map(function(id, i) {
                  const p = playerMap[id];
                  return (
                    <div key={id} style={{
                      background: i === 0 ? 'var(--red-a)' : 'var(--s2)',
                      border: '1px solid ' + (i === 0 ? 'var(--red-b)' : 'var(--b1)'),
                      borderRadius: 9, padding: '8px', fontSize: 12, fontWeight: 700,
                      color: i === 0 ? 'var(--red)' : 'var(--t1)', marginBottom: 4, textAlign: 'center',
                    }}>
                      {p ? p.pitchInitials : '?'}
                    </div>
                  );
                })}
              </div>

              {/* Away team (from matchStats service) */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, textAlign: 'center', marginBottom: 4, color: 'var(--t2)' }}>
                  {oppLineup.teamLabel}
                </div>
                <div style={{ fontSize: 10, textAlign: 'center', color: 'var(--t3)', marginBottom: 10 }}>
                  {oppLineup.formation}
                </div>
                {oppLineup.playerInitials.map(function(init, i) {
                  return (
                    <div key={i} style={{
                      background: i === 0 ? 'rgba(255,255,255,0.06)' : 'var(--s2)',
                      border: '1px solid var(--b1)',
                      borderRadius: 9, padding: '8px', fontSize: 12, fontWeight: 700,
                      color: 'var(--t1)', marginBottom: 4, textAlign: 'center',
                    }}>
                      {init}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* ── Pro CTA ── */}
      {(function() {
        var _t = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
        var _appName = (_t.aiContext && _t.aiContext.appName) || 'GunnerIQ';
        return (
          <div className="sec">
            <div className="card" style={{ padding: 18, background: 'var(--s1)', border: '1px solid var(--red-b)' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>◆ Pro Insights</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', marginBottom: 6 }}>Advanced predictions & betting angles</div>
              <div style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 16, lineHeight: 1.55 }}>xG deep dives, value bets, model-driven match previews</div>
              <button className="btn btn-outline">Unlock {_appName} Pro</button>
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
          <span className="sec-more">See all →</span>
        </div>
        <div className="fgrid">
          {[
            { icon: '📐', lbl: 'Tactical Board',   sub: 'How ' + fanShortName + ' play' },
            { icon: '⇄',  lbl: 'Player Compare',   sub: 'Head-to-head stats'   },
            { icon: '🔄', lbl: 'Transfer Tracker',  sub: 'Ins, outs & rumours'  },
            { icon: '🖼', lbl: 'Wallpapers',        sub: 'Free downloads'       },
            { icon: '📅', lbl: 'Season Stats',      sub: 'All competitions'     },
            { icon: '🏆', lbl: 'Trophy Room',       sub: 'Club history'         },
          ].map(({ icon, lbl, sub }) => (
            <div key={lbl} className="fcrd">
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
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', marginBottom: 8, lineHeight: 1.4 }}>
            How {fanManager} builds {fanShortName}'s pressing system
          </div>
          <div style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.6 }}>
            Trigger points, defensive shape and set-piece structure — explained visually.
          </div>
          <button className="btn btn-ghost" style={{ marginTop: 14, fontSize: 14 }}>Read Analysis →</button>
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

  const [tab,         setTab]         = useState('home');
  const [modal,       setModal]       = useState(null);    // null | { type, data }
  const [showPicker,  setShowPicker]  = useState(false);
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

  function switchTab(id) {
    if (id === tab) return;
    if (screenRef.current) screenRef.current.scrollTop = 0;
    setTab(id);
    setModal(null);
  }

  function openModal(type, data = null) { setModal({ type, data }); }
  function closeModal()                 { setModal(null); }

  const Screen      = SCREENS[tab];
  const screenProps = { teamSlug, onNavigate: switchTab, onOpenModal: openModal };
  const teamData    = (typeof TEAMS_DATA !== 'undefined' && TEAMS_DATA[teamSlug]) || {};
  const teamCode    = teamData.code      || teamSlug.slice(0,3).toUpperCase();
  const teamShort   = teamData.shortName || teamSlug;

  return (
    <div className="phone">
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
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
