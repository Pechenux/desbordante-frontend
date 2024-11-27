'use client';

import { useAtom } from 'jotai';
import { taskCreation, TaskCreationActions } from '@/store/TaskCreationAtom';

const TestPage = () => {
  const [atomTaskCreation, setTaskCreation] = useAtom(taskCreation);

  return (
    <div>
      <a>State: {JSON.stringify(atomTaskCreation)}</a>
      <button
        onClick={() =>
          setTaskCreation({
            action: TaskCreationActions.setPrimitive,
            value: 'asd',
          })
        }
      >
        Set primitive
      </button>
      <button
        onClick={() =>
          setTaskCreation({
            action: TaskCreationActions.setFileID,
            value: 'dsa',
          })
        }
      >
        Set fileID
      </button>
      <button
        onClick={() =>
          setTaskCreation({
            action: TaskCreationActions.reset,
          })
        }
      >
        Reset
      </button>
    </div>
  );
};

export default TestPage;
