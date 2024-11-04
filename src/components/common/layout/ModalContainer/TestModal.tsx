import { FC, useState } from 'react';
import Button from '@/components/common/uikit/Button';
import ModalContainer from './ModalContainer';

export const TestModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>Outside</div>
      <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)}>
        Test Button
      </Button>
      <ModalContainer isOpen={isOpen} onClose={onClose}>
        Test Modal
      </ModalContainer>
    </>
  );
};
