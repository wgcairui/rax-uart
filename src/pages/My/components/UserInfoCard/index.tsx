import { createElement, FC } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.module.css';
import api from '@/common/api';
import { Avatar } from '@alifd/meet';

interface props{
  user: Uart.UserInfo;
  fecth: () => void;
}

const UserInfo: FC<props> = ({ user, fecth }) => {
  // 更新用户头像和名称
  const updateAvanter = () => {
    wx.getUserProfile({
      desc: '用于更新用户头像和昵称',
      success: (info: { userInfo: WechatMiniprogram.UserInfo }) => {
        const { nickName, avatarUrl } = info.userInfo;
        api.updateAvanter(nickName, avatarUrl).then(() => {
          wx.showToast({ title: '更新成功' });
          fecth();
        });
      },
    });
  };

  return (
    <View className={styles.wrap}>
      <Avatar size="large" src={user.avanter} onClick={() => updateAvanter()} />
      <View className={styles.content}>
        <View className={styles.row}>
          <Text className={styles.nickname}>{user.name}</Text>
        </View>
        <Text>{}</Text>
        <View className={styles.detail}>
          <View className={styles.detailItem}>
            <Text className={styles.text}>创建日期: </Text>
            <Text className={styles.number}>{user.creatTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
