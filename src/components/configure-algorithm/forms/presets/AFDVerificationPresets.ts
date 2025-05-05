import { FDVerifierConfigAlgo_name } from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { AFDVerificationFormInputs } from '../AFDVerificationForm';

export const AFDVerificationPresets: Presets<AFDVerificationFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: FDVerifierConfigAlgo_name.fdverifier,
        lhs_indices: [],
        rhs_indices: [],
        is_null_equal_null: false,
      },
    },
  ],
  fileSpecific: [],
};
