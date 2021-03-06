import { createElement, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Picture from 'rax-picture';
import styles from './index.module.css';

const ConfirmModal = () => {
  const [visible, setVisible] = useState(true);

  const handleConfirmSwitch = () => {
    console.log('confirm');
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleGetPhoneNumber = (...e: any) => {
    console.log(e);
  };
  return (

    <View className={styles.modal}>
      <button open-type="getPhoneNumber" onGetPhoneNumber={handleGetPhoneNumber}>我是按钮</button>
      <View className={styles.content}>
        <Picture className={styles.picture} source={{ uri: 'https://img.alicdn.com/tfs/TB182FN37Y2gK0jSZFgXXc5OFXa-268-147.png' }} />
        <Text className={styles.text} numberOfLines={2}>邀请你一起参加只逛淘宝不还钱挑战，最终大奖可赢 iPhone12</Text>
        <View className={styles.confirm} onClick={handleConfirmSwitch}>确认</View>
        <View className={styles.cancel} onClick={handleModalClose}>取消</View>
      </View>
      <Picture className={styles.closeIcon} onClick={handleModalClose} source={{ uri: 'https://gw.alicdn.com/tfs/TB1wL2t11L2gK0jSZFmXXc7iXXa-120-120.png' }} />
    </View>
  );
};

export default ConfirmModal;
