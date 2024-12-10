import _ from 'lodash';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { FormField, FormFieldProps } from '../FormField/FormField'; // FIXME: fix import

/**
 * FormField controlled by react-hook-form controller
 * @param props react-hook-form controller props and formfield specific props
 * @returns JSX.Element
 */
export const ControlledFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName> &
    Omit<FormFieldProps, 'children'>,
) => {
  // FIXME: think about memoization
  const formFieldProps = _.pick(
    props,
    'label',
    'tooltip',
    'id',
    'error',
    'disables',
  );
  const rest = _.omit(props, 'label', 'tooltip', 'id', 'error', 'disables');
  const { render, ...controllerProps } = rest;
  return (
    <Controller
      {...controllerProps}
      render={(renderProps) => (
        <FormField {...formFieldProps}>{render(renderProps)}</FormField>
      )}
    />
  );
};
