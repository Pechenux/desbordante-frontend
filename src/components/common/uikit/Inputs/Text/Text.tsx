import cn from 'classnames';
import { FC, HTMLProps } from 'react';
import { WithClassname } from '@/types/withClassname';
import { WithError } from '@/types/withError';
import styles from './Text.module.scss';

export type TextProps = HTMLProps<HTMLInputElement> & WithClassname & WithError;

export const Text: FC<TextProps> = ({ id, error, className, ...props }) => {
  return (
    <input
      {...props}
      id={id}
      className={cn(styles.textInput, className, {
        [styles.error!]: Boolean(error),
      })}
    />
  );
};
