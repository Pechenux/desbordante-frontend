import { FC } from 'react';

import {
  Button,
  FormField,
  NumberInput,
  NumberInputProps,
} from '@/components/common/uikit';
import styles from './NumberInputWithButton.module.scss';

type Props = {
  numberProps: NumberInputProps;
  buttonText: string;
  label: string;
};

export const NumberInputWithButton: FC<Props> = ({
  numberProps,
  buttonText,
  label,
}) => {
  const handleButtonClick = () => {
    console.log('displayValue', numberProps.value);
  };
  return (
    <div /*className={styles.inputContainer}*/>
      <FormField label={label}>
        <div className={styles.flex}>
          <NumberInput
            {...numberProps}
            // value={displayValue}
            // onChange={setDisplayValue}
          />
          <Button variant="secondary" onClick={handleButtonClick}>
            {buttonText}
          </Button>
        </div>
      </FormField>
    </div>
  );
};
