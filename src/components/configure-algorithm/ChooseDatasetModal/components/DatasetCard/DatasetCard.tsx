import classNames from 'classnames';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { ModalContainer } from '@/components/common/layout';
import { ChoosedDatasetInfo, Icon } from '@/components/common/uikit';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import styles from './DatasetCard.module.scss';

interface BaseCardProps extends PropsWithChildren {
  isSelected?: boolean;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export type Dataset = {
  fileID: string;
  originalFileName: string;
  rowsCount: number;
  countOfColumns?: number;
  createdAt: string;
  numberOfUses: number;
  isBuiltIn: boolean;
  supportedPrimitives: PrimitiveType[];
};

const getFileDescription = (file: Dataset) => {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  const rowsCount = formatter.format(file.rowsCount);
  const countOfColumns = formatter.format(file.countOfColumns || 0);
  const range = file.createdAt;
  const usedTimes = file.numberOfUses;
  return [
    `${rowsCount} rows, ${countOfColumns} columns`,
    file.isBuiltIn ? `Used ${usedTimes} times` : `Uploaded ${range}`,
  ];
};

const BaseCard: FC<BaseCardProps> = ({
  children,
  isSelected = false,
  isDisabled = false,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        styles.card,
        isSelected && styles.selected,
        isDisabled && styles.disabled,
      )}
      title={
        isDisabled
          ? 'This file is not supported by selected feature'
          : undefined
      }
      {...rest}
    >
      {children}
    </div>
  );
};

interface DatasetCardProps {
  dataset: Dataset;
  primitive: PrimitiveType; // TODO: remove
  isSelected: boolean;
  onClick: (selectedDataset: ChoosedDatasetInfo) => void;
}

export const DatasetCard: FC<DatasetCardProps> = ({
  dataset,
  primitive,
  isSelected,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const descriptionList = getFileDescription(dataset);
  const fileName = dataset.originalFileName;
  const isDisabled =
    !primitive || !dataset.supportedPrimitives.includes(primitive);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BaseCard
      isSelected={isSelected}
      onClick={
        isDisabled
          ? undefined
          : () =>
              onClick({
                fileId: dataset.fileID,
                name: dataset.originalFileName,
              })
      }
      isDisabled={isDisabled}
    >
      <div className={styles.cardTitle}>
        <p title={fileName}>{fileName}</p>
        <Icon name="threeDots" size={20} onClick={handleOpen} />

        <ModalContainer
          title={dataset.fileID}
          isOpen={isOpen}
          onClose={handleClose}
        >
          <div>{JSON.stringify(dataset.fileID)}</div>
          <div>{JSON.stringify(dataset)}</div>
        </ModalContainer>
      </div>
      <div className={styles.cardDescription}>
        <span>{descriptionList.join('\n')}</span>
      </div>
    </BaseCard>
  );
};
