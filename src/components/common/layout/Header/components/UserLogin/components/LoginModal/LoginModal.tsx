import { FC, useCallback, useEffect, useState } from 'react';
import {
  ModalContainer,
  ModalProps,
} from '@/components/common/layout/ModalContainer';
import { EmailVerifyState } from './states/EmailVerifyState';
import { LoginState } from './states/LoginState';
import { PasswordResetEmailState } from './states/PasswordResetEmailState';
import { PasswordResetFormState } from './states/PasswordResetFormState';
import { RegisterState } from './states/RegisterState';
import { LoginModalState } from './types';
import styles from './LoginModal.module.scss';

type LoginModalProps = ModalProps & {
  initialState?: LoginModalState;
  onLogin: () => void;
  onEmailVerified?: () => void;
};

export const LoginModal: FC<LoginModalProps> = ({
  isOpen,
  onClose,
  initialState = LoginModalState.LOGIN,
  onLogin,
  onEmailVerified,
}) => {
  // State to track the current modal state
  const [currentState, setCurrentState] =
    useState<LoginModalState>(initialState);

  useEffect(() => setCurrentState(initialState), [initialState]);

  // State to track if we're in the process of submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle state transitions
  const handleSwitchToLogin = useCallback(() => {
    setCurrentState(LoginModalState.LOGIN);
  }, []);

  const handleSwitchToRegister = useCallback(() => {
    setCurrentState(LoginModalState.REGISTER);
  }, []);

  const handleSwitchToPasswordReset = useCallback(() => {
    setCurrentState(LoginModalState.PASSWORD_RESET_EMAIL);
  }, []);

  // Handle password reset email sent
  const handleResetEmailSent = useCallback(() => {
    setCurrentState(LoginModalState.PASSWORD_RESET_FORM);
  }, []);

  // Handle password reset completion
  const handlePasswordReset = useCallback(() => {
    setCurrentState(LoginModalState.LOGIN);
  }, []);

  // Handle registration success
  const handleRegisterSuccess = useCallback(() => {
    setCurrentState(LoginModalState.EMAIL_VERIFY);
  }, []);

  // Render the appropriate title based on current state
  const renderTitle = () => {
    switch (currentState) {
      case LoginModalState.LOGIN:
        return 'Log in';
      case LoginModalState.REGISTER:
        return 'Sign up';
      case LoginModalState.EMAIL_VERIFY:
        return 'Verify Your Email';
      case LoginModalState.PASSWORD_RESET_EMAIL:
        return 'Reset Password';
      case LoginModalState.PASSWORD_RESET_FORM:
        return 'Reset Password';
      default:
        return 'Log in';
    }
  };

  // Render the appropriate state component based on current state
  const renderState = () => {
    switch (currentState) {
      case LoginModalState.LOGIN:
        return (
          <LoginState
            onLogin={onLogin}
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToPasswordReset={handleSwitchToPasswordReset}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        );

      case LoginModalState.REGISTER:
        return (
          <RegisterState
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={handleSwitchToLogin}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        );

      case LoginModalState.EMAIL_VERIFY:
        return (
          <EmailVerifyState
            onEmailVerified={onEmailVerified || onClose}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        );

      case LoginModalState.PASSWORD_RESET_EMAIL:
        return (
          <PasswordResetEmailState
            onSwitchToLogin={handleSwitchToLogin}
            onResetEmailSent={handleResetEmailSent}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        );

      case LoginModalState.PASSWORD_RESET_FORM:
        return (
          <PasswordResetFormState
            onSwitchToLogin={handleSwitchToLogin}
            onPasswordReset={handlePasswordReset}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <h4 className={styles.title}>{renderTitle()}</h4>
      {renderState()}
    </ModalContainer>
  );
};
