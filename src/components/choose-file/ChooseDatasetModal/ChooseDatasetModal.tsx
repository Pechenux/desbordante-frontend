import { FC, useMemo } from 'react';
import { Collapse } from '@/components/common/layout/Collapse';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { DatasetCard } from '../DatasetCard';
import styles from './ChooseDatasetModal.module.scss';

// заглушка
const builtinDatasets = [
  {
    dataset: {
      fileID: '1',
      originalFileName: 'asd',
      rowsCount: 0,
      createdAt: '0',
      numberOfUses: 0,
      isBuiltIn: true,
      supportedPrimitives: [PrimitiveType.FD],
    },
    primitive: PrimitiveType.FD,
  },
  {
    dataset: {
      fileID: '2',
      originalFileName: 'asd',
      rowsCount: 0,
      createdAt: '0',
      numberOfUses: 0,
      isBuiltIn: true,
      supportedPrimitives: [PrimitiveType.FD],
    },
    primitive: PrimitiveType.FD,
  },
  {
    dataset: {
      fileID: '13',
      originalFileName: 'asd',
      rowsCount: 0,
      createdAt: '0',
      numberOfUses: 0,
      isBuiltIn: true,
      supportedPrimitives: [PrimitiveType.FD],
    },
    primitive: PrimitiveType.FD,
  },
  {
    dataset: {
      fileID: '14',
      originalFileName: 'asd',
      rowsCount: 0,
      createdAt: '0',
      numberOfUses: 0,
      isBuiltIn: true,
      supportedPrimitives: [PrimitiveType.FD],
    },
    primitive: PrimitiveType.FD,
  },
  {
    dataset: {
      fileID: '16',
      originalFileName: 'asd',
      rowsCount: 0,
      createdAt: '0',
      numberOfUses: 0,
      isBuiltIn: true,
      supportedPrimitives: [PrimitiveType.FD],
    },
    primitive: PrimitiveType.FD,
  },
  {
    dataset: {
      fileID: '17',
      originalFileName: 'asd',
      rowsCount: 0,
      createdAt: '0',
      numberOfUses: 0,
      isBuiltIn: true,
      supportedPrimitives: [PrimitiveType.FD],
    },
    primitive: PrimitiveType.FD,
  },
];
// заглушка
const userDatasets = [
  {
    dataset: {
      fileID: '10',
      originalFileName: 'afd',
      rowsCount: 0,
      createdAt: '0',
      numberOfUses: 0,
      isBuiltIn: true,
      supportedPrimitives: [PrimitiveType.FD],
    },
    primitive: PrimitiveType.FD,
  },
];

export const ChooseDatasetModal: FC<ModalProps> = ({ isOpen, onClose }) => {
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
    [],
  );

  const builtinFiles = (
    <Collapse title="Built-in Datasets">
      <div className={styles.files}>
        {builtinDatasets.map((dts) => (
          <DatasetCard
            key={dts.dataset.fileID}
            dataset={dts.dataset}
            primitive={dts.primitive}
          />
        ))}
      </div>
    </Collapse>
  );
  const userFiles = (
    <Collapse title="My Files">
      <div className={styles.files}>
        {userDatasets.map((dts) => (
          <DatasetCard
            key={dts.dataset.fileID}
            dataset={dts.dataset}
            primitive={dts.primitive}
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
