'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { MultiValue } from 'react-select';
import { createQueryFn } from '@/api/fetchFunctions';
import { MdFilterOptions, SchemaMdSideItemModel } from '@/api/generated/schema';
import {
  Button,
  FormField,
  Icon,
  Pagination,
  Text,
} from '@/components/common/uikit';
// import DownloadResult from '@components/DownloadResult';
import {
  displayedMetricsName,
  MetricsType,
} from '@/components/configure-algorithm/MD/ConfigureColumnMatchModal';
import {
  DependencyList,
  MDFilteringWindow,
  OrderingWindow,
} from '@/components/reports';
import { extractShownDeps } from '@/constants/extractShownDeps';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './MDResult.module.scss';

export const MDResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [columns, setColumns] = useState<MultiValue<string>>([]);
  const [metrics, setMetrics] = useState<MultiValue<MetricsType>>([]);

  const handleApply = (
    newColumns: MultiValue<string>,
    newMetrics: MultiValue<MetricsType>,
  ) => {
    setColumns(newColumns);
    setMetrics(newMetrics);

    setIsFilteringShown(false);
  };

  // const queryParams = {
  //   taskID: 'fd00d451-a3b3-4079-8124-7d6992b33166',
  // };
  const { data, isFetching, error } = useQuery({
    queryKey: [`/tasks/${queryParams.taskID}`, columns, metrics],
    queryFn: createQueryFn('/tasks/{id}', {
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
            primitive: PrimitiveType.MD,
          }}
        />
      )}
      {isFilteringShown && (
        <MDFilteringWindow
          isOpen={isFilteringShown}
          onClose={() => setIsFilteringShown(false)}
          onApply={handleApply}
          filterColumns={columns}
          filterMetrics={metrics}
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
        <DependencyList deps={shownData} formatter={formatter} />
      </div>

      <div className={styles.pagination}>
        <Pagination
          onChange={(n) => setPageIndex(n)}
          current={pageIndex}
          count={Math.ceil((recordsCount || 8) / 8)}
        />
      </div>
    </>
  );
};
