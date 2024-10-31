import { fetchClient } from './fetchClient';
import type { Paths, Params } from './types';

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
  <P extends Paths<'post'>>(path: P) =>
  async (params: Params<'post', P>) => {
    const { data, error } = await fetchClient.POST(path, params);

    if (error) {
      throw error;
    }

    return data;
  };
