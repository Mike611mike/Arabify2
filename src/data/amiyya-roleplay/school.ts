
import { AmiyyaScenario } from './types';

export const schoolScenarios: AmiyyaScenario[] = [
  {
    id: 'school-1',
    category: 'school',
    title: 'At the School',
    description: 'Practice school conversations in Egyptian Arabic',
    icon: 'school',
    stages: [
      {
        id: 'school-greeting',
        prompt: 'Greet your teacher and ask about today\'s lesson',
        npcText: 'صباح الخير يا طلبة، إزيكم النهاردة؟',
        npcTranslation: 'Good morning students, how are you today?',
        options: [
          {
            id: 'school-greeting-1',
            text: 'صباح النور يا أستاذ، إحنا كويسين الحمد لله. إيه درس النهاردة؟',
            translation: 'Good morning teacher, we are fine thank God. What is today\'s lesson?',
            isCorrect: true
          },
          {
            id: 'school-greeting-2',
            text: 'أنا تعبان ومش عايز أذاكر',
            translation: 'I\'m tired and don\'t want to study',
            isCorrect: false
          },
          {
            id: 'school-greeting-3',
            text: 'عايز أروح البيت بدري النهاردة',
            translation: 'I want to go home early today',
            isCorrect: false
          }
        ]
      },
      {
        id: 'school-question',
        prompt: 'Ask a question about something you don\'t understand',
        npcText: 'النهاردة هنتكلم عن تاريخ مصر القديمة والأهرامات',
        npcTranslation: 'Today we will talk about the history of ancient Egypt and the pyramids',
        options: [
          {
            id: 'school-question-1',
            text: 'لو سمحت يا أستاذ، ممكن توضح لنا إزاي بنوا الأهرامات؟',
            translation: 'Excuse me teacher, can you explain to us how they built the pyramids?',
            isCorrect: true
          },
          {
            id: 'school-question-2',
            text: 'أنا عايز ألعب كورة',
            translation: 'I want to play football',
            isCorrect: false
          },
          {
            id: 'school-question-3',
            text: 'أنا مش فاهم حاجة خالص',
            translation: 'I don\'t understand anything at all',
            isCorrect: false
          }
        ]
      },
      {
        id: 'school-answer',
        prompt: 'Answer your teacher\'s question about the pyramids',
        npcText: 'شاطر، سؤال كويس. مين فيكم يعرف الأهرامات اتبنت إمتى؟',
        npcTranslation: 'Good, nice question. Who knows when the pyramids were built?',
        options: [
          {
            id: 'school-answer-1',
            text: 'أعتقد إنها اتبنت من حوالي 4500 سنة يا أستاذ',
            translation: 'I think they were built about 4500 years ago, teacher',
            isCorrect: true
          },
          {
            id: 'school-answer-2',
            text: 'أنا معرفش، مش مهتم',
            translation: 'I don\'t know, I\'m not interested',
            isCorrect: false
          },
          {
            id: 'school-answer-3',
            text: 'من سنة تقريباً',
            translation: 'About a year ago',
            isCorrect: false
          }
        ]
      }
    ]
  }
];
