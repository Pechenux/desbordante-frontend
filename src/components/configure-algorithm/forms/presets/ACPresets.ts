import { BHUNTConfigAlgo_name, OperationType } from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { ACFormInputs } from '../ACForm';

export const ACPresets: Presets<ACFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: BHUNTConfigAlgo_name.bhunt,
        bumps_limit: 0,
        ac_seed: 11,
        iterations_limit: 4,
        fuzziness: 0.2,
        p_fuzz: 0.85,
        weight: 0.1,
        bin_operation: OperationType.ValueMinus,
      },
    },
  ],
  fileSpecific: [],
};
