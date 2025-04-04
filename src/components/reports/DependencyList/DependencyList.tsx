'use client';

import classNames from 'classnames';
//import _ from 'lodash';
import { FC, ReactElement, ReactNode, useState } from 'react';
import { SchemaNarModel, SchemaNarSideModel } from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit';
import styles from './DependencyList.module.scss';

// interface Column {
//   name: string;
//   index: number;
// }

type Column = SchemaNarSideModel;
type Deps = SchemaNarModel;

type Props = {
  formatter?: (column: Column) => ReactNode;
  deps: Deps[];
  infoVisible?: boolean;
};

const makeSide: (
  data: Column | Column[],
  infoVisible: boolean,
  formatter?: (column: Column) => ReactNode,
) => ReactElement = (data, infoVisible, formatter) => {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((e, index) => (
          <span className={styles.attr} key={index}>
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

  const [selectedDependency, setSelectedDependency] = useState<Column[]>([]);
  const errorDependency = [] as Column[];

  return (
    <div className={styles.dependencyListContainer}>
      {deps.map((row, i) => {
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
                <small>{Math.round(row.confidence * 100)}%</small>
              )}
            </div>
            {makeSide(row.rhs, infoVisible, formatter)}
          </div>
        );
      })}
    </div>
  );
};
