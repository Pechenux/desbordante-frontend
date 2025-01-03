import cn from 'classnames';
import { FC } from 'react';
import { WithChildren } from '@/types/withChildren';
import { Tooltip } from '../Tooltip';
import styles from './FormField.module.scss';

export type FormFieldParams = {
  label?: string;
  tooltip?: string;
  id?: string;
  error?: string;
  disabled?: boolean;
};

type FormFieldProps = WithChildren & FormFieldParams;

/**
 * Component that adds label, tooltip and error text to the any input passed inside
 * @param Props Check FormFieldProps
 * @returns Wrapped input
 */
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
      {(label || tooltip) && (
        <div className={styles.labelContainer}>
          {label && (
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          )}
          {tooltip && <Tooltip>{tooltip}</Tooltip>}
        </div>
      )}
      <div className={styles.inputContainer}>{children}</div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
