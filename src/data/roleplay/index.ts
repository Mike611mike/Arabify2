
import { dailyLifeScenarios } from './daily-life';
import { serviceScenarios } from './services';
import { travelScenarios } from './travel';
import { socialScenarios } from './social';

// Export all scenarios in a single array
export const rolePlayScenarios = [
  ...dailyLifeScenarios,
  ...serviceScenarios,
  ...travelScenarios,
  ...socialScenarios
];

// Export the types
export type RolePlayScenario = {
  id: string;
  title: string;
  description: string;
  stages: RolePlayStage[];
};

export type RolePlayStage = {
  stage: string;
  prompt: string;
  npcResponse: string;
  npcResponseTranslation: string;
};
