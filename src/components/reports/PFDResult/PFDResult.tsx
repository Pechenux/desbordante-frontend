'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import {
  PfdFilterOptions,
  PfdSortOptions,
  SortOrder,
} from '@/api/generated/schema';
import { createQueryFn } from '@/api/services/server';
import { Button, Icon, Pagination } from '@/components/common/uikit';

import {
  DefaultFilteringWindow,
  DependencyList,
  OrderingWindow,
  SortOptions,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';

import { useQueryParams } from '@/utils/useQueryParams';
import styles from './PFDResult.module.scss';

export const PFDResult = () => {
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [columns, setColumns] = useState<MultiValue<string>>([]);
  const [orderDirection, setOrderDirection] = useState<SingleValue<SortOrder>>(
    SortOrder.asc,
  );
  const [orderBy, setOrderBy] = useState<SingleValue<SortOptions>>(
    PfdSortOptions.lhs,
  );

  const handleApplyOrdering = (
    newDirection: SingleValue<SortOrder>,
    newOrderBy: SingleValue<SortOptions>,
  ) => {
    setOrderBy(newOrderBy);
    setOrderDirection(newDirection);

    setIsOrderingShown(false);
  };

  const handleApplyFiltering = (newVal: MultiValue<string>) => {
    setColumns(newVal);
    setIsFilteringShown(false);
    setPageIndex(1);
  };

  const { queryParams } = useQueryParams<{ taskID: string }>();
  const countOnPage = 10;
  const { data, isFetching, error } = useQuery({
    queryKey: [
      `/api/tasks/${queryParams.taskID}`,
      columns,
      orderBy,
      orderDirection,
      pageIndex,
    ],
    queryFn: createQueryFn('/api/tasks/{id}', {
      params: {
        query: {
          filter_options: [PfdFilterOptions.attribute_name],
          filter_params: JSON.stringify({
            attribute_name: columns,
          }),
          sort_direction: orderDirection as SortOrder,
          sort_option: orderBy as PfdSortOptions,
          pagination_limit: countOnPage,
          pagination_offset: (pageIndex - 1) * countOnPage,
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const deps = data?.result?.primitive_name === 'pfd' && data?.result?.result;
  if (!deps) return;
  const tableHeader =
    (data?.result?.primitive_name === 'pfd' && data?.result?.table_header) ||
    [];
  const recordsCount =
    data?.result?.primitive_name === 'pfd' && data?.result?.count_results;
  const countPaginationPages = Math.ceil(
    (recordsCount || countOnPage) / countOnPage,
  );

  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          primitive={PrimitiveType.PFD}
          isOpen={isOrderingShown}
          curOrderDirection={orderDirection}
          curOrderOption={orderBy}
          onClose={() => setIsOrderingShown(false)}
          onApply={handleApplyOrdering}
        />
      )}
      {isFilteringShown && (
        <DefaultFilteringWindow
          tableHeader={tableHeader}
          isOpen={isFilteringShown}
          onClose={() => setIsFilteringShown(false)}
          onApply={handleApplyFiltering}
          filterColumns={columns}
        />
      )}

      <h5>Primitive List</h5>

      <div className={styles.filters}>
        <Button
          variant="secondary"
          size="md"
          icon={<Icon name="filter" />}
          onClick={() => setIsFilteringShown(true)}
        >
          Filters
        </Button>
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
          current={1}
          count={countPaginationPages}
        />
      </div>
    </>
  );
};
