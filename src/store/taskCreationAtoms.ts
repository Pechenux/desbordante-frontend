import { atom } from 'jotai';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';

export const choosenPrimitiveAtom = atom<PrimitiveType>(PrimitiveType.FD);

export interface choosenFileType {
  fileId: string;
  label: string;
}
export const choosenFileAtom = atom<choosenFileType>({
  fileId: '0',
  label: '',
} as choosenFileType);
