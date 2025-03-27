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
import {
  FilteringWindow,
  OrderingWindow,
  DependencyList,
} from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import styles from './TypoFDResult.module.scss';

export const TypoFDResult = () => {
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [isFilteringShown, setIsFilteringShown] = useState(false);

  const shownData = {
    taskInfo: {
      __typename: 'TaskInfo',
      taskID: 'd77b74fd-b881-45c9-8d3d-cf8a2478907d',
      data: {
        __typename: 'TaskWithDepsData',
        result: {
          __typename: 'FDTaskResult',
          taskID: 'd77b74fd-b881-45c9-8d3d-cf8a2478907d',
          depsAmount: 6,
          filteredDeps: {
            __typename: 'FilteredFDs',
            filteredDepsAmount: 6,
            FDs: [
              {
                __typename: 'FD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Planet',
                    index: 0,
                  },
                ],
                rhs: {
                  __typename: 'Column',
                  name: 'RotationPeriod',
                  index: 1,
                },
              },
              {
                __typename: 'FD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'Planet',
                    index: 0,
                  },
                ],
                rhs: {
                  __typename: 'Column',
                  name: 'RevolutionPeriod',
                  index: 2,
                },
              },
              {
                __typename: 'FD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'RotationPeriod',
                    index: 1,
                  },
                ],
                rhs: {
                  __typename: 'Column',
                  name: 'Planet',
                  index: 0,
                },
              },
              {
                __typename: 'FD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'RotationPeriod',
                    index: 1,
                  },
                ],
                rhs: {
                  __typename: 'Column',
                  name: 'RevolutionPeriod',
                  index: 2,
                },
              },
              {
                __typename: 'FD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'RevolutionPeriod',
                    index: 2,
                  },
                ],
                rhs: {
                  __typename: 'Column',
                  name: 'Planet',
                  index: 0,
                },
              },
              {
                __typename: 'FD',
                lhs: [
                  {
                    __typename: 'Column',
                    name: 'RevolutionPeriod',
                    index: 2,
                  },
                ],
                rhs: {
                  __typename: 'Column',
                  name: 'RotationPeriod',
                  index: 1,
                },
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

  const deps = [
    {
      rhs: [
        {
          column: {
            __typename: 'Column',
            name: 'RotationPeriod',
            index: 1,
          },
        },
      ],
      lhs: [
        {
          column: {
            __typename: 'Column',
            name: 'Planet',
            index: 0,
          },
        },
      ],
    },
    {
      rhs: [
        {
          column: {
            __typename: 'Column',
            name: 'RevolutionPeriod',
            index: 2,
          },
        },
      ],
      lhs: [
        {
          column: {
            __typename: 'Column',
            name: 'Planet',
            index: 0,
          },
        },
      ],
    },
    {
      rhs: [
        {
          column: {
            __typename: 'Column',
            name: 'Planet',
            index: 0,
          },
        },
      ],
      lhs: [
        {
          column: {
            __typename: 'Column',
            name: 'RotationPeriod',
            index: 1,
          },
        },
      ],
    },
    {
      rhs: [
        {
          column: {
            __typename: 'Column',
            name: 'RevolutionPeriod',
            index: 2,
          },
        },
      ],
      lhs: [
        {
          column: {
            __typename: 'Column',
            name: 'RotationPeriod',
            index: 1,
          },
        },
      ],
    },
    {
      rhs: [
        {
          column: {
            __typename: 'Column',
            name: 'Planet',
            index: 0,
          },
        },
      ],
      lhs: [
        {
          column: {
            __typename: 'Column',
            name: 'RevolutionPeriod',
            index: 2,
          },
        },
      ],
    },
    {
      rhs: [
        {
          column: {
            __typename: 'Column',
            name: 'RotationPeriod',
            index: 1,
          },
        },
      ],
      lhs: [
        {
          column: {
            __typename: 'Column',
            name: 'RevolutionPeriod',
            index: 2,
          },
        },
      ],
    },
  ];

  return (
    <>
      <NextSeo title="Discovered ???" />
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.TypoFD,
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
        <DependencyList {...{ deps }} />
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
