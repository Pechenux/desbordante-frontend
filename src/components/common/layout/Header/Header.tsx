'use client';

//import cn from 'classnames';
//import { memo, useEffect, useState } from 'react';

import { memo } from 'react';

import { NavBar } from './components/NavBar';
import { UserLogin } from './components/UserLogin';
import styles from './Header.module.scss';

const HeaderComponent = () => {
  // const [headerBackground, setHeaderBackground] = useState(false);

  // useEffect(() => {
  //   const checkScroll = () => {
  //     setHeaderBackground(window.scrollY > 64);
  //   };

  //   window.addEventListener('scroll', checkScroll);
  //   return () => {
  //     window.removeEventListener('scroll', checkScroll);
  //   };
  // }, []);

  return (
    <header
      // className={cn(styles.header, headerBackground && styles.background)}
      className={styles.header}
    >
      <NavBar />
      <UserLogin />
    </header>
  );
};

export const Header = memo(HeaderComponent);
