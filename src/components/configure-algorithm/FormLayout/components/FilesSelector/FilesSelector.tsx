import { FormField } from '@/components/common/uikit';
import { SelectDataset } from '@/components/configure-algorithm/SelectDataset';
import styles from './FilesSelector.module.scss';

export type FilesSelectorProps<T extends string> = {
  datasetInputs: { label: string; inputName: T }[];
  fileIDs: Record<T, string>;
  onChange: (newFileIDs: Record<T, string>) => void;
};

export function FilesSelector<T extends string>({
  datasetInputs,
  fileIDs,
  onChange,
}: FilesSelectorProps<T>) {
  return (
    <div className={styles.filesSelectorContainer}>
      {datasetInputs.map(({ label, inputName }) => (
        <FormField key={inputName} label={label}>
          <SelectDataset
            value={fileIDs[inputName]}
            onChange={(newValue) =>
              onChange({ ...fileIDs, [inputName]: newValue })
            }
          />
        </FormField>
      ))}
    </div>
  );
}
