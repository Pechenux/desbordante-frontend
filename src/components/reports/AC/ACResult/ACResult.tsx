'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { createQueryFn } from '@/api/fetchFunctions';
import {
  AcFilterOptions,
  AcSortOptions,
  OperationType,
  SortOrder,
} from '@/api/generated/schema';
import {
  Button,
  FormField,
  Icon,
  Text,
  Pagination,
} from '@/components/common/uikit';
import {
  DefaultFilteringWindow,
  OrderingWindow,
  SortOptions,
} from '@/components/reports';
import { extractShownDeps } from '@/constants/extractShownDeps';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import { ACInstance } from '../ACInstance';
import styles from './ACResult.module.scss';

export const ACResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const [columns, setColumns] = useState<MultiValue<string>>([]);

  const [orderDirection, setOrderDirection] = useState<SingleValue<SortOrder>>(
    SortOrder.asc,
  );
  const [orderBy, setOrderBy] = useState<SingleValue<SortOptions>>(
    AcSortOptions.attrubites_names,
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

  console.log(columns);
  // const queryParams = {
  //   taskID: '48a67b65-3911-4eab-a261-ec9bdd6f5159',
  // };
  const { data, isFetching, error } = useQuery({
    queryKey: [
      `/tasks/${queryParams.taskID}`,
      columns,
      orderBy,
      orderDirection,
    ],
    queryFn: createQueryFn('/tasks/{id}', {
      params: {
        query: {
          filter_options: [AcFilterOptions.attribute_name],
          filter_params: JSON.stringify({
            attribute_name: columns,
          }),
          sort_direction: orderDirection as SortOrder,
          sort_option: orderBy as SortOptions,
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const deps = data?.result?.primitive_name === 'ac' && data?.result?.result;
  const tableHeader =
    (data?.result?.primitive_name === 'ac' && data?.result?.table_header) || [];
  const operation =
    data?.config.primitive_name === 'ac' && data.config.config.bin_operation;
  if (!deps) return;
  const recordsCount = deps.length;
  const countOnPage = 6;
  const countPaginationPages = Math.ceil(
    (recordsCount || countOnPage) / countOnPage,
  );
  const shownData = extractShownDeps(deps, pageIndex, countOnPage);

  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          primitive={PrimitiveType.AC}
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

      <h5>Instance List</h5>

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
          shownData.map((value) => {
            const id = `${value.left_column} ${value.right_column}`;
            const isSelected = false;
            return (
              <ACInstance
                key={id}
                isSelected={isSelected}
                left_column={value.left_column}
                right_column={value.right_column}
                operation={operation || OperationType.ValueMinus}
                intervals={value.intervals}
                outliers={value.outliers}
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
