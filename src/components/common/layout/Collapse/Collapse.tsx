import { FC, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import { WithChildren } from '@/types/withChildren';
import styles from './Collapse.module.scss';

type CollapseProps = WithChildren & {
  title: string;
};

export const Collapse: FC<CollapseProps> = ({ title, children }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <div>
      <h5
        className={styles.title}
        onClick={() => setIsShown((isShown) => !isShown)}
      >
        {title}{' '}
        <Icon name="angle" size={20} orientation={isShown ? 'up' : 'down'} />
      </h5>
      {isShown && <div>{children}</div>}
    </div>
  );
};
