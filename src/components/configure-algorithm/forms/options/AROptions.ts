import { AprioriConfigInput_format } from '@/api/generated/old_schema';
import { SelectOption } from '@/components/common/uikit';

export const ARInputFormatOptions: SelectOption<AprioriConfigInput_format>[] = [
  {
    label: 'Tabular',
    value: AprioriConfigInput_format.tabular,
  },
  {
    label: 'Singular',
    value: AprioriConfigInput_format.singular,
  },
];
