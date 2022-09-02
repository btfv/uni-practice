type HasPrice = { price: number };
type HasVolume = { volume: number };
type HasMarketCap = { marketCap: number };

export type HistoryItem = {
  timestamp: number;
  value: HasPrice & HasVolume & HasMarketCap;
};

export type HistoryProperties = keyof HistoryItem['value'];
