
import { AmiyyaScenario } from './types';

export const homeScenarios: AmiyyaScenario[] = [
  {
    id: 'home-1',
    category: 'home',
    title: 'At Home',
    description: 'Practice family conversations in Egyptian Arabic',
    icon: 'home',
    stages: [
      {
        id: 'home-greeting',
        prompt: 'Greet your parents when you come home',
        npcText: 'أهلاً يا حبيبي، إزيك؟ عملت إيه في المدرسة النهاردة؟',
        npcTranslation: 'Hello dear, how are you? What did you do at school today?',
        options: [
          {
            id: 'home-greeting-1',
            text: 'السلام عليكم يا ماما، الحمد لله. خدنا درس حلو عن الأهرامات',
            translation: 'Hello mom, I\'m fine thank God. We had a nice lesson about the pyramids',
            isCorrect: true
          },
          {
            id: 'home-greeting-2',
            text: 'أنا جعان جداً، عايز آكل',
            translation: 'I\'m very hungry, I want to eat',
            isCorrect: false
          },
          {
            id: 'home-greeting-3',
            text: 'المدرسة كانت مملة خالص',
            translation: 'School was very boring',
            isCorrect: false
          }
        ]
      },
      {
        id: 'home-dinner',
        prompt: 'Ask what\'s for dinner',
        npcText: 'شاطر يا حبيبي، المدرسة مهمة علشان مستقبلك',
        npcTranslation: 'Good job dear, school is important for your future',
        options: [
          {
            id: 'home-dinner-1',
            text: 'صح يا ماما، هناكل إيه النهاردة؟ أنا جعان شوية',
            translation: 'True mom, what are we eating today? I\'m a bit hungry',
            isCorrect: true
          },
          {
            id: 'home-dinner-2',
            text: 'أنا مش عايز أذاكر',
            translation: 'I don\'t want to study',
            isCorrect: false
          },
          {
            id: 'home-dinner-3',
            text: 'فين بابا؟',
            translation: 'Where is dad?',
            isCorrect: false
          }
        ]
      },
      {
        id: 'home-help',
        prompt: 'Offer to help with housework',
        npcText: 'عملت كشري النهاردة، زي ما بتحب',
        npcTranslation: 'I made koshari today, just as you like',
        options: [
          {
            id: 'home-help-1',
            text: 'شكراً يا ماما، تحبي أساعدك في حاجة قبل الأكل؟',
            translation: 'Thank you mom, would you like me to help you with anything before eating?',
            isCorrect: true
          },
          {
            id: 'home-help-2',
            text: 'أنا مش بحب الكشري',
            translation: 'I don\'t like koshari',
            isCorrect: false
          },
          {
            id: 'home-help-3',
            text: 'عايز ألعب على الموبايل',
            translation: 'I want to play on my phone',
            isCorrect: false
          }
        ]
      }
    ]
  }
];
