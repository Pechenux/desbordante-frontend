import { atom } from 'jotai';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';

export const choosenPrimitiveAtom = atom<PrimitiveType>(PrimitiveType.FD);
