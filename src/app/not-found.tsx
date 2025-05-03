'use client';

import { useRouter } from 'next/navigation';
import { Button, Icon } from '@/components/common/uikit';
import styles from './not-found.module.scss';

export default function NotFound() {
  const { push } = useRouter();

  return (
    <div className={styles.wrapper}>
      <Icon name="background404" className={styles.background} />
      <div className={styles.inner}>
        <h1>404</h1>
        <h5>Page not found</h5>
        <p>The page you are trying to locate does not exist</p>
      </div>
      <Button variant="secondary" onClick={() => push('/')}>
        Go to Home Page
      </Button>
    </div>
  );
}
