export interface Fiat {
  id: string;
  ticker: string;
  icon?: string;
}

export interface Coin {
  id: string;
  name: string;
  ticker: string;
  currentPrice: number;
  marketCap: number;
  totalVolume: number;

  icon?: string;
}

type HistoryPoint = {
  timestamp: number;
  value: number;
};

export interface HistoricalData {
  prices: HistoryPoint[];
  volumes: HistoryPoint[];
  marketCaps: HistoryPoint[];
}

export type CoinListInput = {
  fiatCurrencyId: Fiat['id'];
  page?: number;
  limit?: number;
};

export type HistoricalDataInput = {
  cryptoCurrencyId: Coin['id'];
  fiatCurrencyId: Fiat['id'];
  range: {
    days: number;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CoinInfo {}

export type CoinInfoInput = {
  id: string;
};
