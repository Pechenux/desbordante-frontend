'use client';

import classNames from 'classnames';
import _ from 'lodash';
import { FC, ReactElement, ReactNode, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import styles from './DependencyList.module.scss';

// interface Column {
//   name: string;
//   index: number;
// }

export type GeneralColumn = {
  __typename: 'Column';
  name: string;
  index: number;
};

type Props = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  formatter?: (column: any) => ReactNode;
  deps: {
    confidence?: number;
    rhs: GeneralColumn[];
    lhs: GeneralColumn[];
  }[];
  infoVisible?: boolean;
};

const makeSide: (
  data: GeneralColumn | GeneralColumn[],
  infoVisible: boolean,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  formatter?: (column: any) => ReactNode,
) => ReactElement = (data, infoVisible, formatter) => {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((e) => (
          <span className={styles.attr} key={e.index}>
            {/* {e.name} */}
            {formatter ? formatter(e) : e.name}
            {/* {infoVisible && e.pattern ? ' | ' + e.pattern : ''} */}
          </span>
        ))}
      </>
    );
  } else {
    return makeSide([data], infoVisible);
  }
};

export const DependencyList: FC<Props> = ({
  deps,
  infoVisible = true,
  formatter,
}) => {
  // const { selectedDependency, selectDependency, errorDependency } =
  //   useTaskContext();

  const [selectedDependency, setSelectedDependency] = useState<GeneralColumn[]>(
    [],
  );
  const errorDependency = [] as GeneralColumn[];

  return (
    <div className={styles.dependencyListContainer}>
      {_.map(deps, (row, i) => {
        const fullDependency = row.lhs.concat(row.rhs);
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
            {makeSide(row.lhs, infoVisible, formatter)}
            <div className={styles.arrowContainer}>
              <Icon name="longArrow" />
              {row.confidence !== undefined && (
                <small>{row.confidence * 100}%</small>
              )}
            </div>
            {makeSide(row.rhs, infoVisible, formatter)}
          </div>
        );
      })}
    </div>
  );
};
