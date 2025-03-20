
import { RolePlayScenario } from './index';

// Services scenarios (cafe, restaurant, doctor)
export const serviceScenarios: RolePlayScenario[] = [
  {
    id: "cafe",
    title: "At a Café",
    description: "You're ordering coffee and a small snack at a local café.",
    stages: [
      {
        stage: "greeting",
        prompt: "Greet the café worker",
        npcResponse: "أهلا وسهلا! أقدر أساعدك بإيه النهاردة؟",
        npcResponseTranslation: "Hello and welcome! How can I help you today?"
      },
      {
        stage: "ordering",
        prompt: "Order a coffee",
        npcResponse: "تمام! عايز قهوة عربي ولا قهوة أمريكي؟",
        npcResponseTranslation: "Excellent! Would you like Arabic coffee or American coffee?"
      },
      {
        stage: "specifying",
        prompt: "Ask for Arabic coffee",
        npcResponse: "اختيار حلو! عايز حاجة تانية مع القهوة؟",
        npcResponseTranslation: "Great choice! Would you like anything else with your coffee?"
      },
      {
        stage: "adding",
        prompt: "Ask for the price",
        npcResponse: "المجموع ١٥ جنيه. هتدفع كاش ولا بالكارت؟",
        npcResponseTranslation: "The total is 15 pounds. Will you pay with cash or card?"
      },
      {
        stage: "paying",
        prompt: "Say you'll pay with cash",
        npcResponse: "شكراً ليك! القهوة هتكون جاهزة في دقايق. يوم سعيد!",
        npcResponseTranslation: "Thank you! Your coffee will be ready in a few minutes. Have a nice day!"
      }
    ]
  },
  {
    id: "restaurant",
    title: "At a Restaurant",
    description: "You're having dinner at a local restaurant.",
    stages: [
      {
        stage: "greeting",
        prompt: "Greet the waiter and ask for a table",
        npcResponse: "مساء الخير! أيوة، عندنا ترابيزة لشخصين. اتفضل من هنا.",
        npcResponseTranslation: "Good evening! Yes, we have a table for two. Please come this way."
      },
      {
        stage: "menu",
        prompt: "Ask for the menu",
        npcResponse: "أكيد، دي المنيو. عايز تطلب دلوقتي ولا محتاج وقت؟",
        npcResponseTranslation: "Certainly, here's the menu. Would you like to order now or do you need some time?"
      },
      {
        stage: "ordering",
        prompt: "Order a popular dish",
        npcResponse: "اختيار ممتاز! الكشري من أشهر الأكلات عندنا. عايز تشرب إيه مع الأكل؟",
        npcResponseTranslation: "Excellent choice! Koshari is one of our most famous dishes. Would you like something to drink with your meal?"
      },
      {
        stage: "drinks",
        prompt: "Order a drink",
        npcResponse: "عصير المانجة طازة النهاردة. هجيبه مع الأكل خلال ١٥ دقيقة.",
        npcResponseTranslation: "The mango juice is fresh today. I'll bring it with your food in 15 minutes."
      },
      {
        stage: "bill",
        prompt: "Ask for the bill",
        npcResponse: "طبعاً، الحساب كله ١٢٠ جنيه. عايز تدفع إزاي؟",
        npcResponseTranslation: "Certainly, the total bill is 120 pounds. How would you like to pay?"
      }
    ]
  },
  {
    id: "doctor",
    title: "At the Doctor's Office",
    description: "You're visiting a doctor because you're not feeling well.",
    stages: [
      {
        stage: "greeting",
        prompt: "Greet the doctor and explain why you're here",
        npcResponse: "صباح الخير. بتشتكي من إيه؟",
        npcResponseTranslation: "Good morning. What problem are you experiencing?"
      },
      {
        stage: "symptoms",
        prompt: "Describe your symptoms",
        npcResponse: "فاهم. من إمتى وانت حاسس بالأعراض دي؟",
        npcResponseTranslation: "I understand. How long have you been feeling these symptoms?"
      },
      {
        stage: "duration",
        prompt: "Tell the doctor how long you've had the symptoms",
        npcResponse: "هفحصك دلوقتي. ممكن تقعد على السرير لو سمحت؟",
        npcResponseTranslation: "I'll examine you now. Can you sit on the bed please?"
      },
      {
        stage: "examination",
        prompt: "Ask what might be wrong",
        npcResponse: "شكل عندك انفلونزا. هكتب لك شوية أدوية والراحة.",
        npcResponseTranslation: "It seems you have the flu. I'll prescribe you some medication and rest."
      },
      {
        stage: "treatment",
        prompt: "Thank the doctor and ask when you'll feel better",
        npcResponse: "مع الدوا والراحة، المفروض تحس بتحسن خلال ٣-٤ أيام. اشرب مية كتير كمان.",
        npcResponseTranslation: "With medication and rest, you should feel better within 3-4 days. Drink plenty of water too."
      }
    ]
  }
];
