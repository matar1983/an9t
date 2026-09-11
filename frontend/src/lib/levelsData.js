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
  },

  // ==================== المستوى الثاني ====================
  {
    id: 2,
    cefr: "A2",
    title: "المستوى الثاني — القواعد اليومية",
    description: "المستوى الثاني A2 مناسب لمن أنهى الأساسيات ويقدر يكوّن جمل بسيطة، ويريد توسيع مفرداته والتحدث بثقة أكبر في مواقف يومية متنوعة، وطريقة الدراسة فيه تفاعلية وذاتية، مو محاضرات مباشرة ولا جدول ثابت.\n\nيشمل:\n- شرح قواعد الأزمنة (المضارع البسيط والمستمر، والتعبير عن المستقبل) خطوة بخطوة، بالصوت والصورة أو الفيديو.\n- 500 جملة إضافية شائعة في العمل والسفر والتسوق، مع النطق المكتوب والصوتي وتدريبات Shadowing.\n- قصص أطول قليلاً لتطوير القراءة والاستماع.\n- محادثات ومواقف يومية مثل الفندق، البنك، العيادة والجامعة.\n- تدريب على الكتابة، القراءة، التحدث والاستماع.\n- ألعاب واختبارات قصيرة بعد الدروس للتأكد من الفهم، وتقدر تعيدها بدون حد.\n\nبالنسبة للواجبات: ما فيه واجبات تُسلّم لمعلّم أو متابعة شخصية، لكن فيه تمارين وتطبيقات واختبارات تفاعلية داخل البرنامج. وتقدر تدرس من الجوال أو الآيباد أو اللابتوب، وتحدد وقتك بنفسك.",
    homework: "اكتب فقرة من 5 أسطر عن روتينك اليومي، واستخدم فيها المضارع البسيط وجملة واحدة على الأقل بصيغة المستقبل.",

    lessons: [
      {
        id: 1,
        title: "المضارع البسيط والمستمر",
        duration: "20 دقيقة",
        explanation: "نستخدم المضارع البسيط للحديث عن العادات والحقائق الثابتة، مع إضافة s/es للفاعل المفرد الغائب. أما المضارع المستمر فيُستخدم للحديث عن حدث يقع الآن في لحظة الكلام، ويُبنى من (am/is/are + الفعل +ing).",
        examples: [
          { en: "I go to work every day.", ar: "أذهب إلى العمل كل يوم" },
          { en: "She goes to the gym on Mondays.", ar: "هي تذهب إلى الجيم أيام الإثنين" },
          { en: "I am studying right now.", ar: "أنا أدرس الآن" },
          { en: "They are traveling this week.", ar: "هم يسافرون هذا الأسبوع" }
        ]
      },
      {
        id: 2,
        title: "التعبير عن المستقبل",
        duration: "25 دقيقة",
        explanation: "نستخدم will للقرارات اللحظية والوعود والتوقعات، بينما تُستخدم going to للخطط المسبقة والنوايا المرتّبة سلفاً.",
        examples: [
          { en: "I will call you later.", ar: "سأتصل بك لاحقاً" },
          { en: "We are going to visit Paris next month.", ar: "سنزور باريس الشهر القادم" },
          { en: "She will help you with that.", ar: "هي ستساعدك في ذلك" },
          { en: "I am going to start a new job soon.", ar: "سأبدأ وظيفة جديدة قريباً" }
        ]
      }
    ],

    shadowingSentences: [
      { id: 1, en: "Could you recommend a good hotel?", ar: "هل يمكنك ترشيح فندق جيد؟" },
      { id: 2, en: "I'd like to open a bank account.", ar: "أود فتح حساب بنكي." },
      { id: 3, en: "What time does the store close?", ar: "متى يغلق المتجر؟" },
      { id: 4, en: "I have an appointment with the doctor.", ar: "لدي موعد مع الطبيب." }
    ],

    stories: [
      {
        title: "رحلة عمل قصيرة (A Short Business Trip)",
        text: "Lina is going to travel to Dubai next week for a business meeting. She booked a hotel near the office and packed her bags early. On the first day, she will meet her new clients and present the project. She feels excited but a little nervous about speaking in front of everyone."
      }
    ],

    conversations: [
      {
        title: "في الفندق (At the Hotel)",
        lines: [
          { speaker: "موظف الاستقبال", en: "Welcome! Do you have a reservation?", ar: "أهلاً بك! هل لديك حجز؟" },
          { speaker: "النزيل", en: "Yes, under the name Sarah Ahmed, for two nights.", ar: "نعم، باسم سارة أحمد، لليلتين." }
        ]
      },
      {
        title: "في البنك (At the Bank)",
        lines: [
          { speaker: "الموظف", en: "How can I help you today?", ar: "كيف يمكنني مساعدتك اليوم؟" },
          { speaker: "العميل", en: "I'd like to open a new savings account.", ar: "أود فتح حساب توفير جديد." }
        ]
      }
    ],

    quiz: [
      { q: "He ___ to school every day.", options: ["go", "goes", "going"], correct: 1 },
      { q: "Look! She ___ right now.", options: ["studies", "study", "is studying"], correct: 2 },
      { q: "We ___ visit Paris next month (a planned trip).", options: ["will", "are going to", "go"], correct: 1 },
      { q: "Don't worry, I ___ help you (decision made now).", options: ["am going to", "will", "going"], correct: 1 },
    ],
  },

  // ==================== المستوى الثالث ====================
  {
    id: 3,
    cefr: "B1",
    title: "المستوى الثالث — القواعد المتقدمة",
    description: "المستوى الثالث B1 مناسب لمن يقدر يتواصل بمواقف يومية عادية ويريد الانتقال لمرحلة أعمق: نقاش الآراء، ربط الأفكار، والتعبير بجمل أكثر تعقيداً وطلاقة، وطريقة الدراسة فيه تفاعلية وذاتية، مو محاضرات مباشرة ولا جدول ثابت.\n\nيشمل:\n- شرح أدوات الربط والضمائر الموصولة والأزمنة المركبة خطوة بخطوة، بالصوت والصورة أو الفيديو.\n- 500 جملة وتعبير شائع في النقاش وإبداء الرأي وبيئة العمل، مع النطق المكتوب والصوتي وتدريبات Shadowing.\n- قصص متوسطة الطول بمواضيع متنوعة لتطوير القراءة والاستماع العميق.\n- محادثات ومواقف مثل مقابلة العمل، الاجتماعات، والنقاشات اليومية الأكثر تفصيلاً.\n- تدريب على الكتابة، القراءة، التحدث والاستماع.\n- ألعاب واختبارات قصيرة بعد الدروس للتأكد من الفهم، وتقدر تعيدها بدون حد.\n\nبالنسبة للواجبات: ما فيه واجبات تُسلّم لمعلّم أو متابعة شخصية، لكن فيه تمارين وتطبيقات واختبارات تفاعلية داخل البرنامج. وتقدر تدرس من الجوال أو الآيباد أو اللابتوب، وتحدد وقتك بنفسك.",
    homework: "اكتب 5 جمل مركّبة تربط فيها بين فكرتين باستخدام Although أو Because أو Who/Which.",

    lessons: [
      {
        id: 1,
        title: "أدوات الربط (Although, Because)",
        duration: "25 دقيقة",
        explanation: "تُستخدم Because لذكر السبب، بينما تُستخدم Although للتعبير عن التناقض أو الاستدراك، وتأتي في بداية الجملة الفرعية ويمكن أن تسبق الجملة الرئيسية أو تليها.",
        examples: [
          { en: "I stayed home because it was raining.", ar: "بقيت في البيت لأن الجو كان ممطراً" },
          { en: "Although he was tired, he finished the work.", ar: "رغم أنه كان متعباً، إلا أنه أنهى العمل" },
          { en: "She passed the exam because she studied hard.", ar: "نجحت في الامتحان لأنها ذاكرت بجد" },
          { en: "Although it was expensive, we bought it.", ar: "رغم أنه كان غالياً، اشتريناه" }
        ]
      },
      {
        id: 2,
        title: "الضمائر الموصولة (Who, Which, Where)",
        duration: "30 دقيقة",
        explanation: "تُستخدم الضمائر الموصولة لربط جملتين بدون تكرار الاسم: Who للأشخاص، Which للأشياء، وWhere للأماكن، مما يجعل الأسلوب أكثر احترافية وتماسكاً.",
        examples: [
          { en: "The man who lives next door is a teacher.", ar: "الرجل الذي يسكن بجانبنا معلّم" },
          { en: "The book which I bought is interesting.", ar: "الكتاب الذي اشتريته ممتع" },
          { en: "This is the city where I was born.", ar: "هذه هي المدينة التي وُلدت فيها" },
          { en: "The company which hired me is well-known.", ar: "الشركة التي وظّفتني معروفة جداً" }
        ]
      }
    ],

    shadowingSentences: [
      { id: 1, en: "In my opinion, this decision makes sense.", ar: "في رأيي، هذا القرار منطقي." },
      { id: 2, en: "I completely agree with your point.", ar: "أتفق معك تماماً في وجهة نظرك." },
      { id: 3, en: "Could you elaborate on that a bit more?", ar: "هل يمكنك التوسع في ذلك أكثر؟" },
      { id: 4, en: "We need to meet the deadline this week.", ar: "نحتاج أن نلتزم بالموعد النهائي هذا الأسبوع." }
    ],

    stories: [
      {
        title: "أول يوم في وظيفة جديدة (First Day at a New Job)",
        text: "Omar started his new job yesterday, although he felt a bit nervous. His manager, who is very friendly, introduced him to the team. Because it was his first day, he mostly listened and took notes. By the end of the day, he felt more confident about his new role."
      }
    ],

    conversations: [
      {
        title: "مقابلة عمل (Job Interview)",
        lines: [
          { speaker: "المسؤول", en: "Why do you want to work with us?", ar: "لماذا تريد العمل معنا؟" },
          { speaker: "المتقدم", en: "Because I believe my skills match this role perfectly.", ar: "لأنني أعتقد أن مهاراتي تتناسب تماماً مع هذا الدور." }
        ]
      },
      {
        title: "اجتماع عمل (Business Meeting)",
        lines: [
          { speaker: "المدير", en: "What do you think about the new proposal?", ar: "ما رأيك في الاقتراح الجديد؟" },
          { speaker: "الموظف", en: "I think it's a great idea, although it needs more details.", ar: "أعتقد أنها فكرة رائعة، رغم أنها تحتاج تفاصيل أكثر." }
        ]
      }
    ],

    quiz: [
      { q: "I stayed home ___ it was raining.", options: ["although", "because", "which"], correct: 1 },
      { q: "___ he was tired, he finished the work.", options: ["Because", "Although", "Who"], correct: 1 },
      { q: "The man ___ lives next door is a teacher.", options: ["which", "where", "who"], correct: 2 },
      { q: "This is the city ___ I was born.", options: ["where", "who", "which"], correct: 0 },
    ],
  },

  // ==================== المستوى الرابع ====================
  {
    id: 4,
    cefr: "B2",
    title: "المستوى الرابع — الاحتراف والطلاقة",
    description: "المستوى الرابع B2 مناسب لمن يبحث عن الاحتراف والطلاقة الحقيقية: التعبير بدقة، فهم النصوص المعقدة، والتحدث في مواقف رسمية وأكاديمية بثقة، وطريقة الدراسة فيه تفاعلية وذاتية، مو محاضرات مباشرة ولا جدول ثابت.\n\nيشمل:\n- شرح المبني للمجهول والحالات الشرطية المتقدمة خطوة بخطوة، بالصوت والصورة أو الفيديو.\n- 500 تعبير وجملة احترافية تُستخدم في العروض التقديمية والكتابة الرسمية، مع النطق المكتوب والصوتي وتدريبات Shadowing.\n- نصوص وقصص أطول نسبياً لتطوير القراءة والاستماع على مستوى متقدم.\n- محادثات ومواقف مثل المناظرات، العروض التقديمية، والمواقف الرسمية.\n- تدريب على الكتابة، القراءة، التحدث والاستماع.\n- تقييم شامل بعد الدروس للتأكد من الفهم، وتقدر تعيده بدون حد.\n\nبالنسبة للواجبات: ما فيه واجبات تُسلّم لمعلّم أو متابعة شخصية، لكن فيه تمارين وتطبيقات واختبارات تفاعلية داخل البرنامج. وتقدر تدرس من الجوال أو الآيباد أو اللابتوب، وتحدد وقتك بنفسك.",
    homework: "صِغ 3 جمل شرطية معقدة (Second/Third Conditional) تعبّر عن مواقف افتراضية.",

    lessons: [
      {
        id: 1,
        title: "المبني للمجهول (Passive Voice)",
        duration: "30 دقيقة",
        explanation: "نستخدم المبني للمجهول عندما يكون التركيز على الفعل نفسه أو على من وقع عليه الفعل وليس على الفاعل، ويُبنى من (فعل to be + التصريف الثالث للفعل).",
        examples: [
          { en: "This book was written by a famous author.", ar: "هذا الكتاب كتبه مؤلف مشهور" },
          { en: "The bridge is being built now.", ar: "الجسر يُبنى الآن" },
          { en: "The report was sent yesterday.", ar: "التقرير أُرسل بالأمس" },
          { en: "New employees are trained every month.", ar: "يتم تدريب موظفين جدد كل شهر" }
        ]
      },
      {
        id: 2,
        title: "الحالات الشرطية المتقدمة",
        duration: "35 دقيقة",
        explanation: "الشرطية الثانية تُستخدم لمواقف افتراضية غير حقيقية في الحاضر، بينما الشرطية الثالثة تُستخدم للحديث عن الماضي وما كان يمكن أن يحدث لكنه لم يحدث.",
        examples: [
          { en: "If I had more time, I would travel the world.", ar: "لو كان عندي وقت أكثر، لكنت سافرت حول العالم" },
          { en: "If I had studied, I would have passed.", ar: "لو كنت درست، لكنت نجحت" },
          { en: "If she were here, she would help us.", ar: "لو كانت هنا، لكانت ساعدتنا" },
          { en: "If they had left earlier, they wouldn't have missed the flight.", ar: "لو غادروا مبكراً، لما فاتتهم الرحلة" }
        ]
      }
    ],

    shadowingSentences: [
      { id: 1, en: "Let me walk you through the key findings.", ar: "دعني أشرح لك أهم النتائج." },
      { id: 2, en: "I'd like to address a few concerns before we proceed.", ar: "أود معالجة بعض المخاوف قبل أن نستمر." },
      { id: 3, en: "This approach has proven to be highly effective.", ar: "أثبت هذا الأسلوب فعاليته العالية." },
      { id: 4, en: "We should take these factors into consideration.", ar: "يجب أن نأخذ هذه العوامل بعين الاعتبار." }
    ],

    stories: [
      {
        title: "عرض تقديمي مهم (An Important Presentation)",
        text: "The final report was reviewed by the entire team before the presentation. If Sarah hadn't prepared so carefully, the meeting wouldn't have gone so smoothly. She addressed every question with confidence, and the new strategy was approved by the board immediately after."
      }
    ],

    conversations: [
      {
        title: "عرض تقديمي (A Presentation)",
        lines: [
          { speaker: "المتحدث", en: "Today, I'll be presenting our quarterly results.", ar: "اليوم سأقدّم نتائجنا الفصلية." },
          { speaker: "الحضور", en: "Could you clarify how these numbers were calculated?", ar: "هل يمكنك توضيح كيف تم حساب هذه الأرقام؟" }
        ]
      },
      {
        title: "اجتماع رسمي (A Formal Meeting)",
        lines: [
          { speaker: "الرئيس التنفيذي", en: "If we had more resources, we would expand faster.", ar: "لو كان لدينا موارد أكثر، لتوسعنا بشكل أسرع." },
          { speaker: "المدير المالي", en: "I agree, this proposal should be reviewed carefully.", ar: "أتفق معك، يجب مراجعة هذا الاقتراح بعناية." }
        ]
      }
    ],

    quiz: [
      { q: "This book ___ by a famous author.", options: ["wrote", "was written", "is writing"], correct: 1 },
      { q: "If I ___ more time, I would travel.", options: ["have", "had", "will have"], correct: 1 },
      { q: "If I had studied, I ___ passed.", options: ["would", "would have", "will have"], correct: 1 },
      { q: "The bridge ___ built right now.", options: ["is being", "was", "is"], correct: 0 },
    ],
  }
];

export const getLevel = (id) => LEVELS.find((l) => l.id === Number(id)) || LEVELS[0];
