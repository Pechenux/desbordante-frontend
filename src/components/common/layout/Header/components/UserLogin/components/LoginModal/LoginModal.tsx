// import { useQuery } from '@tanstack/react-query';
import { FC, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLogin, useRegister } from '@/api/services/auth';
import { RegisterFormData } from '@/api/services/auth/types';
// import { createQueryFn } from '@/api/services/server';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { ControlledFormField, Text } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import styles from './LoginModal.module.scss';

type LoginModalProps = ModalProps & {
  isLogin: boolean;
  onLogin: () => void;
};

export const LoginModal: FC<LoginModalProps> = ({
  isOpen,
  onClose,
  isLogin,
  onLogin,
}) => {
  const methods = useForm<RegisterFormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
      first_name: '',
      last_name: '',
    },
  });

  const login = useLogin();
  const register = useRegister();

  const onSubmit = useCallback(
    async (formData: RegisterFormData) => {
      if (isLogin) {
        await login.mutate(
          {
            login: formData.login,
            password: formData.password,
          },
          {
            onSuccess: (response) => {
              if ('error' in response) {
                console.error(response.error);
              } else {
                onLogin();
              }
            },
          },
        );
      } else {
        await register.mutate(formData, {
          onSuccess: (response) => {
            if ('error' in response) {
              console.error(response.error);
            } else {
              onLogin();
            }
          },
        });
      }
    },
    [isLogin, login, onLogin, register],
  );

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <h4 className={styles.title}>{isLogin ? 'Log in' : 'Sign up'}</h4>
      <FormProvider {...methods}>
        <form id="loginform" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            {!isLogin ? (
              <ControlledFormField
                controllerProps={{ name: 'first_name' }}
                formFieldProps={{ label: 'First name' }}
              >
                {({ field: { value, onChange } }) => (
                  <Text value={value} onChange={onChange} />
                )}
              </ControlledFormField>
            ) : null}
            {!isLogin ? (
              <ControlledFormField
                controllerProps={{ name: 'last_name' }}
                formFieldProps={{ label: 'Last name' }}
              >
                {({ field: { value, onChange } }) => (
                  <Text value={value} onChange={onChange} />
                )}
              </ControlledFormField>
            ) : null}
            <ControlledFormField
              controllerProps={{ name: 'login' }}
              formFieldProps={{ label: 'Email' }}
            >
              {({ field: { value, onChange } }) => (
                <Text type="email" value={value} onChange={onChange} />
              )}
            </ControlledFormField>
            <ControlledFormField
              controllerProps={{ name: 'password' }}
              formFieldProps={{ label: 'Password' }}
            >
              {({ field: { value, onChange } }) => (
                <Text type="password" value={value} onChange={onChange} />
              )}
            </ControlledFormField>
          </div>
        </form>
      </FormProvider>
      <div className={styles.buttons}>
        {isLogin ? (
          <Button variant="secondary" onClick={onClose}>
            Restore password
          </Button>
        ) : null}
        <Button type="submit" form="loginform">
          {isLogin ? 'Log in' : 'Sign up'}
        </Button>
      </div>
    </ModalContainer>
  );
};
