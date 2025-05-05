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
  TaneConfigAlgo_name,
} from '@/api/generated/schema';
import { FDFormInputs } from '@/components/configure-algorithm/forms/FDForm';
import { Presets } from '@/types/form';

export const FDPresets: Presets<FDFormInputs> = {
  common: [
    {
      name: 'aid-default',
      displayName: 'Aid Default',
      preset: {
        algo_name: AidConfigAlgo_name.aid,
      },
    },
    {
      name: 'fdep-default',
      displayName: 'FDep Default',
      preset: {
        algo_name: FDepConfigAlgo_name.fdep,
      },
    },
    {
      name: 'depminer-default',
      displayName: 'Depminer Default',
      preset: {
        algo_name: DepminerConfigAlgo_name.depminer,
      },
    },
    {
      name: 'dfd-default',
      displayName: 'DFD Default',
      preset: {
        algo_name: DFDConfigAlgo_name.dfd,
      },
    },
    {
      name: 'euler-default',
      displayName: 'EulerFD Default',
      preset: {
        algo_name: EulerFDConfigAlgo_name.eulerfd,
        custom_random_seed: 0,
      },
    },
    {
      name: 'fun-default',
      displayName: 'FUN Default',
      preset: {
        algo_name: FUNConfigAlgo_name.fun,
      },
    },
    {
      name: 'fast-default',
      displayName: 'FastFDs Default',
      preset: {
        algo_name: FastFDsConfigAlgo_name.fastfds,
      },
    },
    {
      name: 'fdmine-default',
      displayName: 'FdMine Default',
      preset: {
        algo_name: FdMineConfigAlgo_name.fdmine,
      },
    },
    {
      name: 'hyfd-default',
      displayName: 'HyFD Default',
      preset: {
        algo_name: HyFDConfigAlgo_name.hyfd,
      },
    },
    {
      name: 'tane-default',
      displayName: 'Tane Default',
      preset: {
        algo_name: TaneConfigAlgo_name.tane,
      },
    },
    {
      name: 'default',
      displayName: 'Default',
      preset: {
        algo_name: PyroConfigAlgo_name.pyro,
        max_lhs: 0,
        threads: 0,
        is_null_equal_null: false,
        seed: 0,
        custom_random_seed: 0,
      },
    },
  ],
  fileSpecific: [],
};
