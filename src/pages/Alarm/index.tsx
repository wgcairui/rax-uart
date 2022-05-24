/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import { Button, DatePicker, Icon, List } from '@alifd/meet';
import { Block } from '@alifd/mobile-layout';
import { usePromise } from '@/common/hooks';
import api from '@/common/api';
import { confirm, loading } from '@uni/apis';

const formattime = (time: number) => {
  const Dates = new Date(time);
  return `${Dates.getMonth() + 1}-${Dates.getDate()} ${Dates.getHours()}:${Dates.getMinutes()}:${Dates.getSeconds()}`;
};

function Alarm() {
  //
  const [dates, setDates] = useState<[Date, Date]>(() => {
    const now = new Date();
    now.setMonth(now.getMonth() - 4);
    return [now, new Date()];
  });

  const { loading: load, data, fecth } = usePromise(async () => {
    const [start, end] = dates;
    end.setHours(23, 59, 59);
    const { data: r } = await api.getAlarm(start.toString(), end.toString());
    return r.reverse();
  }, [], [dates]);

  useEffect(() => {
    if (load) {
      loading.showLoading({ content: 'loading' });
    } else {
      loading.hideLoading();
    }
  }, [load]);

  // 确认告警信息
  const showalarm = async (alarm: Uart.uartAlarmObject & { _id: string }) => {
    const ok = await confirm({
      title: alarm.devName,
      content: alarm.msg,
      showCancel: !alarm.isOk,
      // confirmColor: 'green',
      confirmText: alarm.isOk ? '确定' : '确认消息',
    });
    if (ok.confirm && !alarm.isOk) {
      loading.showLoading({ title: '确认告警信息' });
      await api.confrimAlarm(alarm._id);
      await fecth();
      // this.subMessage()
      loading.hideLoading();
    }
  };
  // 全部确认
  const allQuest = async () => {
    const ok = await confirm({
      title: 'Tips',
      content: '是否确认全部告警信息?',
    });
    if (ok.confirm) {
      loading.showLoading({ title: '确认告警信息' });
      await api.confrimAlarm();
      await fecth();
      loading.hideLoading();
      // this.subMessage();
    }
  };


  return (
    <View>
      <Block title="选择日期">
        <DatePicker.DateRangePicker defaultValue={dates} placeholder="选择区间(精确到日)" onChange={(e: [Date, Date]) => setDates([...e])} />
      </Block>
      <List>
        <List.Item
          key="alarm"
          title="告警信息列表"
          extra={<Button size="small" type="primary" onClick={() => allQuest()}>
            确认全部告警
          </Button>}
        />
        {
          data.map((alarm) =>
            (<List.Item
              key={alarm.timeStamp}
              media={<Icon size="s" type={alarm.isOk ? 'success-filling' : 'warning-filling'} style={{ color: alarm.isOk ? '#00a1ff' : 'red' }} />}
              title={alarm.mac}
              subTitle={formattime(alarm.timeStamp)}
              extra={alarm.msg}
              onClick={() => showalarm(alarm as any)}
            />))
        }
      </List>
    </View>
  );
}

export default Alarm;
