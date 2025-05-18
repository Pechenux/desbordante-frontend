import { useQuery } from '@tanstack/react-query';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { createQueryFn } from '@/api/services/server';
import { useUser } from '@/api/services/server/hooks';
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
  onApply: (selectedDataset: ChoosedDatasetInfo | null) => void;
};

export const ChooseDatasetModal: FC<ChooseDatasetModalProps> = ({
  choosedDataset,
  isOpen,
  onClose,
  onApply,
}) => {
  const user = useUser();
  const [currentDataset, setCurrentDataset] =
    useState<ChoosedDatasetInfo | null>(choosedDataset);
  useEffect(() => {
    setCurrentDataset(choosedDataset);
  }, [choosedDataset]);

  const handleApply = useCallback(() => {
    onApply(currentDataset);
    onClose();
  }, [currentDataset, onApply, onClose]);

  const handleUnselect = useCallback(() => {
    setCurrentDataset(null);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setCurrentDataset(choosedDataset);
  }, [choosedDataset, onClose]);

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
          onClick={handleUnselect}
        >
          Unselect
        </Button>
        <Button
          disabled={false}
          variant="primary"
          icon={<Icon name="file" />}
          onClick={handleApply}
        >
          Confirm
        </Button>
      </>
    ),
    [handleUnselect, handleApply],
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
                isSelected={currentDataset?.fileId === dts.id}
                onClick={setCurrentDataset}
              />
            ),
        )}
      </div>
    </Collapse>
  );
  const userFiles = user ? (
    <Collapse title="My Files">
      <div className={styles.files}>
        <DatasetUploader onUpload={setCurrentDataset} />
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
                isSelected={currentDataset?.fileId === dts.id}
                onClick={setCurrentDataset}
              />
            ),
        )}
      </div>
    </Collapse>
  ) : null;
  return (
    <>
      <ModalContainer
        isOpen={isOpen}
        onClose={handleClose}
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
