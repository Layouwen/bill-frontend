import { MouseEvent } from 'react';

export const composeExportComponent = <C, O extends Record<string, any>>(
  com: C,
  otherCom: O,
): C & O => {
  const res = com as any;
  for (const key in otherCom) {
    if (otherCom.hasOwnProperty(key)) {
      res[key] = otherCom[key];
    }
  }
  return res;
};

export const stopPropagation = (
  e: MouseEvent<any>,
  event?: (...params: any[]) => void,
  ...params: any[]
) => {
  e.stopPropagation();
  event?.(...params);
};
