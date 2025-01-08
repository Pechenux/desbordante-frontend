import {
  AidConfigAlgo_name,
  DepminerConfigAlgo_name,
  DFDConfigAlgo_name,
  FastFDsConfigAlgo_name,
  FDepConfigAlgo_name,
  FdMineConfigAlgo_name,
  FUNConfigAlgo_name,
  HyFDConfigAlgo_name,
  PFDTaneConfigAlgo_name,
  PFDTaneConfigError_measure,
  PyroConfigAlgo_name,
  SchemaFdTaskConfig,
  TaneConfigAlgo_name,
} from '@/api/generated/schema';
import { Option } from '@/components/common/uikit/Inputs';

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
];

export const FDErrorMeasuresOptions: Option<PFDTaneConfigError_measure>[] = [
  { label: 'Per value', value: PFDTaneConfigError_measure.per_value },
  { label: 'Per tuple', value: PFDTaneConfigError_measure.per_tuple },
];

export type FDOptionalFields =
  | 'error'
  | 'error_measure'
  | 'seed'
  | 'threads'
  | 'is_null_equal_null';

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
  [TaneConfigAlgo_name.tane]: ['is_null_equal_null', 'error'],
  [FastFDsConfigAlgo_name.fastfds]: ['is_null_equal_null', 'threads'],
  [HyFDConfigAlgo_name.hyfd]: ['is_null_equal_null'],
  [FdMineConfigAlgo_name.fdmine]: ['is_null_equal_null'],
  [DFDConfigAlgo_name.dfd]: ['is_null_equal_null', 'threads'],
  [DepminerConfigAlgo_name.depminer]: ['threads'],
  [FDepConfigAlgo_name.fdep]: [],
  [FUNConfigAlgo_name.fun]: ['is_null_equal_null'],
  [AidConfigAlgo_name.aid]: [],
  [PFDTaneConfigAlgo_name.pfdtane]: [
    'is_null_equal_null',
    'error',
    'error_measure',
  ],
};
