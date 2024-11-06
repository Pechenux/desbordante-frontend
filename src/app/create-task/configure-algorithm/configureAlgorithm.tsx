'use client';

import { memo, useState } from 'react';
import ChooseFileModal from '@/components/choose-file/ChooseFileModal';
import WizardLayout from '@/components/common/layout/WizardLayout';
import { Icon } from '@/components/common/uikit';
import Button from '@/components/common/uikit/Button';
import { File } from '@/components/common/uikit/Inputs';
import styles from './configureAlgorithm.module.scss';

const ChoosePrimitive = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const handleFileClick = () => {
    setIsOpen(true);
  };

  const header = (
    <>
      <h2 className={styles.title}>Configure Algorithm</h2>
      <h6 className={styles.description}>Select algorithm parameters</h6>
    </>
  );
  const footer = (
    <>
      <Button
        disabled={false}
        variant="primary"
        icon={<Icon name="idea" />}
        onClick={() => null}
      >
        Analyze
      </Button>
    </>
  );

  return (
    <WizardLayout header={header} footer={footer}>
      <div className={styles.container}>
        <File
          placeholder="Choose file..."
          label="File"
          tooltip="tooltip"
          onClick={handleFileClick}
          readOnly
        />
        <ChooseFileModal isOpen={isOpen} onClose={onClose} />
      </div>
    </WizardLayout>
  );
};

export default memo(ChoosePrimitive);
