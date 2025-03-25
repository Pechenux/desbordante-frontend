'use client';

import classNames from 'classnames';
import { FC, ReactElement } from 'react';
import { Icon } from '@/components/common/uikit';
import styles from './ADCInstance.module.scss';

// interface Column {
//   name: string;
//   index: number;
// }

type GeneralColumn = {
  __typename: 'Column';
  value1: string;
  value2: string;
  relation: string;
  index: number;
};

type ADCType = {
  __typename: 'ADC';
  id: string;
  deps: GeneralColumn[];
};

type Props = {
  data: ADCType;
  isSelected: boolean;
  onClick: () => void;
};

const makeSide: (data: GeneralColumn[]) => ReactElement = (data) => {
  return (
    <>
      {data.map((e, i) => (
        <>
          <span className={styles.attr} key={i}>
            {e.value1}
            <span className={styles.relation}>{e.relation}</span>

            {e.value2}
          </span>
          {i < data.length - 1 && (
            <Icon name="greater" orientation="left" size={20} />
          )}
        </>
      ))}
    </>
  );
};

export const ADCInstance: FC<Props> = ({ data, isSelected, onClick }) => {
  return (
    <div
      className={classNames(styles.row, isSelected && styles.selected)}
      onClick={onClick}
    >
      <Icon name="not" size={32} />
      <div className={styles.container}>{makeSide(data.deps)}</div>
    </div>
  );
};
