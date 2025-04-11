import { useMutation } from '@tanstack/react-query';
import cn from 'classnames';
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { datasetInputInfo } from '@/app/create-task/configure-algorithm/configureAlgorithm';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { FormComponent, FormData, Presets } from '@/types/form';
import { showError } from '@/utils/toasts';
import { useQueryParams } from '@/utils/useQueryParams';
import { FilesSelector } from './components/FilesSelector';
import { FormFooter } from './components/FormFooter';
import { FormHeader } from './components/FormHeader';
// import { PresetSelector } from './components/PresetSelector';
import styles from './FormLayout.module.scss';

export type FormLayoutProps = {
  FormComponent: FormComponent;
  datasetInputs: datasetInputInfo[];
  startValues?: FormData;
};

export const FormLayout: FC<FormLayoutProps> = ({
  FormComponent,
  datasetInputs,
  startValues,
}) => {
  const { setQueryParams } = useQueryParams();

  const startInputsValues: Record<string, string> = datasetInputs.reduce(
    (acc, input) => ({ ...acc, [input.inputId]: input.datasetId }),
    {},
  );

  const [fileIDs, setFileIDs] =
    useState<Record<string, string>>(startInputsValues);

  const methods = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    values: startValues,
  });
  const mutator = useMutation({
    mutationFn: FormComponent.mutationFn,
    onSuccess: (taskResponse) =>
      setQueryParams({
        newPathname: '/reports',
        params: { taskID: taskResponse?.id },
      }),
    onError: (error) => {
      if (typeof error === 'string') {
        console.log('test2');
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

  const [presets, setPresets] = useState<Presets>();
  const formRef = useRef<HTMLFormElement>(null);
  const [inputCount, setInputCount] = useState<number>(0);
  useLayoutEffect(() => {
    setInputCount(formRef.current!.children.length);
  }, []);

  useEffect(() => console.log(presets), [presets]);
  return (
    <WizardLayout header={<FormHeader />} footer={<FormFooter />}>
      {/* <div className={styles.presetSelectorContainer}>
        <PresetSelector
          fileID={fileID}
          isCustom={methods.formState.isDirty}
          formReset={methods.reset}
          formTrigger={methods.trigger}
          presets={presets}
        />
      </div>
      <div className={styles.line} /> */}
      <FilesSelector
        fileIDs={fileIDs}
        onChange={setFileIDs}
        datasetInputs={datasetInputs}
      />
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
          <FormComponent setPresets={setPresets} />
        </form>
      </FormProvider>
    </WizardLayout>
  );
};
