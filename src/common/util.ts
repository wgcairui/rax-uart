/**
 * 转换对象为路由参数
 * @param Obj json对象
 */
export const ObjectToStrquery = (Obj: Record<string, any>) => {
  return `?${Object.keys(Obj).map((key) => `${key}=${String(Obj[key])}`).join('&')}`;
};


/**
 * 转换Date标准时间为易读的24小时时间
 * @param time
 * @returns like 2021/3/6 09:18:33
 */
export const parseTime = (time?: string | number | Date) => {
  if (time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${date.toLocaleDateString()} ${h}:${m}:${s}`;
  } else return '';
};
