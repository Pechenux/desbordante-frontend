import {
  FastADCConfigAlgo_name,
  SchemaAdcTaskConfig,
} from '@/api/generated/schema';
import { SelectOption } from '@/components/common/uikit/Inputs';

export type ADCAlgorithms = SchemaAdcTaskConfig['config']['algo_name'];

export const ADCAlgorithmOptions: SelectOption<ADCAlgorithms>[] = [
  { label: 'FastADC', value: FastADCConfigAlgo_name.fastadc },
];

export const allowCrossColumnsOptions: SelectOption<boolean>[] = [
  { label: 'True', value: true },
  { label: 'False', value: false },
];

export const ADCFields = [
  'algo_name',
  'shard_length',
  'minimum_shared_value',
  'comparable_threshold',
  'allow_cross_columns',
  'evidence_threshold',
] as const;
