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
  controllerProps: Omit<ControllerProps<TFieldValues, TName>, 'render'>;
  /** Props for form field */
  formFieldProps?: Omit<FormFieldParams, 'error'>;
  /** Controlled component */
  children: ControllerProps<TFieldValues, TName>['render'];
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
  return (
    <Controller
      {...props.controllerProps}
      render={(renderProps) => (
        <FormField
          {...props.formFieldProps}
          error={renderProps.fieldState.error?.message}
        >
          {props.children(renderProps)}
        </FormField>
      )}
    />
  );
};
