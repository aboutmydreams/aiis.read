import React from 'react';
import BigNumber from 'bignumber.js';

/**
 * 展示 bignumber 组件
 *
 * eg. 0.0{4}5252
 */
export function NumberDisplayer({ text = '0' }: { text?: string }) {
  // 转成处理过后的字符串形式
  const number = new BigNumber(text).dividedBy(new BigNumber(Math.pow(10, 18))).toFixed();
  // 拆分成2部分
  const [valueBeforeDot, valueAfterDot] = number.split('.');
  let value;
  // 整数补2个0，不用算
  if (valueAfterDot == null) {
    value = '00';
    // 如果 >= 1
  } else if (BigNumber(valueBeforeDot).gte(1)) {
    // 小数部分取2位长度
    value = BigNumber(`0.${valueAfterDot}`).toFixed(2).split('.')[1];
    // 如果 < 1 && 小数部分 > 0.0001
  } else if (
    BigNumber(valueBeforeDot).isLessThan(1) &&
    BigNumber(`0.${valueAfterDot}`).gte(0.0001)
  ) {
    // 小数部分取4个长度
    value = BigNumber(`0.${valueAfterDot}`).toFixed(4).split('.')[1];
    // 其他情况给0计数
  } else {
    const lastZeroIndex = valueAfterDot.lastIndexOf('0');
    const zeroCount = valueAfterDot.substring(0, lastZeroIndex + 1).length;
    const noneZeroValue = valueAfterDot.substring(lastZeroIndex + 1);
    const [, noneZeroRealValue] = (+`0.${noneZeroValue}`).toFixed(4).split('.');
    value = `0{${zeroCount}}${noneZeroRealValue}`;
  }
  return (
    <span>
      {valueBeforeDot}.{value}
    </span>
  );
}