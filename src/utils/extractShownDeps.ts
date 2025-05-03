export const extractShownDeps: <T>(
  deps: T[],
  pageNum: number,
  numOnPage: number,
) => T[] = (deps, pageNum, numOnPage) => {
  return deps.slice((pageNum - 1) * numOnPage, pageNum * numOnPage);
};
