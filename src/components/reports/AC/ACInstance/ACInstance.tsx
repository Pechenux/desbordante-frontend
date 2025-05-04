import cn from 'classnames';
import { FC } from 'react';
import { OperationType, SchemaAcModel } from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { CollapsableView } from '../CollapsableView';
import styles from './ACInstance.module.scss';

export type ACInstanceType = SchemaAcModel & {
  isSelected: boolean;
  operation: OperationType;
  onClick: () => void;
};

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
  onClick,
}) => {
  const OperationIcon = operationIcons[operation];
  const outliersString = outliers.join(' ');
  const intervalsString = intervals.reduce(
    (acc, range) => acc + `[${range[0]}, ${range[1]}] `,
    '',
  );

  return (
    <div
      className={cn(styles.containerOuter, isSelected && styles.selected)}
      onClick={onClick}
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
        {intervalsString}
      </CollapsableView>
      <CollapsableView title={`Outliers (${outliers.length})`}>
        {outliersString}
      </CollapsableView>
    </div>
  );
};
