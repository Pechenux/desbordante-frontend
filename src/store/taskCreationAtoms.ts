import { atom } from 'jotai';
import { MainPrimitives } from '@/constants/primitivesInfo/primitives';

export const choosenPrimitiveAtom = atom<MainPrimitives>(MainPrimitives.FD);

export interface choosenFileType {
  fileId: string;
  label: string;
}
export const choosenFileAtom = atom<choosenFileType>({
  fileId: '0',
  label: '',
} as choosenFileType);
