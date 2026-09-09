// مصدر واحد وموحّد لكل بيانات المستويات، الدروس، الواجبات، وأسئلة التقييم
// يُستخدم في صفحة Levels.jsx وصفحة LevelDetail.jsx حتى لا يتكرر المحتوى في مكانين مختلفين

export const LEVELS = [
  {
    id: 1,
    cefr: "A1",
    title: "المستوى الأول — أساسيات اللغة",
    description: "مخصص للمبتدئين لبناء أساس قوي في الضمائر، فعل الكينونة، وتكوين الجمل البسيطة.",
    homework: "اكتب 10 جمل بسيطة عن نفسك تستخدم فيها ضمائر الفاعل (I, He, She, They) وفعل الكينونة (am/is/are).",
    lessons: [
      {
        id: 1,
        title: "الضمائر وأسماء الإشارة",
        duration: "15 دقيقة",
        explanation:
          "ضمائر الفاعل هي الكلمات التي تحل محل الاسم في بداية الجملة: I (أنا)، You (أنت)، He (هو)، She (هي)، It (هي/هو لغير العاقل)، We (نحن)، They (هم). مثال: بدل أن نقول 'Ahmed is a student' نقول 'He is a student'. أما أسماء الإشارة فتُستخدم للإشارة لشيء قريب أو بعيد: This (هذا/هذه للقريب المفرد)، That (ذلك/تلك للبعيد المفرد)، These (هؤلاء/هذه للقريب الجمع)، Those (أولئك/تلك للبعيد الجمع). مثال: 'This is my book' و 'Those are my friends'.",
        listen: "I am a student. He is a teacher. This is my book. Those are my friends.",
      },
      {
        id: 2,
        title: "فعل الكينونة (To Be)",
        duration: "20 دقيقة",
        explanation:
          "فعل الكينونة (am, is, are) يُستخدم لوصف الحالة أو الهوية، ويتغيّر حسب الفاعل: I am، He/She/It is، You/We/They are. في الجملة المنفية نضيف not بعد الفعل: I am not, He is not (isn't), They are not (aren't). ولتكوين سؤال، نبدأ بالفعل نفسه: 'Are you a student?' 'Is she happy?'. تذكّر أن هذا الفعل لا يُترجم دائمًا بكلمة منفصلة في العربية، فهو يربط الفاعل بالخبر.",
        listen: "I am happy. Are you a teacher? She is not at home. They aren't ready.",
      },
    ],
    quiz: [
      { q: "___ a student.", options: ["I am", "I is", "I are"], correct: 0 },
      { q: "She ___ my sister.", options: ["am", "is", "are"], correct: 1 },
      { q: "___ is my book, and ___ are my friends over there.", options: ["This / Those", "That / This", "These / That"], correct: 0 },
      { q: "They ___ not ready yet.", options: ["is", "am", "are"], correct: 2 },
    ],
  },
  {
    id: 2,
    cefr: "A2",
    title: "المستوى الثاني — القواعد اليومية",
    description: "تطوير القدرة على تكوين جمل مركبة واستخدام الأزمان البسيطة والمستمرة والتعبير عن المستقبل.",
    homework: "اكتب فقرة من 5 أسطر عن روتينك اليومي، واستخدم فيها المضارع البسيط وجملة واحدة على الأقل بصيغة المستقبل.",
    lessons: [
      {
        id: 1,
        title: "المضارع البسيط والمستمر",
        duration: "20 دقيقة",
        explanation:
          "نستخدم المضارع البسيط (Simple Present) للحديث عن العادات والحقائق الثابتة: 'I go to work every day'. لاحظ إضافة s/es مع الفاعل المفرد الغائب (he/she/it): 'She goes'. أما المضارع المستمر (Present Continuous) فيُستخدم للحديث عن حدث يقع الآن في لحظة الكلام، ويُبنى من (am/is/are + الفعل +ing): 'I am studying now'. الفرق الأساسي: البسيط للتكرار والعادة، والمستمر للحظة الحالية.",
        listen: "I go to work every day. She is studying right now. We usually eat dinner at eight.",
      },
      {
        id: 2,
        title: "التعبير عن المستقبل",
        duration: "25 دقيقة",
        explanation:
          "هناك طريقتان شائعتان للتعبير عن المستقبل: will تُستخدم للقرارات اللحظية أو الوعود والتوقعات: 'I will call you later'. أما going to فتُستخدم للخطط المسبقة والنوايا: 'We are going to visit our grandparents tomorrow'. لاحظ أن going to تدل على أن الخطة مرتّبة مسبقًا، بينما will تأتي عادة كقرار فوري وقت الكلام.",
        listen: "I will help you. We are going to travel next month. She will call later.",
      },
    ],
    quiz: [
      { q: "He ___ to school every day.", options: ["go", "goes", "going"], correct: 1 },
      { q: "Look! She ___ right now.", options: ["studies", "study", "is studying"], correct: 2 },
      { q: "We ___ visit our grandparents tomorrow (a planned trip).", options: ["will", "are going to", "go"], correct: 1 },
      { q: "Don't worry, I ___ help you (decision made now).", options: ["am going to", "will", "going"], correct: 1 },
    ],
  },
  {
    id: 3,
    cefr: "B1",
    title: "المستوى الثالث — القواعد المتقدمة",
    description: "التعمق في أدوات الربط، الأسماء الموصولة، والقواعد الأكثر تعقيداً في بناء الجمل.",
    homework: "اكتب 5 جمل مركّبة تربط فيها بين فكرتين باستخدام Although أو Because أو Who/Which.",
    lessons: [
      {
        id: 1,
        title: "أدوات الربط (Although, Because)",
        duration: "25 دقيقة",
        explanation:
          "Because تُستخدم لذكر السبب: 'I stayed home because it was raining'. أما Although فتُستخدم للتعبير عن التناقض أو الاستدراك: 'Although it was raining, we went hiking' (بمعنى: رغم أن الجو كان ممطرًا، إلا أننا ذهبنا للتنزّه). لاحظ أن although تأتي في بداية الجملة الفرعية، ويمكن أن تسبق الجملة الرئيسية أو تليها.",
        listen: "I stayed home because it was raining. Although he was tired, he finished the work.",
      },
      {
        id: 2,
        title: "الضمائر الموصولة (Who, Which, Where)",
        duration: "30 دقيقة",
        explanation:
          "تُستخدم الضمائر الموصولة لربط جملتين بدون تكرار الاسم: Who للأشخاص: 'The man who lives next door is a teacher'. Which للأشياء: 'The book which I bought is interesting'. Where للأماكن: 'This is the city where I was born'. هذه الأدوات تجعل أسلوبك أكثر احترافية وتماسكًا بدل تكرار جمل قصيرة منفصلة.",
        listen: "The man who lives next door is a teacher. This is the city where I was born.",
      },
    ],
    quiz: [
      { q: "I stayed home ___ it was raining.", options: ["although", "because", "which"], correct: 1 },
      { q: "___ he was tired, he finished the work.", options: ["Because", "Although", "Who"], correct: 1 },
      { q: "The man ___ lives next door is a teacher.", options: ["which", "where", "who"], correct: 2 },
      { q: "This is the city ___ I was born.", options: ["where", "who", "which"], correct: 0 },
    ],
  },
  {
    id: 4,
    cefr: "B2",
    title: "المستوى الرابع — الاحتراف والطلاقة",
    description: "إتقان المبني للمجهول، والجمل الشرطية المتقدمة، للوصول إلى طلاقة حقيقية.",
    homework: "صِغ 3 جمل شرطية معقدة (Second/Third Conditional) تعبّر عن مواقف افتراضية.",
    lessons: [
      {
        id: 1,
        title: "المبني للمجهول (Passive Voice)",
        duration: "30 دقيقة",
        explanation:
          "نستخدم المبني للمجهول عندما يكون التركيز على الفعل نفسه أو على من وقع عليه الفعل، وليس على الفاعل: 'This book was written by a famous author'. يُبنى من (فعل to be + التصريف الثالث للفعل). في المبني للمعلوم نقول: 'A famous author wrote this book'، وفي المبني للمجهول ننقل المفعول به ليصبح فاعلًا نحويًا.",
        listen: "This book was written by a famous author. The bridge is being built now.",
      },
      {
        id: 2,
        title: "الحالات الشرطية المتقدمة",
        duration: "35 دقيقة",
        explanation:
          "الشرطية الثانية (Second Conditional) تُستخدم للحديث عن مواقف افتراضية غير حقيقية في الحاضر: 'If I had more time, I would travel the world' (لو كان عندي وقت أكثر، لكنت سافرت). الشرطية الثالثة (Third Conditional) للحديث عن الماضي وما كان يمكن أن يحدث لكنه لم يحدث: 'If I had studied, I would have passed' (لو كنت درست، لكنت نجحت). لاحظ الفرق: الثانية عن حاضر مُتخيّل، والثالثة عن ماضٍ لم يتحقق.",
        listen: "If I had more time, I would travel the world. If I had studied, I would have passed.",
      },
    ],
    quiz: [
      { q: "This book ___ by a famous author.", options: ["wrote", "was written", "is writing"], correct: 1 },
      { q: "If I ___ more time, I would travel.", options: ["have", "had", "will have"], correct: 1 },
      { q: "If I had studied, I ___ passed.", options: ["would", "would have", "will have"], correct: 1 },
      { q: "The bridge ___ built right now.", options: ["is being", "was", "is"], correct: 0 },
    ],
  },
];

export const getLevel = (id) => LEVELS.find((l) => l.id === Number(id)) || LEVELS[0];
