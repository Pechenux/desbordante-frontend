import cn from 'classnames';
import { FC, HTMLProps } from 'react';
import styles from './OptionBadge.module.scss';

type OptionBadgeProps = {
  style?: string;
} & HTMLProps<HTMLDivElement>;

export const OptionBadge: FC<OptionBadgeProps> = ({
  style,
  className,
  ...props
}: OptionBadgeProps) => (
  <div
    className={cn(className, styles.wrapper, style ?? styles.primary)}
    {...props}
  >
    {props.children}
  </div>
);

export const badgePrimary = styles.primary;
export const badgeSecondary = styles.secondary;
