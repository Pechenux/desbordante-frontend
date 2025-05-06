import { PyroConfigAlgo_name } from '@/api/generated/schema';
import { FDFormInputs } from '@/components/configure-algorithm/forms/FDForm';
import { Presets } from '@/types/form';

export const FDPresets: Presets<FDFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: PyroConfigAlgo_name.pyro,
        max_lhs: 0,
        threads: 0,
        is_null_equal_null: false,
        seed: 0,
        custom_random_seed: 0,
      },
    },
  ],
  fileSpecific: [],
};
