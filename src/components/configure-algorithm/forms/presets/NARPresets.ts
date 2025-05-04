import { DESConfigAlgo_name } from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { NARFormInputs } from '../NARForm';

export const NARPresets: Presets<NARFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: DESConfigAlgo_name.des,
        seed: 5854,
        minconf: 0,
        minsup: 0.1,
        population_size: 1000,
        max_fitness_evaluations: 1000,
        differential_scale: 2,
        crossover_probability: 0.5,
      },
    },
  ],
  fileSpecific: [],
};
