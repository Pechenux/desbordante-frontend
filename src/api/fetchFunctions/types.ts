import { FetchOptions } from 'openapi-fetch';
import { HttpMethod, PathsWithMethod } from 'openapi-typescript-helpers';
import type { paths } from '../generated/serverSchema';

export type Paths<M extends HttpMethod> = PathsWithMethod<paths, M>;
export type Params<
  M extends HttpMethod,
  P extends Paths<M>,
> = M extends keyof paths[P] ? FetchOptions<paths[P][M]> : never;
