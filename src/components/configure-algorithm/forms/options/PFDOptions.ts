import {
  PFDTaneConfigAlgo_name,
  PFDTaneConfigPfd_error_measure,
  SchemaPfdTaskConfig,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

export type PFDAlgorithms = SchemaPfdTaskConfig['config']['algo_name'];

export const PFDAlgorithmOptions: Option<PFDAlgorithms>[] = [
  { label: 'PFDTane', value: PFDTaneConfigAlgo_name.pfdtane },
];

export const PFDErrorMeasuresOptions: Option<PFDTaneConfigPfd_error_measure>[] =
  [
    { label: 'Per value', value: PFDTaneConfigPfd_error_measure.per_value },
    { label: 'Per tuple', value: PFDTaneConfigPfd_error_measure.per_tuple },
  ];

export const PFDFields = [
  'algo_name',
  'max_lhs',
  'is_null_equal_null',
  'error',
  'pfd_error_measure',
] as const;
