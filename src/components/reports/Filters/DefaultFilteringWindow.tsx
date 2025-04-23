'use client';

import React, { FC, useState } from 'react';
import { MultiValue } from 'react-select';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { FormField, Select } from '@/components/common/uikit';
import { Option } from '@/components/common/uikit/Inputs';

type DefaultFilteringProps = ModalProps & {
  onApply: (newValue: MultiValue<string>) => void;
  filterColumns: MultiValue<string>;
};

const options: Option<string>[] = [
  { label: 'Arrival', value: 'Arrival' },
  { label: 'Departure', value: 'Departure' },
  { label: 'Duration', value: 'Duration' },
  { label: 'Distance', value: 'Distance' },
];

export const DefaultFilteringWindow: FC<DefaultFilteringProps> = ({
  isOpen = false,
  onClose,
  onApply,
  filterColumns,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<MultiValue<string>>(filterColumns);
  return (
    <PropertiesModal
      isOpen={isOpen}
      name="Filters"
      onClose={onClose}
      onApply={() => onApply(selectedOptions)}
    >
      <FormField label="By columns">
        <Select
          isMulti
          value={selectedOptions}
          onChange={setSelectedOptions}
          options={options}
        />
      </FormField>
    </PropertiesModal>
  );
};
