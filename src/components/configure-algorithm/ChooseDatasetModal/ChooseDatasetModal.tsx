import { FC, useMemo } from 'react';
import { Collapse } from '@/components/common/layout/Collapse';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { MainPrimitives } from '@/constants/primitivesInfo/primitives';
import { Dataset, DatasetCard } from './components/DatasetCard';
import { DatasetUploader } from './components/DatasetUploader';
import styles from './ChooseDatasetModal.module.scss';

// заглушка
const builtinDatasets: { dataset: Dataset; primitive: MainPrimitives }[] = [];
// заглушка
const userDatasets: { dataset: Dataset; primitive: MainPrimitives }[] = [];

export type ChooseDatasetModalProps = ModalProps & {
  value: string;
  onClick: (newValue: string) => void;
};

export const ChooseDatasetModal: FC<ChooseDatasetModalProps> = ({
  value,
  onClick,
  isOpen,
  onClose,
}) => {
  const header = useMemo(
    () => (
      <>
        <h2 className={styles.title}>Choose a File</h2>
        <h6 tabIndex={1} className={styles.description}>
          We have prepared some datasets for you
        </h6>
      </>
    ),
    [],
  );
  const footer = useMemo(
    () => (
      <Button
        disabled={false}
        variant="primary"
        icon={<Icon name="file" />}
        onClick={onClose}
      >
        Confirm
      </Button>
    ),
    [onClose],
  );

  const builtinFiles = (
    <Collapse title="Built-in Datasets">
      <div className={styles.files}>
        {builtinDatasets.map((dts) => (
          <DatasetCard
            key={dts.dataset.fileID}
            dataset={dts.dataset}
            primitive={dts.primitive}
            choosedDataset={value}
            onClick={onClick}
          />
        ))}
      </div>
    </Collapse>
  );
  const userFiles = (
    <Collapse title="My Files">
      <div className={styles.files}>
        <DatasetUploader onUpload={onClick} />
        {userDatasets.map((dts) => (
          <DatasetCard
            key={dts.dataset.fileID}
            dataset={dts.dataset}
            primitive={dts.primitive}
            choosedDataset={value}
            onClick={onClick}
          />
        ))}
      </div>
    </Collapse>
  );
  return (
    <>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        className={styles.modal}
      >
        <WizardLayout
          header={header}
          footer={footer}
          hasBackground={false}
          className={styles.content}
        >
          {builtinFiles}
          {userFiles}
        </WizardLayout>
      </ModalContainer>
    </>
  );
};
