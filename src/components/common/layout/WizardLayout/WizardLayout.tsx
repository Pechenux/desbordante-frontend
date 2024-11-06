import cn from 'classnames';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { Icon } from '@/components/common/uikit/Icon';
import styles from './WizardLayout.module.scss';

interface Props extends PropsWithChildren {
  header: ReactElement;
  footer: ReactElement;
  className?: string;
  hasBackground?: boolean;
}

const WizardLayout: FC<Props> = ({
  header,
  footer,
  className,
  children,
  hasBackground,
}) => {
  return (
    <div className={styles.page}>
      {hasBackground && (
        <Icon name="backgroundCreateTask" className={styles.background} />
      )}
      <div className={styles.sectionText}>{header}</div>
      <div className={cn(className, styles.content)}>{children}</div>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

export default WizardLayout;
