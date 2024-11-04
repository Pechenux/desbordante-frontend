import HomeBackground from '@/assets/backgrounds/home.svg?component';
import styles from './home.module.scss';

export default function Home() {
  return (
    <div className={styles.root}>
      <HomeBackground
        className={styles.background}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
      <div>asd</div>
      <div>dsa</div>
    </div>
  );
}
