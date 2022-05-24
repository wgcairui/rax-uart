import { createElement, FC, useEffect } from 'rax';
import Text from 'rax-text';
import { Card, Icon } from '@alifd/meet';
import { DevPicture } from '@/constant';
import { Row, Col, Cell } from '@alifd/mobile-layout';
import { DevImage } from '../DevImage';
import { navigate } from '@uni/apis';

type IMountDev = Uart.TerminalMountDevs & {
  dtu?: string;
};

interface props{
  dev: IMountDev;
  to?: string;
}

/**
 * 挂载设备展示
 * @param props
 * @returns
 */
const MountDevCard: FC<props> = (props) => {
  const { dev, to } = props;

  return (
    <Card style={{ margin: 6, marginTop: 18 }} onClick={() => to && navigate.push({ url: to })}>
      <Text style={{
        fontSize: 24,
      }}
      >{dev.mountDev} | {dev.dtu || dev.Type}
      </Text>
      <Row style={{ marginTop: 50 }}>
        <Col >
          <Cell style={{ flexDirection: 'row' }}>
            <Icon type={dev.online ? 'heart-filling' : 'warning-filling'} style={{ color: dev.online ? '#00a1ff' : 'red', marginRight: 10 }} />
            <Text style={{
              fontSize: 24,
            }}
            >{dev.online ? '在线' : '离线'}
            </Text>
          </Cell>
          <Cell >
            <Text style={{
              fontSize: 18,
            }}
            >{dev.mountDev}
            </Text>
          </Cell>
        </Col>
        <Cell>
          <DevImage uri={DevPicture[dev.Type]} />
        </Cell>
      </Row>
    </Card>
  );
};

export default MountDevCard;
