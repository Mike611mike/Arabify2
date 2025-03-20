
import { AmiyyaScenario } from './types';

export const taxiScenarios: AmiyyaScenario[] = [
  {
    id: 'taxi-1',
    category: 'taxi',
    title: 'Taking a Taxi',
    description: 'Practice taking a taxi in Egyptian Arabic',
    icon: 'car-taxi',
    stages: [
      {
        id: 'taxi-greeting',
        prompt: 'Greet the taxi driver and ask to go downtown',
        npcText: 'السلام عليكم، رايح فين؟',
        npcTranslation: 'Hello, where are you going?',
        options: [
          {
            id: 'taxi-greeting-1',
            text: 'السلام عليكم، عايز أروح وسط البلد لو سمحت',
            translation: 'Hello, I want to go downtown please',
            isCorrect: true
          },
          {
            id: 'taxi-greeting-2',
            text: 'صباح الخير، ممكن تاخدني المطار',
            translation: 'Good morning, can you take me to the airport',
            isCorrect: false
          },
          {
            id: 'taxi-greeting-3',
            text: 'أهلاً، أنا مش عارف أروح فين',
            translation: 'Hi, I don\'t know where to go',
            isCorrect: false
          }
        ]
      },
      {
        id: 'taxi-price',
        prompt: 'Ask about the price',
        npcText: 'حاضر، وسط البلد. هناخد حوالي نص ساعة بالزحمة دي',
        npcTranslation: 'Sure, downtown. It will take about half an hour with this traffic',
        options: [
          {
            id: 'taxi-price-1',
            text: 'هتاخد كام؟',
            translation: 'How much will it cost?',
            isCorrect: true
          },
          {
            id: 'taxi-price-2',
            text: 'أنا مستعجل جداً',
            translation: 'I am in a hurry',
            isCorrect: false
          },
          {
            id: 'taxi-price-3',
            text: 'عندك فكة؟',
            translation: 'Do you have change?',
            isCorrect: false
          }
        ]
      },
      {
        id: 'taxi-negotiate',
        prompt: 'Negotiate the price',
        npcText: 'حوالي خمسين جنيه',
        npcTranslation: 'About fifty pounds',
        options: [
          {
            id: 'taxi-negotiate-1',
            text: 'خمسين كتير، ممكن بأربعين؟',
            translation: 'Fifty is too much, how about forty?',
            isCorrect: true
          },
          {
            id: 'taxi-negotiate-2',
            text: 'ماشي، متشكر',
            translation: 'Ok, thank you',
            isCorrect: false
          },
          {
            id: 'taxi-negotiate-3',
            text: 'مفيش أرخص من كده؟',
            translation: 'Is there anything cheaper than this?',
            isCorrect: false
          }
        ]
      },
      {
        id: 'taxi-arrival',
        prompt: 'Pay and thank the driver',
        npcText: 'خلاص أربعين ماشي. وصلنا خلاص، اتفضل',
        npcTranslation: 'Fine, forty is ok. We have arrived, here you are',
        options: [
          {
            id: 'taxi-arrival-1',
            text: 'شكراً جزيلاً، اتفضل الفلوس دي',
            translation: 'Thank you very much, here is the money',
            isCorrect: true
          },
          {
            id: 'taxi-arrival-2',
            text: 'عندك كام الساعة؟',
            translation: 'What time is it?',
            isCorrect: false
          },
          {
            id: 'taxi-arrival-3',
            text: 'أنا نسيت المحفظة في البيت',
            translation: 'I forgot my wallet at home',
            isCorrect: false
          }
        ]
      }
    ]
  }
];
