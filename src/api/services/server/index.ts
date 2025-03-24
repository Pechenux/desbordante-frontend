import createClient from 'openapi-fetch';
import type { paths } from '@/api/generated/schema.ts';
import { ServiceParams, ServicePaths } from '@/api/utils/pathsTypes';
// import { useAccessToken } from '@/api/utils/useAccessToken.js';
import { baseUrl } from '../definitions';

export const serverFetchClient = createClient<paths>({
  baseUrl: baseUrl,
});
// serverFetchClient.use(useAccessToken);

/**
 * Function that creates query function
 * @example
 * const { data, isFetching, error } = useQuery({
 *   queryKey: ['/api/path'],
 *   queryFn: createQueryFn('/api/path', {
 *     params: { someParameter: 'test' },
 *   }),
 * });
 * @param path Api path
 * @param params Query parameters
 * @returns Function, that can be used in useQuery
 */
export const createQueryFn =
  <P extends ServicePaths<'/api', 'get'>>(
    path: P,
    params: ServiceParams<'/api', 'get', P>,
  ) =>
  async () => {
    const { data, error } = await serverFetchClient.GET(path, params);

    if (error) {
      throw error;
    }

    return data;
  };

/**
 * Function that creates mutation function
 * @example
 * const mutator = useMutation({
 *   mutationFn: createMutationFn('/api/path'),
 * });
 * mutator.mutate({ someParameter: 'test' });
 * @param path Api path
 * @returns Function, that can be used in useMutation
 */
export const createMutationFn =
  <P extends ServicePaths<'/api', 'post'>>(path: P) =>
  async (params: ServiceParams<'/api', 'post', P>) => {
    const { data, error } = await serverFetchClient.POST(path, params);

    if (error) {
      throw error;
    }

    return data;
  };
