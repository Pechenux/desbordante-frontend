import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { ModalContainer } from '@/components/common/layout';
import { Icon } from '@/components/common/uikit';
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
  const range = formatDistance(new Date(+file.createdAt), new Date(), {
    addSuffix: true,
  });
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
  choosedDataset: string;
  onClick: (selectedDataset: string) => void;
}

export const DatasetCard: FC<DatasetCardProps> = ({
  dataset,
  primitive,
  choosedDataset,
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
      isSelected={dataset.fileID === choosedDataset}
      onClick={isDisabled ? undefined : () => onClick(dataset.fileID)}
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
