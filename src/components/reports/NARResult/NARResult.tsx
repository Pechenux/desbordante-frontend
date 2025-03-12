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
import {
  DependencyList,
  FilteringWindow,
  OrderingWindow,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './NARResult.module.scss';

interface Column {
  __typename: 'Column';
  name: string;
  index: number;
  values: string;
}

export const NARResult = () => {
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
      <>
        {column.name} ∈ [{column.values}]
      </>
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
            NARs: [
              {
                __typename: 'NAR',
                confidence: 0.96,
                support: 0.57,
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Intelligence',
                    index: 0,
                    values: '4 - 10',
                  },
                  {
                    __typename: 'Column',
                    name: 'Shedding',
                    index: 1,
                    values: 'Moderate',
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Friendliness',
                    index: 1,
                    values: '6 - 10',
                  },
                  {
                    __typename: 'Column',
                    name: 'Life Span',
                    index: 1,
                    values: '9 - 16',
                  },
                ],
              },
              {
                __typename: 'NAR',
                confidence: 0.77,
                support: 0.34,
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Health Issues Risk',
                    index: 0,
                    values: 'Moderate',
                  },
                  {
                    __typename: 'Column',
                    name: 'Life Span',
                    index: 1,
                    values: '8 - 14',
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Friendliness',
                    index: 1,
                    values: '5 - 8',
                  },
                ],
              },
              {
                __typename: 'NAR',
                confidence: 0.72,
                support: 0.08,
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Friendliness',
                    index: 0,
                    values: '5 - 10',
                  },
                  {
                    __typename: 'Column',
                    name: 'Exercise Requirements',
                    index: 1,
                    values: '1.7 - 2.3',
                  },
                  {
                    __typename: 'Column',
                    name: 'Type',
                    index: 1,
                    values: 'Working',
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Life Span',
                    index: 1,
                    values: '10 - 16',
                  },
                  {
                    __typename: 'Column',
                    name: 'Training Difficulty',
                    index: 1,
                    values: '4 - 9',
                  },
                ],
              },
              {
                __typename: 'NAR',
                confidence: 0.9,
                support: 0.57,
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Size',
                    index: 0,
                    values: '1 - 2',
                  },
                  {
                    __typename: 'Column',
                    name: 'Intelligence',
                    index: 1,
                    values: '5 - 8',
                  },
                  {
                    __typename: 'Column',
                    name: 'Grooming Needs',
                    index: 0,
                    values: 'Moderate',
                  },
                  {
                    __typename: 'Column',
                    name: 'Weight',
                    index: 1,
                    values: '15.25 - 68.26',
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Shedding',
                    index: 1,
                    values: 'Moderate',
                  },
                ],
              },
            ],
          },
        },
      },
    },
  };

  const deps = data?.taskInfo.data.result.filteredDeps.NARs;

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
