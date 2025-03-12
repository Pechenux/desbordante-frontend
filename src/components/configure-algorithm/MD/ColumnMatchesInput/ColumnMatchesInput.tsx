'use client';

import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import {
  columnMatchType,
  selectedColumnMatchesAtom,
} from '@/store/MDColumnMatchesAtoms';
import { ColumnMatchesModal } from '../ColumnMatchesModal';
import styles from './ColumnMatchesInput.module.scss';

export const ColumnMatchesInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [columnMatches, setColumnMatches] = useAtom<columnMatchType[]>(
    selectedColumnMatchesAtom,
  );
  useEffect(() => {
    setInputValue(
      columnMatches.length > 0
        ? `${columnMatches.length} column match(es)`
        : '',
    );
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    console.log('ToDO');
    setColumnMatches(columnMatches.filter((cm) => cm.metrics !== ''));
  };

  return (
    <>
      <ColumnMatchesModal isOpen={isOpen} onClose={handleClose} />
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
