import { Suspense } from 'react';
import { ReportsPage } from './reports';

export default function Reports() {
  return (
    <Suspense>
      <ReportsPage />
    </Suspense>
  );
}
