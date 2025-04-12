'use client';

import { NextSeo } from 'next-seo';
import { useState } from 'react';
import {
  Button,
  FormField,
  Icon,
  Pagination,
  Text,
} from '@/components/common/uikit';
// import DownloadResult from '@components/DownloadResult';
import {
  FilteringWindow,
  OrderingWindow,
  // DependencyList,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import styles from './ARResult.module.scss';

export const ARResult = () => {
  const [infoVisible, setInfoVisible] = useState(true);
  console.log(infoVisible);
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);

  const shownData = {
    taskInfo: {
      __typename: 'TaskInfo',
      taskID: 'f273a3dc-71d3-4f13-945e-aa007e6f5430',
      data: {
        __typename: 'TaskWithDepsData',
        result: {
          __typename: 'ARTaskResult',
          taskID: 'f273a3dc-71d3-4f13-945e-aa007e6f5430',
          depsAmount: 63,
          filteredDeps: {
            __typename: 'FilteredARs',
            filteredDepsAmount: 63,
            ARs: [
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'COFFEE'],
                rhs: ['CORNFLAKES'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'COFFEE'],
                rhs: ['CORNFLAKES', 'COCK'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'COFFEE'],
                rhs: ['COCK'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'COFFEE', 'COCK'],
                rhs: ['CORNFLAKES'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'SUGER'],
                rhs: ['BREAD'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'MAGGI'],
                rhs: ['TEA'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'TEA'],
                rhs: ['MAGGI'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'CORNFLAKES', 'COFFEE'],
                rhs: ['COCK'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'CORNFLAKES', 'COCK'],
                rhs: ['COFFEE'],
              },
              {
                __typename: 'AR',
                confidence: 1,
                lhs: ['BISCUIT', 'COCK'],
                rhs: ['COFFEE'],
              },
            ],
          },
        },
      },
    },
  };
  const recordsCount =
    shownData?.taskInfo.data.result &&
    'filteredDeps' in shownData?.taskInfo.data.result &&
    shownData?.taskInfo.data.result.filteredDeps.filteredDepsAmount;

  // const deps = [
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'CORNFLAKES',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COFFEE',
  //           index: 1,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'CORNFLAKES',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COCK',
  //           index: 1,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COFFEE',
  //           index: 1,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COCK',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COFFEE',
  //           index: 1,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'CORNFLAKES',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COFFEE',
  //           index: 1,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COCK',
  //           index: 2,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BREAD',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'SUGER',
  //           index: 1,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'TEA',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'MAGGI',
  //           index: 1,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'MAGGI',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'TEA',
  //           index: 1,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COCK',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'CORNFLAKES',
  //           index: 1,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COFFEE',
  //           index: 2,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COFFEE',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'CORNFLAKES',
  //           index: 1,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COCK',
  //           index: 2,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     confidence: 1,
  //     rhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COFFEE',
  //           index: 0,
  //         },
  //       },
  //     ],
  //     lhs: [
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'BISCUIT',
  //           index: 0,
  //         },
  //       },
  //       {
  //         column: {
  //           __typename: 'Column',
  //           name: 'COCK',
  //           index: 1,
  //         },
  //       },
  //     ],
  //   },
  // ];

  return (
    <>
      <NextSeo title="Discovered association rules" />
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.AR,
          }}
        />
      )}
      {isFilteringShown && (
        <FilteringWindow
          {...{
            isFilteringShown,
            setIsFilteringShown,
          }}
        />
      )}

      <h5>Primitive List</h5>

      <div className={styles.filters}>
        <FormField>
          <Text label="Search" placeholder="Attribute name or regex" />
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
          <Button
            variant="secondary"
            size="md"
            icon={<Icon name="eye" />}
            onClick={() => setInfoVisible((e) => !e)}
          >
            Visibility
          </Button>
          {/*<DownloadResult filter={filter} disabled={!deps.length} />*/}
        </div>
      </div>

      <div className={styles.rows}>
        {/* <DependencyList {...{ deps, infoVisible }} /> */}
      </div>

      <div className={styles.pagination}>
        <Pagination
          onChange={() => {}}
          current={1}
          count={Math.ceil((recordsCount || 10) / 10)}
        />
      </div>
    </>
  );
};
