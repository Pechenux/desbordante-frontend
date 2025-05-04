'use client';

import React, { FC, useState } from 'react';
import { MultiValue } from 'react-select';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { FormField, Select } from '@/components/common/uikit';
import { Option } from '@/components/common/uikit/Inputs';

type DefaultFilteringProps = ModalProps & {
  onApply: (newValue: MultiValue<string>) => void;
  filterColumns: MultiValue<string>;
  tableHeader: string[];
};

export const DefaultFilteringWindow: FC<DefaultFilteringProps> = ({
  isOpen = false,
  onClose,
  onApply,
  filterColumns,
  tableHeader,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<MultiValue<string>>(filterColumns);

  const options: Option<string>[] = tableHeader.map((column) => ({
    label: column,
    value: column,
  }));

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
