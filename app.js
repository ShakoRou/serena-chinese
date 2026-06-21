// =====================================================
// Serena Chinese — app.js
// Логика приложения.
// =====================================================

const PROGRESS_KEY = "serenaChineseProgressV2";
const CUSTOM_WORDS_KEY = "serenaChineseCustomWordsV2";
const CUSTOM_PHRASES_KEY = "serenaChineseCustomPhrasesV1";
const LESSON_KEY = "serenaChineseCurrentLessonV2";

const baseDictionary = Array.isArray(window.SERENA_DICTIONARY) ? window.SERENA_DICTIONARY.filter(Boolean) : [];
const basePhrases = Array.isArray(window.SERENA_PHRASES) ? window.SERENA_PHRASES.filter(Boolean) : [];

let progress = loadJSON(PROGRESS_KEY, {});
let customWords = loadJSON(CUSTOM_WORDS_KEY, []);
let customPhrases = loadJSON(CUSTOM_PHRASES_KEY, []);
let currentLesson = loadJSON(LESSON_KEY, []);
let currentCardIndex = 0;
let currentMode = "cards";
let dictionaryFilter = "all";

let currentPhrase = null;
let selectedBankIndexes = [];
let sentenceAnswer = [];

let hanziWriter = null;
let writingWord = null;
let writingCharacters = [];
let writingCharacterIndex = 0;
let selectedWritingWordId = null;

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn("Cannot load", key, error);
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function chooseRandom(items) {
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)];
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getAllWords() {
  const map = new Map();
  [...baseDictionary, ...customWords].forEach(word => {
    if (word && word.id && !map.has(word.id)) {
      map.set(word.id, word);
    }
  });
  return [...map.values()];
}

function getAllPhrases() {
  return [...basePhrases, ...customPhrases].filter(Boolean);
}

function getWordById(wordId) {
  return getAllWords().find(word => word.id === wordId);
}

function getWordByChinese(chinese) {
  return getAllWords().find(word => word.chinese === chinese);
}

function getProgress(wordId) {
  if (!progress[wordId]) {
    progress[wordId] = {
      status: "new",
      mastery: 0,
      cardDone: false,
      writingDone: false,
      sentenceDone: false,
      seenCount: 0,
      wrongCount: 0
    };
  }
  return progress[wordId];
}

function saveProgress() {
  saveJSON(PROGRESS_KEY, progress);
}

function updateStatus(wordId) {
  const item = getProgress(wordId);

  if (item.mastery <= 0) item.status = "new";
  else if (item.mastery < 3) item.status = "learning";
  else if (item.mastery < 5) item.status = "review";
  else item.status = "learned";

  saveProgress();
}

function moveWordToStatus(wordId, newStatus) {
  const item = getProgress(wordId);

  if (newStatus === "new") {
    item.status = "new";
    item.mastery = 0;
    item.cardDone = false;
    item.writingDone = false;
    item.sentenceDone = false;
  }

  if (newStatus === "learning") {
    item.status = "learning";
    item.mastery = Math.max(item.mastery, 1);
  }

  if (newStatus === "review") {
    item.status = "review";
    item.mastery = Math.max(item.mastery, 3);
  }

  if (newStatus === "learned") {
    item.status = "learned";
    item.mastery = 5;
    item.cardDone = true;
    item.writingDone = true;
    item.sentenceDone = true;
  }

  saveProgress();
  renderAll();

  if (currentMode === "sentences" && currentPhrase) {
    renderSentence();
    showWordInfo(wordId);
  }
}

function moveWordToStatusFromSelect(wordId, value) {
  moveWordToStatus(wordId, value);
  showWordInfo(wordId);
}

function statusLabel(status) {
  return {
    new: "новое",
    learning: "изучается",
    review: "повторить",
    learned: "выучено"
  }[status] || status;
}

function renderStats() {
  const counts = { new: 0, learning: 0, review: 0, learned: 0 };

  getAllWords().forEach(word => {
    const status = getProgress(word.id).status;
    counts[status] = (counts[status] || 0) + 1;
  });

  const stats = [
    ["new", "Новые"],
    ["learning", "Изучаются"],
    ["review", "Повторить"],
    ["learned", "Выучены"]
  ];

  document.getElementById("statsGrid").innerHTML = stats.map(([status, label]) => `
    <div class="stat-card" onclick="setDictionaryFilter('${status}')">
      <div class="stat-number">${counts[status] || 0}</div>
      <div class="stat-label">${label}</div>
    </div>
  `).join("");
}

function showMode(mode) {
  currentMode = mode;

  document.querySelectorAll(".mode-section").forEach(section => section.classList.add("hidden"));
  document.querySelectorAll(".tabs button").forEach(button => button.classList.remove("active"));

  document.getElementById(mode + "Mode").classList.remove("hidden");
  document.getElementById("tab-" + mode).classList.add("active");

  if (mode === "cards") renderCard();
  if (mode === "writing") renderWriting();
  if (mode === "sentences" && !currentPhrase) nextPhrase();
  if (mode === "sentences" && currentPhrase) renderSentence();
  if (mode === "dictionary") renderDictionary();
}

function startNewLesson() {
  const words = getAllWords();
  const newWords = shuffle(words.filter(word => getProgress(word.id).status === "new"));
  const reviewWords = shuffle(words.filter(word => ["learning", "review"].includes(getProgress(word.id).status)));
  const learnedWords = shuffle(words.filter(word => getProgress(word.id).status === "learned"));

  let lessonWords = [...newWords.slice(0, 7), ...reviewWords.slice(0, 3)];

  if (lessonWords.length < 10) {
    const already = new Set(lessonWords.map(word => word.id));
    const fill = shuffle([...newWords, ...reviewWords, ...learnedWords]).filter(word => !already.has(word.id));
    lessonWords = [...lessonWords, ...fill.slice(0, 10 - lessonWords.length)];
  }

  currentLesson = lessonWords.map(word => word.id);
  currentCardIndex = 0;
  saveJSON(LESSON_KEY, currentLesson);
  showMode("cards");
}

function continueLesson() {
  if (!currentLesson.length) {
    startNewLesson();
    return;
  }

  showMode("cards");
}

function getCurrentCardWord() {
  if (!currentLesson.length) return null;
  const safeIndex = Math.min(currentCardIndex, currentLesson.length - 1);
  return getWordById(currentLesson[safeIndex]);
}

function getWritingShortcutButton(wordId) {
  return `
    <button
      class="write-shortcut-button"
      onclick="openWritingForWord('${escapeHTML(wordId)}')"
      title="Писать иероглиф"
      aria-label="Писать иероглиф"
    >
      ✎
    </button>
  `;
}

function renderCard(showAnswer = false) {
  const box = document.getElementById("cardBox");
  const word = getCurrentCardWord();

  if (!word) {
    box.innerHTML = `
      <div class="study-card">
        <h3>Урок ещё не создан</h3>
        <p class="muted">Нажми “Новый урок: 10 слов”.</p>
      </div>
    `;
    return;
  }

  const item = getProgress(word.id);
  item.seenCount += 1;
  saveProgress();

  box.innerHTML = `
    <div class="study-card">
      <div class="meta">${currentCardIndex + 1} / ${currentLesson.length} · ${statusLabel(item.status)}</div>

      <div class="word-title-row">
        <div class="chinese-big">${escapeHTML(word.chinese)}</div>
        ${getWritingShortcutButton(word.id)}
      </div>

      ${showAnswer ? `
        <div class="pinyin">${escapeHTML(word.pinyin)}</div>
        <div class="meaning">${escapeHTML(word.meaning)}</div>
        <p class="meta">type: ${escapeHTML(word.type)} · mastery: ${item.mastery}/5</p>
      ` : `<p class="muted">Вспомни pinyin и перевод, потом нажми “Показать ответ”.</p>`}

      <div class="button-row" style="justify-content:center">
        ${showAnswer ? `
          <button class="secondary" onclick="markCardHard()">Повторить</button>
          <button onclick="markCardKnown()">Знаю</button>
        ` : `<button onclick="renderCard(true)">Показать ответ</button>`}
      </div>
    </div>
  `;
}

function markCardKnown() {
  const word = getCurrentCardWord();
  if (!word) return;

  const item = getProgress(word.id);
  item.cardDone = true;
  item.mastery = Math.min(5, item.mastery + 1);
  updateStatus(word.id);

  currentCardIndex = (currentCardIndex + 1) % currentLesson.length;
  renderAll();
  renderCard();
}

function markCardHard() {
  const word = getCurrentCardWord();
  if (!word) return;

  const item = getProgress(word.id);
  item.wrongCount += 1;
  item.mastery = Math.max(1, item.mastery);
  updateStatus(word.id);

  currentCardIndex = (currentCardIndex + 1) % currentLesson.length;
  renderAll();
  renderCard();
}

// =====================================================
// WRITING MODE — Hanzi Writer
// =====================================================

function openWritingForWord(wordId) {
  const word = getWordById(wordId);
  if (!word) return;

  selectedWritingWordId = wordId;
  showMode("writing");
}

function renderWriting() {
  const forcedWord = selectedWritingWordId ? getWordById(selectedWritingWordId) : null;
  const word = forcedWord || getCurrentCardWord() || getAllWords()[0];
  writingWord = word;

  const wordBox = document.getElementById("writingWord");
  const charactersBox = document.getElementById("writingCharacters");
  const target = document.getElementById("hanziTarget");

  if (!word) {
    wordBox.innerHTML = "Нет слов для письма.";
    charactersBox.innerHTML = "";
    target.innerHTML = "";
    return;
  }

  writingCharacters = getCharactersFromWord(word);
  writingCharacterIndex = 0;

  wordBox.innerHTML = `
    ${escapeHTML(word.chinese)}
    <span class="pinyin">${escapeHTML(word.pinyin)}</span>
    <div class="meaning">${escapeHTML(word.meaning)}</div>
  `;

  renderWritingCharacterButtons();
  loadCurrentHanziCharacter();
}

function getCharactersFromWord(word) {
  return Array.from(word.chinese).filter(character => isChineseCharacter(character));
}

function isChineseCharacter(character) {
  return /[\u3400-\u9FFF]/.test(character);
}

function renderWritingCharacterButtons() {
  const box = document.getElementById("writingCharacters");

  if (!writingCharacters.length) {
    box.innerHTML = `<p class="muted">В этом слове нет китайских иероглифов для тренировки.</p>`;
    return;
  }

  box.innerHTML = writingCharacters.map((character, index) => `
    <button
      class="character-button ${index === writingCharacterIndex ? "active" : ""}"
      onclick="selectWritingCharacter(${index})"
    >
      ${escapeHTML(character)}
    </button>
  `).join("");
}

function selectWritingCharacter(index) {
  writingCharacterIndex = index;
  renderWritingCharacterButtons();
  loadCurrentHanziCharacter();
}

function loadCurrentHanziCharacter() {
  const target = document.getElementById("hanziTarget");
  const character = writingCharacters[writingCharacterIndex];

  target.innerHTML = "";
  hanziWriter = null;

  if (!character) {
    target.innerHTML = `<p class="muted">Выбери иероглиф.</p>`;
    return;
  }

  if (typeof HanziWriter === "undefined") {
    showWritingMessage("Hanzi Writer не загрузился. Проверь интернет или подключение в index.html.", "error");
    target.innerHTML = `<p class="muted">Библиотека письма не загрузилась.</p>`;
    return;
  }

  const size = getHanziBoxSize();
  target.style.width = size + "px";
  target.style.height = size + "px";

  showWritingMessage(`Сейчас тренируем: ${character}`, "");

  hanziWriter = HanziWriter.create("hanziTarget", character, {
    width: size,
    height: size,
    padding: 24,
    showOutline: true,
    showCharacter: false,
    strokeAnimationSpeed: 1,
    delayBetweenStrokes: 180,
    drawingWidth: 34,
    radicalColor: "#6f3fd8",

    onLoadCharDataSuccess: function() {
      showWritingMessage(`Иероглиф ${character} загружен. Можно сразу писать.`, "ok");

      setTimeout(function() {
        startHanziQuiz(true);
      }, 250);
    },

    onLoadCharDataError: function() {
      showWritingMessage(`Не удалось загрузить данные для ${character}. Возможно, нет интернета или символ не поддерживается.`, "error");
    }
  });
}

function getHanziBoxSize() {
  const box = document.querySelector(".hanzi-box");
  const width = box ? box.clientWidth : 360;
  return Math.min(360, Math.max(280, width - 36));
}

function animateHanzi() {
  if (!hanziWriter) {
    showWritingMessage("Сначала выбери иероглиф.", "error");
    return;
  }

  showWritingMessage("Смотри порядок черт.", "");
  hanziWriter.animateCharacter();
}

function startHanziQuiz(isAutoStart = false) {
  if (!hanziWriter) {
    showWritingMessage("Сначала выбери иероглиф.", "error");
    return;
  }

  showWritingMessage(
    isAutoStart
      ? "Пиши сама. Если ошибёшься, приложение подскажет."
      : "Пиши иероглиф по чертам. Если ошибёшься, приложение подскажет.",
    ""
  );

  hanziWriter.quiz({
    showHintAfterMisses: 2,
    leniency: 1,

    onCorrectStroke: function() {
      showWritingMessage("Правильно. Продолжай.", "ok");
    },

    onMistake: function(strokeData) {
      showWritingMessage(`Ошибка в этой черте. Ошибок: ${strokeData.totalMistakes}`, "error");
    },

    onComplete: function(summaryData) {
      showWritingMessage(`Иероглиф завершён. Всего ошибок: ${summaryData.totalMistakes}`, "ok");
    }
  });
}

function previousWritingCharacter() {
  if (!writingCharacters.length) return;

  writingCharacterIndex -= 1;
  if (writingCharacterIndex < 0) {
    writingCharacterIndex = writingCharacters.length - 1;
  }

  renderWritingCharacterButtons();
  loadCurrentHanziCharacter();
}

function nextWritingCharacter() {
  if (!writingCharacters.length) return;

  writingCharacterIndex = (writingCharacterIndex + 1) % writingCharacters.length;
  renderWritingCharacterButtons();
  loadCurrentHanziCharacter();
}

function showWritingMessage(text, type) {
  const box = document.getElementById("writingMessage");
  if (!box) return;

  box.textContent = text || "";
  box.className = type ? `message ${type}` : "message";
}

function markWritingDone() {
  const word = writingWord || getCurrentCardWord();
  if (!word) return;

  const item = getProgress(word.id);
  item.writingDone = true;
  item.mastery = Math.min(5, item.mastery + 1);

  updateStatus(word.id);
  renderAll();
  showWritingMessage(`Письмо для слова ${word.chinese} отмечено как выполненное.`, "ok");
}

// =====================================================
// SENTENCES MODE
// =====================================================

function normalizePhrase(phrase) {
  const tokens = (phrase.tokens || []).filter(Boolean);
  const words = tokens
    .filter(token => token.wordId)
    .map(token => getWordById(token.wordId))
    .filter(Boolean);

  return {
    ...phrase,
    tokens,
    correct: phrase.correct || words.map(word => word.chinese),
    bank: phrase.bank || shuffle(words.map(word => word.chinese)),
    prompt: phrase.prompt || `Собери: ${phrase.translation || "фразу"}`
  };
}

function getAvailablePhrases() {
  const phrases = getAllPhrases()
    .map(normalizePhrase)
    .filter(phrase => phrase.tokens.some(token => token.wordId))
    .filter(phrase => phrase.tokens.every(token => !token.wordId || getWordById(token.wordId)));

  if (!phrases.length) return [];

  const lessonSet = new Set(currentLesson);
  const connected = phrases.filter(phrase =>
    phrase.tokens.some(token => token.wordId && lessonSet.has(token.wordId))
  );

  return connected.length >= 5 ? connected : phrases;
}

function nextPhrase() {
  const phrases = getAvailablePhrases();
  currentPhrase = chooseRandom(phrases);
  selectedBankIndexes = [];
  sentenceAnswer = [];
  renderSentence();
}

function nextPhraseAction() {
  if (currentPhrase && sentenceAnswer.length > 0) {
    const ok = checkSentence();
    if (!ok) return;
  }

  nextPhrase();
}

function renderSentence() {
  const phraseText = document.getElementById("phraseText");
  const source = document.getElementById("phraseSource");
  const prompt = document.getElementById("sentencePrompt");
  const message = document.getElementById("sentenceMessage");
  const infoBox = document.getElementById("wordInfoBox");

  if (!currentPhrase) {
    source.textContent = "Нет доступных фраз";
    phraseText.innerHTML = "";
    prompt.textContent = "Проверь phrases.js: фразы должны ссылаться на слова из dictionary.js.";
    renderSentenceBuild();
    renderWordBank();
    return;
  }

  source.textContent = currentPhrase.source === "custom" ? "Личная фраза" : "Готовая фраза из phrases.js";

  phraseText.innerHTML = currentPhrase.tokens.map(token => {
    if (token.text) return `<span>${escapeHTML(token.text)}</span>`;

    const word = getWordById(token.wordId);
    if (!word) return "";

    const status = getProgress(word.id).status;
    return `<span class="phrase-token ${status}" onclick="showWordInfo('${escapeHTML(word.id)}')">${escapeHTML(word.chinese)}</span>`;
  }).join("");

  prompt.textContent = currentPhrase.prompt || `Собери: ${currentPhrase.translation}`;
  message.textContent = "";
  message.className = "message";

  if (!infoBox.innerHTML) infoBox.innerHTML = "";

  renderSentenceBuild();
  renderWordBank();
}

function showWordInfo(wordId) {
  const word = getWordById(wordId);
  if (!word) return;

  const item = getProgress(wordId);

  document.getElementById("wordInfoBox").innerHTML = `
    <div class="word-info-card">
      <div class="word-title-row">
        <div class="chinese-big">${escapeHTML(word.chinese)}</div>
        ${getWritingShortcutButton(word.id)}
      </div>
      <div class="pinyin">${escapeHTML(word.pinyin)}</div>
      <div class="meaning">${escapeHTML(word.meaning)}</div>
      <p class="meta">type: ${escapeHTML(word.type)} · status: ${statusLabel(item.status)} · mastery: ${item.mastery}/5</p>
      <label class="meta">Переместить слово в блок:</label>
      <select onchange="moveWordToStatusFromSelect('${escapeHTML(word.id)}', this.value)">
        <option value="new" ${item.status === "new" ? "selected" : ""}>новые</option>
        <option value="learning" ${item.status === "learning" ? "selected" : ""}>изучение</option>
        <option value="review" ${item.status === "review" ? "selected" : ""}>повторение</option>
        <option value="learned" ${item.status === "learned" ? "selected" : ""}>выученные</option>
      </select>
    </div>
  `;
}

function renderWordBank() {
  const bank = document.getElementById("wordBank");

  if (!currentPhrase) {
    bank.innerHTML = "";
    return;
  }

  bank.innerHTML = currentPhrase.bank.map((wordText, index) => {
    const selected = selectedBankIndexes.includes(index);
    return `<span class="word-chip ${selected ? "selected" : ""}" onclick="addSentenceWord(${index})">${escapeHTML(wordText)}</span>`;
  }).join("");
}

function addSentenceWord(index) {
  if (!currentPhrase || selectedBankIndexes.includes(index)) return;

  selectedBankIndexes.push(index);
  sentenceAnswer.push(currentPhrase.bank[index]);

  renderSentenceBuild();
  renderWordBank();
}

function renderSentenceBuild() {
  const build = document.getElementById("sentenceBuild");

  if (!sentenceAnswer.length) {
    build.innerHTML = `<span class="muted">Нажимай слова снизу, чтобы собрать предложение.</span>`;
    return;
  }

  build.innerHTML = sentenceAnswer.map((word, index) =>
    `<span class="word-chip" onclick="removeSentenceWord(${index})">${escapeHTML(word)}</span>`
  ).join("");
}

function removeSentenceWord(answerIndex) {
  selectedBankIndexes.splice(answerIndex, 1);
  sentenceAnswer.splice(answerIndex, 1);

  renderSentenceBuild();
  renderWordBank();
}

function clearSentence() {
  selectedBankIndexes = [];
  sentenceAnswer = [];

  renderSentenceBuild();
  renderWordBank();

  const message = document.getElementById("sentenceMessage");
  message.textContent = "";
  message.className = "message";
}

function checkSentence() {
  const message = document.getElementById("sentenceMessage");
  const correct = currentPhrase.correct || [];
  const isCorrect = JSON.stringify(sentenceAnswer) === JSON.stringify(correct);

  if (isCorrect) {
    currentPhrase.tokens.forEach(token => {
      if (!token.wordId) return;

      const item = getProgress(token.wordId);
      item.sentenceDone = true;
      item.mastery = Math.min(5, item.mastery + 1);

      updateStatus(token.wordId);
    });

    renderStats();
    message.textContent = "Правильно. Переходим к следующей фразе.";
    message.className = "message ok";
    return true;
  }

  currentPhrase.tokens.forEach(token => {
    if (!token.wordId) return;
    const item = getProgress(token.wordId);
    item.wrongCount += 1;
  });

  saveProgress();
  renderStats();

  message.textContent = "Порядок неправильный. Исправь фразу и нажми “Следующая фраза” ещё раз.";
  message.className = "message error";
  return false;
}

function addCustomPhrase() {
  const chineseInput = document.getElementById("customPhraseChinese").value.trim();
  const translation = document.getElementById("customPhraseTranslation").value.trim();
  const explanation = document.getElementById("customPhraseExplanation").value.trim();
  const message = document.getElementById("customPhraseMessage");

  const parts = chineseInput.split(/\s+/).filter(Boolean);

  if (!parts.length || !translation) {
    message.textContent = "Нужно написать китайские слова через пробел и перевод.";
    message.className = "message error";
    return;
  }

  const words = parts.map(part => getWordByChinese(part));
  const missing = parts.filter((part, index) => !words[index]);

  if (missing.length) {
    message.textContent = `Этих слов нет в dictionary.js: ${missing.join(", ")}`;
    message.className = "message error";
    return;
  }

  const phrase = {
    id: "custom_phrase_" + Date.now(),
    source: "custom",
    translation,
    prompt: "Собери: " + translation,
    tokens: [...words.map(word => ({ wordId: word.id })), { text: "。" }],
    correct: words.map(word => word.chinese),
    bank: shuffle(words.map(word => word.chinese)),
    explanation: explanation || "Личная фраза."
  };

  customPhrases.push(phrase);
  saveJSON(CUSTOM_PHRASES_KEY, customPhrases);

  message.textContent = "Фраза добавлена.";
  message.className = "message ok";

  document.getElementById("customPhraseChinese").value = "";
  document.getElementById("customPhraseTranslation").value = "";
  document.getElementById("customPhraseExplanation").value = "";

  nextPhrase();
}

// =====================================================
// DICTIONARY MODE
// =====================================================

function setDictionaryFilter(status) {
  dictionaryFilter = status;
  showMode("dictionary");
}

function renderDictionaryWarnings() {
  const warnings = [];
  const words = getAllWords();
  const ids = new Set();
  const chinese = new Set();

  words.forEach(word => {
    if (!word.id || !word.chinese || !word.pinyin || !word.meaning) {
      warnings.push("Есть слово с пропущенным id, chinese, pinyin или meaning.");
    }

    if (ids.has(word.id)) warnings.push(`Повторяется id: ${word.id}`);
    if (chinese.has(word.chinese)) warnings.push(`Повторяется chinese: ${word.chinese}`);

    ids.add(word.id);
    chinese.add(word.chinese);
  });

  const box = document.getElementById("dictionaryWarnings");
  box.innerHTML = warnings.length ? `<div class="warning-box">${[...new Set(warnings)].join("<br>")}</div>` : "";
}

function renderDictionary() {
  renderDictionaryWarnings();

  const searchInput = document.getElementById("dictionarySearch");
  const search = searchInput ? searchInput.value.trim().toLowerCase() : "";

  let words = getAllWords();

  if (dictionaryFilter !== "all") {
    words = words.filter(word => getProgress(word.id).status === dictionaryFilter);
  }

  if (search) {
    words = words.filter(word =>
      word.chinese.includes(search) ||
      word.pinyin.toLowerCase().includes(search) ||
      word.meaning.toLowerCase().includes(search) ||
      word.type.toLowerCase().includes(search)
    );
  }

  document.getElementById("dictionaryList").innerHTML = words.map(word => {
    const item = getProgress(word.id);

    return `
      <div class="word-row">
        <div class="word-title-row">
          <div class="chinese">${escapeHTML(word.chinese)}</div>
          ${getWritingShortcutButton(word.id)}
        </div>
        <div class="pinyin">${escapeHTML(word.pinyin)}</div>
        <div>${escapeHTML(word.meaning)}</div>
        <p class="meta">id: ${escapeHTML(word.id)}<br>type: ${escapeHTML(word.type)}<br>status: ${statusLabel(item.status)} · mastery: ${item.mastery}/5</p>
        <select onchange="moveWordToStatus('${escapeHTML(word.id)}', this.value)">
          <option value="new" ${item.status === "new" ? "selected" : ""}>новые</option>
          <option value="learning" ${item.status === "learning" ? "selected" : ""}>изучение</option>
          <option value="review" ${item.status === "review" ? "selected" : ""}>повторение</option>
          <option value="learned" ${item.status === "learned" ? "selected" : ""}>выученные</option>
        </select>
      </div>
    `;
  }).join("");
}

function addCustomWord() {
  const chinese = document.getElementById("newChinese").value.trim();
  const pinyin = document.getElementById("newPinyin").value.trim();
  const meaning = document.getElementById("newMeaning").value.trim();
  const type = document.getElementById("newType").value;
  const message = document.getElementById("addWordMessage");

  if (!chinese || !pinyin || !meaning) {
    message.textContent = "Заполни иероглифы, pinyin и перевод.";
    message.className = "message error";
    return;
  }

  if (getWordByChinese(chinese)) {
    message.textContent = "Такое слово уже есть в словаре.";
    message.className = "message error";
    return;
  }

  const id = "custom_" + Date.now();

  customWords.push({ id, chinese, pinyin, meaning, level: 1, type });
  saveJSON(CUSTOM_WORDS_KEY, customWords);

  message.textContent = "Слово добавлено.";
  message.className = "message ok";

  document.getElementById("newChinese").value = "";
  document.getElementById("newPinyin").value = "";
  document.getElementById("newMeaning").value = "";

  renderAll();
  renderDictionary();
}

function resetProgress() {
  const ok = confirm("Сбросить прогресс на этом устройстве?");
  if (!ok) return;

  progress = {};
  currentLesson = [];

  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(LESSON_KEY);

  renderAll();
  renderCard();
}

function renderAll() {
  renderStats();

  if (currentMode === "dictionary") renderDictionary();
  if (currentMode === "cards") renderCard();
}

function boot() {
  renderAll();
  showMode("cards");
}

boot();
