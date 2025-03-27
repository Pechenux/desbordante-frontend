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
  ADCInstance,
  FilteringWindow,
  OrderingWindow,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './ADCResult.module.scss';

export const ADCResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);

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
            ACDs: [
              {
                __typename: 'ACD',
                id: '1',
                deps: [
                  {
                    __typename: 'Column',
                    value1: 't.State',
                    value2: 's.State',
                    relation: '≠',
                    index: 0,
                  },
                  {
                    __typename: 'Column',
                    value1: 't.Salary',
                    value2: 's.Salary',
                    relation: '≤',
                    index: 0,
                  },
                ],
              },
              {
                __typename: 'ACD',
                id: '2',
                deps: [
                  {
                    __typename: 'Column',
                    value1: 't.State',
                    value2: 's.State',
                    relation: '≠',
                    index: 0,
                  },
                  {
                    __typename: 'Column',
                    value1: 't.Salary',
                    value2: 's.Salary',
                    relation: '≤',
                    index: 0,
                  },
                ],
              },
              {
                __typename: 'ACD',
                id: '3',
                deps: [
                  {
                    __typename: 'Column',
                    value1: 't.State',
                    value2: 's.State',
                    relation: '≠',
                    index: 0,
                  },
                  {
                    __typename: 'Column',
                    value1: 't.Salary',
                    value2: 's.Salary',
                    relation: '≤',
                    index: 0,
                  },
                ],
              },
            ],
          },
        },
      },
    },
  };

  const deps = data?.taskInfo.data.result.filteredDeps.ACDs;

  return (
    <>
      <NextSeo title="Discovered functional dependencies" />
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.ADC,
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
        {deps.map((d) => (
          <ADCInstance
            key={d.id}
            data={d}
            isSelected={selectedInstance === d.id}
            onClick={() => setSelectedInstance(d.id)}
          />
        ))}
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
