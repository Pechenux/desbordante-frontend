'use client';

import { useAtom } from 'jotai';
import { FC, useMemo } from 'react';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';

import {
  columnMatchType,
  defaultColumnMatch,
  selectedColumnMatchesAtom,
} from '@/store/MDColumnMatchesAtoms';
import { ConfigureColumnMatchInput } from '../ConfigureColumnMatchInput';
import styles from './ColumnMatchesModal.module.scss';

export const ColumnMatchesModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [columnMatches, setColumnMatches] = useAtom<columnMatchType[]>(
    selectedColumnMatchesAtom,
  );

  const header = useMemo(
    () => <h4 className={styles.title}>Set the Column Matches</h4>,
    [],
  );

  const footer = (
    <Button
      disabled={columnMatches[columnMatches.length - 1]?.metrics === ''}
      variant="secondary"
      icon={<Icon name="plus" />}
      onClick={() => {
        setColumnMatches([...columnMatches, defaultColumnMatch]);
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
          {columnMatches.map((cm, i) => (
            <ConfigureColumnMatchInput key={i} value={cm} />
          ))}
        </WizardLayout>
      </ModalContainer>
    </>
  );
};
