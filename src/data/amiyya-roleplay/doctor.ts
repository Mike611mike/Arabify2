
import { AmiyyaScenario } from './types';

export const doctorScenarios: AmiyyaScenario[] = [
  {
    id: 'doctor-1',
    category: 'doctor',
    title: 'At the Doctor',
    description: 'Practice medical conversations in Egyptian Arabic',
    icon: 'stethoscope',
    stages: [
      {
        id: 'doctor-greeting',
        prompt: 'Greet the doctor and explain your problem',
        npcText: 'أهلاً بيك، اتفضل قول لي إيه المشكلة؟',
        npcTranslation: 'Welcome, please tell me what\'s the problem?',
        options: [
          {
            id: 'doctor-greeting-1',
            text: 'السلام عليكم يا دكتور، عندي صداع جامد من امبارح وحرارة شوية',
            translation: 'Hello doctor, I have a severe headache since yesterday and a bit of fever',
            isCorrect: true
          },
          {
            id: 'doctor-greeting-2',
            text: 'إزيك يا دكتور، عامل إيه؟',
            translation: 'How are you doctor, how are you doing?',
            isCorrect: false
          },
          {
            id: 'doctor-greeting-3',
            text: 'أنا مش عايز آخد دوا',
            translation: 'I don\'t want to take medicine',
            isCorrect: false
          }
        ]
      },
      {
        id: 'doctor-symptoms',
        prompt: 'Provide more details about your symptoms',
        npcText: 'طيب، وإيه الأعراض التانية؟ عندك كحة أو برد؟',
        npcTranslation: 'Ok, and what are the other symptoms? Do you have a cough or cold?',
        options: [
          {
            id: 'doctor-symptoms-1',
            text: 'آه، عندي كحة جافة وجسمي تعبان، ومش قادر أنام كويس',
            translation: 'Yes, I have a dry cough and my body is tired, and I can\'t sleep well',
            isCorrect: true
          },
          {
            id: 'doctor-symptoms-2',
            text: 'أنا مش عارف',
            translation: 'I don\'t know',
            isCorrect: false
          },
          {
            id: 'doctor-symptoms-3',
            text: 'هو الكشف هياخد وقت طويل؟',
            translation: 'Will the examination take a long time?',
            isCorrect: false
          }
        ]
      },
      {
        id: 'doctor-medicine',
        prompt: 'Ask about the medicine and treatment',
        npcText: 'شكله انفلونزا بسيطة، هكتب لك مضاد حيوي ودوا للصداع والكحة',
        npcTranslation: 'It looks like a mild flu, I\'ll write you an antibiotic and medicine for headache and cough',
        options: [
          {
            id: 'doctor-medicine-1',
            text: 'شكراً يا دكتور، آخد الدوا كام مرة في اليوم؟ ولازم آكل قبله؟',
            translation: 'Thank you doctor, how many times a day should I take the medicine? And should I eat before it?',
            isCorrect: true
          },
          {
            id: 'doctor-medicine-2',
            text: 'أنا مش عايز مضاد حيوي',
            translation: 'I don\'t want an antibiotic',
            isCorrect: false
          },
          {
            id: 'doctor-medicine-3',
            text: 'بكام الكشف؟',
            translation: 'How much is the examination?',
            isCorrect: false
          }
        ]
      },
      {
        id: 'doctor-thank',
        prompt: 'Thank the doctor and ask when to return',
        npcText: 'خد المضاد الحيوي مرتين في اليوم بعد الأكل، ودوا الصداع كل 8 ساعات',
        npcTranslation: 'Take the antibiotic twice a day after food, and the headache medicine every 8 hours',
        options: [
          {
            id: 'doctor-thank-1',
            text: 'شكراً جزيلاً يا دكتور، لو مخفش الصداع، أرجع لحضرتك إمتى؟',
            translation: 'Thank you very much doctor, if the headache doesn\'t go away, when should I return?',
            isCorrect: true
          },
          {
            id: 'doctor-thank-2',
            text: 'الدوا ده غالي؟',
            translation: 'Is this medicine expensive?',
            isCorrect: false
          },
          {
            id: 'doctor-thank-3',
            text: 'أنا مش هآخد الدوا',
            translation: 'I won\'t take the medicine',
            isCorrect: false
          }
        ]
      }
    ]
  }
];
