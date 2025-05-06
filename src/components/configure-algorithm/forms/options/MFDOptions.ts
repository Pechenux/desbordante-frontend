import {
  MFDVerificationCosineConfigMetric,
  MFDVerificationEuclideanConfigMetric,
  MFDVerificationLevenshteinConfigMetric,
  MFDVerificationMetricAlgorithm,
  SchemaMfdVerificationTaskConfigInput,
} from '@/api/generated/schema';
import { SelectOption } from '@/components/common/uikit';

export type MFDColumnTypes = 'Int' | 'Double' | 'BigInt' | 'String';
export enum MFDColumnCategories {
  Numeric = 'Numeric',
  String = 'String',
}

export const TypesCategories: Record<MFDColumnTypes, MFDColumnCategories> = {
  Int: MFDColumnCategories.Numeric,
  Double: MFDColumnCategories.Numeric,
  BigInt: MFDColumnCategories.Numeric,
  String: MFDColumnCategories.String,
};

export const MFDAlgorithmOptions: SelectOption<MFDVerificationMetricAlgorithm>[] =
  [
    { label: 'Brute', value: MFDVerificationMetricAlgorithm.brute },
    { label: 'Approx', value: MFDVerificationMetricAlgorithm.approx },
    { label: 'Calipers', value: MFDVerificationMetricAlgorithm.calipers },
  ];

export const MFDColumnCategoriesOptions: SelectOption<MFDColumnCategories>[] = [
  { label: 'Numeric', value: MFDColumnCategories.Numeric },
  { label: 'String', value: MFDColumnCategories.String },
];

export type MFDMetricTypes =
  SchemaMfdVerificationTaskConfigInput['config']['metric'];

export const MFDMetricOptions: SelectOption<MFDMetricTypes>[] = [
  { label: 'Euclidean', value: MFDVerificationEuclideanConfigMetric.euclidean },
  { label: 'Cosine', value: MFDVerificationCosineConfigMetric.cosine },
  {
    label: 'Levenshtein',
    value: MFDVerificationLevenshteinConfigMetric.levenshtein,
  },
];
