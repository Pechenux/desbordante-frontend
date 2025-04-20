import { AFDPyroConfigAlgo_name } from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { AFDFormInputs } from '../AFDForm';

export const AFDPresets: Presets<AFDFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: AFDPyroConfigAlgo_name.pyro,
        max_lhs: 0,
        error: 0.3,
        threads: 0,
        is_null_equal_null: false,
        seed: 0,
      },
    },
  ],
  fileSpecific: [],
};
