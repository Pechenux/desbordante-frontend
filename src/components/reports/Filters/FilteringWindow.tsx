import React, { FC } from 'react';
import { PropertiesModal } from '@/components/common/layout';
import { WithChildren } from '@/types/withChildren';

type FilteringProps = WithChildren & {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
};

export const FilteringWindow: FC<FilteringProps> = ({
  isOpen,
  onClose,
  onApply,
  children,
}) => {
  return (
    <PropertiesModal
      isOpen={isOpen}
      name="Filters"
      onClose={onClose}
      onApply={onApply}
    >
      Checkbox
      {children}
    </PropertiesModal>
  );
};
