import { FetchOptions } from 'openapi-fetch';
import { HttpMethod, PathsWithMethod } from 'openapi-typescript-helpers';
import { paths } from '@/api/generated/schema';

type PathsWithPrefix<Prefix extends string> = {
  [K in keyof paths as K extends `${Prefix}${string}` ? K : never]: paths[K];
};

export type ServicePaths<
  Prefix extends string,
  M extends HttpMethod,
> = PathsWithMethod<PathsWithPrefix<Prefix>, M>;
export type ServiceParams<
  Prefix extends string,
  M extends HttpMethod,
  P extends ServicePaths<Prefix, M>,
> = M extends keyof PathsWithPrefix<Prefix>[P]
  ? FetchOptions<PathsWithPrefix<Prefix>[P][M]>
  : never;
