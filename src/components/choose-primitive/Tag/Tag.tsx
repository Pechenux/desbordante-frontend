import { FC } from 'react';
import styles from './Tag.module.scss';

interface TagProps {
  tagName: string;
}

const Tag: FC<TagProps> = ({ tagName }) => {
  return <div className={styles.tagContainer}>{'# ' + tagName}</div>;
};

export default Tag;
