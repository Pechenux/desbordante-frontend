import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '@/api/services/auth';
import { isSchemaAuthResponseSchema } from '@/api/services/auth/helpers';
import { ControlledFormField, Text } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import styles from '../LoginModal.module.scss';
import { ResetPasswordRequest } from '../types';

interface PasswordResetFormStateProps {
  onSwitchToLogin: () => void;
  onPasswordReset: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const PasswordResetFormState: FC<PasswordResetFormStateProps> = ({
  onSwitchToLogin,
  onPasswordReset,
  isSubmitting,
  setIsSubmitting,
}) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm<ResetPasswordRequest>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      token: '',
      new_password: '',
      new_password_confirm: '',
    },
  });

  const resetPassword = useResetPassword();

  const onSubmit = useCallback(
    (formData: ResetPasswordRequest) => {
      setIsSubmitting(true);
      try {
        resetPassword.mutate(
          {
            token: formData.token,
            data: {
              new_password: formData.new_password,
            },
          },
          {
            onSuccess: (response) => {
              if (isSchemaAuthResponseSchema(response)) {
                onPasswordReset();
              }
            },
          },
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [resetPassword, onPasswordReset, setIsSubmitting],
  );

  return (
    <>
      <form id="resetform" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <p className={styles.resetMessage}>
            Enter the verification code sent to your email and create a new
            password.
          </p>
          <ControlledFormField
            controllerProps={{ name: 'token', control }}
            formFieldProps={{ label: 'Verification Code' }}
          >
            {({ field: { value, onChange } }) => (
              <Text value={value} onChange={onChange} />
            )}
          </ControlledFormField>
          <ControlledFormField
            controllerProps={{ name: 'new_password', control }}
            formFieldProps={{ label: 'New Password' }}
          >
            {({ field: { value, onChange } }) => (
              <Text type="password" value={value} onChange={onChange} />
            )}
          </ControlledFormField>
          <ControlledFormField
            controllerProps={{
              name: 'new_password_confirm',
              control,
              rules: {
                validate: (value) => {
                  const password = watch('new_password');
                  return value === password || 'Passwords do not match';
                },
              },
            }}
            formFieldProps={{ label: 'Confirm New Password' }}
          >
            {({ field: { value, onChange } }) => (
              <Text type="password" value={value} onChange={onChange} />
            )}
          </ControlledFormField>
        </div>
      </form>
      <div className={styles.buttons}>
        <Button
          variant="secondary"
          onClick={onSwitchToLogin}
          disabled={isSubmitting}
        >
          Back to Login
        </Button>
        <Button
          type="submit"
          form="resetform"
          disabled={isSubmitting || !isValid}
        >
          Reset Password
        </Button>
      </div>
    </>
  );
};
