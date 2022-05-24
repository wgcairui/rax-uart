import { createElement } from 'rax';
import View from 'rax-view';
import UserInfoCard from './components/UserInfoCard';
import GridList from './components/GridList';
import api from '@/common/api';
import { usePromise } from '@/common/hooks';

export default function () {
  const { data: user, loading, fecth } = usePromise(async () => {
    const { data } = await api.userInfo();
    return data;
  });
  return (
    <View className="My-page">
      {/* User Info Card. */}
      <UserInfoCard user={user} fecth={fecth} />
      {/* Grid List Block */}
      <GridList isTest={user.userGroup === 'test'} hasWx={Boolean(user.wxId)} />
    </View>
  );
}
