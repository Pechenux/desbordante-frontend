'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { createQueryFn } from '@/api/fetchFunctions';
import { SchemaNarSideModel } from '@/api/generated/schema';
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

export const NARResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);

  //const taskID = '30da1bc4-c764-4cd9-8937-2a09d036db3d';
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

  const formatter = (column: SchemaNarSideModel) => {
    return `${column.name} ∈ ${column.values}`;
  };

  const deps = data?.result?.primitive_name === 'nar' && data?.result?.result;
  if (!deps) return;

  const shownData = deps?.map((row) => ({
    lhs: row.lhs.map((e) => formatter(e)),
    rhs: row.rhs.map((e) => formatter(e)),
    confidence: row.confidence,
    support: row.support,
  }));

  return (
    <>
      <NextSeo title="Discovered functional dependencies" />
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.NAR,
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
