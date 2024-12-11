import cn from 'classnames';
import ReactSelect, {
  Props as ReactSelectProps,
  components as ReactSelectComponents,
} from 'react-select';
import { Icon } from '../../Icon';
import { OptionBadge } from './components/OptionBadge';
import styles from './Select.module.scss';

/**
 * Option badge type
 */
export type Badge = {
  label: string;
  style?: string;
};
/**
 * Select option type
 */
export type Option<TValue = string> = {
  label: string;
  value: TValue;
  badges?: Badge[];
};

export type SelectProps<
  TValue = string,
  IsMulti extends boolean = false,
> = Omit<
  ReactSelectProps<Option<TValue>, IsMulti>,
  'components' | 'classNames'
> & {
  error?: boolean;
};

/**
 * Custom select with brand styling
 */
export const Select = function <
  TValue = string,
  IsMulti extends boolean = false,
>(props: SelectProps<TValue, IsMulti>) {
  return (
    <ReactSelect
      {...props}
      // set base class name
      className={cn(props.className, styles.selectContainer)}
      // set classnames for inner components
      classNames={{
        control: ({ isFocused }) =>
          cn(styles.control, {
            [styles.error!]: props.error,
            [styles.focused!]: isFocused,
          }),
        valueContainer: ({ isMulti }) =>
          cn(styles.valueContainer, { [styles.isSingle!]: !isMulti }),
        singleValue: () => styles.singleValue!,
        multiValue: () => styles.multiValue!,
        multiValueLabel: () => styles.multiValueLabel!,
        multiValueRemove: () => styles.multiValueRemove!,
        placeholder: () => styles.placeholder!,
        input: () => styles.input!,
        indicatorsContainer: () => styles.indicatorsContainer!,
        indicatorSeparator: ({ isMulti }) =>
          cn(styles.indicatorSeparator, { [styles.hideSeparator!]: !isMulti }),
        dropdownIndicator: () => styles.indicatorIcon!,
        clearIndicator: () => styles.indicatorIcon!,
        option: ({ isFocused, isSelected, data }) =>
          cn(styles.option, {
            [styles.once!]: data.badges?.length === 1,
            [styles.focused!]: isFocused,
            [styles.selected!]: isSelected,
          }),
        noOptionsMessage: () => cn(styles.option, styles.noOptionsMessage),
        loadingMessage: () => cn(styles.option, styles.noOptionsMessage),
      }}
      // set custom components that need extra logic or custom icon
      components={{
        DropdownIndicator: (props) => (
          <ReactSelectComponents.DropdownIndicator {...props}>
            <Icon name="angle" size={24} />
          </ReactSelectComponents.DropdownIndicator>
        ),
        ClearIndicator: (props) => (
          <ReactSelectComponents.ClearIndicator {...props}>
            <Icon name="cross" size={24} />
          </ReactSelectComponents.ClearIndicator>
        ),
        MultiValueLabel: (props) => (
          <div
            className={styles.multiValueLabelContainer}
            title={
              typeof props.children === 'string' ? props.children : undefined
            }
          >
            <ReactSelectComponents.MultiValueLabel {...props} />
          </div>
        ),
        MultiValueRemove: (props) => (
          <ReactSelectComponents.MultiValueRemove {...props}>
            <Icon name="cross" size={24} />
          </ReactSelectComponents.MultiValueRemove>
        ),
        Option: (props) => (
          <div
            className={styles.optionContainer}
            title={
              (typeof props.children === 'string' ? props.children : '') +
              (props.data.badges
                ? ': ' + props.data.badges.map((badge) => badge.label).join(' ')
                : '')
            }
          >
            <ReactSelectComponents.Option {...props}>
              {props.children}
              {props.data.badges?.map((elem, i) => (
                <OptionBadge key={'badge' + elem.label + i} style={elem.style}>
                  {elem.label}
                </OptionBadge>
              ))}
            </ReactSelectComponents.Option>
          </div>
        ),
      }}
    />
  );
};
