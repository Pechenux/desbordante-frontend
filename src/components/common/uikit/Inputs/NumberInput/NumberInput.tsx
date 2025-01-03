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
  digits?: number;
  step?: number;
};

export type NumberInputProps = WithError & {
  value: number[];
  onChange: (newValue: number[]) => void;
  boundaries?: BoundariesType;
  slider?: boolean;
  showBoundariesToolTip?: boolean;
};

const toFixed = (num: number, digits: number) =>
  Math.trunc(num * Math.pow(10, digits)) / Math.pow(10, digits);

export const NumberInput: FC<NumberInputProps> = (props) => {
  const { value, onChange, boundaries, slider = false, error } = props;

  const {
    defaultNum = 0,
    min,
    includingMin,
    max,
    includingMax,
    digits = 2,
    step = 1e-2,
  } = boundaries || {};

  const range = value.length === 2;

  if (value.length < 1 || value.length > 2) {
    throw new Error('Value incorrect');
  }

  if (step && step <= 0) {
    throw new Error('Step incorrect');
  }

  if (step && digits < Math.log10(1 / step)) {
    throw new Error('Numbers after dot incorrect');
  }

  let firstRawValue = value[0] ?? defaultNum;
  let secondRawValue = value[1] ?? defaultNum;
  if (range && firstRawValue < secondRawValue) {
    [firstRawValue, secondRawValue] = [secondRawValue, firstRawValue];
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
        return toFixed(parsed, digits);
      }
      return parsed;
    },
    [digits, placeInsideBorders, step],
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

  return (
    <div className={styles.inputContainer}>
      <div className={styles.controlContainer}>
        <Text
          value={textFirstValue}
          onChange={(e) => handleFirstInputChange(e.currentTarget.value)}
          onBlur={(e) => handleFirstInputBlur(e.target.value)}
          className={cn({ [styles.textInputWithSlider!]: slider })}
          error={error}
          size={slider ? 4 : undefined}
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
          />
        )}
        {range && (
          <>
            {!slider && '~'}
            <Text
              value={textSecondValue}
              onChange={(e) => handleSecondInputChange(e.currentTarget.value)}
              onBlur={(e) => handleSecondInputBlur(e.target.value)}
              className={cn({ [styles.textInputWithSlider!]: slider })}
              error={error}
              size={slider ? 4 : undefined}
            />
          </>
        )}
      </div>
      <div className={styles.description}>
        {min && includingMin ? '[' : '('}
        {min ? min : '-∞'}
        {'; '}
        {max ? max : '+∞'}
        {max && includingMax ? ']' : ')'}
        {step && slider && `, step: ${step}`}
        {digits && !slider && `, precision: ${digits} digits`}
      </div>
    </div>
  );
};
