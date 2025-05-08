'use client';

import React, { FC, useState } from 'react';
import { MultiValue } from 'react-select';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { FormField, Select } from '@/components/common/uikit';
import { SelectOption } from '@/components/common/uikit/Inputs';
import {
  MetricsType,
  optionsMetrics,
} from '@/components/configure-algorithm/MD/ConfigureColumnMatchModal';

type MDFilteringProps = ModalProps & {
  filterColumns: MultiValue<string>;
  filterMetrics: MultiValue<MetricsType>;
  onApply: (
    newColumns: MultiValue<string>,
    newMetrics: MultiValue<MetricsType>,
  ) => void;
  tableHeader: string[];
};

export const MDFilteringWindow: FC<MDFilteringProps> = ({
  isOpen = false,
  onClose,
  onApply,
  filterColumns,
  filterMetrics,
  tableHeader,
}) => {
  const [selectedColumns, setSelectedColumns] =
    useState<MultiValue<string>>(filterColumns);
  const [selectedMetrics, setSelectedMetrics] =
    useState<MultiValue<MetricsType>>(filterMetrics);

  const options: SelectOption<string>[] = tableHeader.map((column) => ({
    label: column,
    value: column,
  }));

  return (
    <PropertiesModal
      isOpen={isOpen}
      name="Filters"
      onClose={onClose}
      onApply={() => onApply(selectedColumns, selectedMetrics)}
    >
      <FormField label="By RHS columns">
        <Select
          isMulti
          value={selectedColumns}
          onChange={setSelectedColumns}
          options={options}
        />
      </FormField>
      <FormField label="By RHS metrics">
        <Select
          isMulti
          value={selectedMetrics}
          onChange={setSelectedMetrics}
          options={optionsMetrics}
        />
      </FormField>
    </PropertiesModal>
  );
};
