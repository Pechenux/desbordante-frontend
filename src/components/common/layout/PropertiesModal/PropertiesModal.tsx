import { FC } from 'react';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { Button } from '@/components/common/uikit/Button';
import { WithChildren } from '@/types/withChildren';
import styles from './PropertiesModal.module.scss';

type Props = ModalProps &
  WithChildren & {
    name: string;
    onApply: () => void;
  };

const PropertiesModal: FC<Props> = ({
  isOpen,
  name,
  onClose,
  onApply,
  children,
}) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <h4 className={styles.title}>{name}</h4>
      <div className={styles.inputs}>{children}</div>
      <div className={styles.buttons}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onApply}>Apply</Button>
      </div>
    </ModalContainer>
  );
};

export default PropertiesModal;
