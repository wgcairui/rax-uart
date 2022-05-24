/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
import { SetStateAction, useEffect, useState } from 'rax';
import api from './api';

/**
 *
 */
export type IusePromiseData<T> = T extends Array<infer P> ? Array<Record<string, any> & P> : T & Record<string, any>;

// type data<T> = T extends Array<infer P> ? (Record<string, any> & P)[] : T extends Record<string, any> ? T & Record<string, any> : T
type data<T> = T extends Array<infer P> ? P[] : T;


type setData<T> = T extends any[] ? React.Dispatch<SetStateAction<data<T>>> : React.Dispatch<SetStateAction<data<T> | undefined>>;

/**
 * usePromise 返回值
 */
export interface IusePromise<T> {
  /**
     * 等待结果生成
     */
  loading: boolean;
  /**
     * 数据
     * 虽然使用了extends判断,但是没有赋予初始值的话实际还是为undefine
     * ts无法判断是否有初始值
     */
  data: data<T>;
  /**
     * 错误
     */
  err: any;
  /**
     * 重新请求
     */
  fecth: () => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<data<T>>> | setData<T>;
}


/**
 * 组合hook,传入promise,等待结果生成后返回
 * @param fn 传入的promise函数
 * @param deps 监听数组
 * @param initValue 默认初始值
 * @returns
 */
export const usePromise = <T>(fn: () => Promise<T>, initValue?: data<T> | (() => data<T>), deps?: React.DependencyList): IusePromise<T> => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = initValue ? useState<data<T>>(initValue) : useState<data<T>>();

  const [err, setErr] = useState<any>();

  async function fecth() {
    setLoading(true);
    await fn()
      .then((el: any) => setData(el))
      .catch(setErr)
      .finally(() => setLoading(false));
  }


  useEffect(() => {
    fecth();
  }, deps || []);


  return {
    loading,
    data: data as any,
    err,
    fecth,
    setData: setData as any,
  };
};


/**
 * 获取设备数据最新状态
 * @param mac
 * @param pid
 * @returns
 */
export const useTerminalData = (mac: string, pid: string | number) => {
  const event = mac + pid;

  const datas = usePromise(async () => {
    const { data } = await api.getTerminalData(mac, pid);
    return data;
  }, undefined, [mac, pid]);

  /**
   * 订阅设备数据更新,
   * 注销时取消订阅
   */
  useEffect(() => {
    api.onMessage(event, () => {
      console.log(`获取运行数据:${event}`);
      datas.fecth();
    });
    return () => api.offWs(event);
  }, [mac, pid]);

  return datas;
};
