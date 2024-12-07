'use client';

import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { bodyToFormData, createMutationFn } from '@/api/fetchFunctions';

const DatasetUploader = () => {
  const mutator = useMutation({
    mutationFn: createMutationFn('/api/file/csv'),
  });

  const [file, setFile] = useState<File | undefined>(undefined);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleClick = useCallback(async () => {
    console.log(file);

    if (!file) {
      return;
    }

    mutator.mutate({
      body: {
        file: file,
        separator: ',',
        header: [0],
      },
      bodySerializer: bodyToFormData,
    });
  }, [file, mutator]);

  console.log(mutator);

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>press me</button>
    </div>
  );
};

export default memo(DatasetUploader);
