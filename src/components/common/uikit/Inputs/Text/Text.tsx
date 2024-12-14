import cn from 'classnames';
import { FC, HTMLProps, useId } from 'react';
import { WithError } from '@/types/withError';
import styles from './Text.module.scss';

export type TextProps = HTMLProps<HTMLInputElement> & WithError;

export const Text: FC<TextProps> = ({ id, error, ...props }) => {
  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <input
      {...props}
      id={inputId}
      className={cn(styles.textInput, { [styles.error!]: Boolean(error) })}
    />
  );
};
