'use client';

import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { createQueryFn } from '@/api/fetchFunctions';

const ChoosePrimitive = () => {
  const { data, isPending } = useQuery({
    queryKey: ['asdasd'],
    queryFn: createQueryFn('/api/task/{task_id}', {
      params: {
        path: {
          task_id: '93bf6eb9-8550-487c-9a7f-8336731e4aea',
        },
      },
    }),
  });

  if (isPending) {
    return <div>Loading</div>;
  }
  return <div>{JSON.stringify(data, null, ' ')}</div>;
};

export default memo(ChoosePrimitive);
