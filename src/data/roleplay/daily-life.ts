
import { RolePlayScenario } from './index';

// Daily life scenarios
export const dailyLifeScenarios: RolePlayScenario[] = [
  {
    id: "greetings",
    title: "Common Greetings",
    description: "Practice the most common Arabic greetings in different situations.",
    stages: [
      {
        stage: "morning",
        prompt: "Say good morning",
        npcResponse: "صباح الخير! إزيك النهاردة؟",
        npcResponseTranslation: "Good morning! How are you today?"
      },
      {
        stage: "afternoon",
        prompt: "Say good afternoon",
        npcResponse: "مساء الخير! يومك عامل إيه؟",
        npcResponseTranslation: "Good afternoon! How is your day going?"
      },
      {
        stage: "asking",
        prompt: "Ask how someone is doing",
        npcResponse: "أنا كويس الحمد لله! وإنت، عامل إيه؟",
        npcResponseTranslation: "I'm fine, thank God! And you, how are you?"
      },
      {
        stage: "responding",
        prompt: "Respond that you are well",
        npcResponse: "حلو أوي! مبسوط إني سمعت كدة.",
        npcResponseTranslation: "That's great! Happy to hear that."
      },
      {
        stage: "farewell",
        prompt: "Say goodbye",
        npcResponse: "مع السلامة! يومك سعيد وأشوفك قريب إن شاء الله.",
        npcResponseTranslation: "Goodbye! Have a nice day and see you soon, God willing."
      }
    ]
  },
  {
    id: "school",
    title: "At School",
    description: "You're a new student talking to your teacher on the first day.",
    stages: [
      {
        stage: "introduction",
        prompt: "Introduce yourself to the teacher",
        npcResponse: "أهلا بيك في مدرستنا! أنا الأستاذة سارة. مبسوطة بمعرفتك.",
        npcResponseTranslation: "Welcome to our school! I am Teacher Sarah. Nice to meet you."
      },
      {
        stage: "asking",
        prompt: "Ask about the class schedule",
        npcResponse: "الدروس بتبدأ الساعة تمانية الصبح وبتخلص الساعة اتنين الضهر. هتلاقي الجدول في الورقة دي.",
        npcResponseTranslation: "Classes start at 8 AM and end at 2 PM. You will find the schedule on this paper."
      },
      {
        stage: "clarifying",
        prompt: "Ask which classroom you should go to first",
        npcResponse: "أوضة رقم ١٠٥ في الدور الأول. هوريك الطريق بعد ما نخلص الاجتماع ده.",
        npcResponseTranslation: "Room number 105 on the first floor. I'll show you the way after this meeting ends."
      },
      {
        stage: "textbooks",
        prompt: "Ask about required textbooks",
        npcResponse: "هتحتاج الكتب التلاتة دول. ممكن تشتريهم من مكتبة المدرسة هنا.",
        npcResponseTranslation: "You will need these three books. You can buy them from the school bookstore here."
      },
      {
        stage: "thanking",
        prompt: "Thank the teacher for the information",
        npcResponse: "على الرحب والسعة! لو عندك أي أسئلة تانية، ماتترددش تسأل. بالتوفيق في يومك الأول!",
        npcResponseTranslation: "You're welcome! If you have any other questions, don't hesitate to ask. Good luck on your first day!"
      }
    ]
  }
];
