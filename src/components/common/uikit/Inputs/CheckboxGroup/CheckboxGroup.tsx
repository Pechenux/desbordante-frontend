import cn from 'classnames';
import { useCallback, useMemo } from 'react';
import styles from './CheckboxGroup.module.scss';

type CheckboxProps<> = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  variant?: 'outline' | 'simple';
};

const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  variant = 'outline',
}: CheckboxProps) => {
  return (
    <div
      className={styles.checkboxContainer}
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        className={cn(styles.checkboxInput, {
          [styles.checkboxError!]: error,
          [styles.simple!]: variant === 'simple',
        })}
      />
      <div className={styles.checkboxLabel}>{label}</div>
    </div>
  );
};

export type CheckboxGroupProps<T = string> = {
  options: { label: string; value: T }[];
  values: T[];
  onChange: (newValue: T[]) => void;
  error?: boolean;
};

export const CheckboxGroup = function <T = string>({
  options,
  values,
  onChange,
  error,
}: CheckboxGroupProps<T>) {
  const handleCheckboxClick = useCallback(
    (value: T) => (checked: boolean) => {
      const temp = new Set(values);

      if (checked) {
        temp.add(value);
      } else {
        temp.delete(value);
      }

      onChange(Array.from(temp));
    },
    [onChange, values],
  );

  const list = useMemo(
    () =>
      options.map(({ label, value }) => (
        <Checkbox
          key={JSON.stringify(value)}
          label={label}
          checked={values.includes(value)}
          onChange={handleCheckboxClick(value)}
          error={error}
        />
      )),
    [error, handleCheckboxClick, options, values],
  );

  return <div className={styles.checkboxGroupContainer}>{list}</div>;
};
