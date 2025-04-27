import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '../auth/helpers';
import { createQueryFn } from '.';

export const useUser = () => {
  const userData = useQuery({
    queryKey: ['user'],
    queryFn: createQueryFn('/api/users/me', {}),
    enabled: Boolean(getAccessToken()),
  });

  return userData.data;
};
