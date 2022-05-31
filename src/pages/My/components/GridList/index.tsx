import { createElement, FC } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Picture from 'rax-picture';
import styles from './index.module.css';
import { navigate } from '@uni/apis';
import api from '@/common/api';

interface list {
  name: string;
  iconUrl: string;
  onClick: string | (() => void);
  hide?: boolean;
}

interface props{
  hasWx: boolean;
  isTest: boolean;
}

const DataCard: FC<props> = ({ hasWx, isTest }) => {
  const onDataItemClick = (item: list) => {
    if (typeof item.onClick === 'string') {
      navigate.push({ url: item.onClick });
    } else {
      item.onClick();
    }
  };

  // 检查更新
  const checkVersion = () => {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      wx.showToast({ title: res.hasUpdate ? '有新版本,正在后台更新' : '最新版', icon: 'none' });
      console.log(`新版本：${res.hasUpdate}`);
    });

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });

    updateManager.onUpdateFailed(() => {
      // 新版本下载失败
    });
  };

  // 打开微信设置
  const openSetting = () => {
    wx.openSetting({
      withSubscriptions: true,
    });
  };

  // 清除缓存
  const clearCache = () => {
    wx.getStorageInfo({
      success(res) {
        const size = res.currentSize / 1024;
        try {
          wx.clearStorage({
            success() {
              wx.showToast({
                title: '缓存清理成功',
                content: `清除缓存${size.toFixed(5)}MB`,
                success() {
                  wx.reLaunch({ url: '/pages/Home/index' });
                },
              });
            },
          });
        } catch (error) {
          wx.showModal({
            title: '缓存清理失败',
            content: error,
            success() {
              wx.reLaunch({ url: '/pages/Home/index' });
            },
          });
        }
      },
    });
  };

  // 解绑微信
  const unbindwx = async () => {
    const d = await wx.showModal({
      title: '解绑微信',
      content: hasWx ? '这将会删除您所有的配置和信息!!!' : '这将会解除小程序和透传账号之间的连接',
    });

    if (d.confirm) {
      api.ws.close({});
      const { code } = await api.unbindwx();
      if (code) {
        clearCache();
      }
      wx.exitMiniProgram();
    }
  };

  // 退出测试模式
  const exitTest = () => {
    api.setToken('');
    navigate.reLaunch({
      url: '/pages/Home/index',
    });
  };

  const dataList: list[] = [
    {
      name: '我的信息',
      onClick: '/pages/My/userInfo',
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/%E7%94%A8%E6%88%B7.png',
    },
    {
      name: '管理设备',
      onClick: '/pages/My/devManage',
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/1%E5%9F%BA%E7%A1%80%E7%AE%A1%E7%90%86.png',
    },
    {
      name: '绑定设备',
      onClick: '/pages/My/bind',
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/icon2%E6%89%A9%E5%B1%95_%E6%89%AB%E4%B8%80%E6%89%AB%20pre.png',
    },
    {
      name: '告警设置',
      onClick: '/pages/My/alarmSetup',
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/%E5%91%8A%E8%AD%A6.png',
    },
    {
      name: '订阅告警',
      onClick: '/pages/Subscribe/index',
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/%E8%AE%A2%E9%98%85.png',
      // hide: hasWx || isTest,
    },
    {
      name: '微信权限',
      onClick: openSetting,
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/23lock.png',
    },
    {
      name: '清除缓存',
      onClick: clearCache,
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/%E6%B8%85%E9%99%A4-%E5%8F%8C%E8%89%B2.png',
    },
    {
      name: '检查更新',
      onClick: checkVersion,
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/%E7%B3%BB%E7%BB%9F%E6%9B%B4%E6%96%B0.png',
    },
    {
      name: '解绑微信',
      onClick: unbindwx,
      // hide: isTest,
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/%E8%A7%A3%E7%BB%91%E8%AE%B0%E5%BD%95.png',
    },
    {
      name: '退出测试',
      onClick: exitTest,
      // hide: !isTest,
      iconUrl: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/%E9%80%80%E5%87%BA.png',
    },
  ];
  return (
    <View className={styles.card}>
      <View className={styles.header}>
        <Text className={styles.title}>常用操作</Text>
        <Picture className={styles.arrow} source={{ uri: 'https://img.alicdn.com/imgextra/i2/O1CN01DuirLv1IdZRcoR71K_!!6000000000916-2-tps-12-20.png' }} />
      </View>
      <View className={styles.data}>
        {
          dataList
            .filter(({ hide }) => !hide)
            .map((item) => {
              return (
                <View className={styles.dataItem} onClick={() => onDataItemClick(item)} key={item.name}>
                  <Picture className={styles.dataItemIcon} source={{ uri: item.iconUrl }} />
                  <Text className={styles.dataItemTitle}>{item.name}</Text>
                </View>
              );
            })
        }
      </View>
    </View>
  );
};

export default DataCard;
