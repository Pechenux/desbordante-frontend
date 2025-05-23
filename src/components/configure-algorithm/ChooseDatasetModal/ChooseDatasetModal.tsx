import { useQuery } from '@tanstack/react-query';
import { FC, useMemo } from 'react';
import { createQueryFn } from '@/api/services/server';
import { Collapse } from '@/components/common/layout/Collapse';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { ChoosedDatasetInfo, Icon } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { DatasetCard } from './components/DatasetCard';
import { DatasetUploader } from './components/DatasetUploader';
import styles from './ChooseDatasetModal.module.scss';

export type ChooseDatasetModalProps = ModalProps & {
  choosedDataset: ChoosedDatasetInfo | null;
  onClick: (newValue: ChoosedDatasetInfo) => void;
  onApply: () => void;
  onCancel: () => void;
};

export const ChooseDatasetModal: FC<ChooseDatasetModalProps> = ({
  choosedDataset,
  onClick,
  onCancel,
  isOpen,
  onClose,
  onApply,
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
      <>
        <Button
          disabled={false}
          variant="secondary"
          icon={<Icon name="cross" />}
          onClick={onCancel}
        >
          Unselect
        </Button>
        <Button
          disabled={false}
          variant="primary"
          icon={<Icon name="file" />}
          onClick={onApply}
        >
          Confirm
        </Button>
      </>
    ),
    [onCancel, onApply],
  );

  const { data } = useQuery({
    queryKey: [`/api/files`],
    queryFn: createQueryFn('/api/files', {
      params: {
        query: {
          with_public: true,
        },
      },
    }),
    enabled: true,
  });

  // TODO: FIX [заглушка]
  const builtinFiles = (
    <Collapse title="Built-in Datasets">
      <div className={styles.files}>
        {data?.map(
          (dts) =>
            !dts.owner_id && (
              <DatasetCard
                key={dts.id}
                dataset={{
                  fileID: dts.id,
                  originalFileName: dts.name,
                  rowsCount: 10,
                  createdAt: '11.11.2011',
                  numberOfUses: 1,
                  isBuiltIn: true,
                  supportedPrimitives: [PrimitiveType.NAR],
                }}
                primitive={PrimitiveType.NAR}
                isSelected={choosedDataset?.fileId === dts.id}
                onClick={onClick}
              />
            ),
        )}
      </div>
    </Collapse>
  );
  const userFiles = (
    <Collapse title="My Files">
      <div className={styles.files}>
        <DatasetUploader onUpload={onClick} />
        {data?.map(
          (dts) =>
            dts.owner_id && (
              <DatasetCard
                key={dts.id}
                dataset={{
                  fileID: dts.id,
                  originalFileName: dts.name,
                  rowsCount: 10,
                  createdAt: '11.11.2011',
                  numberOfUses: 1,
                  isBuiltIn: false,
                  supportedPrimitives: [PrimitiveType.NAR],
                }}
                primitive={PrimitiveType.NAR}
                isSelected={choosedDataset?.fileId === dts.id}
                onClick={onClick}
              />
            ),
        )}
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
