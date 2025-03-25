import cn from 'classnames';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import ACAtom, { ACAtomDefaultValuesWithParams } from '@/store/ACTaskAtom';

import { CollapsableView } from '../CollapsableView';
import styles from './ACInstance.module.scss';

interface AttributesType {
  attribute1: string;
  attribute2: string;
}

type IntervalType = [number, number];
interface Intervals {
  amount: number;
  intervals: IntervalType[];
}
interface Outliers {
  amount: number;
  outliers: number[];
}

export type ACInstanceType = {
  id: string;
  attributes: AttributesType;
  operation: Operation;
  intervals: Intervals;
  outliers: Outliers;
};

export enum Operation {
  ADDITION = 'ADDITION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
  SUBTRACTION = 'SUBTRACTION',
}

export const operationIcons = {
  [Operation.ADDITION]: <Icon name="plus" size={16} color={colors.black[75]} />,
  [Operation.MULTIPLICATION]: (
    <Icon name="cross" size={16} color={colors.black[75]} />
  ),
  [Operation.DIVISION]: (
    <Icon name="division" size={16} color={colors.black[75]} />
  ),
  [Operation.SUBTRACTION]: (
    <Icon name="minus" size={16} color={colors.black[75]} />
  ),
};

export const ACInstance: FC<ACInstanceType> = ({
  id,
  attributes,
  operation,
  outliers,
  intervals,
}) => {
  const [atom, setAtom] = useAtom(ACAtom);
  const handleSelect = () => {
    const instance = {
      id,
      attributes: attributes,
      intervals: intervals,
      outliers: outliers,
      operation: operation,
    };
    setAtom({ ...ACAtomDefaultValuesWithParams(atom.taskID, instance) });
  };

  const OperationIcon = operationIcons[operation as Operation];

  const isSelected = atom.instanceSelected?.id === id;

  return (
    <div
      className={cn(styles.containerOuter, isSelected && styles.selected)}
      onClick={handleSelect}
    >
      <div className={styles.containerInner}>
        Operation
        <div className={styles.attributes}>
          <div className={styles.attribute}>{attributes.attribute1}</div>
          {OperationIcon}
          <div className={styles.attribute}>{attributes.attribute2}</div>
        </div>
      </div>
      <CollapsableView title={`Intervals (${intervals.amount})`}>
        {intervals.intervals.map((elem) => (
          <>
            <span
              key={`intervals ${elem[0]} ${elem[1]}`}
            >{`[${elem[0]}, ${elem[1]}]`}</span>{' '}
          </>
        ))}
      </CollapsableView>
      <CollapsableView title={`Outliers (${outliers.amount})`}>
        {outliers.outliers.map((elem) => (
          <>
            <span key={`Outliers ${elem}`}>{elem}</span>{' '}
          </>
        ))}
      </CollapsableView>
    </div>
  );
};
