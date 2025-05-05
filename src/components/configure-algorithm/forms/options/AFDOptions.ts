import {
  AFDPyroConfigAlgo_name,
  AFDTaneConfigAlgo_name,
  AFDTaneConfigAfd_error_measure,
  SchemaAfdTaskConfig,
} from '@/api/generated/schema';
import { SelectOption } from '@/components/common/uikit/Inputs';

export type AFDAlgorithms = SchemaAfdTaskConfig['config']['algo_name'];

export const AFDAlgorithmOptions: SelectOption<AFDAlgorithms>[] = [
  { label: 'Pyro', value: AFDPyroConfigAlgo_name.pyro },
  { label: 'Tane', value: AFDTaneConfigAlgo_name.tane },
];

export const AFDCommonFields = [
  'error',
  'algo_name',
  'max_lhs',
  'is_null_equal_null',
] as const;

export type AFDOptionalFields = 'afd_error_measure' | 'seed' | 'threads';

export const optionalFieldsByAlgorithm: Record<
  AFDAlgorithms,
  AFDOptionalFields[]
> = {
  [AFDPyroConfigAlgo_name.pyro]: ['threads', 'seed'],
  [AFDTaneConfigAlgo_name.tane]: ['afd_error_measure'],
};

export const ErrorMeasuresOptions: SelectOption<AFDTaneConfigAfd_error_measure>[] =
  [
    { label: 'g1', value: AFDTaneConfigAfd_error_measure.g1 },
    { label: 'mu+', value: AFDTaneConfigAfd_error_measure.mu_plus },
    { label: 'pdep', value: AFDTaneConfigAfd_error_measure.pdep },
    { label: 'rho', value: AFDTaneConfigAfd_error_measure.rho },
    { label: 'tau', value: AFDTaneConfigAfd_error_measure.tau },
  ];
