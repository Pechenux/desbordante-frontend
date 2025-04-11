'use client';

import { FC, useMemo } from 'react';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { ColumnMatchesProps, ColumnMatchType } from '../ColumnMatchesInput';
import { ConfigureColumnMatchInput } from '../ConfigureColumnMatchInput';
import styles from './ColumnMatchesModal.module.scss';

type ColumnMatchesModalProps = ModalProps &
  ColumnMatchesProps & {
    value: ColumnMatchType[];
    isDisabledAdding: boolean;
    onAddingColumnMatch: () => void;
    onDelete: (currentColumnMatch: ColumnMatchType) => void;
    onApply: (
      currentColumnMatch: ColumnMatchType,
      newColumnMatch: ColumnMatchType,
    ) => void;
  };
export const ColumnMatchesModal: FC<ColumnMatchesModalProps> = ({
  value,
  isOpen,
  onClose,
  isDisabledAdding,
  onAddingColumnMatch,
  onDelete,
  onApply,
}) => {
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
        onAddingColumnMatch();
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
                onApply={onApply}
                onDelete={onDelete}
                key={i}
                columnMatch={cm}
              />
            ))}
        </WizardLayout>
      </ModalContainer>
    </>
  );
};
