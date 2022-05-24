import { createElement, FC } from 'rax';
import Text from 'rax-text';
import { Card, Icon } from '@alifd/meet';
import { devDTU } from '@/constant';
import { Row, Col, Cell } from '@alifd/mobile-layout';
import { DevImage } from '../DevImage';
import { navigate } from '@uni/apis';

interface props{
  dev: Uart.Terminal;
  to?: string;
}

/**
 * 透传网关展示
 * @param props
 * @returns
 */
const DtuCard: FC<props> = (props) => {
  const { dev, to } = props;
  return (
    <Card style={{ margin: 6, marginTop: 18 }} onClick={() => to && navigate.push({ url: to })}>
      <Text style={{
        fontSize: 24,
      }}
      >{dev.name}
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
            >{`${dev.mountDevs?.length || 0}个设备`}
            </Text>
          </Cell>
        </Col>
        <Cell>
          <DevImage uri={devDTU[dev.PID || 'null']} />
        </Cell>
      </Row>
    </Card>
  );
};

export default DtuCard;
