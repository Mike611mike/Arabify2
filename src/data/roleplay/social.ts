
import { RolePlayScenario } from './index';

// Social scenarios (market)
export const socialScenarios: RolePlayScenario[] = [
  {
    id: "market",
    title: "At the Market",
    description: "You're shopping for fruits and vegetables at a local market.",
    stages: [
      {
        stage: "greeting",
        prompt: "Greet the seller",
        npcResponse: "صباح الخير! إزيك النهاردة؟ بتدوّر على إيه؟",
        npcResponseTranslation: "Good morning! How are you today? What are you looking for?"
      },
      {
        stage: "asking",
        prompt: "Ask about fresh fruits",
        npcResponse: "أيوة، عندنا فواكه طازة. البرتقال والتفاح والموز كلهم طازة النهاردة.",
        npcResponseTranslation: "Yes, we have fresh fruits. Oranges, apples, and bananas are all fresh today."
      },
      {
        stage: "selecting",
        prompt: "Ask about the price of oranges",
        npcResponse: "البرتقال بـ ٢٠ جنيه الكيلو. حلو جداً وطازة من المزرعة.",
        npcResponseTranslation: "Oranges are 20 pounds per kilo. They're very sweet and fresh from the farm."
      },
      {
        stage: "bargaining",
        prompt: "Try to negotiate the price",
        npcResponse: "طيب، ممكن أديك ٢ كيلو بـ ٣٥ جنيه. ده أحسن سعر عندي.",
        npcResponseTranslation: "Okay, I can give you 2 kilos for 35 pounds. That's my best price."
      },
      {
        stage: "buying",
        prompt: "Agree and pay",
        npcResponse: "شكراً ليك! اتفضل البرتقال. محتاج حاجة تانية النهاردة؟",
        npcResponseTranslation: "Thank you! Here are your oranges. Do you need anything else today?"
      }
    ]
  }
];
