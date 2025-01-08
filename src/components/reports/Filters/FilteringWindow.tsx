import React, { Dispatch, FC, SetStateAction } from 'react';
import { PropertiesModal } from '@/components/common/layout';

type FilteringProps = {
  isFilteringShown: boolean;
  setIsFilteringShown: Dispatch<SetStateAction<boolean>>;
};

export const FilteringWindow: FC<FilteringProps> = ({
  isFilteringShown,
  setIsFilteringShown,
}) => {
  return (
    <PropertiesModal
      isOpen={isFilteringShown}
      name="Filters"
      onClose={() => {
        setIsFilteringShown(false);
      }}
      onApply={() => {
        setIsFilteringShown(false);
      }}
    >
      Checkbox
    </PropertiesModal>
  );
};

export default FilteringWindow;
