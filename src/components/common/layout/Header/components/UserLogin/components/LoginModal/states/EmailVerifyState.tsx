import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useConfirmEmail, useSendConfirmationEmail } from '@/api/services/auth';
import { isSchemaAuthResponseSchema } from '@/api/services/auth/helpers';
import { ControlledFormField, Text } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import styles from '../LoginModal.module.scss';
import { ConfirmEmailRequest } from '../types';

interface EmailVerifyStateProps {
  onEmailVerified: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const EmailVerifyState: FC<EmailVerifyStateProps> = ({
  onEmailVerified,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { handleSubmit, control } = useForm<ConfirmEmailRequest>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      token: '',
    },
  });

  const confirmEmail = useConfirmEmail();
  const sendConfirmationEmail = useSendConfirmationEmail();

  const onSubmit = useCallback(
    (formData: ConfirmEmailRequest) => {
      setIsSubmitting(true);
      try {
        confirmEmail.mutate(formData.token, {
          onSuccess: (response) => {
            if (response && isSchemaAuthResponseSchema(response)) {
              onEmailVerified();
            }
          },
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [confirmEmail, onEmailVerified, setIsSubmitting],
  );

  const handleResendEmail = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await sendConfirmationEmail.mutateAsync(undefined);
    } finally {
      setIsSubmitting(false);
    }
  }, [sendConfirmationEmail, setIsSubmitting]);

  return (
    <>
      <form id="verifyform" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <p className={styles.verifyMessage}>
            We&apos;ve sent a verification code to your email. Please enter it
            below:
          </p>
          <ControlledFormField
            controllerProps={{ name: 'token', control }}
            formFieldProps={{ label: 'Verification Code' }}
          >
            {({ field: { value, onChange } }) => (
              <Text value={value} onChange={onChange} />
            )}
          </ControlledFormField>
        </div>
      </form>
      <div className={styles.buttons}>
        <Button
          variant="secondary"
          onClick={handleResendEmail}
          disabled={isSubmitting}
        >
          Resend Email
        </Button>
        <Button type="submit" form="verifyform" disabled={isSubmitting}>
          Verify Email
        </Button>
      </div>
    </>
  );
};
