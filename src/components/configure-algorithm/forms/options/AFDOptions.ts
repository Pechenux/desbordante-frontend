import {
  AFDPyroConfigAlgo_name,
  AFDTaneConfigAlgo_name,
  AFDTaneConfigError_measure,
  SchemaAfdTaskConfig,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

export type AFDAlgorithms = SchemaAfdTaskConfig['config']['algo_name'];

export const AFDAlgorithmOptions: Option<AFDAlgorithms>[] = [
  { label: 'Pyro', value: AFDPyroConfigAlgo_name.pyro },
  { label: 'Tane', value: AFDTaneConfigAlgo_name.tane },
];

export const AFDCommonFields = [
  'error',
  'algo_name',
  'max_lhs',
  'is_null_equal_null',
] as const;

export type AFDOptionalFields = 'error_measure' | 'seed' | 'threads';

export const optionalFieldsByAlgorithm: Record<
  AFDAlgorithms,
  AFDOptionalFields[]
> = {
  [AFDPyroConfigAlgo_name.pyro]: ['threads', 'seed'],
  [AFDTaneConfigAlgo_name.tane]: ['error_measure'],
};

export const ErrorMeasuresOptions: Option<AFDTaneConfigError_measure>[] = [
  { label: 'g1', value: AFDTaneConfigError_measure.g1 },
  { label: 'mu+', value: AFDTaneConfigError_measure.mu_plus },
  { label: 'pdep', value: AFDTaneConfigError_measure.pdep },
  { label: 'rho', value: AFDTaneConfigError_measure.rho },
  { label: 'tau', value: AFDTaneConfigError_measure.tau },
];
