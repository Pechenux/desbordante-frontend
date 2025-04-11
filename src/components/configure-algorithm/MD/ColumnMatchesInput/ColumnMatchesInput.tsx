'use client';

import { FC, useEffect, useState } from 'react';
import {
  EqualityConfigMetrics,
  SchemaHyMdConfig,
} from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { ColumnMatchesModal } from '../ColumnMatchesModal';
import styles from './ColumnMatchesInput.module.scss';

export type ColumnMatchType = SchemaHyMdConfig['column_matches'][0];
export type ColumnMatchesProps = {
  value: ColumnMatchType[];
  onChange: (newValue: ColumnMatchType[]) => void;
};

export const ColumnMatchesInput: FC<ColumnMatchesProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(
      value && value.length > 0 && value[0]?.metrics
        ? `${value.length} column match(es)`
        : '',
    );
  }, [value]);

  const handleClose = () => {
    setIsOpen(false);
    onChange(value.filter((cm) => cm.left_column));
  };

  const defaultColumnMatch = {
    metrics: EqualityConfigMetrics.equality,
    left_column: '',
    right_column: '',
    minimum_similarity: 0.7,
    bound_number_limit: 0,
  };

  const isDisabledAdding = value && !value[value.length - 1]?.left_column;
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

  return (
    <>
      <ColumnMatchesModal
        value={value}
        isDisabledAdding={isDisabledAdding}
        onAddingColumnMatch={handleAddColumnMatch}
        onDelete={handleDelete}
        onChange={onChange}
        onApply={handleApplyChanges}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <label className={styles.inputContainer} onClick={() => setIsOpen(true)}>
        <input
          style={{ width: '100%' }}
          type="text"
          readOnly
          value={inputValue}
          placeholder="Select column matches..."
        />
        <Icon name="settings" color={colors.black[75]} />
      </label>
    </>
  );
};
