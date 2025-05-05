import {
  DESConfigAlgo_name,
  SchemaNarTaskConfig,
} from '@/api/generated/schema';
import { SelectOption } from '@/components/common/uikit/Inputs';

export type NARAlgorithms = SchemaNarTaskConfig['config']['algo_name'];

export const NARAlgorithmOptions: SelectOption<NARAlgorithms>[] = [
  { label: 'DES', value: DESConfigAlgo_name.des },
];

export const NARFields = [
  'algo_name',
  'seed',
  'minconf',
  'minsup',
  'population_size',
  'max_fitness_evaluations',
  'differential_scale',
  'crossover_probability',
] as const;
