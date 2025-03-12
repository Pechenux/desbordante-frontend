'use client';

import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import styles from './DependencyList.module.scss';

export type Deps<T> = {
  lhs: T[];
  rhs: T[];
  confidence?: number;
  support?: number;
};

type Props<T> = {
  deps: Deps<T>[] | undefined;
  formatter?: (sideItem: T) => ReactNode;
};

type MakeSideProps<T> = {
  side: T[] | undefined;
  formatter: (sideItem: T) => ReactNode;
};

const makeSide = <T,>({ side, formatter }: MakeSideProps<T>) => {
  return (
    <>
      {side &&
        side.map((s, index) => (
          <span className={styles.attr} key={index}>
            {formatter(s)}
          </span>
        ))}
    </>
  );
};

export const DependencyList = <T,>({
  deps,
  formatter = (sideItem: T) => sideItem as ReactNode,
}: Props<T>) => {
  // const { selectedDependency, selectDependency, errorDependency } =
  //   useTaskContext();

  const [selectedDependency, setSelectedDependency] = useState<string>();
  const errorDependency = '';

  return (
    <div className={styles.dependencyListContainer}>
      {deps &&
        deps.map((row, i) => {
          const fullDependency = JSON.stringify(row);
          const isError = errorDependency === fullDependency;
          const isSelected = selectedDependency === fullDependency;

          return (
            <div
              key={i}
              className={classNames(
                styles.row,
                isSelected && styles.selectedRow,
                isError && styles.errorRow,
              )}
              onClick={() =>
                setSelectedDependency(isSelected ? '' : fullDependency)
              }
            >
              {makeSide({ side: row.lhs, formatter })}
              <div className={styles.arrowContainer}>
                <Icon name="longArrow" />
                {row.confidence && (
                  <small>{Math.round(row.confidence * 100)}%</small>
                )}
              </div>
              {makeSide({ side: row.rhs, formatter })}
            </div>
          );
        })}
    </div>
  );
};
