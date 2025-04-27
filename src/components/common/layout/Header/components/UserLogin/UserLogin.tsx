import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { useLogout } from '@/api/services/auth';
import { useUser } from '@/api/services/server/hooks';
import { Button } from '@/components/common/uikit';
import { LoginModal } from './components/LoginModal';
import styles from './UserLogin.module.scss';

enum ModalType {
  LOGIN = 'login',
  SIGN_UP = 'signUp',
  VERIFY = 'verify',
}

type ModalState = {
  type: ModalType;
  isOpen: boolean;
};

const UserLoginComponent = () => {
  const [modalState, setModalState] = useState<ModalState>({
    type: ModalType.LOGIN,
    isOpen: false,
  });

  const user = useUser();
  const logout = useLogout();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogout = useCallback(() => {
    logout.mutate();
  }, [logout]);

  return (
    <>
      <LoginModal
        isOpen={modalState.isOpen && modalState.type !== ModalType.VERIFY}
        isLogin={modalState.type === ModalType.LOGIN}
        onClose={() =>
          setModalState((currentState) => ({ ...currentState, isOpen: false }))
        }
        onLogin={() =>
          setModalState((currentState) => ({ ...currentState, isOpen: false }))
        }
      />
      <div className={styles.authContainer}>
        {user ? (
          <>
            <p>
              Welcome,{' '}
              <Link className={styles.userCabinetLink} href="/me">
                {user.first_name} {user.last_name}
              </Link>
            </p>
            {/* {!user.isVerified && (
              <Button variant="secondary" size="sm" onClick={noop}>
                Verify Email
              </Button>
            )} */}
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
                  type: ModalType.LOGIN,
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
                  type: ModalType.SIGN_UP,
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
