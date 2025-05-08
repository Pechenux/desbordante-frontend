'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { SingleValue } from 'react-select';
import {
  SortOrder,
  AfdVerificationSortOptions,
  AfdVerificationFilterOptions,
} from '@/api/generated/schema';
import { createQueryFn } from '@/api/services/server';
import { Button, Icon, Pagination } from '@/components/common/uikit';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import { OrderingWindow, SortOptions } from '../../Filters';
import { ReportFiller } from '../../ReportFiller';
import { AFDCluster } from '../AFDCluster/AFDCluster';
import styles from './AFDVerificationResult.module.scss';

export const AFDVerificationResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [clusterIndex, setClusterIndex] = useState(0);
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isLhsRhsOnlyShown, setIsLhsRhsOnlyShown] = useState(false);
  const [orderDirection, setOrderDirection] = useState<SingleValue<SortOrder>>(
    SortOrder.asc,
  );
  const [orderBy, setOrderBy] = useState<SingleValue<SortOptions>>(
    AfdVerificationSortOptions.size,
  );

  const handleApplyOrdering = (
    newDirection: SingleValue<SortOrder>,
    newOrderBy: SingleValue<SortOptions>,
  ) => {
    setOrderBy(newOrderBy);
    setOrderDirection(newDirection);

    setIsOrderingShown(false);
  };

  const { data, isFetching, error } = useQuery({
    queryKey: [
      `/api/tasks/${queryParams.taskID}`,
      orderBy,
      orderDirection,
      isLhsRhsOnlyShown,
    ],
    queryFn: createQueryFn('/api/tasks/{id}', {
      params: {
        query: {
          sort_direction: orderDirection as SortOrder,
          sort_option: orderBy as AfdVerificationSortOptions,
          filter_options: [AfdVerificationFilterOptions.show_lhs_rhs_only],
          filter_params: JSON.stringify({
            show_lhs_rhs_only: isLhsRhsOnlyShown,
          }),
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  if (isFetching || error) return;

  const deps =
    data?.result?.primitive_name === 'afd_verification' && data?.result?.result;
  if (!deps) return;

  const {
    error: threshold,
    num_error_rows,
    num_error_clusters,
    clusters,
    table_header,
  } = deps;
  const curCluster = clusters[clusterIndex] || {
    num_distinct_rhs_values: 0,
    most_frequent_rhs_value_proportion: 0,
    rows: [],
  };

  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          primitive={PrimitiveType.AFDVerification}
          isOpen={isOrderingShown}
          curOrderDirection={orderDirection}
          curOrderOption={orderBy}
          onClose={() => setIsOrderingShown(false)}
          onApply={handleApplyOrdering}
        />
      )}
      {data && !data.result && <ReportFiller title={'Loading'} />}
      {data && data.result && data.result.result && (
        <>
          {!num_error_clusters && data.result && (
            <ReportFiller
              title="No clusters have been discovered (functional dependency holds)"
              description="Try restarting the task with different parameters"
              icon={<Icon name="lineArrowRight" />}
            />
          )}
          {!num_error_clusters && !data.result.result && (
            <ReportFiller
              title="No clusters have been discovered (functional dependency may not hold)"
              description="Try restarting the task with different parameters"
              icon={<Icon name="lineArrowRightCrossed" />}
            />
          )}
          {num_error_clusters !== 0 && data.result && (
            <div className={styles.clustersContainer}>
              <h5>Clusters</h5>
              <div className={styles.subHeader}>
                <span>
                  Error threshold: {Math.round(threshold * 100) / 100}.
                </span>
                <span>Violating rows: {num_error_rows}.</span>
              </div>

              <div className={styles.filters}>
                <div className={styles.buttons}>
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<Icon name="ordering" />}
                    onClick={() => setIsOrderingShown(true)}
                  >
                    Ordering
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<Icon name="eye" />}
                    onClick={() => setIsLhsRhsOnlyShown(!isLhsRhsOnlyShown)}
                  >
                    {(isLhsRhsOnlyShown ? 'Hide' : 'Show') + ' LHS/RHS only'}
                  </Button>
                </div>
              </div>
              <AFDCluster
                distinctRHSValues={curCluster.num_distinct_rhs_values}
                frequentness={curCluster.most_frequent_rhs_value_proportion}
                size={curCluster.rows.length}
                tableData={{
                  clusterNumber: clusterIndex,
                  header: table_header,
                  className: styles.table,
                  highlights: curCluster.rows.map((row, indx) => ({
                    index: indx,
                    snippetRow: row,
                  })),
                }}
              />
              {num_error_clusters && (
                <Pagination
                  count={num_error_clusters}
                  current={clusterIndex + 1}
                  onChange={(page) => {
                    setClusterIndex(page - 1);
                  }}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
