import { PickTypeOf } from './pickType';
import { UnionKeys } from './unionKeys';

export type GetAllFieds<T extends object> = {
  [key in UnionKeys<T>]: PickTypeOf<T, key>;
};
