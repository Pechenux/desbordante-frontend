import { FC } from 'react';
import styles from './Tag.module.scss';

interface TagProps {
  tagName: string;
}

export const Tag: FC<TagProps> = ({ tagName }) => {
  return <div className={styles.tagContainer}>{'# ' + tagName}</div>;
};
