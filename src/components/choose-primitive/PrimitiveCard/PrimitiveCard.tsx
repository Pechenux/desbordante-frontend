import classNames from 'classnames';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import CollapsableView from '@/components/choose-primitive/CollapsableView';
import { ModalContainer } from '@/components/common/layout';
import Tag from '../Tag/Tag';
import styles from './PrimitiveCard.module.scss';

interface PrimitiveCardProps extends PropsWithChildren {
  isSelected?: boolean;
  primitiveName: string;
  description: ReactNode;
  tags: string[];
}

const PrimitiveCard: FC<PrimitiveCardProps> = ({
  isSelected,
  primitiveName,
  description,
  tags,
}) => {
  const [isOpenDescription, setOpenDescription] = useState<boolean>(false);

  return (
    <>
      <div
        className={classNames(
          styles.cardContainer,
          isSelected && styles.selected,
        )}
      >
        <div className={styles.title}>{primitiveName}</div>
        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
        </div>

        <CollapsableView title="123" onClick={() => setOpenDescription(true)}>
          {description}
        </CollapsableView>
        <div className={styles.description}></div>
      </div>
      <ModalContainer
        isOpen={isOpenDescription}
        onClose={() => setOpenDescription(false)}
        title={primitiveName}
      >
        {description}
      </ModalContainer>
    </>
  );
};

export default PrimitiveCard;
