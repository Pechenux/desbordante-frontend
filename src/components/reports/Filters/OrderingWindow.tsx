import _ from 'lodash';
import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import { PropertiesModal } from '@/components/common/layout';
import { Select } from '@/components/common/uikit/Inputs';
import { PortalRootContext } from '@/components/meta';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { FormField } from '../../common/uikit/FormField';

const options = [
  { label: 'option 1', value: 1 },
  { label: 'option 2', value: 2 },
  { label: 'option 3', value: 3 },
];

enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

type OrderingProps = {
  isOrderingShown: boolean;
  setIsOrderingShown: Dispatch<SetStateAction<boolean>>;
  primitive: PrimitiveType;
};

export const OrderingWindow: FC<OrderingProps> = ({
  isOrderingShown,
  setIsOrderingShown,
}) => {
  const portalRootRef = useContext(PortalRootContext);

  const directionOptions = {
    [OrderDirection.ASC]: { value: OrderDirection.ASC, label: 'Ascending' },
    [OrderDirection.DESC]: { value: OrderDirection.DESC, label: 'Descending' },
  };

  return (
    <PropertiesModal
      isOpen={isOrderingShown}
      name="Ordering"
      onClose={() => {
        setIsOrderingShown(false);
      }}
      onApply={() => {
        setIsOrderingShown(false);
      }}
    >
      <FormField label="Order by">
        <Select
          options={options}
          isMulti
          menuPosition="fixed"
          menuPortalTarget={portalRootRef?.current}
        />
      </FormField>
      <FormField label="Direction">
        <Select
          options={_.values(directionOptions)}
          isMulti
          menuPosition="fixed"
          menuPortalTarget={portalRootRef?.current}
        />
      </FormField>
    </PropertiesModal>
  );
};
