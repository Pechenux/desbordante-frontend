import {
  PFDTaneConfigPfd_error_measure,
  PyroConfigAlgo_name,
  TaneConfigAfd_error_measure,
} from '@/api/generated/schema';
import { FDFormInputs } from '@/components/configure-algorithm/forms/FDForm';
import { Presets } from '@/types/form';

export const FDPresets: Presets<FDFormInputs> = {
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
        algo_name: PyroConfigAlgo_name.pyro,
        max_lhs: 1,
        error: 0,
        threads: 1,
        is_null_equal_null: false,
        seed: 0,
        custom_random_seed: 0,
        afd_error_measure: TaneConfigAfd_error_measure.g1,
        pfd_error_measure: PFDTaneConfigPfd_error_measure.per_value,
      },
    },
  ],
  fileSpecific: [
    {
      fileNames: ['breast_cancer.csv'],
      presets: [
        {
          name: 'breastcancerexample',
          displayName: 'Breast Cancer Example preset',
          preset: {
            error: 0.03,
          },
        },
      ],
    },
  ],
};
