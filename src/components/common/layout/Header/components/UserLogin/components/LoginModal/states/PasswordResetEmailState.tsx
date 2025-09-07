import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSendResetEmail } from '@/api/services/auth';
import { ControlledFormField, Text } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import styles from '../LoginModal.module.scss';
import { ResetEmailRequest } from '../types';

interface PasswordResetEmailStateProps {
  onSwitchToLogin: () => void;
  onResetEmailSent: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const PasswordResetEmailState: FC<PasswordResetEmailStateProps> = ({
  onSwitchToLogin,
  onResetEmailSent,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { handleSubmit, control } = useForm<ResetEmailRequest>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const sendResetEmail = useSendResetEmail();

  const onSubmit = useCallback(
    (formData: ResetEmailRequest) => {
      setIsSubmitting(true);
      try {
        sendResetEmail.mutate(formData, {
          onSuccess: (response) => {
            if (response && 'success' in response && response.success) {
              onResetEmailSent();
            }
          },
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [sendResetEmail, onResetEmailSent, setIsSubmitting],
  );

  return (
    <>
      <form id="resetemailform" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <p className={styles.resetMessage}>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
          <ControlledFormField
            controllerProps={{ name: 'email', control }}
            formFieldProps={{ label: 'Email' }}
          >
            {({ field: { value, onChange } }) => (
              <Text type="email" value={value} onChange={onChange} />
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
        <Button type="submit" form="resetemailform" disabled={isSubmitting}>
          Send Reset Link
        </Button>
      </div>
    </>
  );
};
