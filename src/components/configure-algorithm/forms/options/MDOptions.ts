import {
  HyMDConfigAlgo_name,
  HyMDConfigLevel_definition,
  SchemaMdTaskConfigInput,
} from '@/api/generated/schema';
import { SelectOption } from '@/components/common/uikit/Inputs';

export type MDAlgorithms = SchemaMdTaskConfigInput['config']['algo_name'];

export const MDAlgorithmOptions: SelectOption<MDAlgorithms>[] = [
  { label: 'HyMD', value: HyMDConfigAlgo_name.hymd },
];

export const levelDefenitionOptions: SelectOption<HyMDConfigLevel_definition>[] =
  [
    { label: 'Cardinality', value: HyMDConfigLevel_definition.cardinality },
    { label: 'Lattice', value: HyMDConfigLevel_definition.lattice },
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
