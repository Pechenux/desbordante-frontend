'use client';

import { FC, useEffect, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import {
  ConfigureColumnMatchesProps,
  ConfigureColumnMatchModal,
  displayedMetricsName,
} from '../ConfigureColumnMatchModal';
import styles from './ConfigureColumnMatchInput.module.scss';

type ConfigureColumnMatchInputProps = ConfigureColumnMatchesProps;

export const ConfigureColumnMatchInput: FC<ConfigureColumnMatchInputProps> = ({
  columnMatch,
  onDelete,
  onApply,
}) => {
  const [isOpen, setIsOpen] = useState(!columnMatch);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(
      columnMatch.metrics && columnMatch.left_column && columnMatch.right_column
        ? `${displayedMetricsName[columnMatch.metrics]} ( ${columnMatch.left_column}, ${columnMatch.right_column} )`
        : '',
    );
  }, [columnMatch]);

  return (
    <>
      <ConfigureColumnMatchModal
        onDelete={onDelete}
        onApply={onApply}
        columnMatch={columnMatch}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <label className={styles.inputContainer} onClick={() => setIsOpen(true)}>
        <input
          style={{ width: '100%' }}
          type="text"
          readOnly
          value={inputValue}
          placeholder="Configure column match..."
        />
        <Icon name="settings" color={colors.black[75]} />
      </label>
    </>
  );
};
