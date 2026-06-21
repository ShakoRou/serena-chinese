// =====================================================
// Serena Chinese — dictionary.js
// =====================================================
//
// Этот файл — базовый словарь приложения.
// Здесь живут слова, которые приложение предлагает в уроках.
//
// Важно:
// - id должен быть уникальным. Это “паспорт” слова для кода.
// - chinese не должен повторяться, если это то же самое слово.
// - type пишем на английском: pronoun, verb, noun, adjective,
//   adverb, particle, question_word, number, time, phrase.
// - Старые id лучше не менять, иначе прогресс по словам может потерять связь.
//
// Как добавить новое слово:
// 1. Скопируй один блок { ... }.
// 2. Измени id, chinese, pinyin, meaning, type.
// 3. Не забудь запятую между словами.

window.SERENA_DICTIONARY = [
  // =====================================================
  // 1. PRONOUNS — местоимения
  // =====================================================

  {
    id: "wo",
    chinese: "我",
    pinyin: "wǒ",
    meaning: "я",
    level: 1,
    type: "pronoun"
  },
  {
    id: "ni",
    chinese: "你",
    pinyin: "nǐ",
    meaning: "ты",
    level: 1,
    type: "pronoun"
  },
  {
    id: "nin",
    chinese: "您",
    pinyin: "nín",
    meaning: "Вы / ты вежливо",
    level: 1,
    type: "pronoun"
  },
  {
    id: "ta_male",
    chinese: "他",
    pinyin: "tā",
    meaning: "он",
    level: 1,
    type: "pronoun"
  },
  {
    id: "ta_female",
    chinese: "她",
    pinyin: "tā",
    meaning: "она",
    level: 1,
    type: "pronoun"
  },
  {
    id: "women",
    chinese: "我们",
    pinyin: "wǒmen",
    meaning: "мы",
    level: 1,
    type: "pronoun"
  },
  {
    id: "nimen",
    chinese: "你们",
    pinyin: "nǐmen",
    meaning: "вы",
    level: 1,
    type: "pronoun"
  },
  {
    id: "tamen",
    chinese: "他们",
    pinyin: "tāmen",
    meaning: "они",
    level: 1,
    type: "pronoun"
  },

  // =====================================================
  // 2. GRAMMAR WORDS — частицы, служебные слова, частые наречия
  // =====================================================

  {
    id: "shi",
    chinese: "是",
    pinyin: "shì",
    meaning: "быть / являться",
    level: 1,
    type: "verb"
  },
  {
    id: "bu",
    chinese: "不",
    pinyin: "bù",
    meaning: "не / нет",
    level: 1,
    type: "particle"
  },
  {
    id: "mei",
    chinese: "没",
    pinyin: "méi",
    meaning: "не иметь / не было",
    level: 1,
    type: "particle"
  },
  {
    id: "ma",
    chinese: "吗",
    pinyin: "ma",
    meaning: "вопросительная частица",
    level: 1,
    type: "particle"
  },
  {
    id: "de",
    chinese: "的",
    pinyin: "de",
    meaning: "частица принадлежности / описания",
    level: 1,
    type: "particle"
  },
  {
    id: "le",
    chinese: "了",
    pinyin: "le",
    meaning: "частица завершённого действия",
    level: 1,
    type: "particle"
  },
  {
    id: "zai",
    chinese: "在",
    pinyin: "zài",
    meaning: "находиться / в / на",
    level: 1,
    type: "verb"
  },
  {
    id: "ye",
    chinese: "也",
    pinyin: "yě",
    meaning: "тоже / также",
    level: 1,
    type: "adverb"
  },
  {
    id: "dou",
    chinese: "都",
    pinyin: "dōu",
    meaning: "все / всё",
    level: 1,
    type: "adverb"
  },
  {
    id: "hen",
    chinese: "很",
    pinyin: "hěn",
    meaning: "очень",
    level: 1,
    type: "adverb"
  },

  // =====================================================
  // 3. QUESTION WORDS — вопросительные слова
  // =====================================================

  {
    id: "shenme",
    chinese: "什么",
    pinyin: "shénme",
    meaning: "что",
    level: 1,
    type: "question_word"
  },
  {
    id: "shei",
    chinese: "谁",
    pinyin: "shéi",
    meaning: "кто",
    level: 1,
    type: "question_word"
  },
  {
    id: "nali",
    chinese: "哪里",
    pinyin: "nǎlǐ",
    meaning: "где / куда",
    level: 1,
    type: "question_word"
  },
  {
    id: "zenme",
    chinese: "怎么",
    pinyin: "zěnme",
    meaning: "как",
    level: 1,
    type: "question_word"
  },
  {
    id: "weishenme",
    chinese: "为什么",
    pinyin: "wèishénme",
    meaning: "почему",
    level: 1,
    type: "question_word"
  },
  {
    id: "duoshao",
    chinese: "多少",
    pinyin: "duōshao",
    meaning: "сколько",
    level: 1,
    type: "question_word"
  },
  {
    id: "ji",
    chinese: "几",
    pinyin: "jǐ",
    meaning: "сколько / несколько",
    level: 1,
    type: "question_word"
  },

  // =====================================================
  // 4. NUMBERS — числа
  // =====================================================

  {
    id: "ling",
    chinese: "零",
    pinyin: "líng",
    meaning: "ноль",
    level: 1,
    type: "number"
  },
  {
    id: "yi",
    chinese: "一",
    pinyin: "yī",
    meaning: "один",
    level: 1,
    type: "number"
  },
  {
    id: "er",
    chinese: "二",
    pinyin: "èr",
    meaning: "два",
    level: 1,
    type: "number"
  },
  {
    id: "san",
    chinese: "三",
    pinyin: "sān",
    meaning: "три",
    level: 1,
    type: "number"
  },
  {
    id: "si",
    chinese: "四",
    pinyin: "sì",
    meaning: "четыре",
    level: 1,
    type: "number"
  },
  {
    id: "wu",
    chinese: "五",
    pinyin: "wǔ",
    meaning: "пять",
    level: 1,
    type: "number"
  },
  {
    id: "liu",
    chinese: "六",
    pinyin: "liù",
    meaning: "шесть",
    level: 1,
    type: "number"
  },
  {
    id: "qi",
    chinese: "七",
    pinyin: "qī",
    meaning: "семь",
    level: 1,
    type: "number"
  },
  {
    id: "ba_num",
    chinese: "八",
    pinyin: "bā",
    meaning: "восемь",
    level: 1,
    type: "number"
  },
  {
    id: "jiu",
    chinese: "九",
    pinyin: "jiǔ",
    meaning: "девять",
    level: 1,
    type: "number"
  },
  {
    id: "shi_num",
    chinese: "十",
    pinyin: "shí",
    meaning: "десять",
    level: 1,
    type: "number"
  },
  {
    id: "bai",
    chinese: "百",
    pinyin: "bǎi",
    meaning: "сто",
    level: 1,
    type: "number"
  },

  // =====================================================
  // 5. TIME WORDS — время
  // =====================================================

  {
    id: "jintian",
    chinese: "今天",
    pinyin: "jīntiān",
    meaning: "сегодня",
    level: 1,
    type: "time"
  },
  {
    id: "mingtian",
    chinese: "明天",
    pinyin: "míngtiān",
    meaning: "завтра",
    level: 1,
    type: "time"
  },
  {
    id: "zuotian",
    chinese: "昨天",
    pinyin: "zuótiān",
    meaning: "вчера",
    level: 1,
    type: "time"
  },
  {
    id: "xianzai",
    chinese: "现在",
    pinyin: "xiànzài",
    meaning: "сейчас",
    level: 1,
    type: "time"
  },
  {
    id: "shihou",
    chinese: "时候",
    pinyin: "shíhou",
    meaning: "время / момент",
    level: 1,
    type: "time"
  },
  {
    id: "tian_day",
    chinese: "天",
    pinyin: "tiān",
    meaning: "день / небо",
    level: 1,
    type: "time"
  },
  {
    id: "nian",
    chinese: "年",
    pinyin: "nián",
    meaning: "год",
    level: 1,
    type: "time"
  },
  {
    id: "yue",
    chinese: "月",
    pinyin: "yuè",
    meaning: "месяц / луна",
    level: 1,
    type: "time"
  },

  // =====================================================
  // 6. VERBS — глаголы
  // =====================================================

  {
    id: "you",
    chinese: "有",
    pinyin: "yǒu",
    meaning: "иметь / есть",
    level: 1,
    type: "verb"
  },
  {
    id: "yao",
    chinese: "要",
    pinyin: "yào",
    meaning: "хотеть / нужно",
    level: 1,
    type: "verb"
  },
  {
    id: "xiang",
    chinese: "想",
    pinyin: "xiǎng",
    meaning: "думать / хотеть",
    level: 1,
    type: "verb"
  },
  {
    id: "xihuan",
    chinese: "喜欢",
    pinyin: "xǐhuān",
    meaning: "нравиться / любить",
    level: 1,
    type: "verb"
  },
  {
    id: "ai",
    chinese: "爱",
    pinyin: "ài",
    meaning: "любить",
    level: 1,
    type: "verb"
  },
  {
    id: "kan",
    chinese: "看",
    pinyin: "kàn",
    meaning: "смотреть / читать",
    level: 1,
    type: "verb"
  },
  {
    id: "ting",
    chinese: "听",
    pinyin: "tīng",
    meaning: "слушать",
    level: 1,
    type: "verb"
  },
  {
    id: "shuo",
    chinese: "说",
    pinyin: "shuō",
    meaning: "говорить / сказать",
    level: 1,
    type: "verb"
  },
  {
    id: "du",
    chinese: "读",
    pinyin: "dú",
    meaning: "читать / учиться",
    level: 1,
    type: "verb"
  },
  {
    id: "xie",
    chinese: "写",
    pinyin: "xiě",
    meaning: "писать",
    level: 1,
    type: "verb"
  },
  {
    id: "qu",
    chinese: "去",
    pinyin: "qù",
    meaning: "идти / ехать",
    level: 1,
    type: "verb"
  },
  {
    id: "lai",
    chinese: "来",
    pinyin: "lái",
    meaning: "приходить / приезжать",
    level: 1,
    type: "verb"
  },
  {
    id: "hui_return",
    chinese: "回",
    pinyin: "huí",
    meaning: "возвращаться",
    level: 1,
    type: "verb"
  },
  {
    id: "hui_can",
    chinese: "会",
    pinyin: "huì",
    meaning: "уметь / мочь / будущее действие",
    level: 1,
    type: "verb"
  },
  {
    id: "neng",
    chinese: "能",
    pinyin: "néng",
    meaning: "мочь / быть способным",
    level: 1,
    type: "verb"
  },
  {
    id: "zuo_do",
    chinese: "做",
    pinyin: "zuò",
    meaning: "делать",
    level: 1,
    type: "verb"
  },
  {
    id: "zuo_sit",
    chinese: "坐",
    pinyin: "zuò",
    meaning: "сидеть",
    level: 1,
    type: "verb"
  },
  {
    id: "mai_buy",
    chinese: "买",
    pinyin: "mǎi",
    meaning: "покупать",
    level: 1,
    type: "verb"
  },
  {
    id: "chi",
    chinese: "吃",
    pinyin: "chī",
    meaning: "есть / кушать",
    level: 1,
    type: "verb"
  },
  {
    id: "he",
    chinese: "喝",
    pinyin: "hē",
    meaning: "пить",
    level: 1,
    type: "verb"
  },

  // =====================================================
  // 7. PEOPLE AND PLACES — люди и места
  // =====================================================

  {
    id: "ren",
    chinese: "人",
    pinyin: "rén",
    meaning: "человек",
    level: 1,
    type: "noun"
  },
  {
    id: "pengyou",
    chinese: "朋友",
    pinyin: "péngyou",
    meaning: "друг",
    level: 1,
    type: "noun"
  },
  {
    id: "mama",
    chinese: "妈妈",
    pinyin: "māma",
    meaning: "мама",
    level: 1,
    type: "noun"
  },
  {
    id: "baba",
    chinese: "爸爸",
    pinyin: "bàba",
    meaning: "папа",
    level: 1,
    type: "noun"
  },
  {
    id: "laoshi",
    chinese: "老师",
    pinyin: "lǎoshī",
    meaning: "учитель",
    level: 1,
    type: "noun"
  },
  {
    id: "xuesheng",
    chinese: "学生",
    pinyin: "xuésheng",
    meaning: "ученик / студент",
    level: 1,
    type: "noun"
  },
  {
    id: "jia",
    chinese: "家",
    pinyin: "jiā",
    meaning: "дом / семья",
    level: 1,
    type: "noun"
  },
  {
    id: "xuexiao",
    chinese: "学校",
    pinyin: "xuéxiào",
    meaning: "школа",
    level: 1,
    type: "noun"
  },

  // =====================================================
  // 8. FOOD AND DRINKS — еда и напитки
  // =====================================================

  {
    id: "shui",
    chinese: "水",
    pinyin: "shuǐ",
    meaning: "вода",
    level: 1,
    type: "noun"
  },
  {
    id: "cha",
    chinese: "茶",
    pinyin: "chá",
    meaning: "чай",
    level: 1,
    type: "noun"
  },
  {
    id: "fan",
    chinese: "饭",
    pinyin: "fàn",
    meaning: "еда / рис",
    level: 1,
    type: "noun"
  },
  {
    id: "mifan",
    chinese: "米饭",
    pinyin: "mǐfàn",
    meaning: "варёный рис",
    level: 1,
    type: "noun"
  },
  {
    id: "mian",
    chinese: "面",
    pinyin: "miàn",
    meaning: "лапша / мука / лицо",
    level: 1,
    type: "noun"
  },
  {
    id: "niunai",
    chinese: "牛奶",
    pinyin: "niúnǎi",
    meaning: "молоко",
    level: 1,
    type: "noun"
  },
  {
    id: "kafei",
    chinese: "咖啡",
    pinyin: "kāfēi",
    meaning: "кофе",
    level: 1,
    type: "noun"
  },

  // =====================================================
  // 9. ADJECTIVES — прилагательные
  // =====================================================

  {
    id: "hao",
    chinese: "好",
    pinyin: "hǎo",
    meaning: "хороший / хорошо",
    level: 1,
    type: "adjective"
  },
  {
    id: "da",
    chinese: "大",
    pinyin: "dà",
    meaning: "большой",
    level: 1,
    type: "adjective"
  },
  {
    id: "xiao",
    chinese: "小",
    pinyin: "xiǎo",
    meaning: "маленький",
    level: 1,
    type: "adjective"
  },
  {
    id: "duo",
    chinese: "多",
    pinyin: "duō",
    meaning: "много / многие",
    level: 1,
    type: "adjective"
  },
  {
    id: "shao",
    chinese: "少",
    pinyin: "shǎo",
    meaning: "мало / немного",
    level: 1,
    type: "adjective"
  },
  {
    id: "xin",
    chinese: "新",
    pinyin: "xīn",
    meaning: "новый",
    level: 1,
    type: "adjective"
  },
  {
    id: "lao",
    chinese: "老",
    pinyin: "lǎo",
    meaning: "старый",
    level: 1,
    type: "adjective"
  },
  {
    id: "kuai",
    chinese: "快",
    pinyin: "kuài",
    meaning: "быстрый / быстро",
    level: 1,
    type: "adjective"
  },
  {
    id: "man",
    chinese: "慢",
    pinyin: "màn",
    meaning: "медленный / медленно",
    level: 1,
    type: "adjective"
  },
  {
    id: "piaoliang",
    chinese: "漂亮",
    pinyin: "piàoliang",
    meaning: "красивый",
    level: 1,
    type: "adjective"
  },

  // =====================================================
  // 10. PHRASES — базовые фразы
  // =====================================================

  {
    id: "nihao",
    chinese: "你好",
    pinyin: "nǐ hǎo",
    meaning: "привет / здравствуйте",
    level: 1,
    type: "phrase"
  },
  {
    id: "xiexie",
    chinese: "谢谢",
    pinyin: "xièxie",
    meaning: "спасибо",
    level: 1,
    type: "phrase"
  },
  {
    id: "zaijian",
    chinese: "再见",
    pinyin: "zàijiàn",
    meaning: "до свидания",
    level: 1,
    type: "phrase"
  },
  {
    id: "duibuqi",
    chinese: "对不起",
    pinyin: "duìbuqǐ",
    meaning: "извините / прости",
    level: 1,
    type: "phrase"
  },
  {
    id: "meiguanxi",
    chinese: "没关系",
    pinyin: "méi guānxi",
    meaning: "ничего страшного / всё нормально",
    level: 1,
    type: "phrase"
  },
  {
    id: "qing",
    chinese: "请",
    pinyin: "qǐng",
    meaning: "пожалуйста / прошу",
    level: 1,
    type: "phrase"
  },
  {
    id: "bu_keqi",
    chinese: "不客气",
    pinyin: "bú kèqi",
    meaning: "не за что",
    level: 1,
    type: "phrase"
  },
  {
    id: "wo_ai_ni",
    chinese: "我爱你",
    pinyin: "wǒ ài nǐ",
    meaning: "я люблю тебя",
    level: 1,
    type: "phrase"
  },
  {
    id: "wo_bu_zhidao",
    chinese: "我不知道",
    pinyin: "wǒ bù zhīdào",
    meaning: "я не знаю",
    level: 1,
    type: "phrase"
  },
  {
    id: "duoshao_qian",
    chinese: "多少钱",
    pinyin: "duōshao qián",
    meaning: "сколько стоит / сколько денег",
    level: 1,
    type: "phrase"
  }
];
