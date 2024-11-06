'use client';

import { createContext, RefObject } from 'react';

export const PortalRootContext =
  createContext<RefObject<HTMLDivElement> | null>(null);
