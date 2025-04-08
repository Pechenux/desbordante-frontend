'use client';

import cn from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '@/components/common/uikit/Inputs';
import colors from '@/constants/colors';
import { WithError } from '@/types/withError';
import styles from './NumberInput.module.scss';

export type BoundariesType = {
  defaultNum?: number;
  min?: number;
  includingMin?: boolean;
  max?: number;
  includingMax?: boolean;
  digitsAfterDot?: number;
  step?: number;
};

export type NumberInputProps = WithError & {
  value: number[];
  onChange: (newValue: number[]) => void;
  boundaries?: BoundariesType;
  slider?: boolean;
  range?: boolean;
  showBoundariesToolTip?: boolean;
  disabled?: boolean;
};

const toFixed = (num: number, digitsAfterDot: number) =>
  Math.trunc(num * Math.pow(10, digitsAfterDot)) / Math.pow(10, digitsAfterDot);

export const NumberInput: FC<NumberInputProps> = (props) => {
  const {
    value,
    onChange,
    boundaries,
    slider = false,
    range = false,
    error,
    disabled,
  } = props;

  const {
    defaultNum = 0,
    min,
    includingMin = true,
    max,
    includingMax = true,
    digitsAfterDot = 2,
    step = 1e-2,
  } = boundaries || {};

  //const range = value.length === 2;

  let firstRawValue = value[0] ?? defaultNum;
  let secondRawValue = value[1] ?? defaultNum;

  if (range && firstRawValue < secondRawValue) {
    [firstRawValue, secondRawValue] = [secondRawValue, firstRawValue];
  }
  // else if (range && firstRawValue === secondRawValue) {
  //   value.pop();
  // }

  const [firstValue, setFirstValue] = useState(firstRawValue);
  const [secondValue, setSecondValue] = useState(secondRawValue);

  useEffect(() => {
    setFirstValue(firstRawValue);
  }, [firstRawValue]);
  useEffect(() => {
    setSecondValue(secondRawValue);
  }, [secondRawValue]);

  const [textFirstValue, setTextFirstValue] = useState(`${firstValue}`);
  const [textSecondValue, setTextSecondValue] = useState(`${secondValue}`);

  useEffect(() => {
    setTextFirstValue(`${firstValue ?? ''}`);
  }, [firstValue]);
  useEffect(() => {
    setTextSecondValue(`${secondValue ?? ''}`);
  }, [secondValue]);

  const placeInsideBorders = useCallback(
    (s: string): number => {
      const parsed = +s;
      if (!Number.isNaN(parsed)) {
        if (min && parsed <= min) return includingMin ? min : defaultNum;
        if (max && parsed >= max) return includingMax ? max : defaultNum;
        return parsed;
      } else return defaultNum;
    },
    [defaultNum, includingMax, includingMin, max, min],
  );

  const prepareValue = useCallback(
    (s: string): number => {
      const parsed = placeInsideBorders(s);
      if (step) {
        return toFixed(parsed, digitsAfterDot);
      }
      return parsed;
    },
    [digitsAfterDot, placeInsideBorders, step],
  );

  const handleFirstInputChange = useCallback(
    (tempText: string) => setTextFirstValue(tempText),
    [],
  );
  const handleSecondInputChange = useCallback(
    (tempText: string) => setTextSecondValue(tempText),
    [],
  );

  const handleFirstInputBlur = useCallback(
    (newText: string) => {
      const newValue = prepareValue(newText);
      setFirstValue(newValue);
      handleFirstInputChange(newValue.toString());
      onChange([newValue, secondValue ?? defaultNum]);
    },
    [defaultNum, secondValue, handleFirstInputChange, onChange, prepareValue],
  );
  const handleSecondInputBlur = useCallback(
    (newText: string) => {
      const newValue = prepareValue(newText);
      setSecondValue(newValue);
      handleSecondInputChange(newValue.toString());
      onChange([firstValue ?? defaultNum, newValue]);
    },
    [defaultNum, firstValue, handleSecondInputChange, onChange, prepareValue],
  );

  const sliderValue = useMemo(
    () => (range ? [firstValue, secondValue] : firstValue),
    [firstValue, range, secondValue],
  );

  const handleSliderChange = useCallback(
    (newValue: number | number[]) => {
      if (Array.isArray(newValue) && newValue.length === 2) {
        const firstNewValue = prepareValue(`${newValue[0] ?? ''}`);
        const secondNewValue = prepareValue(`${newValue[1] ?? ''}`);
        setFirstValue(firstNewValue);
        setSecondValue(secondNewValue);
        handleFirstInputChange(firstNewValue.toString());
        handleSecondInputChange(secondNewValue.toString());
        onChange([firstNewValue, secondNewValue]);
      }

      if (typeof newValue === 'number') {
        const firstNewValue = prepareValue(`${newValue}`);
        setFirstValue(firstNewValue);
        handleFirstInputChange(firstNewValue.toString());
        onChange([firstNewValue, defaultNum]);
      }
    },
    [
      defaultNum,
      handleFirstInputChange,
      handleSecondInputChange,
      onChange,
      prepareValue,
    ],
  );

  if (value.length < 1 || value.length > 2) {
    throw new Error('Value incorrect');
  }

  if (step && step <= 0) {
    throw new Error('Step incorrect');
  }

  if (step && digitsAfterDot < Math.log10(1 / step)) {
    throw new Error('Numbers after dot incorrect');
  }

  if (min && max && min > max) {
    throw new Error('Incorrect boundaries');
  }

  if (
    (min && defaultNum < min) ||
    (max && defaultNum > max) ||
    (!includingMin && defaultNum === min) ||
    (!includingMax && defaultNum === max)
  ) {
    throw new Error('Default number is outside boundaries');
  }

  if (slider && (min === undefined || max === undefined)) {
    throw new Error('Choose boundaries when showing slider');
  }

  return (
    <div className={styles.inputContainer}>
      <div className={styles.controlContainer}>
        <Text
          value={textFirstValue}
          onChange={(e) => handleFirstInputChange(e.currentTarget.value)}
          onBlur={(e) => handleFirstInputBlur(e.target.value)}
          className={cn(slider && styles.textInputWithSlider)}
          error={error}
          size={slider ? 4 : undefined}
          disabled={disabled}
        />
        {slider && (
          <Slider
            range={range}
            value={sliderValue}
            onChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
            className={styles.sliderTrack}
            trackStyle={{
              height: 2,
              transform: 'translateY(-1px)',
              zIndex: 1,
              backgroundColor: colors.black[100],
            }}
            railStyle={{ height: 1, backgroundColor: colors.black[25] }}
            allowCross={false}
            dotStyle={{
              borderRadius: 5,
              height: 8,
              bottom: 0,
              borderWidth: 1,
              width: 0,
              borderColor: colors.black[25],
            }}
            handleRender={(origin) => (
              <div {...origin.props} className={styles.sliderHandle} />
            )}
            disabled={disabled}
          />
        )}
        {range && (
          <>
            {!slider && '~'}
            <Text
              value={textSecondValue}
              onChange={(e) => handleSecondInputChange(e.currentTarget.value)}
              onBlur={(e) => handleSecondInputBlur(e.target.value)}
              className={cn(slider && styles.textInputWithSlider)}
              error={error}
              size={slider ? 4 : undefined}
              disabled={disabled}
            />
          </>
        )}
      </div>
      <div className={styles.description}>
        {min !== undefined && includingMin ? '[' : '('}
        {min !== undefined ? min : '-∞'}
        {'; '}
        {max !== undefined ? max : '+∞'}
        {max !== undefined && includingMax ? ']' : ')'}
        {step !== undefined && slider && `, step: ${step}`}
        {digitsAfterDot !== undefined &&
          !slider &&
          `, precision: ${digitsAfterDot} digits`}
      </div>
    </div>
  );
};
