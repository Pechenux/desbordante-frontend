'use client';

import { ReactNode, useRef } from 'react';
import { PortalRootContext } from './PortalRootContext';
import styles from './PortalRoot.module.scss';

export const PortalRoot = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const portalRootRef = useRef<HTMLDivElement>(null);

  return (
    <PortalRootContext.Provider value={portalRootRef}>
      {children}
      <div ref={portalRootRef} className={styles.portalRoot} />
    </PortalRootContext.Provider>
  );
};
