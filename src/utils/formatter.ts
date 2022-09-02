import BigNumber from 'bignumber.js';
import getSymbolFromCurrency from 'currency-symbol-map';

export function formatAmount(value: BigNumber.Value) {
  return new BigNumber(value).toFormat();
}

export function formatTableAmount(value: BigNumber.Value) {
  return new BigNumber(value).toFixed(2);
}

export function formatFiatTicker(value: string) {
  return getSymbolFromCurrency(value.toUpperCase()) || value.toUpperCase();
}
