import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';
import logo from '@public/static/images/logo.svg';

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
        <li className={styles.brandContainer}>
          <Link
            href="/"
            title="Desbordante"
            className={cn(styles.link, styles.brand)}
          >
            <Image
              src={logo}
              alt="Logo"
              className={styles.logo}
              width={39.5}
              height={40}
            />
            Desbordante
          </Link>
        </li>
        {routes.map(({ label, pathname }) => (
          <li
            key={label}
            title={label}
            className={cn(
              styles.linkContainer,
              currentPathname.startsWith(pathname) && styles.selected,
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
