'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { createQueryFn } from '@/api/fetchFunctions';
import {
  AfdFilterOptions,
  AfdSortOptions,
  SortOrder,
} from '@/api/generated/schema';
import {
  Button,
  FormField,
  Icon,
  Pagination,
  Text,
} from '@/components/common/uikit';
// import DownloadResult from '@components/DownloadResult';
import {
  OrderingWindow,
  DependencyList,
  DefaultFilteringWindow,
  SortOptions,
} from '@/components/reports';
import { extractShownDeps } from '@/constants/extractShownDeps';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './AFDResult.module.scss';

export const AFDResult = () => {
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [columns, setColumns] = useState<MultiValue<string>>([]);
  const [orderDirection, setOrderDirection] = useState<SingleValue<SortOrder>>(
    SortOrder.asc,
  );
  const [orderBy, setOrderBy] = useState<SingleValue<SortOptions>>(
    AfdSortOptions.lhs,
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
  };

  const { queryParams } = useQueryParams<{ taskID: string }>();
  // const queryParams = {
  //   taskID: 'b122241f-c28e-4de1-9bf0-80c2b601641d',
  // };
  const { data, isFetching, error } = useQuery({
    queryKey: [
      `/tasks/${queryParams.taskID}`,
      columns,
      orderBy,
      orderDirection,
    ],
    queryFn: createQueryFn('/tasks/{id}', {
      params: {
        query: {
          filter_options: [AfdFilterOptions.attribute_name],
          filter_params: JSON.stringify({
            attribute_name: columns,
          }),
          sort_direction: orderDirection as SortOrder,
          sort_option: orderBy as AfdSortOptions,
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const deps = data?.result?.primitive_name === 'afd' && data?.result?.result;
  const tableHeader =
    (data?.result?.primitive_name === 'afd' && data?.result?.table_header) ||
    [];
  if (!deps) return;
  const recordsCount = deps.length;
  const countOnPage = 10;
  const countPaginationPages = Math.ceil(
    (recordsCount || countOnPage) / countOnPage,
  );
  const shownData = extractShownDeps(deps, pageIndex, countOnPage);

  return (
    <>
      <NextSeo title="Discovered approximate functional dependencies" />
      {isOrderingShown && (
        <OrderingWindow
          primitive={PrimitiveType.AFD}
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
        <FormField>
          <Text label="Search" placeholder="Attribute name or regex" />
        </FormField>

        <div className={styles.buttons}>
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
          {/*<DownloadResult filter={filter} disabled={!deps.length} />*/}
        </div>
      </div>

      <div className={styles.rows}>
        <DependencyList deps={shownData} />
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
