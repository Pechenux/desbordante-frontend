'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { ChooseDatasetModal } from '../ChooseDatasetModal';
import styles from './SelectDataset.module.scss';

type SelectDatasetProps = {
  onChange: (newValue: string) => void;
};

export type ChoosedDatasetInfo = {
  fileId: string;
  name: string;
};

export const SelectDataset = ({ onChange }: SelectDatasetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [choosedDataset, setChoosedDataset] =
    useState<ChoosedDatasetInfo | null>(null);

  const handleApplyDataset = (selectedDataset: ChoosedDatasetInfo | null) => {
    setChoosedDataset(selectedDataset);
    onChange(selectedDataset?.fileId ?? '');
    setIsOpen(false);
  };

  return (
    <>
      <ChooseDatasetModal
        choosedDataset={choosedDataset}
        onApply={handleApplyDataset}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <label className={styles.inputContainer} onClick={() => setIsOpen(true)}>
        <input
          style={{ width: '100%' }}
          type="text"
          readOnly
          value={choosedDataset ? choosedDataset.name : ''}
          placeholder="Choose file..."
        />
        <Icon name="file" color={colors.black[75]} />
      </label>
    </>
  );
};
