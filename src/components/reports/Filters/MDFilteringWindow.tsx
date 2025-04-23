'use client';

import React, { FC, useState } from 'react';
import { MultiValue } from 'react-select';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { FormField, Select } from '@/components/common/uikit';
import { Option } from '@/components/common/uikit/Inputs';
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
};

const options: Option<string>[] = [
  { label: 'zoo', value: 'zoo' },
  { label: 'name', value: 'name' },
  { label: 'animal', value: 'animal' },
  { label: 'diet', value: 'siet' },
];

export const MDFilteringWindow: FC<MDFilteringProps> = ({
  isOpen = false,
  onClose,
  onApply,
  filterColumns,
  filterMetrics,
}) => {
  const [selectedColumns, setSelectedColumns] =
    useState<MultiValue<string>>(filterColumns);
  const [selectedMetrics, setSelectedMetrics] =
    useState<MultiValue<MetricsType>>(filterMetrics);

  return (
    <PropertiesModal
      isOpen={isOpen}
      name="Filters"
      onClose={onClose}
      onApply={() => onApply(selectedColumns, selectedMetrics)}
    >
      <FormField label="By columns">
        <Select
          isMulti
          value={selectedColumns}
          onChange={setSelectedColumns}
          options={options}
        />
      </FormField>
      <FormField label="By metrics">
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
