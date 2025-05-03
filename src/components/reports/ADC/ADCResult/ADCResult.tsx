'use client';

import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import {
  SortOrder,
  AdcSortOptions,
  AdcFilterOptions,
} from '@/api/generated/schema';
import { createQueryFn } from '@/api/services/server';
import {
  Button,
  FormField,
  Icon,
  Pagination,
  Text,
} from '@/components/common/uikit';

import {
  ADCInstance,
  DefaultFilteringWindow,
  OrderingWindow,
  SortOptions,
} from '@/components/reports';
import { extractShownDeps } from '@/constants/extractShownDeps';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './ADCResult.module.scss';

export const ADCResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);

  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [columns, setColumns] = useState<MultiValue<string>>([]);

  const [orderDirection, setOrderDirection] = useState<SingleValue<SortOrder>>(
    SortOrder.asc,
  );
  const [orderBy, setOrderBy] = useState<SingleValue<SortOptions>>(
    AdcSortOptions.attrubites_names,
  );

  const handleApplyOrdering = (
    newDirection: SingleValue<SortOrder>,
    newOrderBy: SingleValue<SortOptions>,
  ) => {
    setOrderBy(newOrderBy);
    setOrderDirection(newDirection);

    setIsOrderingShown(false);
  };

  const handleApplyFiltering = (newVal: MultiValue<string>) => {
    setColumns(newVal);
    setIsFilteringShown(false);
  };

  const { data, isFetching, error } = useQuery({
    queryKey: [
      `/api/tasks/${queryParams.taskID}`,
      columns,
      orderBy,
      orderDirection,
    ],
    queryFn: createQueryFn('/api/tasks/{id}', {
      params: {
        query: {
          filter_options: [AdcFilterOptions.attribute_name],
          filter_params: JSON.stringify({
            attribute_name: columns,
          }),
          sort_direction: orderDirection as SortOrder,
          sort_option: orderBy as AdcSortOptions,
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const deps = data?.result?.primitive_name === 'adc' && data?.result?.result;
  const tableHeader =
    (data?.result?.primitive_name === 'adc' && data?.result?.table_header) ||
    [];
  if (!deps) return;
  const recordsCount = deps.length;
  const countOnPage = 8;
  const countPaginationPages = Math.ceil(
    (recordsCount || countOnPage) / countOnPage,
  );
  const shownData = extractShownDeps(deps, pageIndex, countOnPage);

  return (
    <>
      <NextSeo title="Discovered functional dependencies" />

      {isOrderingShown && (
        <OrderingWindow
          primitive={PrimitiveType.ADC}
          isOpen={isOrderingShown}
          curOrderDirection={orderDirection}
          curOrderOption={orderBy}
          onClose={() => setIsOrderingShown(false)}
          onApply={handleApplyOrdering}
        />
      )}
      {isFilteringShown && (
        <DefaultFilteringWindow
          tableHeader={tableHeader}
          isOpen={isFilteringShown}
          onClose={() => setIsFilteringShown(false)}
          onApply={handleApplyFiltering}
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
        </div>
      </div>

      <div className={styles.rows}>
        {shownData &&
          shownData.map((d, i) => {
            const fullDependency = JSON.stringify(d);

            return (
              <ADCInstance
                key={i}
                data={d.cojuncts}
                isSelected={selectedInstance === fullDependency}
                onClick={() => setSelectedInstance(fullDependency)}
              />
            );
          })}
      </div>

      <div className={styles.pagination}>
        <Pagination
          onChange={(n) => setPageIndex(n)}
          current={pageIndex}
          count={countPaginationPages}
        />
      </div>
    </>
  );
};
