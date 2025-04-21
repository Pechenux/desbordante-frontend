'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { createQueryFn } from '@/api/fetchFunctions';
import { OperationType } from '@/api/generated/schema';
import {
  Button,
  FormField,
  Icon,
  Text,
  Pagination,
} from '@/components/common/uikit';
import { OrderingWindow } from '@/components/reports';
import { extractShownDeps } from '@/constants/extractShownDeps';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import { ACInstance } from '../ACInstance';
import styles from './ACResult.module.scss';

export const ACResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  // const queryParams = {
  //   taskID: '48a67b65-3911-4eab-a261-ec9bdd6f5159',
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

  const deps = data?.result?.primitive_name === 'ac' && data?.result?.result;
  const operation =
    data?.config.primitive_name === 'ac' && data.config.config.bin_operation;
  if (!deps) return;
  const recordsCount = deps.length;
  const shownData = extractShownDeps(deps, pageIndex, 10);

  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.AC,
          }}
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
          count={Math.ceil((recordsCount || 6) / 6)}
        />
      </div>
    </>
  );
};
