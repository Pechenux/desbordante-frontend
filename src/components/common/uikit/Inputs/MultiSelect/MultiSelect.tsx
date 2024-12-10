import cn from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useContext,
} from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';
import { InputPropsBase } from '@/components/common/uikit/Inputs';
import { Tooltip } from '@/components/common/uikit/Tooltip';
import { PortalRootContext } from '@/components/meta';
import customComponents, { colorStyles } from './customComponents';
import styles from './MultiSelect.module.scss';

export type Option<TValue = string> = {
  label: string;
  value: TValue;
};

export type MultiSelectProps<TValue = string> = InputPropsBase &
  ReactSelectProps<Option<TValue>, true> & {
    tooltip?: ReactNode;
  };

// Can't recreate explicit type
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type RefElement = any;

const MultiSelectComponent: ForwardRefRenderFunction<
  RefElement,
  MultiSelectProps
> = ({ label, error, tooltip, className, id, components, ...props }, ref) => {
  const portalRootRef = useContext(PortalRootContext);
  return (
    <div
      className={cn(
        styles.inputSelect,
        props.isDisabled && styles.disabled,
        className,
      )}
    >
      <div className={styles.top}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </div>
      <ReactSelect
        isMulti
        className={cn(styles.multiSelect, error && styles.error)}
        {...props}
        ref={ref}
        styles={colorStyles}
        menuPortalTarget={portalRootRef?.current}
        menuPosition="fixed"
        components={{ ...customComponents, ...components }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        error={error}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export const MultiSelect = forwardRef(MultiSelectComponent) as <
  TValue = string,
>(
  props: MultiSelectProps<TValue> & { ref?: ForwardedRef<RefElement> },
) => ReturnType<typeof MultiSelectComponent>;
