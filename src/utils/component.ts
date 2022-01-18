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
