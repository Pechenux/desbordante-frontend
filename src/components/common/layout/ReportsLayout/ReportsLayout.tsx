import classNames from 'classnames';
//import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { Icon } from '../../uikit';
import styles from './ReportsLayout.module.scss';

interface TabType {
  label: string;
  pathname: string;
  icon: ReactNode;
}

interface Props extends PropsWithChildren {
  pageClass?: string;
  containerClass?: string;
  tabs: TabType[];
}

export const ReportsLayout: FC<Props> = ({
  pageClass,
  containerClass,
  tabs,
  children,
}) => {
  //const router = useRouter();
  const [selectedPathname, setPathname] = useState<string>(
    '/reports/dependencies',
  );

  return (
    <div className={classNames(styles.page, pageClass)}>
      <Icon name="backgroundCreateTask" className={styles.background} />
      <div className={styles.menu}>
        <ul>
          {tabs.map(({ icon, label, pathname }) => (
            <li
              key={pathname}
              className={classNames(
                selectedPathname === pathname && styles.active,
              )}
              onClick={() => setPathname(pathname)}
            >
              {icon}
              <p>{label}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={classNames(styles.content, containerClass)}>
        {children}
      </div>
    </div>
  );
};
