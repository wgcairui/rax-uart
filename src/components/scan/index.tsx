import { createElement, FC, useState } from 'rax';
import View from 'rax-view';
import { Cell, Row } from '@alifd/mobile-layout';
import { Button, Icon, Input } from '@alifd/meet';
import api from '@/common/api';
import { confirm, scan } from '@uni/apis';

interface props{
  /**
     * 是否仅查询在线的设备
     */
  online?: boolean;
  /**
     * 获取查询到的设备数据
     */
  setData?: (dtu: Uart.Terminal) => void;
}

export const Scan: FC<props> = ({ setData, online }) => {
  const [mac, setMac] = useState('');

  const scanQr = async () => {
    const res = await scan();
    setMac(res.result);
    if (res.errMsg !== 'scanCode:ok' || (res.result as string).length !== 12) {
      confirm({
        title: '扫码失败,请重试',
      });
    } else {
      getDtu(res.result);
    }
  };

  const getDtu = async (macs: string) => {
    if (setData) {
      const res = online ? await api.getTerminalOnline(mac) : await api.getTerminal(macs);
      setData(res.data!);
    }
  };
  return (
    <View>
      <View style={{ padding: 28 }}>
        <Row style={{ display: 'flex' }}>
          <Cell style={{ flexGrow: 1 }}>
            <Input value={mac} onChange={setMac} highlightable hasClear placeholder="输入Mac卡号" />
          </Cell>
          <Cell onClick={() => scanQr()}>
            <Icon size="xl" uri="https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/%E6%89%AB%E7%A0%81.png" type="" />
          </Cell>
        </Row>
        <Button onClick={() => getDtu(mac)} style={{ marginTop: 24 }} disabled={!mac || mac.length !== 12} type="primary" size="large" fullWidth>
          查询
        </Button>
      </View>
    </View>
  );
};
