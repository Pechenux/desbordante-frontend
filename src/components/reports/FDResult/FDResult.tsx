'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { createQueryFn } from '@/api/fetchFunctions';
import {
  Button,
  FormField,
  Icon,
  Pagination,
  Text,
} from '@/components/common/uikit';
// import DownloadResult from '@components/DownloadResult';
import {
  DependencyList,
  FilteringWindow,
  OrderingWindow,
} from '@/components/reports';
import { extractShownDeps } from '@/constants/extractShownDeps';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './FDResult.module.scss';

export const FDResult = () => {
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  const { queryParams } = useQueryParams<{ taskID: string }>();
  // const queryParams = {
  //   taskID: 'c6d1f11d-174c-4024-a060-d81aa4eb64c3',
  // };
  const { data, isFetching, error } = useQuery({
    queryKey: [`/tasks/${queryParams.taskID}`],
    queryFn: createQueryFn('/tasks/{id}', {
      params: {
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const deps = data?.result?.primitive_name === 'fd' && data?.result?.result;
  if (!deps) return;
  const recordsCount = deps.length;
  const shownData = extractShownDeps(deps, pageIndex, 10);

  return (
    <>
      <NextSeo title="Discovered functional dependencies" />
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.FD,
          }}
        />
      )}
      {isFilteringShown && (
        <FilteringWindow
          {...{
            isFilteringShown,
            setIsFilteringShown,
          }}
        />
      )}

      <h5>Primitive List</h5>

      <div className={styles.filters}>
        <FormField label="Search">
          <Text placeholder="Attribute name or regex" />
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
          {/* <DownloadResult filter={filter} disabled={!deps.length} /> */}
        </div>
      </div>

      <div className={styles.rows}>
        <DependencyList deps={shownData} />
      </div>

      <div className={styles.pagination}>
        <Pagination
          onChange={(n) => setPageIndex(n)}
          current={pageIndex}
          count={Math.ceil((recordsCount || 10) / 10)}
        />
      </div>
    </>
  );
};
