
export interface AmiyyaOption {
  id: string;
  text: string;
  translation: string;
  isCorrect: boolean;
}

export interface AmiyyaStage {
  id: string;
  prompt: string;
  npcText: string;
  npcTranslation: string;
  options: AmiyyaOption[];
}

export interface AmiyyaScenario {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  stages: AmiyyaStage[];
}
