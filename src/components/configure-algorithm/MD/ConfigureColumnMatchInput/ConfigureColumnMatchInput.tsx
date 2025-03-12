'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { columnMatchType } from '@/store/MDColumnMatchesAtoms';
import { ConfigureColumnMatchModal } from '../ConfigureColumnMatchModal';
import styles from './ConfigureColumnMatchInput.module.scss';

type SelectDatasetProps = {
  value: columnMatchType;
};

export const ConfigureColumnMatchInput = ({ value }: SelectDatasetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(
      value.metrics !== '' && value.column1 !== '' && value.column2 !== ''
        ? `${value.metrics} ( ${value.column1}, ${value.column2} )`
        : '',
    );
  }, [value]);

  return (
    <>
      <ConfigureColumnMatchModal
        value={value}
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
