import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/api/services/auth';
import { isSchemaAuthResponseSchema } from '@/api/services/auth/helpers';
import { ControlledFormField, Text } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import styles from '../LoginModal.module.scss';
import { LoginFormData } from '../types';

interface LoginStateProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
  onSwitchToPasswordReset: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const LoginState: FC<LoginStateProps> = ({
  onLogin,
  onSwitchToRegister,
  onSwitchToPasswordReset,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { handleSubmit, control } = useForm<LoginFormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = useLogin();

  const onSubmit = useCallback(
    (formData: LoginFormData) => {
      setIsSubmitting(true);
      try {
        login.mutate(
          {
            email: formData.email,
            password: formData.password,
          },
          {
            onSuccess: (response) => {
              if (isSchemaAuthResponseSchema(response)) {
                onLogin();
              }
            },
          },
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [login, onLogin, setIsSubmitting],
  );

  return (
    <>
      <form id="loginform" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <ControlledFormField
            controllerProps={{ name: 'email', control }}
            formFieldProps={{ label: 'Email' }}
          >
            {({ field: { value, onChange } }) => (
              <Text type="email" value={value} onChange={onChange} />
            )}
          </ControlledFormField>
          <ControlledFormField
            controllerProps={{ name: 'password', control }}
            formFieldProps={{ label: 'Password' }}
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
          onClick={onSwitchToPasswordReset}
          disabled={isSubmitting}
        >
          Forgot password?
        </Button>
        <Button type="submit" form="loginform" disabled={isSubmitting}>
          Log in
        </Button>
      </div>
      <Button
        variant="secondary"
        onClick={onSwitchToRegister}
        disabled={isSubmitting}
      >
        Don&apos;t have an account? Sign up
      </Button>
    </>
  );
};
