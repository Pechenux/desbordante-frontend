import { atom } from 'jotai';

export interface columnMatchType {
  metrics: string | null;
  column1: string | null;
  column2: string | null;
  boundLimit: number[] | null;
  minSimilarity: number[] | null;
}

export const defaultColumnMatch = {
  metrics: null,
  column1: null,
  column2: null,
  boundLimit: null,
  minSimilarity: null,
};

export const selectedColumnMatchesAtom = atom<columnMatchType[]>([
  defaultColumnMatch,
]);
