import { FC, useMemo } from 'react';

import { SchemaHighlight } from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit';
import { Row, Table, TableProps } from '../../../ScrollableNodeTable';
import styles from './MFDTable.module.scss';

type MFDTableProps = {
  clusterNumber: number;
  totalCount: number;
  highlights: SchemaHighlight[];
  isFullValueShown: boolean;
  insertedRow?: {
    position: number;
    data: SchemaHighlight;
  };
  insertRow: (furthestIndex: number, rowIndex: number) => void;
  closeInsertedRow: () => void;
  className?: string;
};

const getRowColor: (
  withinLimit: boolean,
  index: number,
  isHighlighted: boolean,
) => string = (withinLimit, index, isHighlighted) => {
  if (withinLimit) {
    if (isHighlighted) {
      return styles.greenHighlighted!;
    } else {
      return index % 2 === 0 ? styles.greenEven! : styles.greenOdd!;
    }
  } else {
    if (isHighlighted) {
      return styles.redHighlighted!;
    } else {
      return index % 2 === 0 ? styles.redEven! : styles.redOdd!;
    }
  }
};

const getMFDRow: (
  highlight: SchemaHighlight,
  position: number,
  isHighlighted: boolean,
  isFullValueShown: boolean,
  callbackFunction: () => void,
) => Row = (
  highlight,
  position,
  isHighlighted,
  isFullValueShown,
  callbackFunction,
) => {
  const highlight_string_value = highlight.value.join(', ');

  return {
    items: [
      highlight.within_limit ? ( // icon
        <Icon className={styles.checkmark} name="check" size={20} />
      ) : (
        <Icon className={styles.cross} name="cross" size={20} />
      ),
      highlight.max_distance, // maximum distance
      highlight.data_index, // index
      <div // furthest point index or close icon
        key={`furthestIndex-${highlight.highlight_index}`}
        onClick={callbackFunction}
        className={styles.clickableIndex}
      >
        {isHighlighted ? (
          <Icon name="angleArrow" size={14} />
        ) : (
          highlight.furthest_data_index
        )}
      </div>,
      <div // value
        key={`value-${highlight_string_value}`}
        className={!isFullValueShown ? styles.valueText : undefined}
        title={highlight_string_value}
      >
        {highlight_string_value}
      </div>,
    ],
    style: getRowColor(highlight.within_limit, position, isHighlighted),
    globalIndex: isHighlighted ? `Highlight-${position}` : position,
  };
};

export const MFDTable: FC<MFDTableProps> = ({
  clusterNumber,
  totalCount,
  highlights,
  isFullValueShown,
  insertedRow,
  insertRow,
  closeInsertedRow,
  className,
}) => {
  const data: Row[] = useMemo(() => {
    const insertRowData: Row | undefined = insertedRow
      ? getMFDRow(insertedRow.data, totalCount, true, isFullValueShown, () =>
          closeInsertedRow(),
        )
      : undefined;

    const highlightData = highlights.map((highlight) =>
      getMFDRow(highlight, highlight.data_index, false, isFullValueShown, () =>
        insertRow(highlight.furthest_data_index, highlight.data_index),
      ),
    );

    if (insertRowData) {
      const insertPosition = highlightData.findIndex((row) => {
        return row.items[2] === insertedRow?.position;
      });

      if (insertPosition !== -1)
        highlightData.splice(insertPosition + 1, 0, insertRowData);
    }

    return highlightData;
  }, [
    closeInsertedRow,
    highlights,
    insertRow,
    insertedRow,
    isFullValueShown,
    totalCount,
  ]);

  const header = [
    'Within Limit',
    'Maximum Distance',
    'Point Index',
    'Furthest Point Index',
    'Value',
  ];

  const props: TableProps = {
    containerKey: clusterNumber,
    data,
    header,
  };

  return <Table className={className} {...props} />;
};
