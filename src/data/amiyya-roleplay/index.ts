
import { taxiScenarios } from './taxi';
import { schoolScenarios } from './school';
import { homeScenarios } from './home';
import { marketScenarios } from './market';
import { doctorScenarios } from './doctor';

export const allAmiyyaScenarios = [
  ...taxiScenarios,
  ...schoolScenarios,
  ...homeScenarios,
  ...marketScenarios,
  ...doctorScenarios
];

export * from './types';
export * from './taxi';
export * from './school';
export * from './home';
export * from './market';
export * from './doctor';
