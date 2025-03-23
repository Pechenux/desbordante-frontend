import { atom } from 'jotai';
import { SchemaUserSchema } from '@/api/generated/schema';

export const authAtom = atom<SchemaUserSchema | undefined>(undefined);
