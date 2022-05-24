import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Picture from 'rax-picture';
import styles from './index.module.css';
import { navigate } from '@uni/apis';

const Exception = () => {
  const onBackClick = () => {
    navigate.back();
  };

  return (
    <View className={styles.wrap}>
      <Picture onClick={() => navigate.push({ url: '/pages/Web/index?type=1' })} className={styles.pic} source={{ uri: 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/wx-uart/640.jpeg' }} />
      <Text className={styles.title}>关注公众号,订阅告警信息</Text>
      <Text className={styles.subTitle}>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小程序用户请关注本服务号,将接收平台推送的设备告警,
        提醒通知,小程序由于功能受限,不支持长期订阅服务,
        不满足告警推送配置.

      </Text>
      <Text className={styles.subTitle}>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如需在微信上接受消息推送,
        请截图保存上方二维码,在微信扫一扫中关注服务号,
        或搜索公众号&apos;雷迪司&apos;直接关注
      </Text>
      <Text className={styles.subTitle}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点击上方图片将直接跳转到内嵌页面,
        可直接长按关注
      </Text>
      <Text className={styles.subTitle}>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未关注将自动绑定公众号和小程序,
        如果已经关注了公众号,
        请回复 &apos;绑定&apos; 以激活绑定策略,
        或取消关注后再次关注
      </Text>
      <View className={styles.backBtn} onClick={onBackClick}>返回</View>
    </View>
  );
};

export default Exception;
