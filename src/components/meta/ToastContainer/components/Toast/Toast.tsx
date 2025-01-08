import { FC, ReactNode } from 'react';
import styles from './Toast.module.scss';

type ToastProps = {
  header?: ReactNode;
  children: ReactNode;
};

export const Toast: FC<ToastProps> = ({ header, children }: ToastProps) => (
  <div className={styles.textContent}>
    {header && <p>{header}</p>}
    <small>{children}</small>
  </div>
);
