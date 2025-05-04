import dynamic from 'next/dynamic';
import { Text } from '@/components/common/uikit/Inputs/Text';
import { SelectComponentType } from './Select';

export const Select = dynamic(
  () =>
    import('./Select').then(
      (module) =>
        (module as { SelectComponent: SelectComponentType }).SelectComponent,
    ),
  {
    loading: () => <Text placeholder="Loading..." disabled />,
    ssr: false,
  },
);

export type { SelectOption } from './Select';
