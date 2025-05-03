import { useAtom } from 'jotai';
import { DatasetInputInfo } from '@/app/create-task/configure-algorithm/configureAlgorithm';
import { FormField } from '@/components/common/uikit';
import { SelectDataset } from '@/components/configure-algorithm/SelectDataset';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import styles from './FilesSelector.module.scss';

export type FilesSelectorProps = {
  datasetInputs: DatasetInputInfo[];
  onChange: (newFileIDs: Record<string, string>) => void;
};

export function FilesSelector({ datasetInputs, onChange }: FilesSelectorProps) {
  const [fileIDs] = useAtom<Record<string, string>>(fileIDsAtom);

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
