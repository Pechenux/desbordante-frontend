import {
  PFDTaneConfigAlgo_name,
  PFDTaneConfigPfd_error_measure,
} from '@/api/generated/schema';
import { PFDFormInputs } from '@/components/configure-algorithm/forms/PFDForm';
import { Presets } from '@/types/form';

export const PFDPresets: Presets<PFDFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: PFDTaneConfigAlgo_name.pfdtane,
        pfd_error_measure: PFDTaneConfigPfd_error_measure.per_tuple,
        max_lhs: 0,
        threads: 0,
        is_null_equal_null: false,
      },
    },
  ],
  fileSpecific: [],
};
