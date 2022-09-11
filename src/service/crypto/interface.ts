import {
  Coin,
  CoinInfo,
  CoinInfoInput,
  CoinListInput,
  Fiat,
  HistoricalData,
  HistoricalDataInput,
} from './types';

export interface CoinsApi {
  getCoinList(input: CoinListInput): Promise<Coin[]>;
  getFiatList(): Promise<Fiat[]>;
  getHistoricalData(input: HistoricalDataInput): Promise<HistoricalData>;
  getCoinInfo(input: CoinInfoInput): Promise<CoinInfo>;
}
