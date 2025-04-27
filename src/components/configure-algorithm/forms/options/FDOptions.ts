import {
  AidConfigAlgo_name,
  DepminerConfigAlgo_name,
  DFDConfigAlgo_name,
  EulerFDConfigAlgo_name,
  FastFDsConfigAlgo_name,
  FDepConfigAlgo_name,
  FdMineConfigAlgo_name,
  FUNConfigAlgo_name,
  HyFDConfigAlgo_name,
  PFDTaneConfigAlgo_name,
  PFDTaneConfigPfd_error_measure,
  PyroConfigAlgo_name,
  SchemaFdTaskConfig,
  TaneConfigAfd_error_measure,
  TaneConfigAlgo_name,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';
import { UnionKeys } from '@/types/unionKeys';

export type FDAlgorithms = SchemaFdTaskConfig['config']['algo_name'];

export const FDAlgorithmOptions: Option<FDAlgorithms>[] = [
  { label: 'Pyro', value: PyroConfigAlgo_name.pyro },
  { label: 'Tane', value: TaneConfigAlgo_name.tane },
  { label: 'FastFDs', value: FastFDsConfigAlgo_name.fastfds },
  { label: 'HyFD', value: HyFDConfigAlgo_name.hyfd },
  { label: 'FD mine', value: FdMineConfigAlgo_name.fdmine },
  { label: 'DFD', value: DFDConfigAlgo_name.dfd },
  { label: 'Dep Miner', value: DepminerConfigAlgo_name.depminer },
  { label: 'FDep', value: FDepConfigAlgo_name.fdep },
  { label: 'FUN', value: FUNConfigAlgo_name.fun },
  { label: 'Aid', value: AidConfigAlgo_name.aid },
  { label: 'PFDTane', value: PFDTaneConfigAlgo_name.pfdtane },
  { label: 'Euler FD', value: EulerFDConfigAlgo_name.eulerfd },
];

export const PFDErrorMeasuresOptions: Option<PFDTaneConfigPfd_error_measure>[] =
  [
    { label: 'Per value', value: PFDTaneConfigPfd_error_measure.per_value },
    { label: 'Per tuple', value: PFDTaneConfigPfd_error_measure.per_tuple },
  ];

export const AFDErrorMeasuresOptions: Option<TaneConfigAfd_error_measure>[] = [
  { label: 'G1', value: TaneConfigAfd_error_measure.g1 },
  { label: 'Pdep', value: TaneConfigAfd_error_measure.pdep },
  { label: 'Tau', value: TaneConfigAfd_error_measure.tau },
  { label: 'Mu plus', value: TaneConfigAfd_error_measure.mu_plus },
  { label: 'Rho', value: TaneConfigAfd_error_measure.rho },
];

type FieldNames<T extends UnionKeys<SchemaFdTaskConfig['config']>> = T;

export type FDOptionalFields = FieldNames<
  | 'error'
  | 'seed'
  | 'threads'
  | 'is_null_equal_null'
  | 'pfd_error_measure'
  | 'afd_error_measure'
  | 'custom_random_seed'
>;

// FIXME
export const optionalFieldsByAlgorithm: Record<
  FDAlgorithms,
  FDOptionalFields[]
> = {
  [PyroConfigAlgo_name.pyro]: [
    'is_null_equal_null',
    'error',
    'threads',
    'seed',
  ],
  [TaneConfigAlgo_name.tane]: [
    'is_null_equal_null',
    'error',
    'afd_error_measure',
  ],
  [FastFDsConfigAlgo_name.fastfds]: ['is_null_equal_null', 'threads'],
  [HyFDConfigAlgo_name.hyfd]: ['is_null_equal_null'],
  [FdMineConfigAlgo_name.fdmine]: ['is_null_equal_null'],
  [DFDConfigAlgo_name.dfd]: ['is_null_equal_null', 'threads'],
  [DepminerConfigAlgo_name.depminer]: ['is_null_equal_null'],
  [FDepConfigAlgo_name.fdep]: [],
  [FUNConfigAlgo_name.fun]: ['is_null_equal_null'],
  [AidConfigAlgo_name.aid]: [],
  [PFDTaneConfigAlgo_name.pfdtane]: [
    'is_null_equal_null',
    'error',
    'pfd_error_measure',
  ],
  [EulerFDConfigAlgo_name.eulerfd]: [
    'custom_random_seed',
    'is_null_equal_null',
  ],
};
