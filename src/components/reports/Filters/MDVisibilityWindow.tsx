'use client';

import React, { FC, useState } from 'react';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { CheckboxGroup, FormField } from '@/components/common/uikit';

type FilteringProps = ModalProps & {
  onApply: (newValue: boolean) => void;
  curIsShow: boolean;
};

export const MDVisibilityWindow: FC<FilteringProps> = ({
  isOpen,
  onClose,
  onApply,
  curIsShow,
}) => {
  const [checkboxValue, setCheckboxValue] = useState<boolean>(curIsShow);

  return (
    <PropertiesModal
      isOpen={isOpen}
      name="Visibility"
      onClose={onClose}
      onApply={() => onApply(checkboxValue)}
    >
      <FormField>
        <CheckboxGroup
          values={checkboxValue ? ['isShown'] : []}
          onChange={(newValue) => setCheckboxValue(newValue.length > 0)}
          options={[{ label: 'Show zero boundaris in LHS', value: 'isShown' }]}
        />
      </FormField>
    </PropertiesModal>
  );
};
