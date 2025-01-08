'use client';

import { NextSeo } from 'next-seo';
import { ScrollableTable } from '@/components/reports';
import styles from './Snippet.module.scss';

// const DEFAULT_LIMIT = 30;
// const LIMIT_INCREMENT = 30;

export const Snippet = () => {
  const snippet = {
    __typename: 'Snippet',
    header: ['Planet', 'RotationPeriod', 'RevolutionPeriod'],
    rows: [
      ['Mercury', '58.6 days', '87.97 days'],
      ['Venus', '243 days', '224.7 days'],
      ['Earth', '0.99 days', '365.26 days'],
      ['Mars', '1.03 days', '1.88 years'],
      ['Jupiter', '0.41 days', '11.86 years'],
      ['Saturn', '0.45 days', '29.46 years'],
      ['Uranus', '0.72 days', '84.01 years'],
      ['Neptune', '0.67 days', '164.79 years'],
      ['Pluto', '6.39 days', '248.59 years'],
    ],
    datasetInfo: {
      __typename: 'DatasetInfo',
      rowsCount: 10,
    },
  };

  return (
    <>
      <NextSeo title="Dataset Snippet" />
      <h5 className={styles.header}>Dataset Snippet</h5>
      <ScrollableTable
        className={styles.table}
        header={snippet.header}
        data={snippet.rows}
        //highlightColumnIndices={highlightedColumnIndices}
        //onScroll={handleScrollToBottom}
      />
    </>
  );
};
