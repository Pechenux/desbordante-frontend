import { atom } from 'jotai';

export interface columnMatchType {
  metrics: string | null;
  column1: string | null;
  column2: string | null;
}

export const defaultColumnMatch = {
  metrics: '',
  column1: '',
  column2: '',
};

export const selectedColumnMatchesAtom = atom<columnMatchType[]>([]);
