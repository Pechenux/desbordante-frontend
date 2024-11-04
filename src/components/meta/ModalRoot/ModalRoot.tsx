'use client';

import { ReactNode, useRef } from 'react';
import { ModalRootContext } from './ModalRootContext';
import styles from './ModalRoot.module.scss';

export const ModalRoot = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const modalRootRef = useRef<HTMLDivElement>(null);

  return (
    <ModalRootContext.Provider value={modalRootRef}>
      {children}
      <div ref={modalRootRef} className={styles.modalRoot} />
    </ModalRootContext.Provider>
  );
};
