'use client';

import classNames from 'classnames';
//import _ from 'lodash';
import { FC, ReactElement, useState } from 'react';
import { SchemaDdSideModel, SchemaNarSideModel } from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit';
import styles from './DependencyList.module.scss';

type Column = SchemaNarSideModel | string | SchemaDdSideModel;
export type Deps = {
  lhs: string[];
  rhs: string[];
  confidence?: number;
  support?: number;
};

type Props = {
  deps: Deps[] | undefined;
  infoVisible?: boolean;
};

const makeSide: (
  data: string | string[],
  infoVisible: boolean,
) => ReactElement = (data, infoVisible) => {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((e, index) => (
          <span className={styles.attr} key={index}>
            {e}
            {/* {infoVisible && e.pattern ? ' | ' + e.pattern : ''} */}
          </span>
        ))}
      </>
    );
  } else {
    return makeSide([data], infoVisible);
  }
};

export const DependencyList: FC<Props> = ({ deps, infoVisible = true }) => {
  // const { selectedDependency, selectDependency, errorDependency } =
  //   useTaskContext();

  const [selectedDependency, setSelectedDependency] = useState<Column[]>([]);
  const errorDependency = [] as Column[];

  return (
    <div className={styles.dependencyListContainer}>
      {deps &&
        deps.map((row, i) => {
          const fullDependency = row.lhs.concat(row.rhs);
          const isError =
            JSON.stringify(errorDependency) === JSON.stringify(fullDependency);
          const isSelected =
            JSON.stringify(selectedDependency) ===
            JSON.stringify(fullDependency);

          return (
            <div
              key={i}
              className={classNames(
                styles.row,
                isSelected && styles.selectedRow,
                isError && styles.errorRow,
              )}
              onClick={() =>
                setSelectedDependency(isSelected ? [] : fullDependency)
              }
            >
              {makeSide(row.lhs, infoVisible)}
              <div className={styles.arrowContainer}>
                <Icon name="longArrow" />
                {row.confidence && (
                  <small>{Math.round(row.confidence * 100)}%</small>
                )}
              </div>
              {makeSide(row.rhs, infoVisible)}
            </div>
          );
        })}
    </div>
  );
};
