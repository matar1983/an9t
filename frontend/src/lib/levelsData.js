export const LEVELS = [
  {
    id: 1,
    cefr: "A1",
    title: "المستوى الأول — أساسيات اللغة",
    description: "مخصص للمبتدئين وحتى اللي يبدأ من الصفر، بطريقة تفاعلية وذاتية بدون محاضرات مباشرة أو جدول ثابت لبناء أساس قوي في الضمائر، فعل الكينونة، وتكوين الجمل البسيطة.",
    homework: "اكتب 10 جمل بسيطة عن نفسك تستخدم فيها ضمائر الفاعل (I, He, She, They) وفعل الكينونة (am/is/are).",
    
    // الدروس الأساسية للقواعد
    lessons: [
      {
        id: 1,
        title: "الضمائر وأسماء الإشارة",
        duration: "15 دقيقة",
        explanation: "ضمائر الفاعل هي الكلمات التي تحل محل الاسم في بداية الجملة لتجنب التكرار. أما أسماء الإشارة فتُستخدم للإشارة إلى الأشياء القريبة أو البعيدة بمفردها أو جمعها.",
        examples: [
          { en: "I am a student.", ar: "أنا طالب" },
          { en: "He is a teacher.", ar: "هو معلم" },
          { en: "This is my book.", ar: "هذا كتابي" },
          { en: "Those are my friends.", ar: "أولئك هم أصدقائي" }
        ]
      },
      {
        id: 2,
        title: "فعل الكينونة (To Be)",
        duration: "20 دقيقة",
        explanation: "يُستخدم فعل الكينونة (am, is, are) لوصف الحالة أو الهوية ويتغير حسب الفاعل. في حالة النفي نضيف (not)، وفي السؤال نبدأ بالفعل المساعد.",
        examples: [
          { en: "I am happy.", ar: "أنا سعيد" },
          { en: "Are you a student?", ar: "هل أنت طالب؟" },
          { en: "She is not at home.", ar: "هي ليست في البيت" },
          { en: "They aren't ready.", ar: "هم ليسوا مستعدين" }
        ]
      }
    ],

    // 1. أهم الجمل الشائعة وتقنية الشادونغ
    shadowingSentences: [
      { id: 1, en: "Nice to meet you.", ar: "تشرفت بمعرفتك." },
      { id: 2, en: "How much is this?", ar: "بكم هذا؟" },
      { id: 3, en: "Where is the nearest hospital?", ar: "أين أقرب مستشفى؟" },
      { id: 4, en: "I don't understand, please speak slowly.", ar: "أنا لا أفهم، من فضلك تحدث ببطء." }
    ],

    // 2. القصص القصيرة المبسطة
    stories: [
      {
        title: "حياة سام اليومية (Sam's Daily Life)",
        text: "Sam wakes up early at 6:00 AM. He drinks a cup of coffee and eats a healthy breakfast. Then, he goes to work by bus. He loves his job because he meets nice people every day."
      }
    ],

    // 3. المحادثات والمواقف اليومية
    conversations: [
      {
        title: "في المطار (At the Airport)",
        lines: [
          { speaker: "موظف التذاكر", en: "Passport and ticket, please.", ar: "جواز السفر والتذكرة من فضلك." },
          { speaker: "المسافر", en: "Here you are. Can I have a window seat?", ar: "تفضل. هل يمكنني الحصول على مقعد بجانب النافذة؟" }
        ]
      },
      {
        title: "في المطعم (At the Restaurant)",
        lines: [
          { speaker: "الناذل", en: "Are you ready to order?", ar: "هل أنت مستعد للطلب؟" },
          { speaker: "الزبون", en: "Yes, I would like a chicken sandwich and water.", ar: "نعم، أود شطيرة دجاج وماء من فضلك." }
        ]
      }
    ],

    quiz: [
      { q: "___ a student.", options: ["I am", "I is", "I are"], correct: 0 },
      { q: "She ___ my sister.", options: ["am", "is", "are"], correct: 1 },
      { q: "___ is my book, and ___ are my friends over there.", options: ["This / Those", "That / This", "These / That"], correct: 0 },
      { q: "They ___ not ready yet.", options: ["is", "am", "are"], correct: 2 },
    ],
  }
];

export const getLevel = (id) => LEVELS.find((l) => l.id === Number(id)) || LEVELS[0];
