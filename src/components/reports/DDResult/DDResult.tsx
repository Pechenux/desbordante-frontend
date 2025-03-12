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
import styles from './DDResult.module.scss';

interface Column {
  __typename: 'Column';
  name: string;
  index: number;
  diffs: number[];
}

export const DDResult = () => {
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
        {column.name} ∈ [{column.diffs[0]}, {column.diffs[1]}]
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
            DDs: [
              {
                __typename: 'DD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Departure',
                    index: 0,
                    diffs: [0, 0],
                  },
                  {
                    __typename: 'Column',
                    name: 'Arrival',
                    index: 1,
                    diffs: [0, 0],
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Distance',
                    index: 1,
                    diffs: [0, 50],
                  },
                ],
              },
              {
                __typename: 'DD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Departure',
                    index: 0,
                    diffs: [0, 3],
                  },
                  {
                    __typename: 'Column',
                    name: 'Arrival',
                    index: 1,
                    diffs: [0, 3],
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Duration',
                    index: 3,
                    diffs: [0, 15],
                  },
                ],
              },
              {
                __typename: 'DD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Distance',
                    index: 0,
                    diffs: [0, 50],
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Duration',
                    index: 1,
                    diffs: [0, 15],
                  },
                ],
              },
              {
                __typename: 'DD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Distance',
                    index: 0,
                    diffs: [0, 50],
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Duration',
                    index: 1,
                    diffs: [0, 15],
                  },
                ],
              },
              {
                __typename: 'DD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Distance',
                    index: 0,
                    diffs: [0, 50],
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Duration',
                    index: 1,
                    diffs: [0, 15],
                  },
                ],
              },
              {
                __typename: 'DD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Distance',
                    index: 0,
                    diffs: [0, 50],
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Duration',
                    index: 1,
                    diffs: [0, 15],
                  },
                ],
              },
              {
                __typename: 'DD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Distance',
                    index: 0,
                    diffs: [0, 50],
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Duration',
                    index: 1,
                    diffs: [0, 15],
                  },
                ],
              },
              {
                __typename: 'DD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Distance',
                    index: 0,
                    diffs: [0, 50],
                  },
                ],
                rhs: [
                  {
                    __typename: 'Column',
                    name: 'Duration',
                    index: 1,
                    diffs: [0, 15],
                  },
                ],
              },
            ],
          },
        },
      },
    },
  };

  const deps = data?.taskInfo.data.result.filteredDeps.DDs;

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
