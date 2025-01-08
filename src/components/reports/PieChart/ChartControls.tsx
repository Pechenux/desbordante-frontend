import { FC } from 'react';
import { Button, FormField, Icon, Text } from '@/components/common/uikit';
import styles from './ChartControls.module.scss';

type Props = {
  depth: number;
  setDepth: (depth: number) => void;
  search: string;
  setSearch: (s: string) => void;
};

export const ChartControls: FC<Props> = ({
  depth,
  setDepth,
  search,
  setSearch,
}) => {
  return (
    <div className={styles.controls}>
      <FormField>
        <Text
          label="Search"
          placeholder="Attribute name or index"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </FormField>

      {depth > 0 && (
        <Button
          variant="secondary"
          icon={<Icon name="collapseChart" />}
          onClick={() => setDepth(Math.max(0, depth - 1))}
        >
          Collapse this layer
        </Button>
      )}
    </div>
  );
};
