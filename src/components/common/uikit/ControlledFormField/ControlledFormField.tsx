import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { FormField, FormFieldParams } from '../FormField';

/**
 * FormField controlled by react-hook-form controller
 * @param props react-hook-form controller props and formfield specific props
 * @returns JSX.Element
 */
export const ControlledFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: {
  controllerProps: ControllerProps<TFieldValues, TName>;
  formFieldProps?: Omit<FormFieldParams, 'error'>;
}) => {
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
