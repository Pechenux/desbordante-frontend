import {
  MFDVerificationCosineConfigMetric,
  MFDVerificationEuclideanConfigMetric,
  MFDVerificationMetricAlgorithm,
  MFDVerificationLevenshteinConfigMetric,
} from '@/api/generated/schema';
import { Presets } from '@/types/form';
import { MFDFormInputs } from '../MFDForm';
import { MFDColumnCategories } from '../options/MFDOptions';

export const MFDPresets: Presets<MFDFormInputs> = {
  common: [
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: 'metricverification',
        lhs_indices: [],
        rhs_indices: [],
        rhsColumnType: MFDColumnCategories.Numeric,
        metric: MFDVerificationEuclideanConfigMetric.euclidean,
        metric_algorithm: MFDVerificationMetricAlgorithm.brute,
        parameter: 1.0,
        q: 1,
        dist_from_null_is_infinity: false,
        is_null_equal_null: true,
      },
    },
  ],
  fileSpecific: [
    {
      fileNames: ['MetricMovies.csv'],
      presets: [
        {
          name: 'metricmovies_dv_s',
          displayName: 'Metric Dependency Violated (tiny radius)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
          },
        },
        {
          name: 'metricmovies_dv_m',
          displayName: 'Metric Dependency Violated (medium radius)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            parameter: 3,
          },
        },
        {
          name: 'metricmovies_dv_l',
          displayName: 'Metric Dependency Violated (large radius)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            parameter: 6,
          },
        },
        {
          name: 'metricmovies_sat',
          displayName: 'Metric Dependency Satisfied',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            parameter: 7,
          },
        },
      ],
    },
    {
      fileNames: ['MetricAddresses.csv'],
      presets: [
        {
          name: 'metricaddresses_cv_st',
          displayName: 'Metric Cosine Violated (Strictest)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            rhsColumnType: MFDColumnCategories.String,
            metric: MFDVerificationCosineConfigMetric.cosine,
            parameter: 0.04,
            q: 2,
          },
        },
        {
          name: 'metricaddresses_cv_s',
          displayName: 'Metric Cosine Violated (Strict)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            rhsColumnType: MFDColumnCategories.String,
            metric: MFDVerificationCosineConfigMetric.cosine,
            parameter: 0.1,
            q: 2,
          },
        },
        {
          name: 'metricaddresses_cv_r',
          displayName: 'Metric Cosine Violated (Relaxed)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            rhsColumnType: MFDColumnCategories.String,
            metric: MFDVerificationCosineConfigMetric.cosine,
            parameter: 0.14,
            q: 2,
          },
        },
        {
          name: 'metricaddresses_cv_sat',
          displayName: 'Metric Cosine Satisfied',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            rhsColumnType: MFDColumnCategories.String,
            metric: MFDVerificationCosineConfigMetric.cosine,
            parameter: 0.19,
            q: 2,
          },
        },
        {
          name: 'metricaddresses_lv_st',
          displayName: 'Metric Levenshtein Violated (Strictest)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            rhsColumnType: MFDColumnCategories.String,
            metric: MFDVerificationLevenshteinConfigMetric.levenshtein,
            parameter: 0,
          },
        },
        {
          name: 'metricaddresses_lv_s',
          displayName: 'Metric Levenshtein Violated (Strict)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            rhsColumnType: MFDColumnCategories.String,
            metric: MFDVerificationLevenshteinConfigMetric.levenshtein,
            parameter: 3,
          },
        },
        {
          name: 'metricaddresses_lv_r',
          displayName: 'Metric Levenshtein Violated (Relaxed)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            rhsColumnType: MFDColumnCategories.String,
            metric: MFDVerificationLevenshteinConfigMetric.levenshtein,
            parameter: 6,
          },
        },
        {
          name: 'metricaddresses_lv_sat',
          displayName: 'Metric Levenshtein Satisfied',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2] as number[],
            rhsColumnType: MFDColumnCategories.String,
            metric: MFDVerificationLevenshteinConfigMetric.levenshtein,
            parameter: 10,
          },
        },
      ],
    },
    {
      fileNames: ['MetricCoords.csv'],
      presets: [
        {
          name: 'metriccoords_cv_st',
          displayName: 'Metric Calipers Violated (Strictest)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2, 3] as number[],
            metric_algorithm: MFDVerificationMetricAlgorithm.calipers,
            parameter: 0.002,
          },
        },
        {
          name: 'metriccoords_cv_s',
          displayName: 'Metric Calipers Violated (Strict)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2, 3] as number[],
            metric_algorithm: MFDVerificationMetricAlgorithm.calipers,
            parameter: 0.007,
          },
        },
        {
          name: 'metriccoords_cv_e',
          displayName: 'Metric Calipers Violated (Relaxed)',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2, 3] as number[],
            metric_algorithm: MFDVerificationMetricAlgorithm.calipers,
            parameter: 0.04,
          },
        },
        {
          name: 'metriccoords_cv_sat',
          displayName: 'Metric Calipers Satisfied',
          preset: {
            lhs_indices: [1] as number[],
            rhs_indices: [2, 3] as number[],
            metric_algorithm: MFDVerificationMetricAlgorithm.calipers,
            parameter: 0.065,
          },
        },
      ],
    },
  ],
};
