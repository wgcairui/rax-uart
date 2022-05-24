/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react/jsx-indent */
import { createElement, useEffect, useMemo, useState } from 'rax';
import View from 'rax-view';
import { application, loading, navigate, pullDownRefresh, confirm } from '@uni/apis';
import api from '@/common/api';
import { DevPicture, SubscriUrl } from '@/constant';
import { Message, Tab } from '@alifd/meet';
import { ObjectToStrquery } from '@/common/util';
import { Cell, Grid } from '@alifd/mobile-layout';
import style from './index.module.css';
import MountDevCard from '@/components/mountDevCard';
import DtuCard from '@/components/dtuCard';

export default function Home() {
  // 是否已就绪
  const [ready, setReady] = useState(false);
  // 是否已经订阅公众号
  const [sub, setSub] = useState(false);
  /** DTU设备信息 */
  const [DTUs, setDtus] = useState<Uart.Terminal[]>([]);
  // 未确认告警数量
  const [alarmNum, setAlarmNum] = useState(0);
  // 五条内告警数据
  // const [alarmData, setAlarmData] = useState<Uart.uartAlarmObject[]>([]);
  // 虚拟设备
  // const [Vm] = useState<Uart.Terminal[]>([]);
  const [isConfirm, setConfirm] = useState(false);

  useEffect(() => {
    loading.showLoading({ content: 'login' });
    wx.login({
      success: async (login) => {
        const opt = application.getLaunchOptionsSync();
        // 如果是从uart网站的小程序二维码入口进入的,scen会携带用户id
        const scene = opt.scene ? decodeURIComponent(opt.scene) : '';
        const { code, data } = await api.login({ js_code: login.code, scene });
        if (code) {
          const user = await api.userInfo();
          // 判断user用户组,如果是admin则跳转到专有页面
          switch (user.data.userGroup) {
            case 'admin':
            case 'root':
              navigate.reLaunch({ url: '/pages/admin/index' });
              break;
            default:
              setSub(Boolean(user.data.wxId));
              init();
              break;
          }
        } else {
          navigate.reLaunch({ url: `/pages/Login/index?openid=${(data as any).openid}&unionid=${(data as any).unionid}` });
        }
        loading.hideLoading();
      },
    });
  }, []);

  useEffect(() => {
    if (DTUs.length === 0 && !isConfirm && ready) {
      confirm({
        title: '添加设备',
        content: '您还没有任何设备，是否添加设备?',
        success: (res) => {
          if (res?.confirm) {
            navigate.push({ url: '/pages/index/bindDev/bindDev' });
          } else {
            setConfirm(true);
          }
        },
      });
    }
  }, [DTUs, ready]);

  /**
   * 刷选挂载设备列表
   */
  const dtuItem = useMemo<Array<Uart.TerminalMountDevs & { dtu: string; mac: string }>>(() => {
    return DTUs
      .map((dtu) => dtu.mountDevs
        .map((dev) => ({ ...dev, pic: DevPicture[dev.Type], dtu: dtu.name, online: dev.online && dtu.online, mac: dtu.DevMac })))
      .flat();
  }, [DTUs]);

  /**
   * 更新状态信息
   */
  const stateInfo = useMemo(() => {
    const terminal_all = DTUs.length;
    const terminal_on = DTUs.map((el) => el.online).filter((el) => el).length;
    const monutDev_all = DTUs.map((el) => el.mountDevs.length).length;
    const mountDev_on = DTUs
      .map((el) => el.mountDevs.filter((el2) => el2.online))
      .flat().length;
    return `DTU:(全部${terminal_all}/在线${terminal_on}),挂载设备:(全部${monutDev_all}/在线${mountDev_on})`;
  }, [DTUs]);
  /**
   * 告警状态信息
   */
  const alarmInfo = useMemo(() => {
    return alarmNum > 0 ? `有${alarmNum}条未确认的告警信息，点击查看?` : '';
  }, [alarmNum]);

  // 登录运行
  const init = async () => {
    await bindDev();
    // 监听用户绑定的设备状态变更事件,及时刷新设备状态
    DTUs.forEach((dtu) => {
      api.onMessage<string>(`MacUpdate${dtu.DevMac}`, () => {
        console.log(`listen MacUpdate,mac:${dtu.DevMac}`);
        bindDev();
      });
    });

    // 获取未读取的alarm数量
    const { data: len } = await api.getAlarmunconfirmed();
    setAlarmNum(len);
  };

  // 获取用户绑定设备
  const bindDev = async () => {
    loading.showLoading({ content: '获取DTU' });
    const { code, data } = await api.BindDev();
    pullDownRefresh.stopPullDownRefresh();
    loading.hideLoading();
    if (code) {
      const uts = data.UTs as any as Uart.Terminal[];
      setDtus([...uts]);
      setReady(true);
    }
  };

  // 查看设备数据
  /* const showMountDevData = (dev: Uart.TerminalMountDevs & { dtu: string }) => {
    const { pid, mountDev, protocol, dtu, Type } = dev;
    const { DevMac } = DTUs.find((el) => el.name === dtu)!;
    navigate.push({
      url: `/pages/index/devs/devs${ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac, Type })}`,
    });
  }; */
  // 查看告警
  /* const seeAlarm = () => {
    navigate.switchTab({ url: '/pages/index/alarm/alarm' });
  }; */

  /**
   * 切换到试用账户
   */
  const trial = () => {
    loading.showLoading({ title: 'login' });
    wx.login({
      success: async (login) => {
        // 发送网络请求，获取在线账户
        const { code } = await api.trial({ js_code: login.code });
        if (code) {
          init();
          loading.hideLoading();
        }
      },
    });
  };

  return (
    <View className={style.main}>
      <page-meta>
        <navigation-bar front-color="#ffffff" background-color="#487ed9" />
      </page-meta>
      <Message type="notice" visible> {stateInfo} </Message>
      {
        alarmInfo && <Message type="warning" visible> {alarmInfo}</Message>
      }
      {
        (ready && !sub) && <Message type="error" visible onClick={() => navigate.push({ url: SubscriUrl })}>订阅公众号,告警消息及时提醒!!!</Message>
      }
      <Tab defaultActiveKey="1">
        <Tab.Item key={1} title="设备" style={{ padding: 16 }} >
          <Grid cols={2} style={{ backgroundColor: '#EDF0F5' }}>
            {
              dtuItem.map((dev) => {
                return (<Cell key={dev.dtu + dev.pid}>
                  <MountDevCard dev={dev} to={`/pages/Dev/index${ObjectToStrquery({ mac: dev.mac, pid: dev.pid })}`} />
                        </Cell>);
              })
            }
          </Grid>
        </Tab.Item>
        <Tab.Item key={2} title="透传网关">
        <Grid cols={2} style={{ backgroundColor: '#EDF0F5' }}>
            {
              DTUs.map((dev) => {
                return (<Cell key={dev.DevMac}>
                  <DtuCard dev={dev} />
                        </Cell>);
              })
            }
        </Grid>
        </Tab.Item>
      </Tab>

      <official-account />
    </View>
  );
}
