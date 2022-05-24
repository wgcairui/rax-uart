import { createElement, FC } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ScrollView from 'rax-scrollview';
import styles from './index.module.css';
import Image from 'rax-image';

interface props {
  user: Uart.UserInfo;
}

const DetailForm: FC<props> = ({ user }) => {
  return (
    <ScrollView className={styles.page}>
      <View className={styles.wrap} style={{ height: '250.5rpx' }}>
        <Image className={styles.logo} source={{ uri: user.avanter }} />
      </View>
      <View className={styles.sectionTitle}>基本信息</View>
      <View className={styles.sectionContainer}>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>昵称</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              {user.name}
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>账号</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              {user.user}
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>电话</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              {user.tel}
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>邮箱</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              {user.mail}
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>组织</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              {user.company}
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>创建时间</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              {user.creatTime}
            </Text>
          </View>
        </View>
      </View>
      {/* <View className={styles.sectionTitle}>运营平台信息</View>
      <View className={styles.sectionContainer}>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>运营平台名称</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              哔哩哔哩
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>平台主页链接</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              https://m.taobao.com
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>擅长内容方向</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              海鲜类美食分享
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>平台粉丝数量</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              23,468,693
            </Text>
          </View>
        </View>
        <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
          <View className={styles.sectionItemLeft}>
            <Text className={styles.sectionItemLeftText}>平台作品数量</Text>
          </View>
          <View className={styles.sectionItemRight}>
            <Text className={styles.sectionItemRightText} numberOfLines={1}>
              456
            </Text>
          </View>
        </View>
      </View> */}
    </ScrollView>
  );
};

export default DetailForm;
