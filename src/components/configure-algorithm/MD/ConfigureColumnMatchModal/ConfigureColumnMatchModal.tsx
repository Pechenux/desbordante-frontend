'use client';

import { FC, useMemo, useState } from 'react';
import {
  EqualityConfigMetrics,
  JaccardConfigMetrics,
  LcsConfigMetrics,
  LevenshteinConfigMetrics,
  LVNormDateDistanceConfigMetrics,
  LVNormNumberDistanceConfigMetrics,
  MongeElkanConfigMetrics,
} from '@/api/generated/schema';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { FormField, NumberInput, Select } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';

import { ColumnMatchType } from '../ColumnMatchesInput';
import styles from './ConfigureColumnMatchModal.module.scss';

export type ConfigureColumnMatchesProps = {
  columnMatch: ColumnMatchType;
  onDelete: (currentColumnMatch: ColumnMatchType) => void;
  onApply: (
    currentColumnMatch: ColumnMatchType,
    newColumnMatch: ColumnMatchType,
  ) => void;
};
type ConfigureColumnMatchesModalProps = ModalProps &
  ConfigureColumnMatchesProps;

export type MetricsType = ColumnMatchType['metrics'];

interface optionsType {
  label: string;
  value: MetricsType;
}
export const optionsMetrics: optionsType[] = [
  { label: 'Equality', value: EqualityConfigMetrics.equality },
  { label: 'Jaccard', value: JaccardConfigMetrics.jaccard },
  {
    label: 'LVNormDateDistance',
    value: LVNormDateDistanceConfigMetrics.lvnormdatedistance,
  },
  {
    label: 'LVNormNumberDistance',
    value: LVNormNumberDistanceConfigMetrics.lvnormnumberdistance,
  },
  { label: 'LCS', value: LcsConfigMetrics.lcs },
  { label: 'Levenstain', value: LevenshteinConfigMetrics.levenshtein },
  { label: 'Monge-Elkan', value: MongeElkanConfigMetrics.mongeelkan },
];

export const displayedMetricsName = {
  [EqualityConfigMetrics.equality]: 'Equality',
  [JaccardConfigMetrics.jaccard]: 'Jaccard',
  [LVNormDateDistanceConfigMetrics.lvnormdatedistance]: 'LVNormDateDistance',
  [LVNormNumberDistanceConfigMetrics.lvnormnumberdistance]:
    'LVNormNumberDistance',
  [LcsConfigMetrics.lcs]: 'LCS',
  [LevenshteinConfigMetrics.levenshtein]: 'Levenstain',
  [MongeElkanConfigMetrics.mongeelkan]: 'Monge-Elkan',
};

const optionsColumns = [
  { label: 'zoo', value: 'zoo' },
  { label: 'name', value: 'name' },
  { label: 'animal', value: 'animal' },
  { label: 'diet', value: 'diet' },
];

export const ConfigureColumnMatchModal: FC<
  ConfigureColumnMatchesModalProps
> = ({ columnMatch, isOpen, onApply, onClose, onDelete }) => {
  const [metrics, setMetrics] = useState<MetricsType | null>(
    columnMatch.metrics ? columnMatch.metrics : optionsMetrics[0]!.value,
  );
  const [column1, setColumn1] = useState<string | null>(
    columnMatch.left_column
      ? columnMatch.left_column
      : optionsColumns[0]!.value,
  );
  const [column2, setColumn2] = useState<string | null>(
    columnMatch.right_column
      ? columnMatch.right_column
      : optionsColumns[0]!.value,
  );
  const [boundLimit, setBoundLimit] = useState<number[]>(
    'bound_number_limit' in columnMatch
      ? [columnMatch.bound_number_limit]
      : [0],
  );
  const [minSimilarity, setMinSimilarity] = useState<number[]>(
    'minimum_similarity' in columnMatch
      ? [columnMatch.minimum_similarity]
      : [0.7],
  );

  const handleDelete = () => {
    onDelete(columnMatch);
    onClose();
  };
  const handleApply = () => {
    const newColumnMatch: ColumnMatchType =
      metrics === EqualityConfigMetrics.equality
        ? {
            metrics: EqualityConfigMetrics.equality,
            left_column: column1!,
            right_column: column2!,
          }
        : {
            metrics: metrics!,
            left_column: column1!,
            right_column: column2!,
            bound_number_limit: boundLimit[0] ?? 0,
            minimum_similarity: minSimilarity[0] ?? 0.7,
          };

    console.log('not error');
    onApply(columnMatch, newColumnMatch);
    onClose();
  };

  const header = useMemo(
    () => <h4 className={styles.title}>Configure Column Match</h4>,
    [],
  );
  const footer = (
    <>
      <Button variant="secondary" onClick={handleDelete}>
        Delete
      </Button>
      <Button onClick={handleApply}>Apply</Button>
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
          <FormField label="Metrics">
            <Select
              value={metrics}
              onChange={setMetrics}
              options={optionsMetrics}
            />
          </FormField>
          <FormField label="Column #1">
            <Select
              value={column1}
              onChange={setColumn1}
              options={optionsColumns}
            />
          </FormField>
          <FormField label="Column #2">
            <Select
              value={column2}
              onChange={setColumn2}
              options={optionsColumns}
            />
          </FormField>
          <FormField
            label="Minimum similarity"
            disabled={metrics === EqualityConfigMetrics.equality}
          >
            <NumberInput
              disabled={metrics === EqualityConfigMetrics.equality}
              value={minSimilarity ?? [0.7]}
              onChange={setMinSimilarity}
              slider
              boundaries={{
                defaultNum: 0.7,
                min: 0,
                max: 1,
                step: 0.01,
                digitsAfterDot: 2,
              }}
            />
          </FormField>
          <FormField
            label="Bound number limit"
            disabled={metrics === EqualityConfigMetrics.equality}
          >
            <NumberInput
              disabled={metrics === EqualityConfigMetrics.equality}
              value={boundLimit ?? [0]}
              onChange={setBoundLimit}
              boundaries={{
                defaultNum: 0,
                min: 0,
                step: 1,
                digitsAfterDot: 0,
              }}
            />
          </FormField>
        </WizardLayout>
      </ModalContainer>
    </>
  );
};
