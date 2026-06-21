// =====================================================
// Serena Chinese — phrases.js
// =====================================================
//
// Этот файл хранит готовые фразы для блока “Строить предложения”.
//
// dictionary.js = отдельные слова.
// phrases.js = готовые предложения из этих слов.
// index.html = приложение, которое всё показывает и проверяет.
//
// Важно:
// - wordId должен совпадать с id слова в dictionary.js.
// - text используется для знаков препинания: 。 или ？
// - bank — слова-кнопки для упражнения “собери фразу”.
// - translation — перевод всей фразы.
// - explanation — короткое объяснение грамматики.

window.SERENA_PHRASES = [
  // =====================================================
  // 1. GREETINGS AND BASIC POLITENESS — приветствия и вежливость
  // =====================================================
  {
      id: "p001",
      translation: "Привет / здравствуйте.",
      prompt: "Собери: Привет / здравствуйте.",
      tokens: [
        {
          wordId: "nihao"
        },
        {
          text: "。"
        }
      ],
      required: ["nihao"],
      correct: ["你好"],
      bank: ["你好"],
      explanation: "Базовое приветствие: 你好."
    },
  {
      id: "p002",
      translation: "Спасибо.",
      prompt: "Собери: Спасибо.",
      tokens: [
        {
          wordId: "xiexie"
        },
        {
          text: "。"
        }
      ],
      required: ["xiexie"],
      correct: ["谢谢"],
      bank: ["谢谢"],
      explanation: "Базовая фраза благодарности: 谢谢."
    },
  {
      id: "p003",
      translation: "До свидания.",
      prompt: "Собери: До свидания.",
      tokens: [
        {
          wordId: "zaijian"
        },
        {
          text: "。"
        }
      ],
      required: ["zaijian"],
      correct: ["再见"],
      bank: ["再见"],
      explanation: "Базовое прощание: 再见."
    },
  {
      id: "p004",
      translation: "Извините / прости.",
      prompt: "Собери: Извините / прости.",
      tokens: [
        {
          wordId: "duibuqi"
        },
        {
          text: "。"
        }
      ],
      required: ["duibuqi"],
      correct: ["对不起"],
      bank: ["对不起"],
      explanation: "Фраза извинения: 对不起."
    },
  {
      id: "p005",
      translation: "Ничего страшного / всё нормально.",
      prompt: "Собери: Ничего страшного / всё нормально.",
      tokens: [
        {
          wordId: "meiguanxi"
        },
        {
          text: "。"
        }
      ],
      required: ["meiguanxi"],
      correct: ["没关系"],
      bank: ["没关系"],
      explanation: "Ответ на извинение: 没关系."
    },
  {
      id: "p006",
      translation: "Не за что.",
      prompt: "Собери: Не за что.",
      tokens: [
        {
          wordId: "bu_keqi"
        },
        {
          text: "。"
        }
      ],
      required: ["bu_keqi"],
      correct: ["不客气"],
      bank: ["不客气"],
      explanation: "Ответ на спасибо: 不客气."
    },
  {
      id: "p007",
      translation: "Пожалуйста / прошу.",
      prompt: "Собери: Пожалуйста / прошу.",
      tokens: [
        {
          wordId: "qing"
        },
        {
          text: "。"
        }
      ],
      required: ["qing"],
      correct: ["请"],
      bank: ["请"],
      explanation: "请 — вежливое слово-просьба."
    },
  {
      id: "p008",
      translation: "Как ты? / Ты хороший?",
      prompt: "Собери: Как ты? / Ты хороший?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "hao"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "hao", "ma"],
      correct: ["你", "好", "吗"],
      bank: ["吗", "好", "你"],
      explanation: "吗 в конце делает фразу вопросом."
    },
  {
      id: "p009",
      translation: "У меня всё хорошо.",
      prompt: "Собери: У меня всё хорошо.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "hen"
        },
        {
          wordId: "hao"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "hen", "hao"],
      correct: ["我", "很", "好"],
      bank: ["好", "很", "我"],
      explanation: "很 часто ставится перед прилагательным: 很好."
    },
  {
      id: "p010",
      translation: "У меня тоже всё хорошо.",
      prompt: "Собери: У меня тоже всё хорошо.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "ye"
        },
        {
          wordId: "hen"
        },
        {
          wordId: "hao"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "ye", "hen", "hao"],
      correct: ["我", "也", "很", "好"],
      bank: ["好", "很", "也", "我"],
      explanation: "也 = тоже, 很好 = хорошо."
    },
  {
      id: "p011",
      translation: "Я люблю тебя.",
      prompt: "Собери: Я люблю тебя.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "ai"
        },
        {
          wordId: "ni"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "ai", "ni"],
      correct: ["我", "爱", "你"],
      bank: ["你", "爱", "我"],
      explanation: "Порядок: я + люблю + тебя."
    },
  {
      id: "p012",
      translation: "Я не знаю.",
      prompt: "Собери: Я не знаю.",
      tokens: [
        {
          wordId: "wo_bu_zhidao"
        },
        {
          text: "。"
        }
      ],
      required: ["wo_bu_zhidao"],
      correct: ["我不知道"],
      bank: ["我不知道"],
      explanation: "Готовая полезная фраза: 我不知道."
    },
  {
      id: "p013",
      translation: "Сколько стоит?",
      prompt: "Собери: Сколько стоит?",
      tokens: [
        {
          wordId: "duoshao_qian"
        },
        {
          text: "？"
        }
      ],
      required: ["duoshao_qian"],
      correct: ["多少钱"],
      bank: ["多少钱"],
      explanation: "Готовая фраза для покупок: 多少钱."
    },
  // =====================================================
  // 2. FOOD AND DRINKS — еда и напитки
  // =====================================================
,
  {
      id: "p014",
      translation: "Я хочу воду.",
      prompt: "Собери: Я хочу воду.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "yao"
        },
        {
          wordId: "shui"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "yao", "shui"],
      correct: ["我", "要", "水"],
      bank: ["水", "要", "我"],
      explanation: "要 может значить “хотеть”."
    },
  {
      id: "p015",
      translation: "Я хочу чай.",
      prompt: "Собери: Я хочу чай.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "yao"
        },
        {
          wordId: "cha"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "yao", "cha"],
      correct: ["我", "要", "茶"],
      bank: ["茶", "要", "我"],
      explanation: "要 + предмет = хотеть что-то."
    },
  {
      id: "p016",
      translation: "Я хочу кофе.",
      prompt: "Собери: Я хочу кофе.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "yao"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "yao", "kafei"],
      correct: ["我", "要", "咖啡"],
      bank: ["咖啡", "要", "我"],
      explanation: "我要咖啡 = я хочу кофе."
    },
  {
      id: "p017",
      translation: "Я хочу еду / рис.",
      prompt: "Собери: Я хочу еду / рис.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "yao"
        },
        {
          wordId: "fan"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "yao", "fan"],
      correct: ["我", "要", "饭"],
      bank: ["饭", "要", "我"],
      explanation: "饭 = еда или рис."
    },
  {
      id: "p018",
      translation: "Я пью воду.",
      prompt: "Собери: Я пью воду.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "he"
        },
        {
          wordId: "shui"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "he", "shui"],
      correct: ["我", "喝", "水"],
      bank: ["水", "喝", "我"],
      explanation: "Порядок: кто + действие + что."
    },
  {
      id: "p019",
      translation: "Я пью чай.",
      prompt: "Собери: Я пью чай.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "he"
        },
        {
          wordId: "cha"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "he", "cha"],
      correct: ["我", "喝", "茶"],
      bank: ["茶", "喝", "我"],
      explanation: "喝 = пить."
    },
  {
      id: "p020",
      translation: "Я пью кофе.",
      prompt: "Собери: Я пью кофе.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "he"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "he", "kafei"],
      correct: ["我", "喝", "咖啡"],
      bank: ["咖啡", "喝", "我"],
      explanation: "咖啡 = кофе."
    },
  {
      id: "p021",
      translation: "Я ем еду / рис.",
      prompt: "Собери: Я ем еду / рис.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "chi"
        },
        {
          wordId: "fan"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "chi", "fan"],
      correct: ["我", "吃", "饭"],
      bank: ["饭", "吃", "我"],
      explanation: "吃 = есть, 饭 = еда/рис."
    },
  {
      id: "p022",
      translation: "Я ем варёный рис.",
      prompt: "Собери: Я ем варёный рис.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "chi"
        },
        {
          wordId: "mifan"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "chi", "mifan"],
      correct: ["我", "吃", "米饭"],
      bank: ["米饭", "吃", "我"],
      explanation: "米饭 = варёный рис."
    },
  {
      id: "p023",
      translation: "Ты пьёшь воду?",
      prompt: "Собери: Ты пьёшь воду?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "he"
        },
        {
          wordId: "shui"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "he", "shui", "ma"],
      correct: ["你", "喝", "水", "吗"],
      bank: ["吗", "水", "喝", "你"],
      explanation: "吗 ставится в конце вопроса."
    },
  {
      id: "p024",
      translation: "Ты хочешь чай?",
      prompt: "Собери: Ты хочешь чай?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "yao"
        },
        {
          wordId: "cha"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "yao", "cha", "ma"],
      correct: ["你", "要", "茶", "吗"],
      bank: ["吗", "茶", "要", "你"],
      explanation: "要 = хотеть, 吗 = вопрос."
    },
  {
      id: "p025",
      translation: "Ты ешь? / Ты ешь еду?",
      prompt: "Собери: Ты ешь? / Ты ешь еду?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "chi"
        },
        {
          wordId: "fan"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "chi", "fan", "ma"],
      correct: ["你", "吃", "饭", "吗"],
      bank: ["吗", "饭", "吃", "你"],
      explanation: "你吃饭吗？ — очень частый бытовой вопрос."
    },
  {
      id: "p026",
      translation: "Он пьёт кофе.",
      prompt: "Собери: Он пьёт кофе.",
      tokens: [
        {
          wordId: "ta_male"
        },
        {
          wordId: "he"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["ta_male", "he", "kafei"],
      correct: ["他", "喝", "咖啡"],
      bank: ["咖啡", "喝", "他"],
      explanation: "他 = он."
    },
  {
      id: "p027",
      translation: "Она пьёт чай.",
      prompt: "Собери: Она пьёт чай.",
      tokens: [
        {
          wordId: "ta_female"
        },
        {
          wordId: "he"
        },
        {
          wordId: "cha"
        },
        {
          text: "。"
        }
      ],
      required: ["ta_female", "he", "cha"],
      correct: ["她", "喝", "茶"],
      bank: ["茶", "喝", "她"],
      explanation: "她 = она."
    },
  {
      id: "p028",
      translation: "Я не пью кофе.",
      prompt: "Собери: Я не пью кофе.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "bu"
        },
        {
          wordId: "he"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "bu", "he", "kafei"],
      correct: ["我", "不", "喝", "咖啡"],
      bank: ["咖啡", "喝", "不", "我"],
      explanation: "不 ставится перед глаголом."
    },
  {
      id: "p029",
      translation: "Я не ем лапшу.",
      prompt: "Собери: Я не ем лапшу.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "bu"
        },
        {
          wordId: "chi"
        },
        {
          wordId: "mian"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "bu", "chi", "mian"],
      correct: ["我", "不", "吃", "面"],
      bank: ["面", "吃", "不", "我"],
      explanation: "不吃 = не есть."
    },
  {
      id: "p030",
      translation: "Я люблю чай.",
      prompt: "Собери: Я люблю чай.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "xihuan"
        },
        {
          wordId: "cha"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "xihuan", "cha"],
      correct: ["我", "喜欢", "茶"],
      bank: ["茶", "喜欢", "我"],
      explanation: "喜欢 = нравиться / любить."
    },
  {
      id: "p031",
      translation: "Я люблю кофе.",
      prompt: "Собери: Я люблю кофе.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "xihuan"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "xihuan", "kafei"],
      correct: ["我", "喜欢", "咖啡"],
      bank: ["咖啡", "喜欢", "我"],
      explanation: "喜欢 + предмет = нравится что-то."
    },
  {
      id: "p032",
      translation: "Я люблю варёный рис.",
      prompt: "Собери: Я люблю варёный рис.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "xihuan"
        },
        {
          wordId: "mifan"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "xihuan", "mifan"],
      correct: ["我", "喜欢", "米饭"],
      bank: ["米饭", "喜欢", "我"],
      explanation: "Можно говорить 我喜欢米饭."
    },
  {
      id: "p033",
      translation: "Я не люблю кофе.",
      prompt: "Собери: Я не люблю кофе.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "bu"
        },
        {
          wordId: "xihuan"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "bu", "xihuan", "kafei"],
      correct: ["我", "不", "喜欢", "咖啡"],
      bank: ["咖啡", "喜欢", "不", "我"],
      explanation: "不喜欢 = не нравится."
    },
  {
      id: "p034",
      translation: "Я люблю тебя.",
      prompt: "Собери: Я люблю тебя.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "ai"
        },
        {
          wordId: "ni"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "ai", "ni"],
      correct: ["我", "爱", "你"],
      bank: ["你", "爱", "我"],
      explanation: "爱 сильнее, чем 喜欢."
    },
  {
      id: "p035",
      translation: "У меня нет кофе.",
      prompt: "Собери: У меня нет кофе.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "mei"
        },
        {
          wordId: "you"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "mei", "you", "kafei"],
      correct: ["我", "没", "有", "咖啡"],
      bank: ["咖啡", "有", "没", "我"],
      explanation: "没有 = не иметь / нет."
    },
  // =====================================================
  // 3. IDENTITY AND PLACES — люди, школа, дом
  // =====================================================
,
  {
      id: "p036",
      translation: "Я студент / ученица.",
      prompt: "Собери: Я студент / ученица.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "xuesheng"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "shi", "xuesheng"],
      correct: ["我", "是", "学生"],
      bank: ["学生", "是", "我"],
      explanation: "是 связывает предмет и описание."
    },
  {
      id: "p037",
      translation: "Ты учитель?",
      prompt: "Собери: Ты учитель?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "laoshi"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "shi", "laoshi", "ma"],
      correct: ["你", "是", "老师", "吗"],
      bank: ["吗", "老师", "是", "你"],
      explanation: "是 + существительное, 吗 = вопрос."
    },
  {
      id: "p038",
      translation: "Он учитель.",
      prompt: "Собери: Он учитель.",
      tokens: [
        {
          wordId: "ta_male"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "laoshi"
        },
        {
          text: "。"
        }
      ],
      required: ["ta_male", "shi", "laoshi"],
      correct: ["他", "是", "老师"],
      bank: ["老师", "是", "他"],
      explanation: "他是老师。"
    },
  {
      id: "p039",
      translation: "Она студентка / ученица.",
      prompt: "Собери: Она студентка / ученица.",
      tokens: [
        {
          wordId: "ta_female"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "xuesheng"
        },
        {
          text: "。"
        }
      ],
      required: ["ta_female", "shi", "xuesheng"],
      correct: ["她", "是", "学生"],
      bank: ["学生", "是", "她"],
      explanation: "她是学生。"
    },
  {
      id: "p040",
      translation: "Мы друзья.",
      prompt: "Собери: Мы друзья.",
      tokens: [
        {
          wordId: "women"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "pengyou"
        },
        {
          text: "。"
        }
      ],
      required: ["women", "shi", "pengyou"],
      correct: ["我们", "是", "朋友"],
      bank: ["朋友", "是", "我们"],
      explanation: "我们是朋友。"
    },
  {
      id: "p041",
      translation: "Вы студенты / ученики.",
      prompt: "Собери: Вы студенты / ученики.",
      tokens: [
        {
          wordId: "nimen"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "xuesheng"
        },
        {
          text: "。"
        }
      ],
      required: ["nimen", "shi", "xuesheng"],
      correct: ["你们", "是", "学生"],
      bank: ["学生", "是", "你们"],
      explanation: "你们 = вы."
    },
  {
      id: "p042",
      translation: "Они учителя.",
      prompt: "Собери: Они учителя.",
      tokens: [
        {
          wordId: "tamen"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "laoshi"
        },
        {
          text: "。"
        }
      ],
      required: ["tamen", "shi", "laoshi"],
      correct: ["他们", "是", "老师"],
      bank: ["老师", "是", "他们"],
      explanation: "他们 = они."
    },
  {
      id: "p043",
      translation: "Я дома.",
      prompt: "Собери: Я дома.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "jia"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "zai", "jia"],
      correct: ["我", "在", "家"],
      bank: ["家", "在", "我"],
      explanation: "在 = находиться в/на."
    },
  {
      id: "p044",
      translation: "Я в школе.",
      prompt: "Собери: Я в школе.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "zai", "xuexiao"],
      correct: ["我", "在", "学校"],
      bank: ["学校", "在", "我"],
      explanation: "在学校 = в школе."
    },
  {
      id: "p045",
      translation: "Учитель в школе.",
      prompt: "Собери: Учитель в школе.",
      tokens: [
        {
          wordId: "laoshi"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["laoshi", "zai", "xuexiao"],
      correct: ["老师", "在", "学校"],
      bank: ["学校", "在", "老师"],
      explanation: "Место часто идёт после 在."
    },
  {
      id: "p046",
      translation: "Студент в школе.",
      prompt: "Собери: Студент в школе.",
      tokens: [
        {
          wordId: "xuesheng"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["xuesheng", "zai", "xuexiao"],
      correct: ["学生", "在", "学校"],
      bank: ["学校", "在", "学生"],
      explanation: "学生在学校。"
    },
  {
      id: "p047",
      translation: "Мама дома.",
      prompt: "Собери: Мама дома.",
      tokens: [
        {
          wordId: "mama"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "jia"
        },
        {
          text: "。"
        }
      ],
      required: ["mama", "zai", "jia"],
      correct: ["妈妈", "在", "家"],
      bank: ["家", "在", "妈妈"],
      explanation: "妈妈在家。"
    },
  {
      id: "p048",
      translation: "Папа дома.",
      prompt: "Собери: Папа дома.",
      tokens: [
        {
          wordId: "baba"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "jia"
        },
        {
          text: "。"
        }
      ],
      required: ["baba", "zai", "jia"],
      correct: ["爸爸", "在", "家"],
      bank: ["家", "在", "爸爸"],
      explanation: "爸爸在家。"
    },
  {
      id: "p049",
      translation: "Друг в школе.",
      prompt: "Собери: Друг в школе.",
      tokens: [
        {
          wordId: "pengyou"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["pengyou", "zai", "xuexiao"],
      correct: ["朋友", "在", "学校"],
      bank: ["学校", "在", "朋友"],
      explanation: "朋友在学校。"
    },
  {
      id: "p050",
      translation: "Ты где?",
      prompt: "Собери: Ты где?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "nali"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "zai", "nali"],
      correct: ["你", "在", "哪里"],
      bank: ["哪里", "在", "你"],
      explanation: "哪里 = где / куда."
    },
  {
      id: "p051",
      translation: "Он где?",
      prompt: "Собери: Он где?",
      tokens: [
        {
          wordId: "ta_male"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "nali"
        },
        {
          text: "？"
        }
      ],
      required: ["ta_male", "zai", "nali"],
      correct: ["他", "在", "哪里"],
      bank: ["哪里", "在", "他"],
      explanation: "他在哪里？"
    },
  {
      id: "p052",
      translation: "Кто дома?",
      prompt: "Собери: Кто дома?",
      tokens: [
        {
          wordId: "shei"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "jia"
        },
        {
          text: "？"
        }
      ],
      required: ["shei", "zai", "jia"],
      correct: ["谁", "在", "家"],
      bank: ["家", "在", "谁"],
      explanation: "谁 = кто."
    },
  {
      id: "p053",
      translation: "Кто учитель?",
      prompt: "Собери: Кто учитель?",
      tokens: [
        {
          wordId: "shei"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "laoshi"
        },
        {
          text: "？"
        }
      ],
      required: ["shei", "shi", "laoshi"],
      correct: ["谁", "是", "老师"],
      bank: ["老师", "是", "谁"],
      explanation: "谁是老师？"
    },
  {
      id: "p054",
      translation: "Ты кто?",
      prompt: "Собери: Ты кто?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "shi"
        },
        {
          wordId: "shei"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "shi", "shei"],
      correct: ["你", "是", "谁"],
      bank: ["谁", "是", "你"],
      explanation: "你是谁？"
    },
  {
      id: "p055",
      translation: "Моя мама очень хорошая.",
      prompt: "Собери: Моя мама очень хорошая.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "de"
        },
        {
          wordId: "mama"
        },
        {
          wordId: "hen"
        },
        {
          wordId: "hao"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "de", "mama", "hen", "hao"],
      correct: ["我", "的", "妈妈", "很", "好"],
      bank: ["好", "很", "妈妈", "的", "我"],
      explanation: "的 показывает принадлежность: 我的妈妈."
    },
  {
      id: "p056",
      translation: "Мой дом большой.",
      prompt: "Собери: Мой дом большой.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "de"
        },
        {
          wordId: "jia"
        },
        {
          wordId: "hen"
        },
        {
          wordId: "da"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "de", "jia", "hen", "da"],
      correct: ["我", "的", "家", "很", "大"],
      bank: ["大", "很", "家", "的", "我"],
      explanation: "我的家 = мой дом/моя семья."
    },
  {
      id: "p057",
      translation: "Её друг красивый.",
      prompt: "Собери: Её друг красивый.",
      tokens: [
        {
          wordId: "ta_female"
        },
        {
          wordId: "de"
        },
        {
          wordId: "pengyou"
        },
        {
          wordId: "hen"
        },
        {
          wordId: "piaoliang"
        },
        {
          text: "。"
        }
      ],
      required: ["ta_female", "de", "pengyou", "hen", "piaoliang"],
      correct: ["她", "的", "朋友", "很", "漂亮"],
      bank: ["漂亮", "很", "朋友", "的", "她"],
      explanation: "她的朋友 = её друг."
    },
  // =====================================================
  // 4. ACTIONS — действия и глаголы
  // =====================================================
,
  {
      id: "p058",
      translation: "Я смотрю на учителя.",
      prompt: "Собери: Я смотрю на учителя.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "kan"
        },
        {
          wordId: "laoshi"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "kan", "laoshi"],
      correct: ["我", "看", "老师"],
      bank: ["老师", "看", "我"],
      explanation: "看 = смотреть."
    },
  {
      id: "p059",
      translation: "Я слушаю учителя.",
      prompt: "Собери: Я слушаю учителя.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "ting"
        },
        {
          wordId: "laoshi"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "ting", "laoshi"],
      correct: ["我", "听", "老师"],
      bank: ["老师", "听", "我"],
      explanation: "听 = слушать."
    },
  {
      id: "p060",
      translation: "Я слушаю тебя.",
      prompt: "Собери: Я слушаю тебя.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "ting"
        },
        {
          wordId: "ni"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "ting", "ni"],
      correct: ["我", "听", "你"],
      bank: ["你", "听", "我"],
      explanation: "听你 = слушать тебя."
    },
  {
      id: "p061",
      translation: "Я говорю.",
      prompt: "Собери: Я говорю.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "shuo"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "shuo"],
      correct: ["我", "说"],
      bank: ["说", "我"],
      explanation: "说 = говорить."
    },
  {
      id: "p062",
      translation: "Я читаю / учусь.",
      prompt: "Собери: Я читаю / учусь.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "du"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "du"],
      correct: ["我", "读"],
      bank: ["读", "我"],
      explanation: "读 = читать / учиться."
    },
  {
      id: "p063",
      translation: "Я пишу.",
      prompt: "Собери: Я пишу.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "xie"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "xie"],
      correct: ["我", "写"],
      bank: ["写", "我"],
      explanation: "写 = писать."
    },
  {
      id: "p064",
      translation: "Я умею писать.",
      prompt: "Собери: Я умею писать.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "hui_can"
        },
        {
          wordId: "xie"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "hui_can", "xie"],
      correct: ["我", "会", "写"],
      bank: ["写", "会", "我"],
      explanation: "会 + глагол = уметь."
    },
  {
      id: "p065",
      translation: "Я умею читать.",
      prompt: "Собери: Я умею читать.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "hui_can"
        },
        {
          wordId: "du"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "hui_can", "du"],
      correct: ["我", "会", "读"],
      bank: ["读", "会", "我"],
      explanation: "会读 = уметь читать."
    },
  {
      id: "p066",
      translation: "Ты умеешь писать?",
      prompt: "Собери: Ты умеешь писать?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "hui_can"
        },
        {
          wordId: "xie"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "hui_can", "xie", "ma"],
      correct: ["你", "会", "写", "吗"],
      bank: ["吗", "写", "会", "你"],
      explanation: "会写吗？ = умеешь писать?"
    },
  {
      id: "p067",
      translation: "Ты умеешь читать?",
      prompt: "Собери: Ты умеешь читать?",
      tokens: [
        {
          wordId: "ni"
        },
        {
          wordId: "hui_can"
        },
        {
          wordId: "du"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["ni", "hui_can", "du", "ma"],
      correct: ["你", "会", "读", "吗"],
      bank: ["吗", "读", "会", "你"],
      explanation: "会读吗？ = умеешь читать?"
    },
  {
      id: "p068",
      translation: "Я могу идти в школу.",
      prompt: "Собери: Я могу идти в школу.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "neng"
        },
        {
          wordId: "qu"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "neng", "qu", "xuexiao"],
      correct: ["我", "能", "去", "学校"],
      bank: ["学校", "去", "能", "我"],
      explanation: "能 = мочь / быть способным."
    },
  {
      id: "p069",
      translation: "Я хочу идти в школу.",
      prompt: "Собери: Я хочу идти в школу.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "xiang"
        },
        {
          wordId: "qu"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "xiang", "qu", "xuexiao"],
      correct: ["我", "想", "去", "学校"],
      bank: ["学校", "去", "想", "我"],
      explanation: "想去 = хотеть пойти."
    },
  {
      id: "p070",
      translation: "Я хочу вернуться домой.",
      prompt: "Собери: Я хочу вернуться домой.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "xiang"
        },
        {
          wordId: "hui_return"
        },
        {
          wordId: "jia"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "xiang", "hui_return", "jia"],
      correct: ["我", "想", "回", "家"],
      bank: ["家", "回", "想", "我"],
      explanation: "想回家 = хотеть домой."
    },
  {
      id: "p071",
      translation: "Я возвращаюсь домой.",
      prompt: "Собери: Я возвращаюсь домой.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "hui_return"
        },
        {
          wordId: "jia"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "hui_return", "jia"],
      correct: ["我", "回", "家"],
      bank: ["家", "回", "我"],
      explanation: "回家 = возвращаться домой."
    },
  {
      id: "p072",
      translation: "Он приходит в школу.",
      prompt: "Собери: Он приходит в школу.",
      tokens: [
        {
          wordId: "ta_male"
        },
        {
          wordId: "lai"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["ta_male", "lai", "xuexiao"],
      correct: ["他", "来", "学校"],
      bank: ["学校", "来", "他"],
      explanation: "来 = приходить."
    },
  {
      id: "p073",
      translation: "Она идёт в школу.",
      prompt: "Собери: Она идёт в школу.",
      tokens: [
        {
          wordId: "ta_female"
        },
        {
          wordId: "qu"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["ta_female", "qu", "xuexiao"],
      correct: ["她", "去", "学校"],
      bank: ["学校", "去", "她"],
      explanation: "去 = идти / ехать."
    },
  {
      id: "p074",
      translation: "Мы идём в школу.",
      prompt: "Собери: Мы идём в школу.",
      tokens: [
        {
          wordId: "women"
        },
        {
          wordId: "qu"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["women", "qu", "xuexiao"],
      correct: ["我们", "去", "学校"],
      bank: ["学校", "去", "我们"],
      explanation: "我们去学校。"
    },
  {
      id: "p075",
      translation: "Вы возвращаетесь домой.",
      prompt: "Собери: Вы возвращаетесь домой.",
      tokens: [
        {
          wordId: "nimen"
        },
        {
          wordId: "hui_return"
        },
        {
          wordId: "jia"
        },
        {
          text: "。"
        }
      ],
      required: ["nimen", "hui_return", "jia"],
      correct: ["你们", "回", "家"],
      bank: ["家", "回", "你们"],
      explanation: "你们回家。"
    },
  {
      id: "p076",
      translation: "Они приходят в школу.",
      prompt: "Собери: Они приходят в школу.",
      tokens: [
        {
          wordId: "tamen"
        },
        {
          wordId: "lai"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["tamen", "lai", "xuexiao"],
      correct: ["他们", "来", "学校"],
      bank: ["学校", "来", "他们"],
      explanation: "他们来学校。"
    },
  {
      id: "p077",
      translation: "Я хочу купить кофе.",
      prompt: "Собери: Я хочу купить кофе.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "xiang"
        },
        {
          wordId: "mai_buy"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "xiang", "mai_buy", "kafei"],
      correct: ["我", "想", "买", "咖啡"],
      bank: ["咖啡", "买", "想", "我"],
      explanation: "想买 = хотеть купить."
    },
  {
      id: "p078",
      translation: "Я хочу купить чай.",
      prompt: "Собери: Я хочу купить чай.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "yao"
        },
        {
          wordId: "mai_buy"
        },
        {
          wordId: "cha"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "yao", "mai_buy", "cha"],
      correct: ["我", "要", "买", "茶"],
      bank: ["茶", "买", "要", "我"],
      explanation: "要买 = хочу купить."
    },
  {
      id: "p079",
      translation: "Мама покупает еду.",
      prompt: "Собери: Мама покупает еду.",
      tokens: [
        {
          wordId: "mama"
        },
        {
          wordId: "mai_buy"
        },
        {
          wordId: "fan"
        },
        {
          text: "。"
        }
      ],
      required: ["mama", "mai_buy", "fan"],
      correct: ["妈妈", "买", "饭"],
      bank: ["饭", "买", "妈妈"],
      explanation: "买饭 = покупать еду."
    },
  {
      id: "p080",
      translation: "Папа покупает кофе.",
      prompt: "Собери: Папа покупает кофе.",
      tokens: [
        {
          wordId: "baba"
        },
        {
          wordId: "mai_buy"
        },
        {
          wordId: "kafei"
        },
        {
          text: "。"
        }
      ],
      required: ["baba", "mai_buy", "kafei"],
      correct: ["爸爸", "买", "咖啡"],
      bank: ["咖啡", "买", "爸爸"],
      explanation: "爸爸买咖啡。"
    },
  {
      id: "p081",
      translation: "Я готовлю еду.",
      prompt: "Собери: Я готовлю еду.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "zuo_do"
        },
        {
          wordId: "fan"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "zuo_do", "fan"],
      correct: ["我", "做", "饭"],
      bank: ["饭", "做", "我"],
      explanation: "做饭 = готовить еду."
    },
  {
      id: "p082",
      translation: "Мама готовит еду.",
      prompt: "Собери: Мама готовит еду.",
      tokens: [
        {
          wordId: "mama"
        },
        {
          wordId: "zuo_do"
        },
        {
          wordId: "fan"
        },
        {
          text: "。"
        }
      ],
      required: ["mama", "zuo_do", "fan"],
      correct: ["妈妈", "做", "饭"],
      bank: ["饭", "做", "妈妈"],
      explanation: "妈妈做饭。"
    },
  {
      id: "p083",
      translation: "Я сижу.",
      prompt: "Собери: Я сижу.",
      tokens: [
        {
          wordId: "wo"
        },
        {
          wordId: "zuo_sit"
        },
        {
          text: "。"
        }
      ],
      required: ["wo", "zuo_sit"],
      correct: ["我", "坐"],
      bank: ["坐", "我"],
      explanation: "坐 = сидеть."
    },
  {
      id: "p084",
      translation: "Учитель сидит.",
      prompt: "Собери: Учитель сидит.",
      tokens: [
        {
          wordId: "laoshi"
        },
        {
          wordId: "zuo_sit"
        },
        {
          text: "。"
        }
      ],
      required: ["laoshi", "zuo_sit"],
      correct: ["老师", "坐"],
      bank: ["坐", "老师"],
      explanation: "老师坐。"
    },
  {
      id: "p085",
      translation: "Студент сидит.",
      prompt: "Собери: Студент сидит.",
      tokens: [
        {
          wordId: "xuesheng"
        },
        {
          wordId: "zuo_sit"
        },
        {
          text: "。"
        }
      ],
      required: ["xuesheng", "zuo_sit"],
      correct: ["学生", "坐"],
      bank: ["坐", "学生"],
      explanation: "学生坐。"
    },
  // =====================================================
  // 5. NUMBERS, TIME AND ADJECTIVES — числа, время, качества
  // =====================================================
,
  {
      id: "p086",
      translation: "Один, два, три.",
      prompt: "Собери: Один, два, три.",
      tokens: [
        {
          wordId: "yi"
        },
        {
          wordId: "er"
        },
        {
          wordId: "san"
        },
        {
          text: "。"
        }
      ],
      required: ["yi", "er", "san"],
      correct: ["一", "二", "三"],
      bank: ["三", "二", "一"],
      explanation: "Базовые числа: 一 二 三."
    },
  {
      id: "p087",
      translation: "Четыре, пять, шесть.",
      prompt: "Собери: Четыре, пять, шесть.",
      tokens: [
        {
          wordId: "si"
        },
        {
          wordId: "wu"
        },
        {
          wordId: "liu"
        },
        {
          text: "。"
        }
      ],
      required: ["si", "wu", "liu"],
      correct: ["四", "五", "六"],
      bank: ["六", "五", "四"],
      explanation: "Базовые числа: 四 五 六."
    },
  {
      id: "p088",
      translation: "Семь, восемь, девять.",
      prompt: "Собери: Семь, восемь, девять.",
      tokens: [
        {
          wordId: "qi"
        },
        {
          wordId: "ba_num"
        },
        {
          wordId: "jiu"
        },
        {
          text: "。"
        }
      ],
      required: ["qi", "ba_num", "jiu"],
      correct: ["七", "八", "九"],
      bank: ["九", "八", "七"],
      explanation: "Базовые числа: 七 八 九."
    },
  {
      id: "p089",
      translation: "Десять.",
      prompt: "Собери: Десять.",
      tokens: [
        {
          wordId: "shi_num"
        },
        {
          text: "。"
        }
      ],
      required: ["shi_num"],
      correct: ["十"],
      bank: ["十"],
      explanation: "十 = десять."
    },
  {
      id: "p090",
      translation: "Сто.",
      prompt: "Собери: Сто.",
      tokens: [
        {
          wordId: "bai"
        },
        {
          text: "。"
        }
      ],
      required: ["bai"],
      correct: ["百"],
      bank: ["百"],
      explanation: "百 = сто."
    },
  {
      id: "p091",
      translation: "Сегодня я иду в школу.",
      prompt: "Собери: Сегодня я иду в школу.",
      tokens: [
        {
          wordId: "jintian"
        },
        {
          wordId: "wo"
        },
        {
          wordId: "qu"
        },
        {
          wordId: "xuexiao"
        },
        {
          text: "。"
        }
      ],
      required: ["jintian", "wo", "qu", "xuexiao"],
      correct: ["今天", "我", "去", "学校"],
      bank: ["学校", "去", "我", "今天"],
      explanation: "Сегодня можно поставить в начало."
    },
  {
      id: "p092",
      translation: "Завтра я вернусь домой.",
      prompt: "Собери: Завтра я вернусь домой.",
      tokens: [
        {
          wordId: "mingtian"
        },
        {
          wordId: "wo"
        },
        {
          wordId: "hui_return"
        },
        {
          wordId: "jia"
        },
        {
          text: "。"
        }
      ],
      required: ["mingtian", "wo", "hui_return", "jia"],
      correct: ["明天", "我", "回", "家"],
      bank: ["家", "回", "我", "明天"],
      explanation: "明天 = завтра."
    },
  {
      id: "p093",
      translation: "Вчера я был/была дома.",
      prompt: "Собери: Вчера я был/была дома.",
      tokens: [
        {
          wordId: "zuotian"
        },
        {
          wordId: "wo"
        },
        {
          wordId: "zai"
        },
        {
          wordId: "jia"
        },
        {
          text: "。"
        }
      ],
      required: ["zuotian", "wo", "zai", "jia"],
      correct: ["昨天", "我", "在", "家"],
      bank: ["家", "在", "我", "昨天"],
      explanation: "昨天 = вчера."
    },
  {
      id: "p094",
      translation: "Сейчас я пью воду.",
      prompt: "Собери: Сейчас я пью воду.",
      tokens: [
        {
          wordId: "xianzai"
        },
        {
          wordId: "wo"
        },
        {
          wordId: "he"
        },
        {
          wordId: "shui"
        },
        {
          text: "。"
        }
      ],
      required: ["xianzai", "wo", "he", "shui"],
      correct: ["现在", "我", "喝", "水"],
      bank: ["水", "喝", "我", "现在"],
      explanation: "现在 = сейчас."
    },
  {
      id: "p095",
      translation: "Сейчас я пишу.",
      prompt: "Собери: Сейчас я пишу.",
      tokens: [
        {
          wordId: "xianzai"
        },
        {
          wordId: "wo"
        },
        {
          wordId: "xie"
        },
        {
          text: "。"
        }
      ],
      required: ["xianzai", "wo", "xie"],
      correct: ["现在", "我", "写"],
      bank: ["写", "我", "现在"],
      explanation: "现在我写。"
    },
  {
      id: "p096",
      translation: "Сегодня ты пьёшь чай?",
      prompt: "Собери: Сегодня ты пьёшь чай?",
      tokens: [
        {
          wordId: "jintian"
        },
        {
          wordId: "ni"
        },
        {
          wordId: "he"
        },
        {
          wordId: "cha"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["jintian", "ni", "he", "cha", "ma"],
      correct: ["今天", "你", "喝", "茶", "吗"],
      bank: ["吗", "茶", "喝", "你", "今天"],
      explanation: "今天 + вопрос с 吗."
    },
  {
      id: "p097",
      translation: "Завтра ты придёшь?",
      prompt: "Собери: Завтра ты придёшь?",
      tokens: [
        {
          wordId: "mingtian"
        },
        {
          wordId: "ni"
        },
        {
          wordId: "lai"
        },
        {
          wordId: "ma"
        },
        {
          text: "？"
        }
      ],
      required: ["mingtian", "ni", "lai", "ma"],
      correct: ["明天", "你", "来", "吗"],
      bank: ["吗", "来", "你", "明天"],
      explanation: "明天你来吗？"
    },
  {
      id: "p098",
      translation: "Чай очень хороший.",
      prompt: "Собери: Чай очень хороший.",
      tokens: [
        {
          wordId: "cha"
        },
        {
          wordId: "hen"
        },
        {
          wordId: "hao"
        },
        {
          text: "。"
        }
      ],
      required: ["cha", "hen", "hao"],
      correct: ["茶", "很", "好"],
      bank: ["好", "很", "茶"],
      explanation: "很 + прилагательное."
    },
  {
      id: "p099",
      translation: "Школа очень большая.",
      prompt: "Собери: Школа очень большая.",
      tokens: [
        {
          wordId: "xuexiao"
        },
        {
          wordId: "hen"
        },
        {
          wordId: "da"
        },
        {
          text: "。"
        }
      ],
      required: ["xuexiao", "hen", "da"],
      correct: ["学校", "很", "大"],
      bank: ["大", "很", "学校"],
      explanation: "学校很大。"
    },
  {
      id: "p100",
      translation: "Дом очень маленький.",
      prompt: "Собери: Дом очень маленький.",
      tokens: [
        {
          wordId: "jia"
        },
        {
          wordId: "hen"
        },
        {
          wordId: "xiao"
        },
        {
          text: "。"
        }
      ],
      required: ["jia", "hen", "xiao"],
      correct: ["家", "很", "小"],
      bank: ["小", "很", "家"],
      explanation: "家很小。"
    }
];
