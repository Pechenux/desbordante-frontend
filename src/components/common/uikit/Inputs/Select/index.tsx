import dynamic from 'next/dynamic';
import { Text } from '@/components/common/uikit/Inputs/Text';
import type { SelectComponentType } from './Select';

export const Select = dynamic(
  async () => (await import('./Select')).SelectComponent,
  {
    loading: () => <Text placeholder="Loading..." disabled />,
    ssr: false,
  },
) as SelectComponentType;

export type { SelectOption } from './Select';
