'use client';

import classNames from 'classnames';
import _ from 'lodash';
import { FC, ReactElement, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import styles from './DependencyList.module.scss';

// interface Column {
//   name: string;
//   index: number;
// }

export type GeneralColumn = number;

type Props = {
  deps: {
    confidence?: number;
    rhs_index: GeneralColumn;
    lhs_indices: GeneralColumn[];
  }[];
  infoVisible?: boolean;
};

const makeSide: (
  data: GeneralColumn | GeneralColumn[],
  infoVisible: boolean,
) => ReactElement = (data, infoVisible) => {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((e) => (
          <span className={styles.attr} key={e}>
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

  const [selectedDependency, setSelectedDependency] = useState<GeneralColumn[]>(
    [],
  );
  const errorDependency = [] as GeneralColumn[];

  return (
    <div className={styles.dependencyListContainer}>
      {_.map(deps, (row, i) => {
        const fullDependency = row.lhs_indices.concat(row.rhs_index);
        const isError =
          JSON.stringify(errorDependency) === JSON.stringify(fullDependency);
        const isSelected =
          JSON.stringify(selectedDependency) === JSON.stringify(fullDependency);

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
            {makeSide(row.lhs_indices, infoVisible)}
            <div className={styles.arrowContainer}>
              <Icon name="longArrow" />
              {row.confidence !== undefined && (
                <small>{row.confidence * 100}%</small>
              )}
            </div>
            {makeSide(row.rhs_index, infoVisible)}
          </div>
        );
      })}
    </div>
  );
};
