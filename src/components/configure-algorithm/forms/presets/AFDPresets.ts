import {
  AFDPyroConfigAlgo_name,
  AFDTaneConfigAfd_error_measure,
} from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { AFDFormInputs } from '../AFDForm';

export const AFDPresets: Presets<AFDFormInputs> = {
  common: [
    {
      name: 'strict',
      displayName: 'Strict preset',
      preset: {
        error: 0,
      },
    },
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: AFDPyroConfigAlgo_name.pyro,
        max_lhs: 0,
        error: 0.3,
        is_null_equal_null: false,
        afd_error_measure: AFDTaneConfigAfd_error_measure.g1,
        threads: 0,
        seed: 0,
      },
    },
  ],
  fileSpecific: [],
};
