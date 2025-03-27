'use client';

import cn from 'classnames';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { WithChildren } from '@/types/withChildren';
import styles from './CollapsableView.module.scss';

type Props = {
  title: string;
};

const CollapseState = ['not required', 'hidden', 'view'] as const;
type CollapseState = (typeof CollapseState)[number];

export const CollapsableView: FC<WithChildren & Props> = ({
  children,
  title,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [collapseState, setCollapseState] =
    useState<CollapseState>('not required');

  useLayoutEffect(() => {
    const parentOffset = parentRef.current?.offsetWidth;
    const childScroll = childRef.current?.scrollWidth;

    if (parentOffset && childScroll) {
      if (parentOffset < childScroll) {
        setCollapseState('hidden');
      } else {
        setCollapseState('not required');
      }
    }
  }, []);
  return (
    <div className={styles.container} ref={parentRef}>
      {title}
      <div className={styles.withShowAll}>
        <div
          className={cn(
            styles.collabsableOutput,
            collapseState === 'view' && styles.whenShowAll,
          )}
          ref={childRef}
        >
          {children}
          {collapseState === 'view' && (
            <button
              className={cn(styles.buttonShow, styles.withoutMargin)}
              onClick={() => setCollapseState('hidden')}
            >
              Show&nbsp;less
            </button>
          )}
        </div>
        {collapseState === 'hidden' && (
          <button
            className={styles.buttonShow}
            onClick={() => setCollapseState('view')}
          >
            Show&nbsp;all
          </button>
        )}
      </div>
    </div>
  );
};
