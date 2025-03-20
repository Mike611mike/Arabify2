
import { RolePlayScenario } from './index';

// Travel-related scenarios (airport, hotel, taxi)
export const travelScenarios: RolePlayScenario[] = [
  {
    id: "airport",
    title: "At the Airport",
    description: "You're checking in for your flight at the airport.",
    stages: [
      {
        stage: "greeting",
        prompt: "Greet the staff and show your passport",
        npcResponse: "صباح الخير. ممكن أشوف الباسبور والتذكرة بتاعتك لو سمحت؟",
        npcResponseTranslation: "Good morning. May I see your passport and flight ticket please?"
      },
      {
        stage: "information",
        prompt: "Provide your flight information",
        npcResponse: "شكراً. رحلتك لدبي الساعة ١١:٣٠. عندك شنط هتشحنها؟",
        npcResponseTranslation: "Thank you. Your flight to Dubai is at 11:30. Do you have any luggage to check in?"
      },
      {
        stage: "luggage",
        prompt: "Say you have one suitcase to check in",
        npcResponse: "تمام، حط الشنطة هنا على الميزان لو سمحت. وزنها ٢٣ كيلو، ضمن الحد المسموح.",
        npcResponseTranslation: "Okay, please place the suitcase here on the scale. It weighs 23 kg, within the allowed limit."
      },
      {
        stage: "seat",
        prompt: "Ask about your seat on the plane",
        npcResponse: "مكانك رقم ٢٤A، وهو مكان جنب الشباك. كويس كدة ولا عايز تغيره؟",
        npcResponseTranslation: "Your seat is 24A, a window seat. Is this suitable or would you like to change it?"
      },
      {
        stage: "boarding",
        prompt: "Ask when boarding starts",
        npcResponse: "الركوب هيبدأ الساعة ١٠:٤٥ من البوابة رقم ٧. رحلة سعيدة!",
        npcResponseTranslation: "Boarding will begin at 10:45 from gate number 7. Have a pleasant journey!"
      }
    ]
  },
  {
    id: "hotel",
    title: "At a Hotel",
    description: "You're checking into a hotel for your vacation.",
    stages: [
      {
        stage: "arrival",
        prompt: "Greet the receptionist and mention your reservation",
        npcResponse: "أهلاً بيك في فندق النجوم! عندك حجز معانا؟",
        npcResponseTranslation: "Welcome to Stars Hotel! Do you have a reservation with us?"
      },
      {
        stage: "reservation",
        prompt: "Confirm your reservation details",
        npcResponse: "أيوة، شايف الحجز بتاعك هنا. أوضة لشخصين لمدة ٣ ليالي، من النهاردة. صح كدة؟",
        npcResponseTranslation: "Yes, I see your reservation here. A room for two people for 3 nights, starting today. Is that correct?"
      },
      {
        stage: "check-in",
        prompt: "Ask about check-in time and breakfast",
        npcResponse: "ممكن تعمل تشيك-إن دلوقتي. الفطار من الساعة ٧ لحد ١٠ الصبح في المطعم اللي في الدور الأرضي.",
        npcResponseTranslation: "You can check in now. Breakfast is served from 7 to 10 AM in the restaurant on the ground floor."
      },
      {
        stage: "amenities",
        prompt: "Ask about hotel facilities",
        npcResponse: "عندنا حمام سباحة على السطح، وجيم في الدور التاني، والواي فاي مجاني في كل الفندق.",
        npcResponseTranslation: "We have a rooftop swimming pool, a gym on the second floor, and free Wi-Fi throughout the hotel."
      },
      {
        stage: "room-key",
        prompt: "Ask for your room key",
        npcResponse: "أكيد، دي مفاتيح أوضتك، رقم ٣٠٥ في الدور التالت. الأسانسير على يمينك. إقامة سعيدة!",
        npcResponseTranslation: "Certainly, here are your room keys, number 305 on the third floor. The elevator is on your right. Enjoy your stay!"
      }
    ]
  },
  {
    id: "taxi",
    title: "Taking a Taxi",
    description: "You need to take a taxi to a famous landmark.",
    stages: [
      {
        stage: "hailing",
        prompt: "Hail a taxi and say hello",
        npcResponse: "أهلاً! رايح فين؟",
        npcResponseTranslation: "Hello! Where would you like to go?"
      },
      {
        stage: "destination",
        prompt: "Say you want to go to the pyramids",
        npcResponse: "رايح الأهرامات؟ طبعاً! الرحلة هتاخد حوالي ٣٠ دقيقة. تمام كدة؟",
        npcResponseTranslation: "To the pyramids? Sure! The trip will take about 30 minutes. Is that okay?"
      },
      {
        stage: "confirming",
        prompt: "Ask about the price",
        npcResponse: "الرحلة هتكلفك ١٠٠ جنيه. كويس كدة ليك؟",
        npcResponseTranslation: "The trip will cost you 100 pounds. Is that suitable for you?"
      },
      {
        stage: "negotiating",
        prompt: "Say it's too expensive and offer 70 pounds",
        npcResponse: "طيب، ٨٠ جنيه ومش أقل من كدة. اتفقنا؟",
        npcResponseTranslation: "Okay, 80 pounds and not less than that. Deal?"
      },
      {
        stage: "agreeing",
        prompt: "Agree to the price",
        npcResponse: "تمام! هنوصل الأهرامات قريب. استمتع بالرحلة!",
        npcResponseTranslation: "Great! We'll reach the pyramids soon. Enjoy the ride!"
      }
    ]
  }
];
