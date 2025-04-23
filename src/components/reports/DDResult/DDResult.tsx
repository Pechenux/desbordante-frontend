'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { MultiValue } from 'react-select';
import { createQueryFn } from '@/api/fetchFunctions';
import { DdFilterOptions, SchemaDdSideItemModel } from '@/api/generated/schema';
import {
  Button,
  FormField,
  Icon,
  Pagination,
  Text,
} from '@/components/common/uikit';
// import DownloadResult from '@components/DownloadResult';
import {
  DefaultFilteringWindow,
  DependencyList,
  OrderingWindow,
} from '@/components/reports';
import { extractShownDeps } from '@/constants/extractShownDeps';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './DDResult.module.scss';

export const DDResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [columns, setColumns] = useState<MultiValue<string>>([]);

  const handleApply = (newVal: MultiValue<string>) => {
    setColumns(newVal);
    setIsFilteringShown(false);
  };

  // const queryParams = {
  //   taskID: '3e4bf5fe-19d3-47a9-be9e-e6d05d6fe3c4',
  // };
  const { data, isFetching, error } = useQuery({
    queryKey: [`/tasks/${queryParams.taskID}`, columns],
    queryFn: createQueryFn('/tasks/{id}', {
      params: {
        query: {
          filter_options: [DdFilterOptions.attribute_name],
          filter_params: JSON.stringify({
            attribute_name: columns,
          }),
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const formatter = (column: SchemaDdSideItemModel) => {
    return `${column.name} ∈ ${column.values}`;
  };

  const deps = data?.result?.primitive_name === 'dd' && data?.result?.result;
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
            primitive: PrimitiveType.DD,
          }}
        />
      )}
      {isFilteringShown && (
        <DefaultFilteringWindow
          isOpen={isFilteringShown}
          onClose={() => setIsFilteringShown(false)}
          onApply={handleApply}
          filterColumns={columns}
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
          count={Math.ceil((recordsCount || 10) / 10)}
        />
      </div>
    </>
  );
};
