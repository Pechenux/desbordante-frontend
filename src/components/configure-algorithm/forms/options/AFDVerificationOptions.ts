import {
  FDVerifierConfigAlgo_name,
  SchemaAfdVerificationTaskConfig,
} from '@/api/generated/schema';
import { SelectOption } from '@/components/common/uikit/Inputs';

export type AFDVerificationAlgorithms =
  SchemaAfdVerificationTaskConfig['config']['algo_name'];

export const AFDVerificationAlgorithmOptions: SelectOption<AFDVerificationAlgorithms>[] =
  [{ label: 'FDVerifier', value: FDVerifierConfigAlgo_name.fdverifier }];

export const AFDVerificationFields = [
  'algo_name',
  'lhs_indices',
  'rhs_indices',
  'is_null_equal_null',
] as const;
