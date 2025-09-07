import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { useLogout, useUser } from '@/api/services/auth';
import { isSchemaAuthResponseSchema } from '@/api/services/auth/helpers';
import { Button } from '@/components/common/uikit';
import { LoginModal } from './components/LoginModal';
import { LoginModalState } from './components/LoginModal/types';
import styles from './UserLogin.module.scss';

type ModalState = {
  type: LoginModalState;
  isOpen: boolean;
};

const UserLoginComponent = () => {
  const [modalState, setModalState] = useState<ModalState>({
    type: LoginModalState.LOGIN,
    isOpen: false,
  });

  const user = useUser();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout.mutate();
  }, [logout]);

  return (
    <>
      <LoginModal
        isOpen={
          modalState.isOpen && modalState.type !== LoginModalState.EMAIL_VERIFY
        }
        initialState={modalState.type}
        onClose={() =>
          setModalState((currentState) => ({ ...currentState, isOpen: false }))
        }
        onLogin={() =>
          setModalState((currentState) => ({ ...currentState, isOpen: false }))
        }
      />
      <div className={styles.authContainer}>
        {isSchemaAuthResponseSchema(user.data) ? (
          <>
            <p>
              Welcome,{' '}
              <Link className={styles.userCabinetLink} href="/me">
                {user.data.full_name}
              </Link>
            </p>
            {!user.data.is_verified && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  setModalState({
                    type: LoginModalState.LOGIN,
                    isOpen: true,
                  })
                }
              >
                Verify Email
              </Button>
            )}
            <Button variant="secondary-danger" size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setModalState({
                  type: LoginModalState.LOGIN,
                  isOpen: true,
                })
              }
            >
              Log In
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={() =>
                setModalState({
                  type: LoginModalState.REGISTER,
                  isOpen: true,
                })
              }
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export const UserLogin = memo(UserLoginComponent);
