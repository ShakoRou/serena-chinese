// =====================================================
// Serena Chinese — app.js
// Логика приложения.
// Код организован по тем же блокам, что и сайт.
// =====================================================

// =====================================================
// ОБЩЕЕ ЯДРО: ключи, данные, состояние приложения
// =====================================================

const PROGRESS_KEY = "serenaChineseProgressV2";
const CUSTOM_WORDS_KEY = "serenaChineseCustomWordsV2";
const CUSTOM_PHRASES_KEY = "serenaChineseCustomPhrasesV1";
const CUSTOM_TEXTS_KEY = "serenaChineseCustomTextsV1";
const LESSON_KEY = "serenaChineseCurrentLessonV2";

const baseDictionary = Array.isArray(window.SERENA_DICTIONARY) ? window.SERENA_DICTIONARY.filter(Boolean) : [];
const basePhrases = Array.isArray(window.SERENA_PHRASES) ? window.SERENA_PHRASES.filter(Boolean) : [];

let progress = loadJSON(PROGRESS_KEY, {});
let customWords = loadJSON(CUSTOM_WORDS_KEY, []);
let customPhrases = loadJSON(CUSTOM_PHRASES_KEY, []);
let readingTexts = loadJSON(CUSTOM_TEXTS_KEY, []);
let currentReadingTextId = readingTexts.length ? readingTexts[0].id : null;
let currentLesson = loadJSON(LESSON_KEY, []);
let currentCardIndex = 0;
let currentMode = "cards";
let dictionaryFilter = "all";

let currentPhrase = null;
let selectedBankIndexes = [];
let sentenceAnswer = [];

let currentMemoryExercise = "sentence";
let currentMatchTask = null;
let currentRecallTask = null;
let currentDrawTask = null;
let memoryHanziWriter = null;

let hanziWriter = null;
let writingWord = null;
let writingCharacters = [];
let writingCharacterIndex = 0;
let selectedWritingWordId = null; 

let boardSentence = [];
let boardClickTimer = null;
let currentBoardPhrase = null;

const boardPositions = [
  { top: 18, left: 16, rotate: -5 },
  { top: 14, left: 48, rotate: 3 },
  { top: 20, left: 78, rotate: 6 },

  { top: 42, left: 28, rotate: 4 },
  { top: 38, left: 62, rotate: -4 },

  { top: 62, left: 14, rotate: 5 },
  { top: 66, left: 42, rotate: -3 },
  { top: 58, left: 74, rotate: 4 },

  { top: 82, left: 32, rotate: -5 },
  { top: 80, left: 66, rotate: 3 }
];

// =====================================================
// ОБЩИЕ ФУНКЦИИ: хранение, словарь, прогресс, озвучка
// =====================================================

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
  if (mode === "sentences") renderMemory();
  if (mode === "dictionary") renderDictionary();
  if (mode === "reading") renderReading();
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

let selectedChineseVoice = null;
let lastSpokenText = "";
let lastSpokenTime = 0;

function loadChineseVoice() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const voices = speechSynthesis.getVoices();

  selectedChineseVoice =
    voices.find(voice => voice.lang.toLowerCase().startsWith("zh-cn")) ||
    voices.find(voice => voice.lang.toLowerCase().startsWith("zh")) ||
    voices.find(voice => voice.name.toLowerCase().includes("chinese")) ||
    null;
}

if ("speechSynthesis" in window) {
  loadChineseVoice();
  speechSynthesis.onvoiceschanged = loadChineseVoice;
}

function speakChinese(text, isHover = false) {
  if (!text) {
    return;
  }

  if (!("speechSynthesis" in window)) {
    if (!isHover) {
      alert("На этом устройстве автоматическая озвучка не поддерживается.");
    }
    return;
  }

  const now = Date.now();

  if (isHover && text === lastSpokenText && now - lastSpokenTime < 1200) {
    return;
  }

  lastSpokenText = text;
  lastSpokenTime = now;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.75;
  utterance.pitch = 1;

  if (selectedChineseVoice) {
    utterance.voice = selectedChineseVoice;
  }

  speechSynthesis.speak(utterance);
}

function speakFromElement(element, isHover = false) {
  const text = element.dataset.speak || element.textContent.trim();
  speakChinese(text, isHover);
}

function getSpeakableChinese(text, className = "") {
  return `
    <span
      class="${className} speakable-chinese"
      data-speak="${escapeHTML(text)}"
      onclick="speakFromElement(this)"
      onmouseenter="speakFromElement(this, true)"
    >
      ${escapeHTML(text)}
    </span>
  `;
}

function showWordInfoAndSpeak(element, wordId) {
  showWordInfo(wordId);
  speakFromElement(element);
}



// =====================================================
// БЛОК 1: УЧИТЬ СЛОВА — живая доска иероглифов
// =====================================================

function renderCard() {
  const box = document.getElementById("cardBox");
  const boardWords = getStudyBoardWords();
  const boardPhrase = getBoardSuggestionPhrase(boardWords);

  if (!boardWords.length) {
    box.innerHTML = `
      <div class="study-card">
        <h3>Пока нет новых слов для живой доски</h3>
        <p class="muted">
          Все новые слова уже перешли в изучение или повторение. Добавь новые слова в словарь
          или перемести нужные слова обратно в категорию “новые”.
        </p>
      </div>
    `;
    return;
  }

  box.innerHTML = `
    <div class="word-board-wrap">
      ${renderBoardPhraseCard(boardPhrase)}

      <div class="board-header">
        <h3>Живая доска новых иероглифов</h3>
        <p class="muted">
          На доске появляются только новые слова. Один клик — озвучить и открыть значение.
          Двойной клик или ✎ — перейти к письму; после этого слово уйдёт в “изучаются”.
        </p>
      </div>

      <div id="floatingWordBoard" class="floating-word-board">
        ${boardWords.map((word, index) => {
          const position = boardPositions[index % boardPositions.length];
          const item = getProgress(word.id);

          return `
            <div
              class="floating-tile status-${item.status}"
              style="
                top: ${position.top}%;
                left: ${position.left}%;
                transform: translate(-50%, -50%) rotate(${position.rotate}deg);
              "
              data-word-id="${escapeHTML(word.id)}"
              data-speak="${escapeHTML(word.chinese)}"
              onclick="handleBoardTileClick(this)"
              ondblclick="moveBoardWordToWriting(event, '${escapeHTML(word.id)}')"
            >
              <div class="tile-hanzi">${escapeHTML(word.chinese)}</div>

              <div class="tile-popup">
                <button
                  class="tile-write-button"
                  onclick="moveBoardWordToWriting(event, '${escapeHTML(word.id)}')"
                  title="Писать иероглиф"
                  aria-label="Писать иероглиф"
                >
                  ✎
                </button>

                <div class="popup-chinese">${escapeHTML(word.chinese)}</div>
                <div class="popup-pinyin">${escapeHTML(word.pinyin)}</div>
                <div class="popup-meaning">${escapeHTML(word.meaning)}</div>
                <div class="popup-meta">
                  ${statusLabel(item.status)} · mastery ${item.mastery}/5
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function openBoardTile(element) {
  document.querySelectorAll(".floating-tile.open").forEach(tile => {
    if (tile !== element) {
      tile.classList.remove("open");
    }
  });

  element.classList.add("open");
}

function handleBoardTileClick(element) {
  if (boardClickTimer) {
    clearTimeout(boardClickTimer);
  }

  boardClickTimer = setTimeout(function() {
    openBoardTile(element);
    speakFromElement(element);
  }, 220);
}

function moveBoardWordToWriting(event, wordId) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  if (boardClickTimer) {
    clearTimeout(boardClickTimer);
    boardClickTimer = null;
  }

  const item = getProgress(wordId);
  item.status = "learning";
  item.mastery = Math.max(item.mastery, 1);
  saveProgress();
  renderStats();

  openWritingForWord(wordId);
}

function getStudyBoardWords() {
  const words = getAllWords();
  const newWords = shuffle(words.filter(word => getProgress(word.id).status === "new"));

  return newWords.slice(0, 10);
}

function getBoardSuggestionPhrase(boardWords) {
  const phrases = getAllPhrases()
    .map(normalizePhrase)
    .filter(phrase => phrase.tokens.length);

  if (!phrases.length) return null;

  const boardWordIds = new Set(boardWords.map(word => word.id));
  const connectedPhrases = phrases.filter(phrase =>
    phrase.tokens.some(token => token.wordId && boardWordIds.has(token.wordId))
  );

  if (
    currentBoardPhrase &&
    phrases.some(phrase => phrase.id === currentBoardPhrase.id)
  ) {
    return currentBoardPhrase;
  }

  currentBoardPhrase = chooseRandom(connectedPhrases.length ? connectedPhrases : phrases);
  return currentBoardPhrase;
}

function nextBoardPhrase() {
  currentBoardPhrase = null;
  renderCard();
}

function getPhraseChineseText(phrase) {
  if (!phrase) return "";

  const normalized = normalizePhrase(phrase);

  return normalized.tokens.map(token => {
    if (token.text) return token.text;

    const word = getWordById(token.wordId);
    return word ? word.chinese : "";
  }).join("");
}

function renderBoardPhraseCard(phrase) {
  if (!phrase) {
    return `
      <div class="board-phrase-card">
        <p class="muted">Пока нет готовых предложений в phrases.js.</p>
      </div>
    `;
  }

  const chineseText = getPhraseChineseText(phrase);

  return `
    <div class="board-phrase-card">
      <div class="board-phrase-topline">
        <span class="meta">Предложение дня</span>
        <button
          class="secondary small-button"
          type="button"
          onclick="nextBoardPhrase()"
        >
          Другое
        </button>
      </div>

      <div
        class="board-phrase-chinese"
        data-speak="${escapeHTML(chineseText)}"
        onclick="speakFromElement(this)"
        title="Нажми, чтобы прослушать предложение"
      >
        ${escapeHTML(chineseText)}
      </div>

      <div id="boardPhraseTranslation" class="board-phrase-translation hidden">
        ${escapeHTML(phrase.translation || "Перевод пока не добавлен.")}
      </div>

      <div class="board-phrase-actions">
        <button
          type="button"
          onclick="speakChinese('${escapeForInline(chineseText)}')"
        >
          Прослушать всё предложение
        </button>

        <button
          class="secondary icon-action-button"
          type="button"
          onclick="openBoardPhraseInSentence()"
          title="Построить это предложение"
          aria-label="Построить это предложение"
        >
          🧩
        </button>

        <button
          class="secondary small-button"
          type="button"
          onclick="toggleBoardPhraseTranslation()"
        >
          Показать перевод
        </button>
      </div>
    </div>
  `;
}

function toggleBoardPhraseTranslation() {
  const box = document.getElementById("boardPhraseTranslation");
  if (!box) return;

  box.classList.toggle("hidden");
}

function openBoardPhraseInSentence() {
  const phrase = currentBoardPhrase || getBoardSuggestionPhrase(getStudyBoardWords());

  if (!phrase) {
    alert("Пока нет предложения для тренировки.");
    return;
  }

  currentPhrase = normalizePhrase(phrase);
  selectedBankIndexes = [];
  sentenceAnswer = [];
  currentMemoryExercise = "sentence";

  showMode("sentences");
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
// БЛОК 2: ПИСАТЬ ИЕРОГЛИФЫ — Hanzi Writer
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
    ${getSpeakableChinese(word.chinese, "writing-main-chinese")}
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
      data-speak="${escapeHTML(character)}"
      onclick="selectWritingCharacter(${index}); speakFromElement(this)"
      onmouseenter="speakFromElement(this, true)"
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
    showOutline: false,
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
// БЛОК 3: ЗАПОМИНАНИЕ — упражнения памяти
// =====================================================

function setMemoryExercise(exerciseName) {
  currentMemoryExercise = exerciseName;
  renderMemory();
}

function renderMemory() {
  document.querySelectorAll(".memory-exercise").forEach(section => section.classList.add("hidden"));
  document.querySelectorAll(".memory-tabs button").forEach(button => button.classList.remove("active"));

  const section = document.getElementById("memoryExercise" + capitalizeFirst(currentMemoryExercise));
  const tab = document.getElementById("memory-tab-" + currentMemoryExercise);

  if (section) section.classList.remove("hidden");
  if (tab) tab.classList.add("active");

  if (currentMemoryExercise === "sentence") {
    if (!currentPhrase) nextPhrase();
    else renderSentence();
  }

  if (currentMemoryExercise === "match") {
    if (!currentMatchTask) nextMatchExercise();
    else renderMatchExercise();
  }

  if (currentMemoryExercise === "recall") {
    if (!currentRecallTask) nextRecallExercise();
    else renderRecallExercise();
  }

  if (currentMemoryExercise === "draw") {
    if (!currentDrawTask) nextDrawExercise();
    else renderDrawExercise();
  }
}

function capitalizeFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getMemoryWords() {
  const words = getAllWords();
  const learning = words.filter(word => {
    const status = getProgress(word.id).status;
    return status === "learning" || status === "review";
  });

  return learning.length >= 4 ? learning : words;
}

function markMemorySuccess(wordId) {
  const item = getProgress(wordId);
  item.mastery = Math.min(5, item.mastery + 1);
  updateStatus(wordId);
  renderStats();
}

function markMemoryMistake(wordId) {
  const item = getProgress(wordId);
  item.wrongCount += 1;
  item.mastery = Math.max(1, item.mastery);
  updateStatus(wordId);
  renderStats();
}

function sendWordBackToNew(wordId) {
  const item = getProgress(wordId);
  item.status = "new";
  item.mastery = 0;
  item.cardDone = false;
  item.writingDone = false;
  item.sentenceDone = false;
  item.wrongCount += 1;
  saveProgress();
  renderStats();
}

// ---------- A) Подбор слов: соединить иероглифы с переводами ----------

function nextMatchExercise() {
  const words = shuffle(getMemoryWords()).slice(0, 5);

  if (words.length < 2) {
    currentMatchTask = null;
    renderMatchExercise();
    return;
  }

  currentMatchTask = {
    pairs: words.map(word => ({
      id: word.id,
      chinese: word.chinese,
      meaning: word.meaning,
      matched: false
    })),
    meaningOrder: shuffle(words.map(word => word.id)),
    chineseOrder: shuffle(words.map(word => word.id)),
    selectedMeaningId: null,
    selectedChineseId: null
  };

  renderMatchExercise();
}

function renderMatchExercise() {
  const taskBox = document.getElementById("matchTaskBox");
  const board = document.getElementById("matchOptionsBox");
  const message = document.getElementById("matchMessage");

  if (!taskBox || !board || !message) return;

  if (!currentMatchTask) {
    taskBox.innerHTML = `<p class="muted">Недостаточно слов для упражнения.</p>`;
    board.innerHTML = "";
    return;
  }

  taskBox.innerHTML = `
    <div class="memory-question">Соедини пары</div>
    <p class="muted">
      Слева — переводы. Справа — китайские слова. Нажми перевод и соответствующий иероглиф.
    </p>
  `;

  board.innerHTML = `
    <div class="match-column">
      <h3>Переводы</h3>
      ${currentMatchTask.meaningOrder.map(wordId => renderMatchMeaningButton(wordId)).join("")}
    </div>

    <div class="match-column">
      <h3>Иероглифы</h3>
      ${currentMatchTask.chineseOrder.map(wordId => renderMatchChineseButton(wordId)).join("")}
    </div>
  `;

  message.textContent = "";
  message.className = "message";
}

function renderMatchMeaningButton(wordId) {
  const pair = getMatchPair(wordId);
  if (!pair) return "";

  const classes = [
    "match-card",
    "meaning-card",
    pair.matched ? "matched" : "",
    currentMatchTask.selectedMeaningId === wordId ? "selected" : ""
  ].filter(Boolean).join(" ");

  return `
    <button
      class="${classes}"
      onclick="selectMatchMeaning('${escapeHTML(wordId)}')"
      ${pair.matched ? "disabled" : ""}
    >
      ${escapeHTML(pair.meaning)}
    </button>
  `;
}

function renderMatchChineseButton(wordId) {
  const pair = getMatchPair(wordId);
  if (!pair) return "";

  const classes = [
    "match-card",
    "chinese-card",
    pair.matched ? "matched" : "",
    currentMatchTask.selectedChineseId === wordId ? "selected" : ""
  ].filter(Boolean).join(" ");

  return `
    <button
      class="${classes}"
      data-speak="${escapeHTML(pair.chinese)}"
      onclick="speakFromElement(this); selectMatchChinese('${escapeHTML(wordId)}')"
      onmouseenter="speakFromElement(this, true)"
      ${pair.matched ? "disabled" : ""}
    >
      ${escapeHTML(pair.chinese)}
    </button>
  `;
}

function getMatchPair(wordId) {
  if (!currentMatchTask) return null;
  return currentMatchTask.pairs.find(pair => pair.id === wordId);
}

function selectMatchMeaning(wordId) {
  if (!currentMatchTask) return;

  const pair = getMatchPair(wordId);
  if (!pair || pair.matched) return;

  currentMatchTask.selectedMeaningId = wordId;
  checkMatchPairIfReady();
}

function selectMatchChinese(wordId) {
  if (!currentMatchTask) return;

  const pair = getMatchPair(wordId);
  if (!pair || pair.matched) return;

  currentMatchTask.selectedChineseId = wordId;
  checkMatchPairIfReady();
}

function checkMatchPairIfReady() {
  const message = document.getElementById("matchMessage");
  if (!currentMatchTask || !message) return;

  const meaningId = currentMatchTask.selectedMeaningId;
  const chineseId = currentMatchTask.selectedChineseId;

  if (!meaningId || !chineseId) {
    renderMatchExercise();
    return;
  }

  if (meaningId === chineseId) {
    const pair = getMatchPair(chineseId);
    pair.matched = true;

    markMemorySuccess(chineseId);

    currentMatchTask.selectedMeaningId = null;
    currentMatchTask.selectedChineseId = null;

    renderMatchExercise();

    const allMatched = currentMatchTask.pairs.every(item => item.matched);

    if (allMatched) {
      message.innerHTML = `
        <div class="reward-box">
          <div class="reward-stars">✨ ✨ ✨</div>
          <strong>Все пары собраны правильно.</strong>
          <p>Отличная память: слова остаются в обучении и становятся сильнее.</p>
        </div>
      `;
      message.className = "message ok";
      setTimeout(nextMatchExercise, 850);
    } else {
      message.textContent = "Правильно. Продолжай.";
      message.className = "message ok";
    }

    return;
  }

  sendWordBackToNew(chineseId);
  sendWordBackToNew(meaningId);

  const correctPair = getMatchPair(chineseId);

  message.textContent = `Не совпало. Для ${correctPair.chinese} правильный перевод: ${correctPair.meaning}`;
  message.className = "message error";

  setTimeout(function() {
    if (!currentMatchTask) return;
    currentMatchTask.selectedMeaningId = null;
    currentMatchTask.selectedChineseId = null;
    renderMatchExercise();
  }, 950);
}

// ---------- B) Вспомнить иероглиф / pinyin ----------

function nextRecallExercise() {
  const words = getMemoryWords();

  if (!words.length) {
    currentRecallTask = null;
    renderRecallExercise();
    return;
  }

  const word = chooseRandom(words);
  const taskTypes = ["meaningToChinese", "chineseToPinyin"];
  const taskType = chooseRandom(taskTypes);

  currentRecallTask = {
    word,
    taskType
  };

  renderRecallExercise();
}

function renderRecallExercise() {
  const taskBox = document.getElementById("recallTaskBox");
  const input = document.getElementById("recallInput");
  const message = document.getElementById("recallMessage");

  if (!taskBox || !input || !message) return;

  input.value = "";
  message.textContent = "";
  message.className = "message";

  if (!currentRecallTask) {
    taskBox.innerHTML = `<p class="muted">Нет слов для упражнения.</p>`;
    return;
  }

  const { word, taskType } = currentRecallTask;

  if (taskType === "meaningToChinese") {
    taskBox.innerHTML = `
      <div class="memory-question">${escapeHTML(word.meaning)}</div>
      <p class="muted">Введи китайский иероглиф или слово вручную. Звук здесь отключён.</p>
    `;
    input.placeholder = "Например: 我";
  }

  if (taskType === "chineseToPinyin") {
    taskBox.innerHTML = `
      <div class="memory-question memory-question-chinese-no-sound">${escapeHTML(word.chinese)}</div>
      <p class="muted">Введи pinyin. Звук здесь отключён, чтобы ты вспоминала сама.</p>
    `;
    input.placeholder = "Например: ni hao";
  }

  input.focus();
}

function checkRecallAnswer() {
  const input = document.getElementById("recallInput");
  const message = document.getElementById("recallMessage");

  if (!currentRecallTask || !input || !message) return;

  const answer = input.value.trim();
  const { word, taskType } = currentRecallTask;

  let correct = false;
  let correctAnswer = "";

  if (taskType === "meaningToChinese") {
    correctAnswer = word.chinese;
    correct = answer === word.chinese;
  }

  if (taskType === "chineseToPinyin") {
    correctAnswer = word.pinyin;
    correct = normalizePinyinAnswer(answer) === normalizePinyinAnswer(word.pinyin);
  }

  if (correct) {
    markMemorySuccess(word.id);
    message.textContent = "Правильно.";
    message.className = "message ok";
    setTimeout(nextRecallExercise, 650);
    return;
  }

  markMemoryMistake(word.id);
  message.textContent = `Пока неправильно. Правильный ответ: ${correctAnswer}`;
  message.className = "message error";
}

function normalizePinyinAnswer(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("ü", "u")
    .replace(/\s+/g, "")
    .trim();
}

// ---------- C) Нарисовать без подсказок ----------

function nextDrawExercise() {
  const words = getMemoryWords().filter(word => getCharactersFromWord(word).length > 0);

  if (!words.length) {
    currentDrawTask = null;
    renderDrawExercise();
    return;
  }

  const word = chooseRandom(words);
  const characters = getCharactersFromWord(word);
  const character = chooseRandom(characters);

  currentDrawTask = {
    word,
    character
  };

  renderDrawExercise();
}

function renderDrawExercise() {
  const taskBox = document.getElementById("drawTaskBox");
  const target = document.getElementById("memoryHanziTarget");
  const message = document.getElementById("drawMessage");

  if (!taskBox || !target || !message) return;

  target.innerHTML = "";
  memoryHanziWriter = null;
  message.textContent = "";
  message.className = "message";

  if (!currentDrawTask) {
    taskBox.innerHTML = `<p class="muted">Нет иероглифов для письма.</p>`;
    target.innerHTML = "";
    return;
  }

  taskBox.innerHTML = `
    <div class="memory-question">${escapeHTML(currentDrawTask.word.meaning)}</div>
    <p class="muted">
      Pinyin: ${escapeHTML(currentDrawTask.word.pinyin)}.
      Вспомни нужный иероглиф и напиши его без контура.
    </p>
  `;

  loadMemoryHanziWriter();
}

function loadMemoryHanziWriter() {
  const target = document.getElementById("memoryHanziTarget");
  const message = document.getElementById("drawMessage");

  if (!target || !currentDrawTask) return;

  target.innerHTML = "";
  memoryHanziWriter = null;

  if (typeof HanziWriter === "undefined") {
    message.textContent = "Hanzi Writer не загрузился. Проверь интернет.";
    message.className = "message error";
    return;
  }

  const size = Math.min(340, Math.max(260, target.clientWidth || 320));

  target.style.width = size + "px";
  target.style.height = size + "px";

  memoryHanziWriter = HanziWriter.create("memoryHanziTarget", currentDrawTask.character, {
    width: size,
    height: size,
    padding: 24,
    showOutline: false,
    showCharacter: false,
    strokeAnimationSpeed: 1,
    delayBetweenStrokes: 180,
    drawingWidth: 34,
    radicalColor: "#6f3fd8",

    onLoadCharDataSuccess: function() {
      startMemoryDrawQuiz();
    },

    onLoadCharDataError: function() {
      message.textContent = `Не удалось загрузить данные для иероглифа.`;
      message.className = "message error";
    }
  });
}

function startMemoryDrawQuiz() {
  const message = document.getElementById("drawMessage");

  if (!memoryHanziWriter || !currentDrawTask) {
    if (message) {
      message.textContent = "Сначала выбери задание.";
      message.className = "message error";
    }
    return;
  }

  message.textContent = "Пиши иероглиф. Приложение проверит черты.";
  message.className = "message";

  memoryHanziWriter.quiz({
    showHintAfterMisses: 3,
    leniency: 1,

    onCorrectStroke: function() {
      message.textContent = "Правильно. Продолжай.";
      message.className = "message ok";
    },

    onMistake: function(strokeData) {
      message.textContent = `Ошибка в этой черте. Ошибок: ${strokeData.totalMistakes}`;
      message.className = "message error";
    },

    onComplete: function(summaryData) {
      markMemorySuccess(currentDrawTask.word.id);
      message.textContent = `Готово. Иероглиф был: ${currentDrawTask.character}. Ошибок: ${summaryData.totalMistakes}`;
      message.className = "message ok";
    }
  });
}

function escapeForInline(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll("\n", "\\n")
    .replaceAll("\r", "");
}


// ---------- БЛОК 3A: Запоминание / строить предложения ----------

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
  const translationBox = document.getElementById("sentenceTranslationBox");
  const message = document.getElementById("sentenceMessage");
  const infoBox = document.getElementById("wordInfoBox");

  if (!currentPhrase) {
    source.textContent = "Нет доступных фраз";
    phraseText.innerHTML = "";
    prompt.innerHTML = "Проверь phrases.js: фразы должны ссылаться на слова из dictionary.js.";
    if (translationBox) translationBox.innerHTML = "";
    renderSentenceBuild();
    renderWordBank();
    return;
  }

  source.textContent = currentPhrase.source === "custom" ? "Личная фраза" : "Готовая фраза из phrases.js";

  phraseText.innerHTML = `
    <div class="sentence-hidden-source">
      Правильная китайская фраза скрыта. Сначала попробуй собрать её сама.
      <button class="secondary small-button" onclick="revealCorrectSentence()">Показать фразу</button>
    </div>
  `;

  prompt.innerHTML = `
    <div class="memory-question">Построй предложение из слов</div>
    <p class="muted">
      Перевод скрыт. Сначала попробуй вспомнить смысл и порядок слов.
    </p>
    <button class="secondary small-button" onclick="revealSentenceTranslation()">Показать перевод</button>
  `;

  if (translationBox) {
    translationBox.classList.add("hidden");
    translationBox.innerHTML = `
      <strong>Перевод:</strong>
      ${escapeHTML(currentPhrase.translation || "Перевод пока не добавлен.")}
    `;
  }

  message.textContent = "";
  message.className = "message";

  if (!infoBox.innerHTML) infoBox.innerHTML = "";

  renderSentenceBuild();
  renderWordBank();
}

function revealSentenceTranslation() {
  const box = document.getElementById("sentenceTranslationBox");
  if (!box) return;

  box.classList.remove("hidden");
}

function revealCorrectSentence() {
  const box = document.getElementById("phraseText");
  if (!box || !currentPhrase) return;

  box.innerHTML = currentPhrase.tokens.map(token => {
    if (token.text) return `<span>${escapeHTML(token.text)}</span>`;

    const word = getWordById(token.wordId);
    if (!word) return "";

    const status = getProgress(word.id).status;
    return `
      <span
        class="phrase-token ${status}"
        data-speak="${escapeHTML(word.chinese)}"
        onclick="showWordInfo('${escapeHTML(word.id)}')"
      >
        ${escapeHTML(word.chinese)}
      </span>
    `;
  }).join("");
}

function showWordInfo(wordId) {
  const word = getWordById(wordId);
  if (!word) return;

  const item = getProgress(wordId);

  document.getElementById("wordInfoBox").innerHTML = `
    <div class="word-info-card">
      <div class="word-title-row">
        ${getSpeakableChinese(word.chinese, "chinese-big")}
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
    return `
      <span
        class="word-chip ${selected ? "selected" : ""}"
        onclick="addSentenceWord(${index})"
      >
        ${escapeHTML(wordText)}
      </span>
    `;
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

  build.innerHTML = sentenceAnswer.map((word, index) => `
    <span
      class="word-chip"
      onclick="removeSentenceWord(${index})"
      title="Нажми, чтобы убрать"
    >
      ${escapeHTML(word)}
    </span>
  `).join("");
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
    revealSentenceTranslation();
    revealCorrectSentence();
    message.textContent = "Правильно. Отлично: фраза собрана. Переходим к следующей.";
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
// БЛОК 4: СЛОВАРЬ
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
          ${getSpeakableChinese(word.chinese, "chinese")}
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

// =====================================================
// БЛОК 5: ПОНИМАНИЕ ТЕКСТА
// =====================================================

function getCurrentReadingText() {
  if (!readingTexts.length) return null;

  let text = readingTexts.find(item => item.id === currentReadingTextId);

  if (!text) {
    currentReadingTextId = readingTexts[0].id;
    text = readingTexts[0];
  }

  return text;
}

function clearReadingEditor() {
  const titleInput = document.getElementById("readingTitleInput");
  const textInput = document.getElementById("readingTextInput");
  const translationInput = document.getElementById("readingManualTranslationInput");
  const message = document.getElementById("readingMessage");

  if (titleInput) titleInput.value = "";
  if (textInput) textInput.value = "";
  if (translationInput) translationInput.value = "";

  if (message) {
    message.textContent = "";
    message.className = "message";
  }
}

function addReadingText() {
  const titleInput = document.getElementById("readingTitleInput");
  const textInput = document.getElementById("readingTextInput");
  const translationInput = document.getElementById("readingManualTranslationInput");
  const message = document.getElementById("readingMessage");

  const title = titleInput ? titleInput.value.trim() : "";
  const text = textInput ? textInput.value.trim() : "";
  const manualTranslation = translationInput ? translationInput.value.trim() : "";

  if (!text) {
    message.textContent = "Сначала вставь китайский текст.";
    message.className = "message error";
    return;
  }

  const item = {
    id: "reading_" + Date.now(),
    title: title || makeReadingTitle(text),
    text,
    manualTranslation,
    createdAt: new Date().toISOString()
  };

  readingTexts.unshift(item);
  currentReadingTextId = item.id;
  saveJSON(CUSTOM_TEXTS_KEY, readingTexts);

  clearReadingEditor();
  message.textContent = "Текст добавлен.";
  message.className = "message ok";

  renderReading();
}

function makeReadingTitle(text) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.slice(0, 18) + (compact.length > 18 ? "..." : "");
}

function selectReadingText(textId) {
  currentReadingTextId = textId;
  renderReading();
}

function deleteReadingText(textId) {
  const ok = confirm("Удалить этот текст?");
  if (!ok) return;

  readingTexts = readingTexts.filter(item => item.id !== textId);

  if (currentReadingTextId === textId) {
    currentReadingTextId = readingTexts.length ? readingTexts[0].id : null;
  }

  saveJSON(CUSTOM_TEXTS_KEY, readingTexts);
  renderReading();
}

function speakCurrentReadingText() {
  const item = getCurrentReadingText();

  if (!item) {
    alert("Сначала добавь или выбери текст.");
    return;
  }

  speakChinese(item.text);
}

function renderReading() {
  const list = document.getElementById("readingTextList");
  const title = document.getElementById("currentReadingTitle");
  const view = document.getElementById("readingTextView");
  const translation = document.getElementById("readingTranslationBox");
  const manual = document.getElementById("readingManualTranslationView");

  if (!list || !title || !view || !translation || !manual) return;

  if (!readingTexts.length) {
    list.innerHTML = `<p class="muted">Пока нет добавленных текстов.</p>`;
    title.textContent = "Текст не выбран";
    view.innerHTML = `<p class="muted">Добавь первый китайский текст слева.</p>`;
    translation.innerHTML = `<p class="muted">Здесь появятся найденные слова из словаря.</p>`;
    manual.innerHTML = `<p class="muted">Здесь появится твой перевод или заметки.</p>`;
    return;
  }

  list.innerHTML = readingTexts.map(item => `
    <div class="reading-list-item ${item.id === currentReadingTextId ? "active" : ""}">
      <button type="button" onclick="selectReadingText('${escapeHTML(item.id)}')">
        ${escapeHTML(item.title)}
      </button>
      <button class="small-danger" type="button" onclick="deleteReadingText('${escapeHTML(item.id)}')">×</button>
    </div>
  `).join("");

  const item = getCurrentReadingText();

  title.textContent = item.title;
  view.innerHTML = renderInteractiveReadingText(item.text);
  translation.innerHTML = renderReadingStudyTranslation(item.text);
  manual.innerHTML = item.manualTranslation
    ? `<p>${escapeHTML(item.manualTranslation).replaceAll("\n", "<br>")}</p>`
    : `<p class="muted">Ты не добавила свой перевод к этому тексту.</p>`;
}

function renderInteractiveReadingText(text) {
  return Array.from(text).map(character => {
    if (character === "\n") return "<br>";

    if (isChineseCharacter(character)) {
      const word = getWordByChinese(character);

      return `
        <span
          class="reading-char ${word ? "known" : ""}"
          data-speak="${escapeHTML(character)}"
          onclick="speakFromElement(this); showReadingCharacterInfo('${escapeHTML(character)}')"
          onmouseenter="speakFromElement(this, true)"
          title="${word ? escapeHTML(word.pinyin + " — " + word.meaning) : "Нажми, чтобы озвучить"}"
        >
          ${escapeHTML(character)}
        </span>
      `;
    }

    return escapeHTML(character);
  }).join("");
}

function showReadingCharacterInfo(character) {
  const box = document.getElementById("readingTranslationBox");
  const word = getWordByChinese(character);

  if (!box) return;

  if (!word) {
    box.innerHTML = `
      <div class="reading-character-card">
        <div class="popup-chinese">${escapeHTML(character)}</div>
        <p class="muted">Этого отдельного иероглифа пока нет в словаре.</p>
      </div>
      ${renderReadingStudyTranslation(getCurrentReadingText()?.text || "")}
    `;
    return;
  }

  box.innerHTML = `
    <div class="reading-character-card">
      <div class="word-title-row">
        ${getSpeakableChinese(word.chinese, "chinese-big")}
        ${getWritingShortcutButton(word.id)}
      </div>
      <div class="pinyin">${escapeHTML(word.pinyin)}</div>
      <div class="meaning">${escapeHTML(word.meaning)}</div>
      <p class="meta">type: ${escapeHTML(word.type)} · status: ${statusLabel(getProgress(word.id).status)}</p>
    </div>
    ${renderReadingStudyTranslation(getCurrentReadingText()?.text || "")}
  `;
}

function renderReadingStudyTranslation(text) {
  const matches = findKnownWordsInText(text);

  if (!matches.length) {
    return `
      <p class="muted">
        Учебный переводчик пока не нашёл знакомых слов. Добавь слова в словарь или попробуй другой текст.
      </p>
    `;
  }

  return `
    <div class="known-word-list">
      ${matches.map(word => `
        <div class="known-word-row">
          <div>
            ${getSpeakableChinese(word.chinese, "reading-known-word")}
            <span class="pinyin">${escapeHTML(word.pinyin)}</span>
          </div>
          <div>${escapeHTML(word.meaning)}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function findKnownWordsInText(text) {
  const words = getAllWords()
    .filter(word => word.chinese && text.includes(word.chinese))
    .sort((a, b) => b.chinese.length - a.chinese.length);

  const seen = new Set();
  const result = [];

  words.forEach(word => {
    if (seen.has(word.chinese)) return;
    seen.add(word.chinese);
    result.push(word);
  });

  return result.slice(0, 80);
}

// =====================================================
// ФИНАЛ: сброс, общий рендер, запуск приложения
// =====================================================

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
  if (currentMode === "sentences") renderMemory();
  if (currentMode === "reading") renderReading();
}

function boot() {
  renderAll();
  showMode("cards");
}

boot();
