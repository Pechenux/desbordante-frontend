import cn from 'classnames';
// import { useRouter } from 'next/navigation';
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { MainPrimitives } from '@/constants/primitivesInfo/primitives';
import { FormComponent, FormData, Presets } from '@/types/form';
// import { showError } from '@/utils/toasts';
import { FormFooter } from './components/FormFooter';
import { FormHeader } from './components/FormHeader';
// import PresetSelector from './components/PresetSelector';
import styles from './FormLayout.module.scss';

export type FormLayoutProps = {
  fileID: string;
  primitive: MainPrimitives;
  FormComponent: FormComponent;
  startValues?: FormData;
};

export const FormLayout: FC<FormLayoutProps> = ({
  fileID,
  // primitive,
  startValues,
  FormComponent,
}) => {
  // const router = useRouter();
  const methods = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    values: startValues,
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      const fieldData = FormComponent.onSubmit(data);

      console.log(fieldData);
      // // return;

      // createTask({
      //   variables: {
      //     fileID,
      //     props: {
      //       ...fieldData,
      //       type: primitive,
      //     },
      //     forceCreate: true,
      //   },
      // })
      //   .then((resp) =>
      //     router.push({
      //       pathname: '/reports',
      //       query: {
      //         taskID: resp.data?.createMainTaskWithDatasetChoosing.taskID,
      //       },
      //     }),
      //   )
      //   .catch((error) => {
      //     if (error instanceof Error) {
      //       showError(
      //         error.message,
      //         'Internal error occurred. Please try later.',
      //       );
      //     }
      //   });
    },
    [FormComponent],
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
      </div> */}
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
          <FormComponent fileID={fileID} setPresets={setPresets} />
        </form>
      </FormProvider>
    </WizardLayout>
  );
};
