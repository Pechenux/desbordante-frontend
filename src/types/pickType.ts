import { UnionKeys } from './unionKeys';

export type PickType<T, K extends UnionKeys<T>> = T extends {
  [k in K]?: unknown;
}
  ? T[K]
  : undefined;
export type PickTypeOf<T, K extends string | number | symbol> =
  K extends UnionKeys<T> ? PickType<T, K> : never;
