import { atom } from 'jotai';

export type TaskCreationFields = {
  primitive?: string;
  fileID?: string;
};

export enum TaskCreationActions {
  'setPrimitive',
  'setFileID',
  'reset',
}

const taskCreation__internal = atom<TaskCreationFields>({});

export const taskCreation = atom(
  (get) => get(taskCreation__internal),
  (
    _,
    set,
    { action, value }: { action: TaskCreationActions; value?: string },
  ) => {
    switch (action) {
      case TaskCreationActions.reset:
        set(taskCreation__internal, {});
        break;
      case TaskCreationActions.setPrimitive:
        set(taskCreation__internal, (prev) => ({ ...prev, primitive: value }));
        break;
      case TaskCreationActions.setFileID:
        set(taskCreation__internal, (prev) => ({ ...prev, fileID: value }));
        break;
      default:
        break;
    }
  },
);
