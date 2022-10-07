export const getCellValue = (cell: any, ...args: any[]) => {
  switch (typeof cell) {
    case 'string':
      return cell;
    case 'function':
      return cell(...args);
    default:
      return '-';
  }
};

export const transformParamToHyphen = (params: any) => {
  const transformParams: any = {};

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      const transformKey = key.replace('_', '-');
      transformParams[transformKey] = value;
    }
  }

  return transformParams;
};
