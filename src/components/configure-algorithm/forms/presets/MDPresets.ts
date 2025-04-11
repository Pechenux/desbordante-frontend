import {
  HyMDConfigAlgo_name,
  HyMDConfigLevel_definition,
  LevenshteinConfigMetrics,
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
        min_support: 1,
        prune_nondisjoint: true,
        max_cardinality: -1,
        threads: 0,
        level_definition: HyMDConfigLevel_definition.cardinality,
        column_matches: [
          {
            metrics: LevenshteinConfigMetrics.levenshtein,
            left_column: 'zoo',
            right_column: 'zoo',
            minimum_similarity: 0.7,
            bound_number_limit: 0,
          },
          {
            metrics: LevenshteinConfigMetrics.levenshtein,
            left_column: 'name',
            right_column: 'name',
            minimum_similarity: 0.7,
            bound_number_limit: 0,
          },
          {
            metrics: LevenshteinConfigMetrics.levenshtein,
            left_column: 'animal',
            right_column: 'animal',
            minimum_similarity: 0.7,
            bound_number_limit: 0,
          },
          {
            metrics: LevenshteinConfigMetrics.levenshtein,
            left_column: 'diet',
            right_column: 'diet',
            minimum_similarity: 0.7,
            bound_number_limit: 0,
          },
        ],
      },
    },
  ],
  fileSpecific: [],
};
