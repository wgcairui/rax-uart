/**
 * 公用图片
 */
export enum Picture{
  UPS = 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/99daa3e07c7b60ef7e16ed8b9fe7cf33.png',
  TH = 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/5fc7d6fe0571b714d5a3395a8c7a9f12.png',
  EM = 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/ab52d9fccdddc0fa5b0386ea0b5cbc7f.png',
  AIR = 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/c3c1852270ca35fd56135d8fda2a9977.png'
}

/**
 * 设备图片
 */
export const DevPicture = {
  UPS: Picture.UPS,
  温湿度: Picture.TH,
  电量仪: Picture.EM,
  空调: Picture.AIR,
};

const url = encodeURIComponent('https://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd');

/**
 * 订阅LADS公众号页面
 */
export const SubscriUrl = `/pages/Web/web?url=${url}`;
