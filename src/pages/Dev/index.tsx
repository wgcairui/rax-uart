import { createElement, useEffect } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { getSearchParams } from 'rax-app';
import { usePromise } from '@/common/hooks';
import api from '@/common/api';
import TerminalRunData from '@/components/TerminalRunData';

function Dev() {
  const {mac, pid} = getSearchParams() as any

  const { data: mountDev, loading } = usePromise(async () => {
    const { data } = await api.getTerminalPidProtocol(mac, pid)
    return data
}, undefined, [mac, pid])


  return (
    <View>
      <View>
        <TerminalRunData mac={mac} pid={pid}></TerminalRunData>
      </View>
    </View>
  );
}

export default Dev;
