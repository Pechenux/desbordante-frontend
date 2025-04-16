import {
  BHUNTConfigAlgo_name,
  OperationType,
  SchemaAcTaskConfigInput,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

export type ACAlgorithms = SchemaAcTaskConfigInput['config']['algo_name'];

export const ACAlgorithmOptions: Option<ACAlgorithms>[] = [
  { label: 'BHUNT', value: BHUNTConfigAlgo_name.bhunt },
];

export const operationOptions: Option<OperationType>[] = [
  { label: 'Addition (+)', value: OperationType['+'] },
  { label: 'Subtraction (-)', value: OperationType.ValueMinus },
  { label: 'Multiplication (*)', value: OperationType['*'] },
  { label: 'Division (/)', value: OperationType['/'] },
];

export const ACFields = [
  'algo_name',
  'bumps_limit',
  'ac_seed',
  'iterations_limit',
  'fuzziness',
  'p_fuzz',
  'weight',
  'bin_operation',
] as const;
