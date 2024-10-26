import { fetchClient } from './fetchClient';
import type { Paths, Params } from './types';

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
  <P extends Paths<'get'>>(path: P, params: Params<'get', P>) =>
  async () => {
    const { data, error } = await fetchClient.GET(path, params);

    if (error) {
      throw error;
    }

    return data;
  };
