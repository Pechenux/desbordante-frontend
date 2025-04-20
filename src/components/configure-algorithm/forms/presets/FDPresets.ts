import { HyFDConfigAlgo_name } from '@/api/generated/schema';
import { FDFormInputs } from '@/components/configure-algorithm/forms/FDForm';
import { Presets } from '@/types/form';

export const FDPresets: Presets<FDFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: HyFDConfigAlgo_name.hyfd,
        max_lhs: 0,
        threads: 0,
        is_null_equal_null: false,
      },
    },
  ],
  fileSpecific: [],
};
