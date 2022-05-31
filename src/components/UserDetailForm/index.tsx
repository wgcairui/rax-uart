import { createElement, FC } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ScrollView from 'rax-scrollview';
import styles from './index.module.css';
import Image from 'rax-image';
import dayjs from 'dayjs';

interface props {
  user: Uart.UserInfo;
}

interface detailProps{
  name: string;
  value?: string | number;
}

export const FormDetail: FC<detailProps> = ({ name, value }) => {
  return (
    <View className={styles.sectionItem} style={{ height: '107.5rpx' }}>
      <View className={styles.sectionItemLeft}>
        <Text className={styles.sectionItemLeftText}>{name}</Text>
      </View>
      <View className={styles.sectionItemRight}>
        <Text className={styles.sectionItemRightText} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const DetailForm: FC<props> = ({ user }) => {
  return (
    <ScrollView className={styles.page}>
      <View className={styles.wrap} style={{ height: '250.5rpx' }}>
        <Image className={styles.logo} source={{ uri: user.avanter }} />
      </View>
      <View className={styles.sectionTitle}>基本信息</View>
      <View className={styles.sectionContainer}>
        <FormDetail name="昵称" value={user.name} />
        <FormDetail name="账号" value={user.user} />
        <FormDetail name="电话" value={user.tel} />
        <FormDetail name="邮箱" value={user.mail} />
        <FormDetail name="组织" value={user.company} />
        <FormDetail name="创建时间" value={dayjs(user.creatTime).format('YYYY-MM-DD')} />
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
