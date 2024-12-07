import classNames from 'classnames';
import { useAtom } from 'jotai';
import { FC, PropsWithChildren, useState } from 'react';
import { ModalContainer } from '@/components/common/layout';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import primitiveInfo from '@/constants/primitivesInfo/primitivesInfo';
import { choosenPrimitiveAtom } from '@/store/taskCreationAtoms';
import Tag from '../Tag/Tag';
import styles from './PrimitiveCard.module.scss';

interface PrimitiveCardProps extends PropsWithChildren {
  primitive: PrimitiveType;
  //description1: string;
  //primitiveName: string;
  //tags1: string[];
}

const PrimitiveCard: FC<PrimitiveCardProps> = ({ primitive }) => {
  const [isOpenDescription, setOpenDescription] = useState<boolean>(false);
  const [choosenPrimitive, setChoosenPrimitive] =
    useAtom<PrimitiveType>(choosenPrimitiveAtom);

  const isSelected = primitive === choosenPrimitive;
  const { label, description, tags } = primitiveInfo[primitive] || {
    label: 'Loading',
    description: 'Loading',
    tags: ['Loading'],
  };

  return (
    <>
      <div
        className={classNames(
          styles.cardContainer,
          isSelected && styles.selected,
        )}
        onClick={() => setChoosenPrimitive(primitive)}
      >
        <div className={styles.title}>{label}</div>
        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
        </div>

        {/* <CollapsableView
          title="123"
          onClick={() => setOpenDescription(true)}
        ></CollapsableView> */}
        <div>
          <div className={styles.description}>{description}</div>
          <button className={styles.buttonShow}>Show more</button>
        </div>

        <div className={styles.flex}></div>
      </div>
      <ModalContainer
        isOpen={isOpenDescription}
        onClose={() => setOpenDescription(false)}
        title={label}
      >
        {description}
      </ModalContainer>
    </>
  );
};

export default PrimitiveCard;
