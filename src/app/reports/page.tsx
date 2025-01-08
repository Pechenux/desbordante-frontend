'use client';

import { useRouter } from 'next/navigation';
import { Loader } from '@/components/reports/Loader';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './reports.module.scss';

export default function Reports() {
  const router = useRouter();
  const { queryParams } = useQueryParams<{ taskID: string }>();

  if (!queryParams.taskID) {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
}
