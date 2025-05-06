'use client';

import React, { FC, useContext, useState } from 'react';
import { SingleValue } from 'react-select';
import {
  AcSortOptions,
  AdcSortOptions,
  AfdSortOptions,
  AfdVerificationSortOptions,
  DdSortOptions,
  FdSortOptions,
  MdSortOptions,
  MfdVerificationSortOptions,
  NarSortOptions,
  PfdSortOptions,
  SortOrder,
} from '@/api/generated/schema';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { SelectOption, Select } from '@/components/common/uikit/Inputs';
import { PortalRootContext } from '@/components/meta';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { FormField } from '../../common/uikit/FormField';

export type SortOptions =
  | AfdSortOptions
  | DdSortOptions
  | FdSortOptions
  | MdSortOptions
  | MfdVerificationSortOptions
  | NarSortOptions
  | PfdSortOptions
  | AcSortOptions
  | AdcSortOptions
  | AfdVerificationSortOptions;

export const optionsByPrimitive: Partial<
  Record<PrimitiveType, SelectOption<SortOptions>[]>
> = {
  [PrimitiveType.FD]: [
    { label: 'LHS names', value: FdSortOptions.lhs },
    { label: 'RHS names', value: FdSortOptions.rhs },
  ],
  [PrimitiveType.AFD]: [
    { label: 'LHS names', value: AfdSortOptions.lhs },
    { label: 'RHS names', value: AfdSortOptions.rhs },
  ],
  [PrimitiveType.PFD]: [
    { label: 'LHS names', value: PfdSortOptions.lhs },
    { label: 'RHS names', value: PfdSortOptions.rhs },
  ],
  [PrimitiveType.DD]: [
    { label: 'LHS names', value: DdSortOptions.lhs },
    { label: 'RHS names', value: DdSortOptions.rhs },
  ],
  [PrimitiveType.MD]: [
    { label: 'LHS names', value: MdSortOptions.lhs },
    { label: 'RHS names', value: MdSortOptions.rhs },
  ],
  [PrimitiveType.MFD]: [
    { label: 'Point index', value: MfdVerificationSortOptions.data_index },
    {
      label: 'Furthest point index',
      value: MfdVerificationSortOptions.furthest_data_index,
    },
    {
      label: 'Maximum distance',
      value: MfdVerificationSortOptions.maximum_distance,
    },
  ],
  [PrimitiveType.NAR]: [
    { label: 'LHS names', value: NarSortOptions.lhs },
    { label: 'RHS names', value: NarSortOptions.rhs },
  ],
  [PrimitiveType.AC]: [
    { label: 'Attributes names', value: AcSortOptions.attrubites_names },
    { label: 'Number of intervals', value: AcSortOptions.num_intervals },
    { label: 'Number of outliers', value: AcSortOptions.num_outliers },
  ],
  [PrimitiveType.ADC]: [
    { label: 'Attributes names', value: AdcSortOptions.attrubites_names },
    { label: 'Number of conjuncts', value: AdcSortOptions.len },
  ],
  [PrimitiveType.AFDVerification]: [
    {
      label: 'Most frequent RHS value proportion',
      value: AfdVerificationSortOptions.frequentness,
    },
    {
      label: 'Distinct RHS values',
      value: AfdVerificationSortOptions.num_distinct_rhs_values,
    },
    {
      label: 'Size',
      value: AfdVerificationSortOptions.size,
    },
  ],
};

const directionOptions: SelectOption<SortOrder>[] = [
  { value: SortOrder.asc, label: 'Ascending' },
  { value: SortOrder.desc, label: 'Descending' },
];

type OrderingProps = ModalProps & {
  onApply: (
    newDirection: SingleValue<SortOrder>,
    newOrderBy: SingleValue<SortOptions>,
  ) => void;
  primitive: PrimitiveType;
  curOrderDirection: SingleValue<SortOrder>;
  curOrderOption: SingleValue<SortOptions>;
};

export const OrderingWindow: FC<OrderingProps> = ({
  isOpen,
  primitive,
  curOrderDirection,
  curOrderOption,
  onClose,
  onApply,
}) => {
  const portalRootRef = useContext(PortalRootContext);

  const [orderDirection, setOrderDirection] =
    useState<SingleValue<SortOrder>>(curOrderDirection);
  const [orderOption, setOrderOption] =
    useState<SingleValue<SortOptions>>(curOrderOption);

  return (
    <PropertiesModal
      isOpen={isOpen}
      name="Ordering"
      onClose={onClose}
      onApply={() => onApply(orderDirection, orderOption)}
    >
      <FormField label="Order by">
        <Select
          value={orderOption}
          onChange={setOrderOption}
          options={optionsByPrimitive[primitive]}
          menuPosition="fixed"
          menuPortalTarget={portalRootRef?.current}
        />
      </FormField>
      <FormField label="Direction">
        <Select
          value={orderDirection}
          onChange={setOrderDirection}
          options={directionOptions}
          menuPosition="fixed"
          menuPortalTarget={portalRootRef?.current}
        />
      </FormField>
    </PropertiesModal>
  );
};
