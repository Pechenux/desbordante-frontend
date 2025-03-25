'use client';

import { useAtom } from 'jotai';
import { FC, useMemo, useState } from 'react';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { FormField, Select } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';

import {
  columnMatchType,
  selectedColumnMatchesAtom,
} from '@/store/MDColumnMatchesAtom';
import styles from './ConfigureColumnMatchModal.module.scss';

export type ColumnMatchesModalProps = ModalProps & {
  value: columnMatchType;
};

const optionsMetrics = [
  { label: 'Jaccard', value: 'Jaccard' },
  { label: 'Equality', value: 'Equality' },
  { label: 'Normalized', value: 'Normalized' },
  { label: 'Levienstain', value: 'Levienstain' },
  { label: 'Monge-Elkan', value: 'Monge-Elkan' },
];

const optionsColumns = [
  { label: 'Column 1', value: 'Column 1' },
  { label: 'Column 2', value: 'Column 2' },
  { label: 'Column 3', value: 'Column 3' },
  { label: 'Column 4', value: 'Column 4' },
  { label: 'Column 5', value: 'Column 5' },
];

export const ConfigureColumnMatchModal: FC<ColumnMatchesModalProps> = ({
  value,
  isOpen,
  onClose,
}) => {
  const [metrics, setMetrics] = useState<string | null>(value.metrics);
  const [column1, setColumn1] = useState<string | null>(value.column1);
  const [column2, setColumn2] = useState<string | null>(value.column2);
  const [isError, setIsError] = useState<boolean>(false);

  const [columnMatches, setColumnMatches] = useAtom<columnMatchType[]>(
    selectedColumnMatchesAtom,
  );

  const onDelete = () => {
    setColumnMatches(columnMatches.filter((cm) => cm !== value));
    onClose();
  };
  const onApply = () => {
    const isValid = !(metrics === '' || column1 === '' || column2 === '');
    setIsError(!isValid);

    console.log('???', isValid, isError);
    if (isValid) {
      console.log('not error');
      setColumnMatches(
        columnMatches.map((cm) =>
          cm === value
            ? { metrics: metrics, column1: column1, column2: column2 }
            : cm,
        ),
      );
      onClose();
    }
  };

  const header = useMemo(
    () => <h4 className={styles.title}>Configure Column Match</h4>,
    [],
  );
  const footer = (
    <>
      <Button variant="secondary" onClick={onDelete}>
        Delete
      </Button>
      <Button onClick={onApply}>Apply</Button>
    </>
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
          <FormField
            label="Metrics"
            error={isError && !metrics ? 'Requirement' : ''}
          >
            <Select
              error={isError && !metrics}
              value={metrics}
              onChange={setMetrics}
              options={optionsMetrics}
            />
          </FormField>
          <FormField
            label="Column #1"
            error={isError && !column1 ? 'Requirement' : ''}
          >
            <Select
              error={isError && !column1}
              value={column1}
              onChange={setColumn1}
              options={optionsColumns}
            />
          </FormField>
          <FormField
            label="Column #2"
            error={isError && !column2 ? 'Requirement' : ''}
          >
            <Select
              error={isError && !column2}
              value={column2}
              onChange={setColumn2}
              options={optionsColumns}
            />
          </FormField>
        </WizardLayout>
      </ModalContainer>
    </>
  );
};
