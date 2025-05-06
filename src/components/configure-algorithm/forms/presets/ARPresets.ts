import {
  AprioriConfigAlgo_name,
  AprioriConfigInput_format,
} from '@/api/generated/schema';
import { ARFormInputs } from '@/components/configure-algorithm/forms/ARForm';
import { Presets } from '@/types/form';

export const ARPresets: Presets<ARFormInputs> = {
  common: [
    {
      name: 'strict',
      displayName: 'Strict',
      preset: {
        minconf: 1,
      },
    },
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: AprioriConfigAlgo_name.assosiatiorulesapriori,
        input_format: AprioriConfigInput_format.tabular,
        minconf: 0,
        minsup: 0,
      },
    },
  ],
  fileSpecific: [
    {
      fileNames: ['rules-kaggle-rows-2.csv'],
      presets: [
        {
          name: 'kaggleexample',
          displayName: 'Kaggle Example preset',
          preset: {
            minconf: 0.5,
            minsup: 0.1,
          },
        },
      ],
    },
  ],
};
