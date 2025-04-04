import {
  DESConfigAlgo_name,
  SchemaNarTaskConfig,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

export type NARAlgorithms = SchemaNarTaskConfig['config']['algo_name'];

export const FDAlgorithmOptions: Option<NARAlgorithms>[] = [
  { label: 'DES', value: DESConfigAlgo_name.des },
];

// export type NARFields =
//   | 'seed'
//   | 'minconf'
//   | 'minsup'
//   | 'population_size'
//   | 'max_fitness_evaluations'
//   | 'differential_scale'
//   | 'crossover_probability';

export const NARFields = [
  'seed',
  'minconf',
  'minsup',
  'population_size',
  'max_fitness_evaluations',
  'differential_scale',
  'crossover_probability',
];
