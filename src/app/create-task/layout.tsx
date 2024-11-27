import HomeBackground from '@/assets/backgrounds/home.svg?component';
import styles from './layout.module.scss';

export default function CreateTaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.root}>
      <HomeBackground
        className={styles.background}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
      {children}
    </div>
  );
}
