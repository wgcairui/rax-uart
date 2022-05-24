import { createElement, FC } from 'rax';
import Image from 'rax-image';

import styles from './index.module.css';

interface LogoProps {
  uri: string;
}

export const DevImage: FC<LogoProps> = (props) => {
  const { uri } = props;
  return <Image className={styles.logo} source={{ uri }}/>;
};
