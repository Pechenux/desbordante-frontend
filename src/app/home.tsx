'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import HomeBackground from '@/assets/backgrounds/home.svg?component';
import UnidataLogo from '@/assets/images/unidata-logo.svg?component';
import { Button, ExternalLink } from '@/components/common/uikit';
import styles from './home.module.scss';

export default function Home() {
  const router = useRouter();

  // let video overflow without adding scrollbar
  useLayoutEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={styles.root}>
      <HomeBackground
        className={styles.background}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
      <div className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.name}>Desbordante</h1>
          <h6 className={styles.description}>
            Open-source data profiling tool{' '}
            <span className={styles.supported}>
              supported by
              <a
                className={styles.unidataLogo}
                href="https://universe-data.ru"
                target="_blank"
                rel="noreferrer"
                title="Universe Data"
              >
                <UnidataLogo width={144} height={48} />
              </a>
            </span>
          </h6>
          <div className={styles.links}>
            <Button
              variant="gradient"
              onClick={() => router.push('/create-task/choose-primitive')}
            >
              Get Started
            </Button>
            <div className={styles.external}>
              <ExternalLink href="https://github.com/desbordante">
                GitHub
              </ExternalLink>
              {/* Link is broken */}
              {/* <ExternalLink href="https://mstrutov.github.io/Desbordante">
                User Guide
              </ExternalLink> */}
            </div>
          </div>
        </div>
        <div className={styles.videoContainer}>
          <video autoPlay muted loop>
            <source src="static/videos/hero-animation.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  );
}
