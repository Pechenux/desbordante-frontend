import cn from 'classnames';
import { ComponentType } from 'react';
import {
  StylesConfig,
  components,
  ControlProps,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
  PlaceholderProps,
  InputProps,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  IndicatorsContainerProps,
  OptionProps,
  NoticeProps,
} from 'react-select';
import { Icon } from '@/components/common/uikit/Icon';
import { InputPropsBase } from '@/components/common/uikit/Inputs';
import { Option as OptionType } from './MultiSelect';
import { OptionBadge } from './OptionBadge';
import badgeStyles from './OptionBadge/OptionBadge.module.scss';
import styles from './MultiSelect.module.scss';

export const colorStyles: StylesConfig<OptionType, true> = {
  control: () => ({}),
  valueContainer: (styles) => ({ ...styles, padding: 0 }),
  indicatorSeparator: (styles) => ({ ...styles, margin: 0 }),
};

type Badge = {
  label: string;
  style?: string;
};

type OptionWithBadges = OptionType<string | number | boolean> & {
  badges?: Badge[];
};

const Control: ComponentType<
  ControlProps<OptionType, true> & InputPropsBase
> = (props) => (
  <components.Control
    className={cn(
      styles.control,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      props.selectProps.error && styles.error,
      props.isFocused && styles.focused,
    )}
    {...props}
  />
);

const MultiValueContainer: ComponentType<
  MultiValueGenericProps<OptionType, true> & InputPropsBase
> = (props) => <components.MultiValueContainer {...props} />;

const MultiValue: ComponentType<
  MultiValueProps<OptionType, true> & InputPropsBase
> = (props) => (
  <components.MultiValue className={styles.multiValue} {...props} />
);

const MultiValueLabel: ComponentType<
  MultiValueGenericProps<OptionType, true> & InputPropsBase
> = (props) => (
  <div
    {...props.innerProps}
    className={cn(styles.multiValueLabel, props.error && styles.error)}
    title={props.children as string}
  >
    {props.children}
  </div>
);

const MultiValueRemove: ComponentType<
  MultiValueRemoveProps<OptionType, true> & InputPropsBase
> = (props) => (
  <div
    {...props.innerProps}
    className={cn(styles.multiValueRemove, props.error && styles.error)}
  >
    <Icon name="cross" />
  </div>
);

const Placeholder: ComponentType<
  PlaceholderProps<OptionType, true> & InputPropsBase
> = (props) => (
  <components.Placeholder className={styles.placeholder} {...props} />
);

const Input: ComponentType<InputProps<OptionType, true> & InputPropsBase> = (
  props,
) => (
  <components.Input
    className={cn(styles.input, props.value && styles.hasValue)}
    {...props}
  />
);

const ClearIndicator: ComponentType<
  ClearIndicatorProps<OptionType, true> & InputPropsBase
> = ({ innerProps }) => (
  <div className={styles.clearIndicator} {...innerProps}>
    <Icon name="cross" />
  </div>
);

const DropdownIndicator: ComponentType<
  DropdownIndicatorProps<OptionType, true> & InputPropsBase
> = ({ innerProps }) => (
  <div className={styles.dropdownIndicator} {...innerProps}>
    <Icon name="angle" />
  </div>
);

const IndicatorsContainer: ComponentType<
  IndicatorsContainerProps<OptionType, true> & InputPropsBase
> = (props) => (
  <components.IndicatorsContainer
    className={styles.indicatorsContainer}
    {...props}
  />
);

export const Option: ComponentType<
  OptionProps<OptionType, true> & InputPropsBase
> = ({ innerProps, innerRef, children, isFocused, isSelected, data }) => {
  const optionData = data as OptionWithBadges;

  return (
    <div
      className={cn(
        styles.option,
        optionData.badges?.length == 1 && styles.once,
        isFocused && styles.focused,
        isSelected && styles.selected,
      )}
      {...innerProps}
      ref={innerRef}
      title={
        (children as string) +
        optionData.badges?.map((elem) => (' ' + elem.label) as string)
      }
    >
      <div className={styles.optionText}>{children}</div>
      {optionData.badges &&
        optionData.badges?.map((elem, i) => (
          <OptionBadge
            key={(children as string) + '_Badge' + i}
            style={elem.style ? elem.style : badgeStyles.secondary}
          >
            {elem.label}
          </OptionBadge>
        ))}
    </div>
  );
};

const NoOptionsMessage: ComponentType<
  NoticeProps<OptionType, true> & InputPropsBase
> = ({ innerProps, children }) => (
  <div className={cn(styles.option, styles.noOptionsMessage)} {...innerProps}>
    {children}
  </div>
);

const LoadingMessage: ComponentType<
  NoticeProps<OptionType, true> & InputPropsBase
> = ({ innerProps, children }) => (
  <div className={cn(styles.option, styles.noOptionsMessage)} {...innerProps}>
    {children}
  </div>
);

const customComponents = {
  Control,
  MultiValueContainer,
  MultiValue,
  MultiValueLabel,
  MultiValueRemove,
  Placeholder,
  Input,
  ClearIndicator,
  DropdownIndicator,
  IndicatorsContainer,
  Option,
  NoOptionsMessage,
  LoadingMessage,
};

export default customComponents;
