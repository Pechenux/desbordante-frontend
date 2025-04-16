import { FC } from 'react';

import {
  Button,
  NumberInput,
  NumberInputProps,
} from '@/components/common/uikit';
import styles from './SeedRandomInput.module.scss';

type Props = NumberInputProps;

export const SeedRandomInput: FC<Props> = (props) => {
  const handlerRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 900000) + 100000;
    props.onChange([newSeed]);
  };
  return (
    <div className={styles.seedCustomInput}>
      <NumberInput {...props} />
      <Button variant="secondary" onClick={handlerRandomSeed}>
        Random
      </Button>
    </div>
  );
};
