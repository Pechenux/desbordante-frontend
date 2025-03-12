import {
  FastADCConfigAlgo_name,
  SchemaAdcTaskConfig,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

export type ADCAlgorithms = SchemaAdcTaskConfig['config']['algo_name'];

export const ADCAlgorithmOptions: Option<ADCAlgorithms>[] = [
  { label: 'FastADC', value: FastADCConfigAlgo_name.fastadc },
];

export const allowCrossColumnsOptions: Option<boolean>[] = [
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
