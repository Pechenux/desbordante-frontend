'use client';

import { NextSeo } from 'next-seo';
// import { useState } from 'react';
// import LayeredChart from '../PieChart/LayeredChart';
import styles from './ChartStatistics.module.scss';

// type DependencyFilter = { rhs: number[]; lhs: number[] };

export const ChartStatistics = () => {
  // const [dependenciesFilter, setDependenciesFilter] =
  //   useState<DependencyFilter>({ rhs: [], lhs: [] });
  // const lhs = [
  //   {
  //     __typename: 'PieChartRow',
  //     column: {
  //       __typename: 'Column',
  //       name: 'Planet',
  //       index: 0,
  //     },
  //     value: 2,
  //   },
  //   {
  //     __typename: 'PieChartRow',
  //     column: {
  //       __typename: 'Column',
  //       name: 'RotationPeriod',
  //       index: 1,
  //     },
  //     value: 2,
  //   },
  //   {
  //     __typename: 'PieChartRow',
  //     column: {
  //       __typename: 'Column',
  //       name: 'RevolutionPeriod',
  //       index: 2,
  //     },
  //     value: 2,
  //   },
  // ];

  // const rhs = [
  //   {
  //     __typename: 'PieChartRow',
  //     column: {
  //       __typename: 'Column',
  //       name: 'Planet',
  //       index: 0,
  //     },
  //     value: 2,
  //   },
  //   {
  //     __typename: 'PieChartRow',
  //     column: {
  //       __typename: 'Column',
  //       name: 'RotationPeriod',
  //       index: 1,
  //     },
  //     value: 2,
  //   },
  //   {
  //     __typename: 'PieChartRow',
  //     column: {
  //       __typename: 'Column',
  //       name: 'RevolutionPeriod',
  //       index: 2,
  //     },
  //     value: 2,
  //   },
  // ];

  return (
    <>
      <NextSeo title="Statistics" />
      <div className={styles.container}>
        {/* {loading && <h5>Loading..</h5>} */}
        {/* <LayeredChart
          title="Left-hand side"
          attributes={lhs}
          {...{
            selectedAttributeIndices: dependenciesFilter.lhs,
            setSelectedAttributeIndices: (lhs) =>
              setDependenciesFilter(({ rhs }) => ({ rhs, lhs })),
          }}
        />

        <LayeredChart
          title="Right-hand side"
          attributes={rhs}
          {...{
            selectedAttributeIndices: dependenciesFilter.rhs,
            setSelectedAttributeIndices: (rhs) =>
              setDependenciesFilter(({ lhs }) => ({ rhs, lhs })),
          }}
        /> */}
      </div>
    </>
  );
};
