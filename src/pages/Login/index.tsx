import { createElement } from 'rax';
import View from 'rax-view';
import ConfirmModal from './components/ConfirmModal';

export default function () {
  return (
    <View className="Login-page">
      {/* Confirm Modal Block */}
      <ConfirmModal />
    </View>
  );
}
