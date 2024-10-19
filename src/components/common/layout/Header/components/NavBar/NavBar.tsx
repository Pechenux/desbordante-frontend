import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

import styles from './NavBar.module.scss';

type Route = {
  label: string;
  pathname: string;
  // resolver?: (user?: User) => boolean;
};

const routes: Route[] = [
  {
    label: 'Discover',
    pathname: '/create-task',
  },
  {
    label: 'Papers',
    pathname: '/papers',
  },
  {
    label: 'Team',
    pathname: '/team',
  },
  // {
  //   label: 'Admin Panel',
  //   pathname: '/admin-panel',
  //   resolver: (user) => Boolean(user?.permissions.canViewAdminInfo),
  // },
].filter(Boolean);

const NavBarComponent = () => {
  const currentPathname = usePathname();

  return (
    <nav>
      <ul className={styles.container}>
        {routes.map(({ label, pathname }) => (
          <li
            key={label}
            className={cn(
              styles.linkContainer,
              currentPathname.startsWith(pathname) && styles.withUnderline,
            )}
          >
            <Link href={pathname} className={styles.link}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const NavBar = memo(NavBarComponent);
