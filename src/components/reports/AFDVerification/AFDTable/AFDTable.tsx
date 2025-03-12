'use client';

import { FC, useMemo } from 'react';

import { Row, ScrollDirection, Table, TableProps } from '@/components/reports';
import styles from './AFDTable.module.scss';

export type AFDTableProps = {
  header: string[];
  clusterNumber: number;
  highlights: AFDTableRow[];
  onScroll?: (direction: ScrollDirection) => void;
  className?: string;
};

export type AFDTableRow = {
  index: number;
  snippetRow: string[];
};

const getAFDRow: (row: AFDTableRow, position: number) => Row = (
  row,
  position,
) => {
  return {
    items: row.snippetRow,
    style: position % 2 === 0 ? styles.redEven : styles.redOdd,
    globalIndex: position,
  };
};

export const AFDTable: FC<AFDTableProps> = ({
  clusterNumber,
  highlights,
  header,
  onScroll,
  className,
}) => {
  const data: Row[] = useMemo(() => {
    const highlightData = highlights.map((row) => getAFDRow(row, row.index));

    return highlightData;
  }, [highlights]);

  const props: TableProps = {
    containerKey: clusterNumber,
    data,
    header,
    onScroll,
  };
  return <Table className={className} {...props} />;
};
