import { FC, useCallback, useMemo } from 'react';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { FormField, Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { Select, SelectOption } from '@/components/common/uikit/Inputs';
import styles from './FileConfigModal.module.scss';

export type Separators = ',' | '|' | ';';

const separatorOptions: SelectOption<Separators>[] = [
  { label: 'Comma ","', value: ',' },
  { label: 'Pipe "|"', value: '|' },
  { label: 'Semicolon ";"', value: ';' },
];

export type FileConfigModalProps = ModalProps & {
  value: Separators;
  onChange: (newValue: Separators) => void;
  onSubmit: () => void;
};

export const FileConfigModal: FC<FileConfigModalProps> = ({
  value,
  onChange,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const header = useMemo(
    () => (
      <>
        <h4 className={styles.title}>File Properties</h4>
      </>
    ),
    [],
  );
  const footer = useMemo(
    () => (
      <div className={styles.footer}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={false}
          variant="primary"
          icon={<Icon name="file" />}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
    ),
    [onClose, onSubmit],
  );

  const handleChange = useCallback(
    (newValue: Separators | null) => {
      if (!newValue) return;

      onChange(newValue);
    },
    [onChange],
  );

  return (
    <>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        className={styles.modal}
      >
        <div className={styles.container}>
          {header}
          <div className={styles.input}>
            <FormField label="Separator">
              <Select
                value={value}
                onChange={handleChange}
                options={separatorOptions}
              />
            </FormField>
          </div>
          {footer}
        </div>
      </ModalContainer>
    </>
  );
};
