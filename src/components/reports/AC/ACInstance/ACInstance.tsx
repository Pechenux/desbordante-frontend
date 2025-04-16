import cn from 'classnames';
//import { useAtom } from 'jotai';
import { FC } from 'react';
import { OperationType, SchemaAcModel } from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
//import ACAtom, { ACAtomDefaultValuesWithParams } from '@/store/ACTaskAtom';

import { CollapsableView } from '../CollapsableView';
import styles from './ACInstance.module.scss';

export type ACInstanceType = SchemaAcModel & {
  isSelected: boolean;
  operation: OperationType;
};

// export enum Operation {
//   ADDITION = 'ADDITION',
//   MULTIPLICATION = 'MULTIPLICATION',
//   DIVISION = 'DIVISION',
//   SUBTRACTION = 'SUBTRACTION',
// }

export const operationIcons = {
  [OperationType['+']]: <Icon name="plus" size={16} color={colors.black[75]} />,
  [OperationType['*']]: (
    <Icon name="cross" size={16} color={colors.black[75]} />
  ),
  [OperationType['/']]: (
    <Icon name="division" size={16} color={colors.black[75]} />
  ),
  [OperationType.ValueMinus]: (
    <Icon name="minus" size={16} color={colors.black[75]} />
  ),
};

export const ACInstance: FC<ACInstanceType> = ({
  left_column,
  right_column,
  operation,
  outliers,
  intervals,
  isSelected,
}) => {
  //const [atom, setAtom] = useAtom(ACAtom);
  const handleSelect = () => {
    console.log('click');
    // const instance = {
    //   id,
    //   attributes: attributes,
    //   intervals: intervals,
    //   outliers: outliers,
    //   operation: operation,
    // };
    // setAtom({ ...ACAtomDefaultValuesWithParams(atom.taskID, instance) });
  };

  const OperationIcon = operationIcons[operation];

  //const isSelected = atom.instanceSelected?.id === id;

  return (
    <div
      className={cn(styles.containerOuter, isSelected && styles.selected)}
      onClick={handleSelect}
    >
      <div className={styles.containerInner}>
        Operation
        <div className={styles.attributes}>
          <div className={styles.attribute}>{left_column}</div>
          {OperationIcon}
          <div className={styles.attribute}>{right_column}</div>
        </div>
      </div>
      <CollapsableView title={`Intervals (${intervals.length})`}>
        {intervals.map((elem) => (
          <>
            <span
              key={`intervals ${elem[0]} ${elem[1]}`}
            >{`[${elem[0]}, ${elem[1]}]`}</span>
          </>
        ))}
      </CollapsableView>
      <CollapsableView title={`Outliers (${outliers.length})`}>
        {outliers.map((elem) => (
          // <>
          //   <span key={`Outliers ${elem}`}>{elem}</span>{' '}
          // </>
          <span key={`Outliers ${elem}`}>{elem}</span>
        ))}
      </CollapsableView>
    </div>
  );
};
