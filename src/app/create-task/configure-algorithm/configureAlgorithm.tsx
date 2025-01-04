'use client';

import { useAtom } from 'jotai';
import { memo, useCallback, useMemo, useState } from 'react';
import { ChooseDatasetModal } from '@/components/choose-file/ChooseDatasetModal';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { FormField } from '@/components/common/uikit/FormField/FormField';
import { CheckboxGroup, SelectDataset } from '@/components/common/uikit/Inputs';
import { Select, badgePrimary, Text } from '@/components/common/uikit/Inputs';
import { NumberInput } from '@/components/common/uikit/Inputs/NumberInput/NumberInput';
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

  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);

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
        <FormField label="normal" tooltip="test">
          <NumberInput value={[0]} onChange={() => {}} />
        </FormField>
        <FormField label="slider" tooltip="test">
          <NumberInput
            slider
            boundaries={{
              min: -1,
              max: 1,
              step: 1,
              includingMax: true,
              includingMin: true,
            }}
            value={[0]}
            onChange={() => {}}
          />
        </FormField>
        <FormField label="range" tooltip="test">
          <NumberInput value={[0, 0]} onChange={() => {}} />
        </FormField>
        <FormField label="range slider" tooltip="test">
          <NumberInput
            slider
            boundaries={{ min: -1, max: 1 }}
            value={[0, 0]}
            onChange={() => {}}
          />
        </FormField>
        <FormField label="error" tooltip="test">
          <NumberInput error value={[0]} onChange={() => {}} />
        </FormField>
        <FormField label="everything" tooltip="test">
          <NumberInput
            slider
            error
            boundaries={{ min: -1, max: 1 }}
            value={[0, 0]}
            onChange={() => {}}
          />
        </FormField>
        <FormField label="checkbox group">
          <CheckboxGroup
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
            ]}
            values={checkboxValue}
            onChange={setCheckboxValue}
          />
        </FormField>
        <FormField label="checkbox group">
          <CheckboxGroup
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
            ]}
            values={checkboxValue}
            onChange={setCheckboxValue}
            error
          />
        </FormField>
      </div>
    </WizardLayout>
  );
};

export default memo(ConfigurePrimitive);
