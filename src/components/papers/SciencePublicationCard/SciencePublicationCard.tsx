'use client';

import { FC } from 'react';
import { SchemaSciencePublication } from '@/api/generated/schema';
import { Button } from '@/components/common/uikit';
import { showError, showSuccess } from '@/utils/toasts';
import styles from './SciencePublicationCard.module.scss';

interface Props {
  data: SchemaSciencePublication;
}

export const SciencePublicationCard: FC<Props> = ({ data }) => {
  const displayDate = new Date(data.date).toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const onCite = () => {
    navigator.clipboard
      .writeText(data.cite)
      .then(() => {
        showSuccess('BibTeX cite was copied to your clipboard');
      })
      .catch(() => {
        showError('Could not copy cite to clipboard');
      });
  };

  return (
    <li className={styles.sciencePublicationCard}>
      <div className={styles.data}>
        <h6 className={styles.title}>
          <a href={data.href} target="_blank" rel="noreferrer">
            {data.title}
          </a>
        </h6>

        <p className={styles.info}>
          <span className={styles.venue}>{data.venue}</span>
          <time className={styles.date} dateTime={data.date}>
            {displayDate}
          </time>
        </p>
      </div>

      <Button onClick={onCite} variant="secondary" size="sm">
        Cite
      </Button>
    </li>
  );
};
