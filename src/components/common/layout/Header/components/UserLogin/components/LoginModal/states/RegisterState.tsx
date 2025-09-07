import { countries, getEmojiFlag, TCountryCode } from 'countries-list';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '@/api/services/auth';
import { isSchemaAuthResponseSchema } from '@/api/services/auth/helpers';
import { ControlledFormField, Select, Text } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import styles from '../LoginModal.module.scss';
import { RegisterFormData } from '../types';

const countryNames = Object.entries(countries).map(([code, country]) => ({
  emoji: getEmojiFlag(code as TCountryCode),
  ...country,
}));

interface RegisterStateProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const RegisterState: FC<RegisterStateProps> = ({
  onRegisterSuccess,
  onSwitchToLogin,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { handleSubmit, control } = useForm<RegisterFormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      country: '',
      company: '',
      occupation: '',
    },
  });

  const register = useRegister();

  const onSubmit = useCallback(
    (formData: RegisterFormData) => {
      setIsSubmitting(true);
      try {
        register.mutate(formData, {
          onSuccess: (response) => {
            if (isSchemaAuthResponseSchema(response)) {
              onRegisterSuccess();
            }
          },
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [register, onRegisterSuccess, setIsSubmitting],
  );

  return (
    <>
      <form id="registerform" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <ControlledFormField
            controllerProps={{ name: 'full_name', control }}
            formFieldProps={{ label: 'Full Name' }}
          >
            {({ field: { value, onChange } }) => (
              <Text value={value} onChange={onChange} />
            )}
          </ControlledFormField>
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
          <ControlledFormField
            controllerProps={{ name: 'country', control }}
            formFieldProps={{ label: 'Country' }}
          >
            {({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                options={countryNames.map(({ emoji, native, name }) => ({
                  label: `${emoji} ${native}`,
                  value: name,
                }))}
              />
            )}
          </ControlledFormField>
          <ControlledFormField
            controllerProps={{ name: 'company', control }}
            formFieldProps={{ label: 'Company' }}
          >
            {({ field: { value, onChange } }) => (
              <Text value={value} onChange={onChange} />
            )}
          </ControlledFormField>
          <ControlledFormField
            controllerProps={{ name: 'occupation', control }}
            formFieldProps={{ label: 'Occupation' }}
          >
            {({ field: { value, onChange } }) => (
              <Text value={value} onChange={onChange} />
            )}
          </ControlledFormField>
        </div>
      </form>
      <Button
        className={styles.button}
        type="submit"
        form="registerform"
        disabled={isSubmitting}
      >
        Sign up
      </Button>
      <Button
        variant="secondary"
        onClick={onSwitchToLogin}
        disabled={isSubmitting}
      >
        Already have an account? Log in
      </Button>
    </>
  );
};
