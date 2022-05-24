import api from '@/common/api';
import { usePromise } from '@/common/hooks';
import { Button } from '@alifd/meet';
import { createElement, useState } from 'rax';
import View from 'rax-view';
import DetailForm from './components/DetailForm';
import UserDetailForm from './components/UserDetailForm';
import styles from './index.module.css';

export default function () {
  const [isEdit, setEdit] = useState(false);

  const { data: user, loading, fecth } = usePromise(async () => {
    const { data } = await api.userInfo();
    return data;
  });

  return (
    <View className="UserInfo-page">
      {
        !isEdit ? <UserDetailForm user={user} /> : <DetailForm />
      }
      {
        !isEdit && <View className={styles.wrap}>
          <Button type="primary" onClick={() => setEdit(true)}>编辑</Button>
                   </View>
      }
    </View>
  );
}
