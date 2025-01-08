'use client';

import classNames from 'classnames';
import React, { FC, PropsWithChildren, ReactNode } from 'react';
import NotFound from '@/app/not-found';
import { useQueryParams } from '@/utils/useQueryParams';
import { Icon } from '../../uikit';
import styles from './ReportsLayout.module.scss';

interface TabType {
  name: string;
  label: string;
  icon: ReactNode;
  content: ReactNode;
  pageClass?: string;
  containerClass?: string;
}

interface Props extends PropsWithChildren {
  tabs: TabType[];
  currentTab: string;
}

export const ReportsLayout: FC<Props> = ({ tabs, currentTab }) => {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();
  const page = tabs.filter((tab) => tab.name === currentTab)[0];
  if (!page) return NotFound();

  return (
    <div className={classNames(styles.page, page.pageClass)}>
      <Icon name="backgroundCreateTask" className={styles.background} />
      <div className={styles.menu}>
        <ul>
          {tabs.map(({ icon, label, name }) => (
            <li
              key={name}
              className={classNames(currentTab === name && styles.active)}
              onClick={() =>
                setQueryParams({
                  newPathname: name,
                  erase: false,
                  params: {},
                })
              }
            >
              {icon}
              <p>{label}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={classNames(styles.content, page.containerClass)}>
        {page.content}
      </div>
    </div>
  );
};
