'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { MultiValue } from 'react-select';
import { createQueryFn } from '@/api/fetchFunctions';
import { PfdFilterOptions } from '@/api/generated/schema';
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
import styles from './PFDResult.module.scss';

export const PFDResult = () => {
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [columns, setColumns] = useState<MultiValue<string>>([]);

  const handleApply = (newVal: MultiValue<string>) => {
    setColumns(newVal);
    setIsFilteringShown(false);
  };

  const { queryParams } = useQueryParams<{ taskID: string }>();
  // const queryParams = {
  //   taskID: '5ee3042d-d01b-4947-99cd-ad5646eb5fe3',
  // };
  const { data, isFetching, error } = useQuery({
    queryKey: [`/tasks/${queryParams.taskID}`, columns],
    queryFn: createQueryFn('/tasks/{id}', {
      params: {
        query: {
          filter_options: [PfdFilterOptions.attribute_name],
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

  const deps = data?.result?.primitive_name === 'pfd' && data?.result?.result;
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
            primitive: PrimitiveType.PFD,
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
        <DependencyList deps={shownData} />
      </div>

      <div className={styles.pagination}>
        <Pagination
          onChange={(n) => setPageIndex(n)}
          current={1}
          count={Math.ceil((recordsCount || 10) / 10)}
        />
      </div>
    </>
  );
};
