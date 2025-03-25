import { atom } from 'jotai';
import { ACInstanceType } from '@/components/reports/AC';
//import { ACSortBy, OrderBy, Pagination } from 'types/globalTypes';

type ACTaskAtom = {
  taskID: string;
  instanceSelected: ACInstanceType | null;
  // pagination: Pagination;
  // sortBy: ACSortBy;
  // orderBy: OrderBy;
};

export const ACAtomDefaultValues: ACTaskAtom = {
  // general task data
  taskID: '',
  instanceSelected: null,
  // pagination: {
  //   offset: 0,
  //   limit: 6,
  // },
  // sortBy: ACSortBy.NUMBER_OF_INTERVALS,
  // orderBy: OrderBy.ASC,
};

export const ACAtomDefaultValuesWithParams = (
  taskID: string,
  instanceSelected: ACInstanceType | null,
  // sortBy = ACSortBy.NUMBER_OF_INTERVALS,
  // orderBy = OrderBy.ASC,
  // offset = 0,
) => ({
  ...ACAtomDefaultValues,
  instanceSelected,
  taskID,
  // pagination: {
  //   offset,
  //   limit: 6,
  // },
  // sortBy,
  // orderBy,
});

const ACAtom = atom<ACTaskAtom>(ACAtomDefaultValues);

export default ACAtom;
