import classNames from 'classnames';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { ModalContainer } from '@/components/common/layout';
import { TagType } from '@/constants/primitivesInfo/primitivesTags';
import { Tag } from '../Tag';
import styles from './PrimitiveCard.module.scss';

interface PrimitiveCardProps extends PropsWithChildren {
  isSelected: boolean;
  label: string;
  tags: TagType[];
  description: ReactNode;
  onClick: () => void;
}

export const PrimitiveCard: FC<PrimitiveCardProps> = ({
  isSelected,
  label,
  tags,
  description,
  onClick,
}) => {
  const [isOpenDescription, setOpenDescription] = useState<boolean>(false);

  return (
    <>
      <div
        className={classNames(
          styles.cardContainer,
          isSelected && styles.selected,
        )}
        onClick={onClick}
      >
        <div className={styles.title}>{label}</div>
        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
        </div>
        <div>
          <div className={styles.description}>{description}</div>
          <button
            className={styles.buttonShow}
            onClick={() => setOpenDescription(true)}
          >
            Show more
          </button>
        </div>

        <div className={styles.flex}></div>
      </div>
      <ModalContainer
        isOpen={isOpenDescription}
        onClose={() => setOpenDescription(false)}
        title={label}
        className={styles.fullDescription}
      >
        {description}
      </ModalContainer>
    </>
  );
};
