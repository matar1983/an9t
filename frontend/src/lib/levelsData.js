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
      { id: 4, en: "I don't understand, please speak slowly.", ar: "أنا لا أفهم، من فضلك تحدث ببطء." },
      { id: 5, en: "What's your name?", ar: "ما اسمك؟" },
      { id: 6, en: "I'm from Saudi Arabia.", ar: "أنا من السعودية." },
      { id: 7, en: "Can you help me, please?", ar: "هل يمكنك مساعدتي من فضلك؟" },
      { id: 8, en: "I'm hungry, let's eat.", ar: "أنا جائع، لنأكل." },
      { id: 9, en: "See you tomorrow.", ar: "أراك غداً." },
      { id: 10, en: "What time is it now?", ar: "كم الساعة الآن؟" },
      { id: 11, en: "I like this place.", ar: "أحب هذا المكان." },
      { id: 12, en: "Thank you very much.", ar: "شكراً جزيلاً." }
    ],

    // 2. القصص القصيرة المبسطة
    stories: [
      {
        title: "حياة سام اليومية (Sam's Daily Life)",
        text: "Sam wakes up early at 6:00 AM. He drinks a cup of coffee and eats a healthy breakfast. Then, he goes to work by bus. He loves his job because he meets nice people every day."
      },
      {
        title: "في السوق (At the Market)",
        text: "Mona goes to the market every Friday. She buys fruits and vegetables. The apples are red and sweet. She pays the cashier and goes home happy."
      },
      {
        title: "يوم في المدرسة (A Day at School)",
        text: "Ali is a student. He goes to school at 7 AM. His favorite subject is English. After school, he plays football with his friends."
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
      },
      {
        title: "في المستشفى (At the Hospital)",
        lines: [
          { speaker: "الممرضة", en: "What's wrong with you?", ar: "ما الذي يزعجك؟" },
          { speaker: "المريض", en: "I have a headache and a fever.", ar: "لدي صداع وحمى." }
        ]
      },
      {
        title: "في السوبرماركت (At the Supermarket)",
        lines: [
          { speaker: "الموظف", en: "Can I help you find something?", ar: "هل أساعدك في إيجاد شيء؟" },
          { speaker: "الزبون", en: "Yes, where is the milk?", ar: "نعم، أين الحليب؟" }
        ]
      }
    ],

    // 4. الألعاب والتمارين التفاعلية (6 ألعاب متنوعة)
    games: [
      {
        id: 1, type: "multiple_choice", title: "اختبار القواعد",
        questions: [
          { q: "___ a teacher.", options: ["I am", "I is", "I are"], correct: 0 },
          { q: "They ___ students.", options: ["is", "am", "are"], correct: 2 },
          { q: "___ is my pen.", options: ["This", "These", "Those"], correct: 0 }
        ]
      },
      {
        id: 2, type: "true_false", title: "صح أو خطأ",
        questions: [
          { q: "\"She are happy.\"", correct: false },
          { q: "\"I am a student.\"", correct: true },
          { q: "\"They is ready.\"", correct: false }
        ]
      },
      {
        id: 3, type: "fill_blank", title: "أكمل الفراغ",
        questions: [
          { q: "He ___ not at home.", options: ["am", "is", "are"], correct: 1 },
          { q: "We ___ ready now.", options: ["is", "am", "are"], correct: 2 },
          { q: "___ your book.", options: ["This is", "These is", "Those is"], correct: 0 }
        ]
      },
      {
        id: 4, type: "match", title: "طابق الكلمة بمعناها",
        questions: [
          { q: "Hospital", options: ["مستشفى", "مطعم", "مطار"], correct: 0 },
          { q: "Airport", options: ["سوبرماركت", "مطار", "بنك"], correct: 1 },
          { q: "Restaurant", options: ["مطعم", "فندق", "مدرسة"], correct: 0 }
        ]
      },
      {
        id: 5, type: "order", title: "رتّب لتكوين الجملة الصحيحة",
        questions: [
          { q: "student / a / am / I", options: ["I am a student.", "Am I student a.", "A student I am."], correct: 0 },
          { q: "teacher / is / he / a", options: ["Is he a teacher.", "He is a teacher.", "A teacher he is."], correct: 1 },
          { q: "my / this / book / is", options: ["This is my book.", "Is this my book.", "My book this is."], correct: 0 }
        ]
      },
      {
        id: 6, type: "listen_choose", title: "استمع واختر الترجمة الصحيحة",
        questions: [
          { audio: "I am a student.", options: ["أنا طالب", "أنا معلم", "هذا كتابي"], correct: 0 },
          { audio: "This is my book.", options: ["هذا كتابي", "هم أصدقائي", "هي معلمة"], correct: 0 },
          { audio: "They are ready.", options: ["هم مستعدون", "هي ليست مستعدة", "أنا مستعد"], correct: 0 }
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
      { id: 4, en: "I have an appointment with the doctor.", ar: "لدي موعد مع الطبيب." },
      { id: 5, en: "I need to check in for my flight.", ar: "أحتاج تسجيل الوصول لرحلتي." },
      { id: 6, en: "Could you show me the menu, please?", ar: "هل يمكنك عرض قائمة الطعام من فضلك؟" },
      { id: 7, en: "I usually wake up at seven.", ar: "عادة أستيقظ الساعة السابعة." },
      { id: 8, en: "We are meeting at the office tomorrow.", ar: "سنجتمع في المكتب غداً." },
      { id: 9, en: "I need to buy some groceries.", ar: "أحتاج أن أشتري بعض المستلزمات." },
      { id: 10, en: "She is planning a trip next summer.", ar: "هي تخطط لرحلة الصيف القادم." },
      { id: 11, en: "Can I pay by credit card?", ar: "هل يمكنني الدفع بالبطاقة الائتمانية؟" },
      { id: 12, en: "I'll be there in ten minutes.", ar: "سأصل خلال عشر دقائق." }
    ],

    stories: [
      {
        title: "رحلة عمل قصيرة (A Short Business Trip)",
        text: "Lina is going to travel to Dubai next week for a business meeting. She booked a hotel near the office and packed her bags early. On the first day, she will meet her new clients and present the project. She feels excited but a little nervous about speaking in front of everyone."
      },
      {
        title: "زيارة الطبيب (A Visit to the Doctor)",
        text: "Yesterday, Fahad wasn't feeling well, so he made an appointment with the doctor. He is going to see her this afternoon. The doctor will check his temperature and give him some advice."
      },
      {
        title: "التسوق في نهاية الأسبوع (Weekend Shopping)",
        text: "Every weekend, Huda goes shopping with her sister. They usually visit the new mall downtown. Next Saturday, they are going to buy new clothes for the summer."
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
      },
      {
        title: "في العيادة (At the Clinic)",
        lines: [
          { speaker: "الطبيب", en: "How long have you had this pain?", ar: "منذ متى وأنت تشعر بهذا الألم؟" },
          { speaker: "المريض", en: "For about three days now.", ar: "منذ ثلاثة أيام تقريباً." }
        ]
      },
      {
        title: "في الجامعة (At the University)",
        lines: [
          { speaker: "الموظف", en: "Which courses are you going to register for?", ar: "ما هي المواد التي ستسجل بها؟" },
          { speaker: "الطالب", en: "I'm going to register for English and Math.", ar: "سأسجل في الإنجليزي والرياضيات." }
        ]
      }
    ],

    games: [
      {
        id: 1, type: "multiple_choice", title: "اختبار القواعد",
        questions: [
          { q: "She ___ to the gym every day.", options: ["go", "goes", "going"], correct: 1 },
          { q: "We ___ traveling next week.", options: ["is", "am", "are"], correct: 2 },
          { q: "I ___ call you tonight.", options: ["will", "am", "do"], correct: 0 }
        ]
      },
      {
        id: 2, type: "true_false", title: "صح أو خطأ",
        questions: [
          { q: "\"He go to work every day.\"", correct: false },
          { q: "\"They are going to visit Paris.\"", correct: true },
          { q: "\"She will helps you.\"", correct: false }
        ]
      },
      {
        id: 3, type: "fill_blank", title: "أكمل الفراغ",
        questions: [
          { q: "I ___ studying right now.", options: ["am", "is", "are"], correct: 0 },
          { q: "They ___ go shopping tomorrow.", options: ["is going to", "are going to", "am going to"], correct: 1 },
          { q: "He ___ to the bank every Monday.", options: ["go", "goes", "going"], correct: 1 }
        ]
      },
      {
        id: 4, type: "match", title: "طابق الكلمة بمعناها",
        questions: [
          { q: "Reservation", options: ["حجز", "توفير", "فاتورة"], correct: 0 },
          { q: "Appointment", options: ["موعد", "رحلة", "حساب"], correct: 0 },
          { q: "Account", options: ["حساب", "غرفة", "مفتاح"], correct: 0 }
        ]
      },
      {
        id: 5, type: "order", title: "رتّب لتكوين الجملة الصحيحة",
        questions: [
          { q: "visit / are / we / Paris / going to", options: ["We are going to visit Paris.", "Visit we Paris going to are.", "Are we Paris visit going to."], correct: 0 },
          { q: "call / will / I / you / later", options: ["I will call you later.", "Will I call later you.", "Call you I will later."], correct: 0 },
          { q: "bank account / a / open / to / like / I'd", options: ["I'd like to open a bank account.", "Open I'd a bank to like account.", "A bank account I'd like open to."], correct: 0 }
        ]
      },
      {
        id: 6, type: "listen_choose", title: "استمع واختر الترجمة الصحيحة",
        questions: [
          { audio: "I'd like to open a bank account.", options: ["أود فتح حساب بنكي", "أود حجز فندق", "أود شراء تذكرة"], correct: 0 },
          { audio: "We are going to visit Paris next month.", options: ["سنزور باريس الشهر القادم", "زرنا باريس أمس", "سنذهب للعمل غداً"], correct: 0 },
          { audio: "What time does the store close?", options: ["متى يغلق المتجر؟", "أين يقع البنك؟", "كم سعر هذا؟"], correct: 0 }
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
      { id: 4, en: "We need to meet the deadline this week.", ar: "نحتاج أن نلتزم بالموعد النهائي هذا الأسبوع." },
      { id: 5, en: "Let's schedule a meeting for next week.", ar: "لنحدد اجتماعاً للأسبوع القادم." },
      { id: 6, en: "I have some concerns about the plan.", ar: "لدي بعض المخاوف بخصوص الخطة." },
      { id: 7, en: "That's a fair point, but I see it differently.", ar: "هذه نقطة عادلة، لكنني أراها بشكل مختلف." },
      { id: 8, en: "Let's compromise on this issue.", ar: "لنتوصل لحل وسط في هذه المسألة." },
      { id: 9, en: "I'd rather discuss this in person.", ar: "أفضّل مناقشة هذا شخصياً." },
      { id: 10, en: "We should prioritize this task.", ar: "يجب أن نُعطي أولوية لهذه المهمة." },
      { id: 11, en: "Can you clarify your last point?", ar: "هل يمكنك توضيح نقطتك الأخيرة؟" },
      { id: 12, en: "I look forward to hearing from you.", ar: "أتطلع لسماع ردك." }
    ],

    stories: [
      {
        title: "أول يوم في وظيفة جديدة (First Day at a New Job)",
        text: "Omar started his new job yesterday, although he felt a bit nervous. His manager, who is very friendly, introduced him to the team. Because it was his first day, he mostly listened and took notes. By the end of the day, he felt more confident about his new role."
      },
      {
        title: "اجتماع صعب (A Difficult Meeting)",
        text: "Although the meeting started late, the team managed to finish on time. The manager, who arrived a few minutes late, apologized to everyone. Because the topic was important, everyone paid close attention."
      },
      {
        title: "قرار مهم (An Important Decision)",
        text: "Layla had to make a decision which would affect her whole career. Although she was offered a higher salary at another company, she decided to stay because she loved her current team."
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
      },
      {
        title: "مفاوضة سعر (Price Negotiation)",
        lines: [
          { speaker: "البائع", en: "This is our best price, although we can offer a small discount.", ar: "هذا أفضل سعر لدينا، رغم أنه يمكننا تقديم خصم بسيط." },
          { speaker: "المشتري", en: "I appreciate that, because it fits our budget better now.", ar: "أقدّر ذلك، لأنه يناسب ميزانيتنا بشكل أفضل الآن." }
        ]
      },
      {
        title: "مكالمة هاتفية عمل (A Business Phone Call)",
        lines: [
          { speaker: "المتصل", en: "I'm calling about the project which we discussed last week.", ar: "أتصل بخصوص المشروع الذي ناقشناه الأسبوع الماضي." },
          { speaker: "الرد", en: "Sure, the colleague who handles that is available now.", ar: "بالتأكيد، الزميل الذي يتابع ذلك متاح الآن." }
        ]
      }
    ],

    games: [
      {
        id: 1, type: "multiple_choice", title: "اختبار القواعد",
        questions: [
          { q: "I stayed home ___ it was raining.", options: ["although", "because", "who"], correct: 1 },
          { q: "___ he was tired, he finished the work.", options: ["Because", "Although", "Which"], correct: 1 },
          { q: "The man ___ lives next door is a teacher.", options: ["which", "where", "who"], correct: 2 }
        ]
      },
      {
        id: 2, type: "true_false", title: "صح أو خطأ",
        questions: [
          { q: "\"The book which I bought is interesting.\"", correct: true },
          { q: "\"This is the city who I was born.\"", correct: false },
          { q: "\"Although it was expensive, we bought it.\"", correct: true }
        ]
      },
      {
        id: 3, type: "fill_blank", title: "أكمل الفراغ",
        questions: [
          { q: "She passed the exam ___ she studied hard.", options: ["because", "although", "where"], correct: 0 },
          { q: "This is the city ___ I was born.", options: ["who", "which", "where"], correct: 2 },
          { q: "The company ___ hired me is well-known.", options: ["who", "which", "where"], correct: 1 }
        ]
      },
      {
        id: 4, type: "match", title: "طابق الكلمة بمعناها",
        questions: [
          { q: "Deadline", options: ["موعد نهائي", "اجتماع", "عرض"], correct: 0 },
          { q: "Proposal", options: ["اقتراح", "راتب", "عقد"], correct: 0 },
          { q: "Colleague", options: ["زميل", "مدير", "عميل"], correct: 0 }
        ]
      },
      {
        id: 5, type: "order", title: "رتّب لتكوين الجملة الصحيحة",
        questions: [
          { q: "although / he / tired / finished / was / the work", options: ["Although he was tired, he finished the work.", "He was tired although finished the work.", "Finished the work he was although tired."], correct: 0 },
          { q: "lives / who / next door / the man / is a teacher", options: ["The man who lives next door is a teacher.", "Next door lives who the man teacher a is.", "Who the man lives next door is a teacher."], correct: 0 },
          { q: "born / where / the city / this is / I was", options: ["This is the city where I was born.", "Where I was born this is the city.", "The city this is where born I was."], correct: 0 }
        ]
      },
      {
        id: 6, type: "listen_choose", title: "استمع واختر الترجمة الصحيحة",
        questions: [
          { audio: "In my opinion, this decision makes sense.", options: ["في رأيي، هذا القرار منطقي", "أنا لا أوافق على هذا", "دعنا نلغي الاجتماع"], correct: 0 },
          { audio: "We need to meet the deadline this week.", options: ["نحتاج الالتزام بالموعد النهائي هذا الأسبوع", "الاجتماع غداً صباحاً", "الموعد تم تأجيله"], correct: 0 },
          { audio: "Could you elaborate on that a bit more?", options: ["هل يمكنك التوسع في ذلك أكثر؟", "هل يمكنني المغادرة الآن؟", "متى ينتهي الاجتماع؟"], correct: 0 }
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
      { id: 4, en: "We should take these factors into consideration.", ar: "يجب أن نأخذ هذه العوامل بعين الاعتبار." },
      { id: 5, en: "The results exceeded our expectations.", ar: "فاقت النتائج توقعاتنا." },
      { id: 6, en: "We need to reconsider our strategy.", ar: "نحتاج إعادة النظر في استراتيجيتنا." },
      { id: 7, en: "This matter requires immediate attention.", ar: "هذا الأمر يتطلب اهتماماً فورياً." },
      { id: 8, en: "I'd like to propose an alternative solution.", ar: "أود اقتراح حل بديل." },
      { id: 9, en: "The committee will review the application shortly.", ar: "ستراجع اللجنة الطلب قريباً." },
      { id: 10, en: "It's essential that we meet the deadline.", ar: "من الضروري أن نلتزم بالموعد النهائي." },
      { id: 11, en: "On behalf of the team, thank you for your support.", ar: "نيابة عن الفريق، شكراً على دعمكم." },
      { id: 12, en: "We appreciate your patience during this process.", ar: "نقدّر صبركم خلال هذه العملية." }
    ],

    stories: [
      {
        title: "عرض تقديمي مهم (An Important Presentation)",
        text: "The final report was reviewed by the entire team before the presentation. If Sarah hadn't prepared so carefully, the meeting wouldn't have gone so smoothly. She addressed every question with confidence, and the new strategy was approved by the board immediately after."
      },
      {
        title: "مفاوضات العمل (Business Negotiations)",
        text: "If the two companies hadn't reached an agreement, the deal would have collapsed. The contract was reviewed by both legal teams before it was signed. Everyone agreed that the negotiations had been handled professionally."
      },
      {
        title: "التقديم لوظيفة مرموقة (Applying for a Prestigious Position)",
        text: "The application was submitted last week, and if it is accepted, an interview will be scheduled soon. She has been preparing thoroughly, because this opportunity could change her career path entirely."
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
      },
      {
        title: "مناظرة (A Debate)",
        lines: [
          { speaker: "المتحدث الأول", en: "If this policy were implemented, costs would rise significantly.", ar: "لو تم تطبيق هذه السياسة، لارتفعت التكاليف بشكل كبير." },
          { speaker: "المتحدث الثاني", en: "I disagree, because the long-term benefits outweigh the costs.", ar: "أختلف معك، لأن الفوائد طويلة الأمد تفوق التكاليف." }
        ]
      },
      {
        title: "شكوى رسمية (A Formal Complaint)",
        lines: [
          { speaker: "العميل", en: "I'd like to file a complaint regarding the service I received.", ar: "أود تقديم شكوى بخصوص الخدمة التي تلقيتها." },
          { speaker: "الموظف", en: "I apologize for the inconvenience. This will be addressed immediately.", ar: "أعتذر عن الإزعاج. سيتم معالجة هذا الأمر فوراً." }
        ]
      }
    ],

    games: [
      {
        id: 1, type: "multiple_choice", title: "اختبار القواعد",
        questions: [
          { q: "This report ___ by the manager yesterday.", options: ["wrote", "was written", "writes"], correct: 1 },
          { q: "If I ___ more time, I would finish the project.", options: ["have", "had", "will have"], correct: 1 },
          { q: "If she had prepared, she ___ passed the interview.", options: ["would", "would have", "will have"], correct: 1 }
        ]
      },
      {
        id: 2, type: "true_false", title: "صح أو خطأ",
        questions: [
          { q: "\"The bridge is being built now.\"", correct: true },
          { q: "\"If I have more time, I would travel.\"", correct: false },
          { q: "\"New employees are trained every month.\"", correct: true }
        ]
      },
      {
        id: 3, type: "fill_blank", title: "أكمل الفراغ",
        questions: [
          { q: "The proposal ___ reviewed carefully.", options: ["should be", "should", "is being should"], correct: 0 },
          { q: "If they ___ earlier, they wouldn't have missed the flight.", options: ["left", "had left", "leave"], correct: 1 },
          { q: "The results ___ presented at the meeting.", options: ["was", "were", "is"], correct: 1 }
        ]
      },
      {
        id: 4, type: "match", title: "طابق الكلمة بمعناها",
        questions: [
          { q: "Findings", options: ["نتائج", "اجتماع", "ميزانية"], correct: 0 },
          { q: "Strategy", options: ["استراتيجية", "شكوى", "فاتورة"], correct: 0 },
          { q: "Board", options: ["مجلس الإدارة", "فريق العمل", "العملاء"], correct: 0 }
        ]
      },
      {
        id: 5, type: "order", title: "رتّب لتكوين الجملة الصحيحة",
        questions: [
          { q: "was / the report / reviewed / by the team", options: ["The report was reviewed by the team.", "Reviewed the report was by the team.", "By the team was reviewed the report."], correct: 0 },
          { q: "had / more time / I / if / would / travel", options: ["If I had more time, I would travel.", "I if had more time would travel.", "Would travel I if had more time."], correct: 0 },
          { q: "address / I'd / a few concerns / like to", options: ["I'd like to address a few concerns.", "Address I'd like to a few concerns.", "A few concerns I'd like to address to."], correct: 0 }
        ]
      },
      {
        id: 6, type: "listen_choose", title: "استمع واختر الترجمة الصحيحة",
        questions: [
          { audio: "Let me walk you through the key findings.", options: ["دعني أشرح لك أهم النتائج", "دعنا نلغي الاجتماع", "هذا غير صحيح إطلاقاً"], correct: 0 },
          { audio: "This approach has proven to be highly effective.", options: ["أثبت هذا الأسلوب فعاليته العالية", "هذا الأسلوب فشل تماماً", "لم نجرب هذا من قبل"], correct: 0 },
          { audio: "We should take these factors into consideration.", options: ["يجب أن نأخذ هذه العوامل بعين الاعتبار", "يجب أن نتجاهل هذه العوامل", "هذه العوامل غير مهمة"], correct: 0 }
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
