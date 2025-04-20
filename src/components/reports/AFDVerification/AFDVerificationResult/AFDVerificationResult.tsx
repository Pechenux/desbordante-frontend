'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useRef, useState } from 'react';

//import VisibilityWindow from '@components/Filters/AFDVisibilityWindow';
//import Pagination from '@components/Pagination/Pagination';

import { createQueryFn } from '@/api/fetchFunctions';
import { Button, Icon, Pagination } from '@/components/common/uikit';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import { OrderingWindow } from '../../Filters';
import { ReportFiller } from '../../ReportFiller';
import { ScrollDirection } from '../../ScrollableNodeTable';
import { AFDCluster } from '../AFDCluster/AFDCluster';
import styles from './AFDVerificationResult.module.scss';

export const AFDVerificationResult = () => {
  const defaultLimit = 150;
  const defaultOffsetDifference = 50;
  const { queryParams } = useQueryParams<{ taskID: string }>();
  // const queryParams = {
  //   taskID: '5e12f329-52f4-4463-845b-a9ec353c49ae',
  // };

  const [clusterIndex, setClusterIndex] = useState(0);
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  //const [isVisibilityShown, setIsVisibilityShown] = useState(false);
  const shouldIgnoreScrollEvent = useRef(false);

  const [limit, setLimit] = useState(defaultLimit);

  const onScroll = useCallback(
    (direction: ScrollDirection) => {
      if (!shouldIgnoreScrollEvent.current && direction === 'down') {
        shouldIgnoreScrollEvent.current = true;
        if (limit < maxLimit) {
          setLimit((limit) => limit + defaultOffsetDifference);
        } else {
          shouldIgnoreScrollEvent.current = false;
        }
      }
    },
    [limit, defaultOffsetDifference /*maxLimit*/],
  );

  const { data, isFetching, error } = useQuery({
    queryKey: [`/tasks/${queryParams.taskID}`],
    queryFn: createQueryFn('/tasks/{id}', {
      params: {
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  console.log(data, isFetching, error);
  if (isFetching || error) return;

  const deps =
    data?.result?.primitive_name === 'afd_verification' && data?.result?.result;

  const {
    error: threshold,
    num_error_rows,
    num_error_clusters,
    clusters,
    table_header,
  } = deps || {
    error: 0,
    num_error_rows: 0,
    num_error_clusters: 0,
    clusters: [],
    table_header: [],
  };
  const maxLimit = num_error_clusters || defaultLimit;
  const curCluster = clusters[clusterIndex] || {
    num_distinct_rhs_values: 0,
    most_frequent_rhs_value_proportion: 0,
    rows: [],
  };
  //const curCluster = clusters[0]

  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.AFDVerification,
            labelOrderBy: 'Order Clusters by',
          }}
        />
      )}

      {/* {isVisibilityShown && (
          <VisibilityWindow onCloseWindow={() => setIsVisibilityShown(false)} />
        )} */}

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
                    //onClick={() => setIsVisibilityShown(true)}
                  >
                    Visibility
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
                  onScroll: onScroll,
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
