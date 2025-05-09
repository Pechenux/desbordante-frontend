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
  PyroConfigAlgo_name,
  SchemaFdTaskConfig,
  TaneConfigAlgo_name,
} from '@/api/generated/schema';
import { SelectOption } from '@/components/common/uikit/Inputs';

export type FDAlgorithms = SchemaFdTaskConfig['config']['algo_name'];

export const FDAlgorithmOptions: SelectOption<FDAlgorithms>[] = [
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
  { label: 'Euler FD', value: EulerFDConfigAlgo_name.eulerfd },
];

export const FDCommonFields = ['algo_name', 'max_lhs'] as const;

export type FDOptionalFields =
  | 'seed'
  | 'custom_random_seed'
  | 'threads'
  | 'is_null_equal_null'
  | 'custom_random_seed';

export const optionalFieldsByAlgorithm: Record<
  FDAlgorithms,
  FDOptionalFields[]
> = {
  [PyroConfigAlgo_name.pyro]: ['is_null_equal_null', 'threads', 'seed'],
  [TaneConfigAlgo_name.tane]: ['is_null_equal_null'],
  [FastFDsConfigAlgo_name.fastfds]: ['is_null_equal_null', 'threads'],
  [HyFDConfigAlgo_name.hyfd]: ['is_null_equal_null', 'threads'],
  [FdMineConfigAlgo_name.fdmine]: ['is_null_equal_null'],
  [DFDConfigAlgo_name.dfd]: ['is_null_equal_null', 'threads'],
  [DepminerConfigAlgo_name.depminer]: ['is_null_equal_null'],
  [FDepConfigAlgo_name.fdep]: [],
  [FUNConfigAlgo_name.fun]: ['is_null_equal_null'],
  [AidConfigAlgo_name.aid]: [],
  [EulerFDConfigAlgo_name.eulerfd]: [
    'custom_random_seed',
    'is_null_equal_null',
  ],
};
