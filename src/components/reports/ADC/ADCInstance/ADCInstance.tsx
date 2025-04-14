'use client';

import classNames from 'classnames';
import { FC, ReactElement } from 'react';
import { AdcItemModelSign, SchemaAdcItemModel } from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit';
import styles from './ADCInstance.module.scss';

// interface Column {
//   name: string;
//   index: number;
// }

const beautifulSign: Record<AdcItemModelSign, string> = {
  [AdcItemModelSign['==']]: '=',
  [AdcItemModelSign['!=']]: '≠',
  [AdcItemModelSign['<']]: '<',
  [AdcItemModelSign['<=']]: '≤',
  [AdcItemModelSign['>']]: '>',
  [AdcItemModelSign['>=']]: '≥',
};

type Props = {
  data: SchemaAdcItemModel[];
  isSelected: boolean;
  onClick: () => void;
};

const makeSide: (data: SchemaAdcItemModel[]) => ReactElement = (data) => {
  return (
    <>
      {data.map((e, i) => (
        <span className={styles.containerInner} key={i}>
          <span className={styles.attr}>
            {e.left_item}
            <span className={styles.relation}>{beautifulSign[e.sign]}</span>

            {e.right_item}
          </span>
          {i < data.length - 1 && (
            <Icon name="greater" orientation="left" size={20} />
          )}
        </span>
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
      <div className={styles.containerOuter}>{makeSide(data)}</div>
    </div>
  );
};
