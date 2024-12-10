import cn from 'classnames';
import { FC } from 'react';
import { WithChildren } from '@/types/withChildren';
import { Tooltip } from '../Tooltip';
import styles from './FormField.module.scss';

export type FormFieldProps = WithChildren & {
  label?: string;
  tooltip?: string;
  id?: string;
  error?: string;
  disabled?: boolean;
};

// FIXME add docs
export const FormField: FC<FormFieldProps> = ({
  label,
  tooltip,
  id,
  error,
  disabled,
  children,
}) => {
  return (
    <div
      className={cn(styles.fieldContainer, {
        [styles.disabled!]: disabled,
      })}
    >
      <div className={styles.labelContainer}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </div>
      <div className={styles.inputContainer}>{children}</div>
      <div className={styles.errorContainer}>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};
