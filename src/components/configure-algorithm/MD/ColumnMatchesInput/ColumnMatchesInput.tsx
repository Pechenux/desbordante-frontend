'use client';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from 'react';
import {
  EqualityConfigMetrics,
  SchemaHyMdConfig,
} from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { ColumnMatchesModal } from '../ColumnMatchesModal';
import styles from './ColumnMatchesInput.module.scss';

export type ColumnMatchType = SchemaHyMdConfig['column_matches'][0];
export type ColumnMatchesProps = {
  disabled: boolean;
  value: ColumnMatchType[];
  onChange: (newValue: ColumnMatchType[]) => void;
};

export const defaultColumnMatch = {
  metrics: EqualityConfigMetrics.equality,
  left_column: '',
  right_column: '',
  minimum_similarity: 0.7,
  bound_number_limit: 0,
};

export const ColumnMatchesInput: FC<ColumnMatchesProps> = ({
  disabled,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const [fileIDs] = useAtom<Record<string, string>>(fileIDsAtom);
  useEffect(() => {
    onChange([]);
  }, [fileIDs, disabled, onChange]);

  useEffect(() => {
    setInputValue(
      value && value.length > 0 && value[0]?.left_column
        ? `${value.length} column match(es)`
        : '',
    );
  }, [value]);

  const handleClose = () => {
    setIsOpen(false);
    onChange(value.filter((cm) => cm.left_column));
  };

  return (
    <>
      <ColumnMatchesModal
        value={value}
        onChange={onChange}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <label
        className={classNames(
          styles.inputContainer,
          disabled && styles.disabled,
        )}
        onClick={() => setIsOpen(!disabled)}
      >
        <input
          style={{ width: '100%' }}
          type="text"
          readOnly
          disabled={disabled}
          value={inputValue}
          placeholder="Select column matches..."
        />
        <Icon name="settings" color={colors.black[75]} />
      </label>
    </>
  );
};
