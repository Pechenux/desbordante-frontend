'use client';

import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { bodyToFormData, createMutationFn } from '@/api/fetchFunctions';
import { DatasetCard } from '@/components/choose-file/DatasetCard';

const ChoosePrimitive = () => {
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

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>press me</button>
      <DatasetCard
        dataset={{
          fileID: '1',
          originalFileName: 'asd',
          rowsCount: 0,
          createdAt: '0',
          numberOfUses: 0,
          isBuiltIn: true,
          supportedPrimitives: ['fun'],
        }}
        fileID="1"
        primitive="fun"
        onClick={() => null}
      />
      <DatasetCard
        dataset={{
          fileID: '2',
          originalFileName: 'asd',
          rowsCount: 0,
          createdAt: '0',
          numberOfUses: 0,
          isBuiltIn: false,
          supportedPrimitives: ['fun'],
        }}
        fileID="1"
        primitive="fun"
        onClick={() => null}
      />
    </div>
  );
};

export default memo(ChoosePrimitive);
