import {
  SchemaDdTaskConfig,
  SplitConfigAlgo_name,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

export type DDAlgorithms = SchemaDdTaskConfig['config']['algo_name'];

export const DDAlgorithmOptions: Option<DDAlgorithms>[] = [
  { label: 'Split', value: SplitConfigAlgo_name.split },
];

export const DDFields = ['algo_name', 'num_rows', 'num_columns'] as const;
