import { datasetInputInfo } from '@/app/create-task/configure-algorithm/configureAlgorithm';
import { FormField } from '@/components/common/uikit';
import { SelectDataset } from '@/components/configure-algorithm/SelectDataset';
import styles from './FilesSelector.module.scss';

export type FilesSelectorProps = {
  datasetInputs: datasetInputInfo[];
  fileIDs: Record<string, string>;
  onChange: (newFileIDs: Record<string, string>) => void;
};

export function FilesSelector({
  datasetInputs,
  fileIDs,
  onChange,
}: FilesSelectorProps) {
  return (
    <div className={styles.filesSelectorContainer}>
      {datasetInputs.map(({ label, inputId }) => (
        <FormField key={inputId} label={label}>
          <SelectDataset
            onChange={(newValue) =>
              onChange({ ...fileIDs, [inputId]: newValue })
            }
          />
        </FormField>
      ))}
    </div>
  );
}
