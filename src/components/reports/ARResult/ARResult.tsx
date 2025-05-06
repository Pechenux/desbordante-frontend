'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import { ARSortOptions, SortOrder } from '@/api/generated/schema';
import { createQueryFn } from '@/api/services/server';
import { Button, Icon, Pagination } from '@/components/common/uikit';

import {
  DependencyList,
  OrderingWindow,
  SortOptions,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './ARResult.module.scss';

export const ARResult = () => {
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [orderDirection, setOrderDirection] = useState<SingleValue<SortOrder>>(
    SortOrder.asc,
  );
  const [orderBy, setOrderBy] = useState<SingleValue<SortOptions>>(
    ARSortOptions.confidence,
  );

  const handleApplyOrdering = (
    newDirection: SingleValue<SortOrder>,
    newOrderBy: SingleValue<SortOptions>,
  ) => {
    setOrderBy(newOrderBy);
    setOrderDirection(newDirection);

    setIsOrderingShown(false);
  };

  const { queryParams } = useQueryParams<{ taskID: string }>();

  const countOnPage = 10;
  const { data, isFetching, error } = useQuery({
    queryKey: [
      `/api/tasks/${queryParams.taskID}`,
      orderBy,
      orderDirection,
      pageIndex,
    ],
    queryFn: createQueryFn('/api/tasks/{id}', {
      params: {
        query: {
          sort_direction: orderDirection as SortOrder,
          sort_option: orderBy as ARSortOptions,
          pagination_limit: countOnPage,
          pagination_offset: (pageIndex - 1) * countOnPage,
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  const deps = useMemo(
    () =>
      data?.result?.primitive_name === 'ar'
        ? data?.result?.result.map((arData) => ({
            lhs: arData.left,
            rhs: arData.right,
            confidence: arData.confidence,
            support: arData.support,
          }))
        : undefined,
    [data],
  );

  if (isFetching || error || !deps) return;

  const recordsCount =
    data?.result?.primitive_name === 'ar' && data?.result?.count_results;
  const countPaginationPages = Math.ceil(
    (recordsCount || countOnPage) / countOnPage,
  );

  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          primitive={PrimitiveType.AR}
          isOpen={isOrderingShown}
          curOrderDirection={orderDirection}
          curOrderOption={orderBy}
          onClose={() => setIsOrderingShown(false)}
          onApply={handleApplyOrdering}
        />
      )}

      <h5>Primitive List</h5>

      <div className={styles.filters}>
        <Button
          variant="secondary"
          size="md"
          icon={<Icon name="ordering" />}
          onClick={() => setIsOrderingShown(true)}
        >
          Ordering
        </Button>
      </div>

      <div className={styles.rows}>
        <DependencyList deps={deps} />
      </div>

      <div className={styles.pagination}>
        <Pagination
          onChange={(n) => setPageIndex(n)}
          current={pageIndex}
          count={countPaginationPages}
        />
      </div>
    </>
  );
};
