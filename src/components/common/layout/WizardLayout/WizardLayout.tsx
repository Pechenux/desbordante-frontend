import cn from 'classnames';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { Icon } from '@/components/common/uikit/Icon';
import styles from './WizardLayout.module.scss';

interface Props extends PropsWithChildren {
  header: ReactElement;
  footer: ReactElement;
  className?: string;
  hasBackground?: boolean;
  stickyFooter?: boolean;
}

export const WizardLayout: FC<Props> = ({
  header,
  footer,
  className,
  children,
  hasBackground = true,
  stickyFooter = false,
}) => {
  return (
    <div className={styles.page}>
      {hasBackground && (
        <Icon name="backgroundCreateTask" className={styles.background} />
      )}
      <div className={styles.sectionText}>{header}</div>
      <div className={cn(className, styles.content)}>{children}</div>
      <div className={cn(styles.footer, { [styles.sticky!]: stickyFooter })}>
        {footer}
      </div>
    </div>
  );
};
