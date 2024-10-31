'use client';

import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { createMutationFn } from '@/api/fetchFunctions';

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
      bodySerializer(body) {
        const fd = new FormData();
        fd.append('file', body.file);
        fd.append('separator', body.separator);
        fd.append('header', body.header.join(','));
        return fd;
      },
    });
  }, [file, mutator]);

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>press me</button>
    </div>
  );
};

export default memo(ChoosePrimitive);
