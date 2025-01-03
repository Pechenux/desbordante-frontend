import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { FormField, FormFieldParams } from '../FormField';

export type ControlledFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  /** Props for react-hook-form controller */
  controllerProps: ControllerProps<TFieldValues, TName>;
  /** Props for form field */
  formFieldProps?: Omit<FormFieldParams, 'error'>;
};

/**
 * FormField controlled by react-hook-form controller
 */
export const ControlledFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControlledFormFieldProps<TFieldValues, TName>,
) => {
  const { render, ...controllerProps } = props.controllerProps;
  return (
    <Controller
      {...controllerProps}
      render={(renderProps) => (
        <FormField
          {...props.formFieldProps}
          error={renderProps.fieldState.error?.message}
        >
          {render(renderProps)}
        </FormField>
      )}
    />
  );
};
