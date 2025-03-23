import createClient from 'openapi-fetch';
import type { paths } from '@/api/generated/schema.ts';
import { ServiceParams, ServicePaths } from '@/api/utils/pathsTypes';
import { baseUrl } from '../definitions';

const cmsFetchClient = createClient<paths>({
  baseUrl: baseUrl,
});

/**
 * Function that creates query function
 * @example
 * const { data, isFetching, error } = useQuery({
 *   queryKey: ['/cms/path'],
 *   queryFn: createQueryFn('/cms/path', {
 *     params: { someParameter: 'test' },
 *   }),
 * });
 * @param path Api path
 * @param params Query parameters
 * @returns Function, that can be used in useQuery
 */
export const createQueryFn =
  <P extends ServicePaths<'/cms', 'get'>>(
    path: P,
    params: ServiceParams<'/cms', 'get', P>,
  ) =>
  async () => {
    const { data, error } = await cmsFetchClient.GET(path, params);

    if (error) {
      throw error;
    }

    return data;
  };

/**
 * Function that creates mutation function
 * @example
 * const mutator = useMutation({
 *   mutationFn: createMutationFn('/cms/path'),
 * });
 * mutator.mutate({ someParameter: 'test' });
 * @param path Api path
 * @returns Function, that can be used in useMutation
 */
export const createMutationFn =
  <P extends ServicePaths<'/cms', 'post'>>(path: P) =>
  async (params: ServiceParams<'/cms', 'post', P>) => {
    const { data, error } = await cmsFetchClient.POST(path, params);

    if (error) {
      throw error;
    }

    return data;
  };
