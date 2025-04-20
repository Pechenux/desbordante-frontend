'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { createQueryFn } from '@/api/fetchFunctions';
import {
  Button,
  FormField,
  Icon,
  //Pagination,
  Text,
} from '@/components/common/uikit';
// import DownloadResult from '@components/DownloadResult';
import {
  FilteringWindow,
  OrderingWindow,
  DependencyList,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './AFDResult.module.scss';

export const AFDResult = () => {
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);

  const { queryParams } = useQueryParams<{ taskID: string }>();
  // const queryParams = {
  //   taskID: 'b122241f-c28e-4de1-9bf0-80c2b601641d',
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

  const deps = data?.result?.primitive_name === 'afd' && data?.result?.result;
  if (!deps) return;

  return (
    <>
      <NextSeo title="Discovered approximate functional dependencies" />
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.AFD,
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
        <DependencyList deps={deps} />
      </div>

      <div className={styles.pagination}>
        {/* <Pagination
          onChange={() => {}}
          current={1}
          count={Math.ceil((recordsCount || 10) / 10)}
        /> */}
      </div>
    </>
  );
};
