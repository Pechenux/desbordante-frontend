import cn from 'classnames';
import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLProps,
  ReactNode,
  useId,
} from 'react';
import { Icon } from '@/components/common/uikit';
import { InputPropsBase } from '@/components/common/uikit/Inputs';
import Tooltip from '@/components/common/uikit/Tooltip';
import colors from '@/constants/colors';
import styles from './Search.module.scss';

type Props = InputPropsBase &
  HTMLProps<HTMLInputElement> & {
    tooltip?: ReactNode;
    onClick?: () => void;
  };

const Search: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { id, label, className, error, tooltip, placeholder, onClick, ...props },
  //ref,
) => {
  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <div
      className={cn(
        styles.inputFile,
        props.disabled && styles.disabled,
        className,
      )}
    >
      <div className={styles.top}>
        {label && <label htmlFor={inputId}>{label}</label>}
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </div>
      <label className={styles.inputContainer} onClick={onClick}>
        <input type="text" placeholder={placeholder} {...props} />
        <Icon name="search" color={colors.black[75]} />
      </label>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default forwardRef(Search);
