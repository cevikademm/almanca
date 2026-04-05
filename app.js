// ========================================
// ALMANCA ÖĞRENME SİSTEMİ - APP.JS
// Spaced Repetition + Günlük Görev Sistemi
// ========================================

// ===== STORAGE =====
const STORAGE_KEY = 'almanca_v1';

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData();
  } catch { return defaultData(); }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function defaultData() {
  return {
    wordStatus: {},      // { id: 'new' | 'learning' | 'known' }
    wordDue: {},         // { id: timestamp } — ne zaman tekrar gösterilmeli
    wordCorrect: {},     // { id: count }
    wordWrong: {},       // { id: count }
    dailyLog: {},        // { 'YYYY-MM-DD': { studied: N, correct: N, wordIds: [] } }
    streak: 0,
    lastStudyDate: null,
    totalStudied: 0,
    placementDone: false,
    settings: { dailyGoal: 20 }
  };
}

// ===== DATE HELPERS =====
function today() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak(data) {
  const t = today();
  if (data.lastStudyDate === t) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  if (data.lastStudyDate === yStr) {
    data.streak = (data.streak || 0) + 1;
  } else if (data.lastStudyDate !== t) {
    data.streak = 1;
  }
  data.lastStudyDate = t;
}

// ===== SPACED REPETITION =====
// Simple SM-2 inspired:
//  known → 4 days, then 10, then 30
//  partial → 1 day
//  unknown → same session (or 0 delay)
function getNextInterval(wordId, rating, data) {
  const correct = data.wordCorrect[wordId] || 0;
  if (rating === 'known') {
    const intervals = [4, 10, 30, 90];
    return intervals[Math.min(correct, intervals.length - 1)];
  }
  if (rating === 'partial') return 1;
  return 0; // unknown → show again today
}

function isDue(wordId, data) {
  const due = data.wordDue[wordId];
  if (!due) return true;
  return Date.now() >= due;
}

// ===== DAILY SESSION =====
function getDailyWords(data, count = 20) {
  const t = today();
  const log = data.dailyLog[t] || { studied: 0, correct: 0, wordIds: [] };

  // Already studied words today
  const studiedToday = new Set(log.wordIds || []);

  // Due words (review)
  const dueWords = WORDS.filter(w =>
    !studiedToday.has(w.id) &&
    data.wordStatus[w.id] === 'learning' &&
    isDue(w.id, data)
  );

  // New words
  const newWords = WORDS.filter(w =>
    !studiedToday.has(w.id) &&
    (!data.wordStatus[w.id] || data.wordStatus[w.id] === 'new')
  );

  const result = [];
  // Take up to 10 review words
  for (let i = 0; i < Math.min(10, dueWords.length) && result.length < count; i++) {
    result.push(dueWords[i]);
  }
  // Fill rest with new words
  for (let i = 0; i < newWords.length && result.length < count; i++) {
    result.push(newWords[i]);
  }

  // If still less than count, add more due words
  if (result.length < count) {
    const existing = new Set(result.map(w => w.id));
    const more = WORDS.filter(w => !existing.has(w.id) && !studiedToday.has(w.id)).slice(0, count - result.length);
    result.push(...more);
  }

  return result;
}

function rateWord(wordId, rating, data) {
  data.wordStatus[wordId] = rating === 'known' ? 'known' : 'learning';
  if (rating === 'known') {
    data.wordCorrect[wordId] = (data.wordCorrect[wordId] || 0) + 1;
  } else if (rating === 'unknown') {
    data.wordWrong[wordId] = (data.wordWrong[wordId] || 0) + 1;
    data.wordCorrect[wordId] = Math.max(0, (data.wordCorrect[wordId] || 0) - 1);
  }
  // Set next due date
  const days = getNextInterval(wordId, rating, data);
  const next = new Date();
  next.setDate(next.getDate() + days);
  data.wordDue[wordId] = days === 0 ? 0 : next.getTime();

  // Log today
  const t = today();
  if (!data.dailyLog[t]) data.dailyLog[t] = { studied: 0, correct: 0, wordIds: [] };
  if (!data.dailyLog[t].wordIds.includes(wordId)) {
    data.dailyLog[t].wordIds.push(wordId);
    data.dailyLog[t].studied++;
    data.totalStudied = (data.totalStudied || 0) + 1;
  }
  if (rating === 'known') data.dailyLog[t].correct++;

  updateStreak(data);
  saveData(data);
}

// ===== STATS =====
function getStats(data) {
  const statusCounts = { new: 0, learning: 0, known: 0 };
  WORDS.forEach(w => {
    const s = data.wordStatus[w.id] || 'new';
    statusCounts[s]++;
  });
  const t = today();
  const todayLog = data.dailyLog[t] || { studied: 0, correct: 0, wordIds: [] };
  return {
    ...statusCounts,
    total: WORDS.length,
    todayStudied: todayLog.studied,
    todayCorrect: todayLog.correct,
    streak: data.streak || 0,
    dailyGoal: data.settings?.dailyGoal || 20,
    goalProgress: Math.min(todayLog.studied, data.settings?.dailyGoal || 20),
    goalDone: todayLog.studied >= (data.settings?.dailyGoal || 20),
  };
}

// ===== APP STATE =====
let appData = loadData();
let currentScreen = 'dashboard';
let flashSession = [];
let flashIndex = 0;
let flashFlipped = false;
let flashSessionRatings = [];
let quizWords = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let currentCategory = null;
let currentGrammarTopic = null;

// ===== RENDER DASHBOARD =====
function renderDashboard() {
  const stats = getStats(appData);
  const pct = Math.min(100, Math.round((stats.known / WORDS.length) * 100));
  const dailyPct = Math.min(100, Math.round((stats.goalProgress / stats.dailyGoal) * 100));

  document.getElementById('stat-known').textContent = stats.known;
  document.getElementById('stat-learning').textContent = stats.learning;
  document.getElementById('stat-new').textContent = stats.new;
  document.getElementById('stat-streak').textContent = stats.streak;

  document.getElementById('goal-progress-bar').style.width = dailyPct + '%';
  document.getElementById('goal-progress-text').textContent = `${stats.goalProgress} / ${stats.dailyGoal} kelime`;

  document.getElementById('main-progress-bar').style.width = pct + '%';
  document.getElementById('main-progress-text').textContent = `${stats.known} / ${WORDS.length} kelime (${pct}%) — Hedef: 2 ayda 600`;

  // Streak emojisi
  const streakEl = document.getElementById('streak-display');
  if (stats.streak >= 7) streakEl.textContent = '🔥'.repeat(Math.min(stats.streak, 5));
  else if (stats.streak > 0) streakEl.textContent = '⚡ ' + stats.streak + ' günlük seri!';
  else streakEl.textContent = '🌱 Başlamak için tıkla!';

  // Daily task card
  if (stats.goalDone) {
    document.getElementById('daily-task-status').innerHTML = '✅ Bugünkü görev tamamlandı! Harika iş!';
    document.getElementById('btn-daily-study').textContent = '🔄 Tekrar Çalış';
  } else {
    const remaining = stats.dailyGoal - stats.goalProgress;
    document.getElementById('daily-task-status').innerHTML = `📚 Bugün ${remaining} kelime daha çalış!`;
    document.getElementById('btn-daily-study').textContent = '▶️ Günlük Çalışmaya Başla';
  }
}

// ===== FLASHCARD SESSION =====
function startFlashSession(words) {
  flashSession = [...words];
  flashIndex = 0;
  flashFlipped = false;
  flashSessionRatings = [];
  showScreen('flashcard');
  renderFlashCard();
}

function renderFlashCard() {
  if (flashIndex >= flashSession.length) {
    showSessionComplete();
    return;
  }

  const word = flashSession[flashIndex];
  const card = document.getElementById('flashcard');
  card.classList.remove('flipped');
  flashFlipped = false;

  // Front
  document.getElementById('card-word').textContent = word.de;
  document.getElementById('card-level').textContent = word.level;
  document.getElementById('card-emoji').textContent = getWordEmoji(word);
  const cat = CATEGORIES[word.category];
  document.getElementById('card-category').textContent = cat ? cat.icon + ' ' + cat.label : word.category;

  // Back
  document.getElementById('card-translation').textContent = word.tr;
  document.getElementById('card-example').textContent = word.example || '';

  // 5 example sentences
  const sentences = generateExampleSentences(word);
  const sentList = document.getElementById('sentences-list');
  sentList.innerHTML = sentences.map((s, i) => `
    <div class="card-sentence-item">
      <span class="card-sentence-num">${i + 1}</span>
      <span>${s}</span>
    </div>
  `).join('');

  // Session dots
  renderSessionDots();

  document.getElementById('rating-buttons').style.opacity = '0';
  document.getElementById('rating-buttons').style.pointerEvents = 'none';
  document.getElementById('card-flip-hint').style.display = 'block';
  document.getElementById('card-counter').textContent = `${flashIndex + 1} / ${flashSession.length}`;
}

function flipCard() {
  const card = document.getElementById('flashcard');
  flashFlipped = !flashFlipped;
  if (flashFlipped) {
    card.classList.add('flipped');
    document.getElementById('rating-buttons').style.opacity = '1';
    document.getElementById('rating-buttons').style.pointerEvents = 'auto';
    document.getElementById('card-flip-hint').style.display = 'none';
  } else {
    card.classList.remove('flipped');
    document.getElementById('rating-buttons').style.opacity = '0';
    document.getElementById('rating-buttons').style.pointerEvents = 'none';
    document.getElementById('card-flip-hint').style.display = 'block';
  }
}

function rateCard(rating) {
  const word = flashSession[flashIndex];
  flashSessionRatings.push(rating);
  rateWord(word.id, rating, appData);

  // If unknown, put back at end for another chance
  if (rating === 'unknown' && !flashSessionRatings.filter((r, i) => flashSession[i]?.id === word.id && r === 'unknown').length > 2) {
    const alreadyAgain = flashSession.slice(flashIndex + 1).some(w => w.id === word.id);
    if (!alreadyAgain) flashSession.push(word);
  }

  flashIndex++;
  renderFlashCard();
}

function renderSessionDots() {
  const container = document.getElementById('session-dots');
  container.innerHTML = '';
  for (let i = 0; i < Math.min(flashSession.length, 30); i++) {
    const dot = document.createElement('div');
    dot.className = 'session-dot';
    if (i < flashSessionRatings.length) {
      dot.classList.add(flashSessionRatings[i]);
    } else if (i === flashIndex) {
      dot.classList.add('current');
    }
    container.appendChild(dot);
  }
}

function showSessionComplete() {
  const known = flashSessionRatings.filter(r => r === 'known').length;
  const partial = flashSessionRatings.filter(r => r === 'partial').length;
  const unknown = flashSessionRatings.filter(r => r === 'unknown').length;
  const total = flashSession.length;

  // Check daily goal
  const stats = getStats(appData);
  if (stats.goalDone) {
    showConfetti();
    showModal('🎉', 'Günlük Hedef Tamamlandı!', `${stats.known} kelime öğrendin. Bugün harika çalıştın!`);
  } else {
    showModal('✅', 'Oturum Tamamlandı!', `Doğru: ${known} | Kısmen: ${partial} | Yanlış: ${unknown}`);
  }

  renderDashboard();
}

// ===== QUIZ MODE =====
function startQuizMode(words) {
  if (words.length < 4) {
    alert('Quiz için en az 4 kelime gerekli!');
    return;
  }
  quizWords = shuffleArray([...words]).slice(0, 10);
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  showScreen('quiz');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (quizIndex >= quizWords.length) {
    showQuizResult();
    return;
  }

  quizAnswered = false;
  const word = quizWords[quizIndex];
  document.getElementById('quiz-counter').textContent = `Soru ${quizIndex + 1} / ${quizWords.length}`;
  document.getElementById('quiz-word').textContent = word.de;
  document.getElementById('quiz-score').textContent = `Puan: ${quizScore}`;

  // Generate options: 1 correct + 3 wrong
  const wrong = shuffleArray(WORDS.filter(w => w.id !== word.id)).slice(0, 3);
  const options = shuffleArray([word, ...wrong]);

  const container = document.getElementById('quiz-options');
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.tr;
    btn.onclick = () => answerQuiz(btn, opt.id === word.id, word.id);
    container.appendChild(btn);
  });
}

function answerQuiz(clickedBtn, isCorrect, correctWordId) {
  if (quizAnswered) return;
  quizAnswered = true;

  const allBtns = document.querySelectorAll('.quiz-option');
  allBtns.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === WORDS.find(w => w.id === correctWordId)?.tr) {
      btn.classList.add('correct');
    }
  });

  if (isCorrect) {
    clickedBtn.classList.add('correct');
    quizScore++;
  } else {
    clickedBtn.classList.add('wrong');
  }

  document.getElementById('quiz-score').textContent = `Puan: ${quizScore}`;

  setTimeout(() => {
    quizIndex++;
    renderQuizQuestion();
  }, 1200);
}

function showQuizResult() {
  const pct = Math.round((quizScore / quizWords.length) * 100);
  let emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
  let msg = pct >= 80 ? 'Mükemmel!' : pct >= 60 ? 'İyi iş!' : 'Pratik yapmaya devam et!';
  showModal(emoji, `Quiz Bitti! ${quizScore}/${quizWords.length}`, `${msg} Başarı oranın: %${pct}`);
  showScreen('dashboard');
  renderDashboard();
}

// ===== CATEGORIES SCREEN =====
function renderCategories() {
  const container = document.getElementById('categories-grid');
  container.innerHTML = '';

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const wordsInCat = WORDS.filter(w => w.category === key);
    const known = wordsInCat.filter(w => appData.wordStatus[w.id] === 'known').length;
    const pct = wordsInCat.length ? Math.round((known / wordsInCat.length) * 100) : 0;

    const div = document.createElement('div');
    div.className = 'category-card';
    div.innerHTML = `
      <span class="category-icon">${cat.icon}</span>
      <div class="category-name">${cat.label}</div>
      <div class="category-count">${known}/${wordsInCat.length} kelime</div>
      <div class="category-progress-mini">
        <div class="category-progress-fill" style="width:${pct}%"></div>
      </div>
    `;
    div.onclick = () => openCategory(key);
    container.appendChild(div);
  });
}

function openCategory(catKey) {
  currentCategory = catKey;
  const cat = CATEGORIES[catKey];
  const words = WORDS.filter(w => w.category === catKey);

  document.getElementById('cat-detail-title').textContent = cat.icon + ' ' + cat.label;
  document.getElementById('cat-detail-count').textContent = `${words.length} kelime`;

  const wordList = document.getElementById('cat-word-list');
  wordList.innerHTML = '';
  words.forEach(w => {
    const status = appData.wordStatus[w.id] || 'new';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${w.de}</strong></td>
      <td>${w.tr}</td>
      <td><span class="level-badge ${w.level}">${w.level}</span></td>
      <td><span class="status-badge ${status}">${status === 'known' ? '✅ Öğrenildi' : status === 'learning' ? '🔄 Öğreniliyor' : '🆕 Yeni'}</span></td>
    `;
    wordList.appendChild(tr);
  });

  document.getElementById('btn-cat-study').onclick = () => startFlashSession(words);
  document.getElementById('btn-cat-quiz').onclick = () => startQuizMode(words);

  showScreen('category-detail');
}

// ===== GRAMMAR SCREEN =====
function renderGrammar() {
  const container = document.getElementById('grammar-grid');
  container.innerHTML = '';

  GRAMMAR_TOPICS.forEach(topic => {
    const div = document.createElement('div');
    div.className = 'grammar-card';
    div.innerHTML = `
      <div style="font-size:1.5rem;margin-bottom:8px">${topic.icon}</div>
      <span class="grammar-card-level">${topic.level}</span>
      <div class="grammar-card-title">${topic.title}</div>
      <div style="font-size:0.82rem;color:var(--gray-400)">${topic.description.slice(0, 80)}...</div>
    `;
    div.onclick = () => openGrammarTopic(topic.id);
    container.appendChild(div);
  });
}

function openGrammarTopic(topicId) {
  const topic = GRAMMAR_TOPICS.find(t => t.id === topicId);
  if (!topic) return;
  currentGrammarTopic = topic;

  document.getElementById('grammar-detail-title').textContent = topic.icon + ' ' + topic.title;
  document.getElementById('grammar-detail-level').textContent = topic.level;
  document.getElementById('grammar-detail-desc').textContent = topic.description;

  // Rules
  const rulesContainer = document.getElementById('grammar-rules');
  rulesContainer.innerHTML = '';
  topic.rules.forEach(rule => {
    const div = document.createElement('div');
    div.className = 'grammar-rule-section';
    div.innerHTML = `
      <div class="grammar-rule-title">${rule.rule}</div>
      <ul class="grammar-rule-examples">
        ${rule.examples.map(e => `<li>${e}</li>`).join('')}
      </ul>
    `;
    rulesContainer.appendChild(div);
  });

  // Tips
  const tipsContainer = document.getElementById('grammar-tips');
  tipsContainer.innerHTML = '';
  if (topic.tips) {
    topic.tips.forEach(tip => {
      const div = document.createElement('div');
      div.className = 'tip-box';
      div.textContent = tip;
      tipsContainer.appendChild(div);
    });
  }

  // Examples
  const examplesContainer = document.getElementById('grammar-examples');
  examplesContainer.innerHTML = '';
  if (topic.examples) {
    topic.examples.forEach(ex => {
      const p = document.createElement('p');
      p.style.cssText = 'padding:6px 0;border-bottom:1px solid var(--gray-100);font-size:0.9rem;';
      p.textContent = ex;
      examplesContainer.appendChild(p);
    });
  }

  // Quiz
  renderGrammarQuiz(topic);

  showScreen('grammar-detail');
}

let grammarQuizAnswered = [];
function renderGrammarQuiz(topic) {
  const container = document.getElementById('grammar-quiz-container');
  container.innerHTML = '';
  grammarQuizAnswered = new Array(topic.quiz.length).fill(null);

  if (!topic.quiz || topic.quiz.length === 0) {
    container.innerHTML = '<p style="color:var(--gray-400);font-size:0.9rem">Bu konu için quiz hazırlanıyor...</p>';
    return;
  }

  topic.quiz.forEach((q, qi) => {
    const div = document.createElement('div');
    div.style.cssText = 'margin-bottom:20px;padding:16px;background:var(--gray-50);border-radius:10px;';
    div.innerHTML = `
      <div style="font-weight:600;margin-bottom:10px;font-size:0.95rem">${qi + 1}. ${q.question}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;" id="gquiz-opts-${qi}">
        ${q.options.map((opt, oi) => `
          <button class="quiz-option" style="font-size:0.88rem;padding:10px;"
            onclick="answerGrammarQuiz(${qi}, ${oi}, ${q.answer})">
            ${opt}
          </button>
        `).join('')}
      </div>
    `;
    container.appendChild(div);
  });
}

function answerGrammarQuiz(qi, selectedOi, correctOi) {
  if (grammarQuizAnswered[qi] !== null) return;
  grammarQuizAnswered[qi] = selectedOi;

  const btns = document.querySelectorAll(`#gquiz-opts-${qi} .quiz-option`);
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctOi) btn.classList.add('correct');
    else if (i === selectedOi) btn.classList.add('wrong');
  });
}

// ===== WORD LIST SCREEN =====
function renderWordList(filterText = '', filterCat = '', filterLevel = '') {
  let words = WORDS;
  if (filterText) {
    const q = filterText.toLowerCase();
    words = words.filter(w => w.de.toLowerCase().includes(q) || w.tr.toLowerCase().includes(q));
  }
  if (filterCat) words = words.filter(w => w.category === filterCat);
  if (filterLevel) words = words.filter(w => w.level === filterLevel);

  const tbody = document.getElementById('word-list-body');
  tbody.innerHTML = '';
  words.forEach(w => {
    const status = appData.wordStatus[w.id] || 'new';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${w.de}</strong></td>
      <td>${w.tr}</td>
      <td style="font-size:0.82rem;color:var(--gray-500)">${w.example ? w.example.slice(0, 50) + (w.example.length > 50 ? '...' : '') : ''}</td>
      <td><span class="level-badge ${w.level}">${w.level}</span></td>
      <td>${CATEGORIES[w.category]?.icon || ''}</td>
      <td><span class="status-badge ${status}">${status === 'known' ? '✅' : status === 'learning' ? '🔄' : '🆕'}</span></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('word-list-count').textContent = `${words.length} kelime gösteriliyor`;
}

// ===== PROGRESS SCREEN =====
function renderProgress() {
  const stats = getStats(appData);
  document.getElementById('prog-known').textContent = stats.known;
  document.getElementById('prog-learning').textContent = stats.learning;
  document.getElementById('prog-streak').textContent = stats.streak + ' 🔥';
  document.getElementById('prog-total').textContent = appData.totalStudied || 0;

  const pct = Math.min(100, Math.round((stats.known / WORDS.length) * 100));
  document.getElementById('prog-bar').style.width = pct + '%';
  document.getElementById('prog-bar-text').textContent = `${stats.known}/${WORDS.length} kelime (${pct}%)`;

  // Calendar: last 30 days
  const cal = document.getElementById('progress-calendar');
  cal.innerHTML = '';
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const log = appData.dailyLog[dateStr];
    const div = document.createElement('div');
    div.className = 'cal-day';
    if (dateStr === today()) div.classList.add('today');
    if (log) {
      if (log.studied >= stats.dailyGoal) div.classList.add('done');
      else if (log.studied > 0) div.classList.add('partial');
    }
    div.title = dateStr + (log ? ` — ${log.studied} kelime` : '');
    div.textContent = d.getDate();
    cal.appendChild(div);
  }

  // Badges
  renderBadges(stats);
}

function renderBadges(stats) {
  const badges = [
    { id: 'first', icon: '🌱', name: 'İlk Adım', earned: stats.known >= 1 },
    { id: 'ten', icon: '🎯', name: '10 Kelime', earned: stats.known >= 10 },
    { id: 'fifty', icon: '⭐', name: '50 Kelime', earned: stats.known >= 50 },
    { id: 'hundred', icon: '🏅', name: '100 Kelime', earned: stats.known >= 100 },
    { id: 'threehundred', icon: '🏆', name: '300 Kelime', earned: stats.known >= 300 },
    { id: 'sixhundred', icon: '👑', name: '600 Kelime!', earned: stats.known >= 600 },
    { id: 'thousand', icon: '🏆', name: '1000 Kelime!', earned: stats.known >= 1000 },
    { id: 'streak3', icon: '⚡', name: '3 Günlük Seri', earned: stats.streak >= 3 },
    { id: 'streak7', icon: '🔥', name: '7 Günlük Seri', earned: stats.streak >= 7 },
    { id: 'streak30', icon: '💎', name: '30 Günlük Seri', earned: stats.streak >= 30 },
  ];

  const container = document.getElementById('badges-container');
  container.innerHTML = '';
  badges.forEach(b => {
    const div = document.createElement('div');
    div.className = 'badge-item' + (b.earned ? ' earned' : '');
    div.innerHTML = `<span class="badge-icon">${b.icon}</span><div class="badge-name">${b.name}</div>`;
    container.appendChild(div);
  });
}

// ===== SCREEN NAVIGATION =====
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));

  const el = document.getElementById('screen-' + name);
  if (el) el.classList.add('active');

  document.querySelectorAll(`[data-screen="${name}"]`).forEach(b => b.classList.add('active'));

  currentScreen = name;

  // Render hooks
  if (name === 'dashboard') renderDashboard();
  if (name === 'categories') renderCategories();
  if (name === 'grammar') renderGrammar();
  if (name === 'words') renderWordList();
  if (name === 'progress') renderProgress();
  if (name === 'speak') renderSpeakHub();
}

// ===== MODAL =====
function showModal(emoji, title, subtitle) {
  document.getElementById('modal-emoji').textContent = emoji;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-subtitle').textContent = subtitle;
  document.getElementById('main-modal').classList.add('active');
}

function closeModal() {
  document.getElementById('main-modal').classList.remove('active');
}

// ===== CONFETTI =====
function showConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 1}s;
      animation-duration: ${2 + Math.random() * 2}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 4000);
}

// ===== PLACEMENT TEST =====
let placementWords = [];
let placementIndex = 0;
let placementUnknown = [];
let placementKnown = [];
let placementRevealed = false;

function selectPlacementWords() {
  // Pick ~8 words per level from varied categories
  const a1 = shuffleArray(WORDS.filter(w => w.level === 'A1')).slice(0, 15);
  const a2 = shuffleArray(WORDS.filter(w => w.level === 'A2')).slice(0, 10);
  return shuffleArray([...a1, ...a2]);
}

function startPlacementTest() {
  placementWords = selectPlacementWords();
  placementIndex = 0;
  placementUnknown = [];
  placementKnown = [];
  placementRevealed = false;
  renderPlacementCard();
  showRawScreen('placement');
}

function renderPlacementCard() {
  const word = placementWords[placementIndex];
  const total = placementWords.length;

  // Progress
  document.getElementById('pl-progress-bar').style.width = (placementIndex / total * 100) + '%';
  document.getElementById('pl-counter').textContent = `${placementIndex + 1} / ${total}`;

  // Level badge
  const lvlEl = document.getElementById('pl-level');
  lvlEl.textContent = word.level;
  lvlEl.className = 'pl-level-badge pl-level-' + word.level;

  // Word
  document.getElementById('pl-word').textContent = word.de;

  // Hide translation, show "reveal" button
  document.getElementById('pl-translation-wrap').style.display = 'none';
  document.getElementById('pl-btn-reveal').style.display = 'flex';
  document.getElementById('pl-answer-btns').style.display = 'none';
  placementRevealed = false;
}

function revealPlacement() {
  const word = placementWords[placementIndex];
  document.getElementById('pl-translation').textContent = word.tr;
  if (word.example) document.getElementById('pl-example').textContent = word.example;
  else document.getElementById('pl-example').textContent = '';
  document.getElementById('pl-translation-wrap').style.display = 'block';
  document.getElementById('pl-btn-reveal').style.display = 'none';
  document.getElementById('pl-answer-btns').style.display = 'flex';
  placementRevealed = true;
}

function answerPlacement(knew) {
  const word = placementWords[placementIndex];
  if (knew) {
    placementKnown.push(word);
    appData.wordStatus[word.id] = 'known';
    appData.wordCorrect[word.id] = 2; // mark as well-known
  } else {
    placementUnknown.push(word);
    // stays 'new' — will appear in daily sessions
  }
  saveData(appData);
  placementIndex++;

  if (placementIndex >= placementWords.length) {
    showPlacementResult();
  } else {
    renderPlacementCard();
  }
}

function showPlacementResult() {
  const known = placementKnown.length;
  const unknown = placementUnknown.length;
  const total = placementWords.length;
  const pct = Math.round((known / total) * 100);

  let levelGuess, levelMsg;
  if (pct >= 70) { levelGuess = 'A2'; levelMsg = 'Güçlü bir A1 temelin var!'; }
  else if (pct >= 40) { levelGuess = 'A1-A2'; levelMsg = 'A1 seviyesin iyi, A2\'ye geçebilirsin.'; }
  else { levelGuess = 'A1'; levelMsg = 'A1\'den başlamak en doğrusu.'; }

  document.getElementById('pl-result-known').textContent = known;
  document.getElementById('pl-result-unknown').textContent = unknown;
  document.getElementById('pl-result-pct').textContent = pct + '%';
  document.getElementById('pl-result-level').textContent = levelGuess;
  document.getElementById('pl-result-msg').textContent = levelMsg;

  const studyBtn = document.getElementById('pl-btn-study-unknown');
  if (unknown > 0) {
    studyBtn.textContent = `📚 Bilmediğin ${unknown} kelimeyi şimdi çalış`;
    studyBtn.style.display = 'flex';
  } else {
    studyBtn.style.display = 'none';
  }

  document.getElementById('pl-card').style.display = 'none';
  document.getElementById('pl-result').style.display = 'block';
}

function finishPlacement() {
  appData.placementDone = true;
  saveData(appData);
  document.getElementById('pl-card').style.display = 'block';
  document.getElementById('pl-result').style.display = 'none';
  showScreen('dashboard');
}

function studyUnknownWords() {
  appData.placementDone = true;
  saveData(appData);
  document.getElementById('pl-card').style.display = 'block';
  document.getElementById('pl-result').style.display = 'none';
  startFlashSession(placementUnknown);
}

// Raw screen switch (no re-render hooks)
function showRawScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn, .bottom-nav-btn').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('screen-' + name);
  if (el) el.classList.add('active');
  currentScreen = name;
}

// ===== A1 SENTENCE GENERATOR =====
function generateExampleSentences(word) {
  const de = word.de;

  // Detect noun: starts with der/die/das
  const nounMatch = de.match(/^(der|die|das)\s(.+)$/i);
  // Detect verb: ends with -en (but not a noun)
  const isVerb = !nounMatch && /[a-zäöü]en$/i.test(de);

  if (nounMatch) {
    const art = nounMatch[1].toLowerCase();
    const noun = nounMatch[2];
    const indef = art === 'die' ? 'eine' : 'ein';
    const poss  = art === 'die' ? 'meine' : 'mein';
    const def   = art;
    return [
      `Das ist ${indef} ${noun}.`,
      `Ich habe ${indef} ${noun}.`,
      `${poss} ${noun} ist hier.`,
      `Ich mag ${def} ${noun}.`,
      `Ist das ${indef} ${noun}?`
    ];
  } else if (isVerb) {
    const inf  = de;
    // Simple regular conjugation: remove -en → stem + -e / -t
    const stem = inf.replace(/en$/i, '');
    const ich  = stem.endsWith('t') ? stem + 'e' : stem + 'e';
    const er   = stem.endsWith('t') ? stem + 'et' : stem + 't';
    return [
      `Ich ${ich} gerne.`,
      `Er ${er} jeden Tag.`,
      `Wir ${inf} zusammen.`,
      `Ich möchte ${inf}.`,
      `Kannst du ${inf}?`
    ];
  } else {
    // Adjective / adverb / other
    return [
      `Das ist ${de}.`,
      `Ich finde das sehr ${de}.`,
      `Das Wetter ist ${de}.`,
      `Er ist ${de}.`,
      `Ist das ${de}?`
    ];
  }
}

// ===========================
// IMAGE MATCH GAME
// ===========================
let imgMatchWords = [];
let imgMatchIndex = 0;
let imgMatchScore = 0;
let imgMatchLives = 3;
let imgMatchAnswered = false;

function getWordsWithEmoji(pool) {
  // Only use words that have a non-fallback emoji
  return pool.filter(w => {
    const em = getWordEmoji(w);
    return em !== '📝' && em !== '💬' && em !== '⚡' && em !== '✨';
  });
}

function startImageMatch() {
  const pool = getWordsWithEmoji(WORDS.filter(w => w.level === 'A1')).slice(0, 60);
  imgMatchWords = shuffleArray(pool).slice(0, 8);
  imgMatchIndex = 0;
  imgMatchScore = 0;
  imgMatchLives = 3;
  imgMatchAnswered = false;

  document.getElementById('img-match-result').style.display = 'none';
  document.getElementById('img-match-options').style.display = 'grid';
  document.getElementById('img-match-question').style.display = 'block';

  showRawScreen('image-match');
  renderImageMatchRound();
}

function renderImageMatchRound() {
  if (imgMatchIndex >= imgMatchWords.length || imgMatchLives <= 0) {
    showImageMatchResult();
    return;
  }

  imgMatchAnswered = false;
  const word = imgMatchWords[imgMatchIndex];
  const total = imgMatchWords.length;

  document.getElementById('img-match-round').textContent = `Tur ${imgMatchIndex + 1} / ${total}`;
  document.getElementById('img-match-pbar').style.width = (imgMatchIndex / total * 100) + '%';
  document.getElementById('img-match-score').textContent = imgMatchScore + ' puan';
  document.getElementById('img-match-lives').textContent = '❤️'.repeat(imgMatchLives) + '🖤'.repeat(3 - imgMatchLives);
  document.getElementById('img-match-emoji').textContent = getWordEmoji(word);
  document.getElementById('img-match-hint').textContent = `(${word.level} · ${CATEGORIES[word.category]?.label || word.category})`;

  // 4 options: correct + 3 distractors
  const distractors = shuffleArray(WORDS.filter(w => w.id !== word.id && w.level === word.level)).slice(0, 3);
  const options = shuffleArray([word, ...distractors]);

  const container = document.getElementById('img-match-options');
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'img-match-opt';
    btn.innerHTML = `<span class="opt-de">${opt.de}</span><span class="opt-hint">${opt.tr}</span>`;
    btn.onclick = () => handleImageMatchAnswer(btn, opt.id === word.id, word.id);
    container.appendChild(btn);
  });
}

function handleImageMatchAnswer(btn, isCorrect, correctId) {
  if (imgMatchAnswered) return;
  imgMatchAnswered = true;

  const allBtns = document.querySelectorAll('.img-match-opt');
  allBtns.forEach(b => { b.disabled = true; });

  if (isCorrect) {
    btn.classList.add('correct');
    imgMatchScore += 10;
  } else {
    btn.classList.add('wrong');
    imgMatchLives--;
    // Show correct
    allBtns.forEach(b => {
      const de = b.querySelector('.opt-de').textContent;
      const correctWord = WORDS.find(w => w.id === correctId);
      if (de === correctWord?.de) b.classList.add('correct');
    });
  }

  document.getElementById('img-match-lives').textContent = '❤️'.repeat(Math.max(0, imgMatchLives)) + '🖤'.repeat(Math.max(0, 3 - imgMatchLives));

  setTimeout(() => {
    imgMatchIndex++;
    renderImageMatchRound();
  }, 1000);
}

function showImageMatchResult() {
  document.getElementById('img-match-options').style.display = 'none';
  document.getElementById('img-match-question').style.display = 'none';
  const pct = Math.round(imgMatchScore / (imgMatchWords.length * 10) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚';
  const msg = pct >= 80 ? 'Mükemmel! Resimleri çok iyi tanıdın.' : pct >= 50 ? 'İyi iş! Biraz daha pratik yap.' : 'Alıştırma yaparsan daha iyi olur!';
  document.getElementById('img-match-res-emoji').textContent = emoji;
  document.getElementById('img-match-res-title').textContent = `${imgMatchScore} puan — %${pct}`;
  document.getElementById('img-match-res-sub').textContent = msg;
  document.getElementById('img-match-result').style.display = 'block';
}

// ===========================
// WORD MATCH GAME
// ===========================
let wmRounds = [];
let wmRoundIndex = 0;
let wmScore = 0;
let wmSelectedLeft = null;
let wmSelectedRight = null;
let wmMatched = new Set();
let wmTimerInterval = null;
let wmTimeLeft = 30;

function startWordMatch() {
  // Pick pairs from known+learning words, fallback to first 60
  let pool = WORDS.filter(w => (appData.wordStatus[w.id]||'new') !== 'new');
  if (pool.length < 6) pool = WORDS.slice(0, 60);
  pool = shuffleArray(pool);

  // 6 rounds of 6 pairs each
  wmRounds = [];
  for (let r = 0; r < 6; r++) {
    const start = (r * 6) % pool.length;
    const pairs = [];
    for (let i = 0; i < 6; i++) {
      pairs.push(pool[(start + i) % pool.length]);
    }
    wmRounds.push(pairs);
  }

  wmRoundIndex = 0;
  wmScore = 0;
  wmSelectedLeft = null;
  wmSelectedRight = null;
  wmMatched = new Set();

  document.getElementById('word-match-result').style.display = 'none';
  document.getElementById('word-match-grid').style.display = 'grid';

  showRawScreen('word-match');
  renderWordMatchRound();
}

function renderWordMatchRound() {
  clearInterval(wmTimerInterval);
  wmSelectedLeft = null;
  wmSelectedRight = null;
  wmMatched = new Set();

  const pairs = wmRounds[wmRoundIndex];
  const total = wmRounds.length;

  document.getElementById('word-match-round').textContent = `Tur ${wmRoundIndex + 1} / ${total}`;
  document.getElementById('word-match-pbar').style.width = (wmRoundIndex / total * 100) + '%';
  document.getElementById('word-match-score').textContent = wmScore + ' puan';

  // Shuffle left (German) and right (Turkish) independently
  const leftWords = shuffleArray([...pairs]);
  const rightWords = shuffleArray([...pairs]);

  const grid = document.getElementById('word-match-grid');
  grid.innerHTML = `
    <div class="word-match-col" id="wm-left"></div>
    <div class="word-match-col" id="wm-right"></div>
  `;

  leftWords.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'wm-card';
    btn.textContent = w.de;
    btn.dataset.id = w.id;
    btn.dataset.side = 'left';
    btn.onclick = () => selectWmCard(btn, 'left', w.id);
    document.getElementById('wm-left').appendChild(btn);
  });

  rightWords.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'wm-card';
    btn.textContent = w.tr;
    btn.dataset.id = w.id;
    btn.dataset.side = 'right';
    btn.onclick = () => selectWmCard(btn, 'right', w.id);
    document.getElementById('wm-right').appendChild(btn);
  });

  // Timer
  wmTimeLeft = 30;
  document.getElementById('word-match-timer').textContent = `⏱ ${wmTimeLeft}`;
  wmTimerInterval = setInterval(() => {
    wmTimeLeft--;
    document.getElementById('word-match-timer').textContent = `⏱ ${wmTimeLeft}`;
    if (wmTimeLeft <= 0) {
      clearInterval(wmTimerInterval);
      wmRoundIndex++;
      if (wmRoundIndex >= wmRounds.length) showWordMatchResult();
      else renderWordMatchRound();
    }
  }, 1000);
}

function selectWmCard(btn, side, wordId) {
  if (wmMatched.has(wordId)) return;
  if (btn.classList.contains('matched')) return;

  // Deselect same side
  document.querySelectorAll(`.wm-card[data-side="${side}"]`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  if (side === 'left') wmSelectedLeft = { btn, id: wordId };
  else wmSelectedRight = { btn, id: wordId };

  if (wmSelectedLeft && wmSelectedRight) {
    if (wmSelectedLeft.id === wmSelectedRight.id) {
      // Match!
      wmSelectedLeft.btn.classList.remove('selected');
      wmSelectedLeft.btn.classList.add('matched');
      wmSelectedRight.btn.classList.remove('selected');
      wmSelectedRight.btn.classList.add('matched');
      wmMatched.add(wmSelectedLeft.id);
      wmScore += 5;
      document.getElementById('word-match-score').textContent = wmScore + ' puan';
      wmSelectedLeft = null;
      wmSelectedRight = null;

      // Round done?
      if (wmMatched.size === wmRounds[wmRoundIndex].length) {
        clearInterval(wmTimerInterval);
        wmScore += wmTimeLeft; // time bonus
        setTimeout(() => {
          wmRoundIndex++;
          if (wmRoundIndex >= wmRounds.length) showWordMatchResult();
          else renderWordMatchRound();
        }, 600);
      }
    } else {
      // Wrong
      wmSelectedLeft.btn.classList.add('wrong-flash');
      wmSelectedRight.btn.classList.add('wrong-flash');
      const l = wmSelectedLeft, r = wmSelectedRight;
      wmSelectedLeft = null;
      wmSelectedRight = null;
      setTimeout(() => {
        l.btn.classList.remove('wrong-flash', 'selected');
        r.btn.classList.remove('wrong-flash', 'selected');
      }, 500);
    }
  }
}

function showWordMatchResult() {
  clearInterval(wmTimerInterval);
  document.getElementById('word-match-grid').style.display = 'none';
  const maxScore = wmRounds.length * (wmRounds[0].length * 5 + 15); // rough max
  const pct = Math.min(100, Math.round(wmScore / maxScore * 100));
  const emoji = pct >= 70 ? '🏆' : pct >= 40 ? '👍' : '📚';
  const msg = pct >= 70 ? 'Harika! Kelimeleri çok iyi eşleştirdin!' : pct >= 40 ? 'İyi iş! Biraz daha pratik yap.' : 'Pratik yaparsan daha iyileşirsin!';
  document.getElementById('word-match-res-emoji').textContent = emoji;
  document.getElementById('word-match-res-title').textContent = `${wmScore} puan`;
  document.getElementById('word-match-res-sub').textContent = msg;
  document.getElementById('word-match-result').style.display = 'block';
}

// ===== UTILS =====
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', e => {
  if (currentScreen === 'flashcard') {
    if (e.code === 'Space') { e.preventDefault(); flipCard(); }
    if (flashFlipped) {
      if (e.code === 'Digit1') rateCard('unknown');
      if (e.code === 'Digit2') rateCard('partial');
      if (e.code === 'Digit3') rateCard('known');
    }
  }
});

// ===== THEME =====
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  // Populate category filter in word list
  const catFilter = document.getElementById('filter-category');
  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = cat.icon + ' ' + cat.label;
    catFilter.appendChild(opt);
  });

  // Search/filter handlers
  document.getElementById('word-search').addEventListener('input', e => {
    renderWordList(e.target.value, document.getElementById('filter-category').value, document.getElementById('filter-level').value);
  });
  document.getElementById('filter-category').addEventListener('change', e => {
    renderWordList(document.getElementById('word-search').value, e.target.value, document.getElementById('filter-level').value);
  });
  document.getElementById('filter-level').addEventListener('change', e => {
    renderWordList(document.getElementById('word-search').value, document.getElementById('filter-category').value, e.target.value);
  });

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Tüm ilerleme silinecek. Emin misiniz?')) {
      localStorage.removeItem(STORAGE_KEY);
      appData = loadData();
      startPlacementTest(); // restart placement on full reset
    }
  });

  // Reorder WORDS: A1 shuffled → A2 shuffled
  const _a1 = shuffleArray(WORDS.filter(w => w.level === 'A1'));
  const _a2 = shuffleArray(WORDS.filter(w => w.level === 'A2'));
  WORDS.length = 0;
  WORDS.push(..._a1, ..._a2);

  showScreen('dashboard');
});

// =============================================
// KONUŞMA PRATİĞİ — SPEAK ENGINE
// Babbel / Speak tarzı senaryo diyaloğu
// =============================================

let speakState = {
  scenario: null,
  turnIndex: 0,
  correct: 0,
  total: 0,
  wrongAnswers: [],
  lastNPCText: ''
};

function renderSpeakHub() {
  const grid = document.getElementById('speak-scenarios-grid');
  if (!grid) return;

  const convData = JSON.parse(localStorage.getItem('almanca_speak') || '{}');

  grid.innerHTML = CONVERSATIONS.map(sc => {
    const done = convData[sc.id] || { bestScore: 0, plays: 0 };
    const totalUserTurns = sc.turns.filter(t => t.speaker === 'user').length;
    const pct = done.plays > 0 ? Math.round((done.bestScore / totalUserTurns) * 100) : null;
    const stars = pct === null ? '' : pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐';

    return `
      <div class="speak-scenario-card" onclick="startSpeakScenario('${sc.id}')"
           style="--sc-color:${sc.color};--sc-bg:${sc.bg}">
        <div class="speak-sc-header">
          <span class="speak-sc-icon">${sc.icon}</span>
          <span class="speak-sc-level level-badge-${sc.level}">${sc.level}</span>
        </div>
        <div class="speak-sc-title">${sc.title}</div>
        <div class="speak-sc-meta">${sc.turns.filter(t=>t.speaker==='user').length} adım · ${sc.npcName.split(' ')[0]}</div>
        ${done.plays > 0 ? `<div class="speak-sc-stars">${stars} <span>${pct}% doğru</span></div>` : '<div class="speak-sc-new">🆕 Henüz denemedın</div>'}
      </div>
    `;
  }).join('');
}

function startSpeakScenario(id) {
  const sc = CONVERSATIONS.find(c => c.id === id);
  if (!sc) return;

  speakState = { scenario: sc, turnIndex: 0, correct: 0, total: 0, wrongAnswers: [], lastNPCText: '' };

  document.getElementById('speak-dialog-title').textContent = sc.icon + ' ' + sc.title;
  document.getElementById('speak-sit-emoji').textContent = sc.icon;
  document.getElementById('speak-sit-text').textContent = sc.situation;
  document.getElementById('speak-dialogue-area').innerHTML = '';
  document.getElementById('speak-result').style.display = 'none';
  document.getElementById('speak-prompt-box').style.display = 'none';

  document.getElementById('speak-back-btn').onclick = () => showScreen('speak');
  document.getElementById('speak-res-replay').onclick = () => startSpeakScenario(id);

  showScreen('speak-dialog');
  updateSpeakCounter();
  playNextSpeakTurn();
}

function updateSpeakCounter() {
  const sc = speakState.scenario;
  const userTurns = sc.turns.filter(t => t.speaker === 'user').length;
  document.getElementById('speak-turn-counter').textContent = `${speakState.correct}/${userTurns}`;
}

function playNextSpeakTurn() {
  const sc = speakState.scenario;
  if (speakState.turnIndex >= sc.turns.length) {
    showSpeakResult();
    return;
  }

  const turn = sc.turns[speakState.turnIndex];

  if (turn.speaker === 'npc') {
    addNPCBubble(turn, sc);
    speakState.lastNPCText = turn.text;
    speakState.turnIndex++;
    // Short delay then next turn (may be user turn)
    setTimeout(() => playNextSpeakTurn(), 900);
  } else {
    // User turn: show options
    showUserOptions(turn);
  }
}

function addNPCBubble(turn, sc) {
  const area = document.getElementById('speak-dialogue-area');
  const div = document.createElement('div');
  div.className = 'speak-bubble speak-bubble-npc';
  div.innerHTML = `
    <div class="speak-bubble-avatar">${sc.npcEmoji}</div>
    <div class="speak-bubble-content">
      <div class="speak-bubble-name">${sc.npcName}</div>
      <div class="speak-bubble-text">${turn.text}
        <button class="speak-inline-tts" onclick="speakDE('${turn.text.replace(/'/g, "\\'")}')" title="Sesli oku">🔊</button>
      </div>
      <div class="speak-bubble-tr">${turn.translation}</div>
    </div>
  `;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;

  // Auto-speak NPC line
  setTimeout(() => speakDE(turn.text), 300);
}

function addUserBubble(text, translation, isCorrect) {
  const area = document.getElementById('speak-dialogue-area');
  const div = document.createElement('div');
  div.className = 'speak-bubble speak-bubble-user';
  div.innerHTML = `
    <div class="speak-bubble-content speak-bubble-user-content">
      <div class="speak-bubble-text">${text}
        <button class="speak-inline-tts" onclick="speakDE('${text.replace(/'/g, "\\'")}')" title="Sesli oku">🔊</button>
      </div>
      <div class="speak-bubble-tr">${translation}</div>
      <div class="speak-answer-badge ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✅ Doğru!' : '❌ Yanlış'}</div>
    </div>
    <div class="speak-bubble-avatar">🧑</div>
  `;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function addFeedbackBubble(feedback, correctText) {
  const area = document.getElementById('speak-dialogue-area');
  const div = document.createElement('div');
  div.className = 'speak-feedback-bubble';
  div.innerHTML = `<span>💬 ${feedback}</span>`;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function showUserOptions(turn) {
  const box = document.getElementById('speak-prompt-box');
  const optDiv = document.getElementById('speak-options');
  const hintDiv = document.getElementById('speak-hint-text');

  box.style.display = 'block';
  hintDiv.style.display = 'none';
  document.getElementById('speak-hint-btn').textContent = '💡 İpucu';

  // Set hint: show Turkish of correct answer
  const correct = turn.options.find(o => o.correct);
  hintDiv.textContent = correct ? `"${correct.translation}"` : '';

  speakState.total++;

  optDiv.innerHTML = turn.options.map((opt, i) => `
    <button class="speak-option-btn" onclick="selectSpeakOption(${i})">
      <span class="speak-opt-letter">${String.fromCharCode(65+i)}</span>
      <span class="speak-opt-text">${opt.text}</span>
    </button>
  `).join('');
}

function selectSpeakOption(index) {
  const sc = speakState.scenario;
  const turn = sc.turns[speakState.turnIndex];
  const opt = turn.options[index];

  // Disable all buttons
  document.querySelectorAll('.speak-option-btn').forEach(b => b.disabled = true);
  document.getElementById('speak-prompt-box').style.display = 'none';

  const isCorrect = opt.correct;
  if (isCorrect) {
    speakState.correct++;
  } else {
    speakState.wrongAnswers.push({ wrong: opt.text, correct: turn.options.find(o=>o.correct).text });
  }

  updateSpeakCounter();
  addUserBubble(opt.text, opt.translation, isCorrect);

  if (!isCorrect) {
    const correctOpt = turn.options.find(o => o.correct);
    addFeedbackBubble(opt.feedback, correctOpt.text);
  } else {
    addFeedbackBubble(opt.feedback, '');
  }

  speakDE(opt.text);

  speakState.turnIndex++;
  setTimeout(() => playNextSpeakTurn(), 1500);
}

function showSpeakResult() {
  const sc = speakState.scenario;
  const userTurns = sc.turns.filter(t => t.speaker === 'user').length;
  const pct = Math.round((speakState.correct / userTurns) * 100);

  document.getElementById('speak-prompt-box').style.display = 'none';

  let emoji, title, msg;
  if (pct === 100) { emoji = '🏆'; title = 'Mükemmel! Heyecanı yendın!'; msg = 'Tüm cevaplar doğruydu. Sen bir Almanca yıldızısın!'; }
  else if (pct >= 70) { emoji = '🎉'; title = 'Harika iş!'; msg = 'Çok iyi gidiyorsun. Bir kez daha dene ve mükemmele ulaş!'; }
  else if (pct >= 40) { emoji = '💪'; title = 'Güzel deneme!'; msg = 'Pratik yapmaya devam et. Her tekrarda daha iyi olacaksın!'; }
  else { emoji = '📚'; title = 'Devam et!'; msg = 'Bu senaryo biraz zor. Tekrar denediğinde çok daha iyi olacaksın!'; }

  document.getElementById('speak-res-emoji').textContent = emoji;
  document.getElementById('speak-res-title').textContent = title;
  document.getElementById('speak-res-correct').textContent = speakState.correct;
  document.getElementById('speak-res-total').textContent = userTurns;
  document.getElementById('speak-res-msg').textContent = msg;

  // Show wrong answers review
  const rev = document.getElementById('speak-result-review');
  if (speakState.wrongAnswers.length > 0) {
    rev.innerHTML = `<div class="speak-review-title">📝 Yanlış cevapların:</div>` +
      speakState.wrongAnswers.map(w => `
        <div class="speak-review-item">
          <div class="speak-review-wrong">❌ ${w.wrong}</div>
          <div class="speak-review-correct">✅ ${w.correct}</div>
        </div>
      `).join('');
  } else {
    rev.innerHTML = '<div class="speak-review-title">🎯 Hiç hata yapmadın!</div>';
  }

  // Save to localStorage
  const convData = JSON.parse(localStorage.getItem('almanca_speak') || '{}');
  const prev = convData[sc.id] || { bestScore: 0, plays: 0 };
  convData[sc.id] = {
    bestScore: Math.max(prev.bestScore, speakState.correct),
    plays: prev.plays + 1,
    lastPlayed: today()
  };
  localStorage.setItem('almanca_speak', JSON.stringify(convData));

  document.getElementById('speak-result').style.display = 'flex';
  document.getElementById('speak-result').scrollIntoView({ behavior: 'smooth' });

  if (pct >= 80) showConfetti();
}

function toggleSpeakHint() {
  const hint = document.getElementById('speak-hint-text');
  const btn = document.getElementById('speak-hint-btn');
  if (hint.style.display === 'none') {
    hint.style.display = 'block';
    btn.textContent = '🙈 İpucunu Gizle';
  } else {
    hint.style.display = 'none';
    btn.textContent = '💡 İpucu';
  }
}

function speakLastNPC() {
  if (speakState.lastNPCText) speakDE(speakState.lastNPCText);
}

function startRandomScenario() {
  const idx = Math.floor(Math.random() * CONVERSATIONS.length);
  startSpeakScenario(CONVERSATIONS[idx].id);
}

function startNextScenario() {
  const cur = speakState.scenario;
  const idx = CONVERSATIONS.findIndex(c => c.id === cur.id);
  const next = CONVERSATIONS[(idx + 1) % CONVERSATIONS.length];
  startSpeakScenario(next.id);
}

function startNextUnplayed() {
  const convData = JSON.parse(localStorage.getItem('almanca_speak') || '{}');
  const unplayed = CONVERSATIONS.filter(c => !convData[c.id] || convData[c.id].plays === 0);
  if (unplayed.length === 0) {
    startRandomScenario();
  } else {
    startSpeakScenario(unplayed[Math.floor(Math.random() * unplayed.length)].id);
  }
}

function speakDE(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'de-DE';
  utt.rate = 0.9;
  // Prefer a German voice if available
  const voices = window.speechSynthesis.getVoices();
  const deVoice = voices.find(v => v.lang.startsWith('de'));
  if (deVoice) utt.voice = deVoice;
  window.speechSynthesis.speak(utt);
}
