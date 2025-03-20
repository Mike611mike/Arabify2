
import { AmiyyaScenario } from './types';

export const marketScenarios: AmiyyaScenario[] = [
  {
    id: 'market-1',
    category: 'market',
    title: 'At the Market',
    description: 'Practice shopping conversations in Egyptian Arabic',
    icon: 'shopping-cart',
    stages: [
      {
        id: 'market-greeting',
        prompt: 'Greet the shopkeeper and ask about fruits',
        npcText: 'أهلاً بيك يا فندم، إزاي أقدر أساعد حضرتك؟',
        npcTranslation: 'Welcome sir/madam, how can I help you?',
        options: [
          {
            id: 'market-greeting-1',
            text: 'السلام عليكم، عندك إيه فواكه طازة النهاردة؟',
            translation: 'Hello, what fresh fruits do you have today?',
            isCorrect: true
          },
          {
            id: 'market-greeting-2',
            text: 'عايز أشوف الدكان اللي جنبك',
            translation: 'I want to see the shop next to yours',
            isCorrect: false
          },
          {
            id: 'market-greeting-3',
            text: 'أسعارك غالية أوي',
            translation: 'Your prices are very expensive',
            isCorrect: false
          }
        ]
      },
      {
        id: 'market-price',
        prompt: 'Ask about the price of mangoes',
        npcText: 'عندي مانجا حلوة، برتقال، موز، وتفاح، كلهم طازة',
        npcTranslation: 'I have nice mangoes, oranges, bananas, and apples, all fresh',
        options: [
          {
            id: 'market-price-1',
            text: 'المانجا شكلها حلو، بكام الكيلو؟',
            translation: 'The mangoes look nice, how much per kilo?',
            isCorrect: true
          },
          {
            id: 'market-price-2',
            text: 'مفيش فراولة؟',
            translation: 'No strawberries?',
            isCorrect: false
          },
          {
            id: 'market-price-3',
            text: 'الفواكه دي مش طازة',
            translation: 'These fruits are not fresh',
            isCorrect: false
          }
        ]
      },
      {
        id: 'market-buy',
        prompt: 'Negotiate and buy 2 kilos of mangoes',
        npcText: 'المانجا بأربعين جنيه الكيلو، حلوة جداً',
        npcTranslation: 'Mangoes are forty pounds per kilo, very sweet',
        options: [
          {
            id: 'market-buy-1',
            text: 'طيب، هاخد اتنين كيلو بسبعين جنيه، موافق؟',
            translation: 'Ok, I\'ll take two kilos for seventy pounds, agree?',
            isCorrect: true
          },
          {
            id: 'market-buy-2',
            text: 'لأ، غالية أوي',
            translation: 'No, it\'s too expensive',
            isCorrect: false
          },
          {
            id: 'market-buy-3',
            text: 'أنا مش عايز أي حاجة',
            translation: 'I don\'t want anything',
            isCorrect: false
          }
        ]
      },
      {
        id: 'market-payment',
        prompt: 'Pay and thank the shopkeeper',
        npcText: 'حاضر يا فندم، اتفضل اتنين كيلو مانجا حلوة',
        npcTranslation: 'Sure sir/madam, here are two kilos of sweet mangoes',
        options: [
          {
            id: 'market-payment-1',
            text: 'اتفضل الفلوس، شكراً جزيلاً',
            translation: 'Here\'s the money, thank you very much',
            isCorrect: true
          },
          {
            id: 'market-payment-2',
            text: 'عايز تذوقها الأول',
            translation: 'I want to taste it first',
            isCorrect: false
          },
          {
            id: 'market-payment-3',
            text: 'معنديش فلوس دلوقتي',
            translation: 'I don\'t have money now',
            isCorrect: false
          }
        ]
      }
    ]
  }
];
