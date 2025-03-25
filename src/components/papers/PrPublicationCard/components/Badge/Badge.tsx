import cn from 'classnames';
import { HTMLProps } from 'react';
import styles from './Badge.module.scss';

interface BadgeProps extends HTMLProps<HTMLDivElement> {
  color?: string;
}

export const Badge = ({
  color,
  children,
  className,
  style,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={cn(className, styles.badge)}
      style={{ ...style, backgroundColor: color }}
      {...props}
    >
      {children}
    </div>
  );
};
