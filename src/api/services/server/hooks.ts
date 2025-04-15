import { useQuery } from '@tanstack/react-query';
import { createQueryFn } from '.';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: createQueryFn('/api/users/me', {}),
  });
};
