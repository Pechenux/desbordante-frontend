'use client';

import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from 'react';
import {
  EqualityConfigMetrics,
  JaccardConfigMetrics,
  LcsConfigMetrics,
  LevenshteinConfigMetrics,
  LVNormDateDistanceConfigMetrics,
  LVNormNumberDistanceConfigMetrics,
  MongeElkanConfigMetrics,
} from '@/api/generated/schema';
import { createQueryFn } from '@/api/services/server';
import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { ColumnMatchType } from '../ColumnMatchesInput';
import { ConfigureColumnMatchModal } from '../ConfigureColumnMatchModal';
import styles from './ConfigureColumnMatchInput.module.scss';

type ConfigureColumnMatchInputProps = {
  columnMatch: ColumnMatchType;
  onDelete: (currentColumnMatch: ColumnMatchType) => void;
  onApply: (
    currentColumnMatch: ColumnMatchType,
    newColumnMatch: ColumnMatchType,
  ) => void;
};

export const displayedMetricsName = {
  [EqualityConfigMetrics.equality]: 'Equality',
  [JaccardConfigMetrics.jaccard]: 'Jaccard',
  [LVNormDateDistanceConfigMetrics.date_difference]: 'LVNormDateDistance',
  [LVNormNumberDistanceConfigMetrics.number_difference]: 'LVNormNumberDistance',
  [LcsConfigMetrics.lcs]: 'LCS',
  [LevenshteinConfigMetrics.levenshtein]: 'Levenstain',
  [MongeElkanConfigMetrics.monge_elkan]: 'Monge-Elkan',
};

export const ConfigureColumnMatchInput: FC<ConfigureColumnMatchInputProps> = ({
  columnMatch,
  onDelete,
  onApply,
}) => {
  const [isOpen, setIsOpen] = useState(!columnMatch);
  const [inputValue, setInputValue] = useState<string>('');

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
      leftFileInfo.header?.map((column, i) => ({
        label: leftFileInfo.with_header ? column : `Column ${i}`,
        value: i,
      }))) ||
    undefined;

  const rightFileInfo = data && data[1];
  const rightColumnOptions =
    (rightFileInfo &&
      rightFileInfo.header?.map((column, i) => ({
        label: rightFileInfo.with_header ? column : `Column ${i}`,
        value: i,
      }))) ||
    undefined;

  useEffect(() => {
    setInputValue(
      leftColumnOptions &&
        rightColumnOptions &&
        columnMatch.left_column > -1 &&
        columnMatch.right_column > -1
        ? `${displayedMetricsName[columnMatch.metrics]} ( ${leftColumnOptions[columnMatch.left_column]?.label}, ${rightColumnOptions[columnMatch.right_column]?.label} )`
        : '',
    );
  }, [columnMatch, leftColumnOptions, rightColumnOptions]);

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
