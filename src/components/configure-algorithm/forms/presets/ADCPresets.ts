import { FastADCConfigAlgo_name } from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { ADCFormInputs } from '../ADCForm';

export const ADCPresets: Presets<ADCFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: FastADCConfigAlgo_name.fastadc,
        shard_length: 0,
        minimum_shared_value: 0,
        comparable_threshold: 0,
        allow_cross_columns: true,
        evidence_threshold: 0,
      },
    },
  ],
  fileSpecific: [],
};
