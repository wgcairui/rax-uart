/**
 * 转换对象为路由参数
 * @param Obj json对象
 */
export const ObjectToStrquery = (Obj: Record<string, string>) => {
  return `?${Object.keys(Obj).map((key) => `${key}=${String(Obj[key])}`).join('&')}`;
};
