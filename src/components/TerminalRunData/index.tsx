/* eslint-disable @typescript-eslint/no-shadow */
import { createElement, FC, useEffect, useMemo } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { usePromise, useTerminalData } from '@/common/hooks';
import api from '@/common/api';
import { Button, List } from '@alifd/meet';
import { parseTime } from '@/common/util';

interface props{
  mac: string;
  pid: string;
}
const TerminalRunData: FC<props> = ({ mac, pid }) => {
  const { data, loading, fecth } = useTerminalData(mac, pid);

  /**
     * 获取用户协议配置
     */
  const { data: ShowTag } = usePromise(async () => {
    const user = await api.userInfo();
    const protocol = await api.getTerminalPidProtocol(mac, pid);
    const { data } = await api.getProtocolSetup<string>(protocol.data.protocol, 'ShowTag', user.data.user);
    return new Set([data.sys, data.user].flat());
  }, new Set(), [mac, pid]);

  /**
     * 获取显示的参数
     */
  const result = useMemo(() => {
    if (data) {
      if (ShowTag.size > 0) {
        return data.result.filter((el) => ShowTag.has(el.name));
      } else { return data.result; }
    } else {
      return [];
    }
  }, [data, ShowTag]);

  const time = useMemo(() => {
    return data ? parseTime(data.time) : '';
  }, [data]);
  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', padding: '30rpx', alignItems: 'center' }}>
        <Text>{time}</Text>
        <Button type="primary" model="outline" loading={loading} onClick={() => fecth()} style={{ marginLeft: 'auto' }}>刷新</Button>
      </View>
      <List>
        {
              result.map((a) => <List.Item key={a.name} title={a.name} extra={a.parseValue} arrow="right" />)
            }
      </List>
    </View>
  );
};

export default TerminalRunData;
