'use client';

import { FC } from 'react';
import { AFDTable, AFDTableProps } from '../AFDTable/AFDTable';
import styles from './AFDCluster.module.scss';

interface ClusterProps {
  size: number;
  distinctRHSValues: number;
  frequentness: number;
  tableData: AFDTableProps;
}

export const AFDCluster: FC<ClusterProps> = ({
  size,
  distinctRHSValues,
  frequentness,
  tableData,
}) => {
  return (
    <div className={styles.clustersContainer}>
      <div className={styles.subHeader}>
        <span>Size: {size}.</span>
        <span>Distinct RHS values: {distinctRHSValues}.</span>
        <span>
          Most frequent RHS value proportion: {Math.round(frequentness * 100)}%.
        </span>
      </div>

      <AFDTable
        clusterNumber={tableData.clusterNumber}
        highlights={tableData.highlights}
        onScroll={tableData.onScroll}
        className={styles.table}
        header={tableData.header}
      />
    </div>
  );
};
