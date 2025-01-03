import cn from 'classnames';
import { FC, HTMLProps, useId } from 'react';
import { WithClassname } from '@/types/withClassname';
import { WithError } from '@/types/withError';
import styles from './Text.module.scss';

export type TextProps = HTMLProps<HTMLInputElement> & WithClassname & WithError;

export const Text: FC<TextProps> = ({ id, error, className, ...props }) => {
  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <input
      {...props}
      id={inputId}
      className={cn(className, styles.textInput, {
        [styles.error!]: Boolean(error),
      })}
    />
  );
};
