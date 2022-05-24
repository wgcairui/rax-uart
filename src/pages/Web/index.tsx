import { ladisUrl } from '@/constant';
import { createElement, FC, useEffect, useMemo } from 'rax';
import { getSearchParams } from 'rax-app';
import Embed from 'rax-embed';


const Web: FC = () => {
  const query = getSearchParams();
  useEffect(() => {
    console.log(query.type);
  })

  const url = useMemo(() => {
    switch (query.type) {
      case '1':
        return ladisUrl;

      default:
        return '';
    }
  }, [query.type]);
  return (
    <Embed src={url} />
  );
};

export default Web;
