'use client';

import { ReactNode, useRef } from 'react';
import { PortalRootContext } from './PortalRootContext';
import styles from './PortalRoot.module.scss';

export const ModalRoot = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const modalRootRef = useRef<HTMLDivElement>(null);

  return (
    <PortalRootContext.Provider value={modalRootRef}>
      {children}
      <div ref={modalRootRef} className={styles.modalRoot} />
    </PortalRootContext.Provider>
  );
};
