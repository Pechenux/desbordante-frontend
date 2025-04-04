import {
  DESConfigAlgo_name,
  SchemaNarTaskConfig,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

export type NARAlgorithms = SchemaNarTaskConfig['config']['algo_name'];

export const NARAlgorithmOptions: Option<NARAlgorithms>[] = [
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
