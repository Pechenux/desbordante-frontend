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
        num_rows: 0,
        num_columns: 0,
      },
    },
  ],
  fileSpecific: [],
};
