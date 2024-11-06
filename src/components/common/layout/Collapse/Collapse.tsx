import cn from 'classnames';
import { FC, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import { WithChildren } from '@/types/withChildren';
import styles from './Collapse.module.scss';

type Props = WithChildren & {
  title: string;
  className?: string;
};

export const Collapse: FC<Props> = ({ title, className, children }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <div className={styles.root}>
      <h5
        className={cn(className, !isShown && styles.collapsed, styles.title)}
        onClick={() => setIsShown((isShown) => !isShown)}
      >
        {title}{' '}
        <Icon name="angle" size={20} orientation={isShown ? 'up' : 'down'} />
      </h5>
      {isShown && <div>{children}</div>}
    </div>
  );
};
