import {
  HyMDConfigAlgo_name,
  HyMDConfigLevel_definition,
  SchemaMdTaskConfigInput,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

export type MDAlgorithms = SchemaMdTaskConfigInput['config']['algo_name'];

export const MDAlgorithmOptions: Option<MDAlgorithms>[] = [
  { label: 'HyMD', value: HyMDConfigAlgo_name.hymd },
];

export const levelDefenitionOptions: Option<HyMDConfigLevel_definition>[] = [
  { label: 'Cardinality', value: HyMDConfigLevel_definition.cardinality },
  { label: 'Lattice', value: HyMDConfigLevel_definition.lattice },
];

export const pruneNondisjointOptions: Option<boolean>[] = [
  { label: 'True', value: true },
  { label: 'False', value: false },
];

export const MDFields = [
  'algo_name',
  'min_support',
  'level_definition',
  'prune_nondisjoint',
  'column_matches',
  'max_cardinality',
  'threads',
] as const;
