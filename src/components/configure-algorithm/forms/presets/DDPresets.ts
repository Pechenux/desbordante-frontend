import { SplitConfigAlgo_name } from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { DDFormInputs } from '../DDForm';

export const DDPresets: Presets<DDFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: SplitConfigAlgo_name.split,
        num_rows: 10,
        num_columns: 6,
      },
    },
  ],
  fileSpecific: [],
};
