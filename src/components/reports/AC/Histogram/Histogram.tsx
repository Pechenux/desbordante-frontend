'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { NumberInputProps } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { operationIcons } from '../ACInstance';

import { Operation } from '../ACInstance';
import { myData } from '../FakeData/data4Histogram';
import { NumberInputWithButton } from '../NumberInputWithButton';
import styles from './Histogram.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = (props: any) => {
  const { payload } = props;
  if (payload && payload.length) {
    const { associatedInterval, range, option, valuesInRange } =
      payload[0].payload;
    return (
      <div className={styles.customTooltip}>
        <p>{`Range: [${range[0]}, ${range[1]}]`}</p>
        <p>{'Values in range: ' + valuesInRange}</p>
        {option === 'default' && (
          <p>{`Associated interval: [${associatedInterval[0]}, ${associatedInterval[1]}]`}</p>
        )}
      </div>
    );
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  const color =
    payload.option === 'default' ? colors.primary[100] : colors.black[50];

  return (
    <Rectangle
      widths={80}
      x={Number(x)}
      y={Number(y)}
      width={width}
      height={height}
      fill={color}
    />
  );
};

interface ShownDataType {
  range: number[];
  median: number;
  valuesInRange: number;
  option: 'default' | 'outlier';
  associatedInterval: number[];
}

export const Histogram = () => {
  const [activeInterval, setActiveInterval] = useState(null);

  const { operation, histogramData } = myData.taskInfo.data;
  const { attributes, granularity, data } = histogramData;

  const [inputValue, setInputValue] = useState<number[]>([granularity]);
  const OperationIcon = operationIcons[operation as Operation];

  const handle = (e) => {
    setInputValue(e);
    console.log(111, e);
  };

  console.log(inputValue);
  const numberProps: NumberInputProps = {
    value: inputValue,
    onChange: handle,
    boundaries: {
      defaultNum: granularity,
      min: 1,
      includingMin: true,
      digitsAfterDot: 0,
      step: 1,
    },
  };

  const fillActiveBar = (entry: ShownDataType) => {
    if (
      activeInterval &&
      entry.associatedInterval &&
      entry.associatedInterval[0] === activeInterval[0] &&
      entry.associatedInterval[1] === activeInterval[1]
    ) {
      return colors.primary[75];
    }
    if (entry.option === 'default') {
      return colors.black[75];
    }
    return colors.black[25];
  };

  return (
    <>
      <div className={styles.header}>
        <NumberInputWithButton
          numberProps={numberProps}
          buttonText="Change"
          label="Granularity"
        />
        <div className={styles.attributes}>
          <div className={styles.attribute}>{attributes.attribute1}</div>
          {OperationIcon}
          <div className={styles.attribute}>{attributes.attribute2}</div>
        </div>
      </div>

      <div className={styles.histogramContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart barCategoryGap={2} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="median"
              type="number"
              domain={([dataMin, dataMax]) => [
                Math.floor(dataMin),
                Math.ceil(dataMax),
              ]}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              onMouseEnter={(props) =>
                setActiveInterval(props.associatedInterval)
              }
              onMouseLeave={() => setActiveInterval(null)}
              dataKey="valuesInRange"
              activeBar={renderActiveBar}
            >
              {data.map((entry) => (
                <Cell
                  key={`cell-${entry.median}`}
                  fill={fillActiveBar(entry)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
