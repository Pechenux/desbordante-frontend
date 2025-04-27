import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { createMutationFn } from '@/api/services/server';
import { bodyToFormData } from '@/api/utils/bodyToFormData';
import { SchemaFilePublic } from '@/api/generated/schema';
import { ChoosedDatasetInfo, Icon } from '@/components/common/uikit';
import cardStyles from '../DatasetCard/DatasetCard.module.scss';
import {
  FileConfigModal,
  Separators,
} from './components/FileConfigModal/FileConfigModal';
import {
  /*ProgressBar, */ Progress,
} from './components/ProgressBar/ProgressBar';
import styles from './DatasetUploader.module.scss';

type Props = {
  onUpload: (datasetId: string) => void;
};

export const DatasetUploader: FC<Props> = ({ onUpload }) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [isFileDragged, setIsFileDragged] = useState(false);
  const [isDraggedInside, setIsDraggedInside] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState<Progress>({
    state: 'idle',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [separator, setSeparator] = useState<Separators>(',');

  const mutator = useMutation({
    mutationFn: createMutationFn('/api/files'),
    onSuccess: (dataset: SchemaFilePublic | undefined) => {
      setFileUploadProgress({ state: 'complete' });

      if (dataset?.id) {
        onUpload(dataset.id);
      }
    },
    onError: () => setFileUploadProgress({ state: 'fail' }),
  });

  const onDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsFileDragged(false);
  }, []);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsFileDragged(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsFileDragged(false);
  }, []);

  useEffect(() => {
    document.addEventListener('drop', onDrop);
    document.addEventListener('dragover', onDragOver);
    document.addEventListener('dragleave', onDragLeave);

    return () => {
      document.removeEventListener('drop', onDrop);
      document.removeEventListener('dragover', onDragOver);
      document.removeEventListener('dragleave', onDragLeave);
    };
  }, [onDragLeave, onDragOver, onDrop]);

  // TODO: add dataset to files
  useEffect(() => {
    if (
      fileUploadProgress.state === 'fail'
      // fileUploadProgress.state === 'complete'
    ) {
      setTimeout(() => setFileUploadProgress({ state: 'idle' }), 1500);
    }
  }, [fileUploadProgress]);

  // TODO: display progress
  // const context: DefaultContext = {
  //   fetchOptions: {
  //     useUpload: true,
  //     onProgress: (ev: ProgressEvent) => {
  //       setFileUploadProgress({
  //         state: 'process',
  //         amount: ev.loaded / ev.total,
  //       });
  //     },
  //   },
  // };

  const onChange = async (files: FileList | null) => {
    setIsDraggedInside(false);
    // if (!algorithmsConfig) {
    //   setFileUploadProgress({ state: 'fail' });
    //   return;
    // }

    // const { allowedFileFormats, userDiskLimit } =
    //   algorithmsConfig?.algorithmsConfig.fileConfig;

    const allowedFileFormats = ['text/csv'];

    if (
      !files ||
      files.length !== 1 ||
      !allowedFileFormats.includes(files[0]?.type ?? '')
      // files[0]?.size > userDiskLimit
    ) {
      setFileUploadProgress({ state: 'fail' });
      return;
    }

    setFile(files[0]);
    setIsModalOpen(true);
  };

  const handleModalClose = useCallback(() => {
    setFileUploadProgress({ state: 'idle' });
    setIsModalOpen(false);
    setSeparator(',');
    setFile(undefined);
  }, []);

  const handleModalSubmit = useCallback(() => {
    setIsModalOpen(false);

    if (!file) {
      setSeparator(',');
      setFileUploadProgress({ state: 'idle' });
      return;
    }

    mutator.mutate({
      credentials: 'include',
      params: {
        query: {
          make_public: false, // todo: make checkbox for that
        },
      },
      body: {
        file: file,
      },
      bodySerializer: bodyToFormData,
    });
  }, [file, mutator]);

  return (
    <>
      <FileConfigModal
        value={separator}
        onChange={setSeparator}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
      <div
        className={classNames(
          cardStyles.card,
          styles.uploader,
          isFileDragged && styles.dragged_outside,
          isDraggedInside && styles.dragged_inside,
          styles[fileUploadProgress.state],
        )}
        tabIndex={0}
        onClick={() => inputFile?.current?.click()}
        onDragEnter={() => setIsDraggedInside(true)}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggedInside(true);
        }}
        onDragLeave={() => setIsDraggedInside(false)}
        onDrop={(e) => onChange(e.dataTransfer.files)}
      >
        <div className={styles.uploader_title}>
          {fileUploadProgress.state === 'idle' &&
            !isFileDragged &&
            !isDraggedInside && (
              <>
                <Icon name="upload" size={20} alt="Upload a File" />
                <p>Upload a File</p>
              </>
            )}
          {(isFileDragged || isDraggedInside) && (
            <>
              <Icon name="drag" size={20} alt="Drop here" />
              <p>Drop here</p>
            </>
          )}
          {fileUploadProgress.state === 'process' && (
            <>
              <Icon name="upload" size={20} alt="Uploading..." />
              <p>Uploading...</p>
            </>
          )}
          {fileUploadProgress.state === 'complete' && (
            <>
              <Icon name="check" size={20} alt="Complete" />
              <p>Complete</p>
            </>
          )}
          {fileUploadProgress.state === 'fail' && (
            <>
              <Icon name="cross" size={20} alt="Error" />
              <p>Error</p>
            </>
          )}
        </div>
        {/* {fileUploadProgress.state !== 'idle' && (
        <ProgressBar progress={fileUploadProgress} />
      )} */}

        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={(e) => onChange(e.target.files)}
          multiple={false}
          accept=".csv, .CSV"
        />
      </div>
    </>
  );
};
