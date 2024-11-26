import { FC } from 'react';
import { WithChildren } from '@/types/withChildren';
import styles from './CollapsableView.module.scss';

type Props = WithChildren & {
  title: string;
  onClick: () => void;
};

const CollapsableView: FC<Props> = ({ children, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.collabsableOutput}>{children}</div>
      <div className={styles.absolute}>
        ...
        <button className={styles.buttonShow} onClick={onClick}>
          Show&nbsp;more
        </button>
      </div>
    </div>
  );
};

export default CollapsableView;
