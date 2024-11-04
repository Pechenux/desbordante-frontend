'use client';

import { createContext, RefObject } from 'react';

export const ModalRootContext = createContext<RefObject<HTMLDivElement> | null>(
  null,
);
