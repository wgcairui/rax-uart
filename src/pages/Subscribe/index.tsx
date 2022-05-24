import { createElement } from 'rax';
import View from 'rax-view';
import SuccessBlock from './components/SuccessBlock';
/**
 * 告警订阅页面
 * @returns
 */
export default function () {
  return (
    <View className="Subscribe-page">
      {/* Success Block */}
      <SuccessBlock />
    </View>
  );
}
