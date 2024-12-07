import { atom } from 'jotai';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';

export const choosenPrimitiveAtom = atom<PrimitiveType>(PrimitiveType.AR);

export const choosenFileAtom = atom<string>('');
