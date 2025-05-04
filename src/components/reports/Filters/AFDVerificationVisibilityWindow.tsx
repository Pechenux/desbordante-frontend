'use client';

import React, { FC, useState } from 'react';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { CheckboxGroup, FormField } from '@/components/common/uikit';

type FilteringProps = ModalProps & {
  onApply: (newValue: boolean) => void;
  curIsShowOnly: boolean;
};

export const AFDVerificationVisibilityWindow: FC<FilteringProps> = ({
  isOpen,
  onClose,
  onApply,
  curIsShowOnly,
}) => {
  const [checkboxValue, setCheckboxValue] = useState<boolean>(curIsShowOnly);

  return (
    <PropertiesModal
      isOpen={isOpen}
      name="Filters"
      onClose={onClose}
      onApply={() => onApply(checkboxValue)}
    >
      <FormField>
        <CheckboxGroup
          values={checkboxValue ? ['isShown'] : []}
          onChange={(newValue) => setCheckboxValue(newValue.length > 0)}
          options={[{ label: 'Show LHS and RHS only', value: 'isShown' }]}
        />
      </FormField>
    </PropertiesModal>
  );
};
