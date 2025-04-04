'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { ChooseDatasetModal } from '../ChooseDatasetModal';
import styles from './SelectDataset.module.scss';

type SelectDatasetProps = {
  value: string;
  displayValue: string;
  onChange: (newValue: string) => void;
};

export const SelectDataset = ({
  value,
  displayValue,
  onChange,
}: SelectDatasetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChooseDatasetModal
        value={value}
        onClick={onChange}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <label className={styles.inputContainer} onClick={() => setIsOpen(true)}>
        <input
          style={{ width: '100%' }}
          type="text"
          readOnly
          value={displayValue}
          placeholder="Choose file..."
        />
        <Icon name="file" color={colors.black[75]} />
      </label>
    </>
  );
};
