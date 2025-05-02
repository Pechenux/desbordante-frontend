'use client';

import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from 'react';
import {
  EqualityConfigMetrics,
  JaccardConfigMetrics,
  LVNormDateDistanceConfigMetrics,
  LVNormNumberDistanceConfigMetrics,
  LcsConfigMetrics,
  LevenshteinConfigMetrics,
  MongeElkanConfigMetrics,
} from '@/api/generated/schema';
import { createQueryFn } from '@/api/services/server';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import {
  ConfigureColumnMatchesProps,
  ConfigureColumnMatchModal,
} from '../ConfigureColumnMatchModal';
import styles from './ConfigureColumnMatchInput.module.scss';

type ConfigureColumnMatchInputProps = ConfigureColumnMatchesProps;

export const displayedMetricsName = {
  [EqualityConfigMetrics.equality]: 'Equality',
  [JaccardConfigMetrics.jaccard]: 'Jaccard',
  [LVNormDateDistanceConfigMetrics.lvnormdatedistance]: 'LVNormDateDistance',
  [LVNormNumberDistanceConfigMetrics.lvnormnumberdistance]:
    'LVNormNumberDistance',
  [LcsConfigMetrics.lcs]: 'LCS',
  [LevenshteinConfigMetrics.levenshtein]: 'Levenstain',
  [MongeElkanConfigMetrics.mongeelkan]: 'Monge-Elkan',
};

export const ConfigureColumnMatchInput: FC<ConfigureColumnMatchInputProps> = ({
  columnMatch,
  onDelete,
  onApply,
}) => {
  const [isOpen, setIsOpen] = useState(!columnMatch);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(
      columnMatch.metrics && columnMatch.left_column && columnMatch.right_column
        ? `${displayedMetricsName[columnMatch.metrics]} ( ${leftColumnOptions![columnMatch.left_column]?.label}, ${rightColumnOptions![columnMatch.right_column]?.label} )`
        : '',
    );
  }, [columnMatch]);

  const [fileIDs] = useAtom<Record<string, string>>(fileIDsAtom);

  const { data } = useQuery({
    queryKey: [`/api/files/ids`, fileIDs['1'], fileIDs['2']],
    queryFn: createQueryFn('/api/files/ids', {
      params: {
        query: {
          ids: fileIDs['1']
            ? [fileIDs['1'], fileIDs['2'] ? fileIDs['2'] : fileIDs['1']]
            : undefined,
        },
      },
    }),
    enabled: !!fileIDs['1'],
  });

  const leftFileInfo = data && data[0];
  const leftColumnOptions =
    (leftFileInfo &&
      leftFileInfo.num_columns &&
      (leftFileInfo.with_header
        ? leftFileInfo.header?.map((column, i) => ({
            label: column,
            value: i,
          }))
        : [...Array(leftFileInfo.num_columns).keys()].map((i) => ({
            label: `Column ${i + 1}`,
            value: i,
          })))) ||
    undefined;

  const rightFileInfo = data && data[1];
  const rightColumnOptions =
    (rightFileInfo &&
      rightFileInfo.num_columns &&
      (rightFileInfo.with_header
        ? rightFileInfo.header?.map((column, i) => ({
            label: column,
            value: i,
          }))
        : [...Array(rightFileInfo.num_columns).keys()].map((i) => ({
            label: `Column ${i + 1}`,
            value: i,
          })))) ||
    undefined;

  return (
    <>
      <ConfigureColumnMatchModal
        onDelete={onDelete}
        onApply={onApply}
        columnMatch={columnMatch}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        leftTableOptions={leftColumnOptions}
        rightTableOptions={rightColumnOptions}
      />
      <label className={styles.inputContainer} onClick={() => setIsOpen(true)}>
        <input
          style={{ width: '100%' }}
          type="text"
          readOnly
          value={inputValue}
          placeholder="Configure column match..."
        />
        <Icon name="settings" color={colors.black[75]} />
      </label>
    </>
  );
};
