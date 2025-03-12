import cn from 'classnames';
import { FC, HTMLProps, ReactNode } from 'react';
import { FormField, Icon } from '@/components/common/uikit';
import { InputPropsBase } from '@/components/common/uikit/Inputs';
import colors from '@/constants/colors';
import styles from './Search.module.scss';

type Props = InputPropsBase &
  HTMLProps<HTMLInputElement> & {
    tooltip?: ReactNode;
    onSearch: (newValue: string) => void;
  };

export const Search: FC<Props> = ({
  label,
  className,
  error,
  tooltip = null,
  placeholder,
  onSearch,
  value,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.inputFile,
        props.disabled && styles.disabled,
        className,
      )}
    >
      <FormField label={label} tooltip={tooltip}>
        <label className={styles.inputContainer}>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onSearch(e.currentTarget.value)}
            {...props}
          />
          <Icon name="search" color={colors.black[75]} />
        </label>
      </FormField>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
