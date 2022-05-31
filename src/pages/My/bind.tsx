import { createElement, useState } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Text from 'rax-text';
import { Cell } from '@alifd/mobile-layout';
import { Scan } from '@/components/scan';
import { FormDetail } from '@/components/UserDetailForm';
import { confirm, loading, navigate, alert } from '@uni/apis';
import api from '@/common/api';
import { Button } from '@alifd/meet';

function Bind() {
  const [dtu, setDtu] = useState<Uart.Terminal>();

  const scan = (dev?: Uart.Terminal) => {
    if (dev) {
      setDtu(dev);
    } else {
      wx.showModal({
        title: 'search',
        content: '设备未注册或未上线，请核对设备是否在我司渠道购买',
      });
    }
  };

  const bind = async () => {
    loading.showLoading({ title: '正在绑定' });
    const { code, msg } = await api.addUserTerminal(dtu!.DevMac);
    if (code) {
      const r = await api.getTerminal(dtu!.DevMac);
      loading.hideLoading();
      await confirm({
        title: '绑定网关成功',
        content: `绑定DTU:${dtu?.DevMac} 成功`,
      });
      if (r.data?.mountDevs?.length > 0) {
        navigate.back();
      }
    } else {
      alert({
        content: `绑定DTU:${dtu?.DevMac} 失败，tip:${msg}`,
      });
    }
  };


  return (
    <View>
      <Scan setData={scan} online />
      <Cell>
        {
          dtu && <View style={{ padding: 32 }}>
            <FormDetail name="mac" value={dtu.DevMac} />
            <FormDetail name="DTU名称" value={dtu.name} />
            <FormDetail name="接入节点" value={dtu.mountNode} />
            <Button onClick={() => bind()} style={{ marginTop: 24 }} type="primary" size="large" fullWidth>
              绑定设备
            </Button>
                 </View>
        }

      </Cell>
      <View style={{ padding: 32, marginTop: 36, marginBottom: 48, display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
        <Text>*绑定的透传网关或百事服卡必须处于联网状态才能被查询到</Text>
        <Text>*百事服卡号在卡的背面,以285***开头,不是ups上的编号</Text>
        <View style={{ padding: 36 }}>
          <Image source={{ uri: 'https://www.ladishb.com/upload/1_6_2022_1641435659239.jpg' }} />
        </View>
        <Text>*透传网关卡号在设备的背面,以MAC:***</Text>
      </View>
    </View>
  );
}

export default Bind;
