'use client';

import cn from 'classnames';
import { useCallback, useContext, useMemo } from 'react';
import ReactSelect, {
  OnChangeValue,
  PropsValue,
  components as ReactSelectComponents,
  Props as ReactSelectProps,
  SingleValue,
} from 'react-select';
import { z } from 'zod';
import { PortalRootContext } from '@/components/meta';
import { WithError } from '@/types/withError';
import { Icon } from '../../Icon';
import { OptionBadge } from './components/OptionBadge';
import styles from './Select.module.scss';

export { badgePrimary, badgeSecondary } from './components/OptionBadge';

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
export type SelectOption<TValue = string> = {
  label: string;
  value: TValue;
  badges?: Badge[];
};

export type SelectProps<TValue = string, IsMulti extends boolean = false> = {
  value?: OnChangeValue<TValue, IsMulti>;
  onChange?: (newValue: OnChangeValue<TValue, IsMulti>) => void;
} & Omit<
  ReactSelectProps<SelectOption<TValue>, IsMulti>,
  'styles' | 'components' | 'classNames' | 'value' | 'onChange'
> &
  WithError;

const optionParser = z.object({
  label: z.string(),
  value: z.any(),
  badges: z.optional(
    z.object({ label: z.string(), style: z.optional(z.string()) }).array(),
  ),
});

const isSingleOption = function <TValue = string>(
  value: PropsValue<SelectOption<TValue>>,
): value is SingleValue<SelectOption<TValue>> {
  return optionParser.safeParse(value).success;
};

/**
 * Custom select with brand styling
 */
export const SelectComponent = function <
  TValue = string,
  IsMulti extends boolean = false,
>({
  value,
  onChange,
  error,
  menuPortalTarget,
  ...props
}: SelectProps<TValue, IsMulti>) {
  const portalRootRef = useContext(PortalRootContext);

  const flatOptions = useMemo(
    () =>
      props.options?.flatMap((optionOrGroup) =>
        'options' in optionOrGroup ? optionOrGroup.options : optionOrGroup,
      ),
    [props.options],
  );

  const getOption = useCallback(
    (
      value?: PropsValue<TValue>,
    ): PropsValue<SelectOption<TValue>> | undefined => {
      if (Array.isArray(value)) {
        return flatOptions?.filter((option) => value.includes(option.value));
      } else {
        return flatOptions?.find((option) => option.value === value);
      }
    },
    [flatOptions],
  );

  // Dirty hack to make things work
  const handleChange = useCallback(
    (newOptionValue: OnChangeValue<SelectOption<TValue>, IsMulti>) => {
      if (!onChange) return;

      if (!props.isMulti && isSingleOption(newOptionValue)) {
        onChange(
          (newOptionValue?.value ?? null) as OnChangeValue<TValue, IsMulti>,
        );
      }

      if (props.isMulti && !isSingleOption(newOptionValue)) {
        onChange(
          newOptionValue.map((option) => option.value) as OnChangeValue<
            TValue,
            IsMulti
          >,
        );
      }
    },
    [onChange, props.isMulti],
  );

  return (
    <ReactSelect
      menuPortalTarget={menuPortalTarget ?? portalRootRef?.current}
      {...props}
      value={getOption(value)}
      onChange={handleChange}
      // set base class name
      className={cn(props.className, styles.selectContainer)}
      // reset inner styles
      styles={{
        option: () => ({}),
        valueContainer: (styles) => ({ ...styles, padding: 0 }),
        indicatorSeparator: (styles) => ({ ...styles, margin: 0 }),
      }}
      // set classnames for inner components
      classNames={{
        control: ({ isFocused }) =>
          cn(styles.control, {
            [styles.error!]: Boolean(error),
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
              <div className={styles.optionText}>{props.children}</div>
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

export type SelectComponentType = typeof SelectComponent;
