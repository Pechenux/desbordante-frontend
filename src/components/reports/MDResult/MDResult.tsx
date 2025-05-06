'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import {
  MdFilterOptions,
  MdSortOptions,
  SchemaMdSideItemModel,
  SortOrder,
} from '@/api/generated/schema';
import { createQueryFn } from '@/api/services/server';
import { Button, Icon, Pagination } from '@/components/common/uikit';

import { displayedMetricsName } from '@/components/configure-algorithm/MD';
import { MetricsType } from '@/components/configure-algorithm/MD/ConfigureColumnMatchModal';
import {
  DependencyList,
  MDFilteringWindow,
  OrderingWindow,
  SortOptions,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
// import { extractShownDeps } from '@/utils/extractShownDeps';

import { useQueryParams } from '@/utils/useQueryParams';
import styles from './MDResult.module.scss';

export const MDResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [columns, setColumns] = useState<MultiValue<string>>([]);
  const [metrics, setMetrics] = useState<MultiValue<MetricsType>>([]);
  const [orderDirection, setOrderDirection] = useState<SingleValue<SortOrder>>(
    SortOrder.asc,
  );
  const [orderBy, setOrderBy] = useState<SingleValue<SortOptions>>(
    MdSortOptions.lhs,
  );

  const handleApplyOrdering = (
    newDirection: SingleValue<SortOrder>,
    newOrderBy: SingleValue<SortOptions>,
  ) => {
    setOrderBy(newOrderBy);
    setOrderDirection(newDirection);

    setIsOrderingShown(false);
  };

  const handleApplyFiltering = (
    newColumns: MultiValue<string>,
    newMetrics: MultiValue<MetricsType>,
  ) => {
    setColumns(newColumns);
    setMetrics(newMetrics);
    setPageIndex(1);
    setIsFilteringShown(false);
  };

  const countOnPage = 8;
  const { data, isFetching, error } = useQuery({
    queryKey: [
      `/api/tasks/${queryParams.taskID}`,
      columns,
      metrics,
      orderBy,
      orderDirection,
      pageIndex,
    ],
    queryFn: createQueryFn('/api/tasks/{id}', {
      params: {
        query: {
          filter_options: [
            MdFilterOptions.attribute_name,
            MdFilterOptions.metrics,
          ],
          filter_params: JSON.stringify({
            attribute_name: columns,
            metrics: metrics,
          }),
          sort_direction: orderDirection as SortOrder,
          sort_option: orderBy as MdSortOptions,
          pagination_limit: countOnPage,
          pagination_offset: (pageIndex - 1) * countOnPage,
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const formatter = (column: SchemaMdSideItemModel) => {
    return (
      <span className={styles.attribute}>
        <span>{displayedMetricsName[column.metrics as MetricsType]}</span>
        <span className={styles.bigBracket}>(</span>
        <span>
          {column.left_column}
          <br />
          {column.right_column}
        </span>
        <span className={styles.bigBracket}>)</span>
        <span className={styles.sign}>≤</span>
        <span>{column.boundary}</span>
      </span>
    );
  };

  const deps = data?.result?.primitive_name === 'md' && data?.result?.result;
  if (!deps) return;
  const tableHeader =
    (data?.result?.primitive_name === 'md' && data?.result?.table_header) || [];
  const recordsCount =
    data?.result?.primitive_name === 'md' && data?.result?.count_results;
  const countPaginationPages = Math.ceil(
    (recordsCount || countOnPage) / countOnPage,
  );
  const shownData = deps;
  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          primitive={PrimitiveType.MD}
          isOpen={isOrderingShown}
          curOrderDirection={orderDirection}
          curOrderOption={orderBy}
          onClose={() => setIsOrderingShown(false)}
          onApply={handleApplyOrdering}
        />
      )}
      {isFilteringShown && (
        <MDFilteringWindow
          tableHeader={tableHeader}
          isOpen={isFilteringShown}
          onClose={() => setIsFilteringShown(false)}
          onApply={handleApplyFiltering}
          filterColumns={columns}
          filterMetrics={metrics}
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
        <DependencyList deps={shownData} formatter={formatter} />
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
