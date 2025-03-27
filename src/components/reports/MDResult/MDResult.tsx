'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { createQueryFn } from '@/api/fetchFunctions';
import {
  Button,
  FormField,
  Icon,
  // Pagination,
  Text,
} from '@/components/common/uikit';
// import DownloadResult from '@components/DownloadResult';
import { ColumnMatchesInput } from '@/components/configure-algorithm/MD/ColumnMatchesInput';
import {
  DependencyList,
  FilteringWindow,
  OrderingWindow,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './MDResult.module.scss';

interface Column {
  __typename: 'Column';
  metrics: string;
  column1: string;
  column2: string;
  index: number;
  value: number;
}

export const MDResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);

  const { isFetching, error } = useQuery({
    queryKey: [`/api/task/${queryParams.taskID}`],
    queryFn: createQueryFn('/api/task/{task_id}', {
      params: {
        path: { task_id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const formatter = (column: Column) => {
    return (
      <span className={styles.attribute}>
        <span>{column.metrics}</span>
        <span className={styles.bigBracket}>(</span>
        <span>
          {column.column1}
          <br />
          {column.column2}
        </span>
        <span className={styles.bigBracket}>)</span>
        <span className={styles.sign}>≤</span>
        <span>{column.value}</span>
      </span>
    );
  };

  const data = {
    taskInfo: {
      __typename: 'TaskInfo',
      taskID: 'd77b74fd-b881-45c9-8d3d-cf8a2478907d',
      data: {
        __typename: 'TaskWithDepsData',
        result: {
          __typename: 'FDTaskResult',
          taskID: 'd77b74fd-b881-45c9-8d3d-cf8a2478907d',
          depsAmount: 6,
          filteredDeps: {
            __typename: 'FilteredFDs',
            filteredDepsAmount: 6,
            MDs: [
              {
                __typename: 'MD',
                lhs: [
                  {
                    __typename: 'Column',
                    metrics: 'Jaccard',
                    column1: 'Departure',
                    column2: 'Departure',
                    index: 0,
                    value: 0,
                  },
                  {
                    __typename: 'Column',
                    metrics: 'Jaccard',
                    column1: 'Departure',
                    column2: 'Departure',
                    index: 0,
                    value: 0,
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    metrics: 'Jaccard',
                    column1: 'Departure',
                    column2: 'Departure',
                    index: 0,
                    value: 0,
                  },
                ],
              },
            ],
          },
        },
      },
    },
  };
  const deps = data?.taskInfo.data.result.filteredDeps.MDs;

  return (
    <>
      <NextSeo title="Discovered functional dependencies" />
      <ColumnMatchesInput />
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.MD,
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
        <DependencyList {...{ deps, formatter }} />
      </div>

      {/* <div className={styles.pagination}>
        <Pagination
          onChange={() => {}}
          current={1}
          count={Math.ceil((recordsCount || 10) / 10)}
        />
      </div> */}
    </>
  );
};
