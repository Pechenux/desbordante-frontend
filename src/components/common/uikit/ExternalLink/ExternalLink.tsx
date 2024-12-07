import cn from 'classnames';
import Link, { LinkProps } from 'next/link';
import { FC, memo } from 'react';
import { WithChildren } from '@/types/withChildren';
import { WithClassname } from '@/types/withClassname';
import { Icon } from '../Icon';
import styles from './ExternalLink.module.scss';

export type ExternalLinkProps = LinkProps & WithChildren & WithClassname;

const ExternalLinkComponent: FC<ExternalLinkProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Link
      className={cn(className, styles.externalLink)}
      target="_blank"
      {...props}
    >
      {children}
      <div className={styles.imageWrapper}>
        <Icon name="externalLink" alt="link" size={16} />
      </div>
    </Link>
  );
};

export const ExternalLink = memo(ExternalLinkComponent);
