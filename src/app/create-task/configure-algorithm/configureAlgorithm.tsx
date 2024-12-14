'use client';

import { useAtom } from 'jotai';
import { memo, useCallback, useMemo, useState } from 'react';
import { ChooseDatasetModal } from '@/components/choose-file/ChooseDatasetModal';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { FormField } from '@/components/common/uikit/FormField/FormField';
import { SelectDataset } from '@/components/common/uikit/Inputs';
import { Select, badgePrimary, Text } from '@/components/common/uikit/Inputs';
import { choosenFileAtom, choosenFileType } from '@/store/taskCreationAtoms';
import styles from './configureAlgorithm.module.scss';

const ConfigurePrimitive = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [choosenFile] = useAtom<choosenFileType>(choosenFileAtom);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleFileClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const header = useMemo(
    () => (
      <>
        <h2 className={styles.title}>Configure Algorithm</h2>
        <h6 className={styles.description}>Select algorithm parameters</h6>
      </>
    ),
    [],
  );
  const footer = useMemo(
    () => (
      <Button
        disabled={false}
        variant="primary"
        icon={<Icon name="idea" />}
        onClick={() => null}
      >
        Analyze
      </Button>
    ),
    [],
  );

  const test = useMemo(
    () =>
      Array(30)
        .fill(1)
        .map((_, i) => ({
          label: `${i} ${'asd'.repeat(i)}`,
          value: `${i}`,
          badges: [{ label: 'dsadsa', style: badgePrimary }],
        })),
    [],
  );

  return (
    <WizardLayout header={header} footer={footer}>
      <div className={styles.container}>
        <SelectDataset
          placeholder="Choose file..."
          label="File"
          tooltip="tooltip"
          onClick={handleFileClick}
          readOnly
          value={choosenFile.label}
        />
        <ChooseDatasetModal isOpen={isOpen} onClose={handleClose} />
        <FormField label="adsasd" tooltip="dsadas" error="qweqwe">
          <Select
            onChange={(newValue) => console.log(newValue)}
            options={[
              {
                label: 'asdasd',
                value: 'asdasd',
                badges: [{ label: 'asdasd' }],
              },
            ]}
          />
        </FormField>
        <FormField label="adsasd" tooltip="dsadas" error="qweqwe">
          <Select options={test} isMulti error />
        </FormField>
        <FormField label="adsasd" tooltip="dsadas" error="qweqwe">
          <Text error />
        </FormField>
      </div>
    </WizardLayout>
  );
};

export default memo(ConfigurePrimitive);
