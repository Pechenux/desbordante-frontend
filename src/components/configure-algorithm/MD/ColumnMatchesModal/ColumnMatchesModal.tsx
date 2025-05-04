'use client';

import { FC, useMemo } from 'react';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { ColumnMatchType, defaultColumnMatch } from '../ColumnMatchesInput';
import { ConfigureColumnMatchInput } from '../ConfigureColumnMatchInput';
import styles from './ColumnMatchesModal.module.scss';

type ColumnMatchesModalProps = ModalProps & {
  value: ColumnMatchType[];
  onChange: (newValue: ColumnMatchType[]) => void;
};
export const ColumnMatchesModal: FC<ColumnMatchesModalProps> = ({
  value,
  onChange,
  isOpen,
  onClose,
}) => {
  const isDisabledAdding =
    value && !value[value.length - 1]?.left_column && value.length !== 0;
  const handleAddColumnMatch = () => {
    onChange([...value, defaultColumnMatch]);
  };
  const handleDelete = (currentColumnMatch: ColumnMatchType) => {
    onChange(value.filter((cm) => cm !== currentColumnMatch));
  };
  const handleApplyChanges = (
    currentColumnMatch: ColumnMatchType,
    newColumnMatch: ColumnMatchType,
  ) => {
    onChange(
      value.map((cm) => (cm === currentColumnMatch ? newColumnMatch : cm)),
    );
  };

  const header = useMemo(
    () => <h4 className={styles.title}>Set the Column Matches</h4>,
    [],
  );

  const footer = (
    <Button
      disabled={isDisabledAdding}
      variant="secondary"
      icon={<Icon name="plus" />}
      onClick={() => {
        handleAddColumnMatch();
      }}
    >
      Add column match
    </Button>
  );

  return (
    <>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        className={styles.modal}
      >
        <WizardLayout
          header={header}
          footer={footer}
          hasBackground={false}
          className={styles.container}
        >
          {value &&
            value.map((cm, i) => (
              <ConfigureColumnMatchInput
                onApply={handleApplyChanges}
                onDelete={handleDelete}
                key={i}
                columnMatch={cm}
              />
            ))}
        </WizardLayout>
      </ModalContainer>
    </>
  );
};
