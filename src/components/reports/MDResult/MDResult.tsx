'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { createQueryFn } from '@/api/fetchFunctions';
import { SchemaMdSideModel } from '@/api/generated/schema';
import {
  Button,
  FormField,
  Icon,
  // Pagination,
  Text,
} from '@/components/common/uikit';
// import DownloadResult from '@components/DownloadResult';
import {
  displayedMetricsName,
  MetricsType,
} from '@/components/configure-algorithm/MD/ConfigureColumnMatchModal';
import {
  DependencyList,
  FilteringWindow,
  OrderingWindow,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './MDResult.module.scss';

export const MDResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);

  // const queryParams = {
  //   taskID: 'fd00d451-a3b3-4079-8124-7d6992b33166',
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

  const formatter = (column: SchemaMdSideModel) => {
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

  console.log(data);

  //   taskInfo: {
  //     __typename: 'TaskInfo',
  //     taskID: 'd77b74fd-b881-45c9-8d3d-cf8a2478907d',
  //     data: {
  //       __typename: 'TaskWithDepsData',
  //       result: {
  //         __typename: 'FDTaskResult',
  //         taskID: 'd77b74fd-b881-45c9-8d3d-cf8a2478907d',
  //         depsAmount: 6,
  //         filteredDeps: {
  //           __typename: 'FilteredFDs',
  //           filteredDepsAmount: 6,
  //           MDs: [
  //             {
  //               __typename: 'MD',
  //               lhs: [
  //                 {
  //                   __typename: 'Column',
  //                   metrics: 'Jaccard',
  //                   column1: 'Departure',
  //                   column2: 'Departure',
  //                   index: 0,
  //                   value: 0,
  //                 },
  //                 {
  //                   __typename: 'Column',
  //                   metrics: 'Jaccard',
  //                   column1: 'Departure',
  //                   column2: 'Departure',
  //                   index: 0,
  //                   value: 0,
  //                 },
  //               ],
  //               rhs: [
  //                 {
  //                   __typename: 'Column',
  //                   metrics: 'Jaccard',
  //                   column1: 'Departure',
  //                   column2: 'Departure',
  //                   index: 0,
  //                   value: 0,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   },
  // };
  const deps = data?.result?.primitive_name === 'md' && data?.result?.result;
  if (!deps) return;

  //  const shownData = deps.map((row) => ({
  //    lhs: row.lhs.map((e) => formatter(e)),
  //    rhs: row.rhs.map((e) => formatter(e)),
  //  }));

  return (
    <>
      <NextSeo title="Discovered functional dependencies" />
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
        <DependencyList deps={deps} formatter={formatter} />
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
