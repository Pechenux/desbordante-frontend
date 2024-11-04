'use client';

import { useCallback, useState } from 'react';
import HomeBackground from '@/assets/backgrounds/home.svg?component';
import { ModalContainer } from '@/components/common/layout/ModalContainer';
import Button from '@/components/common/uikit/Button';
import styles from './home.module.scss';

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className={styles.root}>
      <HomeBackground
        className={styles.background}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
      <button onClick={handleOpen}>Click me!</button>
      <ModalContainer title="Hello!" isOpen={isOpen} onClose={handleClose}>
        <div>asd</div>
        <div>dsa</div>
        <Button>Click me too!</Button>
      </ModalContainer>
    </div>
  );
}
