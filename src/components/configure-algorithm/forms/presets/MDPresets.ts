import {
  HyMDConfigAlgo_name,
  HyMDConfigLevel_definition,
} from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { MDFormInputs } from '../MDForm';

export const MDPresets: Presets<MDFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: HyMDConfigAlgo_name.hymd,
        min_support: 0,
        prune_nondisjoint: true,
        max_cardinality: -1,
        threads: 0,
        level_definition: HyMDConfigLevel_definition.cardinality,
        column_matches: [],
      },
    },
  ],
  fileSpecific: [],
};
