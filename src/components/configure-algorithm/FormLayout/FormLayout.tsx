import { useMutation } from '@tanstack/react-query';
import cn from 'classnames';
import { useAtom } from 'jotai';
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { DatasetInputInfo } from '@/app/create-task/configure-algorithm/configureAlgorithm';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { FormComponent, FormData } from '@/types/form';
import { showError } from '@/utils/toasts';
import { useQueryParams } from '@/utils/useQueryParams';
import { FilesSelector } from './components/FilesSelector';
import { FormFooter } from './components/FormFooter';
import { FormHeader } from './components/FormHeader';
import { PresetSelector } from './components/PresetSelector/PresetSelector';
import styles from './FormLayout.module.scss';

export type FormLayoutProps = {
  FormComponent: FormComponent;
  datasetInputs: DatasetInputInfo[];
  startValues?: FormData;
};

export const FormLayout: FC<FormLayoutProps> = ({
  FormComponent,
  datasetInputs,
  startValues,
}) => {
  const { setQueryParams } = useQueryParams();

  const startInputsValues: Record<string, string> = useMemo(
    () =>
      datasetInputs.reduce(
        (acc, input) => ({ ...acc, [input.inputId]: input.datasetId }),
        {},
      ),
    [datasetInputs],
  );
  const [fileIDs, setFileIDs] = useAtom<Record<string, string>>(fileIDsAtom);

  useEffect(
    () => setFileIDs(startInputsValues),
    [startInputsValues, setFileIDs],
  );

  const defaultPreset = useMemo(
    () => FormComponent.presets?.common?.at(-1)?.preset ?? {},
    [FormComponent],
  );

  const methods = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    values: startValues,
    defaultValues: defaultPreset,
  });
  const mutator = useMutation({
    mutationFn: FormComponent.mutationFn,
    onSuccess: (task) =>
      task &&
      setQueryParams({
        newPathname: '/reports',
        params: { taskID: task.id },
      }),
    onError: (error) => {
      if (typeof error === 'string') {
        showError(error, 'Internal error occurred. Please try later.');
      }

      if (error instanceof Error) {
        showError(error.message, 'Internal error occurred. Please try later.');
      }

      if (
        'detail' in error &&
        Array.isArray(error.detail) &&
        '0' in error.detail &&
        'msg' in error.detail[0]
      ) {
        showError(
          error.detail[0].msg,
          'Internal error occurred. Please try later.',
        );
      }
    },
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      mutator.mutate({
        datasets: datasetInputs.reduce((acc, { inputId }) => {
          const inputData = fileIDs[inputId];
          if (inputData) {
            acc.push(inputData);
          }
          return acc;
        }, [] as string[]),
        data: FormComponent.onSubmit(data),
      });
    },
    [FormComponent, datasetInputs, fileIDs, mutator],
  );

  const presets = useMemo(() => FormComponent.presets, [FormComponent]);
  const formRef = useRef<HTMLFormElement>(null);
  const [inputCount, setInputCount] = useState<number>(0);
  useLayoutEffect(() => {
    setInputCount(formRef.current!.children.length);
  }, []);
  return (
    <WizardLayout header={<FormHeader />} footer={<FormFooter />}>
      <FilesSelector onChange={setFileIDs} datasetInputs={datasetInputs} />
      <div className={styles.presetSelectorContainer}>
        <PresetSelector
          fileIDs={Object.values(fileIDs)}
          defaultPreset={defaultPreset}
          isCustom={methods.formState.isDirty}
          formReset={methods.reset}
          formTrigger={methods.trigger}
          presets={presets}
        />
      </div>
      <div className={styles.line} />
      <FormProvider {...methods}>
        <form
          id="algorithmconfigurator"
          ref={formRef}
          className={cn(
            styles.formContainer,
            inputCount > 4 && styles.expanded,
          )}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormComponent />
        </form>
      </FormProvider>
    </WizardLayout>
  );
};
