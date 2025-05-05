'use client';

import { useQuery } from '@tanstack/react-query';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import {
  MfdVerificationFilterOptions,
  MfdVerificationSortOptions,
  SchemaHighlight,
  SortOrder,
} from '@/api/generated/schema';
import { createQueryFn } from '@/api/services/server';
import { Button, Icon, Pagination } from '@/components/common/uikit';

import { OrderingWindow, SortOptions } from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { useQueryParams } from '@/utils/useQueryParams';
import { MFDTable } from './components/MFDTable';
import styles from './MFDResult.module.scss';

type ReportFillerProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

const ReportFiller: FC<ReportFillerProps> = ({ title, description, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.filler}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.text}>
          <h6>{title}</h6>
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
};

type InsertedRow =
  | {
      position: number;
      data: SchemaHighlight;
    }
  | undefined;

export const MFDResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();

  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [showFullValue, setShowFullValue] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);

  const [orderDirection, setOrderDirection] = useState<SingleValue<SortOrder>>(
    SortOrder.asc,
  );
  const [orderBy, setOrderBy] = useState<SingleValue<SortOptions>>(
    MfdVerificationSortOptions.data_index,
  );

  const handleApplyOrdering = (
    newDirection: SingleValue<SortOrder>,
    newOrderBy: SingleValue<SortOptions>,
  ) => {
    setOrderBy(newOrderBy);
    setOrderDirection(newDirection);

    setIsOrderingShown(false);
  };
  const [furthestData, setFurthestData] = useState<InsertedRow | undefined>(
    undefined,
  );

  const { data, isFetching, error } = useQuery({
    queryKey: [
      `/api/tasks/${queryParams.taskID}`,
      pageIndex,
      orderBy,
      orderDirection,
    ],
    queryFn: createQueryFn('/api/tasks/{id}', {
      params: {
        query: {
          filter_options: [MfdVerificationFilterOptions.cluster_index],
          filter_params: JSON.stringify({
            cluster_index: pageIndex,
          }),
          sort_direction: orderDirection as SortOrder,
          sort_option: orderBy as MfdVerificationSortOptions,
        },
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  const mfd_result = useMemo(
    () =>
      data?.result?.primitive_name === 'mfd_verification'
        ? data?.result?.result
        : undefined,
    [data?.result?.primitive_name, data?.result?.result],
  );

  const insertRow = useCallback(
    (furthestIndex: number, dataIndex: number) => {
      const furthestPointData =
        mfd_result && !mfd_result.mfd_holds
          ? mfd_result?.highlights_clusters[0]?.highlights.find(
              (highlight) => highlight.data_index === furthestIndex,
            )
          : undefined;
      if (furthestPointData) {
        setFurthestData({
          position: dataIndex,
          data: furthestPointData,
        });
      }
    },
    [mfd_result],
  );

  const closeInsertedRow = useCallback(() => {
    setFurthestData(undefined);
  }, []);

  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          primitive={PrimitiveType.MFD}
          isOpen={isOrderingShown}
          curOrderDirection={orderDirection}
          curOrderOption={orderBy}
          onClose={() => setIsOrderingShown(false)}
          onApply={handleApplyOrdering}
        />
      )}
      {(isFetching || error || mfd_result === undefined) && (
        <ReportFiller title={'Loading'} />
      )}
      {!isFetching && !error && mfd_result !== undefined && (
        <>
          {mfd_result.mfd_holds && (
            <ReportFiller
              title={
                'No clusters have been discovered (metric dependency holds)'
              }
              description={'Try restarting the task with different parameters'}
              icon={<Icon name="lineArrowRight" />}
            />
          )}
          {!mfd_result.mfd_holds && mfd_result.cluster_count === 0 && (
            <ReportFiller
              title={
                'No clusters have been discovered (metric dependency may not hold)'
              }
              description={'Try restarting the task with different parameters'}
              icon={<Icon name="lineArrowRightCrossed" />}
            />
          )}
          {!mfd_result.mfd_holds && mfd_result.cluster_count !== 0 && (
            <div className={styles.clustersContainer}>
              <h5>Clusters</h5>

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
                    onClick={() => setShowFullValue((e) => !e)}
                  >
                    {showFullValue ? 'Hide' : 'Show'} full value
                  </Button>
                </div>
              </div>

              <h6>
                Cluster value:{' '}
                {mfd_result.highlights_clusters[0]?.cluster_name.join(', ') ||
                  'loading'}
              </h6>

              <MFDTable
                clusterNumber={pageIndex}
                totalCount={mfd_result.cluster_count}
                highlights={mfd_result.highlights_clusters[0]?.highlights ?? []}
                isFullValueShown={showFullValue}
                insertedRow={furthestData}
                insertRow={insertRow}
                closeInsertedRow={closeInsertedRow}
                className={styles.table}
              />

              {mfd_result.cluster_count && (
                <Pagination
                  count={mfd_result.cluster_count}
                  current={pageIndex + 1}
                  onChange={(page) => {
                    setPageIndex(page - 1);
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
